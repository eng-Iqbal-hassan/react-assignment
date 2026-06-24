import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '../services/todos.service';

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,

    onSuccess: async (newTodo) => {
      await queryClient.invalidateQueries({
        queryKey: ['todos', newTodo.user_id],
      });
    },
  });
}
