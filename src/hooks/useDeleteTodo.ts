import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '../services/todos.service';

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });
}
