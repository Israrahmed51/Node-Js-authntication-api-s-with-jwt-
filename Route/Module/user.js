const mongoose=require('mongoose');


const userSchema=mongoose.Schema({

name:{
    type:String,
    required:true,
    min:6
},

email:{
    type:String,
    required:true,
    min:6
}
,
password:{
    type:String,
    required:true,
    min:6
},

})


module.exports=mongoose.model('user',userSchema);
