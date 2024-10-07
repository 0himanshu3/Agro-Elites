import { useEffect ,useState} from 'react';
import MiniCard from '@/components/MiniCard';
import Link from 'next/link';
const News = () => {
  const [data,setData]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState(null);
  useEffect(()=>{
    setIsLoading(true);
    setError(null);
    fetch('/api/newsfetched/all-news?page=1&pageSize=5')
    .then(response=> {
      if(response.ok){
        return response.json();
      }
      throw new Error('Network response was not ok');
    })
    .then(myJson=>{
      if(myJson.success){
        setData(myJson.data.articles);
      }
      else{
        setError(myJson.message|| 'An error occured');
      }
    })
    .catch(error=>{
      console.error('Fetch error:',error);
      setError('Failed to fetch news,Please try again later.');
    })
    .finally(()=>{
      setIsLoading(false);
    })
  },[]);

  return (
  <div id="news" className="bg-gradient-to-r from-yellow-200 to-yellow-400 p-6 rounded-lg border-2 border-yellow-300">
    <div className="flex items-center justify-between mb-6">
      <h4 className="text-lg font-extrabold text-gray-900">News Section</h4>
      <Link href={'/NewsFetched'}>
      <button className="bg-green-600 hover:bg-green-800 text-white px-5 py-2 rounded-full  transition-transform transform hover:scale-105">
        Read More
      </button>
    </Link>
    </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mini-cards flex flex-col gap-2">
        {!isLoading ? data.map((element,index)=>(
          <MiniCard
          title={element.title}
          imgUrl={element.urlToImage}
          publishedAt={element.publishedAt}
          key={index}
          />
        )):<div className="text-center text-gray-700">Loading...</div>}
      </div>
  </div>
  )
};

export default News;
