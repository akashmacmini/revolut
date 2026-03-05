import React from 'react';
import { Text } from 'react-native';

interface CurrencyDisplayProps {
  amount: number;
  currency: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSign?: boolean;
}

const currencySymbols: Record<string, string> = {
  GBP: '\u00A3',
  USD: '$',
  EUR: '\u20AC',
  JPY: '\u00A5',
  CHF: 'CHF ',
  AUD: 'A$',
  CAD: 'C$',
  INR: '\u20B9',
  SGD: 'S$',
  SEK: 'kr ',
  NOK: 'kr ',
  DKK: 'kr ',
  PLN: 'z\u0142',
  BRL: 'R$',
  MXN: 'MX$',
  AED: 'AED ',
};

const zeroDecimalCurrencies = new Set(['JPY']);

const sizeClasses: Record<string, string> = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl',
  xl: 'text-5xl',
};

const fontWeights: Record<string, string> = {
  sm: 'font-medium',
  md: 'font-semibold',
  lg: 'font-bold',
  xl: 'font-bold',
};

export function CurrencyDisplay({
  amount,
  currency,
  size = 'md',
  showSign,
}: CurrencyDisplayProps) {
  const symbol = currencySymbols[currency] ?? `${currency} `;
  const isZeroDecimal = zeroDecimalCurrencies.has(currency);
  const value = isZeroDecimal ? amount : amount / 100;
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  const formatted = isZeroDecimal
    ? absValue.toLocaleString('en-US', { minimumFractionDigits: 0 })
    : absValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

  let prefix = '';
  if (showSign) {
    prefix = isNegative ? '-' : '+';
  } else if (isNegative) {
    prefix = '-';
  }

  const colorClass =
    showSign && value !== 0
      ? isNegative
        ? 'text-error'
        : 'text-success'
      : 'text-text-primary';

  return (
    <Text className={`${colorClass} ${sizeClasses[size]} ${fontWeights[size]}`}>
      {prefix}
      {symbol}
      {formatted}
    </Text>
  );
}
