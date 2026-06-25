import { Header } from './header.tsx';
import { Button, IconButton } from '../../components/primitives/Button';
import { DeleteIcon, EditIcon } from '../../assets/svg';
import { DialogTrigger } from 'react-aria-components';

import { TodoModal } from './TodoModal.tsx';
import { useTodos } from '../../hooks/useTodos';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';

import type { Todo } from '../../types/todos.ts';

export function Dashboard() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoadingUser(true);

      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error(error);
        setLoadingUser(false);
        return;
      }

      setUserId(data.user?.id ?? null);
      setLoadingUser(false);
    };

    void fetchUser();
  }, []);

  const { data: todos = [], isLoading, error } = useTodos(userId);

  if (loadingUser) {
    return <div className="p-10 text-gray-500">Loading user...</div>;
  }

  if (!userId) {
    return <div className="p-10 text-red-500">No user found</div>;
  }

  return (
    <div>
      <Header />

      <div className="py-20 px-37.5">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-green-800">
            Welcome to your to-do list!
          </h2>

          <DialogTrigger
            isOpen={isOpen}
            onOpenChange={(open) => {
              setIsOpen(open);
              if (!open) setEditingTodo(null);
            }}
          >
            <Button
              type="button"
              variant="solid"
              size="small"
              onClick={() => {
                setEditingTodo(null); // CREATE mode
                setIsOpen(true);
              }}
            >
              CREATE NEW TASK
            </Button>

            <TodoModal
              userId={userId}
              editingTodo={editingTodo}
              onClose={() => {
                setIsOpen(false);
                setEditingTodo(null);
              }}
            />
          </DialogTrigger>
        </div>

        {isLoading && <p className="mt-10">Loading todos...</p>}
        {error && <p className="mt-10 text-red-500">Error loading todos</p>}

        {!isLoading && todos.length === 0 && (
          <p className="mt-10 text-gray-500">
            No todos found. Create your first task 🚀
          </p>
        )}

        <div className="flex flex-col gap-8 mt-10">
          {todos.map((todo: Todo) => (
            <div
              key={todo.id}
              className="py-2.5 px-8 bg-white shadow-soft rounded-lg flex justify-between items-center"
            >
              <div className="flex items-center gap-5">
                <h4 className="text-gray-700">{todo.title}</h4>

                <div className="flex gap-2">
                  {todo.labels?.map((label, i) => (
                    <div
                      key={i}
                      className="bg-gray-450 text-white text-xs px-2 py-0.5"
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <h5 className="text-gray-600">{todo.priority}</h5>

                <IconButton
                  onClick={() => {
                    setEditingTodo(todo);
                    setIsOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>

                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
