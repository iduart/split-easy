import React from 'react';
import {ScrollView, Pressable, StyleSheet} from 'react-native';
import {colors, spacing, borderRadius} from '../../theme';
import {Text} from '../primitives';

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
          <Pressable
            key={filter}
            onPress={() => onFilterPress(filter)}
            style={({pressed}) => [
              styles.chip,
              isActive ? styles.activeChip : styles.inactiveChip,
              {opacity: pressed ? 0.7 : 1},
            ]}>
            <Text
              variant="labelMd"
              color={isActive ? colors.onSurface : colors.onSurfaceVariant}
              style={styles.chipText}>
              {filter}
            </Text>
          </Pressable>
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
