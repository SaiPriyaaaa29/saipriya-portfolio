---
name: Scroll-reveal verification
description: Verifying IntersectionObserver reveals in Replit preview screenshots.
---

Full-page preview captures do not scroll through the document. An IntersectionObserver-based reveal below the initial viewport may remain hidden in a full-page screenshot even when it appears correctly during user scrolling.

**Why:** The capture preserves page state without incremental scroll events, which can make working reveal behavior look broken.

**How to apply:** Scroll a real browser through the page and confirm reveal targets become visible; use viewport screenshots after scrolling for visual checks.