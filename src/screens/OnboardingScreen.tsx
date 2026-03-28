import React, {useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, spacing, borderRadius, OPACITY_ON_PRESS_ICON} from '../theme';
import {Screen, Text, Button, Spacer, BasePressable} from '../components/primitives';
import {OnboardingPage} from '../components/shared';
import {useAppDispatch, useAppSelector} from '../app/store';
import {login} from '../features/auth/authSlice';
import {setOnboardingStep} from '../features/ui/uiSlice';
import {onboardingPages} from '../data/mock';

const {width} = Dimensions.get('window');

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const onboardingStep = useAppSelector(state => state.ui.onboardingStep);
  const flatListRef = useRef<FlatList>(null);

  const handleSkip = useCallback(() => {
    (navigation as any).navigate('SignIn');
  }, [navigation]);

  const handleGetStarted = useCallback(() => {
    (navigation as any).navigate('SignIn');
  }, [navigation]);

  const handleContinueAsGuest = useCallback(() => {
    dispatch(login());
    (navigation as any).replace('MainTabs');
  }, [dispatch, navigation]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const pageIndex = Math.round(offsetX / width);
      if (pageIndex !== onboardingStep) {
        dispatch(setOnboardingStep(pageIndex));
      }
    },
    [dispatch, onboardingStep],
  );

  const renderPage = useCallback(
    ({item, index}: {item: (typeof onboardingPages)[0]; index: number}) => (
      <View style={styles.pageContainer}>
        <OnboardingPage
          icon={item.icon}
          title={item.title}
          description={item.description}
          isActive={index === onboardingStep}
        />
      </View>
    ),
    [onboardingStep],
  );

  return (
    <Screen style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="titleLg" color={colors.primary} style={styles.brandText}>
          SplitEasy
        </Text>
        <BasePressable onPress={handleSkip} pressedOpacity={OPACITY_ON_PRESS_ICON}>
          <Text variant="labelLg" color={colors.onSurfaceVariant}>
            Skip
          </Text>
        </BasePressable>
      </View>

      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={onboardingPages}
        renderItem={renderPage}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(_, index) => String(index)}
        style={styles.carousel}
        contentContainerStyle={styles.carouselContent}
      />

      {/* Pagination dots */}
      <View style={styles.dotsContainer}>
        {onboardingPages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === onboardingStep ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>

      <Spacer size="3xl" />

      {/* Bottom buttons */}
      <View style={styles.bottomSection}>
        <Button
          title="Get Started"
          onPress={handleGetStarted}
          fullWidth
        />
        <Spacer size="lg" />
        <BasePressable
          onPress={handleContinueAsGuest}
          pressedOpacity={OPACITY_ON_PRESS_ICON}
          style={styles.guestButton}>
          <Text variant="labelLg" color={colors.onSurfaceVariant}>
            Continue as Guest
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    height: 56,
  },
  brandText: {
    fontWeight: '800',
  },
  carousel: {
    flex: 1,
  },
  carouselContent: {
    alignItems: 'center',
  },
  pageContainer: {
    width,
    justifyContent: 'center',
    paddingTop: spacing['3xl'],
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: {
    height: 8,
    borderRadius: borderRadius.full,
  },
  dotActive: {
    width: 32,
    backgroundColor: colors.primary,
  },
  dotInactive: {
    width: 8,
    backgroundColor: colors.surfaceContainerHigh,
  },
  bottomSection: {
    paddingHorizontal: spacing['2xl'],
    paddingBottom: spacing['3xl'],
  },
  guestButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
});

export default OnboardingScreen;
