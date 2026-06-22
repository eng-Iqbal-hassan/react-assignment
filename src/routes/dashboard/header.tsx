import { TodoIcon } from '../../assets/svg';
import { Button } from '../../components/primitives/Button';

export function Header() {
  return (
    <header className="w-full h-25 bg-green-800 py-6 px-37.5 flex items-center justify-between">
      <div className="bg-white text-green-800 h-full px-3 pb-5 pt-1.5 w-min custom-header-clip">
        <TodoIcon />
      </div>
      <Button type="button" variant="plain" size="small" className="p-0">
        Signout
      </Button>
    </header>
  );
}
