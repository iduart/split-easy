import React from 'react';
import {View, ScrollView, Pressable, StyleSheet, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, spacing, borderRadius, shadows} from '../theme';
import {
  Screen,
  Text,
  Icon,
  Spacer,
  Row,
} from '../components/primitives';
import {Header, ParticipantCard, GlassFooter} from '../components/shared';
import {mockActiveBillCOP, mockParticipants} from '../data/mock';

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

  const handleConfirm = () => {
    (navigation as any).navigate('MainTabs');
  };

  return (
    <Screen style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Row align="center" gap={spacing.sm}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backBtn}>
            <Icon name="arrow-back" size={24} color={colors.primary} />
          </Pressable>
          <Text variant="titleMd">Individual Totals</Text>
        </Row>
        <Text variant="titleLg" color={colors.primary} style={styles.brandText}>
          SplitEasy
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Spacer size="2xl" />

        {/* Total Bill Hero */}
        <View style={styles.heroSection}>
          <Row align="baseline" justify="center">
            <Text variant="headlineLg" color={colors.onSurface} style={styles.dollarSign}>
              $
            </Text>
            <Text variant="displayLg" color={colors.onSurface}>
              305.000
            </Text>
          </Row>
          <Text
            variant="titleMd"
            color={colors.primary}
            style={styles.currencyLabel}>
            COP
          </Text>
        </View>

        <Spacer size="3xl" />

        {/* Participant Cards */}
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
              />
            </View>
          );
        })}

        <Spacer size="lg" />

        {/* Empty State Card */}
        <View style={styles.emptyCard}>
          <Icon name="person-off" size={32} color={colors.onSurfaceVariant} />
          <Spacer size="md" />
          <Text variant="titleSm" color={colors.onSurfaceVariant}>
            No items claimed
          </Text>
          <Spacer size="xs" />
          <Text variant="bodySm" color={colors.onSurfaceVariant}>
            Someone missing?
          </Text>
        </View>

        <Spacer size="8xl" />
      </ScrollView>

      {/* Glass Footer */}
      <View style={styles.glassFooter}>
        <Pressable
          onPress={handleConfirm}
          style={({pressed}) => [{opacity: pressed ? 0.9 : 1}]}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDim]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.confirmBtn}>
            <Row align="center" gap={spacing.sm}>
              <Icon name="check-circle" size={20} color={colors.onPrimary} />
              <Text
                variant="labelLg"
                color={colors.onPrimary}
                style={styles.confirmLabel}>
                Confirm Totals
              </Text>
            </Row>
          </LinearGradient>
        </Pressable>
        <Text
          variant="bodySm"
          color={colors.onSurfaceVariant}
          style={styles.confirmSubtitle}>
          Secure Finalization
        </Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.surface,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  heroSection: {
    alignItems: 'center',
  },
  dollarSign: {
    fontWeight: '300',
    marginRight: spacing.xs,
  },
  currencyLabel: {
    textAlign: 'center',
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  cardWrapper: {
    marginBottom: spacing.lg,
  },
  emptyCard: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.outlineVariant,
    borderRadius: borderRadius.xl,
    padding: spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingBottom: spacing['3xl'],
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
    marginTop: spacing.sm,
  },
});

export default PerPersonTotalsScreen;
