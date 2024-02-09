import Dropzone from '@/components/Dropzone'
import Image from 'next/image'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

const Homepage =  () => {

  const [images, setImages] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("images")) {
      setImages(JSON.parse(localStorage.getItem("images")));
    }
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem("images", JSON.stringify(images));
    }
    setHasMounted(true);
  }, [images, hasMounted]);

  const removeFile = (name) => {
    let array = [...images];
    let index = array.indexOf(name);
    if (index !== -1) {
      array.splice(index, 1);
      console.log('removeFile')
      setImages(array);
    }
  }

  return (
    <section className='section'>
      <div className='container'>
        <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
          {images.map(image => (
            <li key={image.id} className='relative h-32 rounded-md shadow-lg'>
              <Image
                src={`/../public/images/${image}`}
                alt={image}
                width={50}
                height={50}
                className='h-full w-full object-contain rounded-md'
              />
              <button
                type='button'
                className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                onClick={() => removeFile(image)}
              >
                <XMarkIcon className='w-5 h-5 fill-white hover:fill-secondary-400 transition-colors' />
              </button>
            </li>
          ))}
        </ul>

        <h1 className='title text-3xl font-bold'>Upload Files</h1>
        <Dropzone className='p-16 mt-10 border border-neutral-200' images={images} setImages={setImages} />
      </div>
    </section>
  )
}

export default Homepage
