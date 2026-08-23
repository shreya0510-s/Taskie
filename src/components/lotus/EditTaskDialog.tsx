import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { Task, TaskList } from "@/lib/lotus-types";

type Props = {
  task: Task | null;
  lists: TaskList[];
  onClose: () => void;
  onSave: (id: string, patch: Partial<Task>) => void;
};

export function EditTaskDialog({ task, lists, onClose, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [listId, setListId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [important, setImportant] = useState(false);

  useEffect(() => {
    if (!task) return;
    setTitle(task.title);
    setListId(task.listId ?? "");
    setDueDate(task.dueDate ?? "");
    setImportant(task.important);
  }, [task]);

  const save = () => {
    if (!task || !title.trim()) return;
    onSave(task.id, {
      title: title.trim(),
      listId: listId || null,
      dueDate: dueDate || null,
      important,
    });
    onClose();
  };

  return (
    <Dialog open={!!task} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
            aria-label="Task title"
            className="w-full rounded-xl border border-border bg-input/40 px-3 py-2 text-sm outline-none focus:border-primary/60"
          />
          <div className="flex gap-2">
            <select
              value={listId}
              onChange={(e) => setListId(e.target.value)}
              aria-label="List"
              className="flex-1 rounded-xl border border-border bg-input/40 px-3 py-2 text-sm outline-none focus:border-primary/60"
            >
              <option value="">No list</option>
              {lists.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              aria-label="Due date"
              className="flex-1 rounded-xl border border-border bg-input/40 px-3 py-2 text-sm outline-none focus:border-primary/60"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={important}
              onChange={(e) => setImportant(e.target.checked)}
              className="accent-[var(--primary)]"
            />
            Mark as important
          </label>
        </div>
        <DialogFooter>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
