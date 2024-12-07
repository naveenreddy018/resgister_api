var express = require("express");

var server = express();
var multer = require("multer");

server.use(express.urlencoded({extended:true}))
server.use(express.json())

var storage = multer.diskStorage({
  destination : (req,file,cb)=>{
    console.log(file + "h")
    cb(null,__dirname + "/folder")

  },

  filename:(req,file,cb)=>{
    console.log(file + "e")
    cb(null,Date.now()+ file.originalname)
  }
})



upload = multer({storage : storage})

server.post("/register",upload.single("photo"),(req,res)=>{
    console.log(req.body)
    console.log(req.file + 'upload')
    

  var data_obj = {

          ...req.body,
          photo_path : req.file?.path

  }
            
            try{
                       
               res.send({
                status : 200,
                message : "successfull resgister",
                data : data_obj
               })

            }catch(err){
            
                  res.status(400).json({error : err.message })

            }

             

})


var port = 3000;

server.listen(port,(req,res)=>{
  console.log("http://localhost:"+port)
})