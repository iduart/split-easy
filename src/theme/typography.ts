import {Platform, TextStyle} from 'react-native';

const headlineFamily = Platform.select({
  ios: 'Manrope',
  android: 'Manrope',
  default: 'Manrope',
});

const bodyFamily = Platform.select({
  ios: 'Inter',
  android: 'Inter',
  default: 'Inter',
});

// We fall back to system fonts since custom fonts need linking.
// In production, link Manrope + Inter via react-native.config.js
const headline = Platform.select({
  ios: {fontFamily: 'System'},
  android: {fontFamily: 'sans-serif'},
  default: {fontFamily: 'System'},
}) as TextStyle;

const body = Platform.select({
  ios: {fontFamily: 'System'},
  android: {fontFamily: 'sans-serif'},
  default: {fontFamily: 'System'},
}) as TextStyle;

export const typography = {
  // Display — oversized hero numbers
  displayLg: {
    ...headline,
    fontSize: 48,
    fontWeight: '800' as const,
    letterSpacing: -1.5,
    lineHeight: 56,
  },
  displayMd: {
    ...headline,
    fontSize: 36,
    fontWeight: '800' as const,
    letterSpacing: -1,
    lineHeight: 44,
  },

  // Headlines — section headers, person names
  headlineLg: {
    ...headline,
    fontSize: 30,
    fontWeight: '800' as const,
    letterSpacing: -0.5,
    lineHeight: 38,
  },
  headlineMd: {
    ...headline,
    fontSize: 24,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
    lineHeight: 32,
  },
  headlineSm: {
    ...headline,
    fontSize: 20,
    fontWeight: '700' as const,
    letterSpacing: -0.2,
    lineHeight: 28,
  },

  // Title — card headers, list item names
  titleLg: {
    ...headline,
    fontSize: 18,
    fontWeight: '700' as const,
    letterSpacing: 0,
    lineHeight: 26,
  },
  titleMd: {
    ...headline,
    fontSize: 16,
    fontWeight: '700' as const,
    letterSpacing: 0,
    lineHeight: 24,
  },
  titleSm: {
    ...headline,
    fontSize: 14,
    fontWeight: '700' as const,
    letterSpacing: 0,
    lineHeight: 20,
  },

  // Body — receipt items, descriptions
  bodyLg: {
    ...body,
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyMd: {
    ...body,
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  bodySm: {
    ...body,
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },

  // Label — buttons, tags, small UI text
  labelLg: {
    ...body,
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
  labelMd: {
    ...body,
    fontSize: 12,
    fontWeight: '600' as const,
    lineHeight: 16,
  },
  labelSm: {
    ...body,
    fontSize: 10,
    fontWeight: '700' as const,
    letterSpacing: 1.5,
    lineHeight: 14,
    textTransform: 'uppercase' as const,
  },

  // Caption
  caption: {
    ...body,
    fontSize: 11,
    fontWeight: '500' as const,
    lineHeight: 14,
  },
} as const;
