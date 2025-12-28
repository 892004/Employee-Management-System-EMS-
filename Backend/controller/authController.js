const db = require('../db');
const bcrypt = require('bcrypt');
const { json } = require('express');
const jwt = require('jsonwebtoken');



// 1. Register Employee
exports.registerEmployee = async(req , res)=>{
 try{
    const {name , email , password , role , department , salary } = req.body;

    const hashedPassword = await bcrypt.hash(password , 10);

    db.query(
        "CALL register_employee(?,?,?,?,?,?)",
        [name , email , hashedPassword , role , department , salary],
        (err)=>{
            if(err) return res.status(500).json(err);

            res.status(201).json({message:"Employee Register Succesfully....."})
        }
    )
 }catch(error){
    res.status(500).json(error);
 }
}


// 2 . Login Employee 
exports.loginEmployee = async(req , res)=>{ 
        const{email , password} = req.body;

        db.query(
            "CALL login_employee(?)",
            [email],
            async (err , result) => {
                if(err) return res.status(500).json(err);

                const user =  result[0][0];
                if(!user) 
                return res.status(401).json({message:"Invalid email"})


                const ismatch = await bcrypt.compare(password, user.password);
                if(!ismatch)
                    return res.status(401).json({message:"Invalid Password"});

                const token = jwt.sign(
                    {id:user.id ,  role:user.role},
                    process.env.JWT_SECRET,
                    {expiresIn: "5h"}
                );

                res.json({message:"Login Succesfully...", token})
            });
};