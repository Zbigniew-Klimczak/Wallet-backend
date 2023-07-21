const Joi = require("joi").extend(require("@joi/date"));
const {
  transactionCategories,
  transactionTypes,
} = require("../variables/transactionVariables");

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
  type: Joi.string().valid(transactionTypes.toString()).required(),
  category: Joi.string().valid(transactionCategories.toString()).required(),
  value: Joi.number().required(),
  date: Joi.date().format("MM-DD-YYYY").required(),
  comment: Joi.string(),
});

module.exports = {
  userSignupValidationSchema,
  userLoginValidationSchema,
  transactionValidationSchema,
};
