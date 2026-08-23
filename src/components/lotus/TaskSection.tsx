import type { ReactNode } from "react";

type Props = {
  title: string;
  count: number;
  emptyMessage: string;
  children: ReactNode;
  isEmpty: boolean;
};

export function TaskSection({ title, count, emptyMessage, children, isEmpty }: Props) {
  return (
    <section className="space-y-2.5">
      <div className="flex items-baseline gap-2 px-1">
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        <span className="text-xs tabular-nums text-muted-foreground">{count}</span>
      </div>
      {isEmpty ? (
        <p className="rounded-2xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      ) : (
        <div className="space-y-2">{children}</div>
      )}
    </section>
  );
}
