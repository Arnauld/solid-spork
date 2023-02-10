const http = require('http')
const fs = require('fs')

module.exports = {

    /*
    ** This method downloads the file
    ** from the URL specified in the 
    ** parameters 
    */ 
    download_file : function(url) {
        return new Promise((resolve, reject) => {
            let file = fs.createWriteStream('./output.pdf');
            http.get(url, function(response) {
                response.on('data', function(chunk) {
                    file.write(chunk)
                })
                response.on('end', function() {
                    console.log('download file completed.')
                    resolve('File download completed.')
                })
            })
        })
    }
}