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
                "FC Echallens Région",
                "FC Stade-Payerne",
                "FC La Sarraz-Eclépens",
                "FC Stade Lausanne Ouchy (SLO)",
                "Yverdon Sport FC",
                "FC Stade Nyonnais"
            ],
            "label-fr": ["FC Bulle"],
            "label-vs": ["FC Sion", "FC Martigny-Sports", "FC Monthey"],
            "label-ge": [
                "FC Kosova (Genève)",
                "Lancy FC",
                "CS Chênois",
                "FC Grand-Saconnex",
                "Étoile Carouge FC"
            ],
            "label-ne": [
                "Neuchâtel Xamax FCS",
                "FC Biel-Bienne 1896",
                "FC Saint-Blaise"
            ],
            "label-ju": [
                "Sports-Réunis Delémont (SR Delémont)",
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
                        logoPanel.appendChild(img);
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
