const minimalBrand = {
  id: 'minimal',
  name: 'Minimal',
  description: 'Ultra-minimal black and white',
  colors: {
    primary: '#000000',
    secondary: '#333333',
    background: '#FFFFFF',
    surface: '#FAFAFA',
    text: '#000000',
    textSecondary: '#666666',
    border: '#DDDDDD',
    error: '#CC0000',
    success: '#006600',
    warning: '#CC6600',
  },
  typography: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSizeXs: 11,
    fontSizeSm: 13,
    fontSizeMd: 15,
    fontSizeLg: 19,
    fontSizeXl: 23,
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightBold: '700',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 0,
    md: 2,
    lg: 4,
    full: 9999,
  },
  shadows: {
    sm: 'none',
    md: '0 1px 0 rgba(0,0,0,0.2)',
    lg: '0 2px 0 rgba(0,0,0,0.3)',
  },
};

export default minimalBrand;
