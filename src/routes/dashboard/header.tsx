import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { TodoIcon } from '../../assets/svg';
import { ProfileDropdown } from './profileDropdown.tsx';

export function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    void getUser();
  }, []);
  return (
    <header className="sticky top-0 w-full h-25 bg-green-800 py-6 px-37.5 flex items-center justify-between">
      <div className="bg-white text-green-800 h-full px-3 pb-5 pt-1.5 w-min custom-header-clip">
        <TodoIcon />
      </div>
      <ProfileDropdown user={user} />
    </header>
  );
}
