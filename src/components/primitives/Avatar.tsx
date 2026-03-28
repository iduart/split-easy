import React from 'react';
import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {colors} from '../../theme';
import {Text} from './Text';

type ParticipantColorKey =
  | 'blue'
  | 'green'
  | 'pink'
  | 'indigo'
  | 'orange'
  | 'teal'
  | 'purple'
  | 'amber';

interface AvatarProps {
  initial: string;
  size?: number;
  colorKey: ParticipantColorKey;
  style?: StyleProp<ViewStyle>;
}

export const Avatar: React.FC<AvatarProps> = ({
  initial,
  size = 40,
  colorKey,
  style,
}) => {
  const participantColor = colors.participant[colorKey];
  const fontSize = size * 0.4;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: participantColor.bg,
        },
        style,
      ]}>
      <Text
        variant="labelLg"
        color={participantColor.base}
        style={{fontSize, lineHeight: fontSize * 1.2}}>
        {initial.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
