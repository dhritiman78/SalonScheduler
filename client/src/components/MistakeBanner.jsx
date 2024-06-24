import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const MistakeBanner = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    if (isVisible) {
      const countdown = setInterval(() => {
        setTimer((prev) => (prev > 1 ? prev - 1 : 0));
      }, 1000);

      const timeout = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 5000);

      return () => {
        clearInterval(countdown);
        clearTimeout(timeout);
      };
    }
  }, [isVisible, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    isVisible && (
      <div className="fixed top-0 right-0 w-full md:w-auto p-4 bg-red-500 shadow-lg flex justify-between items-center z-50 transform transition-all ease-in-out duration-300">
        <p className="text-white font-bold">{message} ({timer}s)</p>
        <button onClick={handleClose} className="ml-4 focus:outline-none">
          <FaTimes className="w-6 h-6 text-white" />
        </button>
      </div>
    )
  );
};

export default MistakeBanner;
