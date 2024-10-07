import { useEffect, useState } from 'react';
import NewsCard from '@/components/NewsCard';
import Loader from '@/components/Loader';

const FetchNews = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function handlePrev() {
    if (page > 1) setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  const pageSize = 12;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    fetch(`/api/newsfetched/all-news?page=${page}&pageSize=${pageSize}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then(myJson => {
        console.log('API Response:', myJson);
        if (myJson.success) {
          setTotalResults(myJson.data.totalResults);
          setData(myJson.data.articles);
        } else {
          setError(myJson.message || 'An error occurred');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError('Failed to fetch news. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      
      <nav class="bg-green-950 border-gray-200 dark:bg-green-900">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
              <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                  <img src="" class="h-8" alt="Logo" />
                  <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Krishi</span>
              </a>
              <div class="flex items-center space-x-6 rtl:space-x-reverse">
                  <a href="/" class="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Home</a>
                  <a href="/" class="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Donation Portal</a>
              </div>
          </div>
      </nav>

      <div className='my-10 cards flex flex-wrap justify-center gap-4'>
        {!isLoading ? data.map((element, index) => (
          <NewsCard
            title={element.title}
            description={element.description}
            imgUrl={element.urlToImage}
            publishedAt={element.publishedAt}
            url={element.url}
            author={element.author}
            source={element.source.name}
            key={index}
          />
        )) : <Loader />}
      </div>
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button disabled={page <= 1} className='pagination-btn text-center' onClick={handlePrev}>&larr; Prev</button>
          <p className='font-semibold opacity-80'>{page} of {Math.ceil(totalResults / pageSize)}</p>
          <button className='pagination-btn text-center' disabled={page >= Math.ceil(totalResults / pageSize)} onClick={handleNext}>Next &rarr;</button>
        </div>
      )}
    </>
  );
}

export default FetchNews;
