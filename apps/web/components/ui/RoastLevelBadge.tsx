import { cn, roastLevelLabels } from '@/lib/utils';
import type { RoastLevel } from '@/types';

interface RoastLevelBadgeProps {
  level: RoastLevel;
  showDots?: boolean;
  className?: string;
}

/** Indicador visual del nivel de tostión. Dots = 1-5 círculos de color */
export function RoastLevelBadge({ level, showDots = true, className }: RoastLevelBadgeProps) {
  const dotCount: Record<RoastLevel, number> = {
    LIGHT: 1,
    MEDIUM_LIGHT: 2,
    MEDIUM: 3,
    MEDIUM_DARK: 4,
    DARK: 5,
  };

  const dotColors: Record<RoastLevel, string> = {
    LIGHT: 'bg-amber-300',
    MEDIUM_LIGHT: 'bg-amber-500',
    MEDIUM: 'bg-coffee-500',
    MEDIUM_DARK: 'bg-coffee-700',
    DARK: 'bg-charcoal-800',
  };

  const badgeClass: Record<RoastLevel, string> = {
    LIGHT: 'badge-light',
    MEDIUM_LIGHT: 'badge-medium-light',
    MEDIUM: 'badge-medium',
    MEDIUM_DARK: 'badge-medium-dark',
    DARK: 'badge-dark',
  };

  const filled = dotCount[level];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className={badgeClass[level]}>{roastLevelLabels[level]}</span>
      {showDots && (
        <div className="flex gap-0.5" aria-label={`Nivel de tostión: ${filled} de 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                i < filled ? dotColors[level] : 'bg-coffee-200',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
