const spacing = 8;

const sizes = {
  xtiny: 4,
  tiny: 8,
  small: 12,
  main: 16,
  medium: 18,
  big: 21,
  xbig: 24,
  large: 36,
  xlarge: 48,
  huge: 64,
  super: 72
};
export type Size = keyof typeof sizes;

const colors = {
  main: "#2D2D2D",
  mid: "#757575",
  soft: "#B0B0B0",
  softest: "#EEEEEE",
  alt: "#02AE51",
  white: "white",
  altDark: "#039145"

};
export type Color = keyof typeof colors;

export default {
  spacing: (v: number = 1) => `${(v * spacing / 10)}rem`,
  size: (v: Size = 'main') => `${sizes[v] / 10}rem`,
  sizes,

  font: {
    body: '"Space Grotesk"',
    hand: "'Caveat', cursive"
  },

  color: (v: Color = 'main') => colors[v],
  colors,

  shadows: {
    large: '0px 4px 16px #007FBF',
  },

  borderRadius: '4px',
  borders: {
    width: '3px',
    main: `3px solid ${colors.main}`,
    soft: `3px solid ${colors.soft}`
  }
}
