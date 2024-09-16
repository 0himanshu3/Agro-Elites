import React, { useState, useEffect } from 'react';

const stories = [
  {
    imgSrc: '/images/1.jpeg', 
    description: 'Story of a farmer who increased profits by 30% using direct sales.',
  },
  {
    imgSrc: '/images/2.jpeg',
    description: 'How cold storage helped a farmer reduce spoilage by 50%.',
  },

  {
    imgSrc: '/images/4.jpeg',
    description: 'How government schemes helped a small farmer expand his business.',
  },
];

const Stories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % stories.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToPreviousStory = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
  };

  const goToNextStory = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  return (
    <div id="stories" className="bg-green-400 p-8 rounded-lg mt-8 m-4 relative">
      <h4 className="text-xl font-bold text-gray-900 mb-4">Success Stories</h4>
      <div className="bg-green-600 p-4 rounded-lg text-center relative">
        <button
          onClick={goToPreviousStory}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          &#9664;
        </button>
        <img
          src={stories[activeIndex].imgSrc}
          alt="story"
          className="mb-4 w-full h-64 md:w-3/4 md:h-80 lg:w-1/2 lg:h-96 mx-auto rounded-lg object-cover"
        />
        <p className="text-white">{stories[activeIndex].description}</p>
        <button
          onClick={goToNextStory}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default Stories;
