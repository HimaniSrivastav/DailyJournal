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


module.exports = router;