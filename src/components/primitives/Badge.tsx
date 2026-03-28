import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, borderRadius, spacing} from '../../theme';
import {Text} from './Text';

type BadgeStatus = 'in_progress' | 'completed' | 'unclaimed';

interface BadgeProps {
  status: BadgeStatus;
  label?: string;
}

const statusConfig: Record<BadgeStatus, {bg: string; text: string; defaultLabel: string}> = {
  in_progress: {
    bg: colors.statusInProgress.bg,
    text: colors.statusInProgress.text,
    defaultLabel: 'In Progress',
  },
  completed: {
    bg: colors.statusCompleted.bg,
    text: colors.statusCompleted.text,
    defaultLabel: 'Completed',
  },
  unclaimed: {
    bg: colors.statusUnclaimed.bg,
    text: colors.statusUnclaimed.text,
    defaultLabel: 'Unclaimed',
  },
};

export const Badge: React.FC<BadgeProps> = ({status, label}) => {
  const config = statusConfig[status];

  return (
    <View style={[styles.container, {backgroundColor: config.bg}]}>
      <Text variant="labelSm" color={config.text} style={styles.text}>
        {label ?? config.defaultLabel}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '700',
  },
});
