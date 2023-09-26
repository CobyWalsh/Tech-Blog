const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
     blog_title: req.body.blog_title,
     blog_text: req.body.blog_text,
      user_id: req.session.user_id,
    });
    console.log('in back end');
    console.log(req.body);
    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
