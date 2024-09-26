const Blog = require("../models/Post");


exports.getAllPost =  async (req, res) => {
    try {
      //anasayfa ve postları görüntüleme
      const posts = await Blog.find({}).sort("-dateCreated");
      res.render("index", { posts });
    } catch (error) {
      console.log(error);
    }
  }

  exports.getPost = async (req, res) => {
    //tekli post sayfası
    const post = await Blog.findById(req.params.id);
    res.render("post", { post });
  }

  exports.CreatePost =  async (req, res) => {
    //yeni post ekleme
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
  }

exports.UpdatePost = async (req, res) => {
    try {
      const post = await Blog.findOne({ _id: req.params.id });
      (post.title = req.body.title), (post.detail = req.body.detail);
      post.save();
      res.redirect(`/posts/${req.params.id}`);
    } catch (error) {
      console.log("bir hata oluştu", error);
    }
  }

  exports.DeletePost = async (req, res) => {
    try {
      const deletedPost = await Blog.findByIdAndDelete(req.params.id);
      if (!deletedPost) {
        return res.status(404).send("Post not found");
      }
      res.redirect("/");
    } catch (error) {
      console.log("Bir hata oluştu:", error);
      res.status(500).send("Silme işlemi başarısız");
    }
  }