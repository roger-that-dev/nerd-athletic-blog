document.addEventListener('DOMContentLoaded', function () {
    // Create the graph
    createPowerDurationGraph('power-duration-chart');
});

// Function to create a new power duration graph
function createPowerDurationGraph(containerId) {
    // Set up SVG with viewBox and responsive sizing
    const svgWidth = 600;
    const svgHeight = 400;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select(`#${containerId}`)
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
        .attr("width", "100%")
        .attr("height", "auto")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define time points in seconds
    const timePoints = [
        1, 3, 5,
        15, 30,  // seconds
        60, 180, 300, 900, 1800,  // minutes
        3600, 7200, 10800, 18000  // hours
    ];

    // Sample power data (in watts) - this would typically come from real data
    const powerData = [
        950, 900, 750,  // 1-5s
        700, 550,  // 10-45s
        450, 380, 340, 280, 250,  // 1-45min
        220, 210, 200, 180  // 1-5h
    ];

    // X scale (time) - using log scale for better visualization
    const x = d3.scaleLog()
        .domain([1, 18000])
        .range([0, width]);

    // Y scale (power in watts)
    const y = d3.scaleLinear()
        .domain([100, 1000])
        .range([height, 0]);

    // Create axes and grid
    const xTickValues = timePoints;

    // X Axis
    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x)
            .tickValues(xTickValues)
            .tickFormat(d => {
                if (d < 60) return d + "s";
                if (d < 3600) return (d / 60) + "m";
                return (d / 3600) + "h";
            }));

    // Vertical grid lines
    svg.append("g")
        .attr("class", "grid x-grid")
        .selectAll("line")
        .data(xTickValues)
        .join("line")
        .attr("x1", d => x(d))
        .attr("x2", d => x(d))
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "#eee")
        .attr("stroke-width", 1);

    // Y Axis
    svg.append("g")
        .attr("class", "axis y-axis")
        .call(d3.axisLeft(y)
            .tickFormat(d => d.toFixed(0))
        );

    // Y axis label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "middle")
        .attr("transform", `rotate(-90)`)
        .attr("x", -height / 2)
        .attr("y", -35)
        .attr("fill", "#000")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .attr("font-family", "Georgia, serif")
        .text("Power (watts)");

    // X axis label
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

    // Add chart title
    svg.append("text")
        .attr("class", "chart-title")
        .attr("x", width / 2)
        .attr("y", -30)
        .attr("text-anchor", "middle")
        .attr("font-family", "Georgia, serif")
        .attr("font-size", 16)
        .attr("font-weight", "bold")
        .text("Power Duration Curve");

    // Create path for the power-duration curve
    const path = svg.append("path")
        .attr("class", "power-duration-line")
        .attr("fill", "none")
        .attr("stroke", "#1F3DFF")
        .attr("stroke-width", 3);

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

    // Line generator
    const line = d3.line()
        .x(d => x(d.time))
        .y(d => y(d.power))
        .curve(d3.curveBasis);

    // Create data points
    const lineData = timePoints.map((t, i) => ({
        time: t,
        power: powerData[i]
    }));

    // Draw the initial line
    path.attr("d", line(lineData));
} 