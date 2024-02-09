import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'

const Dropzone = ({ className, images, setImages }) => {
  const [files, setFiles] = useState([])

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles);
    if (acceptedFiles?.length) {
      acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file)}));
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles
      ])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const handleSubmit = async e => {
    e.preventDefault()

    if (!files?.length) return
    let array = [...images];
    files.map(file => {
      array.push(file.name);
    });
    console.log(array)
    setImages(array);
    setFiles([]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center gap-4'>
          <ArrowUpTrayIcon className='w-5 h-5 fill-current' />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className='mt-10'>
        <div className='flex gap-4'>
          <h2 className='title text-3xl font-semibold'>Preview</h2>
          <button
            type='submit'
            className='ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-purple-400 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors'
          >
            Upload to Data Base
          </button>
        </div>

        {/* Accepted files */}
        <h3 className='title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3'>
          Accepted Files
        </h3>
        <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
          {files.map(file => (
            <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
              <Image
                src={file.preview}
                alt={file.name}
                width={50}
                height={50}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
                className='h-full w-full object-contain rounded-md'
              />
            </li>
          ))}
        </ul>
      </section>
    </form>
  )
}

export default Dropzone
