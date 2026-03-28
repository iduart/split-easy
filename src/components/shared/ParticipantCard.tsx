import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, spacing, borderRadius} from '../../theme';
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
}

const formatCurrency = (amount: number, currency: string): string => {
  const symbol = currency === 'USD' ? '$' : currency;
  return `${symbol}${amount.toFixed(2)}`;
};

export const ParticipantCard: React.FC<ParticipantCardProps> = ({
  participant,
  items,
  subtotal,
  tax,
  tip,
  total,
  currency,
}) => {
  return (
    <View style={styles.container}>
      <Row align="center" justify="space-between">
        <Row align="center" gap={spacing.md}>
          <Avatar
            initial={participant.initial}
            size={44}
            colorKey={participant.colorKey}
          />
          <View>
            <Text variant="titleMd">{participant.name}</Text>
            <Text variant="bodySm" color={colors.onSurfaceVariant}>
              {items.length} item{items.length !== 1 ? 's' : ''} claimed
            </Text>
          </View>
        </Row>
        <Text variant="headlineSm" color={colors.primary}>
          {formatCurrency(total, currency)}
        </Text>
      </Row>

      <Spacer size="lg" />

      <View style={styles.itemList}>
        {items.map(item => (
          <Row
            key={item.id}
            justify="space-between"
            style={styles.itemRow}>
            <Text
              variant="bodyMd"
              color={colors.onSurfaceVariant}
              numberOfLines={1}
              style={styles.itemName}>
              {item.name}
              {item.splitType === 'shared' && item.claimedBy.length > 1
                ? ` (1/${item.claimedBy.length})`
                : ''}
            </Text>
            <Text variant="bodyMd">
              {formatCurrency(
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
            {formatCurrency(subtotal, currency)}
          </Text>
        </Row>
        <Row justify="space-between" style={styles.breakdownRow}>
          <Text variant="bodySm" color={colors.onSurfaceVariant}>
            Tax
          </Text>
          <Text variant="bodySm" color={colors.onSurfaceVariant}>
            {formatCurrency(tax, currency)}
          </Text>
        </Row>
        <Row justify="space-between" style={styles.breakdownRow}>
          <Text variant="bodySm" color={colors.onSurfaceVariant}>
            Tip
          </Text>
          <Text variant="bodySm" color={colors.onSurfaceVariant}>
            {formatCurrency(tip, currency)}
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
    padding: spacing.lg,
  },
  itemList: {
    gap: spacing.sm,
  },
  itemRow: {
    paddingVertical: 2,
  },
  itemName: {
    flex: 1,
    marginRight: spacing.md,
  },
  breakdownSection: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.surfaceContainerHigh,
    gap: spacing.xs,
  },
  breakdownRow: {
    paddingVertical: 1,
  },
});
