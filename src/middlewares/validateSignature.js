const crypto = require('node:crypto');

const validateSignature = (req, res, next) => {

    // Construct the message string
    const message = `v0:${req.headers['x-zm-request-timestamp']}:${JSON.stringify(req.body)}`;

    const hashForVerify = crypto.createHmac('sha256', process.env.ZOOM_WEBHOOK_SECRET_TOKEN).update(message).digest('hex');

    // Hash the message string with the Webhook Secret Token and prepend the version semantic
    const signature = `v0=${hashForVerify}`;

    // We validating the request came from Zoom: https://marketplace.zoom.us/docs/api-reference/webhook-reference#notification-structure
    if (req.headers['x-zm-signature'] !== signature) {

        const response = { message: 'Unauthorized request to Zoom Webhook sample.', status: 401 };

        console.error(response.message);

        res.status(response.status).json(response);

        return;

    };

    const { event, payload } = req.body;

    // Zoom validating we control the webhook endpoint: https://marketplace.zoom.us/docs/api-reference/webhook-reference#validate-webhook-endpoint
    if(event === 'endpoint.url_validation') {

        const { plainToken } = payload;

        const hashForValidate = crypto.createHmac('sha256', process.env.ZOOM_WEBHOOK_SECRET_TOKEN).update(plainToken).digest('hex');

        const response = { message: { plainToken, encryptedToken: hashForValidate }, status: 200 };

        console.log(response.message);

        res.status(response.status).json(response.message);

        return;

    };

    next();

};

module.exports = validateSignature;