# Revolut Clone - React Native MVP

## Core Value
A production-grade Revolut clone iOS app covering Onboarding/Auth, Home Dashboard, and Cards/Profile (~30 screens total).

## Tech Stack
- **Framework:** Expo ~52 + React Native (iOS only, Expo Go compatible)
- **Routing:** Expo Router ~4 (file-based)
- **Styling:** NativeWind ~4 (Tailwind CSS for RN)
- **Backend:** Supabase (Auth, PostgreSQL, Edge Functions, Storage)
- **State:** Zustand (client) + TanStack Query (server)
- **Animations:** react-native-reanimated + react-native-gesture-handler

## Design Reference
Screenshots at `/Users/akash/Downloads/Revolut ios May 2025/`

## Theme
- Background: #000
- Surface: #1A1A1A
- Primary: #6C5CE7 (purple)
- Accent: #0984E3 (blue)
- Dark theme throughout

## Constraints
- Must run in Expo Go (no native modules requiring custom dev client)
- iOS only for MVP
- Supabase for all backend services
- ~30 screens total across 3 feature areas

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Expo Go compatible | Fast iteration, no native build step | Use only Expo-compatible packages |
| NativeWind for styling | Tailwind familiarity, consistent dark theme | Configure with Revolut color palette |
| Supabase backend | Auth + DB + Storage + Edge Functions in one | Full backend without custom server |
| Zustand + TanStack Query | Zustand for client state, TQ for server cache | Clean separation of concerns |

---
*Last updated: 2026-03-06 after initialization*
