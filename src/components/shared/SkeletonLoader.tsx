import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {colors, borderRadius as themeBorderRadius} from '../../theme';

interface SkeletonLoaderProps {
  width: number | string;
  height: number | string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width,
  height,
  borderRadius = themeBorderRadius.md,
  style,
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, [shimmerAnim]);

  const backgroundColor = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.surfaceContainerLow, colors.surfaceContainerHigh],
  });

  return (
    <Animated.View
      style={[
        styles.base,
        {
          width: width as any,
          height: height as any,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});
