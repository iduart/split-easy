import React from 'react';
import {View} from 'react-native';
import {spacing} from '../../theme';

type SpacingKey = keyof typeof spacing;

interface SpacerProps {
  size: SpacingKey | number;
  horizontal?: boolean;
}

export const Spacer: React.FC<SpacerProps> = ({size, horizontal = false}) => {
  const value = typeof size === 'number' ? size : spacing[size];

  return (
    <View
      style={
        horizontal
          ? {width: value, height: 1}
          : {height: value, width: 1}
      }
    />
  );
};
