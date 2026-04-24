# Amplios Platform Extension Plan

This document outlines the systematic upgrade of the Amplios platform into a commercial revenue engine.

## Status Overview
- [x] **Phase 1: Architecture Audit** - Completed.
- [x] **Phase 2: Database Schema Expansion** - Completed (Migrations run in Supabase).
- [x] **Phase 3: Admin Panel Upgrades** - Completed (Roadmap, Memberships, Showcase, Kits).
- [x] **Phase 4: Stripe Membership Integration** - Completed (Checkout API & Upgrade Page).
- [x] **Phase 5: Commercial Planner Enhancements** - Completed (Product recommendations & upsells).
- [ ] **Phase 6: Final Polish & Gating** - In Progress.

## Completed Modules

### 1. Membership System
- **Schema**: `profiles` table linked to `auth.users` with subscription status.
- **Frontend**: `/account/upgrade` pricing page with monthly/annual plans.
- **Backend**: `/api/stripe/membership` for subscription sessions.
- **Webhooks**: Syncs Stripe status to Supabase (Success/Cancel/Delete).
- **Profile**: Updated `/account` to show real-time subscription status.

### 2. Admin Command Center
- **Roadmap**: Kanban-style internal tracker for revenue opportunities.
- **Memberships**: Dashboard for user tiers and MRR.
- **Showcase**: Moderation queue for community build submissions.
- **Build Kits**: Specialized manager for high-value commerce bundles.

### 3. Commerce & Planner
- **Build Kits**: Added `kit_type` (Physical/Digital/Hybrid) and resource links.
- **Planner Logic**: Result page now surfaces contextual "Recommended Kits" based on calculated build stats.
- **Upsells**: Strategic "Amplios PRO" prompts injected into the engineering flow.

## Next Steps (Technical)
1. **Content Gating**: Implement a `useMembership` hook or HOC to guard premium PDF/CAD downloads.
2. **Real Data Sync**: Replace mock kits in the planner with dynamic queries to the `build_kits` table.
3. **Analytics**: Add event tracking to "Download Portfolio" clicks to measure conversion from Planner to PRO.
4. **Member Perks**: Update the store to auto-apply 5% discounts for logged-in PRO members.

## Maintenance
- Keep `supabase/migrations/20260423_membership_roadmap_schema.sql` as the reference for DB changes.
- Update `.env.local` with real Stripe Price IDs.
