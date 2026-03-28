import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  colors,
  spacing,
  borderRadius,
  shadows,
  OPACITY_ON_PRESS_SURFACE,
} from '../../theme';
import {Text, Icon, BasePressable} from '../primitives';

interface ActionCardProps {
  title: string;
  subtitle: string;
  icon: string;
  variant?: 'primary' | 'default';
  onPress?: () => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  subtitle,
  icon,
  variant = 'default',
  onPress,
}) => {
  if (variant === 'primary') {
    return (
      <BasePressable onPress={onPress}>
        <LinearGradient
          colors={[colors.primary, colors.primaryDim]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.primaryContainer}>
          <View style={styles.primaryTopRow}>
            <Icon name={icon} size={28} color={colors.onPrimary} />
            <Icon name="arrow-forward" size={20} color={colors.onPrimary} />
          </View>
          <View style={styles.primaryBottomSection}>
            <Text variant="headlineSm" color={colors.onPrimary}>
              {title}
            </Text>
            <Text
              variant="bodyMd"
              color={colors.onPrimary}
              style={styles.primarySubtitle}>
              {subtitle}
            </Text>
          </View>
        </LinearGradient>
      </BasePressable>
    );
  }

  return (
    <BasePressable
      onPress={onPress}
      pressedOpacity={OPACITY_ON_PRESS_SURFACE}
      style={styles.defaultContainer}>
      <Icon
        name={icon}
        size={28}
        color={colors.primary}
        style={styles.defaultIcon}
      />
      <Text variant="titleMd">{title}</Text>
      <Text
        variant="bodySm"
        color={colors.onSurfaceVariant}
        style={styles.defaultSubtitle}>
        {subtitle}
      </Text>
    </BasePressable>
  );
};

const styles = StyleSheet.create({
  primaryContainer: {
    height: 192,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    justifyContent: 'space-between',
    ...shadows.elevated,
  },
  primaryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  primaryBottomSection: {
    gap: spacing.xs,
  },
  primarySubtitle: {
    opacity: 0.85,
  },
  defaultContainer: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadows.card,
  },
  defaultIcon: {
    marginBottom: spacing.md,
  },
  defaultSubtitle: {
    marginTop: spacing.xs,
  },
});
