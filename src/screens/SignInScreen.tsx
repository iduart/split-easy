import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, spacing, borderRadius, OPACITY_ON_PRESS_ICON} from '../theme';
import {
  Screen,
  Text,
  Button,
  Input,
  Spacer,
  Divider,
  BasePressable,
} from '../components/primitives';
import {Header, SocialButtons} from '../components/shared';
import {useAppDispatch} from '../app/store';
import {login} from '../features/auth/authSlice';

export const SignInScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    dispatch(login());
    (navigation as any).navigate('MainTabs');
  };

  const handleForgotPassword = () => {
    (navigation as any).navigate('ForgotPassword');
  };

  const handleGoToSignUp = () => {
    (navigation as any).navigate('SignUp');
  };

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
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Spacer size="2xl" />

        {/* Headline */}
        <Text variant="headlineLg">Welcome back</Text>
        <Spacer size="sm" />
        <Text variant="bodyLg" color={colors.onSurfaceVariant}>
          Sign in to continue splitting bills with your friends
        </Text>

        <Spacer size="3xl" />

        {/* Email input */}
        <Input
          label="EMAIL"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Spacer size="lg" />

        {/* Forgot password link */}
        <View style={styles.forgotRow}>
          <BasePressable
            onPress={handleForgotPassword}
            pressedOpacity={OPACITY_ON_PRESS_ICON}>
            <Text variant="labelMd" color={colors.primary}>
              Forgot Password?
            </Text>
          </BasePressable>
        </View>

        <Spacer size="xs" />

        {/* Password input */}
        <Input
          label="PASSWORD"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Spacer size="3xl" />

        {/* Sign In button */}
        <Button
          title="Sign In"
          onPress={handleSignIn}
          fullWidth
        />

        <Spacer size="sm" />

        {/* Divider */}
        <Divider label="Or continue with" />

        <Spacer size="sm" />

        {/* Social buttons */}
        <SocialButtons />

        <Spacer size="3xl" />

        {/* Sign Up link */}
        <View style={styles.bottomLink}>
          <Text variant="bodyMd" color={colors.onSurfaceVariant}>
            Don't have an account?{' '}
          </Text>
          <BasePressable
            onPress={handleGoToSignUp}
            pressedOpacity={OPACITY_ON_PRESS_ICON}>
            <Text variant="labelLg" color={colors.primary}>
              Sign Up
            </Text>
          </BasePressable>
        </View>

        <Spacer size="3xl" />
      </ScrollView>

      {/* Decorative blur circles */}
      <View style={styles.bottomLeftCircle} pointerEvents="none" />
      <View style={styles.bottomRightCircle} pointerEvents="none" />
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
    paddingHorizontal: spacing['2xl'],
  },
  forgotRow: {
    alignItems: 'flex-end',
    marginBottom: spacing.xs,
  },
  bottomLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomLeftCircle: {
    position: 'absolute',
    bottom: -40,
    left: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(74, 64, 224, 0.05)',
  },
  bottomRightCircle: {
    position: 'absolute',
    bottom: -20,
    right: -80,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(98, 73, 178, 0.05)',
  },
});

export default SignInScreen;
