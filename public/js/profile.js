const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#project-name').value.trim();
    const needed_funding = document.querySelector('#project-funding').value.trim();
    const description = document.querySelector('#project-desc').value.trim();
  
    if (name && needed_funding && description) {
      const response = await fetch(`/api/projects`, {
        method: 'POST',
        body: JSON.stringify({ name, needed_funding, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };

// Function to create a new blog post
document.addEventListener('DOMContentLoaded', () => {
const createBlogPost = async (title, content) => {
  try {
    const response = await fetch('/api/blogposts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload(); // Refresh the page after creating the blog post
    } else {
      alert('Failed to create blog post');
    }
  } catch (error) {
    console.error('Error creating blog post:', error);
  }
};

  // Event listener for the new blog post form submission
  const blogForm = document.querySelector('#blog-form');
  if (blogForm) {
    blogForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.querySelector('#blog-title').value.trim();
      const content = document.querySelector('#blog-content').value.trim();

      if (title && content) {
        createBlogPost(title, content);
      } else {
        alert('Please fill out both title and content fields.');
      }
    });
  }
});


  // const buttonElement 
  // document
  //   .querySelector('.new-project-form')
  //   .addEventListener('submit', newFormHandler);
  
  // document
  //   .querySelector('.project-list')
  //   .addEventListener('click', delButtonHandler);
  