import React from 'react';
import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {colors, borderRadius, shadows, spacing} from '../../theme';

type CardVariant = 'elevated' | 'flat';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: CardVariant;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'elevated',
}) => {
  return (
    <View
      style={[
        styles.base,
        variant === 'elevated' && styles.elevated,
        variant === 'flat' && styles.flat,
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  elevated: {
    backgroundColor: colors.surfaceContainerLowest,
    ...shadows.card,
  },
  flat: {
    backgroundColor: colors.surfaceContainerLow,
  },
});
