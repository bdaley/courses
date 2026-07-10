---
title: Floats
description: Using CSS floats for layout
---

```css
/* Float an image so text wraps around it */
img.avatar {
  float: left;
  margin-right: 15px;
  width: 150px;
}

/* Clearfix: prevents container collapse from floats */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

```html
<div class="clearfix">
  <img src="avatar.jpg" alt="Avatar" class="avatar">
  <p>Text will wrap around the floated image on the right side.</p>
</div>
```

[Floats - YouTube](https://youtu.be/NDRP2paDucs)

:::note
[Here are the slides](https://docs.google.com/presentation/d/1yLxSaQrpMS5Pr3kEClwIim3fHEr0MF57gYeusqgb-7o/edit?usp=sharing) for the video.
:::
