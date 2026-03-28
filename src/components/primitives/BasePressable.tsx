import React, {forwardRef} from 'react';
import {Pressable, type PressableProps, type View} from 'react-native';
import {
  OPACITY_ON_PRESS_CARD,
  opacityForPressable,
} from '../../theme';

export type BasePressableProps = PressableProps & {
  pressedOpacity?: number;
  disabledOpacity?: number;
};

export const BasePressable = forwardRef<View, BasePressableProps>(
  function BasePressable(
    {
      style,
      disabled,
      pressedOpacity = OPACITY_ON_PRESS_CARD,
      disabledOpacity = 0.5,
      ...rest
    },
    ref,
  ) {
    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        style={state => {
          const feedback = opacityForPressable(
            state.pressed,
            !!disabled,
            pressedOpacity,
            disabledOpacity,
          );
          const resolved =
            typeof style === 'function' ? style(state) : style;
          return [resolved, feedback];
        }}
        {...rest}
      />
    );
  },
);

BasePressable.displayName = 'BasePressable';
