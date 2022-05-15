let postsArray = [];
const form = document.getElementById("new-post")

function renderPosts() {
  let html = "";
  for (let post of postsArray) {
    html += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr>
            `;
  }
  // console.log(html)
  document.getElementById("recent-post").innerHTML = html;
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((data) => {
    postsArray = data.slice(0, 5);
    // console.log(postsArr)
    renderPosts()

  });

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const postTitle = document.getElementById("post-title").value;
  const postBody = document.getElementById("post-body").value;
  // console.log(postTitle)
  const data = {
    title: postTitle,
    body: postBody,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((res) => res.json())
    .then((post) => {
      postsArray.unshift(post)
      renderPosts()
      form.reset()
    });
});
