const  router = require('express').Router();

const userRoutes = require('./users-routes');
const thoughtRoutes = require('./thoughts-routes');

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;