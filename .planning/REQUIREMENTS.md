# Requirements: Revolut Clone MVP

## v1 Requirements

### Scaffolding (SCAFF)
- [ ] **SCAFF-01**: Expo project created with TypeScript template and all dependencies installed
- [ ] **SCAFF-02**: NativeWind configured with Revolut dark theme (bg #000, surface #1A1A1A, primary #6C5CE7, accent #0984E3)
- [ ] **SCAFF-03**: Supabase project connected with expo-secure-store auth adapter
- [ ] **SCAFF-04**: Root layout with font loading, providers (QueryClient, Supabase), and splash control
- [ ] **SCAFF-05**: Auth-gated routing (index.tsx redirects to auth or tabs based on session)
- [ ] **SCAFF-06**: Supabase database schema deployed (profiles, accounts, transactions, cards, identity_documents, watchlist_items, setup_progress)
- [ ] **SCAFF-07**: Row-Level Security enabled on all tables

### Shared Components (COMP)
- [ ] **COMP-01**: PinPad component with 4/6 digit modes, haptic feedback, biometric button option
- [ ] **COMP-02**: OTPInput component with 6 auto-advancing cells
- [ ] **COMP-03**: Button component with variants (primary/secondary/ghost/disabled)
- [ ] **COMP-04**: BottomSheet wrapper using @gorhom/bottom-sheet
- [ ] **COMP-05**: StepHeader with back chevron and optional progress bar
- [ ] **COMP-06**: Card container component (dark bg, rounded-2xl)
- [ ] **COMP-07**: CountryPicker searchable modal with flags
- [ ] **COMP-08**: CurrencyDisplay formatted amount + symbol
- [ ] **COMP-09**: Carousel with horizontal scroll + pagination dots
- [ ] **COMP-10**: VirtualCard with gradient, masked number, animated flip

### Onboarding (ONBD)
- [ ] **ONBD-01**: Animated splash screen with Revolut logo
- [ ] **ONBD-02**: 3-slide marketing intro carousel
- [ ] **ONBD-03**: Phone entry with country code picker
- [ ] **ONBD-04**: 6-digit OTP verification screen
- [ ] **ONBD-05**: Create 6-digit passcode screen
- [ ] **ONBD-06**: Confirm passcode screen
- [ ] **ONBD-07**: Face ID enrollment prompt
- [ ] **ONBD-08**: Email input screen
- [ ] **ONBD-09**: First + last name input screen
- [ ] **ONBD-10**: Country of residence selection
- [ ] **ONBD-11**: Date of birth picker
- [ ] **ONBD-12**: Address input with search
- [ ] **ONBD-13**: Feature preferences multi-select
- [ ] **ONBD-14**: Plan selection (Free/Premium/Metal)
- [ ] **ONBD-15**: Identity document type selection
- [ ] **ONBD-16**: Document photo capture
- [ ] **ONBD-17**: Selfie capture with oval guide
- [ ] **ONBD-18**: App Tracking Transparency prompt
- [ ] **ONBD-19**: Onboarding state persisted in Zustand store, batch-written to Supabase on completion

### Auth (AUTH)
- [ ] **AUTH-01**: Phone OTP sign-in via Supabase Auth (send-otp edge function)
- [ ] **AUTH-02**: OTP verification creates session + inserts profile/account/setup_progress (verify-otp edge function)
- [ ] **AUTH-03**: Passcode stored locally (hashed in expo-secure-store)
- [ ] **AUTH-04**: Face ID unlock via expo-local-authentication
- [ ] **AUTH-05**: Re-open flow: session check -> passcode/Face ID -> tabs

### Dashboard (DASH)
- [ ] **DASH-01**: Home tab with BalanceHeader showing total balance + currency
- [ ] **DASH-02**: QuickActions row (Add money, Move, Details, More)
- [ ] **DASH-03**: SetupChecklist progress tracker (1/5 to 5/5)
- [ ] **DASH-04**: SpendingInsights monthly chart via victory-native
- [ ] **DASH-05**: Watchlist section (BTC, forex rates)
- [ ] **DASH-06**: TransactionList grouped by date with pull-to-refresh
- [ ] **DASH-07**: Account switcher bottom sheet (switch currency accounts)
- [ ] **DASH-08**: Transaction detail bottom sheet (amount, status, category, notes)
- [ ] **DASH-09**: Tab bar with 5 tabs (Home, Cards, Crypto*, Hub*, RevPoints* — * = placeholder)
- [ ] **DASH-10**: Realistic seed data (demo transactions: Grab, Starbucks, salary, exchanges)

### Cards (CARD)
- [ ] **CARD-01**: Cards tab with VirtualCard display (gradient + masked number)
- [ ] **CARD-02**: Card color variant picker
- [ ] **CARD-03**: Apple Pay setup prompt
- [ ] **CARD-04**: Card customize bottom sheet (badge/sticker selection, text with fonts)
- [ ] **CARD-05**: Card PIN creation + confirmation (4-digit, reuses PinPad)
- [ ] **CARD-06**: Plan upgrade bottom sheet (Premium/Metal)

### Profile (PROF)
- [ ] **PROF-01**: Profile screen with display info and plan details
- [ ] **PROF-02**: RevTag (@username) setup screen
- [ ] **PROF-03**: Profile picture picker + upload to Supabase Storage avatars bucket

### Polish (PLSH)
- [ ] **PLSH-01**: Screen transitions using Reanimated shared transitions
- [ ] **PLSH-02**: Haptic feedback on PinPad, buttons, interactions
- [ ] **PLSH-03**: Loading skeletons + empty states for all data screens
- [ ] **PLSH-04**: Error handling (network errors, declined states)
- [ ] **PLSH-05**: App icon + splash screen configured in app.json

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SCAFF-01 | Phase 1 | Pending |
| SCAFF-02 | Phase 1 | Pending |
| SCAFF-03 | Phase 1 | Pending |
| SCAFF-04 | Phase 1 | Pending |
| SCAFF-05 | Phase 1 | Pending |
| SCAFF-06 | Phase 1 | Pending |
| SCAFF-07 | Phase 1 | Pending |
| COMP-01 | Phase 2 | Pending |
| COMP-02 | Phase 2 | Pending |
| COMP-03 | Phase 2 | Pending |
| COMP-04 | Phase 2 | Pending |
| COMP-05 | Phase 2 | Pending |
| COMP-06 | Phase 2 | Pending |
| COMP-07 | Phase 2 | Pending |
| COMP-08 | Phase 2 | Pending |
| COMP-09 | Phase 2 | Pending |
| COMP-10 | Phase 2 | Pending |
| ONBD-01 | Phase 3 | Pending |
| ONBD-02 | Phase 3 | Pending |
| ONBD-03 | Phase 3 | Pending |
| ONBD-04 | Phase 3 | Pending |
| ONBD-05 | Phase 3 | Pending |
| ONBD-06 | Phase 3 | Pending |
| ONBD-07 | Phase 3 | Pending |
| ONBD-08 | Phase 3 | Pending |
| ONBD-09 | Phase 3 | Pending |
| ONBD-10 | Phase 3 | Pending |
| ONBD-11 | Phase 3 | Pending |
| ONBD-12 | Phase 3 | Pending |
| ONBD-13 | Phase 3 | Pending |
| ONBD-14 | Phase 3 | Pending |
| ONBD-15 | Phase 3 | Pending |
| ONBD-16 | Phase 3 | Pending |
| ONBD-17 | Phase 3 | Pending |
| ONBD-18 | Phase 3 | Pending |
| ONBD-19 | Phase 3 | Pending |
| AUTH-01 | Phase 3 | Pending |
| AUTH-02 | Phase 3 | Pending |
| AUTH-03 | Phase 3 | Pending |
| AUTH-04 | Phase 3 | Pending |
| AUTH-05 | Phase 3 | Pending |
| DASH-01 | Phase 4 | Pending |
| DASH-02 | Phase 4 | Pending |
| DASH-03 | Phase 4 | Pending |
| DASH-04 | Phase 4 | Pending |
| DASH-05 | Phase 4 | Pending |
| DASH-06 | Phase 4 | Pending |
| DASH-07 | Phase 4 | Pending |
| DASH-08 | Phase 4 | Pending |
| DASH-09 | Phase 4 | Pending |
| DASH-10 | Phase 4 | Pending |
| CARD-01 | Phase 5 | Pending |
| CARD-02 | Phase 5 | Pending |
| CARD-03 | Phase 5 | Pending |
| CARD-04 | Phase 5 | Pending |
| CARD-05 | Phase 5 | Pending |
| CARD-06 | Phase 5 | Pending |
| PROF-01 | Phase 6 | Pending |
| PROF-02 | Phase 6 | Pending |
| PROF-03 | Phase 6 | Pending |
| PLSH-01 | Phase 7 | Pending |
| PLSH-02 | Phase 7 | Pending |
| PLSH-03 | Phase 7 | Pending |
| PLSH-04 | Phase 7 | Pending |
| PLSH-05 | Phase 7 | Pending |
