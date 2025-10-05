//Importing the necessary modules
const express       = require('express')
const app           = express()
const mysql         = require('promise-mysql')
const fileUpload    = require("express-fileupload")
let moment = require('moment-timezone')
//To have the datas to the time in Paris
moment().tz("Europe/Paris").format()
//Using express library fileUpload to retrieve images from the front by creating a req.file in the req object
app.use(fileUpload({
    createParentPath: true
}))


//Using express.urlencoded to retrieve form data via POST in the req.body object (false for simple form)
app.use(express.urlencoded({extended: false}))

//Using express.json to convert request body data into a JavaScript object
app.use(express.json())

//Using the cors library to allow cross-origin requests (API) if needed
const cors = require('cors')
app.use(cors())

//Using of express.static middleware to make static files (images, css, js) accessible via URL
app.use(express.static(__dirname + '/public'))

//Loading environment variables from an .env file into the process.env process
const dotenv = require("dotenv")
//reading the .env file and loading the environment variables it contains into process.env
dotenv.config()

//import routes for programs, users and orders
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const programRoutes = require("./routes/programRoutes")
const exerciseRoutes = require("./routes/exerciseRoutes")
const contactRoutes = require("./routes/contactRoutes")
const orderRoutes = require("./routes/orderRoutes")
const userProgramRoutes = require("./routes/userProgramRoutes")

//creating a new connection to the MySQL database
mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).then((db) => {
    console.log('La base de données est connectée')
    
    //test the database connection every 10 seconds to ensure it is still active
    setInterval(async function(){
        let res = await db.query('SELECT 1')
    }, 10000)
    
    //management of the main API routes
    app.get('/', async (req,res) =>{
        res.json({status: 200, msg: "Bienvenue sur l'API"})
    })
    
    //linking routes to the application
    userRoutes(app, db)
    authRoutes(app, db)
    programRoutes(app, db)
    exerciseRoutes(app, db)
    orderRoutes(app, db)
    contactRoutes(app, db)
    userProgramRoutes(app, db)
    
})    
.catch(err=>console.log(err))
//start the server on the port specified in the .env file or on the default port 9500
const PORT = process.env.PORT || 9500

//launch the server on the specified port
app.listen(PORT, () => {
    console.log(`Server sur le port ${PORT} en état de fonctionnement!`)
    console.log(`http://${process.env.DB_USER}.ide.3wa.io:${PORT}`)
})