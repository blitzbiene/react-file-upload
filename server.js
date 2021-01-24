const express = require('express');
const fileupload = require('express-fileupload');

const fs = require("fs");
const path = require("path");

const app = express();


app.use(fileupload());
app.get('/',(req,res)=>{
    res.send("hi there");
});



app.post('/upload',async (req,res)=>{
      if(!req.files)
      {
          console.log("error");
          return res.status(400).json({msg:"no file found"});
      }
      else{
          const file = req.files.file;
          
          try{
              console.log(__dirname+'/uploads/');
              await file.mv(`${__dirname}/uploads/${file.name}`);
              console.log("Printing file name",file.name);
              return res.json({fileName:file.name,filePath:`/file?name=/uploads/${file.name}`});
          }
          catch(e){
            console.log("Error in moving File",e);
            return res.status(500).json({'msg':"Error in file moving,ServerError"});
          }

          
      }
});



app.get('/file',(req,res)=>{
    const filePath= path.join(__dirname,req.query.name);
    console.log(filePath);

    try{
        if(fs.existsSync(filePath))
        {return res.sendFile(filePath);}
        else throw new Error("No such File");   
    }
    catch(e){
        return res.status(400).json({msg:"no such file"});
    }
});



app.listen(5000,()=>{
    console.log("server started");
})