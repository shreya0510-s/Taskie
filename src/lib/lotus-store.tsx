import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Task, TaskList } from "./lotus-types";
import { addDays, toKey, todayKey } from "./date-utils";

const STORAGE_KEY = "lotus-tasks-v1";

type StoredState = { tasks: Task[]; lists: TaskList[] };

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function seed(): StoredState {
  const lists: TaskList[] = [
    { id: "college", name: "College", color: "var(--cat-blue)" },
    { id: "projects", name: "Projects", color: "var(--cat-purple)" },
    { id: "personal", name: "Personal", color: "var(--cat-pink)" },
    { id: "bharatanatyam", name: "Bharatanatyam", color: "var(--cat-orange)" },
    { id: "health", name: "Health", color: "var(--cat-green)" },
  ];
  const today = todayKey();
  const tomorrow = toKey(addDays(new Date(), 1));
  const later = toKey(addDays(new Date(), 3));
  const base = {
    important: false,
    completed: false,
    deleted: false,
    createdAt: new Date().toISOString(),
  };
  const tasks: Task[] = [
    { id: uid(), title: "Finish React project", listId: "projects", dueDate: today, ...base, important: true },
    { id: uid(), title: "DSA practice – Arrays & Strings", listId: "college", dueDate: today, ...base },
    { id: uid(), title: "Bharatanatyam practice", listId: "bharatanatyam", dueDate: today, ...base },
    { id: uid(), title: "Read 20 pages", listId: "personal", dueDate: today, ...base },
    { id: uid(), title: "System Design notes", listId: "college", dueDate: tomorrow, ...base },
    { id: uid(), title: "Workout", listId: "health", dueDate: tomorrow, ...base },
    { id: uid(), title: "Prepare project presentation", listId: "projects", dueDate: later, ...base, important: true },
  ];
  return { tasks, lists };
}

function load(): StoredState {
  if (typeof window === "undefined") return { tasks: [], lists: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seed();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw) as StoredState;
    return { tasks: parsed.tasks ?? [], lists: parsed.lists ?? [] };
  } catch {
    return seed();
  }
}

type Ctx = {
  ready: boolean;
  tasks: Task[];
  lists: TaskList[];
  addTask: (input: {
    title: string;
    listId?: string | null;
    dueDate?: string | null;
    important?: boolean;
  }) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  toggleComplete: (id: string) => void;
  toggleImportant: (id: string) => void;
  deleteTask: (id: string) => void;
  restoreTask: (id: string) => void;
  purgeTask: (id: string) => void;
  addList: (name: string, color: string) => void;
  renameList: (id: string, name: string) => void;
  deleteList: (id: string) => void;
};

const LotusContext = createContext<Ctx | null>(null);

export function LotusProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lists, setLists] = useState<TaskList[]>([]);

  useEffect(() => {
    const s = load();
    setTasks(s.tasks);
    setLists(s.lists);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks, lists }));
  }, [tasks, lists, ready]);

  const addTask: Ctx["addTask"] = useCallback((input) => {
    const title = input.title.trim();
    if (!title) return;
    setTasks((prev) => [
      {
        id: uid(),
        title,
        listId: input.listId ?? null,
        dueDate: input.dueDate ?? null,
        important: input.important ?? false,
        completed: false,
        deleted: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  }, []);

  const updateTask = useCallback((id: string, patch: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const toggleImportant = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, important: !t.important } : t)),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, deleted: true } : t)));
  }, []);

  const restoreTask = useCallback((id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, deleted: false } : t)));
  }, []);

  const purgeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addList = useCallback((name: string, color: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setLists((prev) => [...prev, { id: uid(), name: trimmed, color }]);
  }, []);

  const renameList = useCallback((id: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setLists((prev) => prev.map((l) => (l.id === id ? { ...l, name: trimmed } : l)));
  }, []);

  const deleteList = useCallback((id: string) => {
    setLists((prev) => prev.filter((l) => l.id !== id));
    setTasks((prev) => prev.map((t) => (t.listId === id ? { ...t, listId: null } : t)));
  }, []);

  const value = useMemo(
    () => ({
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
      addList,
      renameList,
      deleteList,
    }),
    [
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
      addList,
      renameList,
      deleteList,
    ],
  );

  return <LotusContext.Provider value={value}>{children}</LotusContext.Provider>;
}

export function useLotus() {
  const ctx = useContext(LotusContext);
  if (!ctx) throw new Error("useLotus must be used inside LotusProvider");
  return ctx;
}
