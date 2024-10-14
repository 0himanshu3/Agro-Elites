import React from 'react';

function NewsCard(props) {
    return (
        <div className="news-card bg-white shadow-lg rounded-lg overflow-hidden mb-6 transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col h-full">
            <div className="news-card-img h-48 overflow-hidden">
                <img 
                    src={props.imgUrl} 
                    alt="img" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <b className="title block text-lg font-semibold mb-2 text-gray-800">{props.title}</b>
                <p className="description-text text-gray-600 text-sm mb-3 flex-grow">
                    {props.description?.substring(0, 100)}...
                </p>
                <div className="info text-sm text-gray-500">
                    <div className="src-info mb-2">
                        <span className="font-semibold text-gray-700">Source:</span>
                        <a 
                            href={props.url}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="link underline ml-1 hover:text-blue-500 break-words"
                        >
                            {props.source.substring(0, 30)}
                        </a>
                    </div>
                    <div className="origin flex flex-col">
                        <p className="origin-item mb-1">
                            <span className="font-semibold text-gray-700">Author:</span> {props.author || "Unknown"}
                        </p>
                        <p className="origin-item">
                            <span className="font-semibold text-gray-700">Published:</span> {new Date(props.publishedAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;
