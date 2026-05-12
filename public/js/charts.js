let chartInstance = null;

async function getPlayerCount(server, days) {
    const response = await fetch("/api/playercount", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            server: server,
            days: days
        })
    });

    return await response.json();
}

export async function createChart(button) {
    /* Get active server button */
    const serverButton = document.querySelector(".server-button.active");
    if (!serverButton) {
        console.error("No active server selected!");
        return;
    }

    const buttonType = button.dataset.type;
    const server = serverButton.dataset.server;

    let labels = [];
    let values = [];

    if (buttonType === "playercount") {
        const data = await getPlayerCount(server, 50);
        
        labels = data.map(x => x.day);
        values = data.map(x => x.count);
    } else {
        console.error(`No chart available with the type ${buttonType}`)
        return
    }

    /* If the chart already exists, update it */
    if (chartInstance) {
        chartInstance.data.labels = labels;
        chartInstance.data.datasets[0].data = values;
        chartInstance.data.datasets[0].label = `${buttonType} (${server})`
        chartInstance.update({
            duration: 250,
            easing: "easeOutQuart"
        });

        return;
    }

    chartInstance = new Chart(document.getElementById("chart"), {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: `${buttonType} (${server})`,
                data: values,
                tension: 0.2,
                fill: true,
                borderColor: "#2bef0e",
                backgroundColor: "rgba(0, 255, 0, 0.1)"
            }]
        },
        options: {
            responsive: true,

            animation: {
                duration: 1800,
                easing: "easeOutQuart",

                delay: (context) => {
                    return context.dataIndex * 80;
                }
            },

            plugins: {
                legend: {
                    labels: {
                        color: "#2bef0e",
                        font: { family: "monospace" }
                    }
                }
            },

            scales: {
                x: {
                    ticks: { color: "#2bef0e", font: { family: "monospace" } },
                    grid: { color: "rgba(0, 255, 0, 0.1)" }
                },
                y: {
                    ticks: { color: "#2bef0e", font: { family: "monospace" } },
                    grid: { color: "rgba(0, 255, 0, 0.1)" }
                }
            }
        }
    })
}