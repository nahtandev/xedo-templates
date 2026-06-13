'use client';

import { useRouter } from 'next/navigation';
import { Button, type ButtonProps } from '@xedo/ui';

export interface NavButtonProps extends ButtonProps {
  href: string;
}

/** DS Button that navigates with the App Router on click. */
export function NavButton({ href, ...props }: NavButtonProps) {
  const router = useRouter();
  return <Button {...props} onClick={() => router.push(href)} />;
}
