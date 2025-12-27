const express  = require("express");
const router = express.Router();

const {
    registerEmployee , loginEmployee
} = require('../controller/authController');

router.post("/api/register" ,  registerEmployee)
router.post("/api/login" ,  loginEmployee)

module.exports = router;