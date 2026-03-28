import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {
  colors,
  spacing,
  borderRadius,
  shadows,
  OPACITY_ON_PRESS_SUBTLE,
} from '../../theme';
import {Text, Icon, BasePressable} from '../primitives';
import type {TabName} from '../../types';

interface BottomNavBarProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}

interface TabConfig {
  key: TabName;
  label: string;
  iconActive: string;
  iconInactive: string;
}

const tabs: TabConfig[] = [
  {key: 'home', label: 'Home', iconActive: 'home', iconInactive: 'home'},
  {key: 'history', label: 'History', iconActive: 'history', iconInactive: 'history'},
  {key: 'account', label: 'Account', iconActive: 'person', iconInactive: 'person-outline'},
];

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.key;
        return (
          <BasePressable
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            pressedOpacity={OPACITY_ON_PRESS_SUBTLE}
            style={styles.tab}>
            <View
              style={[
                styles.iconWrapper,
                {transform: [{scale: isActive ? 1.1 : 1}]},
              ]}>
              <Icon
                name={isActive ? tab.iconActive : tab.iconInactive}
                size={24}
                color={isActive ? colors.primary : colors.onSurfaceVariant}
                style={!isActive ? styles.inactiveIcon : undefined}
              />
            </View>
            <Text
              variant="labelSm"
              color={isActive ? colors.primary : colors.onSurfaceVariant}
              style={[styles.label, !isActive && styles.inactiveLabel]}>
              {tab.label}
            </Text>
          </BasePressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    backgroundColor:
      Platform.OS === 'ios'
        ? 'rgba(255, 255, 255, 0.85)'
        : 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: borderRadius['3xl'],
    borderTopRightRadius: borderRadius['3xl'],
    paddingBottom: spacing.sm,
    alignItems: 'center',
    justifyContent: 'space-around',
    ...shadows.glass,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.sm,
  },
  iconWrapper: {
    marginBottom: spacing.xs,
  },
  inactiveIcon: {
    opacity: 0.6,
  },
  label: {
    letterSpacing: 0.5,
  },
  inactiveLabel: {
    opacity: 0.6,
  },
});
