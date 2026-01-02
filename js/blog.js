async function loadBlog() {
    const url = "https://raw.githubusercontent.com/MercyfulFajd/MercyfulFajd.github.io/refs/heads/main/README.md";
    const res = await fetch(url);
    const md = await res.text();
    document.getElementById("blog").innerHTML = marked.parse(md);
} loadBlog();