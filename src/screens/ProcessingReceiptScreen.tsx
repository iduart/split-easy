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
  Row,
  ProgressBar,
} from '../components/primitives';
import {Header, SkeletonLoader} from '../components/shared';
import {useScanBill} from '../hooks/useScanBill';
import type {ScanStage} from '../services/scanBillApi.types';

const STAGE_ORDER: ScanStage[] = [
  'created',
  'uploading',
  'processing',
  'normalizing',
  'completed',
];

/** Map each stage to a user-visible step */
const STEPS: {stage: ScanStage; label: string}[] = [
  {stage: 'uploading', label: 'Uploading Receipt...'},
  {stage: 'processing', label: 'Extracting Line Items...'},
  {stage: 'normalizing', label: 'Calculating Totals...'},
];

function stageIndex(stage: ScanStage | null): number {
  if (!stage) return -1;
  return STAGE_ORDER.indexOf(stage);
}

export const ProcessingReceiptScreen: React.FC = () => {
  const navigation = useNavigation();
  const {scanState, startScanFlow, retry, cancel} = useScanBill();
  const pulseAnim = useRef(new Animated.Value(0.3)).current;
  const hasStarted = useRef(false);

  // Start the scan flow on mount
  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      startScanFlow();
    }
  }, [startScanFlow]);

  // Pulse animation for active step
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

  // Auto-navigate to ClaimItems when scan completes
  useEffect(() => {
    if (scanState.status === 'complete' && scanState.receipt) {
      (navigation as any).navigate('ClaimItems');
    }
  }, [scanState.status, scanState.receipt, navigation]);

  const progress = scanState.progress / 100; // ProgressBar expects 0-1
  const currentStageIdx = stageIndex(scanState.stage);
  const isError = scanState.status === 'error';

  const handleCancel = () => {
    cancel();
    navigation.goBack();
  };

  const handleRetry = () => {
    hasStarted.current = false;
    retry();
  };

  // After retry resets state, re-trigger the scan flow
  useEffect(() => {
    if (scanState.status === 'idle' && scanState.selectedImage && !hasStarted.current) {
      hasStarted.current = true;
      startScanFlow();
    }
  }, [scanState.status, scanState.selectedImage, startScanFlow]);

  return (
    <Screen style={styles.screen}>
      <Header showBack onBack={handleCancel} showBrand />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Spacer size="4xl" />

        {/* Large Circular Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressCircleContainer}>
            <ProgressBar
              progress={isError ? 0 : progress}
              variant="circular"
              size={192}
            />
            <View style={styles.progressCenter}>
              <Icon
                name={isError ? 'error-outline' : 'receipt-long'}
                size={40}
                color={isError ? colors.error : colors.primary}
              />
              <Spacer size="sm" />
              <Text
                variant="headlineSm"
                color={isError ? colors.error : colors.primary}>
                {isError ? 'Failed' : `${scanState.progress}%`}
              </Text>
            </View>
          </View>
        </View>

        <Spacer size="3xl" />

        {/* Status Steps */}
        {!isError && (
          <View style={styles.stepsContainer}>
            {STEPS.map((step, idx) => {
              const stepStageIdx = stageIndex(step.stage);
              const isComplete = currentStageIdx > stepStageIdx;
              const isActive =
                currentStageIdx === stepStageIdx ||
                (step.stage === 'uploading' && scanState.stage === 'created');
              const isPending = !isComplete && !isActive;

              return (
                <View key={step.stage}>
                  <Row align="center" gap={spacing.md} style={styles.stepRow}>
                    {isComplete ? (
                      <Icon
                        name="check-circle"
                        size={24}
                        color={colors.primary}
                      />
                    ) : isActive ? (
                      <Animated.View
                        style={[styles.activeDot, {opacity: pulseAnim}]}
                      />
                    ) : (
                      <View style={styles.pendingDot} />
                    )}
                    <Text
                      variant="bodyMd"
                      color={
                        isPending
                          ? colors.onSurfaceVariant
                          : colors.onSurface
                      }
                      style={isActive ? styles.activeStepText : undefined}>
                      {step.label}
                    </Text>
                  </Row>
                  {idx < STEPS.length - 1 && <Spacer size="lg" />}
                </View>
              );
            })}
          </View>
        )}

        {/* Error state */}
        {isError && (
          <View style={styles.errorContainer}>
            <Text
              variant="titleMd"
              color={colors.error}
              style={styles.errorTitle}>
              Something went wrong
            </Text>
            <Spacer size="sm" />
            <Text
              variant="bodyMd"
              color={colors.onSurfaceVariant}
              style={styles.errorMessage}>
              {scanState.errorMessage ?? 'An unexpected error occurred.'}
            </Text>
            <Spacer size="xl" />
            <Button title="Try Again" onPress={handleRetry} fullWidth />
          </View>
        )}

        {/* Stage label */}
        {!isError && scanState.stageLabel ? (
          <>
            <Spacer size="xl" />
            <Text
              variant="bodySm"
              color={colors.onSurfaceVariant}
              style={styles.stageLabel}>
              {scanState.stageLabel}
            </Text>
          </>
        ) : null}

        <Spacer size="3xl" />

        {/* Skeleton Preview Card */}
        {!isError && (
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
            <Row gap={spacing.sm}>
              <SkeletonLoader width={80} height={32} borderRadius={16} />
              <SkeletonLoader width={64} height={32} borderRadius={16} />
              <SkeletonLoader width={72} height={32} borderRadius={16} />
            </Row>
          </View>
        )}

        <Spacer size="2xl" />

        {/* Cancel button */}
        {!isError && (
          <Button
            title="Cancel Upload"
            onPress={handleCancel}
            variant="secondary"
            fullWidth
          />
        )}

        <Spacer size="8xl" />
      </ScrollView>
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
  stageLabel: {
    textAlign: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  errorTitle: {
    textAlign: 'center',
  },
  errorMessage: {
    textAlign: 'center',
  },
  skeletonCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadows.card,
  },
});

export default ProcessingReceiptScreen;
