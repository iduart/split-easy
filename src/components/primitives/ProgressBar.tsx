import React from 'react';
import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {colors, borderRadius} from '../../theme';

interface ProgressBarProps {
  progress: number; // 0 to 1
  variant?: 'linear' | 'circular';
  size?: number; // for circular variant
  style?: StyleProp<ViewStyle>;
}

const LinearProgress: React.FC<{progress: number; style?: StyleProp<ViewStyle>}> = ({
  progress,
  style,
}) => {
  const clampedProgress = Math.min(1, Math.max(0, progress));

  return (
    <View style={[styles.linearTrack, style]}>
      <View
        style={[
          styles.linearFill,
          {width: `${clampedProgress * 100}%`},
        ]}
      />
    </View>
  );
};

const CircularProgress: React.FC<{progress: number; size: number}> = ({
  progress,
  size,
}) => {
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - clampedProgress);

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={colors.surfaceContainerHigh}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={colors.primary}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        rotation={-90}
        origin={`${size / 2}, ${size / 2}`}
      />
    </Svg>
  );
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = 'linear',
  size = 48,
  style,
}) => {
  if (variant === 'circular') {
    return (
      <View style={style}>
        <CircularProgress progress={progress} size={size} />
      </View>
    );
  }

  return <LinearProgress progress={progress} style={style} />;
};

const styles = StyleSheet.create({
  linearTrack: {
    height: 6,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceContainerHigh,
    overflow: 'hidden',
  },
  linearFill: {
    height: '100%',
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
  },
});
