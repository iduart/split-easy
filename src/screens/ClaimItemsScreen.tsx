import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, spacing, borderRadius, shadows, OPACITY_ON_PRESS_ICON} from '../theme';
import {
  Screen,
  Text,
  Button,
  Icon,
  Spacer,
  Avatar,
  Row,
  BasePressable,
} from '../components/primitives';
import {
  Header,
  BillItemRow,
  ParticipantChip,
  FilterChips,
  GlassFooter,
} from '../components/shared';
import {useAppDispatch, useAppSelector} from '../app/store';
import {setActiveBill} from '../features/bills/billsSlice';
import {setClaimFilter, setSelectedParticipant} from '../features/ui/uiSlice';
import {mockActiveBill, mockParticipants} from '../data/mock';
import type {BillItem, ClaimFilter} from '../types';

const FILTERS = ['All', 'Unclaimed', 'Claimed', 'Shared', 'Mine'];

export const ClaimItemsScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const activeBill = useAppSelector(state => state.bills.activeBill);
  const claimFilter = useAppSelector(state => state.ui.claimFilter);
  const selectedParticipantId = useAppSelector(
    state => state.ui.selectedParticipantId,
  );
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(setActiveBill(mockActiveBill));
    dispatch(setSelectedParticipant('user-1'));
  }, [dispatch]);

  const bill = activeBill ?? mockActiveBill;

  const filteredItems = bill.items.filter(item => {
    const filterLower = claimFilter.toLowerCase() as ClaimFilter;
    switch (filterLower) {
      case 'unclaimed':
        return item.claimedBy.length === 0;
      case 'claimed':
        return item.claimedBy.length > 0;
      case 'shared':
        return item.splitType === 'shared';
      case 'mine':
        return item.claimedBy.includes('user-1');
      default:
        return true;
    }
  });

  const selectedItem = bill.items.find(i => i.id === selectedItemId);

  const handleFilterPress = (filter: string) => {
    dispatch(setClaimFilter(filter.toLowerCase() as ClaimFilter));
  };

  const renderItem = ({item}: {item: BillItem}) => (
    <BillItemRow
      item={item}
      participants={bill.participants}
      isSelected={item.id === selectedItemId}
      onClaim={() => setSelectedItemId(item.id)}
      onAssign={() => setSelectedItemId(item.id)}
    />
  );

  return (
    <Screen style={styles.screen} edges={['top']}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Row align="center" gap={spacing.sm}>
          <BasePressable
            onPress={() => navigation.goBack()}
            pressedOpacity={OPACITY_ON_PRESS_ICON}
            style={styles.backBtn}>
            <Icon name="arrow-back" size={24} color={colors.primary} />
          </BasePressable>
          <View style={styles.headerTitleSection}>
            <Text variant="titleMd" numberOfLines={1}>
              {bill.restaurantName}
            </Text>
            <Text variant="bodySm" color={colors.onSurfaceVariant}>
              Step {bill.step} of {bill.totalSteps}
            </Text>
          </View>
        </Row>
        <View style={styles.headerRight}>
          <Text variant="titleSm" color={colors.primary}>
            ${bill.totalAmount.toFixed(2)}
          </Text>
          <Text variant="caption" color={colors.onSurfaceVariant}>
            {bill.items.length} items
          </Text>
        </View>
      </View>

      {/* Participant Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.participantScroll}>
        {mockParticipants.map(p => (
          <ParticipantChip
            key={p.id}
            participant={p}
            isActive={selectedParticipantId === p.id}
            onPress={() => dispatch(setSelectedParticipant(p.id))}
          />
        ))}
        <ParticipantChip isAddButton onPress={() => {}} />
      </ScrollView>

      <Spacer size="sm" />

      {/* Filter Chips */}
      <FilterChips
        filters={FILTERS}
        activeFilter={
          FILTERS.find(f => f.toLowerCase() === claimFilter) ?? 'All'
        }
        onFilterPress={handleFilterPress}
      />

      <Spacer size="md" />

      {/* Item List */}
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />

      {/* Bottom Sheet (Peek) */}
      {selectedItem && (
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetHandle} />
          <Spacer size="md" />

          <Row align="center" justify="space-between">
            <Text variant="titleMd">{selectedItem.name}</Text>
            <Text variant="titleSm" color={colors.primary}>
              ${selectedItem.totalPrice.toFixed(2)}
            </Text>
          </Row>

          <Spacer size="lg" />

          {/* Quantity stepper */}
          <Row align="center" gap={spacing.lg}>
            <Text variant="labelMd" color={colors.onSurfaceVariant}>
              Qty:
            </Text>
            <Row align="center" gap={spacing.md}>
              <BasePressable
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                pressedOpacity={OPACITY_ON_PRESS_ICON}
                style={styles.stepperBtn}>
                <Icon name="remove" size={18} color={colors.onSurface} />
              </BasePressable>
              <Text variant="titleMd" style={styles.quantityText}>
                {quantity}
              </Text>
              <BasePressable
                onPress={() => setQuantity(quantity + 1)}
                pressedOpacity={OPACITY_ON_PRESS_ICON}
                style={styles.stepperBtn}>
                <Icon name="add" size={18} color={colors.onSurface} />
              </BasePressable>
            </Row>
          </Row>

          <Spacer size="lg" />

          {/* Split with participants */}
          <Text variant="labelMd" color={colors.onSurfaceVariant}>
            Split with:
          </Text>
          <Spacer size="sm" />
          <Row gap={spacing.sm}>
            {mockParticipants.map(p => (
              <BasePressable
                key={p.id}
                style={[
                  styles.splitParticipantBtn,
                  selectedItem.claimedBy.includes(p.id) &&
                    styles.splitParticipantBtnActive,
                ]}>
                <Avatar
                  initial={p.initial}
                  size={32}
                  colorKey={p.colorKey}
                />
                <Text variant="caption">{p.name}</Text>
              </BasePressable>
            ))}
          </Row>

          <Spacer size="lg" />

          <Row gap={spacing.md}>
            <Button
              title="Split Equally"
              onPress={() => {}}
              variant="secondary"
              style={styles.sheetBtnFlex}
            />
            <Button
              title="Save Selection"
              onPress={() => setSelectedItemId(null)}
              style={styles.sheetBtnFlex}
            />
          </Row>
        </View>
      )}

      {/* Sticky Glass Footer */}
      <View style={styles.glassFooter}>
        <Row align="center" justify="space-between">
          <View>
            <Text variant="bodySm" color={colors.onSurfaceVariant}>
              My Share: $26.50
            </Text>
            <Text variant="caption" color={colors.onSurfaceVariant}>
              Est. Tax/Tip: +$5.30
            </Text>
          </View>
          <Text variant="headlineSm" color={colors.primary}>
            $31.80
          </Text>
        </Row>
        <Text
          variant="bodySm"
          color={colors.onSurfaceVariant}
          style={styles.totalLabel}>
          Your total
        </Text>
        <Spacer size="md" />
        <BasePressable
          onPress={() => (navigation as any).navigate('PerPersonTotals')}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDim]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.continueBtn}>
            <Text
              variant="labelLg"
              color={colors.onPrimary}
              style={styles.continueBtnLabel}>
              Continue
            </Text>
          </LinearGradient>
        </BasePressable>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.surface,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleSection: {
    flex: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  participantScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  bottomSheet: {
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    padding: spacing.lg,
    ...shadows.glass,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceContainerHighest,
    alignSelf: 'center',
  },
  stepperBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    minWidth: 24,
    textAlign: 'center',
  },
  splitParticipantBtn: {
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceContainerLow,
    gap: spacing.xs,
    minWidth: 64,
  },
  splitParticipantBtnActive: {
    backgroundColor: 'rgba(74, 64, 224, 0.1)',
  },
  sheetBtnFlex: {
    flex: 1,
  },
  glassFooter: {
    backgroundColor:
      Platform.OS === 'ios'
        ? 'rgba(255, 255, 255, 0.85)'
        : 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing['3xl'],
    ...shadows.glass,
  },
  totalLabel: {
    textAlign: 'right',
    marginTop: 2,
  },
  continueBtn: {
    height: 56,
    borderRadius: borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.elevated,
  },
  continueBtnLabel: {
    fontWeight: '700',
  },
});

export default ClaimItemsScreen;
