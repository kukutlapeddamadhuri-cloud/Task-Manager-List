import { type Todo } from "@shared/schema";
import { PieChart, ListChecks } from "lucide-react";

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const completed = todos.filter((t) => t.completed).length;
  const total = todos.length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <ListChecks className="w-5 h-5" />
            <span className="font-medium text-sm">Tasks</span>
          </div>
          <div className="text-3xl font-bold font-display tracking-tight">
            {completed}
            <span className="text-lg opacity-60 font-medium ml-1">/ {total}</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-border/50 rounded-2xl p-6 shadow-sm relative overflow-hidden group hover:border-primary/20 transition-colors">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
            <PieChart className="w-5 h-5" />
            <span className="font-medium text-sm">Progress</span>
          </div>
          <div className="flex items-end gap-2">
            <div className="text-3xl font-bold font-display tracking-tight text-foreground">
              {percentage}%
            </div>
          </div>
          
          <div className="mt-3 h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
