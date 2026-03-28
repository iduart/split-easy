import React, {useEffect, useRef} from 'react';
import {View, ScrollView, Animated, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, spacing, borderRadius, shadows} from '../theme';
import {
  Screen,
  Text,
  Button,
  Icon,
  Spacer,
  Card,
  Row,
  ProgressBar,
} from '../components/primitives';
import {Header, GlassFooter, SkeletonLoader} from '../components/shared';
import {useAppDispatch} from '../app/store';
import {setStatus} from '../features/scan/scanSlice';

export const ProcessingReceiptScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  // Auto-navigate after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setStatus('complete'));
      (navigation as any).navigate('ClaimItems');
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch, navigation]);

  return (
    <Screen style={styles.screen}>
      <Header
        showBack
        onBack={() => navigation.goBack()}
        showBrand
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Spacer size="4xl" />

        {/* Large Circular Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressCircleContainer}>
            <ProgressBar progress={0.75} variant="circular" size={192} />
            <View style={styles.progressCenter}>
              <Icon
                name="receipt-long"
                size={40}
                color={colors.primary}
              />
              <Spacer size="sm" />
              <Text variant="headlineSm" color={colors.primary}>
                75%
              </Text>
            </View>
          </View>
        </View>

        <Spacer size="3xl" />

        {/* Status Steps */}
        <View style={styles.stepsContainer}>
          {/* Step 1: Completed */}
          <Row align="center" gap={spacing.md} style={styles.stepRow}>
            <Icon name="check-circle" size={24} color={colors.primary} />
            <Text variant="bodyMd" color={colors.onSurface}>
              Uploading Receipt...
            </Text>
          </Row>

          <Spacer size="lg" />

          {/* Step 2: Active */}
          <Row align="center" gap={spacing.md} style={styles.stepRow}>
            <Animated.View
              style={[styles.activeDot, {opacity: pulseAnim}]}
            />
            <Text variant="bodyMd" color={colors.onSurface} style={styles.activeStepText}>
              Extracting Line Items...
            </Text>
          </Row>

          <Spacer size="lg" />

          {/* Step 3: Pending */}
          <Row align="center" gap={spacing.md} style={styles.stepRow}>
            <View style={styles.pendingDot} />
            <Text variant="bodyMd" color={colors.onSurfaceVariant}>
              Calculating Totals...
            </Text>
          </Row>
        </View>

        <Spacer size="3xl" />

        {/* Skeleton Preview Card */}
        <View style={styles.skeletonCard}>
          <SkeletonLoader width="60%" height={14} borderRadius={7} />
          <Spacer size="lg" />
          <SkeletonLoader width="100%" height={12} borderRadius={6} />
          <Spacer size="md" />
          <SkeletonLoader width="85%" height={12} borderRadius={6} />
          <Spacer size="md" />
          <SkeletonLoader width="90%" height={12} borderRadius={6} />
          <Spacer size="md" />
          <SkeletonLoader width="70%" height={12} borderRadius={6} />

          <Spacer size="2xl" />

          {/* Participant skeleton pills */}
          <Row gap={spacing.sm}>
            <SkeletonLoader width={80} height={32} borderRadius={16} />
            <SkeletonLoader width={64} height={32} borderRadius={16} />
            <SkeletonLoader width={72} height={32} borderRadius={16} />
          </Row>
        </View>

        <Spacer size="2xl" />

        {/* Cancel Upload Button */}
        <Button
          title="Cancel Upload"
          onPress={() => navigation.goBack()}
          variant="secondary"
          fullWidth
        />

        <Spacer size="8xl" />
      </ScrollView>

      <GlassFooter
        buttonTitle="Cancel"
        onPress={() => navigation.goBack()}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.surface,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  progressSection: {
    alignItems: 'center',
  },
  progressCircleContainer: {
    width: 192,
    height: 192,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCenter: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepsContainer: {
    paddingHorizontal: spacing.xl,
  },
  stepRow: {
    minHeight: 24,
  },
  activeDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  activeStepText: {
    fontWeight: '600',
  },
  pendingDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerHigh,
  },
  skeletonCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadows.card,
  },
});

export default ProcessingReceiptScreen;
