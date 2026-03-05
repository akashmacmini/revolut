export interface Profile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string | null;
  date_of_birth: string | null;
  country: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  postal_code: string | null;
  avatar_url: string | null;
  kyc_status: 'pending' | 'in_progress' | 'verified' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface Account {
  id: string;
  user_id: string;
  currency: string;
  balance: number;
  is_primary: boolean;
  account_number: string | null;
  sort_code: string | null;
  iban: string | null;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  account_id: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment' | 'exchange';
  amount: number;
  currency: string;
  description: string;
  category: string | null;
  merchant_name: string | null;
  merchant_logo: string | null;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  reference: string | null;
  recipient_id: string | null;
  created_at: string;
}

export interface Card {
  id: string;
  user_id: string;
  account_id: string;
  card_number_last4: string;
  card_type: 'virtual' | 'physical';
  card_brand: 'visa' | 'mastercard';
  status: 'active' | 'frozen' | 'cancelled' | 'pending';
  expiry_month: number;
  expiry_year: number;
  spending_limit: number | null;
  contactless_enabled: boolean;
  online_payments_enabled: boolean;
  atm_withdrawals_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface IdentityDocument {
  id: string;
  user_id: string;
  document_type: 'passport' | 'drivers_license' | 'national_id';
  document_number: string | null;
  front_image_url: string | null;
  back_image_url: string | null;
  selfie_url: string | null;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface WatchlistItem {
  id: string;
  user_id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'commodity';
  created_at: string;
}

export interface SetupProgress {
  id: string;
  user_id: string;
  step_add_money: boolean;
  step_order_card: boolean;
  step_set_pin: boolean;
  step_verify_identity: boolean;
  step_enable_notifications: boolean;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile> & { user_id: string }; Update: Partial<Profile> };
      accounts: { Row: Account; Insert: Partial<Account> & { user_id: string }; Update: Partial<Account> };
      transactions: { Row: Transaction; Insert: Partial<Transaction> & { user_id: string; account_id: string }; Update: Partial<Transaction> };
      cards: { Row: Card; Insert: Partial<Card> & { user_id: string; account_id: string }; Update: Partial<Card> };
      identity_documents: { Row: IdentityDocument; Insert: Partial<IdentityDocument> & { user_id: string }; Update: Partial<IdentityDocument> };
      watchlist_items: { Row: WatchlistItem; Insert: Partial<WatchlistItem> & { user_id: string }; Update: Partial<WatchlistItem> };
      setup_progress: { Row: SetupProgress; Insert: Partial<SetupProgress> & { user_id: string }; Update: Partial<SetupProgress> };
    };
  };
}
