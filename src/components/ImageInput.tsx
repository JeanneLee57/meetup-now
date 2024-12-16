'use client';

import Image from 'next/image';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { PiPencilSimpleFill } from 'react-icons/pi';
import Modal from '@/components/Modal';

const imageList = [
  { id: 1, src: '/posters/poster1.jpg', alt: 'poster1', tags: ['파티'] },
  {
    id: 2,
    src: '/posters/poster2.jpg',
    alt: 'poster2',
    tags: ['야외', '운동'],
  },
  { id: 3, src: '/posters/poster3.jpg', alt: 'poster3', tags: ['야외'] },
  { id: 4, src: '/posters/poster4.jpg', alt: 'poster4', tags: ['운동'] },
  {
    id: 5,
    src: '/posters/poster5.jpg',
    alt: 'poster5',
    tags: ['파티', '생일'],
  },
  {
    id: 6,
    src: '/posters/poster6.jpg',
    alt: 'poster6',
    tags: ['파티', '생일'],
  },
  { id: 7, src: '/posters/poster7.jpg', alt: 'poster7', tags: ['운동'] },
  { id: 8, src: '/posters/poster8.jpg', alt: 'poster8', tags: ['파티'] },
  { id: 9, src: '/posters/poster9.jpg', alt: 'poster9', tags: ['생일'] },
  { id: 10, src: '/posters/poster10.jpg', alt: 'poster10', tags: ['야외'] },
  { id: 11, src: '/posters/poster11.jpg', alt: 'poster11', tags: ['운동'] },
  { id: 12, src: '/posters/poster12.jpg', alt: 'poster12', tags: ['파티'] },
  { id: 13, src: '/posters/poster13.jpg', alt: 'poster13', tags: ['파티'] },
  { id: 14, src: '/posters/poster14.jpg', alt: 'poster14', tags: ['파티'] },
  {
    id: 15,
    src: '/posters/poster15.jpg',
    alt: 'poster15',
    tags: ['파티', '생일'],
  },
  {
    id: 16,
    src: '/posters/poster16.jpg',
    alt: 'poster16',
    tags: ['파티', '생일'],
  },
  { id: 17, src: '/posters/poster17.jpg', alt: 'poster17', tags: ['운동'] },
  { id: 18, src: '/posters/poster18.jpg', alt: 'poster18', tags: ['야외'] },
  {
    id: 19,
    src: '/posters/poster19.jpg',
    alt: 'poster19',
    tags: ['파티', '생일'],
  },
  { id: 20, src: '/posters/poster20.jpg', alt: 'poster20', tags: ['야외'] },
  { id: 21, src: '/posters/poster21.jpg', alt: 'poster21', tags: ['야외'] },
  { id: 22, src: '/posters/poster22.jpg', alt: 'poster22', tags: ['파티'] },
  { id: 23, src: '/posters/poster23.jpg', alt: 'poster23', tags: ['파티'] },
  { id: 24, src: '/posters/poster24.jpg', alt: 'poster24', tags: ['운동'] },
];

const tags = ['파티', '운동', '생일', '야외'];

const ImageInput = () => {
  const [currentImage, setCurrentImage] = useState<string>(
    '/posters/poster1.jpg'
  );
  const [showModal, setShowModal] = useState(false);
  const [currentTag, setCurrentTag] = useState<string | null>(null);

  const handleImageChange = () => {
    setShowModal(true);
  };

  const handleImageClick = (image: string) => {
    setCurrentImage(image);
    setShowModal(false);
  };

  const handleTagClick = (tag: string) => {
    setCurrentTag(tag);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative rounded-md overflow-hidden">
        <Image src={currentImage} alt="poster" width={800} height={800} />
        <div
          onClick={handleImageChange}
          className="absolute bottom-8 right-8 rounded-full p-2 border border-gray-300 bg-white opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <PiPencilSimpleFill size={24} className="text-gray-900" />
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="포스터 선택">
          <div className="flex flex-wrap gap-2 mb-4">
            <div
              className={`p-2 rounded-md cursor-pointer hover:opacity-80 transition-opacity ${
                currentTag === null ? 'bg-primary' : 'bg-gray-200'
              }`}
              onClick={() => setCurrentTag(null)}
            >
              전체
            </div>
            {tags.map((tag) => (
              <div
                key={tag}
                className={`p-2 rounded-md cursor-pointer hover:opacity-80 transition-opacity ${
                  currentTag === tag ? 'bg-primary' : 'bg-gray-200'
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {imageList
              .filter((image) => {
                if (currentTag) {
                  return image.tags.includes(currentTag);
                }
                return true;
              })
              .map((image) => (
                <Image
                  key={image.id}
                  src={image.src}
                  alt={image.alt}
                  width={200}
                  height={200}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleImageClick(image.src)}
                />
              ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImageInput;
