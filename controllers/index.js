const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const userroutes = require('./api/userRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/profile', apiProfile);
module.exports = router;