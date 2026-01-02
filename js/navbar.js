async function buildNavbar() {
    const nav = document.getElementById("navbar");
    if (!nav) return;

    const res = await fetch("json/general.json");
    const navData = await res.json();

    const currentPath = window.location.pathname;
    const ul = document.createElement("ul");
    ul.classList.add("nav-list");

    // Internal links
    navData.internal.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.textContent = item.name;
        a.href = item.url;

        if (currentPath.endsWith(item.url)) {
            a.classList.add("current");
        }

        li.appendChild(a);
        ul.appendChild(li);
    });

    // Divider
    const divider = document.createElement("li");
    divider.classList.add("nav-divider");
    divider.textContent = "|";
    ul.appendChild(divider);

    // External links
    navData.external.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.textContent = item.name;
        a.href = item.url;
        a.target = "_blank";

        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
}

buildNavbar();
