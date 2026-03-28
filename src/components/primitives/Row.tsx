import React from 'react';
import {View, ViewStyle, StyleProp, FlexAlignType} from 'react-native';

interface RowProps {
  children: React.ReactNode;
  align?: FlexAlignType;
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  gap?: number;
  style?: StyleProp<ViewStyle>;
}

export const Row: React.FC<RowProps> = ({
  children,
  align = 'center',
  justify = 'flex-start',
  gap,
  style,
}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row' as const,
          alignItems: align,
          justifyContent: justify,
          gap,
        },
        style,
      ]}>
      {children}
    </View>
  );
};
