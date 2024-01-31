const router = require('express')?.Router();

router.get('/health-check', (req, res) => {

    res.status(200).json({ success: true });
    
});

module.exports = router;