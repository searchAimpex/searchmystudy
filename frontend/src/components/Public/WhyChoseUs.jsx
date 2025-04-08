import React from 'react'
import ChoseUs1 from '../../assets/ChoseUs1.png'
import ChoseUs2 from '../../assets/ChoseUs2.png'
import ChoseUs3 from '../../assets/ChoseUs3.png'
import ChoseUs4 from '../../assets/ChoseUs4.png'
import ChoseUs5 from '../../assets/ChoseUs5.png'
import ChoseUs6 from '../../assets/ChoseUs6.png'

function WhyChoseUs() {
    return (
        <div className='bg-[#E2ECF4]'>
            <div className=' py-10 px-5  flex flex-col space-y-6 '>
                <div className='flex flex-col items-center space-y-3'>
                    <div className='flex  space-y-3'>
                        <div className="flex flex-wrap  items-center gap-x-2 gap-y-1 text-center px-3">
                            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-main">Why</span>
                            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold-main">Choose </span>
                            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-main">SearchMyStudy</span>
                            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold-main">?</span>
                        </div>



                    </div>
                    <div>
                        <p className="sm:text-base md:text-xl lg:text-xl font-semibold text-gray-500 max-w-4xl mx-auto px-3">
                            Explore the Unique Features That Make SearchMyStudy Your Ideal Educational Partner
                        </p>
                    </div>

                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 py-8'>
                    {[ChoseUs1, ChoseUs2, ChoseUs3, ChoseUs4, ChoseUs5, ChoseUs6].map((img, index) => {
                        const titles = [
                            "Comprehensive Database",
                            "Expert Counselling",
                            "Country and Universities",
                            "Proven Success",
                            "Real-Time Assistance",
                            "Advance Search"
                        ];
                        const descriptions = [
                            "Access Detailed Information on thousands of universities and courses.",
                            "Get personal guidance from our expert counselors.",
                            "Offering detailed insights into different study destinations.",
                            "Hear from students who have successfully secured their dream courses through our platform.",
                            "Promoting chatbots and live chat features for instant help.",
                            "Allowing users to find courses that match their criteria."
                        ];

                        return (
                            <div key={index} className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5'>
                                <div className='h-40 flex items-center justify-center'>
                                    <img src={img} alt={titles[index]} className="max-h-full object-contain" />
                                </div>
                                <div className='pt-4 text-center'>
                                    <p className='font-bold text-xl text-blue-900 mb-2'>{titles[index]}</p>
                                    <p className='text-gray-500 text-l font-medium'>{descriptions[index]}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>


            </div>

        </div>
    )
}

export default WhyChoseUs