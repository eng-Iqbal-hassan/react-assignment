import {
  TextField,
  Modal,
  Dialog,
  Label,
  Input as RACInput,
  RadioGroup,
  Radio,
} from 'react-aria-components';

import { CrossIcon } from '../../assets/svg';
import { Button, IconButton } from '../../components/primitives/Button';
import { useState, useEffect } from 'react';

import { useCreateTodo } from '../../hooks/useCreateTodo';
import { useUpdateTodo } from '../../hooks/useUpdateTodo';

import type { Todo } from '../../types/todos';
import { CustomCheckbox } from '../../components/primitives/Checkbox';

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
            <Label>Task title</Label>
            <RACInput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <RadioGroup
            value={priority}
            // onChange={(e) => setPriority(e.target.value as Priority)}
            onChange={(value) => setPriority(value as Priority)}
          >
            <Label className="block text-base font-bold text-green-800 mb-3">
              Priority
            </Label>

            <Radio value="High">High</Radio>
            <Radio value="Medium">Medium</Radio>
            <Radio value="Low">Low</Radio>
          </RadioGroup>

          {/* LABELS */}
          <div className="flex flex-col gap-3">
            <TextField className="flex flex-col gap-3">
              <Label>Labels</Label>
              <div className="flex gap-4">
                <RACInput
                  value={labelsValue}
                  onChange={(e) => setLabelsValue(e.target.value)}
                  placeholder="Add label"
                />

                <Button type="button" onClick={addLabel} size="small">
                  Add
                </Button>
              </div>
            </TextField>
            {labels.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {labels.map((label) => (
                  <div
                    key={label}
                    className="flex items-start-start gap-1 bg-gray-450 text-white px-2 py-0.5 rounded-sm text-xs leading-3.5"
                  >
                    <span>{label}</span>
                    <button
                      className="leading-2 h-fit"
                      type="button"
                      onClick={() => removeLabel(label)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <CustomCheckbox
            isSelected={isCompleted}
            onChange={setIsCompleted}
            className="text-base leading-5 font-normal text-gray-700"
          >
            Mark as completed
          </CustomCheckbox>

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
