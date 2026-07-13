'use client';

import { IconMenu, IconX } from '@tabler/icons-react';
import { ToggleMenuProps } from '~/shared/types';

const ToggleMenu = ({ handleToggleMenuOnClick, isToggleMenuOpen, isOnLandingPage = false }: ToggleMenuProps) => (
  <button
    type="button"
    className={`ml-1.5 inline-flex items-center rounded-lg p-2.5 text-sm transition focus:outline-none focus:ring-4 ${
      isOnLandingPage
        ? 'text-white hover:bg-white/15 focus:ring-white/50'
        : 'text-gray-500 hover:bg-gray-100 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-700'
    }`}
    aria-label="Toggle Menu"
    onClick={handleToggleMenuOnClick}
  >
    {isToggleMenuOpen ? <IconX className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
  </button>
);

export default ToggleMenu;
