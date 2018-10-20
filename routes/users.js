const _ = require('lodash')
const express = require('express');
const router = express.Router()
const { User, validate } = require('../models/User')

router.post('/', async (req, res) => {
    console.log('req', req.body);
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const userExists = await User.findOne({email: req.body.email})
    if (userExists) res.status(400).send('The Email registered already')

    let user;
    // const user = new User ({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    // })
    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    await user.save()

    const picked = _.pick(user, ['_id', 'name', 'email'])
    res.send(picked)
})

module.exports = router
