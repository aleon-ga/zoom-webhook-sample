const router = require('express')?.Router();
const { validateSignature } = require('../middlewares');

router.post('/webhook', [validateSignature], (req, res) => {

    const response = { message: 'Authorized request to Zoom Webhook sample.', status: 200 };

    console.log(response.message);

    res.status(response.status).json(response);

    console.log(req.body);

    // Business logic here, example make API request to Zoom or 3rd party

    return;

});

module.exports = router;