import {Platform, ViewStyle} from 'react-native';

// Primary-tinted ambient shadows per design system
export const shadows = {
  card: Platform.select<ViewStyle>({
    ios: {
      shadowColor: 'rgba(0, 0, 0, 0.03)',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 20,
    },
    android: {
      elevation: 2,
    },
  }) ?? {},

  elevated: Platform.select<ViewStyle>({
    ios: {
      shadowColor: 'rgba(74, 64, 224, 0.15)',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 20,
    },
    android: {
      elevation: 4,
    },
  }) ?? {},

  glass: Platform.select<ViewStyle>({
    ios: {
      shadowColor: 'rgba(74, 64, 224, 0.04)',
      shadowOffset: {width: 0, height: -4},
      shadowOpacity: 1,
      shadowRadius: 32,
    },
    android: {
      elevation: 8,
    },
  }) ?? {},

  heavy: Platform.select<ViewStyle>({
    ios: {
      shadowColor: 'rgba(74, 64, 224, 0.25)',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 1,
      shadowRadius: 24,
    },
    android: {
      elevation: 6,
    },
  }) ?? {},
} as const;
