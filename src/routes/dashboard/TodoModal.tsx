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

type Priority = 'High' | 'Medium' | 'Low';

export function TodoModal() {
  const [priority, setPriority] = useState<Priority>('High');

  const [labelsValue, setLabelsValue] = useState('');
  const [labels, setLabels] = useState<string[]>([]);

  const addLabel = () => {
    const trimmed = labelsValue.trim();
    if (!trimmed) return;

    if (labels.includes(trimmed)) {
      setLabelsValue('');
      return;
    }

    setLabels([...labels, trimmed]);
    setLabelsValue('');
  };

  const removeLabel = (label: string) => {
    setLabels(labels.filter((l) => l !== label));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addLabel();
    }
  };

  return (
    <Modal className="fixed inset-0 flex items-center justify-center bg-black/50">
      <Dialog className="w-full max-w-md rounded-lg bg-white p-12 shadow-lg outline-none relative">
        <Form className="flex flex-col gap-8">
          {/* Title */}
          <TextField name="name" isRequired>
            <Label>Task title</Label>
            <Input type="text" placeholder="Cook food" />
          </TextField>

          {/* Priority */}
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

          {/* Labels */}
          <div className="flex flex-col gap-3">
            <TextField className="flex items-center gap-2">
              <div className="flex flex-col gap-1 w-full">
                <Label className="text-sm font-medium text-green-800 font-fira">
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

            {/* Pills */}
            <div className="flex flex-wrap gap-2">
              {labels.map((label) => (
                <div
                  key={label}
                  className="flex items-start gap-1 bg-gray-450 text-white px-2 py-0.5 rounded-full text-xs"
                >
                  <span className="text-xs font-normal leading-3.5 font-fira">
                    {label}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeLabel(label)}
                    className="text-white leading-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/*Submit Button*/}
          <Button type="button" variant="solid" size="large">
            CREATE TASK
          </Button>
        </Form>
        {/* Close */}
        <IconButton slot="close" className="absolute top-1.5 right-2">
          <CrossIcon />
        </IconButton>
      </Dialog>
    </Modal>
  );
}
