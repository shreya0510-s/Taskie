import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bell, Search } from "lucide-react";
import { LotusProvider, useLotus } from "@/lib/lotus-store";
import type { Task, ViewKey } from "@/lib/lotus-types";
import { greeting, todayKey } from "@/lib/date-utils";
import { Sidebar } from "@/components/lotus/Sidebar";
import { AddTask } from "@/components/lotus/AddTask";
import { TaskCard } from "@/components/lotus/TaskCard";
import { TaskSection } from "@/components/lotus/TaskSection";
import { RightPanel } from "@/components/lotus/RightPanel";
import { SearchDialog } from "@/components/lotus/SearchDialog";
import { EditTaskDialog } from "@/components/lotus/EditTaskDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lotus Tasks — Calm Personal To-Do Dashboard" },
      {
        name: "description",
        content:
          "Lotus Tasks is a calm, dark, desktop-first to-do dashboard for planning your day, tracking lists and staying focused.",
      },
      { property: "og:title", content: "Lotus Tasks — Calm Personal To-Do Dashboard" },
      {
        property: "og:description",
        content:
          "Plan your day, organise lists and track progress in a minimal, premium dark to-do dashboard.",
      },
    ],
  }),
  component: () => (
    <LotusProvider>
      <LotusApp />
    </LotusProvider>
  ),
});

const VIEW_TITLES: Record<ViewKey, string> = {
  "my-day": "My Day",
  all: "All Tasks",
  important: "Important",
  planned: "Planned",
  completed: "Completed",
  trash: "Trash",
};

function LotusApp() {
  const {
    ready,
    tasks,
    lists,
    addTask,
    updateTask,
    toggleComplete,
    toggleImportant,
    deleteTask,
    restoreTask,
    purgeTask,
  } = useLotus();

  const [view, setView] = useState<ViewKey>("my-day");
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  const today = todayKey();

  const stats = useMemo(() => {
    const live = tasks.filter((t) => !t.deleted);
    const completed = live.filter((t) => t.completed).length;
    return { total: live.length, completed, pending: live.length - completed };
  }, [tasks]);

  const markedDates = useMemo(
    () =>
      new Set(
        tasks.filter((t) => !t.deleted && t.dueDate).map((t) => t.dueDate as string),
      ),
    [tasks],
  );

  const visible = useMemo(() => {
    let result = tasks;
    if (view === "trash") {
      result = result.filter((t) => t.deleted);
    } else {
      result = result.filter((t) => !t.deleted);
      if (activeListId) result = result.filter((t) => t.listId === activeListId);
      else if (view === "my-day") result = result.filter((t) => t.dueDate === today);
      else if (view === "important") result = result.filter((t) => t.important);
      else if (view === "planned") result = result.filter((t) => !!t.dueDate);
      else if (view === "completed") result = result.filter((t) => t.completed);
    }
    if (selectedDate) result = result.filter((t) => t.dueDate === selectedDate);
    return result;
  }, [tasks, view, activeListId, selectedDate, today]);

  const showSplit = view === "my-day" && !activeListId && !selectedDate;
  const todayTasks = showSplit ? visible : [];
  const upcomingTasks = useMemo(
    () =>
      showSplit
        ? tasks
            .filter((t) => !t.deleted && t.dueDate && t.dueDate > today)
            .sort((a, b) => (a.dueDate! < b.dueDate! ? -1 : 1))
        : [],
    [tasks, today, showSplit],
  );

  const listOf = (t: Task) => lists.find((l) => l.id === t.listId);

  const renderTask = (t: Task, showDue = false) => (
    <TaskCard
      key={t.id}
      task={t}
      list={listOf(t)}
      showDue={showDue}
      trashed={t.deleted}
      onToggle={() => toggleComplete(t.id)}
      onStar={() => toggleImportant(t.id)}
      onDelete={() => (t.deleted ? purgeTask(t.id) : deleteTask(t.id))}
      onRestore={() => restoreTask(t.id)}
      onEdit={() => setEditing(t)}
    />
  );

  const heading =
    activeListId
      ? (lists.find((l) => l.id === activeListId)?.name ?? "List")
      : VIEW_TITLES[view];

  const emptyFor = () => {
    if (view === "completed") return "Completed tasks will appear here.";
    if (view === "trash") return "Trash is empty.";
    if (view === "important") return "Star a task to see it here.";
    return "Nothing planned here yet 🎉";
  };

  if (!ready) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        view={view}
        onViewChange={(v) => {
          setView(v);
          setSelectedDate(null);
        }}
        activeListId={activeListId}
        onListChange={setActiveListId}
        lists={lists}
        tasks={tasks}
      />

      <main className="h-screen flex-1 overflow-y-auto px-8 py-7">
        <div className="mx-auto max-w-3xl space-y-7">
          <header className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {greeting()}, Shreya! 🌙
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Let&apos;s get some things done.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Search tasks"
                onClick={() => setSearchOpen(true)}
                className="rounded-xl border border-border p-2 text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
              >
                <Search className="h-4 w-4" strokeWidth={1.7} />
              </button>
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => setReminderOpen(true)}
                className="rounded-xl border border-border p-2 text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
              >
                <Bell className="h-4 w-4" strokeWidth={1.7} />
              </button>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-foreground">
                S
              </span>
            </div>
          </header>

          <AddTask
            lists={lists}
            defaultDate={selectedDate ?? today}
            onAdd={(input) => addTask(input)}
          />

          {showSplit ? (
            <>
              <TaskSection
                title="Today"
                count={todayTasks.length}
                isEmpty={todayTasks.length === 0}
                emptyMessage="Nothing planned for today 🎉"
              >
                {todayTasks.map((t) => renderTask(t))}
              </TaskSection>

              <TaskSection
                title="Upcoming"
                count={upcomingTasks.length}
                isEmpty={upcomingTasks.length === 0}
                emptyMessage="No upcoming tasks yet."
              >
                {upcomingTasks.map((t) => renderTask(t, true))}
              </TaskSection>
            </>
          ) : (
            <TaskSection
              title={selectedDate ? `${heading} · ${selectedDate}` : heading}
              count={visible.length}
              isEmpty={visible.length === 0}
              emptyMessage={emptyFor()}
            >
              {visible.map((t) => renderTask(t, true))}
            </TaskSection>
          )}
        </div>
      </main>

      <RightPanel
        stats={stats}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        markedDates={markedDates}
        onAddTask={() => document.getElementById("new-task-input")?.focus()}
        onAddReminder={() => setReminderOpen(true)}
      />

      <SearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        tasks={tasks}
        lists={lists}
      />

      <EditTaskDialog
        task={editing}
        lists={lists}
        onClose={() => setEditing(null)}
        onSave={updateTask}
      />

      <Dialog open={reminderOpen} onOpenChange={setReminderOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Reminders coming soon</DialogTitle>
            <DialogDescription>
              Reminders and notifications are on the way. For now, use due dates to keep
              track of your tasks.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
