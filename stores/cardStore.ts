import { create } from 'zustand';

export type CardColor = 'dark' | 'purple' | 'blue' | 'gradient' | 'rose' | 'green';

export interface Card {
  id: string;
  lastFour: string;
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  color: CardColor;
  label?: string;
  sticker?: string;
  isFrozen: boolean;
  isVirtual: boolean;
  hasPin: boolean;
  pin?: string;
}

interface CardState {
  cards: Card[];
  selectedCard: Card | null;
  selectCard: (id: string) => void;
  setCardColor: (id: string, color: CardColor) => void;
  setCardLabel: (id: string, label: string) => void;
  setCardSticker: (id: string, sticker: string | undefined) => void;
  setCardPin: (id: string, pin: string) => void;
  toggleFreeze: (id: string) => void;
}

const defaultCard: Card = {
  id: '1',
  lastFour: '4242',
  cardholderName: 'JOHN DOE',
  cardNumber: '4242 4242 4242 4242',
  expiry: '12/28',
  cvv: '123',
  color: 'dark',
  isFrozen: false,
  isVirtual: true,
  hasPin: false,
};

export const useCardStore = create<CardState>((set, get) => ({
  cards: [defaultCard],
  selectedCard: defaultCard,

  selectCard: (id) => {
    const card = get().cards.find((c) => c.id === id) ?? null;
    set({ selectedCard: card });
  },

  setCardColor: (id, color) =>
    set((state) => {
      const cards = state.cards.map((c) =>
        c.id === id ? { ...c, color } : c
      );
      const selectedCard =
        state.selectedCard?.id === id
          ? { ...state.selectedCard, color }
          : state.selectedCard;
      return { cards, selectedCard };
    }),

  setCardLabel: (id, label) =>
    set((state) => {
      const cards = state.cards.map((c) =>
        c.id === id ? { ...c, label } : c
      );
      const selectedCard =
        state.selectedCard?.id === id
          ? { ...state.selectedCard, label }
          : state.selectedCard;
      return { cards, selectedCard };
    }),

  setCardSticker: (id, sticker) =>
    set((state) => {
      const cards = state.cards.map((c) =>
        c.id === id ? { ...c, sticker } : c
      );
      const selectedCard =
        state.selectedCard?.id === id
          ? { ...state.selectedCard, sticker }
          : state.selectedCard;
      return { cards, selectedCard };
    }),

  setCardPin: (id, pin) =>
    set((state) => {
      const cards = state.cards.map((c) =>
        c.id === id ? { ...c, pin, hasPin: true } : c
      );
      const selectedCard =
        state.selectedCard?.id === id
          ? { ...state.selectedCard, pin, hasPin: true }
          : state.selectedCard;
      return { cards, selectedCard };
    }),

  toggleFreeze: (id) =>
    set((state) => {
      const cards = state.cards.map((c) =>
        c.id === id ? { ...c, isFrozen: !c.isFrozen } : c
      );
      const selectedCard =
        state.selectedCard?.id === id
          ? { ...state.selectedCard, isFrozen: !state.selectedCard.isFrozen }
          : state.selectedCard;
      return { cards, selectedCard };
    }),
}));
