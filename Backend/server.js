const express =  require("express")
const app = express();
const db  = require("./db")
const authRoutes = require('./routes/authRoutes');

require("dotenv").config();
app.use(express.json());
app.use("/api/auth" , authRoutes)

app.listen(3000,()=>{
    console.log(`server runnning is 3000`)
})