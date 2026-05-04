import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** USD string for display (commas + correct decimal places via Intl). */
export function formatUsd(
  amount: number,
  locale?: string | string[],
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale ?? 'en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: amount >= 1 ? 2 : 6,
    ...options,
  }).format(amount)
}
