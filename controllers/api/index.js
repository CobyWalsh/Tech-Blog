const router = require('express').Router();

const blogPostRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userroutes');

router.use('/blogPost', blogPostRoutes);
router.use('/comment', commentRoutes);
router.use('/users', userRoutes);

module.exports = router;