import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  colors,
  spacing,
  borderRadius,
  OPACITY_ON_PRESS_SURFACE,
  OPACITY_ON_PRESS_SUBTLE,
} from '../../theme';
import {Text, Icon, Row, Avatar, Badge, BasePressable} from '../primitives';
import type {BillItem, Participant} from '../../types';

interface BillItemRowProps {
  item: BillItem;
  participants: Participant[];
  /** How many units the currently-selected participant has claimed on this item */
  selectedParticipantQty: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onNamePress?: () => void;
  isSelected?: boolean;
}

export const BillItemRow: React.FC<BillItemRowProps> = ({
  item,
  participants,
  selectedParticipantQty,
  onIncrement,
  onDecrement,
  onNamePress,
  isSelected = false,
}) => {
  const claimedCount = item.claimedBy.length;
  const unclaimedCount = item.quantity - claimedCount;
  const isFullyClaimed = claimedCount >= item.quantity;
  const isUnclaimed = claimedCount === 0;

  // Get unique participants who claimed this item
  const uniqueClaimerIds = [...new Set(item.claimedBy)];
  const claimedParticipants = participants.filter(p =>
    uniqueClaimerIds.includes(p.id),
  );

  // Can the selected participant still claim more?
  const canIncrement = claimedCount < item.quantity;

  return (
    <View style={[styles.container, isSelected && styles.selectedContainer]}>
      <Row align="center" gap={spacing.md} style={styles.content}>
        {/* Always show quantity */}
        <View style={styles.quantityBadge}>
          <Text variant="labelMd" color={colors.primary}>
            {item.quantity}x
          </Text>
        </View>

        <BasePressable
          onPress={onNamePress}
          pressedOpacity={OPACITY_ON_PRESS_SURFACE}
          style={styles.nameSection}>
          <Text variant="titleSm" numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.claimSection}>
            {isUnclaimed ? (
              <Badge status="unclaimed" />
            ) : (
              <Row align="center" gap={4}>
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
                {unclaimedCount > 0 && (
                  <Text variant="caption" color={colors.onSurfaceVariant}>
                    {unclaimedCount}/{item.quantity} unclaimed
                  </Text>
                )}
                {isFullyClaimed && item.splitType === 'single' && (
                  <Text variant="caption" color={colors.primary}>
                    Claimed by {claimedParticipants[0]?.name}
                  </Text>
                )}
                {isFullyClaimed && item.splitType === 'shared' && (
                  <Text variant="caption" color={colors.onSurfaceVariant}>
                    Shared equally
                  </Text>
                )}
              </Row>
            )}
          </View>
        </BasePressable>

        <Text variant="titleSm" style={styles.price}>
          ${item.totalPrice.toFixed(2)}
        </Text>

        {/* Inline quantity selector */}
        {selectedParticipantQty > 0 ? (
          <Row align="center" gap={spacing.xs}>
            <BasePressable
              onPress={onDecrement}
              hitSlop={4}
              pressedOpacity={OPACITY_ON_PRESS_SUBTLE}
              style={styles.stepperBtn}>
              <Icon name="remove" size={14} color={colors.onSurface} />
            </BasePressable>
            <Text variant="labelMd" style={styles.stepperQty}>
              {selectedParticipantQty}
            </Text>
            <BasePressable
              onPress={canIncrement ? onIncrement : undefined}
              hitSlop={4}
              pressedOpacity={OPACITY_ON_PRESS_SUBTLE}
              style={[
                styles.stepperBtn,
                styles.stepperBtnAdd,
                !canIncrement && styles.stepperBtnDisabled,
              ]}>
              <Icon
                name="add"
                size={14}
                color={canIncrement ? colors.primary : colors.outlineVariant}
              />
            </BasePressable>
          </Row>
        ) : (
          <BasePressable
            onPress={canIncrement ? onIncrement : undefined}
            hitSlop={4}
            pressedOpacity={OPACITY_ON_PRESS_SUBTLE}
            style={[
              styles.actionButton,
              canIncrement
                ? styles.actionButtonPrimary
                : styles.actionButtonDisabled,
            ]}>
            <Icon
              name="add"
              size={16}
              color={canIncrement ? colors.primary : colors.outlineVariant}
            />
          </BasePressable>
        )}
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    marginBottom: spacing.sm,
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
    paddingVertical: 4,
    minWidth: 36,
    alignItems: 'center',
  },
  nameSection: {
    flex: 1,
  },
  claimSection: {
    marginTop: 4,
  },
  price: {
    minWidth: 56,
    textAlign: 'right',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonPrimary: {
    backgroundColor: 'rgba(74, 64, 224, 0.1)',
  },
  actionButtonDisabled: {
    backgroundColor: colors.surfaceContainerLow,
    opacity: 0.5,
  },
  stepperBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperBtnAdd: {
    backgroundColor: 'rgba(74, 64, 224, 0.1)',
  },
  stepperBtnDisabled: {
    backgroundColor: colors.surfaceContainerLow,
    opacity: 0.4,
  },
  stepperQty: {
    minWidth: 20,
    textAlign: 'center',
  },
});
