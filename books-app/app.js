require("dotenv").config()
require("./db")

const express = require("express")
const app = express()

require("./config")(app)
require("./config/session.config")(app) // session config

app.locals.siteTitle = `BookaREST_`

const indexRoutes = require("./routes/index.routes")
app.use("/", indexRoutes)

const booksRoutes = require("./routes/books.routes")
app.use("/libros", booksRoutes)

const authRoutes = require("./routes/auth.routes")
app.use("/", authRoutes)

const userRouter = require("./routes/user.routes")
app.use("/", userRouter)

require("./error-handling")(app)

module.exports = app