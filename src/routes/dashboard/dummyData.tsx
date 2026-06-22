export type Todo = {
  title: string;
  labelsArray?: string[];
  priority: 'High' | 'Medium' | 'Low';
};

export const dummyTodos: Todo[] = [
  {
    title: 'Set out garbage',
    labelsArray: ['Cleaning', 'Room maintenance'],
    priority: 'High',
  },
  {
    title: 'Empty the dishwasher',
    labelsArray: ['Cleaning'],
    priority: 'High',
  },
  {
    title: 'Set out garbage',
    labelsArray: ['Entertainment'],
    priority: 'High',
  },
  {
    title: 'Set out garbage',
    priority: 'High',
  },
];
