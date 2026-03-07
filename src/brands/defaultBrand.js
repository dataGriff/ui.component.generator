const defaultBrand = {
  id: 'default',
  name: 'Default',
  description: 'Clean and modern blue/white theme',
  colors: {
    primary: '#4F46E5',
    secondary: '#7C3AED',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text: '#111827',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
  },
  typography: {
    fontFamily: "'System', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSizeXs: 12,
    fontSizeSm: 14,
    fontSizeMd: 16,
    fontSizeLg: 20,
    fontSizeXl: 24,
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
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.1)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
};

export default defaultBrand;
