//index.js file
const express=require('express');
const app=express();
const multer = require('multer');
const Tesseract = require('tesseract.js');


const storage=multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, './uploads/');
    },
    filename:(req,file,cb) => {
        cb(null, file.originalname);
    }
})
const upload = multer({storage: storage });


app.post('/api/upload', upload.single('uploadedImage'), (req, res) => {
    console.log(req.file);

    Tesseract.recognize(
        'uploads/' + req.file.filename,
        'eng',
        { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
        console.log(text);

        return res.json(
            {
                message:text
            }
        )
    })
})

app.listen(4000, () => {
    console.log('Server is Up and Running on port 4000');
});
