const joi = require("joi");

const blogSchema = joi.object({
  userId: joi.string(),
  title: joi.string().min(2).max(255).trim().required(),
  description: joi.string().min(5).max(700).trim().optional(),
  state: joi.string().default("draft"),
  readCount: joi.number().default(0),
  readingTime: joi.number(),
  tags: joi.array().default([]),
  body: joi.string().min(5).trim().required(),
  createdAt: joi.date().default(Date.now),
  timestamps: joi.date().timestamp(),
});

const updateBlogSchema = joi.object({
  userId: joi.string(),
  title: joi.string().min(2).max(255).trim().optional(),
  description: joi.string().min(5).max(700).trim().optional(),
  state: joi.string().default("draft"),
  readCount: joi.number().default(0),
  readingTime: joi.number(),
  tags: joi.array().default([]),
  body: joi.string().min(5).trim().optional(),
  createdAt: joi.date().default(Date.now),
  timestamps: joi.date().timestamp(),
});

async function addBlogValidationMW(req, res, next) {
  const blogPayload = req.body;

  try {
    await blogSchema.validateAsync(blogPayload);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 406,
    });
  }
}

async function updateBlogValidationMW(req, res, next) {
  const blogPayload = req.body;

  try {
    await updateBlogSchema.validateAsync(blogPayload);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 406,
    });
  }
}

module.exports = {
  addBlogValidationMW,
  updateBlogValidationMW,
};
