var jwt = require('jsonwebtoken');
var config = require('../config/config');
const {pool} =  require('../dbConfig');
const bcrypt = require('bcrypt');
var {User} = require('../models/user');
const saltRounds = 10;


function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 2629746 // 86400 expires in 24 hours
      });
}

 
exports.registerUser =  async (req, res, next) => {

    let {name, email, pass, pass1 } = req.body;
    let errors =[];
    if (pass.length < 6) {
        errors.push({ message: 'Please enter password longer then 6 characters' })
    }
    if (pass != pass1) {
        errors.push({ message: 'Passwords do not match' })
    }
    if (errors.length > 0) {
        res.status(400).json({ err:  errors });
    }else{
        User.findAll({where:{
            email: email
        }}).then(async user => {
            console.log(user)
            if (user.length>0){
                res.status(400).json({ err:  'invalid email' });
            }else{
                try {
                    const hash = bcrypt.hashSync(req.body.pass, saltRounds);
                    const newUser = await User.create({
                        name: name,
                        email: email,
                        pass: hash,
                      });
                    newUser.save();
                    res.json({ user: newUser }) 
                    } catch(error) {
                    console.error(error)
                    } 
            }
        })
    }
    
        
}; 
 
exports.loginUser  = (req, res) => {
    const password = req.body.pass;
    const email = req.body.email;
    console.log(email,password)
    if (!req.body.email || !req.body.pass) {
         res.status(400).send({ 'msg': 'You need to send email and password' });
    }
    User.findAll({where:{email:email}}).then( async user => {
        
            if(user.length > 0){
                const hash = user[0].pass;
                console.log(user,hash);
                isMatched= bcrypt.compareSync(password, hash);
                console.log(password,hash,isMatched);
                if (isMatched){
                        console.log('Authentication succsessful')
                        console.log(user[0])
                        res.status(200).json(
                            {
                                token: createToken(user[0])
                            });
                    }
                    else{
                        console.log('Authentication faild, password doenst match')
                        res.status(400).json({ msg: 'The  password don\'t match.'});
                    }
               
            }else{
                 res.status(400).json({ msg: 'The email don\'t match.' }); 
            }
        }
        ).catch(err => console.log(err.message))


};

