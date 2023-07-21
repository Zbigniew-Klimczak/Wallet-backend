const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../service/schemas/user");
const { uuid } = require("uuidv4");
const {
  userSignupValidationSchema,
  userLoginValidationSchema,
  transactionValidationSchema,
} = require("../service/schemas/validation");

require("dotenv").config();
const secret = process.env.SECRET;

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
          balance: user.balance,
          transactions: user.transactions,
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
      balance: user.balance,
      transactions: user.transactions,
    },
  });
};

const addTransaction = async (req, res) => {
  const user = req.user;
  const newTransaction = req.body;
  try {
    const { error } = await transactionValidationSchema.validate(newTransaction);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
      return;
    }
    newTransaction.id = uuid();
    if (newTransaction.type === "Income") {
      user.balance = user.balance + newTransaction.value;
    }
    if (newTransaction.type === "Expense") {
      user.balance = user.balance - newTransaction.value;
    }
    user.transactions.push(newTransaction);
    await user.save();
    res.status(201).json({
      status: "Created",
      code: 201,
      data: {
        balance: user.balance,
        transactions: user.transactions,
      },
    });
    return;
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteTransaction = async (req, res) => {
  const user = req.user;
  const { transactionId } = req.params;
  try {
    if (
      user.transactions.some((transaction) => transaction.id === transactionId) !== true ||
      user.transactions === []
    ) {
      res.status(404).json({
        status: "Not found",
        code: 404,
        message: "Transaction do not exist or wrong Id",
      });
      return;
    }
    const deletedTransaction = user.transactions.find(
      (transaction) => transaction.id === transactionId
    );
    console.log(deletedTransaction.type);
    if (deletedTransaction.type === "Income") {
      console.log("income");
      user.balance = user.balance - deletedTransaction.value;
    }
    if (deletedTransaction.type === "Expense") {
      console.log("expense");
      user.balance = user.balance + deletedTransaction.value;
    }
    const updatedTransactions = user.transactions.filter(
      (transaction) => transaction.id !== transactionId
    );
    user.transactions = updatedTransactions;
    await user.save();
    res.status(200).json({
      status: "Succes",
      code: 200,
      message: "Transaction deleted",
      data: {
        balance: user.balance,
        transactions: user.transactions,
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateTransaction = async (req, res) => {
  const user = req.user;
  const { transactionId } = req.params;
  const updatedTransaction = req.body;
  try {
    if (
      user.transactions.some((transaction) => transaction.id === transactionId) !== true ||
      user.transactions === []
    ) {
      res.status(404).json({
        status: "Not found",
        code: 404,
        message: "Transaction do not exist or wrong Id",
      });
      return;
    }
    const { error } = await transactionValidationSchema.validate(updatedTransaction);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
      return;
    }
    const transaction = user.transactions.find((transaction) => transaction.id === transactionId);
    if (
      transaction.value !== updatedTransaction.value ||
      transaction.type !== updatedTransaction.type
    ) {
      if (transaction.type === "Income") {
        console.log("income");
        user.balance = user.balance - transaction.value;
      }
      if (transaction.type === "Expense") {
        console.log("expense");
        user.balance = user.balance + transaction.value;
      }
      if (updatedTransaction.type === "Income") {
        user.balance = user.balance + updatedTransaction.value;
      }
      if (updatedTransaction.type === "Expense") {
        user.balance = user.balance - updatedTransaction.value;
      }
    }
    updatedTransaction.id = transactionId;
    const newTransactions = user.transactions.filter(
      (transaction) => transaction.id !== transactionId
    );
    newTransactions.push(updatedTransaction);
    user.transactions = newTransactions;
    await user.save();
    res.status(201).json({
      status: "Updated",
      code: 201,
      message: "Transaction updated",
      data: {
        balance: user.balance,
        transactions: user.transactions,
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
module.exports = {
  register,
  login,
  logout,
  current,
  addTransaction,
  deleteTransaction,
  updateTransaction,
};
