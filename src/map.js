window.addEventListener("load", () => {

    const logoPanel = document.getElementById("logoPanel");
    const teamList = document.getElementById("teamList");

    const observer = new MutationObserver(() => {
        const clubs = {};
        document.querySelectorAll("#teamList article").forEach(article => {
            const name = article.querySelector("h2")?.textContent?.trim();
            const logo = article.querySelector("img")?.src;
            if (name && logo) clubs[name] = logo;
        });

        if (Object.keys(clubs).length === 0) return;

        observer.disconnect();

        const cantonClubs = {
            "label-vd": [
                "FC Dardania Lausanne",
                "FC Amical St-Prex",
                "Vevey-Sports",
                "FC Echallens",
                "FC Stade-Payerne",
                "FC La Sarraz-Eclépens",
                "FC Stade Lausanne Ouchy",
                "Yverdon Sport FC",
                "FC Stade Nyonnais"
            ],
            "label-fr": ["FC Bulle"],
            "label-vs": ["FC Sion", "FC Martigny-Sports", "FC Monthey"],
            "label-ge": [
                "FC Kosova",
                "Lancy FC",
                "CS Chênois",
                "FC Grand-Saconnex",
                "Etoile Carouge",
                "Meyrin FC"
            ],
            "label-ne": [
                "Neuchâtel Xamax FCS",
                "FC Biel-Bienne1896",
                "FC Saint-Blaise"
            ],
            "label-ju": [
                "Sports-Réunis Delémont",
                "FC Bassecourt",
                "FC Ajoie-Monterri",
                "CS Romontois"
            ]
        };

        document.querySelectorAll(".canton-label").forEach(label => {

            label.addEventListener("mouseenter", () => {
                const list = cantonClubs[label.id];
                if (!list) return;

                logoPanel.innerHTML = "";
                list.forEach(club => {
                    if (clubs[club]) {
                        const img = document.createElement("img");
img.src = clubs[club];
img.alt = club;
img.classList.add("map-logo"); //  AJOUT ESSENTIEL
logoPanel.appendChild(img);


void img.offsetWidth;
img.style.animation = "logoFade 0.6s ease forwards";

                    }
                });

                logoPanel.style.display = "flex";
            });

            label.addEventListener("mouseleave", () => {
                logoPanel.style.display = "none";
            });
        });
    });

    observer.observe(teamList, { childList: true, subtree: true });
});
