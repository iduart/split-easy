import React from 'react';
import {Text as RNText, TextStyle, StyleProp, StyleSheet} from 'react-native';
import {colors, typography} from '../../theme';

type TextVariant = keyof typeof typography;

interface TextProps {
  variant?: TextVariant;
  color?: string;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  numberOfLines?: number;
}

export const Text: React.FC<TextProps> = ({
  variant = 'bodyMd',
  color,
  style,
  children,
  numberOfLines,
}) => {
  const variantStyle = typography[variant];

  return (
    <RNText
      numberOfLines={numberOfLines}
      style={[
        styles.base,
        variantStyle,
        color ? {color} : undefined,
        style,
      ]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    color: colors.onSurface,
  },
});
