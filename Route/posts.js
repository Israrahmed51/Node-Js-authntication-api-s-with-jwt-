const router=require('express').Router();
const verify=require('./Verify-token')

router.get('/',verify,(req,res)=>{
    res.send('welcome to post')
})
module.exports=router