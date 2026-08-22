import { X } from "lucide-react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router";
import { brand } from "../../branding/brandConfig";

const DISMISS_KEY = "evidura-prototype-banner-dismissed";

function wasDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISS_KEY) === "true";
  } catch {
    return false;
  }
}

export default function PrototypeBanner() {
  const [dismissed, setDismissed] = useState(wasDismissed);

  if (dismissed) {
    return null;
  }

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // Private browsing — banner just reappears next visit.
    }
  };

  return (
    <div
      role="status"
      className="relative w-full border-b border-amber-300/60 bg-amber-50 px-10 py-2 text-center text-sm text-amber-950 dark:border-amber-400/30 dark:bg-amber-950/40 dark:text-amber-100"
    >
      <span className="font-semibold">Working prototype.</span>{" "}
      <span>
        {brand.name} is under active development; scores and reports are
        illustrative and may change. Start with the{" "}
        <ReactRouterLink
          to="/reports"
          className="font-medium underline underline-offset-2 hover:opacity-80"
        >
          sample reports
        </ReactRouterLink>{" "}
        or the{" "}
        <ReactRouterLink
          to="/insights"
          className="font-medium underline underline-offset-2 hover:opacity-80"
        >
          insights dashboard
        </ReactRouterLink>
        .
      </span>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss prototype notice"
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 transition-colors hover:bg-amber-200/60 dark:hover:bg-amber-900/60"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
