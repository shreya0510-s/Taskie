import { Bell, Flower2, Plus } from "lucide-react";
import { MiniCalendar } from "./MiniCalendar";

type Props = {
  stats: { total: number; completed: number; pending: number };
  selectedDate: string | null;
  onSelectDate: (key: string | null) => void;
  markedDates: Set<string>;
  onAddTask: () => void;
  onAddReminder: () => void;
};

export function RightPanel({
  stats,
  selectedDate,
  onSelectDate,
  markedDates,
  onAddTask,
  onAddReminder,
}: Props) {
  return (
    <aside className="flex h-screen w-80 shrink-0 flex-col gap-4 overflow-y-auto border-l border-border bg-surface px-5 py-6">
      <section className="panel-card p-5">
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          Overview
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { label: "Total", value: stats.total },
            { label: "Completed", value: stats.completed },
            { label: "Pending", value: stats.pending },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-accent/40 py-3">
              <div className="text-xl font-semibold tabular-nums">{s.value}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel-card relative overflow-hidden p-5">
        <Flower2
          className="pointer-events-none absolute -right-3 -top-3 h-20 w-20 text-primary/10"
          strokeWidth={1}
        />
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          Today&apos;s Focus
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground/90">
          &ldquo;Discipline is choosing between what you want now and what you want
          most.&rdquo;
        </p>
      </section>

      <MiniCalendar
        selected={selectedDate}
        onSelect={onSelectDate}
        markedDates={markedDates}
      />

      <section className="panel-card p-5">
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          Quick Actions
        </h2>
        <div className="mt-3 space-y-2">
          <button
            type="button"
            onClick={onAddTask}
            className="flex w-full items-center gap-2 rounded-xl bg-primary/15 px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-primary/25"
          >
            <Plus className="h-4 w-4" strokeWidth={1.8} />
            Add Task
          </button>
          <button
            type="button"
            onClick={onAddReminder}
            className="flex w-full items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
          >
            <Bell className="h-4 w-4" strokeWidth={1.8} />
            Add Reminder
          </button>
        </div>
      </section>
    </aside>
  );
}
