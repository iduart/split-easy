import React from 'react';
import {StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {SafeAreaView, Edge} from 'react-native-safe-area-context';
import {colors} from '../../theme';

interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Edge[];
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  style,
  edges = ['top', 'bottom'],
}) => {
  return (
    <SafeAreaView edges={edges} style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
});
