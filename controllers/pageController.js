const Blog = require("../models/Post");

exports.aboutPage = (req, res) => {
    //about sayfası
    res.render("about");
  }
  exports.AddPostPage = (req, res) => {
    //addPost sayfası
    res.render("add_post");
  }
  exports.EditPage = async (req, res) => {
    //edit sayfası
    const post = await Blog.findById(req.params.id);
    res.render("edit", { post });
  }
