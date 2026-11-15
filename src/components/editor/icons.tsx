import type { ReactNode, SVGProps } from 'react';

export type IconProps = SVGProps<SVGSVGElement>;

/** 24 × 24 line icons drawn for this app; decorative, so hidden from assistive technology. */
function Icon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export function TelescopeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <g transform="rotate(-27 11 10.25)">
        <rect x="4" y="8" width="13.6" height="4.5" rx="1.2" />
        <rect x="17.6" y="7.25" width="3" height="6" rx="1" />
        <path d="M4 10.25H2.2" />
      </g>
      <path d="M11.6 12.6 7.6 21M11.6 12.6 15.6 21" />
    </Icon>
  );
}

export function ColorIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 12q2.5-7 5 0t5 0 5 0 5 0" />
    </Icon>
  );
}

export function LightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" />
    </Icon>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.5 20.5 8 12 12.5 3.5 8Z" />
      <path d="M3.5 12 12 16.5 20.5 12" />
      <path d="M3.5 16 12 20.5 20.5 16" />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon strokeWidth={2.4} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Icon>
  );
}
