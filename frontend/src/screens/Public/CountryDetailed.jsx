import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCountryFetchOneMutation } from '../../slices/adminApiSlice';
import { FetchOneCountry } from '../../slices/countrySlice';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import Typical from 'react-typical';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function CountryDetailed() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [CountryFetchOne, { isLoading }] = useCountryFetchOneMutation();
    const { singleCountry } = useSelector((state) => state.country);

    // Fetch Country Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await CountryFetchOne(id).unwrap();
                dispatch(FetchOneCountry(result));
            } catch (error) {
                console.error('Failed to fetch services:', error);
            }
        };
        fetchData();
    }, [id, dispatch, CountryFetchOne]);

    // Handle loading state
    if (isLoading) {
        return <Loader />;
    }

    // Animation controls
    const controls = useAnimation();

    // Render hook to control animation visibility
    const renderSection = (items, index) => {
        const { ref, inView } = useInView({
            triggerOnce: true,
            threshold: 0.3,
        });

        useEffect(() => {
            if (inView) {
                controls.start('visible');
            }
        }, [controls, inView]);

        return (
            <div key={items.title} ref={ref}>
                <div className="flex items-center mt-[50px]">
                    <div className="h-[4px] w-1/6 bg-gradient-to-r from-custom-color to-transparent rounded-full"></div>
                    <h2 className="text-3xl lg:text-4xl text-gradient ml-4">{items.title}</h2>
                </div>
                <div className="flex flex-col lg:flex-row mt-[30px] gap-10">
                    <motion.div
                        initial="hidden"
                        animate={controls}
                        variants={index % 2 === 0 ? fadeSlideVariants : scaleUpVariants}
                        transition={{ duration: 1 }}
                        className="lg:w-1/2 p-5"
                    >
                        <p className="text-md lg:text-lg text-gradient font-medium leading-relaxed">{items.description}</p>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate={controls}
                        variants={index % 2 !== 0 ? fadeSlideVariants : scaleUpVariants}
                        transition={{ duration: 1 }}
                        className="lg:w-1/2 flex justify-center"
                    >
                        <img src={items.url} className="h-[450px] w-full object-cover rounded-lg shadow-lg" alt={items.title} />
                    </motion.div>
                </div>
            </div>
        );
    };

    return (
        <div>
            {/* Banner Image */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeSlideVariants}
                transition={{ duration: 1 }}
            >
                <img
                    className="h-[600px] w-full object-cover rounded-b-3xl shadow-lg"
                    src={singleCountry?.bannerURL}
                    alt={`${singleCountry?.name} Banner`}
                />
            </motion.div>

            <div className="mx-[50px] lg:mx-[100px]">
                {/* Country Title with Gradient Divider */}
                <div className="flex flex-col items-center mt-[50px]">
                    <Typical
                        steps={[singleCountry.name, 5000]}
                        loop={5}
                        wrapper="h1"
                        className="text-5xl lg:text-6xl font-extrabold text-blue-main mb-4"
                    />
                    <div className="h-[4px] w-2/3 bg-gradient-to-r from-custom-color to-transparent rounded-full"></div>
                </div>

                {/* Country Details */}
                <div className="flex flex-col lg:flex-row mt-[50px] gap-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={scaleUpVariants}
                        transition={{ duration: 1 }}
                        className="lg:w-1/2 flex justify-center"
                    >
                        <img src={singleCountry?.flagURL} alt={`${singleCountry?.name} Flag`} className="w-3/4 shadow-xl rounded-lg" />
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeSlideVariants}
                        transition={{ duration: 1 }}
                        className="lg:w-1/2 flex items-center p-5"
                    >
                        <p className="text-xl lg:text-2xl text-gradient font-bold leading-relaxed">{singleCountry?.description}</p>
                    </motion.div>
                </div>

                {/* Sections */}
                {singleCountry?.sections?.map(renderSection)}

                {/* Provinces */}
                <div className="my-[50px]">
                    <div className="flex items-center">
                        <div className="h-[4px] w-1/6 bg-gradient-to-r from-custom-color to-transparent rounded-full"></div>
                        <h2 className="text-2xl lg:text-3xl text-gradient ml-4">Provinces</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 my-[50px]">
                        {singleCountry?.Province?.map((items) => (
                            <motion.div
                                key={items._id}
                                initial="hidden"
                                animate="visible"
                                variants={scaleUpVariants}
                                transition={{ duration: 1 }}
                                className="shadow-lg rounded-lg overflow-hidden"
                            >
                                <img src={items?.heroURL} className="h-[150px] w-full object-cover" alt={items.name} />
                                <div className="flex justify-between p-4">
                                    <p className="text-lg text-gradient font-semibold">{items.name}</p>
                                    <button
                                        onClick={() => navigate(`/province/${items._id}`)}
                                        className="text-lg text-custom-color font-semibold"
                                    >
                                        View
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
