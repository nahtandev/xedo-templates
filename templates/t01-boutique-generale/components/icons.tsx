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
  Search: make(
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>,
  ),
  Heart: make(
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z" />,
  ),
  User: make(
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>,
  ),
  Back: make(<path d="M19 12H5M12 19l-7-7 7-7" />),
  Close: make(<path d="M18 6L6 18M6 6l12 12" />),
  Plus: make(<path d="M12 5v14M5 12h14" />),
  Minus: make(<path d="M5 12h14" />),
  Trash: make(
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />,
  ),
  Truck: make(
    <>
      <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </>,
  ),
  Shield: make(<path d="M12 2l8 3v6c0 5-3.4 8.5-8 11-4.6-2.5-8-6-8-11V5z" />),
  Leaf: make(
    <>
      <path d="M11 20A7 7 0 0 1 4 13c0-6 7-11 16-11 0 9-5 16-9 18z" />
      <path d="M4 21c2-6 6-9 11-10" />
    </>,
  ),
  Check: make(<path d="M20 6L9 17l-5-5" />, 2.4),
  Star: make(
    <path d="M12 2l3 6.9 7.5.6-5.7 4.9 1.8 7.3L12 17.8 5.1 21.7l1.8-7.3L1.2 9.5 8.7 8.9z" />,
  ),
  Arrow: make(<path d="M5 12h14M12 5l7 7-7 7" />),
};
