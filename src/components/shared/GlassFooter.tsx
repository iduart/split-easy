import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {colors, spacing, borderRadius, shadows} from '../../theme';
import {Text, Button} from '../primitives';

interface GlassFooterProps {
  children?: React.ReactNode;
  buttonTitle: string;
  onPress: () => void;
  subtitle?: string;
}

export const GlassFooter: React.FC<GlassFooterProps> = ({
  children,
  buttonTitle,
  onPress,
  subtitle,
}) => {
  return (
    <View style={styles.container}>
      {children}
      {subtitle ? (
        <Text
          variant="bodySm"
          color={colors.onSurfaceVariant}
          style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
      <Button title={buttonTitle} onPress={onPress} fullWidth />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:
      Platform.OS === 'ios'
        ? 'rgba(255, 255, 255, 0.85)'
        : 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing['2xl'],
    ...shadows.glass,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
});
