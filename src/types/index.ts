export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Participant {
  id: string;
  name: string;
  initial: string;
  colorKey: 'blue' | 'green' | 'pink' | 'indigo' | 'orange' | 'teal' | 'purple' | 'amber';
}

export interface BillItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  claimedBy: string[]; // participant ids
  splitType: 'single' | 'shared' | 'unclaimed';
}

export interface BillSummary {
  id: string;
  restaurantName: string;
  totalAmount: number;
  currency: string;
  date: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  status: 'in_progress' | 'completed';
  participantCount: number;
}

export interface ActiveBill {
  id: string;
  restaurantName: string;
  totalAmount: number;
  currency: string;
  items: BillItem[];
  participants: Participant[];
  taxRate: number;
  tipAmount: number;
  step: number;
  totalSteps: number;
}

export type ClaimFilter = 'all' | 'unclaimed' | 'claimed' | 'shared' | 'mine';

export type ScanStatus = 'idle' | 'capturing' | 'processing' | 'complete' | 'error';

export type TabName = 'home' | 'history' | 'account';
