---
author: Alice Bloggs
date: 2024-06-01
excerpt: This is a placeholder post demonstrating all elements, including images,
  footnotes, code, lists, and an inline D3.js graph.
tags:
- placeholder
- demo
- d3js
title: Placeholder Post With D3.js Example
---

This is a placeholder post to demonstrate the structure and formatting of a typical blog entry. Below you'll find examples of images, lists, code blocks, blockquotes, footnotes, and even a D3.js graph embedded using inline JavaScript.

![A placeholder image.](https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80)

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae velit ex. Mauris dapibus risus quis suscipit vulputate. Egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas[^1].

### Example List

- First item
- Second item
- Third item with a [link](https://example.com)

### Example Code Block

```python
# This is a sample Python code block
def hello_world():
    print("Hello, world!")
```

### Example Blockquote

> "This is a sample blockquote. It can be used to highlight important text or quotes."

### D3.js Graph Example

Below is a simple D3.js bar chart rendered inline:

<div id="d3-demo" style="width: 100%; max-width: 400px; height: 200px; margin: 2rem 0;"></div>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script>
(function() {
  var data = [10, 15, 20, 25, 30];
  var width = 400, height = 200;
  var svg = d3.select('#d3-demo')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', function(d, i) { return i * 80; })
    .attr('y', function(d) { return height - d * 5; })
    .attr('width', 60)
    .attr('height', function(d) { return d * 5; })
    .attr('fill', '#1F3DFF');
  svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function(d) { return d; })
    .attr('x', function(d, i) { return i * 80 + 30; })
    .attr('y', function(d) { return height - d * 5 - 10; })
    .attr('text-anchor', 'middle')
    .attr('fill', '#333');
})();
</script>

### Another Section

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo[^2].

#### Example Ordered List

1. First step
2. Second step
3. Third step

---

## Footnotes

[^1]: This is a placeholder footnote for demonstration purposes.
[^2]: Another example footnote with more placeholder text.