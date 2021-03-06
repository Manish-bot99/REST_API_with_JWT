const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')

const { registerValidation, loginValidation } = require('../validation')


router.post('/register', async(req, res) => {

    //Validate data
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //checking duplicate email
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send("Email already registered!")

    //hashing passwords
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)

    //create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass
    })
    try {
        const savedUser = await user.save()
        res.send({ user: user._id })
    } catch (err) {
        res.status(400).send(err.message)
    }
})

//Login
router.post('/login', async(req, res) => {

    //Validate data
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //checking registered email
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("Email or password is wrong!")

    //password verification
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) res.status(400).send("password is wrong!")

    //Create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN)
    res.header('auth-token', token).send(token)


})

module.exports = router