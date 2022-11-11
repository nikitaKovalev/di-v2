export function stringHashToHsl(color: string): string {
  if (color === '') {
    return '';
  }

  let hash = 0;

  for (let i = 0; i < color.length; i++) {
    hash = color.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  const hue = hash % 360;
  const saturation = 60 + (hash % 5);
  const lightness = 80 + (hash % 5);

  return `hsl(${hue},${saturation}%,${lightness}%)`;
}