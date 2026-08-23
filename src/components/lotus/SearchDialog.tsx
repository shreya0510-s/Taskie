import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Task, TaskList } from "@/lib/lotus-types";
import { formatDueLabel } from "@/lib/date-utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tasks: Task[];
  lists: TaskList[];
};

export function SearchDialog({ open, onOpenChange, tasks, lists }: Props) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return tasks
      .filter((t) => !t.deleted)
      .filter((t) => {
        const list = lists.find((l) => l.id === t.listId);
        return (
          t.title.toLowerCase().includes(q) ||
          (list?.name.toLowerCase().includes(q) ?? false)
        );
      });
  }, [query, tasks, lists]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Search tasks</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-input/40 px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by task or category…"
            aria-label="Search tasks"
            className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="max-h-72 space-y-1.5 overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No tasks found.
            </p>
          )}
          {results.map((t) => {
            const list = lists.find((l) => l.id === t.listId);
            return (
              <div
                key={t.id}
                className="flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm"
              >
                <span className="flex-1 truncate">{t.title}</span>
                {list && (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: list.color }}
                    />
                    {list.name}
                  </span>
                )}
                {t.dueDate && (
                  <span className="text-xs text-muted-foreground">
                    {formatDueLabel(t.dueDate)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
