const mongoose = require('mongoose');

exports.DBmongo=()=>{
     mongoose.connect(`mongodb+srv://${process.env.DBusername}:${process.env.DBpassword}@cluster0.qqlrjp5.mongodb.net/SheExistMagazine`)
    .then(() => console.log('Connected!'));
}

