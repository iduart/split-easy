import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScanOptionsScreen from '../../screens/ScanOptionsScreen';
import CameraCaptureScreen from '../../screens/CameraCaptureScreen';
import GalleryImportScreen from '../../screens/GalleryImportScreen';
import ProcessingReceiptScreen from '../../screens/ProcessingReceiptScreen';
import ClaimItemsScreen from '../../screens/ClaimItemsScreen';
import PerPersonTotalsScreen from '../../screens/PerPersonTotalsScreen';

export type ScanFlowParamList = {
  ScanOptions: undefined;
  CameraCapture: undefined;
  GalleryImport: undefined;
  ProcessingReceipt: undefined;
  ClaimItems: undefined;
  PerPersonTotals: undefined;
};

const Stack = createNativeStackNavigator<ScanFlowParamList>();

export default function ScanFlow() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ScanOptions" component={ScanOptionsScreen} />
      <Stack.Screen name="CameraCapture" component={CameraCaptureScreen} />
      <Stack.Screen name="GalleryImport" component={GalleryImportScreen} />
      <Stack.Screen
        name="ProcessingReceipt"
        component={ProcessingReceiptScreen}
      />
      <Stack.Screen name="ClaimItems" component={ClaimItemsScreen} />
      <Stack.Screen name="PerPersonTotals" component={PerPersonTotalsScreen} />
    </Stack.Navigator>
  );
}
