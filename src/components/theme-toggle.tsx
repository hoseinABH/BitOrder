import { type LucideIcon, Monitor, Moon, SunDim } from 'lucide-react';
import { useRef } from 'react';
import { flushSync } from 'react-dom';
// Common components
import { Button } from './ui/button';
// Utilities
import { cn } from '@/lib/utils';
// Hooks
import { type Theme, useTheme } from './theme-provider';

const availableThemes: { key: Theme; icon: LucideIcon }[] = [
  {
    key: 'dark',
    icon: Moon,
  },
  {
    key: 'system',
    icon: Monitor,
  },
  {
    key: 'light',
    icon: SunDim,
  },
];
export default function ThemeToggle({ className }: { className: string }) {
  const { theme, setTheme } = useTheme();
  const ref = useRef<HTMLButtonElement>(null);
  async function toggleTheme(theme: Theme) {
    /**
     * Return early if View Transition API is not supported
     * or user prefers reduced motion
     */
    if (
      !ref.current ||
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(theme);
      return;
    }
    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(theme);
      });
    }).ready;

    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  }

  return (
    <div
      className={cn('bg-background/40 w-fit rounded-3xl border p-1 backdrop-blur-md', className)}
    >
      {availableThemes.map((item) => {
        const ThemeIcon = item.icon;
        return (
          <Button
            key={item.key}
            size="icon"
            variant="ghost"
            className={cn('rounded-full', {
              ['bg-muted']: item.key === theme,
            })}
            onClick={() => toggleTheme(item.key)}
            ref={ref}
          >
            <ThemeIcon className="h-4 w-4" />
            <p className="sr-only">{item.key}</p>
          </Button>
        );
      })}
    </div>
  );
}
