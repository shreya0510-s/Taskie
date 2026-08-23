import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toKey, todayKey } from "@/lib/date-utils";

type Props = {
  selected: string | null;
  onSelect: (key: string | null) => void;
  markedDates: Set<string>;
};

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export function MiniCalendar({ selected, onSelect, markedDates }: Props) {
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = todayKey();

  const cells: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="panel-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium">
          {cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </span>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground">
        {DAYS.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <span key={`e${i}`} />;
          const key = toKey(new Date(year, month, day));
          const isToday = key === today;
          const isSelected = key === selected;
          return (
            <button
              key={key}
              type="button"
              aria-label={key}
              aria-pressed={isSelected}
              onClick={() => onSelect(isSelected ? null : key)}
              className={cn(
                "relative flex h-7 w-full items-center justify-center rounded-lg text-xs transition-colors",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : isToday
                    ? "bg-primary/20 text-foreground"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
              )}
            >
              {day}
              {markedDates.has(key) && !isSelected && (
                <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-primary/80" />
              )}
            </button>
          );
        })}
      </div>

      {selected && (
        <button
          type="button"
          onClick={() => onSelect(null)}
          className="mt-3 w-full rounded-lg border border-border py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Clear date filter
        </button>
      )}
    </div>
  );
}
