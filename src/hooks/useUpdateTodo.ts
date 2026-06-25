import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '../services/todos.service';

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });
}
