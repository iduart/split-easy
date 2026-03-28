import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  type LayoutChangeEvent,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  colors,
  spacing,
  borderRadius,
  shadows,
  OPACITY_ON_PRESS_ICON,
  OPACITY_ON_PRESS_SURFACE,
  OPACITY_ON_PRESS_PROMO,
} from '../theme';
import {
  Screen,
  Text,
  Icon,
  Spacer,
  Avatar,
  Row,
  ProgressBar,
  BasePressable,
} from '../components/primitives';
import {
  GradientFill,
  RecentBillRow,
  ListSectionHeader,
} from '../components/shared';
import {useAppDispatch, useAppSelector} from '../app/store';
import {setRecentBills} from '../features/bills/billsSlice';
import {mockRecentBills, mockUser} from '../data/mock';

export const HomeDashboardScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const recentBills = useAppSelector(state => state.bills.recentBills);
  const {width: windowWidth} = useWindowDimensions();
  const [scrollViewportWidth, setScrollViewportWidth] = useState<number | null>(
    null,
  );
  const scrollPad = spacing.lg * 2;
  const viewportW = scrollViewportWidth ?? windowWidth;
  const scanCardLayoutWidth = Math.max(0, viewportW - scrollPad);
  const onScrollViewLayout = useCallback((e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setScrollViewportWidth(prev => (prev === w ? prev : w));
  }, []);

  useEffect(() => {
    dispatch(setRecentBills(mockRecentBills));
  }, [dispatch]);

  return (
    <Screen style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Row align="center" gap={spacing.md}>
          <Avatar initial="J" size={40} colorKey="indigo" />
          <Text
            variant="titleLg"
            color={colors.primary}
            style={styles.brandText}>
            SplitEasy
          </Text>
        </Row>
        <Row align="center" gap={spacing.xs}>
          <BasePressable
            pressedOpacity={OPACITY_ON_PRESS_ICON}
            style={styles.headerIconBtn}
            onPress={() => {}}>
            <Icon name="notifications" size={24} color={colors.onSurface} />
          </BasePressable>
          <BasePressable
            pressedOpacity={OPACITY_ON_PRESS_ICON}
            style={styles.headerIconBtn}
            onPress={() => {}}>
            <Icon name="more-vert" size={24} color={colors.onSurface} />
          </BasePressable>
        </Row>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onLayout={onScrollViewLayout}
        showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <Spacer size="lg" />
        <Text variant="headlineLg">Hello, {mockUser.name}</Text>
        <Spacer size="xs" />
        <Text variant="bodyLg" color={colors.onSurfaceVariant}>
          Ready to clear the tab?
        </Text>

        <Spacer size="2xl" />

        {/* Scan New Bill */}
        <BasePressable
          style={[styles.scanCardPressable, {width: scanCardLayoutWidth}]}
          onPress={() => (navigation as any).navigate('ScanFlow')}>
          <View style={styles.scanCardShadowShell}>
            <GradientFill
              colors={[colors.primary, colors.primaryDim]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.scanCardClip}>
              <View style={styles.scanCardContent}>
                <View style={styles.scanCardTop}>
                  <Icon
                    name="document-scanner"
                    size={32}
                    color={colors.onPrimary}
                  />
                  <Icon
                    name="arrow-forward"
                    size={20}
                    color={colors.onPrimary}
                    style={styles.scanCardArrow}
                  />
                </View>
                <View style={styles.scanCardTextBlock}>
                  <Text
                    variant="titleMd"
                    color={colors.onPrimary}
                    style={styles.scanCardTitle}>
                    Scan New Bill
                  </Text>
                  <Spacer size="xs" />
                  <Text
                    variant="bodySm"
                    color={colors.onPrimary}
                    style={styles.scanCardSubtitle}>
                    Automated receipt detection
                  </Text>
                </View>
              </View>
            </GradientFill>
          </View>
        </BasePressable>

        <Spacer size="lg" />

        {/* Join a Bill */}
        <BasePressable
          pressedOpacity={OPACITY_ON_PRESS_SURFACE}
          style={styles.joinCard}
          onPress={() => {}}>
          <Icon name="group-add" size={32} color={colors.primary} />
          <Spacer size="3xl" />
          <Text variant="titleMd" style={{fontWeight: '700'}}>
            Join a Bill
          </Text>
          <Spacer size="xs" />
          <Text variant="bodySm" color={colors.onSurfaceVariant}>
            Enter a room code
          </Text>
        </BasePressable>

        <Spacer size="2xl" />

        {/* Quota & Premium Row */}
        <View style={styles.quotaPremiumRow}>
          {/* Free Scans */}
          <View style={styles.quotaCard}>
            <View style={styles.quotaHeader}>
              <Text
                variant="labelSm"
                color={colors.onSurfaceVariant}
                style={styles.quotaLabel}>
                Free Scans
              </Text>
              <Text
                variant="titleSm"
                color={colors.primary}
                style={{fontWeight: '700'}}>
                3 / 5
              </Text>
            </View>
            <Spacer size="md" />
            <ProgressBar progress={0.6} />
            <Spacer size="sm" />
            <Text
              variant="bodySm"
              color={colors.onSurfaceVariant}
              style={{fontSize: 11}}>
              2 scans remaining for September
            </Text>
          </View>

          {/* Premium Banner */}
          <View style={styles.premiumBanner}>
            <View style={styles.premiumBlurCircle} />
            <Row align="center" gap={spacing.md} style={{zIndex: 1}}>
              <Icon
                name="workspace-premium"
                size={28}
                color={colors.onSecondaryContainer}
              />
              <View style={{flex: 1}}>
                <Text variant="titleSm" style={{fontWeight: '700'}}>
                  Get Unlimited Scans
                </Text>
                <Text
                  variant="bodySm"
                  color={colors.onSurfaceVariant}
                  style={{opacity: 0.8}}>
                  Unlock split insights & zero ads
                </Text>
              </View>
              <BasePressable
                pressedOpacity={OPACITY_ON_PRESS_PROMO}
                style={styles.upgradeBtn}
                onPress={() => {}}>
                <Text
                  variant="labelSm"
                  color={colors.onPrimary}
                  style={{fontWeight: '700'}}>
                  Upgrade
                </Text>
              </BasePressable>
            </Row>
          </View>
        </View>

        <Spacer size="2xl" />

        {/* Recent Bills */}
        <ListSectionHeader
          title="Recent Bills"
          actionLabel="View History"
          onActionPress={() => {}}
        />

        <Spacer size="lg" />

        {recentBills.map(bill => (
          <RecentBillRow key={bill.id} bill={bill} onPress={() => {}} />
        ))}

        <Spacer size="2xl" />

        {/* Tip card */}
        <View
          style={[styles.tipCardPressable, {width: scanCardLayoutWidth}]}>
          <GradientFill
            colors={[colors.primary, colors.primaryDim]}
            start={{x: 0, y: 0}}
            end={{x: 0.6, y: 1}}
            style={styles.tipCardClip}>
            <View style={styles.tipCardBody}>
              <View style={styles.tipContent}>
                <Text
                  variant="titleLg"
                  color={colors.onPrimary}
                  style={styles.tipTitle}>
                  Divide items in seconds
                </Text>
                <Spacer size="sm" />
                <Text
                  variant="bodySm"
                  color={colors.onPrimary}
                  style={styles.tipSubtitle}>
                  Our AI identifies prices so you don't have to type them.
                </Text>
              </View>
            </View>
          </GradientFill>
        </View>

        {/* Bottom spacing for tab bar */}
        <Spacer size="8xl" />
      </ScrollView>
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
  brandText: {
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    alignItems: 'stretch',
  },
  scanCardPressable: {
    maxWidth: '100%',
  },
  scanCardShadowShell: {
    width: '100%',
    borderRadius: borderRadius.xl,
    ...shadows.elevated,
  },
  scanCardClip: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.xl,
  },
  scanCardContent: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'space-between',
  },
  scanCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  scanCardArrow: {
    opacity: 0.5,
    marginTop: 6,
  },
  scanCardTextBlock: {
    flexShrink: 0,
    width: '100%',
  },
  scanCardTitle: {
    fontWeight: '700',
  },
  scanCardSubtitle: {
    opacity: 0.85,
  },
  joinCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 2,
  },
  // Quota & Premium
  quotaPremiumRow: {
    gap: spacing.lg,
  },
  quotaCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
  },
  quotaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  quotaLabel: {
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  premiumBanner: {
    backgroundColor: colors.secondaryContainer,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    overflow: 'hidden',
  },
  premiumBlurCircle: {
    position: 'absolute',
    right: -16,
    top: -16,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(74, 64, 224, 0.1)',
  },
  upgradeBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.md,
  },
  // Tip card
  tipCardPressable: {
    maxWidth: '100%',
  },
  tipCardClip: {
    width: '100%',
    borderRadius: borderRadius['2xl'],
  },
  tipCardBody: {
    width: '100%',
    minHeight: 168,
    padding: spacing.xl,
    justifyContent: 'flex-end',
  },
  tipContent: {
    width: '100%',
  },
  tipTitle: {
    fontWeight: '800',
  },
  tipSubtitle: {
    opacity: 0.8,
  },
});

export default HomeDashboardScreen;
