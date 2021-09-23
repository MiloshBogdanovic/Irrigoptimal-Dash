var express = require('express');
var router = express.Router();
var userController = require('../controller/user-controller');


router.post('/', userController.registerUser);
  
module.exports = router;

/*
router.post('/', async (req, res, next) => {
    let {name, email, pass, pass1 } = req.body;
    let errors =[]
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
                    res.json({ user: newUser }) // Returns the new user that is created in the database
                    } catch(error) {
                    console.error(error)
                    } 
            }
        })
    }
    

    /*
    pool.query(
            `SELECT * FROM users
            WHERE email = $1`, [email], (err, results) => {
            if (err) {
                throw err;
            }

            if (results.rows.length > 0) {
                errors.push({ message: 'Email already registerd' })
                res.json({ error: errors })
            } else {
                pool.query(
                    `INSERT INTO users(name, email, pass)
                        VALUES ($1, $2, $3)
                        RETURNING id, pass`, [name, email, hash],
                    (err, results) => {
                        if (err) {
                            throw err;
                        }
                        if (results) {
                            console.log(name, email, hash)
                            res.json({ message: 'User succesfuly created.' })
                        }

                    }
                )
            }
        }
        ); 
        
 
 
})
*/