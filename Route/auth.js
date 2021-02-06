const router=require('express').Router();
const { response } = require('express');
const User=require('./Module/user');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const {registerValidation,loginValidation}=require('./Module/Validation');


router.post('/register',async(req, res)=>{


    const{error}=registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)
  
 //if email already exsist
 const emailexsist=await User.findOne({email:req.body.email})
 if(emailexsist) return res.status(400).send('email already exsist')

 //password hasing
 const salt=await bcrypt.genSalt(10);
 const hashPassword=await bcrypt.hash(req.body.password,salt);

    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword

    });
    try{
        const savedUser=await user.save();
        res.send(savedUser),
        res.send('data sucess fully added')
 
    }catch(err){
        res.status(400).send(err)

    };
  })
  router.post('/login',async(req,res)=>{

    const{error}=loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)


    const user=await User.findOne({email:req.body.email})
 if(!user) return res.status(400).send('email not exsist')
 //if password in incorrect

 const validpas=await bcrypt.compare(req.body.password,user.password)
 if(!validpas)return res.status(400).send('invalid pas')

 //create and assign the token
 const token =jwt.sign({_id:user.id},process.env.JWT_KEY)
 res.header('auth-token',token).send(token);

 

  })

module.exports=router;








