import React, { JSX, PropsWithChildren, useEffect, useMemo } from "react";

export type DecimalNotationFormat =
  | "vinculum"
  | "dots"
  | "parentheses"
  | "arc"
  | "ellipsis"
  | "rounded";

export interface DecimalExpansionOptions {
  tag?: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale;
  format?: DecimalNotationFormat;
  formatOptions?: Intl.NumberFormatOptions;
  rounding?: {
    method?: "round" | "floor" | "ceil";
    digits?: number;
    renderRounded?: React.FC<PropsWithChildren>;
    renderExact?: React.FC<PropsWithChildren>;
  };
  renderRecurring?: Record<DecimalNotationFormat, React.FC<PropsWithChildren>>;
}

export interface DecimalExpansionProps {
  numerator: number;
  denominator: number;
  options?: DecimalExpansionOptions;
  onFormatChange?: (format: DecimalNotationFormat) => void;
}

const regionFormats: Record<string, DecimalNotationFormat> = {
  // ─── vinculum ──────────────────────────────────────
  US: "vinculum",
  CA: "vinculum",
  IN: "vinculum",
  FR: "vinculum",
  DE: "vinculum",
  IT: "vinculum",
  CH: "vinculum",
  CZ: "vinculum",
  SK: "vinculum",
  SI: "vinculum",
  CL: "vinculum",
  TR: "vinculum",
  HU: "vinculum",
  RO: "vinculum",
  RS: "vinculum",
  BG: "vinculum",
  HR: "vinculum",

  // ─── Dots ───────────────────────────────────────────
  MY: "dots",
  MA: "dots",
  PK: "dots",
  TN: "dots",
  IR: "dots",
  DZ: "dots",
  EG: "dots",
  GB: "dots",
  NZ: "dots",
  AU: "dots",
  ZA: "dots",
  JP: "dots",
  TH: "dots",
  KR: "dots",
  SG: "dots",
  CN: "dots",
  ID: "dots",
  BD: "dots",
  NG: "dots",
  AE: "dots",
  LB: "dots",
  JO: "dots",
  PH: "dots",

  // ─── Parentheses ───────────────────────────────────
  AT: "parentheses",
  DK: "parentheses",
  FI: "parentheses",
  NL: "parentheses",
  NO: "parentheses",
  PL: "parentheses",
  RU: "parentheses",
  UA: "parentheses",
  VN: "parentheses",
  IL: "parentheses",
  SE: "parentheses",
  EE: "parentheses",
  LV: "parentheses",
  LT: "parentheses",
  BY: "parentheses",
  BA: "parentheses",
  MK: "parentheses",
  GR: "parentheses",

  // ─── Arc ────────────────────────────────────────────
  ES: "arc",
  AR: "arc",
  BR: "arc",
  MX: "arc",
  CO: "arc",
  PE: "arc",
  VE: "arc",
  EC: "arc",
  UY: "arc",
  PY: "arc",
};

function Vinculum({ children }: PropsWithChildren) {
  return <span style={{ textDecoration: "overline" }}>{children}</span>;
}

function Dot({ children }: PropsWithChildren) {
  return (
    <span style={{ whiteSpace: "nowrap" }}>
      <span
        style={{
          display: "inline-block",
          textAlign: "center",
        }}
      >
        <span
          style={{ display: "block", lineHeight: "0.8em", fontSize: "70%" }}
        >
          .
        </span>
        <span style={{ display: "block", lineHeight: "1em" }}>{children}</span>
      </span>
    </span>
  );
}

function Dots({ children }: PropsWithChildren) {
  if (typeof children !== "string") {
    return <></>;
  }

  const parts = children.split("");

  const first = parts[0];
  let middle: string[] | null = parts.slice(1, -1);
  let last: string | null = parts[parts.length - 1];

  if (parts.length === 1) {
    middle = null;
    last = null;
  } else if (parts.length === 2) {
    middle = null;
  }

  return (
    <>
      <Dot>{first}</Dot>
      {middle ? middle.join("") : null}
      {last ? <Dot>{last}</Dot> : null}
    </>
  );
}

function Parentheses({ children }: PropsWithChildren) {
  return <>({children})</>;
}

function Arc({ children }: PropsWithChildren) {
  return (
    <span
      style={{
        lineHeight: "1.2em",
        //paddingTop: "0.2em",
        border: "1px solid transparent",
        borderTopColor: "currentColor",
        borderTopLeftRadius: "50% 25%",
        borderTopRightRadius: "50% 25%",
      }}
    >
      {children}
    </span>
  );
}

function Ellipsis({ children }: PropsWithChildren) {
  return <> {children}…</>;
}

function Identity({ children }: PropsWithChildren) {
  return <>{children}</>;
}

const formatComponents: Record<
  DecimalNotationFormat,
  ({ children }: PropsWithChildren) => JSX.Element
> = {
  vinculum: Vinculum,
  dots: Dots,
  parentheses: Parentheses,
  arc: Arc,
  ellipsis: Ellipsis,
  rounded: Identity,
};

function decimalExpansion(numerator: number, denominator: number) {
  // Special case for 0
  if (denominator === 0) {
    return null;
  } else if (numerator === 0) {
    return { whole: 0, nonRecurring: "", recurring: null };
  }

  const whole = Math.floor(numerator / denominator);
  let remainder = numerator % denominator;
  let nonRecurring = ""; // The non-recurring part of the decimal
  let recurring = null; // The recurring part of the decimal
  const remainderHistory: Record<number, number> = {}; // Track positions of each remainder

  // Process the decimal part
  while (remainder !== 0) {
    // If this remainder has been seen before, we have a repeating decimal
    if (remainderHistory[remainder] !== undefined) {
      recurring = nonRecurring.slice(remainderHistory[remainder]);
      nonRecurring = nonRecurring.slice(0, remainderHistory[remainder]);
      break;
    }

    // Store the position of this remainder
    remainderHistory[remainder] = nonRecurring.length;

    // Get the next digit in the decimal expansion
    remainder *= 10;
    nonRecurring += Math.floor(remainder / denominator);
    remainder %= denominator;
  }

  return {
    whole,
    nonRecurring, // Non-recurring part of the decimal
    recurring, // Recurring part of the decimal (or null if none)
  };
}

export function DecimalExpansion({
  numerator,
  denominator,
  options,
  onFormatChange,
}: DecimalExpansionProps) {
  const tag = options?.tag;

  const [locale, numberFormat] = useMemo(() => {
    const locale = new Intl.Locale(tag || navigator.language);
    return [
      locale,
      new Intl.NumberFormat(locale, options?.formatOptions),
    ] as const;
  }, [tag, options?.formatOptions]);

  const region = locale.region;

  const regionFormat = region ? regionFormats[region] : undefined;

  const format = options?.format || regionFormat || "vinculum";

  useEffect(() => {
    if (onFormatChange) {
      onFormatChange(format);
    }
  }, [format, onFormatChange]);

  const expansion = decimalExpansion(numerator, denominator);

  if (!expansion) {
    return <>∞</>;
  }

  const { nonRecurring, recurring } = expansion;

  const parts = numberFormat.formatToParts(numerator / denominator);

  if (format === "rounded") {
    const digits = options?.rounding?.digits || 3;
    let value = numerator / denominator;
    let method = Math.round;
    if (options?.rounding?.method === "ceil") {
      method = Math.ceil;
    } else if (options?.rounding?.method === "floor") {
      method = Math.floor;
    }

    value = method(value * 10 ** digits) / 10 ** digits;

    if (value === numerator / denominator) {
      const Exact =
        options?.rounding?.renderExact || (({ children }) => <>{children}</>);
      return <Exact>{parts.map((part) => part.value)}</Exact>;
    } else {
      const newParts = numberFormat.formatToParts(value);
      const Rounded =
        options?.rounding?.renderRounded ||
        (({ children }) => <>{children} (rounded)</>);
      return <Rounded>{newParts.map((part) => part.value)}</Rounded>;
    }
  } else {
    const Recurring =
      options?.renderRecurring?.[format] || formatComponents[format];
    const fractionPartReplacement = (
      <>
        {nonRecurring ? nonRecurring : null}
        {recurring ? <Recurring>{recurring}</Recurring> : null}
      </>
    );

    return (
      <>
        {parts.map((part) => (
          <React.Fragment key={`${part.value}(${part.type})`}>
            {part.type === "fraction" ? fractionPartReplacement : part.value}
          </React.Fragment>
        ))}
      </>
    );
  }
}
