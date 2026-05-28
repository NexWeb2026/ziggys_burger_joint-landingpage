import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/siteConfig";
import type { CSSProperties, SyntheticEvent } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createImagePlaceholder(label: string, width = 720, height = 480) {
  const bg = siteConfig.colors.ui.panelAlt;
  const fg = siteConfig.colors.ui.text;
  const escaped = encodeURIComponent(label);
  return `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect width='100%25' height='100%25' fill='${encodeURIComponent(bg)}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Barlow Condensed,Arial,system-ui,sans-serif' font-size='28' fill='${encodeURIComponent(fg)}'%3E${escaped}%3C/text%3E%3C/svg%3E`;
}

export function createGradientPlaceholder(label: string, width = 1200, height = 800) {
  const bg1 = siteConfig.colors.brand.primaryStrong;
  const bg2 = siteConfig.colors.ui.panelAlt;
  const fg = siteConfig.colors.ui.text;
  const escaped = encodeURIComponent(label);
  return `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='${encodeURIComponent(bg1)}'/%3E%3Cstop offset='100%25' stop-color='${encodeURIComponent(bg2)}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Barlow Condensed,Arial,system-ui,sans-serif' font-size='36' fill='${encodeURIComponent(fg)}'%3E${escaped}%3C/text%3E%3C/svg%3E`;
}

export function isFilled(value?: string | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function setImageFallback(
  event: SyntheticEvent<HTMLImageElement>,
  fallbackSrc: string,
) {
  const target = event.currentTarget;
  if (target.dataset.fallbackApplied === "1") return;
  target.dataset.fallbackApplied = "1";
  target.src = fallbackSrc;
}

export function getThemeStyleVars(): CSSProperties {
  const { colors } = siteConfig;
  return {
    "--brand-primary": colors.brand.primary,
    "--brand-primary-soft": colors.brand.primarySoft,
    "--brand-primary-strong": colors.brand.primaryStrong,
    "--brand-on-primary": colors.brand.onPrimary,
    "--ui-page": colors.ui.page,
    "--ui-panel": colors.ui.panel,
    "--ui-panel-alt": colors.ui.panelAlt,
    "--ui-text": colors.ui.text,
    "--ui-text-muted": colors.ui.textMuted,
    "--ui-text-subtle": colors.ui.textSubtle,
    "--ui-border": colors.ui.border,
    "--ui-border-strong": colors.ui.borderStrong,
    "--status-success": colors.status.success,
    "--status-warning": colors.status.warning,
    "--status-danger": colors.status.danger,
  } as CSSProperties;
}
