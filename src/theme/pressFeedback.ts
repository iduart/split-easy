import type {ViewStyle} from 'react-native';

/** Scan cards, primary action rows, prominent CTAs */
export const OPACITY_ON_PRESS_CARD = 0.9;

/** Filled primary surfaces, list rows */
export const OPACITY_ON_PRESS_SURFACE = 0.85;

/** Secondary buttons, chips */
export const OPACITY_ON_PRESS_SUBTLE = 0.7;

/** Text links, header icon targets, low-emphasis taps */
export const OPACITY_ON_PRESS_ICON = 0.6;

/** Compact CTAs on busy / gradient backgrounds */
export const OPACITY_ON_PRESS_PROMO = 0.8;

export function opacityOnPress(
  pressed: boolean,
  whenPressed: number = OPACITY_ON_PRESS_CARD,
): Pick<ViewStyle, 'opacity'> {
  return {opacity: pressed ? whenPressed : 1};
}

export function opacityForPressable(
  pressed: boolean,
  disabled: boolean,
  whenPressed: number,
  whenDisabled = 0.5,
): Pick<ViewStyle, 'opacity'> {
  if (disabled) {
    return {opacity: whenDisabled};
  }
  return opacityOnPress(pressed, whenPressed);
}
