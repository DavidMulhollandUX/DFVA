import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';

declare const button: (props?: ({
    variant?: "primary" | "accent" | "secondary" | "ghost" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
}
/**
 * Evidura button. One accent per view — reserve `variant="accent"` for the
 * single most important action; everything else is `primary` or `secondary`.
 */
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Adds a hover-elevation transition (for clickable cards). */
    interactive?: boolean;
}
/** Surface container — radius md, soft ink shadow, `bg-2`/border chrome. */
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const CardBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

type Band = "resilient" | "moderate" | "high" | "critical" | "na";
interface BandBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    band: Band;
    /** Override the label text (defaults to the band's name). */
    label?: string;
}
/**
 * Durability-rating band pill (Resilient → Critical). Product-UI only — this
 * is the rating scale, never the brand identity. Uses the band-colour tokens,
 * not the brand amber.
 */
declare const BandBadge: React.ForwardRefExoticComponent<BandBadgeProps & React.RefAttributes<HTMLSpanElement>>;
/** Map a 0–100 durability score to its band. */
declare function bandForScore(score: number): Band;

interface ScoreDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Durability score. */
    score: number;
    /** Denominator shown after the score (e.g. 100 or 110). */
    outOf?: number;
    /** Force a band; otherwise derived from the score. */
    band?: Band;
    /** Show the band pill beside the number. */
    showBand?: boolean;
}
/**
 * The durability score, set in the mono face (a score is data), with its band
 * pill beside it. Never colour the number by band — the badge carries the band.
 */
declare const ScoreDisplay: React.ForwardRefExoticComponent<ScoreDisplayProps & React.RefAttributes<HTMLDivElement>>;

interface StrataMarkProps extends React.SVGProps<SVGSVGElement> {
    /** Pixel size (width & height). */
    size?: number;
    /** Render all three bars in one colour (no amber signal bar). */
    mono?: boolean;
    /** Accessible title; set to "" for a decorative mark. */
    title?: string;
}
/**
 * The Evidura primary mark (Strata-E): three stacked pill bars reading as the
 * letter E, strata of evidence, and a score made visible. Ink parts use
 * `currentColor` — set `color` on an ancestor to flip light ↔ dark. The top
 * bar is the amber signal unless `mono`.
 */
declare const StrataMark: React.ForwardRefExoticComponent<Omit<StrataMarkProps, "ref"> & React.RefAttributes<SVGSVGElement>>;

interface ValidationSignal {
    source?: string;
    excerpt?: string;
    url?: string;
    dateDiscovered?: string;
    /** 0–5 credibility rating. */
    credibilityScore?: number;
    relevantClaim?: string;
}
interface ValidationSignalCardProps extends React.HTMLAttributes<HTMLDivElement> {
    signal?: ValidationSignal | null;
}
/**
 * A single piece of market evidence backing an assessment — source, excerpt,
 * credibility (0–5), and a link out. Refactored onto Evidura tokens.
 */
declare const ValidationSignalCard: React.ForwardRefExoticComponent<ValidationSignalCardProps & React.RefAttributes<HTMLDivElement>>;

export { type Band, BandBadge, type BandBadgeProps, Button, type ButtonProps, Card, CardBody, CardHeader, type CardProps, CardTitle, ScoreDisplay, type ScoreDisplayProps, StrataMark, type StrataMarkProps, type ValidationSignal, ValidationSignalCard, type ValidationSignalCardProps, bandForScore };
