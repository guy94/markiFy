var express = require("express");
var router = express.Router();
const audioDomain = require("../domain/audioDomain");

/*
this route recieves a folder path in req.body and validates it, 
parses mp3 files and saves each file to db
*/
router.post('/addAudios', async (req, res, next) => {
    try{
        
        if(!('folderPath' in req.body)){
            throw { status: 409, message: "incorrect request body args" };
        }

        const folderPath = req.body.folderPath;
        if(!(/[a-zA-Z]:\\(\w+\\)*\w*/.test(folderPath))){
            console.log("failed")
            throw { status: 409, message: "incorrect request body args" };
        }
        
        const wasScanned = await audioDomain.folderAlreadyScanned(folderPath);

        if(wasScanned){
            throw { status: 400, message: "folder was already scanned" };
        }

        await audioDomain.scanFolder(folderPath)
        res.status(200).send('folder was scanned successfully')
        
    }
    catch(err){
        next(err)
    }
})

/*
select all mp3 files route
*/
router.get('/getAudios', async (req, res, next) => {
    try{

        const audios = await audioDomain.getAudios()
        res.status(200).send(audios.reverse())

    }catch(err){
        next(err)
    }
})

/*
mark mp3 file as valid or invalid route
*/
router.put('/markAudios', async (req, res, next) => {
    try{

        if(!('objectId' in req.body)){
            throw { status: 409, message: "incorrect request body args" };
        }
        await audioDomain.markAudio(req.body.objectId)

        res.status(200).send('file validation changed successfully')

    }catch(err){
        next(err)
    }
})

module.exports = router;