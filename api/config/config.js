require("dotenv").config();

module.exports =  {
    jwtSecret: 'long-live-the-ionic-academy',
    db: `postgres://${process.env.DB_HOST}/${process.env.DB_DATABASE}`
    
};