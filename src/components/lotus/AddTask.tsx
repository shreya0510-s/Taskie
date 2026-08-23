import { useState } from "react";
import { Plus, Star } from "lucide-react";
import type { TaskList } from "@/lib/lotus-types";
import { cn } from "@/lib/utils";

type Props = {
  lists: TaskList[];
  defaultDate: string;
  onAdd: (input: {
    title: string;
    listId: string | null;
    dueDate: string | null;
    important: boolean;
  }) => void;
};

export function AddTask({ lists, defaultDate, onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [listId, setListId] = useState<string>("");
  const [dueDate, setDueDate] = useState(defaultDate);
  const [important, setImportant] = useState(false);

  const submit = () => {
    if (!title.trim()) return;
    onAdd({
      title,
      listId: listId || null,
      dueDate: dueDate || null,
      important,
    });
    setTitle("");
    setImportant(false);
  };

  return (
    <div className="panel-card p-4">
      <div className="flex items-center gap-3">
        <input
          id="new-task-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="What do you want to do?"
          aria-label="Task title"
          className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="button"
          onClick={() => setImportant((v) => !v)}
          aria-pressed={important}
          aria-label="Mark as important"
          className={cn(
            "rounded-lg p-2 transition-colors",
            important ? "text-primary" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Star className="h-4 w-4" fill={important ? "currentColor" : "none"} strokeWidth={1.7} />
        </button>
        <button
          type="button"
          onClick={submit}
          className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Add Task
        </button>
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
        <select
          value={listId}
          onChange={(e) => setListId(e.target.value)}
          aria-label="List"
          className="rounded-lg border border-border bg-input/40 px-2.5 py-1.5 text-xs text-muted-foreground outline-none focus:border-primary/60"
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
          className="rounded-lg border border-border bg-input/40 px-2.5 py-1.5 text-xs text-muted-foreground outline-none focus:border-primary/60"
        />
      </div>
    </div>
  );
}
