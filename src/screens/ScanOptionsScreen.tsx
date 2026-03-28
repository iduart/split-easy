import React from 'react';
import {View, ScrollView, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, spacing, borderRadius, shadows} from '../theme';
import {Screen, Text, Icon, Spacer, Row} from '../components/primitives';
import {Header} from '../components/shared';

export const ScanOptionsScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Screen style={styles.screen}>
      <Header
        showBack
        onBack={() => navigation.goBack()}
        title="Scan Options"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Headline */}
        <Spacer size="2xl" />
        <View style={styles.centered}>
          <Text variant="headlineLg">Add Receipt</Text>
          <Spacer size="sm" />
          <Text
            variant="bodyMd"
            color={colors.onSurfaceVariant}
            style={styles.centeredText}>
            Position the receipt clearly for best results
          </Text>
        </View>

        <Spacer size="3xl" />

        {/* Receipt Guide Visual */}
        <View style={styles.receiptGuide}>
          {/* Corner brackets */}
          <View style={[styles.cornerBracket, styles.topLeft]} />
          <View style={[styles.cornerBracket, styles.topRight]} />
          <View style={[styles.cornerBracket, styles.bottomLeft]} />
          <View style={[styles.cornerBracket, styles.bottomRight]} />

          {/* Abstract receipt shape */}
          <View style={styles.receiptShape}>
            <View style={styles.receiptLine} />
            <Spacer size="md" />
            <View style={[styles.receiptLine, styles.receiptLineShort]} />
            <Spacer size="md" />
            <View style={styles.receiptLine} />
            <Spacer size="md" />
            <View style={[styles.receiptLine, styles.receiptLineMedium]} />
            <Spacer size="md" />
            <View style={styles.receiptLine} />
            <Spacer size="lg" />
            <View style={styles.receiptDivider} />
            <Spacer size="lg" />
            <View style={[styles.receiptLine, styles.receiptLineShort]} />
          </View>
        </View>

        <Spacer size="2xl" />

        {/* Hint Card */}
        <View style={styles.hintCard}>
          <Row align="flex-start" gap={spacing.md}>
            <Icon name="lightbulb" size={20} color={colors.primary} />
            <Text
              variant="bodySm"
              color={colors.onSurfaceVariant}
              style={styles.hintText}>
              For best results, avoid blurry images and ensure all edges of the
              receipt are visible within the frame.
            </Text>
          </Row>
        </View>

        <Spacer size="2xl" />

        {/* Take Photo Button */}
        <Pressable
          onPress={() => (navigation as any).navigate('CameraCapture')}
          style={({pressed}) => [
            styles.actionRow,
            {opacity: pressed ? 0.9 : 1},
          ]}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDim]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.actionRowGradient}>
            <Row align="center" gap={spacing.lg} style={styles.actionRowContent}>
              <View style={styles.actionIconCircleWhite}>
                <Icon name="photo-camera" size={24} color={colors.primary} />
              </View>
              <View style={styles.actionTextSection}>
                <Text variant="titleMd" color={colors.onPrimary}>
                  Take Photo
                </Text>
                <Text
                  variant="bodySm"
                  color={colors.onPrimary}
                  style={styles.actionSubtitle}>
                  Use your camera to capture the receipt
                </Text>
              </View>
              <Icon name="chevron-right" size={24} color={colors.onPrimary} />
            </Row>
          </LinearGradient>
        </Pressable>

        <Spacer size="md" />

        {/* Upload from Gallery Button */}
        <Pressable
          onPress={() => (navigation as any).navigate('GalleryImport')}
          style={({pressed}) => [
            styles.actionRowDefault,
            {opacity: pressed ? 0.9 : 1},
          ]}>
          <Row align="center" gap={spacing.lg} style={styles.actionRowContent}>
            <View style={styles.actionIconCircleSecondary}>
              <Icon name="photo-library" size={24} color={colors.secondary} />
            </View>
            <View style={styles.actionTextSection}>
              <Text variant="titleMd">Upload from Gallery</Text>
              <Text variant="bodySm" color={colors.onSurfaceVariant}>
                Select an existing photo from your device
              </Text>
            </View>
            <Icon
              name="chevron-right"
              size={24}
              color={colors.onSurfaceVariant}
            />
          </Row>
        </Pressable>

        <Spacer size="5xl" />

        {/* Footer Brand */}
        <View style={styles.footerBrand}>
          <Text variant="bodySm" color={colors.onSurfaceVariant}>
            SplitEasy
          </Text>
        </View>
        <Spacer size="2xl" />
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
  centered: {
    alignItems: 'center',
  },
  centeredText: {
    textAlign: 'center',
  },
  receiptGuide: {
    height: 256,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius['2xl'],
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cornerBracket: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: colors.primary,
  },
  topLeft: {
    top: 16,
    left: 16,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: borderRadius.md,
  },
  topRight: {
    top: 16,
    right: 16,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: borderRadius.md,
  },
  bottomLeft: {
    bottom: 16,
    left: 16,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: borderRadius.md,
  },
  bottomRight: {
    bottom: 16,
    right: 16,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: borderRadius.md,
  },
  receiptShape: {
    width: 120,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    ...shadows.card,
  },
  receiptLine: {
    height: 6,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 3,
    width: '100%',
  },
  receiptLineShort: {
    width: '60%',
  },
  receiptLineMedium: {
    width: '80%',
  },
  receiptDivider: {
    height: 1,
    backgroundColor: colors.surfaceContainerHighest,
    width: '100%',
  },
  hintCard: {
    backgroundColor: 'rgba(74, 64, 224, 0.05)',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  hintText: {
    flex: 1,
  },
  actionRow: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.elevated,
  },
  actionRowGradient: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  actionRowDefault: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    ...shadows.card,
  },
  actionRowContent: {
    flex: 1,
  },
  actionIconCircleWhite: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceContainerLowest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIconCircleSecondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTextSection: {
    flex: 1,
  },
  actionSubtitle: {
    opacity: 0.85,
    marginTop: 2,
  },
  footerBrand: {
    alignItems: 'center',
  },
});

export default ScanOptionsScreen;
