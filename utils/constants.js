export const COLORS = {
  black: {
    dark: 'hsl(285, 12%, 7%)',
    medium: 'hsl(260, 8%, 15%)',
    light: 'hsl(270, 5%, 24%)'
  },  
  white: {
    '95': 'hsl(0, 0%, 95%)',
    '88': 'hsl(0, 0%, 88%)',
    '74': 'hsl(0, 0%, 74%)',
    '51': 'hsl(0, 0%, 51%)',
  },
  primary: 'hsl(214, 84%, 56%)',
  danger: 'hsl(0, 79%, 63%)'
};

export const BREAKPOINTS = {
  mobileMin: 800,
  tabletMin: 1099,
  laptopMin: 1100,
  desktopMin: 1500,
};

export const QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.mobileMin / 16}rem)`,
  tablet: `(max-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
  desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem)`,
};