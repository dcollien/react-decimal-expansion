# Locale-aware repeating decimals for React.

`npm install react-decimal-expansion`
`pnpm add react-decimal-expansion`
`yarn add react-decimal-expansion`

[Repeating (recurring) decimals](https://en.wikipedia.org/wiki/Repeating_decimal) are numbers whose decimal expansions include a repeating sequence, for example: 1/3 = 0.333… or 1/7 = 0.142857142857…. Different regions use various notations to indicate repeating digits, including vinculum bars, dots, parentheses, arcs, or ellipsis.

This React component renders repeating decimals using notation appropriate to different locales or custom preferences. It supports integration with `Intl.NumberFormat` for localized number formatting and offers flexible customization options for notation style, rounding, and rendering. It is designed for scientific and educational software, multilingual applications, academic publishing, and any context requiring precise and culturally appropriate numeric display.

```tsx
import { DecimalExpansion } from "react-decimal-expansion";

...

<DecimalExpansion numerator={1234} denominator={1235} />
```
[Demo: Try it out with different fractions](https://dcollien.github.io/react-decimal-expansion/)

Supported notation:
- Vinculum for US/Canada, India and select European countries
- Dots for UK, Australia, New Zealand, People's Republic of China, and select Middle Eastern and South-east Asian countries
- Parentheses for other parts of Europe / Scandinavian countries, Vietnam and Israel
- Arc for Spain and Latin America
- Ellipsis as another option
- Rounded as yet another display option

(If you notice your region has a different convention to what is chosen as default for that region, please raise an issue)

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
