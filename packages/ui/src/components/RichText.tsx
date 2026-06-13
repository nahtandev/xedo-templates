import React from 'react';
import { cn } from '../lib/cn';

export interface RichTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * HTML produced by the merchant's TipTap editor (product description /
   * product sheet). Rendered as-is — the caller is responsible for trusting the
   * source (Xedo serves first-party merchant content).
   */
  html: string;
  className?: string;
}

/**
 * Renders TipTap rich-text HTML, styled to the Xedo design system. Shared by
 * every template so product descriptions/sheets look consistent.
 *
 * The descendant (`[&_…]`) rules below do the styling; they are scanned via the
 * `@source` directive each template points at packages/ui.
 */
export function RichText({ html, className, ...rest }: RichTextProps) {
  return (
    <div
      className={cn(
        'max-w-none font-body text-base leading-relaxed text-sand-700',
        '[&_p]:my-3 [&_p]:leading-relaxed',
        '[&_ul]:my-3 [&_ul]:ml-6 [&_ul]:list-disc [&_ol]:my-3 [&_ol]:ml-6 [&_ol]:list-decimal [&_li]:my-1',
        "[&_ul[data-type='taskList']]:ml-0 [&_ul[data-type='taskList']]:list-none",
        "[&_li[data-type='taskItem']]:flex [&_li[data-type='taskItem']]:items-start [&_li[data-type='taskItem']]:gap-2",
        '[&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-sand-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-sand-600',
        '[&_h1]:mb-2 [&_h1]:mt-5 [&_h1]:font-heading [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-sand-900',
        '[&_h2]:mb-2 [&_h2]:mt-5 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-sand-900',
        '[&_h3]:mb-1 [&_h3]:mt-4 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-sand-900',
        '[&_h4]:mb-1 [&_h4]:mt-3 [&_h4]:font-heading [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-sand-900',
        '[&_h5]:mb-1 [&_h5]:mt-2 [&_h5]:font-heading [&_h5]:text-sm [&_h5]:font-bold [&_h5]:text-sand-900',
        '[&_h6]:mb-1 [&_h6]:mt-2 [&_h6]:font-heading [&_h6]:text-sm [&_h6]:font-bold [&_h6]:text-sand-900',
        '[&_hr]:my-5 [&_hr]:border-t [&_hr]:border-sand-200',
        '[&_a]:text-primary [&_a]:underline [&_a]:cursor-pointer hover:[&_a]:text-(--color-primary-hover)',
        '[&_strong]:font-bold [&_em]:italic [&_u]:underline [&_s]:line-through',
        '[&_sub]:align-sub [&_sub]:text-xs [&_sup]:align-super [&_sup]:text-xs',
        '[&_code]:rounded [&_code]:bg-sand-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-accent [&_code]:text-sm',
        '[&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm',
        '[&_th]:border [&_th]:border-sand-200 [&_th]:bg-sand-100 [&_th]:p-2 [&_th]:text-left [&_th]:font-semibold',
        '[&_td]:border [&_td]:border-sand-200 [&_td]:p-2',
        '[&_img]:my-4 [&_img]:h-auto [&_img]:rounded-lg',
        "[&_img[data-align='center']]:mx-auto [&_img[data-align='center']]:block",
        "[&_img[data-align='right']]:ml-auto [&_img[data-align='right']]:block",
        "[&_img[data-align='left']]:mr-auto",
        '[&_img:not([data-width])]:max-w-full',
        '[&_iframe]:my-4 [&_iframe]:block [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:max-w-2xl [&_iframe]:rounded-lg',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
      {...rest}
    />
  );
}
