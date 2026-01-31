import { useState } from "react";
import { useCreateTodo } from "@/hooks/use-todos";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function TodoInput() {
  const [text, setText] = useState("");
  const createTodo = useCreateTodo();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    createTodo.mutate(
      { text: text.trim(), completed: false },
      {
        onSuccess: () => {
          setText("");
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to add task. Please try again.",
          });
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="relative flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          disabled={createTodo.isPending}
          className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-border/50 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 shadow-sm pr-16 text-lg"
        />
        <button
          type="submit"
          disabled={!text.trim() || createTodo.isPending}
          className="absolute right-2 p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-95"
        >
          {createTodo.isPending ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <Plus className="h-6 w-6" />
          )}
        </button>
      </div>
    </form>
  );
}
