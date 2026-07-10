---
title: "Example: Simple Two-Column Layout"
description: Creating a two-column layout with Flexbox
---

```html
<div class="container">
  <div class="column">Left Column</div>
  <div class="column">Right Column</div>
</div>
```

```css
.container {
  display: flex;
  gap: 20px;
}

.column {
  flex: 1;              /* Each column takes equal width */
  padding: 20px;
  background: #f4f4f4;
}
```

[Example: Simple Two-Column Layout - YouTube](https://youtu.be/eKMeJSXa2eU)
