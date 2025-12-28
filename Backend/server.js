const express =  require("express")
require("dotenv").config();
const app = express();
const db  = require("./db")
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require ('./routes/employeeRoutes');

app.use(express.json());
app.use("/api/auth" , authRoutes)
app.use("/api" ,  employeeRoutes)

app.listen(3000,()=>{
    console.log(`server runnning is 3000`)
})