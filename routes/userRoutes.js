const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController');


// Login routes
router.get('/login', (req, res) => {
  console.log(' Serving login.html...');
  res.sendFile(path.join(__dirname, "../views", "login.html"));
});
router.post('/login', userController.loginUser);

// Registering routes
router.get('/register', (req,res) =>{
  res.sendFile(path.join(__dirname, "../views", "register.html"));
});

router.post('/register', userController.registerUser);

//  Logout route
router.get('/logout', (req, res) =>{
  req.session.destroy((err)=>{
    if(err){
      console.error("Error during logout:", err);
      return res.status(500).send("Trouble in logging out.");
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  })
})

module.exports = router;