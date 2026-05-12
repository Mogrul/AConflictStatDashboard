import { createChart } from "./charts.js";

// Fill default chart on index
const activeChartButton = document.querySelector(".chart-button.active");
if (activeChartButton) {
    createChart(activeChartButton)
}

const serverButtons = document.querySelectorAll(".server-button");
serverButtons.forEach(button => {
    button.addEventListener("click", async () => {
        serverButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        // If a chart button is active, load new data
        const activeChartButton = document.querySelector(".chart-button.active");
        if (activeChartButton) {
            await createChart(activeChartButton);
        }
    })
})

const chartButtons = document.querySelectorAll(".chart-button");
chartButtons.forEach(button => {
    button.addEventListener("click", async () => {
        chartButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        

        await createChart(button);
    })
})