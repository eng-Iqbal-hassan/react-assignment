import { Modal, Dialog } from 'react-aria-components';

import { CrossIcon } from '../../assets/svg';
import { Button, IconButton } from '../../components/primitives/Button';
import { useState, useEffect } from 'react';

import { useCreateTodo } from '../../hooks/useCreateTodo';
import { useUpdateTodo } from '../../hooks/useUpdateTodo';

import type { Todo } from '../../types/todos';

type Priority = 'High' | 'Medium' | 'Low';

type TodoModalProps = {
  userId: string;
  editingTodo?: Todo | null;
  isOpen: boolean; // ✅ ADD THIS
  onClose: () => void; // ✅ PROPER CLOSE HANDLER
};

export function TodoModal({
  userId,
  editingTodo,
  isOpen,
  onClose,
}: TodoModalProps) {
  const isEditMode = Boolean(editingTodo);

  const { mutate: createTodo, isPending } = useCreateTodo();
  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo();

  const [priority, setPriority] = useState<Priority>('High');
  const [labelsValue, setLabelsValue] = useState('');
  const [labels, setLabels] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  /* hydrate form */
  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title ?? '');
      setPriority((editingTodo.priority as Priority) ?? 'High');
      setLabels(editingTodo.labels ?? []);
      setIsCompleted(editingTodo.is_completed ?? false);
    } else {
      setTitle('');
      setPriority('High');
      setLabels([]);
      setLabelsValue('');
      setIsCompleted(false);
    }
  }, [editingTodo]);

  const addLabel = () => {
    const trimmed = labelsValue.trim();
    if (!trimmed) return;

    if (!labels.includes(trimmed)) {
      setLabels((prev) => [...prev, trimmed]);
    }

    setLabelsValue('');
  };

  const removeLabel = (label: string) => {
    setLabels((prev) => prev.filter((l) => l !== label));
  };

  const handleSubmit = () => {
    if (!userId || !title.trim()) return;

    const payload = {
      title,
      priority,
      labels,
      userId,
      is_completed: isCompleted,
    };

    if (isEditMode && editingTodo) {
      updateTodo(
        {
          id: editingTodo.id,
          ...payload,
        },
        {
          onSuccess: () => {
            onClose(); // ✅ CLOSE MODAL
          },
        }
      );

      return;
    }

    createTodo(payload, {
      onSuccess: () => {
        onClose(); // ✅ CLOSE MODAL
      },
    });
  };

  const loading = isPending || isUpdating;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      className="fixed inset-0 flex items-center justify-center bg-black/50"
    >
      <Dialog className="w-full max-w-md rounded-lg bg-white p-12 shadow-lg relative outline-none">
        <div className="flex flex-col gap-8">
          {/* TITLE */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-green-800">
              Task title
            </label>

            <input
              type="text"
              className="border p-2 rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* PRIORITY */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-green-800">
              Priority
            </label>

            <select
              className="border p-2 rounded-md"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* LABELS */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-green-800">Labels</label>

            <div className="flex gap-2">
              <input
                className="border p-2 rounded-md w-full"
                value={labelsValue}
                onChange={(e) => setLabelsValue(e.target.value)}
                placeholder="Add label"
              />

              <button
                type="button"
                onClick={addLabel}
                className="px-3 bg-green-600 text-white rounded-md"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {labels.map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-1 bg-gray-600 text-white px-2 py-1 rounded-full text-xs"
                >
                  <span>{label}</span>
                  <button type="button" onClick={() => removeLabel(label)}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* COMPLETED */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
            />
            Mark as completed
          </label>

          {/* SUBMIT */}
          <Button
            type="button"
            variant="solid"
            size="large"
            onClick={handleSubmit}
            isDisabled={loading}
          >
            {isEditMode
              ? loading
                ? 'UPDATING...'
                : 'UPDATE TASK'
              : loading
                ? 'CREATING...'
                : 'CREATE TASK'}
          </Button>
        </div>

        {/* CLOSE BUTTON */}
        <IconButton
          className="absolute top-2 right-2"
          onClick={onClose} // ✅ FIXED
        >
          <CrossIcon />
        </IconButton>
      </Dialog>
    </Modal>
  );
}
