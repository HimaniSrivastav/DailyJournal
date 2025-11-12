const bcrypt = require('bcrypt');

const registerUser = (req,res) =>{
  const db = req.app.locals.db;
  const { username, email, password } = req.body;

  if(!username || !email || !password){
    res.status(400).send('All fields are required.');
    return;
  }
    db.collection("users")
    .findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        res.status(400).send("Email already in use.");
      }

      // If email is unique, hash the password
      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => {
      if (!hashedPassword) return; 

      //  Insert user into database
      return db.collection("users").insertOne({
        username,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });
    })
    .then((result) => {
      if (!result) return;
      console.log(" User registered with ID:", result.insertedId);
      res.redirect("/user/login"); // redirect after success
    })
    .catch((err) => {
      console.error(" Error during user registration:", err);
      res.status(500).send("Internal server error.");
    });
};
const loginUser = (req, res) =>{
  const db = req.app.locals.db;
  const { email, password } = req.body;

  db.collection("users").findOne({ email })
  .then((user) => {
    if(!user){
      return res.status(400).send("User Not Found");
      
    }
    return bcrypt.compare(password, user.password)
    .then((match) => {
      if(!match){
  return res.status(400).send("Invalid Credentials");
}

      console.log("User logged in:", user._id);
      res.redirect("/journal");
    });
  })  .catch(err => {
      console.error("Error during login:", err);
      res.status(500).send("Error during login");
    });
};
module.exports = { registerUser, loginUser };