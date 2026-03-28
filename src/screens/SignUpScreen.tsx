import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, spacing} from '../theme';
import {Screen, Text, Button, Input, Spacer, Divider} from '../components/primitives';
import {Header, SocialButtons} from '../components/shared';
import {useAppDispatch} from '../app/store';
import {login} from '../features/auth/authSlice';

export const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    dispatch(login());
    (navigation as any).navigate('MainTabs');
  };

  const handleGoToSignIn = () => {
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
        <Spacer size="2xl" />

        {/* Headline */}
        <Text variant="headlineLg">Create your account</Text>
        <Spacer size="sm" />
        <Text variant="bodyLg" color={colors.onSurfaceVariant}>
          Join SplitEasy and start splitting bills effortlessly
        </Text>

        <Spacer size="3xl" />

        {/* Full Name input */}
        <Input
          label="FULL NAME"
          placeholder="John Doe"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />

        <Spacer size="lg" />

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

        {/* Password input */}
        <Input
          label="PASSWORD"
          placeholder="Create a strong password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Spacer size="3xl" />

        {/* Create Account button */}
        <Button
          title="Create Account"
          onPress={handleCreateAccount}
          icon="arrow-forward"
          fullWidth
        />

        <Spacer size="sm" />

        {/* Divider */}
        <Divider label="Or continue with" />

        <Spacer size="sm" />

        {/* Social buttons */}
        <SocialButtons />

        <Spacer size="3xl" />

        {/* Sign In link */}
        <View style={styles.bottomLink}>
          <Text variant="bodyMd" color={colors.onSurfaceVariant}>
            Already have an account?{' '}
          </Text>
          <Pressable
            onPress={handleGoToSignIn}
            style={({pressed}) => [{opacity: pressed ? 0.6 : 1}]}>
            <Text variant="labelLg" color={colors.primary}>
              Sign In
            </Text>
          </Pressable>
        </View>

        <Spacer size="3xl" />
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
    paddingHorizontal: spacing['2xl'],
  },
  bottomLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignUpScreen;
