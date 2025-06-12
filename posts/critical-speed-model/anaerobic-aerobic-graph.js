document.addEventListener('DOMContentLoaded', function () {
    // Create the graph
    createAnaerobicAerobicGraph('anaerobic-vs-aerobic-chart');
});

// Data from the research papers with time information
const data = [
    // 5000m
    { time: 900, aerobic: 96, anaerobic: 4, gender: 'M', event: '5000m' },
    { time: 960, aerobic: 97, anaerobic: 3, gender: 'F', event: '5000m' },
    // 3000m
    { time: 452, aerobic: 89, anaerobic: 11, gender: 'M', event: '3000m' },
    { time: 452, aerobic: 88, anaerobic: 12, gender: 'M', event: '3000m' },
    // 1500m
    { time: 235, aerobic: 84, anaerobic: 16, gender: 'M', event: '1500m' },
    { time: 245, aerobic: 80, anaerobic: 20, gender: 'M', event: '1500m' },
    { time: 209, aerobic: 78, anaerobic: 22, gender: 'M', event: '1500m' },
    { time: 209, aerobic: 76, anaerobic: 24, gender: 'M', event: '1500m' },
    { time: 218, aerobic: 72, anaerobic: 28, gender: 'M', event: '1500m' },
    { time: 180, aerobic: 78, anaerobic: 22, gender: 'M', event: '1500m' },
    { time: 308, aerobic: 87, anaerobic: 13, gender: 'F', event: '1500m' },
    { time: 308, aerobic: 83, anaerobic: 17, gender: 'F', event: '1500m' },
    // 800m
    { time: 113, aerobic: 76, anaerobic: 24, gender: 'M', event: '800m' },
    { time: 113, aerobic: 66, anaerobic: 34, gender: 'M', event: '800m' },
    { time: 102, aerobic: 62, anaerobic: 38, gender: 'M', event: '800m' },
    { time: 115, aerobic: 61, anaerobic: 39, gender: 'M', event: '800m' },
    { time: 120, aerobic: 58, anaerobic: 42, gender: 'M', event: '800m' },
    { time: 102, aerobic: 57, anaerobic: 43, gender: 'M', event: '800m' },
    { time: 105, aerobic: 52, anaerobic: 48, gender: 'M', event: '800m' },
    { time: 145, aerobic: 81, anaerobic: 19, gender: 'F', event: '800m' },
    { time: 145, aerobic: 62, anaerobic: 38, gender: 'F', event: '800m' },
    // 400m
    { time: 49.3, aerobic: 64, anaerobic: 36, gender: 'M', event: '400m' },
    { time: 49.3, aerobic: 43, anaerobic: 57, gender: 'M', event: '400m' },
    { time: 49.5, aerobic: 37, anaerobic: 63, gender: 'M', event: '400m' },
    { time: 44.1, aerobic: 30, anaerobic: 70, gender: 'M', event: '400m' },
    { time: 44.9, aerobic: 28, anaerobic: 72, gender: 'M', event: '400m' },
    { time: 44.4, aerobic: 17, anaerobic: 83, gender: 'M', event: '400m' },
    { time: 61.2, aerobic: 66, anaerobic: 34, gender: 'F', event: '400m' },
    { time: 61.2, aerobic: 38, anaerobic: 62, gender: 'F', event: '400m' },
    // 200m
    { time: 22.3, aerobic: 29, anaerobic: 71, gender: 'M', event: '200m' },
    { time: 20.4, aerobic: 14, anaerobic: 86, gender: 'M', event: '200m' },
    { time: 19.8, aerobic: 14, anaerobic: 86, gender: 'M', event: '200m' },
    { time: 20.0, aerobic: 8, anaerobic: 92, gender: 'M', event: '200m' },
    // 100m
    { time: 9.8, aerobic: 8, anaerobic: 92, gender: 'M', event: '100m' },
    { time: 10.0, aerobic: 7, anaerobic: 93, gender: 'M', event: '100m' },
    { time: 9.8, aerobic: 4, anaerobic: 96, gender: 'M', event: '100m' }
];

// Additional data from Spencer and Gastin (2001) - Running events only
const additionalData = [
    // Bangsbo et al.
    { time: 179, aerobic: 74, anaerobic: 26, gender: 'M', event: 'Run' },
    { time: 181, aerobic: 78, anaerobic: 22, gender: 'M', event: 'Run' },
    { time: 205, aerobic: 78, anaerobic: 22, gender: 'M', event: 'Run' },
    { time: 243, aerobic: 83, anaerobic: 17, gender: 'M', event: 'Run' },

    // Di Prampero et al.
    { time: 102, aerobic: 62, anaerobic: 38, gender: 'M', event: 'Run' },
    { time: 132, aerobic: 69, anaerobic: 31, gender: 'M', event: 'Run' },
    { time: 209, aerobic: 78, anaerobic: 22, gender: 'M', event: 'Run' },
    { time: 452, aerobic: 89, anaerobic: 11, gender: 'M', event: 'Run' },
    { time: 778, aerobic: 93, anaerobic: 7, gender: 'M', event: 'Run' },

    // Hermansen & Medbø
    { time: 15, aerobic: 22, anaerobic: 78, gender: 'M', event: 'Run' },
    { time: 30, aerobic: 29, anaerobic: 71, gender: 'M', event: 'Run' },
    { time: 60, aerobic: 43, anaerobic: 57, gender: 'M', event: 'Run' },
    { time: 60, aerobic: 51, anaerobic: 49, gender: 'M', event: 'Run' },
    { time: 60, aerobic: 46, anaerobic: 54, gender: 'M', event: 'Run' },
    { time: 120, aerobic: 59, anaerobic: 41, gender: 'M', event: 'Run' },
    { time: 240, aerobic: 75, anaerobic: 25, gender: 'M', event: 'Run' },

    // Hill
    { time: 49, aerobic: 37, anaerobic: 63, gender: 'M', event: 'Run' },
    { time: 61, aerobic: 38, anaerobic: 62, gender: 'M', event: 'Run' },
    { time: 120, aerobic: 61, anaerobic: 39, gender: 'M', event: 'Run' },
    { time: 146, aerobic: 67, anaerobic: 33, gender: 'M', event: 'Run' },
    { time: 246, aerobic: 80, anaerobic: 20, gender: 'M', event: 'Run' },
    { time: 309, aerobic: 83, anaerobic: 17, gender: 'M', event: 'Run' },

    // Medbø & Sejersted
    { time: 55, aerobic: 50, anaerobic: 50, gender: 'M', event: 'Run' },
    { time: 57, aerobic: 44, anaerobic: 56, gender: 'M', event: 'Run' },

    // Nummela & Rusko
    { time: 49, aerobic: 46, anaerobic: 54, gender: 'M', event: 'Run' },
    { time: 50, aerobic: 37, anaerobic: 63, gender: 'M', event: 'Run' },

    // Olesen et al.
    { time: 62, aerobic: 37, anaerobic: 63, gender: 'M', event: 'Run' },
    { time: 64, aerobic: 44, anaerobic: 56, gender: 'M', event: 'Run' },
    { time: 139, aerobic: 60, anaerobic: 40, gender: 'M', event: 'Run' },
    { time: 146, aerobic: 72, anaerobic: 28, gender: 'M', event: 'Run' },
    { time: 148, aerobic: 57, anaerobic: 43, gender: 'M', event: 'Run' },
    { time: 148, aerobic: 68, anaerobic: 32, gender: 'M', event: 'Run' },

    // Péronnet & Thibault
    { time: 6, aerobic: 5, anaerobic: 95, gender: 'M', event: 'Run' },
    { time: 10, aerobic: 8, anaerobic: 92, gender: 'M', event: 'Run' },
    { time: 20, aerobic: 14, anaerobic: 86, gender: 'M', event: 'Run' },
    { time: 44, aerobic: 30, anaerobic: 70, gender: 'M', event: 'Run' },
    { time: 102, aerobic: 57, anaerobic: 43, gender: 'M', event: 'Run' },
    { time: 132, aerobic: 65, anaerobic: 35, gender: 'M', event: 'Run' },
    { time: 209, aerobic: 76, anaerobic: 24, gender: 'M', event: 'Run' },
    { time: 226, aerobic: 78, anaerobic: 22, gender: 'M', event: 'Run' },
    { time: 291, aerobic: 82, anaerobic: 18, gender: 'M', event: 'Run' },
    { time: 452, aerobic: 88, anaerobic: 12, gender: 'M', event: 'Run' },
    { time: 778, aerobic: 94, anaerobic: 6, gender: 'M', event: 'Run' },
    { time: 1654, aerobic: 98, anaerobic: 2, gender: 'M', event: 'Run' },

    // Ramsbottom et al.
    { time: 171, aerobic: 69, anaerobic: 31, gender: 'M', event: 'Run' },
    { time: 182, aerobic: 71, anaerobic: 29, gender: 'M', event: 'Run' },
    { time: 173, aerobic: 68, anaerobic: 32, gender: 'M', event: 'Run' },
    { time: 178, aerobic: 70, anaerobic: 30, gender: 'M', event: 'Run' },

    // Spencer & Gastin
    { time: 22, aerobic: 29, anaerobic: 71, gender: 'M', event: 'Run' },
    { time: 49, aerobic: 43, anaerobic: 57, gender: 'M', event: 'Run' },
    { time: 113, aerobic: 66, anaerobic: 34, gender: 'M', event: 'Run' },
    { time: 235, aerobic: 84, anaerobic: 16, gender: 'M', event: 'Run' },

    // Spencer et al.
    { time: 52, aerobic: 46, anaerobic: 54, gender: 'M', event: 'Run' },
    { time: 118, aerobic: 69, anaerobic: 31, gender: 'M', event: 'Run' },
    { time: 242, aerobic: 83, anaerobic: 17, gender: 'M', event: 'Run' },

    // van Ingen Schenau et al.
    { time: 10, aerobic: 4, anaerobic: 96, gender: 'M', event: 'Run' },
    { time: 20, aerobic: 8, anaerobic: 92, gender: 'M', event: 'Run' },
    { time: 44, aerobic: 17, anaerobic: 83, gender: 'M', event: 'Run' },

    // Ward-Smith
    { time: 10, aerobic: 7, anaerobic: 93, gender: 'M', event: 'Run' },
    { time: 20, aerobic: 14, anaerobic: 86, gender: 'M', event: 'Run' },
    { time: 45, aerobic: 28, anaerobic: 72, gender: 'M', event: 'Run' },
    { time: 105, aerobic: 52, anaerobic: 48, gender: 'M', event: 'Run' },
    { time: 218, aerobic: 72, anaerobic: 28, gender: 'M', event: 'Run' },
    { time: 816, aerobic: 92, anaerobic: 8, gender: 'M', event: 'Run' },
    { time: 1687, aerobic: 96, anaerobic: 4, gender: 'M', event: 'Run' }
];

// Function to create the scatter plot
function createAnaerobicAerobicGraph(containerId) {
    // Set up SVG with viewBox and responsive sizing
    const svgWidth = 600;
    const svgHeight = 400;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select(`#${containerId}`)
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Combine both datasets
    const allData = [...data, ...additionalData];

    // Create scales
    const x = d3.scaleLinear()
        .domain([5, 1800])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    // Define custom tick values for x-axis
    const xTickValues = [60, 120, 180, 300, 600, 900, 1200, 1800];

    // Add X axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x)
            .tickValues(xTickValues)
            .tickFormat(d => {
                if (d < 60) return d + "s";
                if (d < 3600) return (d / 60) + "m";
                return (d / 3600) + "h";
            }));

    // Add Y axis
    svg.append("g")
        .call(d3.axisLeft(y).ticks(10));

    // Add X axis label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 15)
        .attr("fill", "#000")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .attr("font-family", "Georgia, serif")
        .text("Duration");

    // Add Y axis label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "middle")
        .attr("transform", `rotate(-90)`)
        .attr("x", -height / 2)
        .attr("y", -30)
        .attr("fill", "#000")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .attr("font-family", "Georgia, serif")
        .text("Contribution (%)");

    // Add chart title
    svg.append("text")
        .attr("class", "chart-title")
        .attr("x", width / 2)
        .attr("y", -30)
        .attr("text-anchor", "middle")
        .attr("font-family", "Georgia, serif")
        .attr("font-size", 16)
        .attr("font-weight", "bold")
        .text("Energy Contribution by Duration");

    // Add scatter plot points for anaerobic contribution
    svg.selectAll(".anaerobic-point")
        .data(allData)
        .enter()
        .append("rect")
        .attr("class", "anaerobic-point")
        .attr("x", d => x(d.time) - 2)
        .attr("y", d => y(d.anaerobic) - 2)
        .attr("width", 5)
        .attr("height", 5)
        .attr("fill", "#1FADFF")
        .attr("opacity", 0.7);

    // Add scatter plot points for aerobic contribution
    svg.selectAll(".aerobic-point")
        .data(allData)
        .enter()
        .append("rect")
        .attr("class", "aerobic-point")
        .attr("x", d => x(d.time) - 2)
        .attr("y", d => y(d.aerobic) - 2)
        .attr("width", 5)
        .attr("height", 5)
        .attr("fill", "#1F3DFF")
        .attr("opacity", 0.7);

    // Add legend
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - 115}, -8)`);

    // Add anaerobic legend item
    legend.append("rect")
        .attr("x", 6)
        .attr("y", -3)
        .attr("width", 5)
        .attr("height", 5)
        .attr("fill", "#1FADFF");

    legend.append("text")
        .attr("x", 15)
        .attr("y", 2)
        .attr("font-family", "Georgia, serif")
        .attr("font-size", 10)
        .text("Anaerobic");

    // Add aerobic legend item
    legend.append("rect")
        .attr("x", 68.5)
        .attr("y", -3)
        .attr("width", 5)
        .attr("height", 5)
        .attr("fill", "#1F3DFF");

    legend.append("text")
        .attr("x", 78)
        .attr("y", 2)
        .attr("font-family", "Georgia, serif")
        .attr("font-size", 10)
        .text("Aerobic");

    // Add a top axis with no tick marks or labels for a clean top border
    svg.append("g")
        .attr("class", "axis top-axis")
        .call(
            d3.axisTop(x)
                .tickValues([])
                .tickSize(0)
                .tickFormat("")
        );

    // Add a right axis with no tick marks or labels for a clean right border
    svg.append("g")
        .attr("class", "axis right-axis")
        .attr("transform", `translate(${width},0)`)
        .call(
            d3.axisRight(y)
                .tickValues([])
                .tickSize(0)
                .tickFormat("")
        );
} 