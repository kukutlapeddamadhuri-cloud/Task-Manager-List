import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertTodo, type Todo } from "@shared/schema";

export function useTodos() {
  return useQuery({
    queryKey: [api.todos.list.path],
    queryFn: async () => {
      const res = await fetch(api.todos.list.path);
      if (!res.ok) throw new Error("Failed to fetch todos");
      return api.todos.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTodo: InsertTodo) => {
      const validated = api.todos.create.input.parse(newTodo);
      const res = await fetch(api.todos.create.path, {
        method: api.todos.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      if (!res.ok) throw new Error("Failed to create todo");
      return api.todos.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.todos.list.path] });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & Partial<InsertTodo>) => {
      const validated = api.todos.update.input.parse(updates);
      const url = buildUrl(api.todos.update.path, { id });
      const res = await fetch(url, {
        method: api.todos.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      if (!res.ok) throw new Error("Failed to update todo");
      return api.todos.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.todos.list.path] });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.todos.delete.path, { id });
      const res = await fetch(url, {
        method: api.todos.delete.method,
      });
      if (!res.ok) throw new Error("Failed to delete todo");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.todos.list.path] });
    },
  });
}
