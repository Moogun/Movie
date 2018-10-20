const _ = require('lodash')
const express = require('express');
const router = express.Router()
const { User, validate } = require('../models/User')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    console.log('req', req.body);
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email})
    if (user) res.status(400).send('The Email registered already')

    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(req.body.password, salt)
    await user.save()

    const picked = _.pick(user, ['_id', 'name', 'email'])
    res.send(picked)
})

module.exports = router
