const express = require("express");
const router = express.Router();
const ctrlTask = require("../controller/users.js");
const { auth, refreshAuth } = require("../controller/auth.js");

router.post("/signup", ctrlTask.register);
router.post("/login", ctrlTask.login);
router.get("/logout", auth, ctrlTask.logout);
router.get("/current", auth, ctrlTask.current);
router.post("/transactions", auth, ctrlTask.addTransaction);
router.delete("/transactions/:transactionId", auth, ctrlTask.deleteTransaction);
router.patch("/transactions/:transactionId", auth, ctrlTask.updateTransaction);
router.get("/categories", auth, ctrlTask.getCategories);
router.get("/statistics/:month/:year", auth, ctrlTask.getStatistics);
router.post("/tokens", refreshAuth, ctrlTask.refreshAuthTokens);

module.exports = router;
