import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../theme';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = colors.onSurface,
  style,
}) => {
  return <MaterialIcons name={name} size={size} color={color} style={style} />;
};
