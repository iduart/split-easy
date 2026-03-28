import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Pressable,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, typography, borderRadius, spacing} from '../../theme';
import {Text} from './Text';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  rightIcon?: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  rightIcon,
  error,
  style,
  keyboardType,
  autoCapitalize,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecureVisible, setIsSecureVisible] = useState(!secureTextEntry);

  const handleToggleVisibility = () => {
    setIsSecureVisible(prev => !prev);
  };

  return (
    <View style={[styles.wrapper, style]}>
      {label ? (
        <Text variant="labelSm" color={colors.onSurfaceVariant} style={styles.label}>
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.container,
          isFocused && styles.focused,
          error ? styles.errorBorder : undefined,
        ]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.onSurfaceVariant}
          secureTextEntry={secureTextEntry && !isSecureVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {secureTextEntry ? (
          <Pressable onPress={handleToggleVisibility} style={styles.iconButton}>
            <MaterialIcons
              name={isSecureVisible ? 'visibility' : 'visibility-off'}
              size={20}
              color={colors.onSurfaceVariant}
            />
          </Pressable>
        ) : rightIcon ? (
          <MaterialIcons
            name={rightIcon}
            size={20}
            color={colors.onSurfaceVariant}
            style={styles.rightIcon}
          />
        ) : null}
      </View>
      {error ? (
        <Text variant="bodySm" color={colors.error} style={styles.errorText}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.xl,
    height: 56,
    paddingHorizontal: spacing.lg,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  focused: {
    borderColor: 'rgba(74, 64, 224, 0.2)',
  },
  errorBorder: {
    borderColor: 'rgba(180, 19, 64, 0.2)',
  },
  input: {
    flex: 1,
    ...typography.bodyMd,
    color: colors.onSurface,
    height: '100%',
    padding: 0,
  },
  iconButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
  errorText: {
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});
