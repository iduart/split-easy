import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, spacing, borderRadius} from '../theme';
import {Screen, Text, Button, Input, Icon, Spacer} from '../components/primitives';
import {Header} from '../components/shared';

export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleSendResetLink = () => {
    // In a real app, dispatch a password reset action here
  };

  const handleBackToSignIn = () => {
    (navigation as any).navigate('SignIn');
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
        <Spacer size="3xl" />

        {/* Lock icon container */}
        <View style={styles.iconContainer}>
          <Icon name="lock-reset" size={32} color={colors.primary} />
        </View>

        <Spacer size="3xl" />

        {/* Headline */}
        <Text variant="headlineLg">
          Recover your{' '}
          <Text variant="headlineLg" color={colors.primary}>
            account
          </Text>
        </Text>
        <Spacer size="md" />
        <Text variant="bodyLg" color={colors.onSurfaceVariant}>
          Enter your email to receive a password reset link
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

        <Spacer size="3xl" />

        {/* Send Reset Link button */}
        <Button
          title="Send Reset Link"
          onPress={handleSendResetLink}
          icon="arrow-forward"
          fullWidth
        />

        <Spacer size="2xl" />

        {/* Back to Sign In link */}
        <Pressable
          onPress={handleBackToSignIn}
          style={({pressed}) => [
            styles.backLink,
            {opacity: pressed ? 0.6 : 1},
          ]}>
          <Icon name="arrow-back" size={18} color={colors.primary} />
          <Text
            variant="labelLg"
            color={colors.primary}
            style={styles.backLinkText}>
            Back to Sign In
          </Text>
        </Pressable>

        <Spacer size="4xl" />

        {/* Help card */}
        <View style={styles.helpCard}>
          <Text variant="titleMd">Need help?</Text>
          <Spacer size="sm" />
          <Text variant="bodyMd" color={colors.onSurfaceVariant}>
            If you're having trouble accessing your account, our support team is
            ready to assist you.
          </Text>
          <Spacer size="lg" />
          <Pressable
            onPress={() => {}}
            style={({pressed}) => [
              styles.supportButton,
              {opacity: pressed ? 0.7 : 1},
            ]}>
            <Text variant="labelMd" color={colors.primary}>
              Contact Support
            </Text>
          </Pressable>
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
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius['2xl'],
    backgroundColor: 'rgba(74, 64, 224, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  backLinkText: {
    marginLeft: spacing.xs,
  },
  helpCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius['3xl'],
    padding: spacing['2xl'],
  },
  supportButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(74, 64, 224, 0.1)',
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

export default ForgotPasswordScreen;
