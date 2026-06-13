import React from 'react';

type IconProps = {
  size?: number;
  fill?: string;
  sw?: number;
  className?: string;
};

const make =
  (paths: React.ReactNode, defaultSw = 2) =>
  ({ size = 20, fill = 'none', sw, className }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={sw ?? defaultSw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths}
    </svg>
  );

export const Icons = {
  Cart: make(
    <>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
    </>,
  ),
  Back: make(<path d="M19 12H5M12 19l-7-7 7-7" />),
  Close: make(<path d="M18 6L6 18M6 6l12 12" />),
  Menu: make(<path d="M3 6h18M3 12h18M3 18h18" />),
  Plus: make(<path d="M12 5v14M5 12h14" />),
  Minus: make(<path d="M5 12h14" />),
  Trash: make(
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />,
  ),
  Check: make(<path d="M20 6L9 17l-5-5" />, 2.4),
  Arrow: make(<path d="M5 12h14M12 5l7 7-7 7" />),
  Clock: make(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>,
  ),
  Pin: make(
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="2.6" />
    </>,
  ),
  Phone: make(
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
  ),
  Store: make(
    <>
      <path d="M3 9l1.5-5h15L21 9M4 9v11h16V9M4 9h16" />
      <path d="M9 20v-6h6v6" />
    </>,
  ),
  Bag: make(
    <>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
    </>,
  ),
  Truck: make(
    <>
      <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </>,
  ),
  Shield: make(<path d="M12 2l8 3v6c0 5-3.4 8.5-8 11-4.6-2.5-8-6-8-11V5z" />),
  // Food category icons.
  Flame: make(
    <path d="M12 2c1 4 4 5 4 9a4 4 0 0 1-8 0c0-1 .4-2 1-2.6C9 11 9 13 9 13s2-1 1.5-4C13 6 12 4 12 2z" />,
  ),
  Leaf: make(
    <>
      <path d="M11 20A7 7 0 0 1 4 13c0-6 7-11 16-11 0 9-5 16-9 18z" />
      <path d="M4 21c2-6 6-9 11-10" />
    </>,
  ),
  Bowl: make(
    <>
      <path d="M3 11h18a9 9 0 0 1-18 0z" />
      <path d="M12 11V7M12 7c0-2 1.5-3 1.5-3M12 7c0-2-1.5-3-1.5-3" />
    </>,
  ),
  Cup: make(
    <>
      <path d="M5 8h12v4a6 6 0 0 1-12 0z" />
      <path d="M17 9h2a2 2 0 0 1 0 4h-2M5 21h12" />
    </>,
  ),
  Cookie: make(
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="15" r="1" fill="currentColor" stroke="none" />
    </>,
  ),
};

export type IconName = keyof typeof Icons;
