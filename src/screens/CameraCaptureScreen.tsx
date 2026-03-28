import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, spacing, borderRadius, OPACITY_ON_PRESS_ICON} from '../theme';
import {Text, Icon, Row, BasePressable} from '../components/primitives';
import {useScanBill} from '../hooks/useScanBill';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const CUTOUT_WIDTH = SCREEN_WIDTH - 80;
const CUTOUT_HEIGHT = SCREEN_HEIGHT * 0.45;

export const CameraCaptureScreen: React.FC = () => {
  const navigation = useNavigation();
  const {pickFromCamera} = useScanBill();
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const handleCapture = () => {
    pickFromCamera(() => {
      (navigation as any).navigate('ProcessingReceipt');
    });
  };

  return (
    <View style={styles.container}>
      {/* Simulated camera (black background) */}
      <View style={styles.cameraSimulation} />

      {/* Top progress bar */}
      <View style={styles.topProgressBar}>
        <View style={styles.topProgressFill} />
      </View>

      {/* Overlay with cutout */}
      <View style={styles.overlay}>
        {/* Top overlay */}
        <View style={styles.overlayTop} />

        {/* Middle row: left overlay + cutout + right overlay */}
        <View style={styles.middleRow}>
          <View style={styles.overlaySide} />
          <View style={styles.cutout}>
            {/* Corner brackets with glow */}
            <View style={[styles.cornerBracket, styles.topLeftCorner]} />
            <View style={[styles.cornerBracket, styles.topRightCorner]} />
            <View style={[styles.cornerBracket, styles.bottomLeftCorner]} />
            <View style={[styles.cornerBracket, styles.bottomRightCorner]} />
          </View>
          <View style={styles.overlaySide} />
        </View>

        {/* Bottom overlay */}
        <View style={styles.overlayBottom} />
      </View>

      {/* Top controls */}
      <View style={styles.topControls}>
        <BasePressable
          onPress={() => navigation.goBack()}
          pressedOpacity={OPACITY_ON_PRESS_ICON}
          style={styles.topControlBtn}>
          <Icon name="close" size={24} color={colors.white} />
        </BasePressable>

        {/* Receipt Detected pill */}
        <View style={styles.detectedPill}>
          <Animated.View
            style={[styles.pulsingDot, {opacity: pulseAnim}]}
          />
          <Text variant="labelMd" color={colors.white}>
            Receipt Detected
          </Text>
        </View>

        <Row gap={spacing.sm}>
          <BasePressable
            pressedOpacity={OPACITY_ON_PRESS_ICON}
            style={styles.topControlBtn}
            onPress={() => {}}>
            <Icon name="flash-on" size={22} color={colors.white} />
          </BasePressable>
          <BasePressable
            pressedOpacity={OPACITY_ON_PRESS_ICON}
            style={styles.topControlBtn}
            onPress={() => {}}>
            <Icon name="settings" size={22} color={colors.white} />
          </BasePressable>
        </Row>
      </View>

      {/* Instruction toast */}
      <View style={styles.instructionToast}>
        <Text variant="bodySm" color={colors.white} style={styles.instructionText}>
          Align the edges of the receipt within the frame
        </Text>
      </View>

      {/* Bottom controls */}
      <View style={styles.bottomControls}>
        {/* Mode selector */}
        <View style={styles.modeSelector}>
          <Text variant="labelSm" color={colors.white} style={styles.modeText}>
            SINGLE PAGE
          </Text>
        </View>

        <View style={styles.captureRow}>
          {/* Gallery button */}
          <BasePressable
            pressedOpacity={OPACITY_ON_PRESS_ICON}
            style={styles.sideButton}
            onPress={() => {}}>
            <View style={styles.sideButtonIcon}>
              <Icon name="photo-library" size={22} color={colors.white} />
            </View>
            <Text variant="caption" color={colors.white}>
              Gallery
            </Text>
          </BasePressable>

          {/* Capture button */}
          <BasePressable onPress={handleCapture} style={styles.captureOuter}>
            <LinearGradient
              colors={[colors.primary, colors.primaryDim]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.captureInner}
            />
          </BasePressable>

          {/* History button */}
          <BasePressable
            pressedOpacity={OPACITY_ON_PRESS_ICON}
            style={styles.sideButton}
            onPress={() => {}}>
            <View style={styles.sideButtonIcon}>
              <Icon name="history" size={22} color={colors.white} />
            </View>
            <Text variant="caption" color={colors.white}>
              History
            </Text>
          </BasePressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  cameraSimulation: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1a1a1a',
  },
  topProgressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    zIndex: 20,
  },
  topProgressFill: {
    width: '40%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  middleRow: {
    flexDirection: 'row',
    height: CUTOUT_HEIGHT,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  cutout: {
    width: CUTOUT_WIDTH,
    height: CUTOUT_HEIGHT,
    position: 'relative',
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  cornerBracket: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: colors.primary,
  },
  topLeftCorner: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: borderRadius.md,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  topRightCorner: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: borderRadius.md,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  bottomLeftCorner: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: borderRadius.md,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  bottomRightCorner: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: borderRadius.md,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  topControls: {
    position: 'absolute',
    top: 60,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  topControlBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detectedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 64, 224, 0.2)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.sm,
  },
  pulsingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  instructionToast: {
    position: 'absolute',
    bottom: 220,
    left: spacing['3xl'],
    right: spacing['3xl'],
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    zIndex: 10,
  },
  instructionText: {
    textAlign: 'center',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  modeSelector: {
    marginBottom: spacing.xl,
  },
  modeText: {
    letterSpacing: 2,
  },
  captureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: spacing['4xl'],
  },
  captureOuter: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing['4xl'],
  },
  captureInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  sideButton: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  sideButtonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraCaptureScreen;
