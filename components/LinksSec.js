import React, { useState, useEffect } from 'react';

const LinksSec = () => {
  const [linksinfo, setLinksinfo] = useState([]);
  const [error, setError] = useState(null);
  const [vislinks,setVislinks]=useState([]);

  useEffect(() => {
    
    fetch('/Links/LinkInfo.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) =>{
         setLinksinfo(data);
         if(data.length>0){
            setVislinks(data.slice(0,3));
         }
        
        })
      .catch((err) => {
        setError(err);
        console.error('Error fetching data:', err);
      });


  },[]);
  useEffect(()=>{
    const intervalId=setInterval(()=>{
        if(linksinfo.length>0){
            setVislinks((prevVisible)=>{
                const nextInd=(linksinfo.indexOf(prevVisible[0])+1)%linksinfo.length;
                const nextVisible=linksinfo.slice(nextInd,nextInd+3);
                return nextVisible.length<3? [...nextVisible,...linksinfo.slice(0,3-nextVisible.length)]:nextVisible;
            });
        }
    },3000);
    return ()=> clearInterval(intervalId);
  },[linksinfo])

  return (
    <div className="bg-slate-400 text-gray-500 py-4">
      <h2 className="text-center text-3xl font-bold mb-4">Important Links</h2>
      {error && <p className="text-center text-red-500">{error.message}</p>}
      <div className="flex items-center justify-between px-8 mx-6">
        {vislinks.length > 0 && (
          vislinks.map((link, index) => (
            <a
              key={index}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:scale-110"
            >
              <img
                src={link.image}
                alt={`Link ${index}`}
                className="h-40 w-60 object-contain"
              />
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default LinksSec;
