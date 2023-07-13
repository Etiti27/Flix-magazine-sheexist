const mongoose = require('mongoose');
const magazineSchema=new mongoose.Schema({
    title:String,
    price:String,
    image:String,
    desc:String
})

const Magazine=mongoose.model('Magazine',magazineSchema);

module.exports=Magazine;