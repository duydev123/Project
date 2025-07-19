const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const app = express()
const port = process.env.PORT || 3000;
const path = require('path')
const fs = require('fs')

app.use(cors({
    origin: ['http://localhost:5173','https://client-oig2.onrender.com'],
    credentials: true
})
);
app.use(express.static('public'));
app.use(express.json());
//create uploadfile
if (!fs.existsSync('./upload')) {
  fs.mkdirSync('./upload');
}
//fs file read
app.get('/file' , (req,res) => {
    fs.readdir('upload/' , (err, files) => {
        if(err)
            return res.status(500).json({error:"cant read folder with file"});
        res.json(files);
    });
});
app.get('/upload/:filename' , (req , res) => {
    const filename = req.params.filename;
    const file = path.join(__dirname, 'upload' , filename);
    res.download(file);
})
//multer
const storage = multer.diskStorage({
    destination:(req , res ,cb) => {
        cb(null,'upload/');
    },
    filename: (req , file ,cb ) => {
        const uniqueName = file.originalname;
        cb(null,uniqueName);
    },
});
const upload = multer({storage});
app.post('/upload' , upload.single('file'),(req , res) => {
    console.log("File receive:", req.file);
    res.json({message: "Upload Finish" , file: req.file});
});
app.use('/upload' , express.static(path.join(__dirname,"upload")));
//delete
app.delete('/delete/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'upload', filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Xoá file thất bại" });
    }
    res.json({ message: "Xoá file thành công" });
  });
});
//database
mongoose.connect('mongodb+srv://admin:admin01st@mydata.q6qg74c.mongodb.net/MyData' , {
})
.then(() => console.log('Db connected'))
.catch(err => console.error(err));
//
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password:String
});
const User = mongoose.model('User',userSchema);
//api
app.post('/login', async (req , res) => {
    const {username,password} = req.body;
    console.log(username,password);
    const user = await User.findOne({username,password});
    if(user) {
        res.json({success: true, message: "Login Succesful" , username: user.username});
    } else {
        res.json({success: false, message:"failed"});
    }
});
app.post('/register', async (req , res) => {
    const {username , email , password} = req.body;
    console.log(username , email , password);
    const isexist = await User.findOne({username});
    if(isexist) {
        return res.json({success: false, message:'User already exist'});
    }
    const newUser = new User({
        username, email , password
    });
    await newUser.save();
    res.json({success: true, message:'User register successfully'})
})
app.listen(port, "0.0.0.0" , () => {
     console.log(`Server listening at http://localhost:${port}`);
}
);
