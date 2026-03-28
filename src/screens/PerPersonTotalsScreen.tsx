import React from 'react';
import {View, ScrollView, StyleSheet, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {
  colors,
  spacing,
  borderRadius,
  shadows,
  OPACITY_ON_PRESS_ICON,
} from '../theme';
import {
  Screen,
  Text,
  Icon,
  Spacer,
  Row,
  BasePressable,
} from '../components/primitives';
import {ParticipantCard} from '../components/shared';
import {mockActiveBillCOP, mockParticipants} from '../data/mock';

const formatCOP = (amount: number): string =>
  `$${Math.round(amount).toLocaleString('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

const getParticipantItems = (participantId: string) => {
  return mockActiveBillCOP.items.filter(item =>
    item.claimedBy.includes(participantId),
  );
};

const getParticipantTotals = (participantId: string) => {
  const items = getParticipantItems(participantId);
  const subtotal = items.reduce((sum, item) => {
    const share =
      item.splitType === 'shared' && item.claimedBy.length > 1
        ? item.totalPrice / item.claimedBy.length
        : item.totalPrice;
    return sum + share;
  }, 0);

  const totalParticipantCount = mockParticipants.length;
  const tax = subtotal * mockActiveBillCOP.taxRate;
  const tip = mockActiveBillCOP.tipAmount / totalParticipantCount;
  const total = subtotal + tax + tip;

  return {subtotal, tax, tip, total};
};

export const PerPersonTotalsScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleConfirm = () => {
    (navigation as any).navigate('MainTabs');
  };

  const billTotalFormatted = formatCOP(mockActiveBillCOP.totalAmount);

  return (
    <Screen style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Row align="center" gap={spacing.md}>
            <BasePressable
              onPress={() => navigation.goBack()}
              pressedOpacity={OPACITY_ON_PRESS_ICON}
              style={styles.backBtn}>
              <Icon name="arrow-back" size={24} color={colors.primary} />
            </BasePressable>
            <Text variant="headlineMd" numberOfLines={1} style={styles.headerTitle}>
              Individual Totals
            </Text>
          </Row>
        </View>
        <Text
          variant="titleLg"
          color={colors.primary}
          numberOfLines={1}
          style={styles.brandText}>
          SplitEasy
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: spacing['3xl'] + insets.bottom + 120},
        ]}
        showsVerticalScrollIndicator={false}>
        <Spacer size="2xl" />

        <View style={styles.heroSection}>
          <Text variant="bodySm" color={colors.onSurfaceVariant} style={styles.heroLabel}>
            Total Bill
          </Text>
          <Row align="baseline" style={styles.heroAmountRow} gap={spacing.sm}>
            <Text variant="headlineSm" color={colors.onSurfaceVariant} style={styles.heroDollar}>
              $
            </Text>
            <Text style={styles.heroNumber}>{billTotalFormatted.replace(/^\$/, '')}</Text>
            <Text variant="titleLg" color={colors.primary} style={styles.heroCurrency}>
              COP
            </Text>
          </Row>
        </View>

        <Spacer size="3xl" />

        {mockParticipants.map(participant => {
          const items = getParticipantItems(participant.id);
          const totals = getParticipantTotals(participant.id);

          return (
            <View key={participant.id} style={styles.cardWrapper}>
              <ParticipantCard
                participant={participant}
                items={items}
                subtotal={totals.subtotal}
                tax={totals.tax}
                tip={totals.tip}
                total={totals.total}
                currency="COP"
                taxRate={mockActiveBillCOP.taxRate}
              />
            </View>
          );
        })}

        <View style={styles.emptyCard}>
          <Icon name="person-off" size={40} color={colors.outline} />
          <Spacer size="md" />
          <Text variant="titleSm" color={colors.onSurface} style={styles.emptyTitle}>
            No items claimed
          </Text>
          <Spacer size="xs" />
          <Text variant="bodySm" color={colors.onSurfaceVariant} style={styles.emptySubtitle}>
            Someone missing? Go back to Claim Items.
          </Text>
        </View>
      </ScrollView>

      <View
        style={[
          styles.glassFooter,
          {paddingBottom: Math.max(insets.bottom, spacing.lg) + spacing.md},
        ]}>
        <BasePressable onPress={handleConfirm}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDim]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.confirmBtn}>
            <Row align="center" justify="center" gap={spacing.sm}>
              <Text
                variant="labelLg"
                color={colors.onPrimary}
                style={styles.confirmLabel}>
                Confirm Totals
              </Text>
              <Icon name="check-circle" size={22} color={colors.onPrimary} />
            </Row>
          </LinearGradient>
        </BasePressable>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.surface,
  },
  header: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
  },
  headerLeft: {
    flex: 1,
    minWidth: 0,
    marginRight: spacing.md,
  },
  headerTitle: {
    fontWeight: '700',
    flex: 1,
    minWidth: 0,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandText: {
    fontWeight: '800',
    flexShrink: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  heroSection: {
    alignSelf: 'stretch',
  },
  heroLabel: {
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  heroAmountRow: {
    flexWrap: 'wrap',
  },
  heroDollar: {
    fontWeight: '300',
  },
  heroNumber: {
    fontSize: 56,
    fontWeight: '800',
    letterSpacing: -1,
    lineHeight: 60,
    color: colors.onSurface,
  },
  heroCurrency: {
    fontWeight: '700',
  },
  cardWrapper: {
    marginBottom: spacing['2xl'],
  },
  emptyCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(171, 173, 174, 0.3)',
    borderRadius: borderRadius.xl,
    padding: spacing['3xl'],
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.85,
  },
  emptyTitle: {
    fontWeight: '600',
  },
  emptySubtitle: {
    textAlign: 'center',
  },
  glassFooter: {
    backgroundColor:
      Platform.OS === 'ios'
        ? 'rgba(255, 255, 255, 0.85)'
        : 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    ...shadows.glass,
  },
  confirmBtn: {
    height: 56,
    borderRadius: borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.elevated,
  },
  confirmLabel: {
    fontWeight: '700',
  },
  confirmSubtitle: {
    textAlign: 'center',
    marginTop: spacing.lg,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 10,
  },
});

export default PerPersonTotalsScreen;
