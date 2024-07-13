import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
  alt: string;
}

function Card({ name, population, region, capital, flag, alt }: CardProps) {
  return (
    <div className='relative bg-dark-text-light-elements text-light-text rounded-md transition-all overflow-hidden dark:bg-dark-elements dark:text-dark-text-light-elements cursor-pointer shadow-md h-full focus-within:ring-4 focus-within:ring-dark-elements dark:focus-within:ring-dark-text-light-elements focus-within:-translate-y-3 focus-within:shadow-xl hover:-translate-y-3 hover:shadow-xl'>
      <picture className=''>
        <Image
          src={flag}
          alt={alt || 'Country flag'}
          width={264}
          height={500}
          className='object-cover aspect-[18/11] w-full max-w-full'
        />
      </picture>
      <div className='p-8'>
        <h2 className='text-xl font-extrabold mb-8 overflow-x-hidden text-ellipsis text-nowrap'>
          {name}
        </h2>
        <p className='text-lg font-semibold overflow-x-hidden text-ellipsis text-nowrap'>
          Population:{' '}
          <span className='font-light'>{population.toLocaleString()}</span>
        </p>
        <p className='text-lg font-semibold'>
          Region: <span className='font-light'>{region}</span>
        </p>
        <p className='text-lg font-semibold overflow-x-hidden text-ellipsis text-nowrap'>
          Capital: <span className='font-light'>{capital}</span>
        </p>
      </div>
      <Link
        href={`/details/${name}`}
        aria-label={`See more details about ${name}`}
        className='absolute inset-0 w-full h-full'
      ></Link>
    </div>
  );
}

export default Card;
