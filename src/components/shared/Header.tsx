import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, spacing, OPACITY_ON_PRESS_ICON} from '../../theme';
import {Text, Icon, Row, BasePressable} from '../primitives';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showBrand?: boolean;
  rightIcon?: string;
  onRightPress?: () => void;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  showBrand = false,
  rightIcon,
  onRightPress,
  subtitle,
}) => {
  return (
    <View style={styles.container}>
      <Row align="center" justify="space-between" style={styles.row}>
        <Row align="center" gap={spacing.sm} style={styles.leftSection}>
          {showBack && (
            <BasePressable
              onPress={onBack}
              hitSlop={8}
              pressedOpacity={OPACITY_ON_PRESS_ICON}
              style={styles.backButton}>
              <Icon name="arrow-back" size={24} color={colors.primary} />
            </BasePressable>
          )}
          <View style={styles.titleContainer}>
            {showBrand ? (
              <Text
                variant="titleLg"
                color={colors.primary}
                style={styles.brandText}>
                SplitEasy
              </Text>
            ) : title ? (
              <Text variant="titleMd" numberOfLines={1}>
                {title}
              </Text>
            ) : null}
            {subtitle ? (
              <Text
                variant="bodySm"
                color={colors.onSurfaceVariant}
                numberOfLines={1}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        </Row>

        {rightIcon && onRightPress ? (
          <BasePressable
            onPress={onRightPress}
            hitSlop={8}
            pressedOpacity={OPACITY_ON_PRESS_ICON}>
            <Icon name={rightIcon} size={24} color={colors.onSurface} />
          </BasePressable>
        ) : (
          <View style={styles.placeholder} />
        )}
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  row: {
    flex: 1,
  },
  leftSection: {
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  brandText: {
    fontWeight: '800',
  },
  placeholder: {
    width: 24,
  },
});
