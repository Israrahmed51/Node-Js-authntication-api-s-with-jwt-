const jwt=require('jsonwebtoken');

module.exports=function auth(req,res,next){
    const token=req.header('auth-token')
    if(!token)return res.status(402).send('access denied');

    try{

const verified=jwt.verify(token,process.env.JWT_KEY);
req.user=verified;
next();

    }
    catch(error){
        res.status(400).send('invalid token')

    }
}