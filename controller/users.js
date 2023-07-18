const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../service/schemas/user");

require("dotenv").config();
const secret = process.env.SECRET;

const userSignupValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().min(3).required(),
});

const userLoginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const register = async (req, res) => {
  const { email, password, firstName } = req.body;
  try {
    const { error } = userSignupValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
      return;
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(409).json({
        status: "Conflict",
        code: 409,
        message: "Email in use",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await User.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
    });

    return res.status(201).json({
      status: "Created",
      code: 201,
      data: {
        user: {
          email: createdUser.email,
          firstName: createdUser.firstName,
        },
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = userLoginValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
      return;
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
      return;
    }

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "2h" });
    user.token = token;
    await user.save();
    res.status(200).json({
      status: "OK",
      code: 200,
      data: {
        token: user.token,
        user: {
          email: user.email,
          firstName: user.firstName,
        },
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const logout = async (req, res) => {
  console.log("jestem tu");
  const user = req.user;
  try {
    await User.findByIdAndUpdate(user._id, { token: null });
    res.status(204).json({
      status: "OK",
      code: 204,
      message: "Logged out",
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const current = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    status: "OK",
    code: 200,
    data: {
      email: user.email,
      firstName: user.firstName,
    },
  });
};

module.exports = {
  register,
  login,
  logout,
  current,
};
