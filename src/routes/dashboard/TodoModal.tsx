import {
  Modal,
  Dialog,
  Label,
  Input,
  TextField,
  RadioGroup,
  Radio,
  Form,
} from 'react-aria-components';

import { CrossIcon } from '../../assets/svg';
import { Button, IconButton } from '../../components/primitives/Button';
import { useState } from 'react';
import { useCreateTodo } from '../../hooks/useCreateTodo';

type Priority = 'High' | 'Medium' | 'Low';

type TodoModalProps = {
  userId: string;
  onSuccess?: () => void;
};

export function TodoModal({ userId, onSuccess }: TodoModalProps) {
  const [priority, setPriority] = useState<Priority>('High');
  const [labelsValue, setLabelsValue] = useState('');
  const [labels, setLabels] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const { mutate, isPending } = useCreateTodo();

  /* ADD LABEL */
  const addLabel = () => {
    const trimmed = labelsValue.trim();
    if (!trimmed) return;

    if (!labels.includes(trimmed)) {
      setLabels((prev) => [...prev, trimmed]);
    }

    setLabelsValue('');
  };

  /* REMOVE LABEL */
  const removeLabel = (label: string) => {
    setLabels((prev) => prev.filter((l) => l !== label));
  };

  /* ENTER KEY */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addLabel();
    }
  };

  /* CREATE TODO */
  const handleCreate = () => {
    if (!userId || !title.trim()) return;

    mutate(
      {
        title,
        priority,
        labels,
        userId,
        is_completed: isCompleted,
      },
      {
        onSuccess: () => {
          // reset form
          setTitle('');
          setPriority('High');
          setLabels([]);
          setLabelsValue('');
          setIsCompleted(false);

          // close modal
          onSuccess?.();
        },
      }
    );
  };

  return (
    <Modal className="fixed inset-0 flex items-center justify-center bg-black/50">
      <Dialog className="w-full max-w-md rounded-lg bg-white p-12 shadow-lg outline-none relative">
        <Form
          className="flex flex-col gap-8"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* TITLE */}
          <TextField name="title" isRequired>
            <Label>Task title</Label>
            <Input
              type="text"
              placeholder="Cook food"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </TextField>

          {/* PRIORITY */}
          <RadioGroup
            value={priority}
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
            <TextField className="flex items-center gap-2">
              <div className="flex flex-col gap-1 w-full">
                <Label className="text-sm font-medium text-green-800">
                  Labels
                </Label>

                <Input
                  value={labelsValue}
                  onChange={(e) => setLabelsValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a label"
                />
              </div>

              <button
                type="button"
                onClick={addLabel}
                className="mt-6 bg-green-800 text-white px-4 py-2 rounded-md text-sm"
              >
                Add
              </button>
            </TextField>

            {/* LABEL PILLS */}
            <div className="flex flex-wrap gap-2">
              {labels.map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-1 bg-gray-450 text-white px-2 py-0.5 rounded-full text-xs"
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
            onClick={handleCreate}
            isDisabled={isPending}
          >
            {isPending ? 'CREATING...' : 'CREATE TASK'}
          </Button>
        </Form>

        {/* CLOSE BUTTON */}
        <IconButton slot="close" className="absolute top-1.5 right-2">
          <CrossIcon />
        </IconButton>
      </Dialog>
    </Modal>
  );
}
