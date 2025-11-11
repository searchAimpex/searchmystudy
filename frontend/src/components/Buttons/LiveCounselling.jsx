import React from 'react';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

export default function LiveCounselling() {
  return (
    <div className="flex w-full flex-row items-center justify-center">
      <button className="animate-border inline-block rounded-md bg-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1 transition transform hover:scale-110">
          <div className="block flex flex-row items-center rounded-md bg-white px-2 py-1 font-bold text-custom-color text-xs">
            <span><HeadsetMicIcon /></span>
            <span>LIVE COUNSELLING</span>
          </div>
      </button>
    </div>
  );
}
