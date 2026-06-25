import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../services/todos.service';

export function useTodos(userId: string | null) {
  return useQuery({
    queryKey: ['todos', userId],
    queryFn: () => getTodos(userId!),
    enabled: !!userId,
  });
}
