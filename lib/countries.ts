export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

export type CountryCode = string;

export const countries: Country[] = [
  { code: 'US', name: 'United States', dialCode: '+1', flag: '\u{1F1FA}\u{1F1F8}' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '\u{1F1E9}\u{1F1EA}' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '\u{1F1EB}\u{1F1F7}' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '\u{1F1EE}\u{1F1F9}' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '\u{1F1EA}\u{1F1F8}' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '\u{1F1F5}\u{1F1F9}' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '\u{1F1F3}\u{1F1F1}' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '\u{1F1E7}\u{1F1EA}' },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '\u{1F1F5}\u{1F1F1}' },
  { code: 'RO', name: 'Romania', dialCode: '+40', flag: '\u{1F1F7}\u{1F1F4}' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '\u{1F1F8}\u{1F1EA}' },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '\u{1F1F3}\u{1F1F4}' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '\u{1F1E9}\u{1F1F0}' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '\u{1F1EE}\u{1F1EA}' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '\u{1F1E8}\u{1F1ED}' },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '\u{1F1E6}\u{1F1F9}' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '\u{1F1E6}\u{1F1FA}' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '\u{1F1E8}\u{1F1E6}' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '\u{1F1EF}\u{1F1F5}' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '\u{1F1F8}\u{1F1EC}' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '\u{1F1E6}\u{1F1EA}' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '\u{1F1E7}\u{1F1F7}' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '\u{1F1F2}\u{1F1FD}' },
];
