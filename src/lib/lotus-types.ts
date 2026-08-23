export type Task = {
  id: string;
  title: string;
  listId: string | null;
  dueDate: string | null; // yyyy-MM-dd
  important: boolean;
  completed: boolean;
  deleted: boolean;
  createdAt: string;
};

export type TaskList = {
  id: string;
  name: string;
  color: string; // css color token value
};

export type ViewKey =
  | "my-day"
  | "all"
  | "important"
  | "planned"
  | "completed"
  | "trash";

export const LIST_COLORS = [
  "var(--cat-blue)",
  "var(--cat-pink)",
  "var(--cat-orange)",
  "var(--cat-green)",
  "var(--cat-purple)",
];
