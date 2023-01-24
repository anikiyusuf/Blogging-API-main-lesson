const express = require("express");
const User = require("../models/user.model");
const Blogs = require("../models/blog.model");

// require("../middlewares/passport");

const app = express();

// get User Blogs [GET]
async function getUserBlogs(req, res, next) {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    const blogs = await Blogs.find({
      userId: user.id,
      state: "published",
    }).sort({
      createdAt: "desc",
    });
    res.render("blogs/index", { blogs: blogs, user: user });
  } catch (error) {
    next(error);
  }
}

// render new blog page [GET]
async function renderNewBlogPage(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    res.render("blogs/new", { blog: new Blogs(), user: user });
  } catch (error) {
    next(error);
  }
}

// render edit blog page [GET]
async function renderEditBlogPage(req, res, next) {
  try {
    const blog = await Blogs.findById(req.params.id);
    const userID = blog.userId;
    const user = await User.findById(userID);
    res.render("blogs/edit", { blog: blog, user: user });
  } catch (error) {
    next(error);
  }
}

// render show Blog Page [GET]
async function renderShowBlogPage(req, res, next) {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (blog == null) res.redirect("/blogs/:id");
    const userId = await User.findById(req.params.userId);

    res.render("blogs/show", { blog: blog, user: userId });
  } catch (error) {
    next(error);
  }
}

// render published blogs page [GET]
async function renderPublishedBlogsPage(req, res, next) {
  try {
    const blogs = await Blogs.find().sort({ createdAt: "desc" });
    const user = await User.findById(req.params.id);

    res.render("blogs/everyBlog", { user: user, blogs: blogs });
  } catch (error) {
    next(error);
  }
}

//render published blogs show page [GET]
async function renderPublishedBlogsShowPage(req, res, next) {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (blog == null) res.redirect("/blogs/allBlogs/:id");
    const userId = await User.findById(req.params.userId);
    blog.readCount += 1;
    await blog.save();

    res.render("blogs/showPublished", { blog: blog, user: userId });
  } catch (error) {
    next(error);
  }
}

// create a blog and route to showBlog page [POST]
async function createBlog(req, res, next) {
  const id = req.params.id;
  let user = await User.findById(id);

  let blog = new Blogs({
    title: req.body.title,
    description: req.body.description,
    body: req.body.body,
    tags: req.body.tags,
    userId: user.id,
    id,
    state: "published",
  });

  try {
    blog = await blog.save();

    user.blogId.push(blog.id);
    await user.save();

    res.render("blogs/show", { blog: blog, user: user });
  } catch (error) {
    res.render(`blogs/new`, { blogs: blog, user: new User() });
    next(error);
  }
}

//edit a blog and route to showBlog page [PUT]
async function editBlog(req, res, next) {
  const id = req.params.id;
  let user = await User.findById(id);

  req.blog = await Blogs.findById(req.params.blogId);
  let blog = req.blog;

  //
  blog.title = req.body.title;
  blog.description = req.body.description;
  blog.body = req.body.body;
  blog.tags = req.body.tags;
  //
  try {
    blog = await blog.save();

    await user.save();

    res.render("blogs/show", { blog: blog, user: user });
  } catch (error) {
    res.render(`blogs/new`, { blogs: blog, user: new User() });
  }
}

// Delete a blog and route to index page [DELETE]
async function deleteBlog(req, res, next) {
  try {
    await Blogs.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.params.userId);
    const blogs = await Blogs.find({
      userId: user.id,
      state: "published",
    }).sort({
      createdAt: "desc",
    });
    res.render("blogs/index", { blogs: blogs, user: user });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUserBlogs,
  renderNewBlogPage,
  renderEditBlogPage,
  renderShowBlogPage,
  renderPublishedBlogsPage,
  renderPublishedBlogsShowPage,
  createBlog,
  editBlog,
  deleteBlog,
};
