// Common components
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
// Hooks
import { useState, useCallback, type ReactNode } from 'react';

interface TabItem {
  label: string;
  value: string;
  content: ReactNode;
}

interface SwipeTabsProps {
  value: string;
  onValueChange: (value: string) => void;
  items: TabItem[];
  swipe?: boolean;
  className?: string;
  tabListClassName?: string;
}

const minSwipeDistance = 50;

export function SwipeTabs({
  onValueChange,
  className,
  tabListClassName,
  value,
  items,
  swipe = true,
}: SwipeTabsProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleSwipe = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    const currentIndex = items.findIndex((item) => item.value === value);
    if (isRightSwipe && currentIndex < items.length - 1) {
      onValueChange(items[currentIndex + 1].value);
    } else if (isLeftSwipe && currentIndex > 0) {
      onValueChange(items[currentIndex - 1].value);
    }
  }, [touchStart, touchEnd, value, items, onValueChange]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!swipe) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swipe) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!swipe || !touchStart || !touchEnd) return;
    handleSwipe();
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <Tabs
      value={value}
      onValueChange={onValueChange}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={cn('w-full', className)}
    >
      <TabsList className={cn('w-full', tabListClassName)}>
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) =>
        value === item.value ? (
          <TabsContent key={item.value} value={item.value} forceMount>
            {item.content}
          </TabsContent>
        ) : null,
      )}
    </Tabs>
  );
}
