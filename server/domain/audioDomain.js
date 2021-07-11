var walk = require('walk')
var fs = require('fs');
const lineReader = require('line-reader');
const audioUtils = require("../utils/audioUtils");

/*
checks whether the folder specified was already scannedץ
uses a promise for line-by-line reading.
*/
let readerPromise = (folderPath) => {
    return new Promise((resolve, reject) => {
    let status = false;

    lineReader.eachLine('../dist/foldersScanned.txt', function(line, last) {
    if(line == folderPath){
        status = true;
    }
    }, () => {resolve(status)});
})}

async function folderAlreadyScanned(folderPath){

    let status = await readerPromise(folderPath);
    return status;
}

/*
scans the folder for mp3 files
*/
async function scanFolder(folderPath){  
    try{

        fs.appendFileSync('../dist/foldersScanned.txt', folderPath + '\n');

        var walker  = walk.walk(folderPath, { followLinks: false });
        await walker.on('file', function(root, stat, next) {
            // add file to db only if it matches *.mp3 ending
            if(/.*\.(mp3)/.test(stat.name)){
                audioUtils.saveDocument(root + '/' + stat.name, stat.name).then(() => next())
            }
            else{
                next();
            }
        });
    
        walker.on('end', function() {
            console.log("done scanning...");
        });
    }
    catch(err){
        console.log(err)
    }
}

/*
call data layer for recieving all mp3 entities
*/
async function getAudios(){

    // reading audio doc
    const audios = await audioUtils.getAllAudioDocs();
    return audios;
}

async function markAudio(objectId){
    await audioUtils.markAudio(objectId);
}

exports.folderAlreadyScanned = folderAlreadyScanned
exports.scanFolder = scanFolder
exports.getAudios = getAudios
exports.markAudio = markAudio