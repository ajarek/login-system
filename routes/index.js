const express = require('express')
const router = express.Router()
const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const open = require('open');

router.post('/api/register',async(req, res) => {
    const email = req.body.email
    let password = req.body.password

    let pack
    try{
        const salt = await bcrypt.genSalt(Number(10));
        password = await bcrypt.hash(password, salt);

     pack = new Users({email,password})
    await pack.save()
    }
    catch(err){
    return res.status(422).json('something went wrong ๐')
    }
    res.status(201).json('register in:'+pack.email+ '๐')
})


router.post('/api/login',async(req, res) => {
    
    const user = await Users.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({mesage:"Invalid email or password ! ๐",status:400})
    try{

        const isMatch = await bcrypt.compare(req.body.password, user.password)
       if(isMatch){
        res.status(201).json({mesage:`logged in:${user.email} ๐`,status:201})
         }
       else{
        return res.status(422).json({mesage:'Invalid password ! ๐',status:422})    
       }
    }
    catch(err){
    return res.status(400).json({mesage:'Invalid password ! ๐',status:400})
    }   
})

router.post('/api/forgot-password',async (req, res) => {
    const {email} = req.body 
    const user = await Users.findOne({ email: req.body.email })
    
    if(!user){
        res.status(400).json({mesage:"Uลผytkownik nie zostaล zarejestrowany! ๐",status:400})
       return
    }


       const link = `http://localhost:3000/reset-password/${user._id}`
       
       res.status(201).json({mesage:`Password reset link ๐๏ธ`,status:201,
    link:link})
       
})
router.get('/reset-password/:id',(req, res) => {
    res.render('reset-password',{id:req.params.id})
})


router.post('/reset-password/:id', async(req, res, next) => {
    const{id}=req.params
    const user = await Users.findOne({ _id:id })
    let {password,password2} = req.body
    if(password !== password2){
        res.status(400).json({mesage:"Passwords differ ...! ๐",status:400})
    return
    }
 
    try{   
if(id !== user.id){
    res.status(400).json({mesage:"Whatever id ...! ๐",status:400})
    return
}


    const salt = await bcrypt.genSalt(Number(10));
    password = await bcrypt.hash(password, salt);
    
    pack = await Users.updateOne({_id: user.id},{$set:{password:password}})
   
    res.status(200).json({mesage:"Password successfully updated!๐",status:200})
    open('index.html')
    }

catch(error){
    res.status(400).json({mesage:"Something went wrong ...! ๐",status:400})
   
}
})
module.exports = router