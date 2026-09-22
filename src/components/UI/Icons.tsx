import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export function AirbnbLogo({ size = 32, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M16 1c2.008 0 3.463.739 4.382 1.682 1.276 1.308 1.932 3.12 1.932 5.335 0 2.463-.862 4.49-2.56 6.029-1.357 1.232-3.016 2.024-4.752 2.493v1.031c1.736.469 3.395 1.261 4.752 2.493 1.698 1.539 2.56 3.566 2.56 6.029 0 2.215-.656 4.027-1.932 5.335C19.463 30.261 18.008 31 16 31s-3.463-.739-4.382-1.682C10.342 28.01 9.686 26.198 9.686 23.983c0-2.463.862-4.49 2.56-6.029 1.357-1.232 3.016-2.024 4.752-2.493v-1.031c-1.736-.469-3.395-1.261-4.752-2.493-1.698-1.539-2.56-3.566-2.56-6.029 0-2.215.656-4.027 1.932-5.335C12.537 1.739 13.992 1 16 1zm0 2.5c-1.24 0-2.11.44-2.68 1.026-.77.79-1.134 1.95-1.134 3.491 0 1.69.5 3.05 1.48 4.0.98.95 2.2 1.55 3.334 1.9.3.09.6.15.9.2v1.766c-.3.05-.6.11-.9.2-1.134.35-2.354.95-3.334 1.9-.98.95-1.48 2.31-1.48 4 0 1.541.364 2.701 1.134 3.491.57.586 1.44 1.026 2.68 1.026s2.11-.44 2.68-1.026c.77-.79 1.134-1.95 1.134-3.491 0-1.69-.5-3.05-1.48-4-.98-.95-2.2-1.55-3.334-1.9-.3-.09-.6-.15-.9-.2v-1.766c.3-.05.6-.11.9-.2 1.134-.35 2.354-.95 3.334-1.9.98-.95 1.48-2.31 1.48-4 0-1.541-.364-2.701-1.134-3.491C18.11 3.94 17.24 3.5 16 3.5z"
      />
    </svg>
  );
}

export function SearchIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="4" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M20 20l6 6" strokeLinecap="round" />
    </svg>
  );
}

export function HeartIcon({ size = 18, filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" {...props}>
      <path
        d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function ShareIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9" strokeLinecap="round" />
      <path d="M16 4v16M10 10l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ size = 14, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d="M15.094 1.579l-4.028 8.687-9.503 1.35c-1.71.243-2.4 2.367-1.158 3.58l6.874 6.634-1.624 9.364c-.293 1.69 1.476 2.98 2.992 2.18L16 28.53l8.353 4.444c1.516.807 3.285-.49 2.992-2.18l-1.624-9.363 6.874-6.635c1.242-1.212.553-3.336-1.158-3.579l-9.503-1.35-4.028-8.687a2 2 0 0 0-3.612 0z" />
    </svg>
  );
}

export function GridIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d="M1 1h6v6H1V1zm8 0h6v6H9V1zM1 9h6v6H1V9zm8 0h6v6H9V9z" />
    </svg>
  );
}

export function CloseIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true" {...props}>
      <path d="M6 6l20 20M26 6L6 26" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronLeft({ size = 16, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true" {...props}>
      <path d="M20 8l-8 8 8 8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRight({ size = 16, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true" {...props}>
      <path d="M12 8l8 8-8 8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GlobeIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.5 8a6.5 6.5 0 0 1 10.65-5.01 14.3 14.3 0 0 0-2.05 2.26A12.3 12.3 0 0 0 8.5 3.5c-.6 0-1.2.1-1.76.3A6.5 6.5 0 0 1 1.5 8zm6.5 6.5a6.48 6.48 0 0 1-5.01-2.35c.5-.4 1.1-.7 1.76-.9.5 1.5 1.4 2.8 2.5 3.7a6.5 6.5 0 0 1 .75-.45zm1.5-.5c1.1-.9 2-2.2 2.5-3.7.66.2 1.26.5 1.76.9A6.48 6.48 0 0 1 9.5 14.5zM8 9.5c-1.2 0-2.3-.4-3.2-1.1.3-1.3.9-2.5 1.7-3.5.5-.6 1-.9 1.5-1.1.5.2 1 .5 1.5 1.1.8 1 1.4 2.2 1.7 3.5-.9.7-2 1.1-3.2 1.1z" />
    </svg>
  );
}

export function MenuIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d="M2 8h28v2H2V8zm0 7h28v2H2v-2zm0 7h28v2H2v-2z" />
    </svg>
  );
}

export function FlagIcon({ size = 14, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d="M2 1v14h1.5V9.5H14L11 5.5 14 1.5H3.5V1H2z" />
    </svg>
  );
}

export function LaurelLeft({ size = 40, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 48" width={size * 0.6} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20 2c-2 4-6 8-10 10 2 2 4 6 4 10s-2 8-4 10c4 2 8 6 10 10 1-4 2-8 2-12s-1-8-2-12c0-4-1-8-2-12z" opacity="0.9" />
    </svg>
  );
}

export function LaurelRight({ size = 40, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 48" width={size * 0.6} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2c2 4 6 8 10 10-2 2-4 6-4 10s2 8 4 10c-4 2-8 6-10 10-1-4-2-8-2-12s1-8 2-12c0-4 1-8 2-12z" opacity="0.9" />
    </svg>
  );
}
