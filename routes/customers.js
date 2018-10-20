const { Customer, validate } = require('../models/Customer')

module.exports = (app) => {
    app.get('/api/customers', async (req, res) => {
        const customers = await Customer.find({})
        res.send(customers)
    })

    app.post('/api/customers', async (req, res) => {
        console.log('req', req.body);
        const { error } = validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const customer = new Customer ({
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone,
        })
        await customer.save()
        res.send(customer)
    })

    app.put('/api/customers/:id', async (req, res) => {

        const { error } = validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }, {new: true})

        if (!customer) return res.status(404).send('The customer was not found')
        res.send(customer)
    })

    app.delete('/api/customers/:id', async (req, res) => {
        const customer = await Customer.findByIdAndRemove(req.params.id)
        if(!customer) return res.status(404).send('The customer was not found')
        res.send(customer)
    })

    app.get('/api/customers/:id', async (req, res) => {
        const customer = await Customer.findById(req.params.id)
        res.send(customer)
    })
}
