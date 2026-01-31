import { useTodos } from "@/hooks/use-todos";
import { TodoInput } from "@/components/todo-input";
import { TodoItem } from "@/components/todo-item";
import { TodoStats } from "@/components/todo-stats";
import { Loader2, AlertCircle } from "lucide-react";

export default function Home() {
  const { data: todos, isLoading, isError } = useTodos();

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            My Tasks
          </h1>
          <p className="text-lg text-slate-500">
            Stay organized and get things done.
          </p>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading your tasks...</p>
          </div>
        ) : isError ? (
          <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-destructive mb-2">Failed to load tasks</h3>
            <p className="text-destructive/80">Please check your connection and try again.</p>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TodoStats todos={todos || []} />
            
            <section className="bg-white/50 backdrop-blur-sm rounded-3xl p-1">
              <div className="mb-6">
                <TodoInput />
              </div>

              <div className="space-y-3">
                {todos?.length === 0 ? (
                  <div className="text-center py-16 px-4 border-2 border-dashed border-muted rounded-2xl bg-white/50">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      No tasks yet
                    </h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Add a task above to get started with your day. You're all caught up!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {todos
                      ?.sort((a, b) => {
                        // Sort completed to bottom, then by ID descending (newest first)
                        if (a.completed === b.completed) return b.id - a.id;
                        return a.completed ? 1 : -1;
                      })
                      .map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                      ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
