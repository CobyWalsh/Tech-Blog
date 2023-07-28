const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const userroutes = require('./userroutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;