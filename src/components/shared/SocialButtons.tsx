import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, spacing, borderRadius, OPACITY_ON_PRESS_SUBTLE} from '../../theme';
import {Text, Icon, Row, BasePressable} from '../primitives';

interface SocialButtonsProps {
  onGooglePress?: () => void;
  onApplePress?: () => void;
}

export const SocialButtons: React.FC<SocialButtonsProps> = ({
  onGooglePress,
  onApplePress,
}) => {
  return (
    <Row gap={spacing.md} style={styles.row}>
      <BasePressable
        onPress={onGooglePress}
        pressedOpacity={OPACITY_ON_PRESS_SUBTLE}
        style={styles.button}>
        <Icon name="mail" size={20} color={colors.onSurface} />
        <Text variant="labelLg" style={styles.label}>
          Google
        </Text>
      </BasePressable>

      <BasePressable
        onPress={onApplePress}
        pressedOpacity={OPACITY_ON_PRESS_SUBTLE}
        style={styles.button}>
        <Icon name="apple" size={20} color={colors.onSurface} />
        <Text variant="labelLg" style={styles.label}>
          Apple
        </Text>
      </BasePressable>
    </Row>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: `rgba(171, 173, 174, 0.15)`,
    gap: spacing.sm,
  },
  label: {
    fontWeight: '600',
  },
});
