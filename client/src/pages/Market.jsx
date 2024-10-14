import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CropCard from '../components/Crop'; // Assuming you're using CropCard component for crops

export default function Market() {
  const [filterData, setFilterData] = useState({
    searchTerm: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch all crops or filtered crops based on URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const categoryFromUrl = urlParams.get('category');
    const minPriceFromUrl = urlParams.get('minPrice');
    const maxPriceFromUrl = urlParams.get('maxPrice');

    const isFilterApplied =
      searchTermFromUrl || categoryFromUrl || minPriceFromUrl || maxPriceFromUrl;

    // Update filter data based on URL params if filters are applied
    if (isFilterApplied) {
      setFilterData({
        searchTerm: searchTermFromUrl || '',
        category: categoryFromUrl || '',
        minPrice: minPriceFromUrl || '',
        maxPrice: maxPriceFromUrl || '',
      });
    }

    const fetchCrops = async () => {
      setLoading(true);
      // If no filters applied, fetch all crops
      const searchQuery = isFilterApplied ? urlParams.toString() : '';
      console.log(searchQuery);
      const res = await fetch(`/api/crop/getAllCrops?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setCrops(data.crops);
      setLoading(false);
      setShowMore(data.crops.length === 9); // Adjust based on pagination logic
    };

    fetchCrops();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilterData({ ...filterData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(filterData);
    const searchQuery = urlParams.toString();
    navigate(`/market?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfCrops = crops.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', numberOfCrops);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/crop/getAllCrops?${searchQuery}`);
    if (!res.ok) return;
    const data = await res.json();
    setCrops([...crops, ...data.crops]);
    setShowMore(data.crops.length === 9);
  };

  const handleReset = async () => {
    // Reset filter state
    setFilterData({
      searchTerm: '',
      category: '',
      minPrice: '',
      maxPrice: '',
    });

    // Reset URL parameters to default (i.e., no filters)
    navigate('/market');

    // Fetch all crops again after reset
    setLoading(true);
    const res = await fetch(`/api/crop/getAllCrops`);
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const data = await res.json();
    setCrops(data.crops);
    setLoading(false);
    setShowMore(data.crops.length === 9);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Search Name:</label>
            <TextInput
              placeholder='Search by name...'
              id='searchTerm'
              type='text'
              value={filterData.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <Select onChange={handleChange} value={filterData.category} id='category'>
              <option value=''>All Categories</option>
              <option value='vegetables'>Vegetables</option>
              <option value='fruits'>Fruits</option>
              <option value='grains'>Grains</option>
            </Select>
          </div>

          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Min Price:</label>
            <TextInput
              id='minPrice'
              type='number'
              value={filterData.minPrice}
              onChange={handleChange}
              placeholder='Min Price'
            />
          </div>

          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Max Price:</label>
            <TextInput
              id='maxPrice'
              type='number'
              value={filterData.maxPrice}
              onChange={handleChange}
              placeholder='Max Price'
            />
          </div>

          <div className='flex gap-4'>
            <Button type='submit' outline gradientDuoTone='purpleToPink'>
              Apply Filters
            </Button>
            <Button type='button' color='gray' onClick={handleReset}>
              Reset Filters
            </Button>
          </div>
        </form>
      </div>

      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>
          Crops results:
        </h1>
        <div className='p-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {!loading && crops.length === 0 && (
            <p className='text-xl text-gray-500'>No crops found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
  crops
    .filter((crop) => crop.quantity > 0) // Filter crops where quantity is greater than 0
    .map((crop) => (
      <div key={crop._id} className='flex flex-col'>
        <CropCard crop={crop} />
      </div>
    ))}

          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
