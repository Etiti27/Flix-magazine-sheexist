const mongoose= require('mongoose');
const firstMagSchema= new mongoose.Schema({
    username:String,
    name:String
})

const FirstMagModel = mongoose.model('First', firstMagSchema);
module.exports = FirstMagModel;