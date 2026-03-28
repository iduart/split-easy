import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, typography, spacing, borderRadius} from '../theme';
import {Screen, Text, ProgressBar, Spacer} from '../components/primitives';

const {width, height} = Dimensions.get('window');

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      (navigation as any).replace('Auth');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Screen style={styles.screen}>
      {/* Decorative blurred circles */}
      <View style={styles.topLeftCircle} />
      <View style={styles.bottomRightCircle} />

      <View style={styles.centerContent}>
        {/* Logo icon */}
        <View style={styles.logoContainer}>
          <View style={styles.logoLine} />
          <View style={styles.logoLineShort} />
          <View style={styles.logoLine} />
          <View style={styles.logoLineShort} />
        </View>

        <Spacer size="3xl" />

        {/* Brand name */}
        <View style={styles.brandRow}>
          <Text variant="displayLg" color={colors.onSurface}>
            Split
          </Text>
          <Text variant="displayLg" color={colors.primary}>
            Easy
          </Text>
        </View>

        <Spacer size="lg" />

        {/* Tagline */}
        <Text variant="labelSm" color={colors.onSurfaceVariant}>
          SIMPLE. SMART. COLLABORATIVE.
        </Text>
      </View>

      {/* Bottom loading section */}
      <View style={styles.bottomSection}>
        <ProgressBar progress={0.4} style={styles.progressBar} />
        <Spacer size="md" />
        <Text variant="bodySm" color={colors.onSurfaceVariant}>
          Synchronizing Ledger
        </Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.surfaceBright,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLeftCircle: {
    position: 'absolute',
    top: -80,
    left: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(74, 64, 224, 0.05)',
  },
  bottomRightCircle: {
    position: 'absolute',
    bottom: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(98, 73, 178, 0.05)',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  logoLine: {
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(244, 241, 255, 0.7)',
  },
  logoLineShort: {
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(244, 241, 255, 0.4)',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: spacing['4xl'],
    paddingHorizontal: spacing['6xl'],
    width: '100%',
  },
  progressBar: {
    width: 200,
  },
});

export default SplashScreen;
