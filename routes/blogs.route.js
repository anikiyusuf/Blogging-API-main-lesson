const express = require("express");
const passport = require("passport");
const blogController = require("../Controllers/blog.controller");

const blogRouter = express.Router();

blogRouter.get("/:id", blogController.getUserBlogs);

blogRouter.get("/new/:id", blogController.renderNewBlogPage);

blogRouter.get("/edit/:id", blogController.renderEditBlogPage);

blogRouter.get("/see/:id/:userId", blogController.renderShowBlogPage);

blogRouter.get("/allBlogs/:id", blogController.renderPublishedBlogsPage);

blogRouter.get(
  "/seePublished/:id/:userId",
  blogController.renderPublishedBlogsShowPage
);

blogRouter.post("/:id", blogController.createBlog);

blogRouter.put("/:blogId/:id", blogController.editBlog);

blogRouter.delete("/:id/:userId", blogController.deleteBlog);

module.exports = blogRouter;
