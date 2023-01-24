const joi = require("joi");

const userSchema = joi.object({
  firstname: joi.string().max(255).trim().required(),
  lastname: joi.string().max(255).trim().required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  blogId: joi.array().default([]),
  timestamps: joi.date().timestamp(),
});

const updateUserSchema = joi.object({
  firstname: joi.string().max(255).trim(),
  lastname: joi.string().max(255).trim(),
  email: joi.string().email(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  blogId: joi.array().default([]),
  timestamps: joi.date().timestamp(),
});

async function addUserValidationMW(req, res, next) {
  const userPayload = req.body;

  try {
    await userSchema.validateAsync(userPayload);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 406,
    });
  }
}

async function updateUserValidationMW(req, res, next) {
  const userPayload = req.body;

  try {
    await updateUserSchema.validateAsync(userPayload);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 406,
    });
  }
}

module.exports = {
  addUserValidationMW,
  updateUserValidationMW,
};
