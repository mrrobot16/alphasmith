type P = { className?: string };
const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const PhoneIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);
export const ShieldIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
export const KeyIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="7.5" cy="15.5" r="4.5" />
    <path d="m10.7 12.3 9.3-9.3M16 7l3 3M14 9l2 2" />
  </svg>
);
export const DocIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 9h8M8 13h8M8 17h4" />
  </svg>
);
export const AwardIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="9" r="5" />
    <path d="m9 13.5-1.5 7.5 4.5-2.5 4.5 2.5L15 13.5" />
  </svg>
);
export const GarageIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3 21V9l9-5 9 5v12" />
    <path d="M7 21v-8h10v8M7 15h10M7 18h10" />
  </svg>
);
export const GateIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3 21V6M21 21V6M3 9h18M3 17h18M8 9v8M12 9v8M16 9v8" />
  </svg>
);
export const AccessIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="6" y="3" width="12" height="18" rx="2" />
    <path d="M10 7h4M9.5 12h.01M12 12h.01M14.5 12h.01M9.5 15.5h.01M12 15.5h.01M14.5 15.5h.01" />
  </svg>
);
export const WarnIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);
export const CheckIcon = ({ className }: P) => (
  <svg {...base} width={16} height={16} strokeWidth={2.2} className={className}>
    <path d="m5 12 5 5 9-10" />
  </svg>
);
export const MenuIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const CloseIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const serviceIcons = {
  key: KeyIcon,
  garage: GarageIcon,
  gate: GateIcon,
  access: AccessIcon,
} as const;
