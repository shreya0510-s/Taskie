import { Check, Star, Trash2, Pencil, RotateCcw } from "lucide-react";
import type { Task, TaskList } from "@/lib/lotus-types";
import { cn } from "@/lib/utils";
import { formatDueLabel } from "@/lib/date-utils";

type Props = {
  task: Task;
  list?: TaskList | undefined;
  showDue?: boolean | undefined;
  onToggle: () => void;
  onStar: () => void;
  onDelete: () => void;
  onRestore?: (() => void) | undefined;
  onEdit: () => void;
  trashed?: boolean | undefined;
};

export function TaskCard({
  task,
  list,
  showDue,
  onToggle,
  onStar,
  onDelete,
  onRestore,
  onEdit,
  trashed,
}: Props) {
  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 transition-all duration-200 hover:border-primary/35 hover:bg-accent/30",
        task.completed && "opacity-55",
      )}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={task.completed}
        aria-label={task.completed ? "Mark as not done" : "Mark as done"}
        onClick={onToggle}
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
          task.completed
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground/50 hover:border-primary",
        )}
      >
        <Check
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            task.completed ? "scale-100" : "scale-0",
          )}
          strokeWidth={3}
        />
      </button>

      <button
        type="button"
        onClick={onEdit}
        className="flex-1 truncate text-left text-sm"
      >
        <span className={cn(task.completed && "line-through text-muted-foreground")}>
          {task.title}
        </span>
      </button>

      {showDue && task.dueDate && (
        <span className="shrink-0 text-xs text-muted-foreground">
          {formatDueLabel(task.dueDate)}
        </span>
      )}

      {list && (
        <span
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
          style={{ borderColor: `color-mix(in oklab, ${list.color} 35%, transparent)` }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: list.color }}
          />
          {list.name}
        </span>
      )}

      {trashed ? (
        <button
          type="button"
          aria-label="Restore task"
          onClick={onRestore}
          className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={1.7} />
        </button>
      ) : (
        <button
          type="button"
          aria-label={task.important ? "Remove from important" : "Mark important"}
          aria-pressed={task.important}
          onClick={onStar}
          className={cn(
            "rounded-md p-1 transition-colors",
            task.important
              ? "text-primary"
              : "text-muted-foreground/60 hover:text-foreground",
          )}
        >
          <Star
            className="h-4 w-4"
            strokeWidth={1.7}
            fill={task.important ? "currentColor" : "none"}
          />
        </button>
      )}

      <button
        type="button"
        aria-label="Edit task"
        onClick={onEdit}
        className="rounded-md p-1 text-muted-foreground/60 opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
      >
        <Pencil className="h-3.5 w-3.5" strokeWidth={1.7} />
      </button>
      <button
        type="button"
        aria-label={trashed ? "Delete permanently" : "Delete task"}
        onClick={onDelete}
        className="rounded-md p-1 text-muted-foreground/60 opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
      >
        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.7} />
      </button>
    </div>
  );
}
