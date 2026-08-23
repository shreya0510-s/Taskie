import { useState } from "react";
import {
  Sun,
  ListChecks,
  Star,
  CalendarDays,
  CheckCircle2,
  Trash2,
  Plus,
  Pencil,
  X,
} from "lucide-react";
import type { Task, TaskList, ViewKey } from "@/lib/lotus-types";
import { LIST_COLORS } from "@/lib/lotus-types";
import { cn } from "@/lib/utils";
import { useLotus } from "@/lib/lotus-store";

const NAV: { key: ViewKey; label: string; icon: typeof Sun }[] = [
  { key: "my-day", label: "My Day", icon: Sun },
  { key: "all", label: "All Tasks", icon: ListChecks },
  { key: "important", label: "Important", icon: Star },
  { key: "planned", label: "Planned", icon: CalendarDays },
  { key: "completed", label: "Completed", icon: CheckCircle2 },
  { key: "trash", label: "Trash", icon: Trash2 },
];

type Props = {
  view: ViewKey;
  onViewChange: (v: ViewKey) => void;
  activeListId: string | null;
  onListChange: (id: string | null) => void;
  lists: TaskList[];
  tasks: Task[];
};

export function Sidebar({
  view,
  onViewChange,
  activeListId,
  onListChange,
  lists,
  tasks,
}: Props) {
  const { addList, renameList, deleteList } = useLotus();
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const countFor = (listId: string) =>
    tasks.filter((t) => !t.deleted && !t.completed && t.listId === listId).length;

  const submitNew = () => {
    if (!newName.trim()) return;
    addList(newName, LIST_COLORS[lists.length % LIST_COLORS.length] ?? LIST_COLORS[0]!);
    setNewName("");
    setAdding(false);
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
          <CheckCircle2 className="h-4 w-4" strokeWidth={1.8} />
        </span>
        <span className="text-[15px] font-semibold tracking-tight">Lotus Tasks</span>
      </div>

      <nav className="space-y-1 px-3" aria-label="Views">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = view === item.key && !activeListId;
          return (
            <button
              key={item.key}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() => {
                onListChange(null);
                onViewChange(item.key);
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary/15 text-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.7} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-7 flex items-center justify-between px-6 pb-2">
        <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          Lists
        </span>
        <button
          type="button"
          aria-label="Add list"
          onClick={() => setAdding(true)}
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-3">
        {lists.map((list) => {
          const active = activeListId === list.id;
          const editing = editingId === list.id;
          return (
            <div
              key={list.id}
              className={cn(
                "group flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary/15 text-foreground"
                  : "text-muted-foreground hover:bg-accent/50",
              )}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: list.color }}
              />
              {editing ? (
                <input
                  autoFocus
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={() => {
                    renameList(list.id, editName);
                    setEditingId(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      renameList(list.id, editName);
                      setEditingId(null);
                    }
                    if (e.key === "Escape") setEditingId(null);
                  }}
                  className="w-full rounded-md bg-input/60 px-1.5 py-0.5 text-sm text-foreground outline-none"
                  aria-label="List name"
                />
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      onListChange(list.id);
                    }}
                    className="flex-1 truncate text-left hover:text-foreground"
                  >
                    {list.name}
                  </button>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {countFor(list.id)}
                  </span>
                  <button
                    type="button"
                    aria-label={`Rename ${list.name}`}
                    onClick={() => {
                      setEditingId(list.id);
                      setEditName(list.name);
                    }}
                    className="hidden rounded p-0.5 hover:text-foreground group-hover:block"
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${list.name}`}
                    onClick={() => {
                      deleteList(list.id);
                      if (activeListId === list.id) onListChange(null);
                    }}
                    className="hidden rounded p-0.5 hover:text-destructive group-hover:block"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </>
              )}
            </div>
          );
        })}

        {adding && (
          <input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={submitNew}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitNew();
              if (e.key === "Escape") {
                setAdding(false);
                setNewName("");
              }
            }}
            placeholder="List name"
            aria-label="New list name"
            className="mx-1 w-[calc(100%-0.5rem)] rounded-xl border border-border bg-input/40 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/60"
          />
        )}
      </div>

      <div className="border-t border-border p-3">
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
        >
          <Plus className="h-4 w-4" strokeWidth={1.7} />
          Add New List
        </button>
      </div>
    </aside>
  );
}
