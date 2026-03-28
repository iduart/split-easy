import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import {colors, spacing, borderRadius} from '../../theme';
import {Text, Avatar, Icon, Row} from '../primitives';
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
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.chip,
          styles.addChip,
          {opacity: pressed ? 0.7 : 1},
        ]}>
        <Row align="center" gap={spacing.sm}>
          <Icon name="add" size={18} color={colors.onSurfaceVariant} />
          <Text variant="labelLg" color={colors.onSurfaceVariant}>
            Add
          </Text>
        </Row>
      </Pressable>
    );
  }

  if (!participant) {
    return null;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.chip,
        isActive ? styles.activeChip : styles.inactiveChip,
        {opacity: pressed ? 0.7 : 1},
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
    </Pressable>
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
