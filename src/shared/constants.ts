const PLACEHOLDER_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='444'><defs><pattern id='p' width='16' height='16' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'><rect width='16' height='16' fill='#161a26'/><rect width='8' height='16' fill='#1b2030'/></pattern></defs><rect width='300' height='444' fill='url(#p)'/><text x='150' y='226' fill='#5a6178' font-family='monospace' font-size='16' text-anchor='middle'>no poster</text></svg>`;

export const PLACEHOLDER =
  'data:image/svg+xml;utf8,' + encodeURIComponent(PLACEHOLDER_SVG);
