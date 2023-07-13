const express = require('express');
const router= express.Router();
const Magazine= require('../../MongoDB/MagazineSchema')

router.get('/', function(req, res){
if(req.isAuthenticated()) {
res.render('populate')

}
})
router.post('/', function(req, res){
    const {title,desc, price,image}=req.body;
    const newMagazine=new Magazine({
        title,
        desc,
        image,
        price,
    })
    newMagazine.save()
    .then(()=>{
        res.redirect('/populate')
    })
})
module.exports = router