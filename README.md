# Wallet-backend

localhost:3000/users
/signup POST
{
"email": "example@example.pl",
"password": "example2023",
"firstName": "Example"
}
/login POST
{
"email": "example@example.pl",
"password": "example2023",
}
/logout GET
only with bearer token
{}
/current GET
only with bearer token
{}
/transactions POST
only with bearer token
{
"type": {"Income", "Expense"} - only valid
"category":
{
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
} - only valid
"value": 1000, - must be number
"date": "12-20-2022", - date in format "MM-DD-YYYY"
"comment": "test" - not required, string
}
/transactions/{transactionId} DELETE
only with bearer token
