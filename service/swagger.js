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
 *           example: "Missing field: example"
 *
 *     NotAuthorisedResponse:
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
 *           example: "Server crash"
 *
 *     RegistrationData:
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
 *     RegistrationDataResponse:
 *       type: object
 *       required:
 *         - email
 *         - firstName
 *       properties:
 *         email:
 *           type: string
 *           description: User's unique and valid e-mail address
 *           example: JohnDoe@gmail.com
 *         firstName:
 *           type: string
 *           description: User's first name, minimum 3 characters long
 *           example: John
 *
 *     LoginData:
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
 *     LoginDataResponse:
 *       type: object
 *       required:
 *         - accessToken
 *         - refreshToken
 *         - user
 *       properties:
 *         accessToken:
 *           type: string
 *           description: New access Token for the user
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         refreshToken:
 *           type: string
 *           descripition: New refresh Token for the user
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         user:
 *           type: object
 *           description: User data
 *           example: {
 *              email: JohnDoe@gmail.com,
 *              firstName: John,
 *              balance: 1000,
 *              transactions: []}
 *
 *     LogoutResponse:
 *       type: object
 *       required:
 *         - status
 *         - code
 *         - message
 *       properties:
 *         status:
 *           type: string
 *           example: OK
 *           description: OK
 *         code:
 *           type: Number
 *           example: 204
 *           description: OK code
 *         message:
 *           type: string
 *           description: OK message
 *           example: "User logged out"
 *
 *     CurrentDataResponse:
 *       type: object
 *       required:
 *         - email
 *         - firstName
 *         - balance
 *         - transactions
 *       properties:
 *         email:
 *           type: string
 *           description: User's unique and valid e-mail address
 *           example: JohnDoe@gmail.com
 *         firstName:
 *           type: string
 *           description: User's first name, minimum 3 characters long
 *           example: John
 *         balance:
 *           type: number
 *           description: User's actual balance
 *           example: 1000
 *         transactions:
 *           type: table
 *           description: User's transactions
 *           example: []
 *
 *     RefreshTokensDataResponse:
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
 *     TransactionDataResponse:
 *       type: object
 *       required:
 *         - balance
 *         - transactions
 *       properties:
 *         balance:
 *           type: number
 *           description: User's actual balance
 *           example: 1000
 *         transactions:
 *           type: table
 *           description: User's transactions
 *           example: [{"type": "Expense",
      "category": "Car",
      "value": 1000,
      "date": "12-20-2022",
      "comment": "test",
      "id": "95dd57d7-e3c2-43b4-9724-fa668eba625b"
    },]
 *
 *     CategoriesDataResponse:
 *       type: object
 *       required:
 *         - categories
 *       properties:
 *         categories:
 *           type: array
 *           description: Array of transaction categories
 *           example: [Income, Main expenses,]
 *
 *     StatisticsDataResponse:
 *       type: object
 *       required:
 *         - income
 *         - expenses
 *         - mainExpenses
 *         - products
 *       properties:
 *         income:
 *           type: number
 *           description: User's total income
 *           example: 1000
 *         expenses:
 *           type: number
 *           description: User's total expenses
 *           example: 1000
 *         mainExpenses:
 *           type: number
 *           description: User's total expenses in this category
 *           example: 1000
 *         products:
 *           type: number
 *           description: User's total expenses in this category
 *           example: 1000
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
 *           example: 2023-10-23
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
 *             $ref: '#/components/schemas/RegistrationData'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationDataResponse'
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
 * /users/login:
 *   post:
 *     summary: Log in user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginData'
 *     responses:
 *       200:
 *         description: User logged in.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginDataResponse'
 *       400:
 *         description: Bad request, invalid login data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestResponse'
 *       401:
 *         description: Unauthorized. Email or password is wrong.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotAuthorisedResponse'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponse'
 *
 * /users/logout:
 *   get:
 *     summary: Log out user.
 *     tags: [Users]
 *     responses:
 *       204:
 *         description: User logged out
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutResponse'
 *       401:
 *         description: Not Authorised
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotAuthorisedResponse'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponse'
 *     security:
 *       - accessToken: []
 *
 * /users/current:
 *   get:
 *     summary: Get current user informations
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User informations.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CurrentDataResponse'
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotAuthorisedResponse'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponse'
 *     security:
 *       - accessToken: []
 *
 * /users/tokens:
 *   post:
 *     summary: Get a new pair of access and refresh tokens
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: New tokens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshTokensDataResponse'
 *       401:
 *         description: Not Authorised
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotAuthorisedResponse'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponse'
 *     security:
 *       - refreshToken: []
 *
 * /users/transactions:
 *   post:
 *     summary: Add new transaction
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: New transaction added.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionDataResponse'
 *       400:
 *         description: Bad request, invalid transaction data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestResponse'
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotAuthorisedResponse'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponse'
 *     security:
 *       - accessToken: []
 *
 * /users/transactions/{transactionId}:
 *   delete:
 *     summary: Delete transaction
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *           example: 95dd57d7-e3c2-43b4-9724-fa668eba625b
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionDataResponse'
 *       404:
 *         description: Not found. Transaction do not exist or wrong Id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundResponse'
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotAuthorisedResponse'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponse'
 *     security:
 *       - accessToken: []
 *
 * /users/transactions/{transactionID}:
 *   patch:
 *     summary: Update transaction
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *           example: 95dd57d7-e3c2-43b4-9724-fa668eba625b
 *         description: Transaction ID
 *     responses:
 *       201:
 *         description: Transaction updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionDataResponse'
 *       400:
 *         description: Bad request, invalid transaction data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestResponse'
 *       404:
 *         description: Not found. Transaction do not exist or wrong Id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundResponse'
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotAuthorisedResponse'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponse'
 *     security:
 *       - accessToken: []
 *
 * /users/categories:
 *   get:
 *     summary: Get transaction categories
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Transaction categories.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriesDataResponse'
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotAuthorisedResponse'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponse'
 *     security:
 *       - accessToken: []
 *
/users/statistics/{month}/{year}:
 *   get:
 *     summary: Get transactions statistics from the indicated year and month
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: number
 *           example: "04"
 *         description: Month number
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *           example: 2023
 *         description: Year number
 *     responses:
 *       200:
 *         description: Transactions statistics.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StatisticsDataResponse'
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotAuthorisedResponse'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponse'
 *     security:
 *       - accessToken: []
 *
 *
 */
