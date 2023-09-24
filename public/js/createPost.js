const createPostForm = document.querySelector("#post-form");
const postTitleInput = document.querySelector("#post-title");
const postContentInput = document.querySelector("#post-content");

createPostForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const blog_title = postTitleInput.value.trim();
  const blog_text = postContentInput.value.trim();
  console.log("click submit");
  if (blog_title && blog_text) {
    try {
      const response = await fetch("/api/blogPost", {
        method: "POST",
        body: JSON.stringify({ blog_title, blog_text }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        // Redirect to the dashboard or any other page you prefer
        window.location.replace("/dashboard");
      } else {
        // Handle errors here
        console.error("Failed to create blog post");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  } else {
    // Handle case where form fields are empty
    alert("Please fill out both title and content fields.");
  }
});
