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
          <Icon name="add" size={16} color={colors.outline} />
          <Text variant="labelMd" color={colors.outline} style={styles.addLabel}>
            Add person
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
        {isActive ? (
          <View style={styles.activeAvatar}>
            <Text style={styles.activeAvatarInitial}>
              {participant.initial.toUpperCase()}
            </Text>
          </View>
        ) : (
          <Avatar
            initial={participant.initial}
            size={24}
            colorKey={participant.colorKey}
          />
        )}
        <Text
          variant="labelMd"
          color={
            isActive ? colors.onPrimary : colors.onSurfaceVariant
          }
          style={styles.participantName}>
          {participant.name}
        </Text>
      </Row>
    </BasePressable>
  );
};

const AVATAR = 24;

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  activeChip: {
    backgroundColor: colors.primary,
  },
  inactiveChip: {
    backgroundColor: colors.surfaceContainerLowest,
  },
  activeAvatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    backgroundColor: 'rgba(244, 241, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeAvatarInitial: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  participantName: {
    fontWeight: '600',
  },
  addChip: {
    backgroundColor: colors.transparent,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.outlineVariant,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  addLabel: {
    fontWeight: '600',
  },
});
