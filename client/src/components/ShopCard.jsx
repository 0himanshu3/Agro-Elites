const ShopCard = ({ shop }) => {
  return (
    <div className="shop-card bg-white p-4 shadow-md rounded-lg flex flex-col items-start h-64 w-64 overflow-auto">
      <h3 className="font-bold text-lg mb-2">{shop.name}</h3>
      <p className="text-gray-600 mb-2">Address: {shop.address}</p>
      <p className="text-gray-600 mb-4">Phone: {shop.phoneNumber}</p>

      {shop.website !== "Not available" && (
        <a
          href={shop.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-auto"
        >
          Visit Website
        </a>
      )}
    </div>
  );
};

export default ShopCard;
