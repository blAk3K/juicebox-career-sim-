function requireUser(req, res, next) {
  if(req.user) {
    next();
 
  } 
 
  else{
   
   res.sendstatus(401);
  }
 }
 
 module.exports = {
   requireUser
 }