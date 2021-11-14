const express = require('express')
const router = express.Router()
const Users = require('../models/Users')


router.post('/api/register',async(req, res) => {
    const email = req.body.email
    const password = req.body.password

    let pack
    try{
     pack = new Users({email,password})
    await pack.save()
    }
    catch(err){
    return res.status(422).json('something went wrong 😕')
    }
    res.status(201).json('register in:'+pack.email+ '😎')
})


router.post('/api/login',async(req, res) => {
    
    const user = await Users.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({mesage:"Invalid email or password ! 😕",status:400})
    try{
       if(user.password === req.body.password){
        res.status(201).json({mesage:`logged in:${user.email} 😎`,status:201})
         }
       else{
        return res.status(422).json({mesage:'Invalid password ! 😕',status:422})    
       }
    }
    catch(err){
    return res.status(400).json({mesage:'Invalid password ! 😕',status:400})
    }   
})



module.exports = router