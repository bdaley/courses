---
title: Responsive Web Design
description: Week 11 - Making websites work on any device
---

## Introduction

Please watch the two videos below for an introduction on the topic of responsive web design.

[Responsive Web Design Intro (Part 1) - Loom](https://www.loom.com/share/c3221a73ec7243f899f55a0bf4bb0830)

[Responsive Web Design Intro (Part 2) - Loom](https://www.loom.com/share/bd30d8a89fb1453bbfe1e14b92cadd5c)

## Using Media Queries

```css
/* Base styles for mobile-first design */
.container {
  display: flex;
  flex-direction: column;
}

/* Tablet: 768px and wider */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }

  .sidebar {
    width: 250px;
  }

  .main-content {
    flex: 1;
  }
}

/* Desktop: 1024px and wider */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

[Media Queries - Loom](https://www.loom.com/share/57f31d03684e4d34a475380aafc2c701)

## Additional Reading

Please read through the following guides:

- [RWD: Media Queries (w3schools)](https://www.w3schools.com/css/css_rwd_mediaqueries.asp)
- [RWD: Images (w3schools)](https://www.w3schools.com/css/css_rwd_images.asp)

## Helpful Resources

- [Responsive Web Design Patterns (Brad Frost)](https://bradfrost.github.io/this-is-responsive/patterns.html)
- [RWD Inspiration - mediaqueri.es](https://mediaqueri.es/)
