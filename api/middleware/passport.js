const {pool} =  require('../dbConfig');
var JwtStrategy = require('passport-jwt').Strategy, ExtractJwt  = require('passport-jwt').ExtractJwt;
var config = require('../config/config');
const {User} = require('../models/user');
var opts = {
    jwtFromRequest:  ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}
 
module.exports  = new  JwtStrategy(opts, function  (jwt_payload, done) {
     console.log(jwt_payload);
      User.findAll({
        where:{
        id:jwt_payload.id
    }
}).then(results =>{
            console.log(results)
            if(results.length > 0){
                const user = results[0];
                return done(null, user); 
            }else{
              return done(null, false, {message:"Email is not registerd"})  
            }
        }
        ).catch(err => {
           return done(err, false);
            })
});