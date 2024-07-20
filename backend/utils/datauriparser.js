const DatauriParser = require('datauri/parser');
const path = require('path');
module.exports=function getDataUri(file){
    const parser = new DatauriParser();
    const IMG_URI = parser.format(path.extname(file.originalname), file.buffer);
    return IMG_URI.content;
}