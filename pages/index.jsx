import Dropzone from '@/components/Dropzone'
import Image from 'next/image'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { sql } from "@vercel/postgres";
import { useEffect, useState } from 'react'

const Homepage =  () => {

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const images = await sql`SELECT * FROM imagesDZ`;
      setImages(images.rows);
    };

    fetchDataAsync();
  }, []);

  return (
    <section className='section'>
      <div className='container'>
        <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
          {images.map(image => (
            <li key={image.id} className='relative h-32 rounded-md shadow-lg'>
              <Image
                src={image.name}
                alt={image.name}
                width={50}
                height={50}
                className='h-full w-full object-contain rounded-md'
              />
              <button
                type='button'
                className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                onClick={() => removeFile(file.id)}
              >
                <XMarkIcon className='w-5 h-5 fill-white hover:fill-secondary-400 transition-colors' />
              </button>
            </li>
          ))}
        </ul>

        <h1 className='title text-3xl font-bold'>Upload Files</h1>
        <Dropzone className='p-16 mt-10 border border-neutral-200' />
      </div>
    </section>
  )
}

export default Homepage
