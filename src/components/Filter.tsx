'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function Filter() {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  function handleChangeRegion(region: string) {
    setValue(region);

    const params = new URLSearchParams(searchParams);

    params.delete('page');
    if (region && region !== 'All') params.set('region', region);
    else params.delete('region');

    replace(`${pathname}?${params.toString()}`);
    setShow(false);
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    const param = params.get('region')?.toString();
    if (param !== undefined) setValue(param);
  }, [searchParams]);

  return (
    <div className='relative max-w-60 text-dark-elements dark:text-dark-text-light-elements'>
      <div
        className='group peer flex gap-x-2 transition justify-between rounded-lg items-center bg-dark-text-light-elements outline-none px-6 py-4 cursor-pointer shadow-md focus:ring focus:ring-dark-elements dark:focus:ring-dark-text-light-elements dark:bg-dark-elements'
        id='filter'
        aria-label='Filter by region'
        aria-expanded={show}
        tabIndex={0}
        onClick={() => setShow(!show)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Spacebar') setShow(!show);
        }}
      >
        <span>
          {value === '' || value === 'All' ? 'Filter by Region' : value}
        </span>

        <ChevronDownIcon className='size-4 transition-transform group-aria-expanded:rotate-180' />
      </div>
      <ul
        aria-labelledby='filter'
        className='absolute flex flex-col w-full max-w-60 top-16 max-h-0 py-0 overflow-hidden rounded-lg bg-dark-text-light-elements transition-all shadow-md z-10 dark:bg-dark-elements peer-aria-expanded:max-h-60 peer-aria-expanded:py-4'
      >
        {regions.map((region) => (
          <li key={region} className='flex flex-col'>
            <button
              onClick={() => handleChangeRegion(region)}
              className='flex justify-start py-1 px-6 cursor-pointer focus:ring-0 focus:bg-light-background dark:focus:bg-dark-background hover:bg-light-background dark:hover:bg-dark-background'
            >
              {region}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filter;
