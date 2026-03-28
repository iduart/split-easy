import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {colors, spacing, borderRadius, shadows, OPACITY_ON_PRESS_ICON, OPACITY_ON_PRESS_SUBTLE} from '../theme';
import {
  Screen,
  Text,
  Icon,
  Spacer,
  Avatar,
  Row,
  BasePressable,
} from '../components/primitives';
import {
  BillItemRow,
  ParticipantChip,
  FilterChips,
} from '../components/shared';
import {useAppDispatch, useAppSelector} from '../app/store';
import {setActiveBill, claimItem, unclaimItem} from '../features/bills/billsSlice';
import {setClaimFilter, setSelectedParticipant} from '../features/ui/uiSlice';
import {mockParticipants} from '../data/mock';
import type {ActiveBill, BillItem, ClaimFilter} from '../types';
import type {ReceiptResponse} from '../services/scanBillApi.types';

const FILTERS = ['All', 'Unclaimed', 'Claimed', 'Shared', 'Mine'];

/** Convert a scanned ReceiptResponse into the ActiveBill shape used by the claiming UI. */
function receiptToActiveBill(receipt: ReceiptResponse): ActiveBill {
  const items: BillItem[] = receipt.lineItems.map(li => ({
    id: li.id,
    name: li.description,
    quantity: li.quantity,
    unitPrice: li.unitPrice / 100, // cents → dollars
    totalPrice: li.totalPrice / 100,
    claimedBy: [],
    splitType: 'unclaimed',
  }));

  return {
    id: receipt.id,
    restaurantName: receipt.merchantName ?? 'Scanned Receipt',
    totalAmount: (receipt.totalAmount ?? 0) / 100,
    currency: receipt.currency,
    items,
    participants: mockParticipants, // default participants until user adds their own
    taxRate: receipt.subtotal
      ? ((receipt.taxTotal ?? 0) / receipt.subtotal) * 100
      : 0,
    tipAmount: (receipt.tipAmount ?? 0) / 100,
    step: 2,
    totalSteps: 3,
  };
}

export const ClaimItemsScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const activeBill = useAppSelector(state => state.bills.activeBill);
  const scanReceipt = useAppSelector(state => state.scan.receipt);
  const claimFilter = useAppSelector(state => state.ui.claimFilter);
  const selectedParticipantId = useAppSelector(
    state => state.ui.selectedParticipantId,
  );
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    if (scanReceipt) {
      dispatch(setActiveBill(receiptToActiveBill(scanReceipt)));
    }
    dispatch(setSelectedParticipant('user-1'));
  }, [dispatch, scanReceipt]);

  if (!activeBill) {
    return (
      <Screen style={styles.screen}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text variant="bodyMd" color={colors.onSurfaceVariant}>
            No receipt data available.
          </Text>
        </View>
      </Screen>
    );
  }

  const bill = activeBill;

  const filteredItems = bill.items.filter(item => {
    const filterLower = claimFilter.toLowerCase() as ClaimFilter;
    switch (filterLower) {
      case 'unclaimed':
        return item.claimedBy.length < item.quantity; // includes partially claimed
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

  // Compute dynamic totals for the selected participant
  const activeParticipantId = selectedParticipantId ?? 'user-1';
  const activeParticipant = bill.participants.find(p => p.id === activeParticipantId);
  const isMe = activeParticipantId === 'user-1';
  const shareLabel = isMe ? 'My Share' : `${activeParticipant?.name ?? 'Their'}'s Share`;

  const participantShare = bill.items.reduce((sum, item) => {
    const claimCount = item.claimedBy.filter(id => id === activeParticipantId).length;
    if (claimCount === 0) return sum;
    const pricePerUnit = item.totalPrice / item.quantity;
    return sum + pricePerUnit * claimCount;
  }, 0);

  const taxTipEstimate = participantShare * (bill.taxRate / 100) + (bill.tipAmount > 0
    ? bill.tipAmount * (participantShare / bill.totalAmount || 0)
    : 0);

  const participantTotal = participantShare + taxTipEstimate;

  const handleFilterPress = (filter: string) => {
    dispatch(setClaimFilter(filter.toLowerCase() as ClaimFilter));
  };

  const handleIncrement = (itemId: string) => {
    if (!selectedParticipantId) return;
    dispatch(claimItem({itemId, participantId: selectedParticipantId}));
  };

  const handleDecrement = (itemId: string) => {
    if (!selectedParticipantId) return;
    dispatch(unclaimItem({itemId, participantId: selectedParticipantId}));
  };

  const renderItem = ({item}: {item: BillItem}) => {
    const selectedParticipantQty = selectedParticipantId
      ? item.claimedBy.filter(id => id === selectedParticipantId).length
      : 0;

    return (
      <BillItemRow
        item={item}
        participants={bill.participants}
        selectedParticipantQty={selectedParticipantQty}
        isSelected={item.id === selectedItemId}
        onIncrement={() => handleIncrement(item.id)}
        onDecrement={() => handleDecrement(item.id)}
        onNamePress={() => setSelectedItemId(item.id)}
      />
    );
  };

  const selectedItem = selectedItemId
    ? bill.items.find(i => i.id === selectedItemId)
    : null;

  return (
    <Screen style={styles.screen} edges={['bottom']}>
      {/* White header sheet: fills status bar so top is not gray; right column stays visible */}
      <View
        style={[
          styles.headerSheet,
          {paddingTop: insets.top},
        ]}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
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
                <Text variant="labelSm" color={colors.onSurfaceVariant}>
                  Step {bill.step} of {bill.totalSteps}
                </Text>
              </View>
            </Row>
          </View>
          <View style={styles.headerRight}>
            <Text
              variant="titleMd"
              color={colors.primary}
              style={styles.headerTotal}
              numberOfLines={1}>
              ${bill.totalAmount.toFixed(2)}
            </Text>
            <Text variant="caption" color={colors.onSurfaceVariant} numberOfLines={1}>
              {bill.items.length} items
            </Text>
          </View>
        </View>
      </View>

      {/* Participant Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalStrip}
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

      {/* Item Detail Bottom Sheet */}
      <Modal
        visible={!!selectedItem}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedItemId(null)}>
        <Pressable
          style={styles.backdrop}
          onPress={() => setSelectedItemId(null)}>
          <View />
        </Pressable>
        {selectedItem && (
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHandle} />
            <Spacer size="lg" />

            <Text variant="titleLg">{selectedItem.name}</Text>
            <Spacer size="xs" />
            <Row align="center" gap={spacing.sm}>
              <Text variant="headlineSm" color={colors.primary}>
                ${selectedItem.totalPrice.toFixed(2)}
              </Text>
              <Text variant="bodySm" color={colors.onSurfaceVariant}>
                ({selectedItem.quantity}x @ ${selectedItem.unitPrice.toFixed(2)})
              </Text>
            </Row>

            <Spacer size="lg" />

            <View style={styles.sheetDivider} />

            <Spacer size="lg" />

            <Text variant="labelMd" color={colors.onSurfaceVariant}>
              Claimed by
            </Text>
            <Spacer size="md" />

            {bill.participants.map(p => {
              const pQty = selectedItem.claimedBy.filter(
                id => id === p.id,
              ).length;
              const totalClaimed = selectedItem.claimedBy.length;
              const canAdd = totalClaimed < selectedItem.quantity;

              return (
                <Row
                  key={p.id}
                  align="center"
                  justify="space-between"
                  style={styles.sheetParticipantRow}>
                  <Row align="center" gap={spacing.md}>
                    <Avatar
                      initial={p.initial}
                      size={36}
                      colorKey={p.colorKey}
                    />
                    <Text variant="bodyMd">{p.name}</Text>
                  </Row>

                  {pQty > 0 ? (
                    <Row align="center" gap={spacing.sm}>
                      <BasePressable
                        onPress={() =>
                          dispatch(
                            unclaimItem({
                              itemId: selectedItem.id,
                              participantId: p.id,
                            }),
                          )
                        }
                        pressedOpacity={OPACITY_ON_PRESS_SUBTLE}
                        style={styles.sheetStepperBtn}>
                        <Icon
                          name="remove"
                          size={14}
                          color={colors.onSurface}
                        />
                      </BasePressable>
                      <Text variant="titleSm" style={styles.sheetStepperQty}>
                        {pQty}
                      </Text>
                      <BasePressable
                        onPress={
                          canAdd
                            ? () =>
                                dispatch(
                                  claimItem({
                                    itemId: selectedItem.id,
                                    participantId: p.id,
                                  }),
                                )
                            : undefined
                        }
                        pressedOpacity={OPACITY_ON_PRESS_SUBTLE}
                        style={[
                          styles.sheetStepperBtn,
                          styles.sheetStepperBtnAdd,
                          !canAdd && styles.sheetStepperBtnDisabled,
                        ]}>
                        <Icon
                          name="add"
                          size={14}
                          color={
                            canAdd ? colors.primary : colors.outlineVariant
                          }
                        />
                      </BasePressable>
                    </Row>
                  ) : (
                    <BasePressable
                      onPress={
                        canAdd
                          ? () =>
                              dispatch(
                                claimItem({
                                  itemId: selectedItem.id,
                                  participantId: p.id,
                                }),
                              )
                          : undefined
                      }
                      pressedOpacity={OPACITY_ON_PRESS_SUBTLE}
                      style={[
                        styles.sheetAddBtn,
                        !canAdd && styles.sheetAddBtnDisabled,
                      ]}>
                      <Icon
                        name="add"
                        size={16}
                        color={canAdd ? colors.primary : colors.outlineVariant}
                      />
                    </BasePressable>
                  )}
                </Row>
              );
            })}

            <Spacer size="md" />

            {selectedItem.claimedBy.length < selectedItem.quantity && (
              <Text variant="caption" color={colors.onSurfaceVariant}>
                {selectedItem.quantity - selectedItem.claimedBy.length}/
                {selectedItem.quantity} unclaimed
              </Text>
            )}

            <Spacer size="xl" />
          </View>
        )}
      </Modal>

      {/* Sticky Glass Footer */}
      <View style={styles.glassFooter}>
        <Row align="center" justify="space-between">
          <View>
            <Text variant="bodySm" color={colors.onSurfaceVariant}>
              {shareLabel}: ${participantShare.toFixed(2)}
            </Text>
            <Text variant="caption" color={colors.onSurfaceVariant}>
              Est. Tax/Tip: +${taxTipEstimate.toFixed(2)}
            </Text>
          </View>
          <Text variant="headlineSm" color={colors.primary}>
            ${participantTotal.toFixed(2)}
          </Text>
        </Row>
        <Text
          variant="bodySm"
          color={colors.onSurfaceVariant}
          style={styles.totalLabel}>
          {isMe ? 'Your total' : `${activeParticipant?.name ?? 'Their'}'s total`}
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
  headerSheet: {
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
  },
  header: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.surfaceContainerLowest,
  },
  headerLeft: {
    flex: 1,
    minWidth: 0,
    marginRight: spacing.md,
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
    minWidth: 0,
  },
  headerRight: {
    flexShrink: 0,
    flexGrow: 0,
    alignItems: 'flex-end',
  },
  headerTotal: {
    fontWeight: '800',
  },
  horizontalStrip: {
    flexGrow: 0,
  },
  participantScroll: {
    flexGrow: 0,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  bottomSheet: {
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['3xl'],
    ...shadows.glass,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceContainerHighest,
    alignSelf: 'center',
    marginTop: spacing.md,
  },
  sheetDivider: {
    height: 1,
    backgroundColor: colors.surfaceContainerHigh,
  },
  sheetParticipantRow: {
    paddingVertical: spacing.md,
  },
  sheetStepperBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetStepperBtnAdd: {
    backgroundColor: 'rgba(74, 64, 224, 0.1)',
  },
  sheetStepperBtnDisabled: {
    backgroundColor: colors.surfaceContainerLow,
    opacity: 0.4,
  },
  sheetStepperQty: {
    minWidth: 24,
    textAlign: 'center',
  },
  sheetAddBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(74, 64, 224, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetAddBtnDisabled: {
    backgroundColor: colors.surfaceContainerLow,
    opacity: 0.4,
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
