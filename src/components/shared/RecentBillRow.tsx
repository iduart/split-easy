import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {colors, spacing, borderRadius} from '../../theme';
import {Text, Icon, Row, Spacer} from '../primitives';
import type {BillSummary} from '../../types';

export interface RecentBillRowProps {
  bill: BillSummary;
  onPress?: () => void;
}

export const RecentBillRow: React.FC<RecentBillRowProps> = ({
  bill,
  onPress,
}) => {
  const row = (
    <Row align="center" gap={spacing.lg}>
      <View style={[styles.iconCircle, {backgroundColor: bill.iconBg}]}>
        <Icon name={bill.icon} size={22} color={bill.iconColor} />
      </View>
      <View style={styles.info}>
        <Text variant="titleSm" numberOfLines={1} style={styles.title}>
          {bill.restaurantName}
        </Text>
        <Text variant="bodySm" color={colors.onSurfaceVariant}>
          {bill.date}
        </Text>
      </View>
      <View style={styles.right}>
        <Text variant="titleSm" style={styles.amount}>
          ${bill.totalAmount.toFixed(2)}
        </Text>
        <Spacer size="xs" />
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                bill.status === 'in_progress'
                  ? colors.statusInProgress.bg
                  : colors.statusCompleted.bg,
            },
          ]}>
          <Text
            variant="labelSm"
            style={[
              styles.statusText,
              {
                color:
                  bill.status === 'in_progress'
                    ? colors.statusInProgress.text
                    : colors.statusCompleted.text,
              },
            ]}>
            {bill.status === 'in_progress' ? 'In Progress' : 'Completed'}
          </Text>
        </View>
      </View>
    </Row>
  );

  if (onPress) {
    return (
      <Pressable
        style={({pressed}) => [
          styles.container,
          {opacity: pressed ? 0.85 : 1},
        ]}
        onPress={onPress}>
        {row}
      </Pressable>
    );
  }

  return <View style={styles.container}>{row}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xs,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
