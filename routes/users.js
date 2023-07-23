const express = require("express");
const router = express.Router();
const ctrlTask = require("../controller/users.js");
const { auth, refreshAuth } = require("../controller/auth.js");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     refreshToken:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *     accessToken:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     BadRequestResponse:
 *       type: object
 *       required:
 *         - status
 *         - code
 *         - message
 *       properties:
 *         status:
 *           type: string
 *           example: Bad Request
 *           description: Error status
 *         code:
 *           type: Number
 *           example: 400
 *           description: Error code
 *         message:
 *           type: string
 *           description: Error message
 *           example: "Missing field: email"
 *
 *     NotAuthorised:
 *       type: object
 *       required:
 *         - status
 *         - code
 *         - message
 *       properties:
 *         status:
 *           type: string
 *           example: Not Authorised
 *           description: Error status
 *         code:
 *           type: Number
 *           example: 401
 *           description: Error code
 *         message:
 *           type: string
 *           description: Error message
 *           example: "Not Authorised"
 *
 *     NotFoundResponse:
 *       type: object
 *       required:
 *         - status
 *         - code
 *         - message
 *       properties:
 *         status:
 *           type: string
 *           example: Not Found
 *           description: Error status
 *         code:
 *           type: Number
 *           example: 404
 *           description: Error code
 *         message:
 *           type: string
 *           description: Error message
 *           example: "Use api on routes: /users"
 *
 *     ConflictResponse:
 *       type: object
 *       required:
 *         - status
 *         - code
 *         - message
 *       properties:
 *         status:
 *           type: string
 *           example: Conflict
 *           description: Error status
 *         code:
 *           type: Number
 *           example: 409
 *           description: Error code
 *         message:
 *           type: string
 *           description: Error message
 *           example: "Email already in use"
 *
 *     InternalServerErrorResponse:
 *       type: object
 *       required:
 *         - status
 *         - code
 *         - message
 *       properties:
 *         status:
 *           type: string
 *           example: Internal Server Error
 *           description: Error status
 *         code:
 *           type: Number
 *           example: 500
 *           description: Error code
 *         message:
 *           type: string
 *           description: Error message
 *           example: "Example() is not a function in this context"
 *
 *     RefreshTokensData:
 *       type: object
 *       required:
 *         - accessToken
 *         - refreshToken
 *       properties:
 *         accessToken:
 *           type: string
 *           description: New access Token for the user
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         refreshToken:
 *           type: string
 *           descripition: New refresh Token for the user
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *
 *     UserLoginData:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User's unique and valid e-mail address
 *           example: JohnDoe@gmail.com
 *         password:
 *           type: string
 *           descripition: User's password, minimum 6 characters long
 *           example: Password123$
 *
 *     UserRegistrationData:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *       properties:
 *         email:
 *           type: string
 *           description: User's unique and valid e-mail address
 *           example: JohnDoe@gmail.com
 *         password:
 *           type: string
 *           descripition: User's password, minimum 6 characters long
 *           example: Password123$
 *         firstName:
 *           type: string
 *           description: User's first name, minimum 3 characters long
 *           example: John
 *
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *       properties:
 *         email:
 *           type: string
 *           description: User's unique and valid e-mail address
 *           example: JohnDoe@gmail.com
 *         password:
 *           type: string
 *           descripition: User's password, minimum 6 characters long
 *           example: Password123$
 *         firstName:
 *           type: string
 *           description: User's first name, minimum 3 characters long
 *           example: John
 *         accessToken:
 *           type: string
 *           description: User's authentication access token
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         refreshToken:
 *           type: string
 *           description: User's authentication refresh token
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         balance:
 *           type: Number
 *           description: User's wallet balance
 *           example: 12.50
 *         transactions:
 *           type: array
 *           description: History of user's transactions
 *           example: [Array of transaction objects]
 *
 *     Transaction:
 *       type: object
 *       required:
 *         - type
 *         - category
 *         - value
 *         - date
 *       properties:
 *         type:
 *           type: string
 *           descsription: Type of transaction
 *           enum:
 *             - Income
 *             - Expense
 *           example: Income
 *         category:
 *           type: string
 *           description: Transaction category
 *           enum:
 *             - Income
 *             - Main expenses
 *             - Products
 *             - Car
 *             - Self care
 *             - Child care
 *             - Household products
 *             - Education
 *             - Leisure
 *             - Other expenses
 *             - Entertainment
 *           example: Income
 *         value:
 *           type: Number
 *           description: Amount of money used for the transaction
 *           example: 50.00
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the transaction
 *           example: 06-30-2023
 *         comment:
 *           type: string
 *           description: Additional comment for the transaction
 *           example: Insurance renewal
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistrationData'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRegistrationData'
 *       400:
 *         description: Bad request, invalid registration data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestResponse'
 *       409:
 *         description: Conflict. Provided data should be unique, but it already exists.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConflictResponse'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponse'
 *
 */
router.post("/signup", ctrlTask.register);
router.post("/login", ctrlTask.login);
router.get("/logout", auth, ctrlTask.logout);
router.get("/current", auth, ctrlTask.current);
router.post("/transactions", auth, ctrlTask.addTransaction);
router.delete("/transactions/:transactionId", auth, ctrlTask.deleteTransaction);
router.patch("/transactions/:transactionId", auth, ctrlTask.updateTransaction);
router.get("/transactions/categories", auth, ctrlTask.getTransactionCategories);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/tokens:
 *   post:
 *     summary: Get a new pair of access and refresh tokens
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshTokensData'
 *       401:
 *         description: Not Authorised
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotAuthorised'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponse'
 *     security:
 *       - refreshToken: []
 *
 */
router.post("/tokens", refreshAuth, ctrlTask.refreshAuthTokens);
module.exports = router;
