export function flyToFavorites(startElement: EventTarget & Element) {
  const target = document.getElementById("favorites-icon");

  if (!target) return;

  const start = startElement.getBoundingClientRect();
  const end = target.getBoundingClientRect();

  const startX = start.left + start.width / 2;
  const startY = start.top + start.height / 2;

  const endX = end.left + end.width / 2;
  const endY = end.top + end.height / 2;

  const heart = document.createElement("div");

  heart.innerHTML = `
  <div style="
    width:44px;
    height:44px;
    border-radius:50%;
    background:#F5E6D3;
    display:flex;
    align-items:center;
    justify-content:center;
    box-shadow:
      0 4px 10px rgba(0,0,0,0.15),
      0 0 0 6px rgba(255,255,255,0.35);
  ">
    <div class="flying-heart"></div>
  </div>
  `;

  heart.style.position = "fixed";
  heart.style.left = `${startX}px`;
  heart.style.top = `${startY}px`;
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "9999";

  document.body.appendChild(heart);

  const duration = 1200;
  const startTime = performance.now();

  const cp1x = startX;
  const cp1y = startY - 120;

  const cp2x = endX;
  const cp2y = endY - 120;

  function cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number) {
    return (
      (1 - t) ** 3 * p0 +
      3 * (1 - t) ** 2 * t * p1 +
      3 * (1 - t) * t ** 2 * p2 +
      t ** 3 * p3
    );
  }

  function animate(time: number) {
    const elapsed = time - startTime;
    const t = Math.min(elapsed / duration, 1);

    const x = cubicBezier(t, startX, cp1x, cp2x, endX);
    const y = cubicBezier(t, startY, cp1y, cp2y, endY);

    heart.style.transform = `
      translate(${x - startX}px, ${y - startY}px)
      scale(${1 - t * 0.5})
      rotate(${t * 360}deg)
    `;

    heart.style.opacity = `${1 - t}`;

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      heart.remove();

      target?.classList.add("bump");

      setTimeout(() => {
        target?.classList.remove("bump");
      }, 400);
    }
  }

  requestAnimationFrame(animate);
}