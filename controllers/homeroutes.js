const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blog posts and JOIN with user data
    // const blogPostData = await BlogPost.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //         {
    //             model: Comment,
    //             attributes: []
    //         }
    //   ],
    // });
      const blogPostData = await BlogPost.findAll({
      include: [ User ],
      });

    // Serialize data so the template can read it
    const blogPost = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogPost, 
      
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogpost/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blogPost = blogPostData.get({ plain: true });

    res.render('blogPost', {
      title: blogPost.title,       // Adjust this line according to your data model
      content: blogPost.content,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/blogPost', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });

    res.render('blogPost', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/blogPost');
    return;
  }

  res.render('login');
});

router.get('/profile', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  res.render('profile');
})

router.get('/dashboard', async (req, res) => {
  try {
    // Fetch the blog posts (adjust this based on your data model)
    const blogPostData = await BlogPost.findAll(); // You may need to add include for User data

    // Serialize data so the template can read it
    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
    // Render the 'dashboard.handlebars' template and pass the blog post data
  res.render('dashboard',  {
    blogPosts,
    logged_in: req.session.logged_in
  });
} catch (err) {
  res.status(500).json(err);
}
}); 

router.get('/dashboard/create', withAuth, (req, res) => {
  // Render the 'createPost.handlebars' template
  res.render('createPost', {
      logged_in: req.session.logged_in
  });
});

module.exports = router;
