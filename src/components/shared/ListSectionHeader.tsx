import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {colors} from '../../theme';
import {Text, Row} from '../primitives';

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
        <Pressable onPress={onActionPress}>
          <Text variant="labelLg" color={colors.primary} style={styles.action}>
            {actionLabel}
          </Text>
        </Pressable>
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
