import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {colors, spacing, borderRadius, OPACITY_ON_PRESS_SUBTLE} from '../../theme';
import {Text, BasePressable} from '../primitives';

interface FilterChipsProps {
  filters: string[];
  activeFilter: string;
  onFilterPress: (filter: string) => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  filters,
  activeFilter,
  onFilterPress,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}>
      {filters.map(filter => {
        const isActive = filter === activeFilter;
        return (
          <BasePressable
            key={filter}
            onPress={() => onFilterPress(filter)}
            pressedOpacity={OPACITY_ON_PRESS_SUBTLE}
            style={[
              styles.chip,
              isActive ? styles.activeChip : styles.inactiveChip,
            ]}>
            <Text
              variant="labelMd"
              color={isActive ? colors.onSurface : colors.onSurfaceVariant}
              style={styles.chipText}>
              {filter}
            </Text>
          </BasePressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  activeChip: {
    backgroundColor: colors.surfaceContainerHighest,
  },
  inactiveChip: {
    backgroundColor: colors.surfaceContainerLow,
  },
  chipText: {
    fontWeight: '700',
  },
});
