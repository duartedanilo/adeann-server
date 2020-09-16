const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'dataset'),
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, '..', '..', 'dataset'))
        },
        filename: (req, file, callback) =>{
            crypto.randomBytes(16, (err, hash) => {
                if(err) callback(err)

                // const filename = `${hash.toString('hex')}-${file.originalname}`
                const filename = file.originalname
                callback(null, filename)
            })
        }
    }),
    // limits: {
    //     fileSize: 2 * 1024 * 1024
    // },
    fileFilter: (req, file, callback) => {
        console.log(file)
        const allowedMimes = [
            "text/csv",
            "text/plain",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ]
        if (allowedMimes.includes(file.mimetype))
             callback(null, true)
        else 
            callback(new Error('Invalid file type.'))
    }
}