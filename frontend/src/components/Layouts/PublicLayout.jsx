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

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        console.log("execute")
        const result = await FetchMainPopup().unwrap();
        console.log("result",result)
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[600px] mx-4">
            <div className="p-4">
              <img className="text-gray-600 h-[500px] w-[600px] object-contained mb-6" src={popups[currentPopupIndex]?.imageURL}></img>
              <div className="flex justify-end">
                <button
                  onClick={handleClosePopup}
                  className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  {currentPopupIndex < popups.length - 1 ? 'Next' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        <PublicNavBar />
        <Outlet />
        < Footer />
    </div>
  )
}

export default PublicLayout