const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
const Blog = require("./models/Post");

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ejs modülü
app.set("view engine", "ejs");
//database connection

mongoose
  .connect("mongodb://127.0.0.1/cleanblog-test-db")
  .then(() => console.log("Veri tabanına bağlanıldı."))
  .catch((err) => console.log("bağlantı başarısız"));

//routes

app.get("/", async (req, res) => {
  try {
    const posts = await Blog.find({}).sort("-dateCreated");

    res.render("index", { posts });
  } catch (error) {
    console.log(error);
  }
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add_post", (req, res) => {
  res.render("add_post");
});

app.post("/posts", async (req, res) => {
  //burdan devam et
  try {
    const blog = req.body;
    await Blog.create({
      title: blog.title,
      detail: blog.detail,
    });
    res.redirect("/");
  } catch (error) {
    console.log("post kaydedilemedi");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
