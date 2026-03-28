import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, spacing} from '../../theme';
import {Text} from './Text';

interface DividerProps {
  label?: string;
}

export const Divider: React.FC<DividerProps> = ({label}) => {
  if (!label) {
    return <View style={styles.line} />;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.line, styles.flex]} />
      <Text
        variant="labelMd"
        color={colors.onSurfaceVariant}
        style={styles.label}>
        {label}
      </Text>
      <View style={[styles.line, styles.flex]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  line: {
    height: 1,
    backgroundColor: colors.surfaceContainerHigh,
  },
  flex: {
    flex: 1,
  },
  label: {
    marginHorizontal: spacing.md,
  },
});
