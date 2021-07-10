const mongoose = require('mongoose');
const fs = require('fs');
var getMP3Duration = require('get-mp3-duration')
const Schema = mongoose.Schema;


const audioSchema = new Schema({

    FileName: {type: String,
               required: true,
            },
    SizeInMb: {type: Number,
           required: true,
            },
    LengthInMin: {type: Number,
             required: true,
            },
    IsValid: {type: Boolean,
              required: false,
              default: null,
            },
}, {timestamps: true});

const Audio = mongoose.model('Audio', audioSchema);

/*
save an mp3 file as a mongodb entity
*/
async function saveDocument(fileFullName, fileName){

        const buffer = fs.readFileSync(fileFullName)
        const lemgth = getMP3Duration(buffer) / (1000 * 60);  //minutes
        const size = buffer.byteLength / 1000000;  //mb
        const name = fileName.split('.mp3')[0]
    
        const audio = new Audio({
            FileName: name,
            SizeInMb: size.toFixed(2),
            LengthInMin: lemgth.toFixed(2) ,
        })
        //writing audio doc
        audio.save()
        .then((result) => {})
        .catch((err) => {console.log(err)})
}

/*
get all Audio entities from db
*/
async function getAllAudioDocs(){
        const result = await Audio.find()
        return result
}       

/*
mark mp3 file as valid or invalid
*/
async function markAudio(objectId){

        const object = await Audio.findById(objectId);

        if(object.IsValid == null)
                object.IsValid = true;
        else{
                object.IsValid = !object.IsValid
        }
        object.save()
        .then((result) => {})
        .catch((err) => {console.log(err)})
        
        return object;
}

exports.saveDocument = saveDocument;
exports.getAllAudioDocs = getAllAudioDocs;
exports.markAudio = markAudio;