function ensureLoggedIn(req, res, next){
  if(req.session && req.session.user){
    next();
  }else{
    console.log("Not logged in. Redirecting to login.");
    res.redirect("/user/login");
  }
}
     module.exports = { ensureLoggedIn };