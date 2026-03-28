import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, spacing, borderRadius, shadows} from '../../theme';
import {Text, Avatar, Row, Spacer} from '../primitives';
import type {Participant, BillItem} from '../../types';

interface ParticipantCardProps {
  participant: Participant;
  items: BillItem[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  currency: string;
  /** e.g. 0.1 → labels show "Proportional Tax (10%)" */
  taxRate?: number;
}

const formatAmount = (amount: number, currency: string): string => {
  if (currency === 'COP') {
    const n = Math.round(amount);
    return `$${n.toLocaleString('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }
  const symbol = currency === 'USD' ? '$' : currency;
  return `${symbol}${amount.toFixed(2)}`;
};

const displayName = (participant: Participant): string =>
  participant.name === 'Me' ? 'Me (You)' : participant.name;

export const ParticipantCard: React.FC<ParticipantCardProps> = ({
  participant,
  items,
  subtotal,
  tax,
  tip,
  total,
  currency,
  taxRate = 0.1,
}) => {
  const taxPercent = Math.round(taxRate * 100);
  const taxLabel = `Proportional Tax (${taxPercent}%)`;

  return (
    <View style={styles.container}>
      <Row align="flex-start" justify="space-between">
        <View style={styles.headerMain}>
          <Row align="center" gap={spacing.md}>
            <Avatar
              initial={participant.initial}
              size={48}
              colorKey={participant.colorKey}
            />
            <View style={styles.nameBlock}>
              <Text variant="headlineSm" numberOfLines={1}>
                {displayName(participant)}
              </Text>
              <Text variant="bodySm" color={colors.onSurfaceVariant} numberOfLines={1}>
                {items.length} item{items.length !== 1 ? 's' : ''} claimed
              </Text>
            </View>
          </Row>
        </View>
        <View style={styles.balanceCol}>
          <Text variant="bodySm" color={colors.onSurfaceVariant} style={styles.balanceLabel}>
            Balance
          </Text>
          <Text variant="headlineSm" style={styles.balanceAmount} numberOfLines={1}>
            {formatAmount(total, currency)}
          </Text>
        </View>
      </Row>

      <Spacer size="2xl" />

      <View style={styles.itemList}>
        {items.map(item => (
          <Row
            key={item.id}
            justify="space-between"
            align="center"
            style={styles.itemRow}>
            <Text
              variant="bodyMd"
              color={colors.onSurface}
              numberOfLines={2}
              style={styles.itemName}>
              {item.name}
              {item.splitType === 'shared' && item.claimedBy.length > 1
                ? ` (1/${item.claimedBy.length})`
                : ''}
            </Text>
            <Text variant="bodyMd" style={styles.itemPrice}>
              {formatAmount(
                item.splitType === 'shared' && item.claimedBy.length > 1
                  ? item.totalPrice / item.claimedBy.length
                  : item.totalPrice,
                currency,
              )}
            </Text>
          </Row>
        ))}
      </View>

      <View style={styles.breakdownSection}>
        <Row justify="space-between" style={styles.breakdownRow}>
          <Text variant="bodySm" color={colors.onSurfaceVariant}>
            Subtotal
          </Text>
          <Text variant="bodySm" color={colors.onSurfaceVariant}>
            {formatAmount(subtotal, currency)}
          </Text>
        </Row>
        <Row justify="space-between" style={styles.breakdownRow}>
          <Text variant="bodySm" color={colors.onSurfaceVariant}>
            {taxLabel}
          </Text>
          <Text variant="bodySm" color={colors.primary} style={styles.breakdownAccent}>
            + {formatAmount(tax, currency)}
          </Text>
        </Row>
        <Row justify="space-between" style={styles.breakdownRow}>
          <Text variant="bodySm" color={colors.onSurfaceVariant}>
            Proportional Tip
          </Text>
          <Text variant="bodySm" color={colors.primary} style={styles.breakdownAccent}>
            + {formatAmount(tip, currency)}
          </Text>
        </Row>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    padding: spacing['2xl'],
    ...shadows.card,
  },
  headerMain: {
    flex: 1,
    minWidth: 0,
    marginRight: spacing.md,
  },
  nameBlock: {
    flex: 1,
    minWidth: 0,
  },
  balanceCol: {
    alignItems: 'flex-end',
    flexShrink: 0,
    flexGrow: 0,
  },
  balanceLabel: {
    marginBottom: spacing.xs,
  },
  balanceAmount: {
    fontWeight: '800',
    color: colors.onSurface,
  },
  itemList: {
    gap: spacing.md,
    marginBottom: spacing['2xl'],
  },
  itemRow: {
    minHeight: 40,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
  },
  itemName: {
    flex: 1,
    marginRight: spacing.md,
    fontWeight: '500',
  },
  itemPrice: {
    fontWeight: '600',
    color: colors.onSurface,
  },
  breakdownSection: {
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.surfaceContainer,
    gap: spacing.sm,
  },
  breakdownRow: {
    paddingHorizontal: spacing.xs,
  },
  breakdownAccent: {
    fontWeight: '500',
  },
});
