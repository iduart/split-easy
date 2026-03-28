# SplitEasy

A React Native CLI bill-splitting mobile app prototype. Designed in Google Stitch with the "Precision Fluidity" design system.

## Setup

### Prerequisites

- Node.js 18+
- React Native CLI environment set up ([guide](https://reactnative.dev/docs/set-up-your-environment))
- Xcode (for iOS)
- Android Studio (for Android)
- CocoaPods (for iOS)

### Install Dependencies

```sh
npm install
```

### Run iOS

```sh
cd ios && pod install && cd ..
npx react-native run-ios
```

### Run Android

```sh
npx react-native run-android
```

## Architecture

```
src/
  app/           # App entry, Redux store, navigation
  theme/         # Design tokens (colors, typography, spacing, borders, shadows)
  components/
    primitives/  # Base UI: Screen, Text, Button, Input, Card, Avatar, Badge, Icon, etc.
    shared/      # Composed: Header, BottomNavBar, GlassFooter, BillItemRow, etc.
  features/      # Redux Toolkit slices (auth, bills, scan, ui)
  screens/       # 12 screen components
  data/          # Mock data
  types/         # TypeScript interfaces
```

### Design System ("Precision Fluidity")

- **Colors:** Primary indigo (#4a40e0) with tonal surface hierarchy (no 1px borders)
- **Typography:** Manrope (headlines) + Inter (body/labels)
- **Depth:** Tonal layering over drop shadows; glassmorphism for floating elements
- **CTAs:** Gradient 135deg from primary to primary-dim

### Navigation Flow

```
Splash -> Onboarding -> Sign In/Up -> Home Dashboard
                                        |
                                        v
                         Scan Options -> Camera/Gallery -> Processing -> Claim Items -> Per-Person Totals
```

### State Management

Redux Toolkit with 4 slices:
- **auth** — authentication state, onboarding flag
- **bills** — active bill, items, participants, recent bills
- **scan** — scan workflow status, progress, source type
- **ui** — active tab, filters, selected participant, onboarding step

### Key Libraries

| Library | Purpose |
|---------|---------|
| React Navigation | Screen navigation (native stack + bottom tabs) |
| Redux Toolkit | State management |
| react-native-linear-gradient | Primary CTA gradients |
| react-native-vector-icons | Material Icons |
| react-native-svg | Circular progress indicators |

## Screens (12)

1. Splash
2. Onboarding (4-page carousel)
3. Sign In
4. Sign Up
5. Forgot Password
6. Home Dashboard
7. Scan Options
8. Camera Capture
9. Gallery Import
10. Processing Receipt
11. Claim Items
12. Per-Person Totals
