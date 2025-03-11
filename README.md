# Decimal Expansion with Recurring Decimals

`npm install react-decimal-expansion`
`pnpm add react-decimal-expansion`
`yarn add react-decimal-expansion`

```tsx
import { DecimalExpansion } from "react-decimal-expansion";

...

<DecimalExpansion numerator={1234} denominator={1235} />
```

Renders an internationalized locale-formatted [recurring/repeating decimal](https://en.wikipedia.org/wiki/Repeating_decimal) of the given rational.

Supporting:

- Vinculum for US/Canada, India and select European countries
- Dots for UK, Australia, New Zealand, People's Republic of China, and select Middle Eastern and South-east Asian countries
- Parentheses for other parts of Europe / Scandinavian countries, Vietnam and Israel
- Arc for Spain and Latin America
- Ellipsis as another option
- Rounded as yet another display option

The `options` prop supports:

```tsx
{
  // Specifying the region or locale tag, otherwise the navigator.language will be used
  tag?: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale;

  // Specifying the format to use for recurring decimals, otherwise inferred from the locale
  format?: "vinculum" | "dots" | "parentheses" | "arc" | "ellipsis" | "rounded";

  // Number format options, same as using:
  //   new Intl.NumberFormat(locale, formatOptions).format(...)
  formatOptions?: Intl.NumberFormatOptions;

  // If using the "rounded" format, how to round
  rounding?: {
    method?: "round" | "floor" | "ceil";
    digits?: number;

    renderRounded?: React.FC<PropsWithChildren>;
    renderExact?: React.FC<PropsWithChildren>;
  };

  // Custom renderers for recurring parts
  renderRecurring?: Record<
    "vinculum" | "dots" | "parentheses" | "arc" | "ellipsis" | "rounded",
    React.FC<PropsWithChildren>
  >;
}
```

## Demo

`pnpm run dev` to run the demo app.

## Corrections

Let me know via Github Issue if there's any regions that have the wrong format, and we'll update the list.
