import React from 'react';
import {View, ScrollView, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, spacing, borderRadius, shadows} from '../theme';
import {Screen, Text, Icon, Spacer, Row} from '../components/primitives';
import {Header} from '../components/shared';
import {useAppDispatch} from '../app/store';
import {setSourceType} from '../features/scan/scanSlice';

export const GalleryImportScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleConfirm = () => {
    dispatch(setSourceType('gallery'));
    (navigation as any).navigate('ProcessingReceipt');
  };

  return (
    <Screen style={styles.screen}>
      <Header
        showBack
        onBack={() => navigation.goBack()}
        title="Import Receipt"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Subtitle */}
        <Spacer size="sm" />
        <Text variant="bodyMd" color={colors.onSurfaceVariant}>
          Select a clear photo of your receipt to continue
        </Text>

        <Spacer size="2xl" />

        {/* Selected Image Preview */}
        <View style={styles.imagePreview}>
          {/* Simulated receipt content */}
          <View style={styles.previewContent}>
            <View style={styles.previewLine} />
            <Spacer size="lg" />
            <View style={[styles.previewLine, styles.previewLineShort]} />
            <Spacer size="lg" />
            <View style={styles.previewLine} />
            <Spacer size="lg" />
            <View style={[styles.previewLine, styles.previewLineMedium]} />
            <Spacer size="lg" />
            <View style={styles.previewLine} />
            <Spacer size="2xl" />
            <View style={styles.previewDivider} />
            <Spacer size="2xl" />
            <View style={[styles.previewLine, styles.previewLineShort]} />
            <Spacer size="lg" />
            <View style={styles.previewLine} />
          </View>

          {/* Check circle overlay */}
          <View style={styles.checkOverlay}>
            <View style={styles.checkCircle}>
              <Icon name="check-circle" size={48} color={colors.white} />
            </View>
          </View>
        </View>

        <Spacer size="2xl" />

        {/* Thumbnail Grid */}
        <View style={styles.thumbnailGrid}>
          {[0, 1, 2, 3].map(index => (
            <View
              key={index}
              style={[
                styles.thumbnail,
                index === 0 && styles.thumbnailSelected,
              ]}>
              <View style={styles.thumbnailInner} />
            </View>
          ))}
        </View>

        <Spacer size="3xl" />

        {/* Confirm Button */}
        <Pressable
          onPress={handleConfirm}
          style={({pressed}) => [{opacity: pressed ? 0.9 : 1}]}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDim]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.confirmButton}>
            <Text variant="labelLg" color={colors.onPrimary} style={styles.btnLabel}>
              Confirm Selection
            </Text>
          </LinearGradient>
        </Pressable>

        <Spacer size="md" />

        {/* Cancel Button */}
        <Pressable
          onPress={() => navigation.goBack()}
          style={({pressed}) => [
            styles.cancelButton,
            {opacity: pressed ? 0.7 : 1},
          ]}>
          <Text variant="labelLg" color={colors.onSurface} style={styles.btnLabel}>
            Cancel
          </Text>
        </Pressable>

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
    paddingHorizontal: spacing.lg,
  },
  imagePreview: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius['3xl'],
    aspectRatio: 3 / 4,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  previewContent: {
    width: '60%',
    padding: spacing.xl,
  },
  previewLine: {
    height: 8,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 4,
    width: '100%',
  },
  previewLineShort: {
    width: '50%',
  },
  previewLineMedium: {
    width: '75%',
  },
  previewDivider: {
    height: 1,
    backgroundColor: colors.surfaceContainerHighest,
    width: '100%',
  },
  checkOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  thumbnail: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainerHigh,
  },
  thumbnailSelected: {
    borderWidth: 3,
    borderColor: colors.primary,
  },
  thumbnailInner: {
    flex: 1,
    backgroundColor: colors.surfaceContainerHigh,
  },
  confirmButton: {
    height: 56,
    borderRadius: borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.elevated,
  },
  cancelButton: {
    height: 56,
    borderRadius: borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerHigh,
  },
  btnLabel: {
    fontWeight: '700',
  },
});

export default GalleryImportScreen;
