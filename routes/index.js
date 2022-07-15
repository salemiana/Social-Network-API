const router = require('express').Router();

//import API routes
const apiRoutes = require('./api');

router.use('/api', apiRoutes);


module.exports = router;