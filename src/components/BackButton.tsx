'use client';

import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

function BackButton() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <button
      onClick={handleBack}
      className='group inline-flex items-center gap-1 px-6 py-1 rounded text-light-text hover:brightness-[97%] dark:hover:brightness-125 dark:text-dark-text-light-elements bg-dark-text-light-elements shadow-[0px_0px_6px_rgba(0,0,0,0.3)] dark:bg-dark-elements'
    >
      <ArrowLongLeftIcon className='size-5 transition-transform group-focus:-translate-x-1 group-hover:-translate-x-1' />
      Back
    </button>
  );
}

export default BackButton;
