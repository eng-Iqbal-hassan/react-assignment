import { Dialog, Modal } from 'react-aria-components';

import { Button } from '../../components/primitives/Button';
import type { Todo } from '../../types/todos';

type DeleteTodoModalProps = {
  todo: Todo | null;
  onConfirm: () => void;
  isDeleting?: boolean;
};

export function DeleteTodoModal({
  todo,
  onConfirm,
  isDeleting,
}: DeleteTodoModalProps) {
  return (
    <Modal className="fixed inset-0 flex items-center justify-center bg-black/50">
      <Dialog className="w-100 bg-white rounded-lg p-6 shadow-lg outline-none">
        {({ close }) => (
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bold">
              Are you sure you want to delete this todo?
            </h2>

            <p className="text-sm text-gray-500">"{todo?.title}"</p>

            <div className="flex justify-end gap-3">
              <Button type="button" onClick={close}>
                Cancel
              </Button>

              <Button
                type="button"
                variant="solid"
                isDisabled={isDeleting}
                onClick={() => {
                  onConfirm();
                  close(); // ✅ closes modal automatically
                }}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </Modal>
  );
}
