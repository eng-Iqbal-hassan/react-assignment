import {
  MenuTrigger,
  Menu,
  MenuItem,
  Popover,
  Button,
} from 'react-aria-components';

import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useMemo } from 'react';

type SupabaseUser = {
  email: string;
  user_metadata?: {
    username?: string;
  };
};

type Props = {
  user: SupabaseUser | null;
};

export function ProfileDropdown({ user }: Props) {
  const navigate = useNavigate();

  const formattedUser = useMemo(() => {
    return {
      name: user?.user_metadata?.username ?? 'Anonymous User',
      email: user?.email ?? 'No email',
    };
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <MenuTrigger>
      <Button className="w-10 h-10 rounded-full bg-gray-200 hover:cursor-pointer">
        👤
      </Button>

      <Popover
        className="min-w-64 bg-white border shadow-lg rounded-xl p-2"
        placement="bottom right"
      >
        <div className="px-3 py-3 border-b mb-2">
          <p className="text-sm font-semibold">{formattedUser.name}</p>
          <p className="text-xs text-gray-500">{formattedUser.email}</p>
        </div>

        <Menu
          onAction={async (key) => {
            if (key === 'logout') {
              await handleLogout();
            }
          }}
        >
          <MenuItem
            id="logout"
            className="px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md cursor-pointer"
          >
            Logout
          </MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
