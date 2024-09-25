const express=require("express")
const ejs = require('ejs'); 

const app=express();


//middleware
app.use(express.static("public"))

//ejs modülü
app.set("view engine","ejs")

//routes
app.get("/",(req,res)=>{
    res.render("index");
})





const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Sunucu ${PORT} portunda çalışıyor...`)
})