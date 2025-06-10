document.addEventListener('DOMContentLoaded', function () {
    // Initial parameters for the critical speed model
    const initialCS = 3.5;           // Critical Speed in m/s (about 12.6 km/h)
    const initialD = 250;            // D' in meters (distance that can be covered above critical speed)
    // Create the graph
    const graph = createCriticalSpeedGraph('critical-speed-chart', initialCS, initialD);

    // Set up slider event listeners
    const csSlider = document.getElementById('cs-slider');
    const dSlider = document.getElementById('d-slider');
    const csValue = document.getElementById('cs-value');
    const dValue = document.getElementById('d-value');

    csSlider.addEventListener('input', function () {
        const newCS = parseFloat(this.value);
        csValue.textContent = newCS.toFixed(1) + " m/s";
        graph.update(newCS, parseFloat(dSlider.value));
    });

    dSlider.addEventListener('input', function () {
        const newD = parseFloat(this.value);
        dValue.textContent = newD + " m";
        graph.update(parseFloat(csSlider.value), newD);
    });
});

// Function to create a new critical speed graph
function createCriticalSpeedGraph(containerId, initialCS, initialD) {
    // Chart dimensions
    const svgWidth = 600;
    const svgHeight = 400;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;
    const maxTime = 1800;   // 30 minutes in seconds
    const maxSpeed = 12;

    // Set up SVG with viewBox and responsive sizing
    const svg = d3.select(`#${containerId}`)
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale (time)
    const x = d3.scaleLinear()
        .domain([0, maxTime])
        .range([0, width]);

    // Y scale (speed in m/s)
    const y = d3.scaleLinear()
        .domain([0, 12])
        .range([height, 0]);

    // Create axes and grid
    const xTickValues = [60, 120, 180, 300, 600, 900, 1200, 1800];

    // X Axis
    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x)
            .tickValues(xTickValues)
            .tickFormat(d => (d / 60) + "m"));

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
        .attr("y", -25)
        .attr("fill", "#000")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .attr("font-family", "Georgia, serif")
        .text("Speed (m/s)");

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
        .text("Time until exhaustion");

    // Add chart title
    svg.append("text")
        .attr("class", "chart-title")
        .attr("x", width / 2)
        .attr("y", -30)
        .attr("text-anchor", "middle")
        .attr("font-family", "Georgia, serif")
        .attr("font-size", 16)
        .attr("font-weight", "bold")
        .text("The Critical Speed Model");

    // Create path for the critical speed model line
    const path = svg.append("path")
        .attr("class", "critical-speed-line")
        .attr("fill", "none")
        .attr("stroke", "#2A9D8F")
        .attr("stroke-width", 3);

    // Create CS line
    const csLine = svg.append("line")
        .attr("class", "cs-line")
        .attr("stroke", "#FF6B35")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "3,1");

    // Create CS label
    const csLabel = svg.append("text")
        .attr("class", "cs-label")
        .attr("fill", "#FF6B35")
        .attr("font-size", 12)
        .attr("font-family", "Georgia, serif");

    // Create elements for cursor tracking
    const cursorGroup = svg.append("g")
        .attr("class", "cursor-group")
        .style("display", "none");

    // Vertical line
    const cursorLine = cursorGroup.append("line")
        .attr("stroke", "#d90429")
        .attr("stroke-width", 1);

    // Horizontal line to CS
    const cursorHorizontalLine = cursorGroup.append("line")
        .attr("stroke", "#d90429")
        .attr("stroke-width", 1);

    // D' area
    const dArea = cursorGroup.append("rect")
        .attr("fill", "#1f77b4")
        .attr("opacity", 0.2);

    // D' value label
    const dLabel = cursorGroup.append("text")
        .attr("font-size", "12px")
        .attr("font-family", "Georgia, serif")
        .attr("fill", "#333");

    // Add circle indicator
    const cursorCircle = cursorGroup.append("circle")
        .attr("r", 4)
        .attr("fill", "#d90429")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5);

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
        .y(d => y(d.speed))
        .curve(d3.curveBasis);

    // Add mouse interaction
    svg.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", () => cursorGroup.style("display", null))
        .on("mouseout", () => cursorGroup.style("display", "none"))
        .on("mousemove", (event) => {
            const mouseX = d3.pointer(event)[0];
            updateCursor(mouseX);
        });

    // Store current values
    let currentCS = initialCS;
    let currentD = initialD;
    let initialTime = currentD / (maxSpeed - currentCS); // Store initialTime for cursor clamping

    // Function to update cursor elements
    function updateCursor(mouseX) {
        const time = x.invert(mouseX);
        const clampedTime = Math.max(time, initialTime, 0.01);
        const rawSpeed = currentCS + (currentD / clampedTime);
        const speed = Math.min(rawSpeed, maxSpeed);
        const xCurve = x(clampedTime);
        const yCurve = y(speed);
        const yCS = y(currentCS);

        // Update circle position
        cursorCircle
            .attr("cx", xCurve)
            .attr("cy", yCurve);

        // Vertical line: from curve to CS line
        cursorLine
            .attr("x1", xCurve)
            .attr("x2", xCurve)
            .attr("y1", yCurve)
            .attr("y2", yCS)
            .attr("stroke", "#d90429")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", null);

        // Horizontal line: from curve to y-axis
        cursorHorizontalLine
            .attr("x1", 0)
            .attr("x2", xCurve)
            .attr("y1", yCurve)
            .attr("y2", yCurve)
            .attr("stroke", "#d90429")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", null);

        // Rectangle area: from (0, yCurve) to (xCurve, yCurve) to (xCurve, yCS) to (0, yCS)
        dArea
            .attr("x", 0)
            .attr("y", yCurve)
            .attr("width", xCurve)
            .attr("height", yCS - yCurve)
            .attr("fill", "#d90429")
            .attr("opacity", 0.15);

        dLabel
            .attr("x", xCurve + 8)
            .attr("y", yCurve - 8)
            .text(`D' = ${currentD}m`)
            .attr("fill", "#d90429");
    }

    // Return an object with the update method and necessary elements
    const graph = {
        update: function (newCS, newD) {
            currentCS = newCS;
            currentD = newD;

            // Start with speed = 12 m/s and find the corresponding time
            const initialSpeed = maxSpeed;
            const initialTime = newD / (initialSpeed - newCS);

            // Generate time points
            const timePoints = Array.from({ length: 200 }, (_, i) => {
                const t = initialTime + (i * (1800 - initialTime) / 199);
                return t;
            });

            // Calculate speed values
            const speedValues = timePoints.map(t => newCS + (newD / t));

            // Create data points
            const lineData = timePoints.map((t, i) => ({
                time: t,
                speed: speedValues[i]
            }));

            // Update the path
            path.attr("d", line(lineData));

            // Update the CS line
            csLine
                .attr("x1", 0)
                .attr("x2", width)
                .attr("y1", y(newCS))
                .attr("y2", y(newCS));

            // Update the CS label
            csLabel
                .attr("x", width - 75)
                .attr("y", y(newCS) + 15)
                .text("critical speed");
        }
    };

    // Initialize the graph with the initial values
    graph.update(initialCS, initialD);

    return graph;
}

// Example usage:
// const graph = createCriticalSpeedGraph('my-graph-container', 3.5, 250);
// graph.update(4.0, 300); // Update with new CS and D values