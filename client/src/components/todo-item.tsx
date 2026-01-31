import { useUpdateTodo, useDeleteTodo } from "@/hooks/use-todos";
import { type Todo } from "@shared/schema";
import { Trash2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = () => {
    updateTodo.mutate({ id: todo.id, completed: !todo.completed });
  };

  const handleDelete = () => {
    setIsDeleting(true);
    deleteTodo.mutate(todo.id, {
      onError: () => setIsDeleting(false),
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between p-4 rounded-xl bg-white border border-border/40 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5",
        todo.completed && "bg-muted/30 border-transparent shadow-none"
      )}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button
          onClick={handleToggle}
          disabled={updateTodo.isPending}
          className={cn(
            "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2",
            todo.completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-muted-foreground/30 hover:border-primary hover:bg-primary/5 text-transparent"
          )}
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </button>
        <span
          className={cn(
            "text-lg transition-all duration-200 truncate select-none cursor-pointer",
            todo.completed
              ? "text-muted-foreground line-through decoration-muted-foreground/50"
              : "text-foreground font-medium"
          )}
          onClick={handleToggle}
        >
          {todo.text}
        </span>
      </div>

      <button
        onClick={handleDelete}
        disabled={deleteTodo.isPending || isDeleting}
        className={cn(
          "ml-4 p-2 rounded-lg text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none",
          (deleteTodo.isPending || isDeleting) && "opacity-50 cursor-not-allowed"
        )}
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
