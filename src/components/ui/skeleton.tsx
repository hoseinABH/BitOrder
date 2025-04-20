import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('dark:bg-secondary bg-primary/15 animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };
