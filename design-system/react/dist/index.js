// src/components/Button/Button.tsx
import * as React from "react";
import { cva } from "class-variance-authority";

// src/lib/cn.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Button/Button.tsx
import { jsx } from "react/jsx-runtime";
var button = cva("ev-btn", {
  variants: {
    variant: {
      /** Primary action — ink fill (flips to paper-on-dark). */
      primary: "ev-btn--primary",
      /** Accent CTA — the single amber fill. At most one per view. */
      accent: "ev-btn--accent",
      /** Secondary — outline, no fill. */
      secondary: "ev-btn--secondary",
      /** Quiet text button. */
      ghost: "ev-btn--ghost"
    },
    size: {
      sm: "ev-btn--sm",
      md: "ev-btn--md",
      lg: "ev-btn--lg"
    }
  },
  defaultVariants: { variant: "primary", size: "md" }
});
var Button = React.forwardRef(
  ({ className, variant, size, type = "button", ...props }, ref) => /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type,
      className: cn(button({ variant, size }), className),
      ...props
    }
  )
);
Button.displayName = "Button";

// src/components/Card/Card.tsx
import * as React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var Card = React2.forwardRef(
  ({ className, interactive, ...props }, ref) => /* @__PURE__ */ jsx2(
    "div",
    {
      ref,
      className: cn("ev-card", interactive && "ev-card--interactive", className),
      ...props
    }
  )
);
Card.displayName = "Card";
var CardHeader = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2("div", { ref, className: cn("ev-card__header", className), ...props }));
CardHeader.displayName = "CardHeader";
var CardTitle = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2("h3", { ref, className: cn("ev-card__title", className), ...props }));
CardTitle.displayName = "CardTitle";
var CardBody = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2("div", { ref, className: cn("ev-card__body", className), ...props }));
CardBody.displayName = "CardBody";

// src/components/BandBadge/BandBadge.tsx
import * as React3 from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var LABELS = {
  resilient: "Resilient",
  moderate: "Moderate",
  high: "High",
  critical: "Critical",
  na: "N/A"
};
var BandBadge = React3.forwardRef(
  ({ band, label, className, ...props }, ref) => /* @__PURE__ */ jsx3(
    "span",
    {
      ref,
      className: cn("ev-band", `ev-band--${band}`, className),
      ...props,
      children: label ?? LABELS[band]
    }
  )
);
BandBadge.displayName = "BandBadge";
function bandForScore(score) {
  if (score >= 65) return "resilient";
  if (score >= 45) return "moderate";
  if (score >= 25) return "high";
  return "critical";
}

// src/components/ScoreDisplay/ScoreDisplay.tsx
import * as React4 from "react";
import { jsx as jsx4, jsxs } from "react/jsx-runtime";
var ScoreDisplay = React4.forwardRef(
  ({ score, outOf, band, showBand = true, className, ...props }, ref) => {
    const resolved = band ?? bandForScore(score);
    return /* @__PURE__ */ jsxs("div", { ref, className: cn("ev-score", className), ...props, children: [
      /* @__PURE__ */ jsxs("span", { className: "ev-score__value", children: [
        score,
        outOf != null && /* @__PURE__ */ jsxs("span", { className: "ev-score__outof", children: [
          "/",
          outOf
        ] })
      ] }),
      showBand && /* @__PURE__ */ jsx4(BandBadge, { band: resolved })
    ] });
  }
);
ScoreDisplay.displayName = "ScoreDisplay";

// src/components/StrataMark/StrataMark.tsx
import * as React5 from "react";
import { jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
var StrataMark = React5.forwardRef(
  ({ size = 40, mono = false, title = "Evidura", className, ...props }, ref) => /* @__PURE__ */ jsxs2(
    "svg",
    {
      ref,
      width: size,
      height: size,
      viewBox: "0 0 200 200",
      xmlns: "http://www.w3.org/2000/svg",
      role: "img",
      "aria-label": title || void 0,
      "aria-hidden": title ? void 0 : true,
      className: cn("ev-mark", className),
      ...props,
      children: [
        title && /* @__PURE__ */ jsx5("title", { children: title }),
        /* @__PURE__ */ jsx5(
          "rect",
          {
            x: "40",
            y: "58",
            width: "120",
            height: "18",
            rx: "9",
            fill: mono ? "currentColor" : "var(--evidura-signal)"
          }
        ),
        /* @__PURE__ */ jsx5("rect", { x: "40", y: "91", width: "84", height: "18", rx: "9", fill: "currentColor" }),
        /* @__PURE__ */ jsx5("rect", { x: "40", y: "124", width: "120", height: "18", rx: "9", fill: "currentColor" })
      ]
    }
  )
);
StrataMark.displayName = "StrataMark";

// src/components/ValidationSignalCard/ValidationSignalCard.tsx
import * as React6 from "react";
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
function ExternalLinkIcon() {
  return /* @__PURE__ */ jsxs3(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx6("path", { d: "M15 3h6v6" }),
        /* @__PURE__ */ jsx6("path", { d: "M10 14 21 3" }),
        /* @__PURE__ */ jsx6("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" })
      ]
    }
  );
}
var ValidationSignalCard = React6.forwardRef(({ signal, className, ...props }, ref) => {
  if (!signal) return null;
  const {
    source = "Unknown source",
    excerpt = "",
    url,
    dateDiscovered,
    credibilityScore = 0
  } = signal;
  const clamped = Math.max(0, Math.min(5, Math.round(credibilityScore)));
  const stars = "\u2605".repeat(clamped) + "\u2606".repeat(5 - clamped);
  const formattedDate = dateDiscovered ? new Date(dateDiscovered).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }) : null;
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      ref,
      className: cn("ev-signal", className),
      "aria-label": `Validation from ${source}, credibility ${clamped} out of 5`,
      ...props,
      children: [
        /* @__PURE__ */ jsxs3("div", { className: "ev-signal__head", children: [
          /* @__PURE__ */ jsxs3("div", { className: "ev-signal__meta", children: [
            /* @__PURE__ */ jsx6("p", { className: "ev-signal__source", children: source }),
            /* @__PURE__ */ jsx6("div", { className: "ev-signal__stars", "aria-hidden": "true", children: stars })
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "ev-signal__aside", children: [
            formattedDate && /* @__PURE__ */ jsx6("span", { className: "ev-signal__date", children: formattedDate }),
            url && /* @__PURE__ */ jsx6(
              "a",
              {
                href: url,
                target: "_blank",
                rel: "noreferrer",
                className: "ev-signal__link",
                "aria-label": `Open source: ${source}`,
                children: /* @__PURE__ */ jsx6(ExternalLinkIcon, {})
              }
            )
          ] })
        ] }),
        excerpt && /* @__PURE__ */ jsx6("p", { className: "ev-signal__excerpt", children: excerpt })
      ]
    }
  );
});
ValidationSignalCard.displayName = "ValidationSignalCard";
export {
  BandBadge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  ScoreDisplay,
  StrataMark,
  ValidationSignalCard,
  bandForScore
};
//# sourceMappingURL=index.js.map