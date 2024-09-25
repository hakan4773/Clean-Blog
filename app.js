const express=require("express")

const app=express();


app.get("/",(req,res)=>{
    const blog = { id: 1, title: "Blog title", description: "Blog description" }
    res.send(blog)
})

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Sunucu ${PORT} portunda çalışıyor...`)
})