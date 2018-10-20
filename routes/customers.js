const { Customer, validate } = require('../models/Customer')

module.exports = (app) => {
    app.get('/api/customers', (req, res) => {
        res.send('customers')
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

}
