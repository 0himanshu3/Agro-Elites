import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import News from '../components/News';
import User from '../../../api/models/user.model';
import LinksSection from '../components/LinksSection';
export default function Home() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };

    fetchPosts();
  }, []);
  

  return (
    <div>
      {/* Intro */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto text-center'>
        <h1 className='text-4xl font-bold lg:text-6xl'>Welcome to Krishi-Help</h1>
        <p className='text-gray-500 text-lg sm:text-xl'>
          Your trusted partner in agriculture, bridging the gap between distributors and farmers. 
          At Krishi-Help, we empower farmers with easy access to quality products and services, 
          ensuring a sustainable and prosperous agricultural community. 
          Join us in revolutionizing farming through innovation and connectivity.
        </p>
        <Link
          to='/about'
          className='mt-4 text-lg text-teal-500 font-bold hover:underline'
        >
          Know More About Us
        </Link>
      </div>

      {/* Sliding News Section */}
      <div className="bg-gradient-to-r from-yellow-200 to-yellow-400 p-6 rounded-lg mb-8 max-w-6xl mx-auto">
        <News />
      </div>
      <div className='max-w-6xl mx-auto p-3 py-7'>
        
        
        {currentUser && currentUser.isFarmer && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
        <div className='py-4'>
       <LinksSection/>
       </div>
      </div>
    </div>
  );
}
