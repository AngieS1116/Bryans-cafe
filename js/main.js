document.addEventListener("DOMContentLoaded", () => {
    // 1. Footer Year
    const yearElem = document.getElementById("current-year");
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

    // 2. Form Submission Notification (Contact Page)
    const contactForm = document.getElementById("enquiry-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent actual submission
            alert("Thank you! Your message has been sent successfully.");
            contactForm.reset();
        });
    }

    // 3. Fetch and Render Menu Data (Menu Page)
    if (document.getElementById("menu-container")) {
        loadMenuDOM();
    }

    // 4. Fetch and Render Branches Data (Contact Page)
    if (document.getElementById("branches-container")) {
        loadBranchesDOM();
    }
});

function loadMenuDOM() {
    fetch('data/menu.xml')
        .then(response => {
            if (!response.ok) {
                console.error("Failed to load menu.xml");
                return;
            }
            return response.text();
        })
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const container = document.getElementById("menu-container");
            const categories = data.getElementsByTagName("category");

            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                const catName = category.getAttribute("name");

                const catSection = document.createElement("div");
                catSection.className = "menu-category";

                const catTitle = document.createElement("h2");
                catTitle.textContent = catName;
                catSection.appendChild(catTitle);

                const grid = document.createElement("div");
                grid.className = "menu-grid";

                const items = category.getElementsByTagName("item");
                for (let j = 0; j < items.length; j++) {
                    const item = items[j];
                    const name = item.getElementsByTagName("name")[0].textContent;
                    const price = item.getElementsByTagName("price")[0].textContent;
                    const desc = item.getElementsByTagName("description")[0].textContent;
                    const image = item.getElementsByTagName("image")[0].textContent;

                    const itemCard = document.createElement("div");
                    itemCard.className = "menu-item";

                    itemCard.innerHTML = `
                        <img src="${image}" alt="${name}">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h3>${name}</h3>
                                <div class="price">$${parseFloat(price).toFixed(2)}</div>
                            </div>
                            <p class="menu-item-desc">${desc}</p>
                        </div>
                    `;
                    grid.appendChild(itemCard);
                }

                catSection.appendChild(grid);
                container.appendChild(catSection);
            }
        })
        .catch(err => console.error(err));
}

function loadBranchesDOM() {
    fetch('data/branches.xml')
        .then(response => {
            if (!response.ok) {
                console.error("Failed to load branches.xml");
                return;
            }
            return response.text();
        })
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const container = document.getElementById("branches-container");
            const branches = data.getElementsByTagName("branch");

            for (let i = 0; i < branches.length; i++) {
                const branch = branches[i];
                const name = branch.getElementsByTagName("name")[0].textContent;
                const address = branch.getElementsByTagName("address")[0].textContent;
                const phone = branch.getElementsByTagName("phone")[0].textContent;
                const hours = branch.getElementsByTagName("hours")[0].textContent;
                const mapLink = branch.getElementsByTagName("map_link")[0].textContent;

                const branchCard = document.createElement("div");
                branchCard.className = "branch-card";

                branchCard.innerHTML = `
                    <h3>${name}</h3>
                    <p><strong>Address:</strong> ${address}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Open:</strong> ${hours}</p>
                    <a href="${mapLink}" target="_blank">View on Google Maps &rarr;</a>
                `;

                container.appendChild(branchCard);
            }
        })
        .catch(err => console.error(err));
}
