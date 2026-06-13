import React from 'react';
import { cn } from '../lib/cn';

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

/** Empty-state block — icon, message and optional action. */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 px-6 py-12 text-center',
        className,
      )}
      {...rest}
    >
      {icon && (
        <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-xedo-50 text-primary">
          {icon}
        </div>
      )}
      <h3 className="m-0 font-heading text-xl font-bold text-sand-900">
        {title}
      </h3>
      {description && (
        <p className="m-0 max-w-[420px] font-body text-base text-sand-600">
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
