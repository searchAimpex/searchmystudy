import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import PublicNavBar from '../Public/PublicNavBar'
import Footer from '../Public/Footer'
import { useFetchMainPopupMutation } from '../../slices/adminApiSlice'

function PublicLayout() {
  const [FetchMainPopup] = useFetchMainPopupMutation()
  const [popups, setPopups] = useState([]);
  const [currentPopupIndex, setCurrentPopupIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [webData, setWebData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
      const fetchWebDetails = async () => {
        try {
          const response = await fetch(
            'https://searchmystudy.com/api/admin/getWebsiteDetails'
          );
  
          if (!response.ok) throw new Error('Failed to fetch website details');
          const result = await response.json();
          // console.log(result,"<<<<<<<<<<<<<<<<<<")
          setWebData(Array.isArray(result) ? result[0] : result);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchWebDetails();
    }, []);
    
    // console.log(webData,">>>>>>>>>>>>>>>>>>>>>>>>>>")


  useEffect(() => {
    const fetchPopups = async () => {
      try {
        // console.log("execute")
        const result = await FetchMainPopup().unwrap();
        // console.log("result", result)
        setPopups(result);
        if (result.length > 0) {
          setIsPopupOpen(true);
        }
      } catch (err) {
        console.error('Failed to fetch popups:', err);
      }
    };

    fetchPopups();
  }, [FetchMainPopup]);

  const handleClosePopup = () => {
    if (currentPopupIndex < popups.length - 1) {
      setCurrentPopupIndex(currentPopupIndex + 1);
    } else {
      setIsPopupOpen(false);
      setCurrentPopupIndex(0);
    }
  };
  return (
    <div>
      {/* Tailwind CSS Popup Dialog */}
      {isPopupOpen && popups.length > 0 && (
        <div
          style={{ zIndex: 5000 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            style={{ zIndex: 5000 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-lg shadow-xl relative  mx-auto max-h-[85vh]">
              {/* ❌ Close button */}
              <button
                style={{ backgroundColor: "transparent", borderRadius: "100%" }}
                onClick={handleClosePopup}
                className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-3xl font-bold focus:outline-none z-10"
              >
                &times;
              </button>

              <div className="p-2 flex items-center justify-center">
                <img
                  src={popups[currentPopupIndex]?.imageURL}
                  alt="Popup"
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
              </div>
            </div>
          </div>

        </div>
      )}

      <PublicNavBar webData={webData} />
      <Outlet webData={webData} />
      <Footer webData={webData}/>
    </div>

  )
}

export default PublicLayout