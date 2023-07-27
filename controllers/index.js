const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const blogPostRoutes = require('./blogPostRoutes');
// const commentRoutes = require('./commentRoutes');
const userroutes = require('./userroutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/blogPost', blogPostRoutes);
// router.use('/comment', commentRoutes);
// router.use('/users', userRoutes);

module.exports = router;