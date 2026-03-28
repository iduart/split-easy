import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, spacing, borderRadius, OPACITY_ON_PRESS_SUBTLE} from '../../theme';
import {Text, Avatar, Icon, Row, BasePressable} from '../primitives';
import type {Participant} from '../../types';

interface ParticipantChipProps {
  participant?: Participant;
  isActive?: boolean;
  onPress?: () => void;
  isAddButton?: boolean;
}

export const ParticipantChip: React.FC<ParticipantChipProps> = ({
  participant,
  isActive = false,
  onPress,
  isAddButton = false,
}) => {
  if (isAddButton) {
    return (
      <BasePressable
        onPress={onPress}
        pressedOpacity={OPACITY_ON_PRESS_SUBTLE}
        style={[styles.chip, styles.addChip]}>
        <Row align="center" gap={spacing.sm}>
          <Icon name="add" size={18} color={colors.onSurfaceVariant} />
          <Text variant="labelLg" color={colors.onSurfaceVariant}>
            Add
          </Text>
        </Row>
      </BasePressable>
    );
  }

  if (!participant) {
    return null;
  }

  return (
    <BasePressable
      onPress={onPress}
      pressedOpacity={OPACITY_ON_PRESS_SUBTLE}
      style={[
        styles.chip,
        isActive ? styles.activeChip : styles.inactiveChip,
      ]}>
      <Row align="center" gap={spacing.sm}>
        <Avatar
          initial={participant.initial}
          size={28}
          colorKey={participant.colorKey}
        />
        <Text
          variant="labelLg"
          color={isActive ? colors.onPrimary : colors.onSurface}>
          {participant.name}
        </Text>
      </Row>
    </BasePressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing.xs,
    paddingRight: spacing.lg,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  activeChip: {
    backgroundColor: colors.primary,
  },
  inactiveChip: {
    backgroundColor: colors.surfaceContainerLowest,
  },
  addChip: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.outlineVariant,
    paddingLeft: spacing.md,
    paddingRight: spacing.lg,
    paddingVertical: spacing.sm,
  },
});
