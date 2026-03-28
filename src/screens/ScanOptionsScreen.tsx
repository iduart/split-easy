import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, spacing, borderRadius, shadows} from '../theme';
import {Screen, Text, Icon, Spacer, Row, BasePressable} from '../components/primitives';
import {Header, GradientFill} from '../components/shared';

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
            Position the receipt clearly for the best result.
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
            <Text variant="bodySm" style={styles.hintText}>
              <Text style={styles.hintLead}>Hint:</Text>
              {' '}
              Avoid blurry images and shadows for faster extraction. Good
              lighting ensures 99% accuracy.
            </Text>
          </Row>
        </View>

        <Spacer size="2xl" />

        {/* Take Photo Button — content in a normal View; gradient is behind via GradientFill (avoids RN LinearGradient flex clipping) */}
        <BasePressable
          onPress={() => (navigation as any).navigate('CameraCapture')}
          style={styles.actionRow}>
          <GradientFill
            colors={[colors.primary, colors.primaryDim]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.takePhotoGradientShell}>
            <View style={styles.actionButtonInner}>
              <View style={styles.actionButtonLeft}>
                <View style={styles.actionIconCircleGlass}>
                  <Icon name="photo-camera" size={24} color={colors.white} />
                </View>
                <View style={styles.actionTextSection}>
                  <Text variant="titleLg" color={colors.onPrimary}>
                    Take Photo
                  </Text>
                  <Text
                    variant="bodySm"
                    style={styles.takePhotoSubtitle}>
                    Snap a clear picture now
                  </Text>
                </View>
              </View>
              <Icon
                name="chevron-right"
                size={24}
                color="rgba(255, 255, 255, 0.5)"
              />
            </View>
          </GradientFill>
        </BasePressable>

        <Spacer size="md" />

        {/* Upload from Gallery Button */}
        <BasePressable
          onPress={() => (navigation as any).navigate('GalleryImport')}
          style={styles.actionRowDefault}>
          <View style={styles.actionButtonInner}>
            <View style={styles.actionButtonLeft}>
              <View style={styles.actionIconCircleSecondary}>
                <Icon name="photo-library" size={24} color={colors.secondary} />
              </View>
              <View style={styles.actionTextSection}>
                <Text variant="titleLg">Upload from Gallery</Text>
                <Text
                  variant="bodySm"
                  color={colors.onSurfaceVariant}
                  style={styles.gallerySubtitle}>
                  Choose an existing image
                </Text>
              </View>
            </View>
            <Icon
              name="chevron-right"
              size={24}
              color={colors.outlineVariant}
            />
          </View>
        </BasePressable>
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
    backgroundColor: 'rgba(20, 0, 126, 0.05)',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(74, 64, 224, 0.1)',
  },
  hintText: {
    flex: 1,
    color: colors.onSurfaceVariant,
  },
  hintLead: {
    fontWeight: '700',
    color: colors.primary,
  },
  actionRow: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.elevated,
  },
  takePhotoGradientShell: {
    borderRadius: borderRadius.xl,
  },
  actionButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing['2xl'],
    width: '100%',
  },
  actionButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    flex: 1,
    minWidth: 0,
    marginRight: spacing.md,
  },
  actionRowDefault: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(171, 173, 174, 0.1)',
    ...shadows.card,
  },
  actionIconCircleGlass: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
    minWidth: 0,
  },
  takePhotoSubtitle: {
    marginTop: 2,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  gallerySubtitle: {
    marginTop: 2,
  },
});

export default ScanOptionsScreen;
