const router = require('express').Router();

const blogPostRoutes = require('../blogPostRoutes');
const userRoutes = require('../userroutes');

router.use('/blogPost', blogPostRoutes);
router.use('/users', userRoutes);

module.exports = router;