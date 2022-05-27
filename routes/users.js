const express = require("express");
const router = express.Router();
const User = require("../models/user");
const config = require ("config");
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", [
  check("name", "Name is required")
    .not()
    .isEmpty(),

  check("email", "Please include a valid email.")
    .isEmail(),

  check("password", "Please enter a password with minimal 6 or more characters.")
    .isLength({ min: 6 })
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({email});
        //check if user exists
        if(user){
            return res.status(400).json({errors:[{msg:"User already exists."}]});
        }

        //create a user instance (empty user from above)
        user = new User({
            name, 
            email,  
            password
        })

        //password encription
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        
        //return json webtoken
        const payload = {
          user: {
              id: user.id,
          }
        }

        jwt.sign (
          payload, 
          config.get("jwtSecret"),
          {expiresIn: 360000}, 
          (err, token)=> {
              if(err)throw err;
              res.json({token, user});
          }
          );
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }

  });

module.exports=router;