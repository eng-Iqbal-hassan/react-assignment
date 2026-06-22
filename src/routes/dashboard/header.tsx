import { Todo } from '../../assets/svg/todo.tsx';
import { Button } from '../../components/primitives/Button';

export function Header() {
  return (
    <header className="w-full h-25 bg-green-800 py-6 px-37.5 flex items-center justify-between">
      <div className="bg-white text-green-800 h-full px-3 pb-5 pt-1.5 w-min custom-header-clip">
        <Todo />
      </div>
      <Button type="button" variant="plain" size="small">
        Signout
      </Button>
    </header>
  );
}
