const express =  require("express");
const router = express.Router();
const db =  require('../db')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')


router.get(
  '/employees',
  authMiddleware,
  adminMiddleware,   // 🔥 ROLE CHECK
  (req, res) => {
    db.query("CALL get_employees()", (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    });
  }
);

// Employee -  Get Own Profile
router.get('/profile',authMiddleware,(req , res)=>{
    const employeeId =  req.user.id;
     db.query("CALL get_employee_by_id(?)",[employeeId],(err , result)=>{
        if(err)
            return res.status(500).json(err);
            res.json(result[0][0])
     })
})  


// ADMIN - Get employee by ID
router.get(
  '/employees/:id',
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    const id = req.params.id;

    db.query(
      "CALL get_employee_by_id(?)",
      [id],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0][0]);
      }
    );
  }
);

module.exports = router