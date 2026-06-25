import { supabase } from '../lib/supabase';
import type { Todo, CreateTodoInput } from '../types/todos';

/* GET TODOS */
export async function getTodos(userId: string): Promise<Todo[]> {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getTodos error:', error);
    throw error;
  }

  return data ?? [];
}

/* CREATE TODO */
export async function createTodo(input: CreateTodoInput): Promise<Todo> {
  const { data, error } = await supabase
    .from('todos')
    .insert([
      {
        title: input.title,
        priority: input.priority,
        labels: input.labels,
        user_id: input.userId,
        is_completed: input.is_completed,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('createTodo error:', error);
    throw error;
  }

  return data;
}

export async function updateTodo(input: {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  labels: string[];
  is_completed: boolean;
}) {
  const { data, error } = await supabase
    .from('todos')
    .update({
      title: input.title,
      priority: input.priority,
      labels: input.labels,
      is_completed: input.is_completed,
    })
    .eq('id', input.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}
