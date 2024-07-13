'use client';

import { MoonIcon as MoonSolid } from '@heroicons/react/24/solid';
import { MoonIcon as MoonOutline } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function Header() {
  const isWindowNotUndefined = typeof window !== 'undefined';
  const isDark = isWindowNotUndefined && localStorage.getItem('dark') !== null;
  const [dark, setDark] = useState(isDark || false);

  function handleToggleTheme() {
    setDark(!dark);
    document.documentElement.classList.toggle('dark');
  }

  if (isWindowNotUndefined) {
    if (dark) {
      localStorage?.setItem('dark', 'true');
    } else {
      localStorage?.removeItem('dark');
    }
  }

  useEffect(() => {
    const isDark = localStorage.getItem('dark');
    if (isDark) document.documentElement.classList.add('dark');
  }, []);

  return (
    <header className='w-full shadow-md transition bg-dark-text-light-elements dark:bg-dark-elements'>
      <div className='max-w-screen-xl mx-auto flex justify-between px-4 py-8 text-base transition dark:text-dark-text-light-elements '>
        <Link href='/' aria-label='Return to Homepage'>
          <h1 className='font-extrabold'>Where in the world?</h1>
        </Link>
        <button
          className='flex gap-x-2 items-center font-semibold'
          onClick={handleToggleTheme}
        >
          {dark ? (
            <MoonSolid className='size-4' />
          ) : (
            <MoonOutline className='size-4' />
          )}{' '}
          Dark Mode
        </button>
      </div>
    </header>
  );
}

export default Header;
