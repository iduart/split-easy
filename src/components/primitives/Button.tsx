import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  colors,
  typography,
  borderRadius,
  shadows,
  spacing,
  OPACITY_ON_PRESS_SURFACE,
  OPACITY_ON_PRESS_SUBTLE,
} from '../../theme';
import {BasePressable} from './BasePressable';
import {Text} from './Text';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  icon,
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
}) => {
  const isDisabled = disabled || loading;

  const renderContent = (pressed: boolean) => {
    const textColor =
      variant === 'primary' ? colors.onPrimary : colors.primary;
    const iconSize = 20;

    return (
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={textColor}
            style={styles.loader}
          />
        ) : icon ? (
          <MaterialIcons
            name={icon}
            size={iconSize}
            color={textColor}
            style={styles.icon}
          />
        ) : null}
        <Text
          variant="labelLg"
          color={textColor}
          style={[styles.label, {fontWeight: '700'}]}>
          {title}
        </Text>
      </View>
    );
  };

  if (variant === 'primary') {
    return (
      <BasePressable
        onPress={onPress}
        disabled={isDisabled}
        pressedOpacity={OPACITY_ON_PRESS_SURFACE}
        style={[fullWidth && styles.fullWidth, style]}>
        {({pressed}) => (
          <LinearGradient
            colors={[colors.primary, colors.primaryDim]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={[styles.base, styles.primary, fullWidth && styles.fullWidth]}>
            {renderContent(pressed)}
          </LinearGradient>
        )}
      </BasePressable>
    );
  }

  return (
    <BasePressable
      onPress={onPress}
      disabled={isDisabled}
      pressedOpacity={OPACITY_ON_PRESS_SUBTLE}
      style={[
        styles.base,
        variant === 'secondary' && styles.secondary,
        variant === 'tertiary' && styles.tertiary,
        fullWidth && styles.fullWidth,
        style,
      ]}>
      {({pressed}) => renderContent(pressed)}
    </BasePressable>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primary: {
    ...shadows.elevated,
  },
  secondary: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  tertiary: {
    backgroundColor: colors.transparent,
    height: 'auto' as any,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '700',
  },
  icon: {
    marginRight: spacing.sm,
  },
  loader: {
    marginRight: spacing.sm,
  },
  fullWidth: {
    width: '100%',
  },
});
