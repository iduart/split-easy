import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {colors, spacing, borderRadius} from '../../theme';
import {Text, Icon, Row} from '../primitives';

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
      <Pressable
        onPress={onGooglePress}
        style={({pressed}) => [
          styles.button,
          {opacity: pressed ? 0.7 : 1},
        ]}>
        <Icon name="mail" size={20} color={colors.onSurface} />
        <Text variant="labelLg" style={styles.label}>
          Google
        </Text>
      </Pressable>

      <Pressable
        onPress={onApplePress}
        style={({pressed}) => [
          styles.button,
          {opacity: pressed ? 0.7 : 1},
        ]}>
        <Icon name="apple" size={20} color={colors.onSurface} />
        <Text variant="labelLg" style={styles.label}>
          Apple
        </Text>
      </Pressable>
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
