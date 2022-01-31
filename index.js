const app = require('express')()
const mongoose = require('mongoose')
require('dotenv').config()
const bodyparser = require('body-parser')

//routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

//connect DB
mongoose.connect(process.env.DB_CONNECTION_URL, { useNewUrlParser: true }, () => console.log("Connected to DB succesfull!"))




//middlewares
app.use(bodyparser.json())
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(3000, () => console.log("Server up and running"))