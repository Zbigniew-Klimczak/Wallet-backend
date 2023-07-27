const Joi = require("joi").extend(require("@joi/date"));

const userSignupValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().min(3).required(),
});

const userLoginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const transactionValidationSchema = Joi.object({
  type: Joi.string().valid("Income", "Expense").required(),
  category: Joi.string()
    .valid(
      "Income",
      "Main expenses",
      "Products",
      "Car",
      "Self care",
      "Child care",
      "Household products",
      "Education",
      "Leisure",
      "Other expenses",
      "Entertainment"
    )
    .required(),
  value: Joi.number().required(),
  date: Joi.date().format("YYYY-MM-DD").required(),
  comment: Joi.string(),
});

module.exports = {
  userSignupValidationSchema,
  userLoginValidationSchema,
  transactionValidationSchema,
};
