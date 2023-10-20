// src/Card.tsx
import React, { useState } from 'react';
import Image from 'next/image'
import { faBed, faUsers, faToilet, faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Modal from './Modal';
import InquiryForm from './forms/InquiryForm';

export interface CardProps {
  address: string;
  city: string;
  state: string;
  zipCode: number;
  imageSrc: string;
  bedrooms: number;
  yearBuilt: number;
  bathrooms: number;
  sqft: number;
  setClose?: () => void;
  id: number;
}
const Card = ({
  address,
  city,
  state,
  zipCode,
  bedrooms,
  yearBuilt,
  bathrooms,
  sqft,
  imageSrc,
  id,
}: CardProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='relative rounded-2xl overflow-hidden shadow-lg' style={{ height: '500px' }}>
      {/* Full-width image */}
      {/* https://birdeatsbug.com/blog/creating-hover-effects-with-tailwind-css */}
      <div className='absolute inset-0 transition duration-300 hover:scale-110 mb-10'>
        {imageSrc &&
          <Image
            alt={`house-${id}`}
            src={imageSrc}
            layout='fill'
            objectFit='cover'
          />
        }
      </div>

      {/* Card content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white rounded-xl transform">
        <div className='flex justify-between mb-2'>
          <div>
            <h1 className='text-custom-900 text-2xl font-extrabold'>{address}</h1>
            <p className='text-custom-700 text-lg'>
              {city}, {state} {zipCode}
            </p>
          </div>
          <div>
            <button
              aria-label='trigger-card'
              data-cy='trigger-card-modal'
              onClick={openModal}>
              <div className={`flex items-center justify-center bg-green-400 hover:bg-green-500 text-white text-xs rounded h-8 w-8`}>
                <FontAwesomeIcon icon={faChevronRight} aria-label='Right arrow' />
              </div>
            </button>
          </div>
        </div>
        <div className='flex flex-wrap justify-between text-custom-600 text-xs'>
          <div className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faBed} aria-label='Bedrooms' />
            <span className='ml-2'>{bedrooms}</span>
          </div>
          <div className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faUsers} aria-label='Year Built' />
            <span className='ml-2'>{yearBuilt}</span>
          </div>
          <div className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faToilet} aria-label='Bathrooms' />
            <span className='ml-2'>{bathrooms}</span>
          </div>
          <div className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faHome} aria-label='Property Sq. ft.' />
            <span className='ml-2'>{sqft}</span>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} >
        <InquiryForm
            address={address}
            city={city}
            state={state}
            zipCode={zipCode}
            bedrooms={bedrooms}
            yearBuilt={yearBuilt}
            bathrooms={bathrooms}
            sqft={sqft}
            imageSrc={imageSrc}
            setClose={closeModal}
        />
      </Modal>
    </div>
  );
};

export default Card;