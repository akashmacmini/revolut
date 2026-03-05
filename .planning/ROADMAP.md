# Roadmap: Revolut Clone MVP

## Overview

Build a production-grade Revolut clone iOS app with React Native/Expo covering onboarding, dashboard, cards, and profile. Seven phases from scaffolding through polish, with independent feature phases running in parallel where possible.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Project Scaffolding** - Expo project setup, Supabase schema, NativeWind config, auth-gated routing
- [ ] **Phase 2: Shared Components** - Reusable UI components (PinPad, OTP, Button, BottomSheet, VirtualCard, etc.)
- [ ] **Phase 3: Onboarding + Auth** - 18 onboarding screens, phone OTP, passcode, Face ID, Zustand store
- [ ] **Phase 4: Home Dashboard** - Balance, transactions, spending insights, quick actions, tab layout, seed data
- [ ] **Phase 5: Cards** - Virtual card display, customization, PIN, color picker, plan upgrade
- [ ] **Phase 6: Profile** - Profile screen, RevTag setup, avatar upload
- [ ] **Phase 7: Polish + Integration** - Transitions, haptics, skeletons, error handling, app icon

## Phase Details

### Phase 1: Project Scaffolding
**Goal**: Fully configured Expo project with Supabase backend, NativeWind styling, and auth-gated routing ready for feature development
**Depends on**: Nothing (first phase)
**Requirements**: SCAFF-01, SCAFF-02, SCAFF-03, SCAFF-04, SCAFF-05, SCAFF-06, SCAFF-07
**Success Criteria** (what must be TRUE):
  1. `npx expo start` launches successfully in Expo Go on iOS Simulator
  2. NativeWind dark theme renders correctly with Revolut colors
  3. Supabase connection works (can query empty tables)
  4. Auth routing redirects unauthenticated users to (auth) group
  5. All RLS policies active on all tables
**Plans**: TBD

### Phase 2: Shared Components
**Goal**: Complete library of reusable UI components that all feature screens depend on
**Depends on**: Phase 1
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06, COMP-07, COMP-08, COMP-09, COMP-10
**Success Criteria** (what must be TRUE):
  1. PinPad works in both 4-digit and 6-digit modes with haptic feedback
  2. OTPInput auto-advances through 6 cells and triggers callback
  3. Button renders all 4 variants correctly
  4. BottomSheet opens/closes with gesture dismissal
  5. VirtualCard displays gradient with masked card number and flip animation
**Plans**: TBD

### Phase 3: Onboarding + Auth
**Goal**: Users can sign up via phone OTP, complete full onboarding (18 screens), and securely re-enter the app
**Depends on**: Phase 2
**Requirements**: ONBD-01 through ONBD-19, AUTH-01 through AUTH-05
**Success Criteria** (what must be TRUE):
  1. User can walk through all 18 onboarding screens end-to-end
  2. Phone OTP sends and verifies via Supabase Edge Functions
  3. Profile data persists in Supabase profiles table after onboarding
  4. Passcode is hashed and stored in expo-secure-store
  5. App re-open triggers passcode/Face ID unlock then lands on dashboard
**Plans**: TBD

### Phase 4: Home Dashboard
**Goal**: Fully functional home dashboard with balance, transactions, spending insights, and account management
**Depends on**: Phase 1, Phase 2
**Requirements**: DASH-01 through DASH-10
**Success Criteria** (what must be TRUE):
  1. Balance header shows total across currency accounts
  2. Transaction list renders seed data grouped by date with pull-to-refresh
  3. Spending insights chart renders monthly data via victory-native
  4. Account switcher sheet lets user switch between currency accounts
  5. Tab bar displays all 5 tabs (3 placeholder)
**Plans**: TBD

### Phase 5: Cards
**Goal**: Users can view, customize, and manage virtual cards with PIN and color options
**Depends on**: Phase 1, Phase 2
**Requirements**: CARD-01 through CARD-06
**Success Criteria** (what must be TRUE):
  1. Virtual card displays with gradient and masked number on Cards tab
  2. User can pick card color variant
  3. Card PIN creation + confirm flow works (persists to cards table)
  4. Card customize sheet shows badge/sticker options
**Plans**: TBD

### Phase 6: Profile
**Goal**: Users can view and edit their profile, set RevTag, and upload avatar
**Depends on**: Phase 1, Phase 2
**Requirements**: PROF-01 through PROF-03
**Success Criteria** (what must be TRUE):
  1. Profile screen shows user info and plan details
  2. RevTag (@username) can be set and persists to profiles table
  3. Avatar can be picked from library and uploads to Supabase Storage
**Plans**: TBD

### Phase 7: Polish + Integration
**Goal**: App feels production-ready with smooth transitions, haptics, loading states, and error handling
**Depends on**: Phase 3, Phase 4, Phase 5, Phase 6
**Requirements**: PLSH-01 through PLSH-05
**Success Criteria** (what must be TRUE):
  1. Screen transitions use Reanimated shared transitions
  2. Haptic feedback fires on PinPad taps and button presses
  3. All data screens show skeleton loading states
  4. Network errors display user-friendly messages
  5. App icon and splash screen configured in app.json
**Plans**: TBD

## Phase Waves

Phases grouped by dependency for parallel execution.

| Wave | Phases | Notes |
|------|--------|-------|
| 1 | Phase 1 | Foundation — no dependencies |
| 2 | Phase 2 | Shared components — depends on Phase 1 |
| 3 | Phase 3, Phase 4, Phase 5, Phase 6 | Independent feature areas — all depend on Phase 1+2, no cross-deps |
| 4 | Phase 7 | Polish — depends on all feature phases |

*Wave 3 runs 4 phases in parallel using git worktrees.*

## Progress

**Execution Order:**
Phases execute in dependency order. Wave 3 (Phases 3-6) runs in parallel.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Scaffolding | 0/0 | Not started | - |
| 2. Shared Components | 0/0 | Not started | - |
| 3. Onboarding + Auth | 0/0 | Not started | - |
| 4. Home Dashboard | 0/0 | Not started | - |
| 5. Cards | 0/0 | Not started | - |
| 6. Profile | 0/0 | Not started | - |
| 7. Polish + Integration | 0/0 | Not started | - |
