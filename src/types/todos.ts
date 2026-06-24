export type Todo = {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  labels: string[];
  user_id: string;
  is_completed: boolean;
};

export type CreateTodoInput = {
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  labels: string[];
  userId: string;
  is_completed: boolean;
};
