import {
  TextField,
  ModalOverlay,
  Modal,
  Dialog,
  Label,
  Input as RACInput,
  RadioGroup,
  RadioField,
  RadioButton,
  SelectionIndicator,
} from 'react-aria-components';

import { Button, IconButton } from '../../components/primitives/Button';
import { useForm, Controller, useWatch } from 'react-hook-form';

import { useCreateTodo } from '../../hooks/useCreateTodo';
import { useUpdateTodo } from '../../hooks/useUpdateTodo';

import type { Todo } from '../../types/todos';
import { CustomCheckbox } from '../../components/primitives/Checkbox';

import { X } from 'lucide-react';

type Priority = 'High' | 'Medium' | 'Low';

type TodoModalProps = {
  userId: string;
  editingTodo?: Todo | null;
  onClose: () => void;
};

type FormValues = {
  title: string;
  priority: Priority;
  labelsValue: string;
  labels: string[];
  isCompleted: boolean;
};

export function TodoModal({ userId, editingTodo, onClose }: TodoModalProps) {
  const isEditMode = Boolean(editingTodo);

  const { mutate: createTodo, isPending } = useCreateTodo();
  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    values: editingTodo
      ? {
          title: editingTodo.title,
          priority: editingTodo.priority,
          labelsValue: '',
          labels: editingTodo.labels ?? [],
          isCompleted: editingTodo.is_completed,
        }
      : undefined,
    defaultValues: {
      title: '',
      priority: 'High',
      labelsValue: '',
      labels: [],
      isCompleted: false,
    },
  });

  // Keep labels accessible for rendering
  const labels = useWatch({ control, name: 'labels' }) ?? [];

  const addLabel = () => {
    const trimmed = getValues('labelsValue').trim();
    if (!trimmed) return;

    const current = getValues('labels') ?? [];
    if (!current.includes(trimmed)) {
      setValue('labels', [...current, trimmed]);
    }

    setValue('labelsValue', '');
  };

  const removeLabel = (label: string) => {
    setValue(
      'labels',
      (getValues('labels') ?? []).filter((l) => l !== label)
    );
  };

  const onSubmit = (data: FormValues) => {
    if (!userId || !data.title.trim()) return;

    const payload = {
      title: data.title,
      priority: data.priority,
      labels: data.labels ?? [],
      userId,
      is_completed: data.isCompleted ?? false,
    };

    if (isEditMode && editingTodo) {
      updateTodo(
        { id: editingTodo.id, ...payload },
        { onSuccess: handleClose }
      );
      return;
    }

    createTodo(payload, { onSuccess: handleClose });
  };

  const loading = isPending || isUpdating;

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <ModalOverlay>
      <Modal>
        <Dialog className="w-full max-w-md rounded-lg bg-white p-12 shadow-lg relative outline-none">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            {/* TITLE */}
            <TextField>
              <Label>Task title</Label>
              <Controller
                control={control}
                name="title"
                rules={{
                  required: 'Task title should not be empty',
                  validate: (value) =>
                    value.trim() !== '' || 'Task title should not be empty',
                }}
                render={({ field }) => (
                  <RACInput
                    type="text"
                    value={field.value}
                    aria-invalid={!!errors.title}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </TextField>

            {/* PRIORITY */}
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onChange={(value) => field.onChange(value as Priority)}
                >
                  <Label className="block text-base font-bold text-green-800 mb-3">
                    Priority
                  </Label>
                  <RadioField value="High">
                    <RadioButton>
                      <SelectionIndicator />
                      <span>High</span>
                    </RadioButton>
                  </RadioField>
                  <RadioField value="Medium">
                    <RadioButton>
                      <SelectionIndicator />
                      <span>Medium</span>
                    </RadioButton>
                  </RadioField>
                  <RadioField value="Low">
                    <RadioButton>
                      <SelectionIndicator />
                      <span>Low</span>
                    </RadioButton>
                  </RadioField>
                </RadioGroup>
              )}
            />

            {/* LABELS */}
            <div className="flex flex-col gap-3">
              <Controller
                control={control}
                name="labelsValue"
                render={({ field }) => (
                  <TextField
                    className="flex flex-col gap-3"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <Label>Labels</Label>
                    <div className="flex gap-4">
                      <RACInput placeholder="Add label" />
                      <Button type="button" onClick={addLabel} size="small">
                        Add
                      </Button>
                    </div>
                  </TextField>
                )}
              />
              {labels.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {labels.map((label) => (
                    <div
                      key={label}
                      className="flex items-start-start gap-1 bg-gray-450 text-white px-2 py-0.5 rounded-sm text-xs leading-3.5"
                    >
                      <span>{label}</span>
                      <button type="button" onClick={() => removeLabel(label)}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* COMPLETED */}
            <Controller
              control={control}
              name="isCompleted"
              render={({ field }) => (
                <CustomCheckbox
                  isSelected={field.value}
                  onChange={field.onChange}
                  className="text-base leading-5 font-normal text-gray-700"
                >
                  Mark as completed
                </CustomCheckbox>
              )}
            />

            {/* SUBMIT */}
            <Button
              type="submit"
              variant="solid"
              size="large"
              isDisabled={loading}
              isPending={loading}
            >
              {isEditMode
                ? loading
                  ? 'UPDATING...'
                  : 'UPDATE TASK'
                : loading
                  ? 'CREATING...'
                  : 'CREATE TASK'}
            </Button>
          </form>

          {/* CLOSE BUTTON */}
          <IconButton className="absolute top-2 right-2" slot="close">
            <X color="#0B4B36" width="20" height="20" />
          </IconButton>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
