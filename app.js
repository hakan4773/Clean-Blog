const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
const Blog = require("./models/Post");
const postController = require("./controllers/postController");
const pageController = require("./controllers/pageController");

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
//ejs modülü
app.set("view engine", "ejs");
//database connection

mongoose
  .connect("mongodb://127.0.0.1/cleanblog-test-db", {})
  .then(() => console.log("Veri tabanına bağlanıldı."))
  .catch((err) => console.log("bağlantı başarısız"));

//routes
app.get("/", postController.getAllPost);
app.get("/posts/:id", postController.getPost);
app.post("/posts", postController.CreatePost);
app.put("/posts/:id", postController.UpdatePost);
app.delete("/posts/:id", postController.DeletePost);

app.get("/about", pageController.aboutPage);
app.get("/add_post", pageController.AddPostPage);
app.get("/posts/edit/:id", pageController.EditPage);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
