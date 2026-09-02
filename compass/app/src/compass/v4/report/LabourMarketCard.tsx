import { ReportMarkdownCard } from "../../v2/components/ReportMarkdownCard";
import {
  CARD_MARKET_LABEL,
  CARD_MARKET_SUBTITLE,
  CARD_MARKET_TITLE,
} from "./copy";

/** The market intelligence body. Both report bodies — research degree and
 *  coursework — render the same card, so it is declared once. */
export function LabourMarketCard({ code }: { code: string }) {
  return (
    <ReportMarkdownCard
      slug={`dfva-market-${code}`}
      label={CARD_MARKET_LABEL}
      title={CARD_MARKET_TITLE}
      subtitle={CARD_MARKET_SUBTITLE}
    />
  );
}
