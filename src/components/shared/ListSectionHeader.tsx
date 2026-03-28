import React from 'react';
import {StyleSheet} from 'react-native';
import {colors, OPACITY_ON_PRESS_ICON} from '../../theme';
import {Text, Row, BasePressable} from '../primitives';

export interface ListSectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

/** Title row with optional trailing text action (e.g. “Recent Bills” + “View History”). */
export const ListSectionHeader: React.FC<ListSectionHeaderProps> = ({
  title,
  actionLabel,
  onActionPress,
}) => {
  return (
    <Row align="center" justify="space-between">
      <Text variant="titleLg" style={styles.title}>
        {title}
      </Text>
      {actionLabel != null && onActionPress != null ? (
        <BasePressable onPress={onActionPress} pressedOpacity={OPACITY_ON_PRESS_ICON}>
          <Text variant="labelLg" color={colors.primary} style={styles.action}>
            {actionLabel}
          </Text>
        </BasePressable>
      ) : null}
    </Row>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
  },
  action: {
    fontWeight: '600',
  },
});
