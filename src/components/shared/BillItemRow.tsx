import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {colors, spacing, borderRadius} from '../../theme';
import {Text, Icon, Row, Avatar, Badge} from '../primitives';
import type {BillItem, Participant} from '../../types';

interface BillItemRowProps {
  item: BillItem;
  participants: Participant[];
  onClaim?: () => void;
  onAssign?: () => void;
  isSelected?: boolean;
}

const getClaimStatus = (
  item: BillItem,
  participants: Participant[],
): {label: string; actionLabel: string; actionIcon: string} => {
  const claimedCount = item.claimedBy.length;

  if (claimedCount === 0) {
    return {label: 'unclaimed', actionLabel: 'Claim', actionIcon: 'add'};
  }

  if (item.splitType === 'shared') {
    return {
      label: `Split ${claimedCount}`,
      actionLabel: 'Edit',
      actionIcon: 'edit',
    };
  }

  const claimer = participants.find(p => p.id === item.claimedBy[0]);
  if (claimer) {
    return {label: claimer.name, actionLabel: 'Edit', actionIcon: 'edit'};
  }

  return {label: 'Yours', actionLabel: 'Yours', actionIcon: 'check'};
};

export const BillItemRow: React.FC<BillItemRowProps> = ({
  item,
  participants,
  onClaim,
  onAssign,
  isSelected = false,
}) => {
  const claimStatus = getClaimStatus(item, participants);
  const claimedParticipants = participants.filter(p =>
    item.claimedBy.includes(p.id),
  );
  const isUnclaimed = item.claimedBy.length === 0;

  return (
    <Pressable
      onPress={isUnclaimed ? onClaim : onAssign}
      style={({pressed}) => [
        styles.container,
        isSelected && styles.selectedContainer,
        {opacity: pressed ? 0.85 : 1},
      ]}>
      <Row align="center" gap={spacing.md} style={styles.content}>
        {item.quantity > 1 && (
          <View style={styles.quantityBadge}>
            <Text variant="labelMd" color={colors.primary}>
              {item.quantity}x
            </Text>
          </View>
        )}

        <View style={styles.nameSection}>
          <Text variant="bodyMd" numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.claimSection}>
            {isUnclaimed ? (
              <Badge status="unclaimed" />
            ) : (
              <Row gap={-8}>
                {claimedParticipants.slice(0, 3).map(p => (
                  <Avatar
                    key={p.id}
                    initial={p.initial}
                    size={22}
                    colorKey={p.colorKey}
                  />
                ))}
                {claimedParticipants.length > 3 && (
                  <Text variant="caption" color={colors.onSurfaceVariant}>
                    +{claimedParticipants.length - 3}
                  </Text>
                )}
              </Row>
            )}
          </View>
        </View>

        <Text variant="titleSm" style={styles.price}>
          ${item.totalPrice.toFixed(2)}
        </Text>

        <Pressable
          onPress={isUnclaimed ? onClaim : onAssign}
          hitSlop={4}
          style={({pressed}) => [
            styles.actionButton,
            isUnclaimed && styles.actionButtonPrimary,
            {opacity: pressed ? 0.7 : 1},
          ]}>
          <Icon
            name={claimStatus.actionIcon}
            size={16}
            color={isUnclaimed ? colors.primary : colors.onSurfaceVariant}
          />
        </Pressable>
      </Row>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.xs,
  },
  selectedContainer: {
    backgroundColor: 'rgba(74, 64, 224, 0.06)',
  },
  content: {
    flex: 1,
  },
  quantityBadge: {
    backgroundColor: 'rgba(74, 64, 224, 0.08)',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  nameSection: {
    flex: 1,
  },
  claimSection: {
    marginTop: 2,
  },
  price: {
    minWidth: 56,
    textAlign: 'right',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonPrimary: {
    backgroundColor: 'rgba(74, 64, 224, 0.1)',
  },
});
