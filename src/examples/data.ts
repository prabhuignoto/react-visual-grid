export const images = Array.from({ length: 50 }, (_, i) => ({
  alt: `Image ${i + 1}`,
  src: `https://picsum.photos/id/${Math.round(Math.random() * 110)}/800/600`,
}));

export const verticalImages = [
  [200, 200],
  [200, 400],
  [200, 250],
  [200, 250],
  [200, 300],
  [200, 300],
  [200, 500],
  [200, 1100],
  [300, 400],
  [300, 700],
  [300, 800],
  [300, 300],
  [500, 1100],
];

export const horizontalImages = [
  [400, 400],
  [400, 400],
  [700, 400],
  [300, 400],
  [1800, 250],
  [200, 350],
  [400, 350],
  [900, 350],
  [300, 350],
  [700, 200],
  [1100, 200],
];
