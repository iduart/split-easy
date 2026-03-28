import React from 'react';
import {View, StyleSheet, type StyleProp, type ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export type GradientFillProps = {
  colors: (string | number)[];
  start?: {x: number; y: number};
  end?: {x: number; y: number};
  locations?: number[] | null;
  /** Clipping shell (e.g. borderRadius, width, height). `overflow: 'hidden'` is applied by default. */
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

/**
 * Paints a linear gradient behind `children` using a normal `View` shell for layout.
 * `react-native-linear-gradient` is a native view that often mis-handles flex and percentage
 * width when used as the layout parent — keep the gradient on `absoluteFill` and lay out content
 * in sibling views instead.
 */
export const GradientFill: React.FC<GradientFillProps> = ({
  colors: gradientColors,
  start = {x: 0, y: 0},
  end = {x: 1, y: 1},
  locations,
  style,
  children,
}) => {
  return (
    <View style={[styles.clip, style]}>
      <LinearGradient
        colors={gradientColors}
        start={start}
        end={end}
        locations={locations ?? undefined}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  clip: {
    overflow: 'hidden',
  },
});
