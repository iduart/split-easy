import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, spacing, borderRadius} from '../../theme';
import {Text, Icon, Spacer} from '../primitives';

interface OnboardingPageProps {
  icon: string;
  title: string;
  description: string;
  isActive?: boolean;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({
  icon,
  title,
  description,
  isActive = true,
}) => {
  return (
    <View style={[styles.container, !isActive && styles.inactive]}>
      <View style={styles.illustrationArea}>
        <Icon name={icon} size={64} color={colors.primary} />
      </View>
      <Spacer size="3xl" />
      <Text variant="headlineLg" style={styles.title}>
        {title}
      </Text>
      <Spacer size="md" />
      <Text
        variant="bodyLg"
        color={colors.onSurfaceVariant}
        style={styles.description}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing['2xl'],
  },
  inactive: {
    opacity: 0.5,
  },
  illustrationArea: {
    width: '100%',
    aspectRatio: 1.3,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
  },
});
