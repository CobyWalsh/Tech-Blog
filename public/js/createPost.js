document.addEventListener('DOMContentLoaded', () => {
    const createPostForm = document.querySelector('#post-form');
    const postTitleInput = document.querySelector('#post-title');
    const postContentInput = document.querySelector('#post-content');
  
    createPostForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const title = postTitleInput.value.trim();
      const content = postContentInput.value.trim();
  
      if (title && content) {
        try {
          const response = await fetch('/api/blogPostsRoutes', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            // Redirect to the dashboard or any other page you prefer
            window.location.replace('/dashboard');
          } else {
            // Handle errors here
            console.error('Failed to create blog post');
          }
        } catch (error) {
          console.error('Error creating blog post:', error);
        }
      } else {
        // Handle case where form fields are empty
        alert('Please fill out both title and content fields.');
      }
    });
  });
  