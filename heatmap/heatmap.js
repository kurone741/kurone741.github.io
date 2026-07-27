document.addEventListener("DOMContentLoaded", () => {
            const GH_USER = "kurone741"; 
            const GH_REPO = "kurone741.github.io";  

            const today = new Date();
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(today.getFullYear() - 1);
            
            const sinceDate = oneYearAgo.toISOString();
            const dateCounts = {};
            let page = 1;

            function fetchCommits() {
                const TARGET_URL = `https://api.github.com/repos/${GH_USER}/${GH_REPO}/commits?per_page=100&page=${page}&since=${sinceDate}`;

                fetch(TARGET_URL)
                    .then(response => {
                        if (!response.ok) throw new Error("Failed to fetch GitHub commits");
                        return response.json();
                    })
                    .then(commits => {
                        if (commits.length === 0) {
                            renderHeatmap(dateCounts);
                            return;
                        }

                        commits.forEach(c => {
                            const dateString = c.commit.committer.date.substring(0, 10);
                            dateCounts[dateString] = (dateCounts[dateString] || 0) + 1;
                        });

                        if (commits.length === 100) {
                            page++;
                            fetchCommits();
                        } else {
                            renderHeatmap(dateCounts);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        document.getElementById("heatmap-stats").innerText = "无法加载 GitHub 更新记录";
                    });
            }

            fetchCommits();
        });

        function renderHeatmap(dateCounts) {
            const gridContainer = document.getElementById("heatmap-grid");
            const statsHeader = document.getElementById("heatmap-stats");
            
            const today = new Date();
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(today.getFullYear() - 1);

            const startDate = new Date(oneYearAgo);
            const dayOfWeek = startDate.getDay(); 
            const distanceToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; 
            startDate.setDate(startDate.getDate() - distanceToMonday);

            const endDate = new Date(today);
            const endDayOfWeek = endDate.getDay();
            const distanceToSunday = endDayOfWeek === 0 ? 0 : 7 - endDayOfWeek;
            endDate.setDate(endDate.getDate() + distanceToSunday);

            let uniqueActiveDays = 0;
            const fragment = document.createDocumentFragment();
            const tempDate = new Date(startDate);

            while (tempDate <= endDate) {
                const yyyy = tempDate.getFullYear();
                const mm = String(tempDate.getMonth() + 1).padStart(2, '0');
                const dd = String(tempDate.getDate()).padStart(2, '0');
                const dateString = `${yyyy}-${mm}-${dd}`;

                const count = dateCounts[dateString] || 0;
                const cube = document.createElement("div");
                cube.className = "cube";
                
                if (tempDate > today) {
                    cube.classList.add("level-0");
                    cube.style.opacity = "0.15";
                    cube.title = `${yyyy}年${mm}月${dd}日 (尚未到来)`;
                } else {
                    if (count > 0) uniqueActiveDays++;
                    
                    let level = 0;
                    if (count === 1) level = 1;
                    else if (count >= 2 && count <= 3) level = 2;
                    else if (count >= 4 && count <= 7) level = 3;
                    else if (count >= 8) level = 4;
                    
                    cube.classList.add(`level-${level}`);
                    cube.title = `${yyyy}年${mm}月${dd}日: 提交代码 ${count} 次`; 
                }

                fragment.appendChild(cube);
                tempDate.setDate(tempDate.getDate() + 1);
            }

            gridContainer.appendChild(fragment);
            statsHeader.innerText = `过去一年网站共代码迭代了 ${uniqueActiveDays} 天 (Updated ${uniqueActiveDays} days in the past year)`;
        }
