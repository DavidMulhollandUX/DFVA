/* @ds-bundle: {"namespace":"EviduraUI","components":[{"name":"BandBadge","sourcePath":"components/general/BandBadge/BandBadge.jsx"},{"name":"Button","sourcePath":"components/general/Button/Button.jsx"},{"name":"Card","sourcePath":"components/general/Card/Card.jsx"},{"name":"CardBody","sourcePath":"components/general/CardBody/CardBody.jsx"},{"name":"CardHeader","sourcePath":"components/general/CardHeader/CardHeader.jsx"},{"name":"CardTitle","sourcePath":"components/general/CardTitle/CardTitle.jsx"},{"name":"ScoreDisplay","sourcePath":"components/general/ScoreDisplay/ScoreDisplay.jsx"},{"name":"StrataMark","sourcePath":"components/general/StrataMark/StrataMark.jsx"},{"name":"ValidationSignalCard","sourcePath":"components/general/ValidationSignalCard/ValidationSignalCard.jsx"}],"sourceHashes":{"components/general/BandBadge/BandBadge.jsx":"cf26a7f89c4e","components/general/BandBadge/BandBadge.d.ts":"73658e0d25e4","components/general/BandBadge/BandBadge.prompt.md":"9ea1249225b3","components/general/Button/Button.jsx":"31a016b477c9","components/general/Button/Button.d.ts":"883e8051c1f8","components/general/Button/Button.prompt.md":"bd2917d181f3","components/general/Card/Card.jsx":"8bd386af9a81","components/general/Card/Card.d.ts":"632b53366958","components/general/Card/Card.prompt.md":"5362b9c154a5","components/general/CardBody/CardBody.jsx":"258f3a685853","components/general/CardBody/CardBody.d.ts":"3fba0b932561","components/general/CardBody/CardBody.prompt.md":"0dfe7c6cfaf3","components/general/CardHeader/CardHeader.jsx":"bc54aeee4423","components/general/CardHeader/CardHeader.d.ts":"0797668998bf","components/general/CardHeader/CardHeader.prompt.md":"5f1992664807","components/general/CardTitle/CardTitle.jsx":"ff39dec3bb9b","components/general/CardTitle/CardTitle.d.ts":"427e910da0a0","components/general/CardTitle/CardTitle.prompt.md":"fcb67d9bf231","components/general/ScoreDisplay/ScoreDisplay.jsx":"5ff500a5b3ff","components/general/ScoreDisplay/ScoreDisplay.d.ts":"0f8f7edf17b8","components/general/ScoreDisplay/ScoreDisplay.prompt.md":"39a1ed12b8eb","components/general/StrataMark/StrataMark.jsx":"f2eec7287993","components/general/StrataMark/StrataMark.d.ts":"57c6b0d05287","components/general/StrataMark/StrataMark.prompt.md":"0bfb95d152ff","components/general/ValidationSignalCard/ValidationSignalCard.jsx":"f461ac46b683","components/general/ValidationSignalCard/ValidationSignalCard.d.ts":"73483cf50eab","components/general/ValidationSignalCard/ValidationSignalCard.prompt.md":"970512518b16"},"inlinedExternals":["class-variance-authority","clsx"],"builtBy":"cc-design-sync"} */
"use strict";
var EviduraUI = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <define:import.meta.env>
  var init_define_import_meta_env = __esm({
    "<define:import.meta.env>"() {
    }
  });

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports, module) {
      init_define_import_meta_env();
      var R = window.React;
      function np(p, k) {
        var o = {};
        for (var x in p) if (x !== "children") o[x] = p[x];
        if (k !== void 0) o.key = k;
        return o;
      }
      function jsx7(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs4(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx7;
      module.exports.jsxs = jsxs4;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs4 : jsx7)(t, p, k);
      };
      module.exports.Fragment = R.Fragment;
    }
  });

  // dist/index.js
  var index_exports = {};
  __export(index_exports, {
    BandBadge: () => BandBadge,
    Button: () => Button,
    Card: () => Card,
    CardBody: () => CardBody,
    CardHeader: () => CardHeader,
    CardTitle: () => CardTitle,
    ScoreDisplay: () => ScoreDisplay,
    StrataMark: () => StrataMark,
    ValidationSignalCard: () => ValidationSignalCard,
    bandForScore: () => bandForScore
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // node_modules/class-variance-authority/dist/index.mjs
  init_define_import_meta_env();

  // node_modules/clsx/dist/clsx.mjs
  init_define_import_meta_env();
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }

  // node_modules/class-variance-authority/dist/index.mjs
  var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
  var cx = clsx;
  var cva = (base, config) => (props) => {
    var _config_compoundVariants;
    if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    const { variants, defaultVariants } = config;
    const getVariantClassNames = Object.keys(variants).map((variant) => {
      const variantProp = props === null || props === void 0 ? void 0 : props[variant];
      const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
      if (variantProp === null) return null;
      const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
      return variants[variant][variantKey];
    });
    const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
      let [key, value] = param;
      if (value === void 0) {
        return acc;
      }
      acc[key] = value;
      return acc;
    }, {});
    const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
      let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
      return Object.entries(compoundVariantOptions).every((param2) => {
        let [key, value] = param2;
        return Array.isArray(value) ? value.includes({
          ...defaultVariants,
          ...propsWithoutUndefined
        }[key]) : {
          ...defaultVariants,
          ...propsWithoutUndefined
        }[key] === value;
      }) ? [
        ...acc,
        cvClass,
        cvClassName
      ] : acc;
    }, []);
    return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  };

  // dist/index.js
  var import_jsx_runtime = __toESM(require_react_shim(), 1);
  var React2 = __toESM(require_react_shim(), 1);
  var import_jsx_runtime2 = __toESM(require_react_shim(), 1);
  var React3 = __toESM(require_react_shim(), 1);
  var import_jsx_runtime3 = __toESM(require_react_shim(), 1);
  var React4 = __toESM(require_react_shim(), 1);
  var import_jsx_runtime4 = __toESM(require_react_shim(), 1);
  var React5 = __toESM(require_react_shim(), 1);
  var import_jsx_runtime5 = __toESM(require_react_shim(), 1);
  var React6 = __toESM(require_react_shim(), 1);
  var import_jsx_runtime6 = __toESM(require_react_shim(), 1);
  function cn(...inputs) {
    return clsx(inputs);
  }
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
    ({ className, variant, size, type = "button", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  var Card = React2.forwardRef(
    ({ className, interactive, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "div",
      {
        ref,
        className: cn("ev-card", interactive && "ev-card--interactive", className),
        ...props
      }
    )
  );
  Card.displayName = "Card";
  var CardHeader = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ref, className: cn("ev-card__header", className), ...props }));
  CardHeader.displayName = "CardHeader";
  var CardTitle = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { ref, className: cn("ev-card__title", className), ...props }));
  CardTitle.displayName = "CardTitle";
  var CardBody = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ref, className: cn("ev-card__body", className), ...props }));
  CardBody.displayName = "CardBody";
  var LABELS = {
    resilient: "Resilient",
    moderate: "Moderate",
    high: "High",
    critical: "Critical",
    na: "N/A"
  };
  var BandBadge = React3.forwardRef(
    ({ band, label, className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
  var ScoreDisplay = React4.forwardRef(
    ({ score, outOf, band, showBand = true, className, ...props }, ref) => {
      const resolved = band ?? bandForScore(score);
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { ref, className: cn("ev-score", className), ...props, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "ev-score__value", children: [
          score,
          outOf != null && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "ev-score__outof", children: [
            "/",
            outOf
          ] })
        ] }),
        showBand && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(BandBadge, { band: resolved })
      ] });
    }
  );
  ScoreDisplay.displayName = "ScoreDisplay";
  var StrataMark = React5.forwardRef(
    ({ size = 40, mono = false, title = "Evidura", className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
          title && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("title", { children: title }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { x: "40", y: "91", width: "84", height: "18", rx: "9", fill: "currentColor" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { x: "40", y: "124", width: "120", height: "18", rx: "9", fill: "currentColor" })
        ]
      }
    )
  );
  StrataMark.displayName = "StrataMark";
  function ExternalLinkIcon() {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M15 3h6v6" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M10 14 21 3" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" })
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
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        ref,
        className: cn("ev-signal", className),
        "aria-label": `Validation from ${source}, credibility ${clamped} out of 5`,
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "ev-signal__head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "ev-signal__meta", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "ev-signal__source", children: source }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "ev-signal__stars", "aria-hidden": "true", children: stars })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "ev-signal__aside", children: [
              formattedDate && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "ev-signal__date", children: formattedDate }),
              url && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                "a",
                {
                  href: url,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "ev-signal__link",
                  "aria-label": `Open source: ${source}`,
                  children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ExternalLinkIcon, {})
                }
              )
            ] })
          ] }),
          excerpt && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "ev-signal__excerpt", children: excerpt })
        ]
      }
    );
  });
  ValidationSignalCard.displayName = "ValidationSignalCard";
  return __toCommonJS(index_exports);
})();
window.EviduraUI=EviduraUI.__dsMainNs?Object.assign({},EviduraUI,EviduraUI.__dsMainNs,{__dsMainNs:undefined}):EviduraUI;
