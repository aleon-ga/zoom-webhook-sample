const router = require('express')?.Router();
const healthCheckRoute = require('./healthCheck');
const webhookRoute = require('./webhook');

router.use('/api/v1', [healthCheckRoute, webhookRoute]);

module.exports = router;