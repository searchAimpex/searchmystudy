import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchOneProvinceMutation } from '../../slices/adminApiSlice';
import { FetchOneProvinces } from '../../slices/provinceSlice';
import Loader from '../../components/Loader';

export default function ProvinceDetailed() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [FetchOneProvince, { isLoading }] = useFetchOneProvinceMutation();
    const { singleProvince } = useSelector((state) => state.province);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchOneProvince(id).unwrap();
                dispatch(FetchOneProvinces(result));
            } catch (error) {
                console.error('Failed to fetch province:', error);
            }
        };
        fetchData();
    }, [id, dispatch, FetchOneProvince]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <div>
                <img className='h-[600px] object-cover w-full' src={singleProvince?.bannerURL} />
            </div>
            <div className='mx-[100px]'>

                <div className='px-[100px] mt-[50px] flex flex-row w-full justify-between items-center space-x-10'>
                    <div className='h-[10px] w-full bg-custom-color rounded-xl'></div>
                    <div>
                        <span className='text-4xl text-gradient'>{singleProvince?.name}</span>
                    </div>
                    <div className='h-[10px] w-full bg-custom-color rounded-xl'></div>
                </div>
                <div className='mt-[50px] flex flex-row w-full space-x-4 justify-between'>
                    <div className='w-1/3  flex items-center justify-center'>
                        <img src={singleProvince?.heroURL} />
                    </div>
                    <div className='w-2/3 flex items-center justify-center'>
                        <p className='text-xl'>{singleProvince?.description}</p>
                    </div>
                </div>
                <div>
                    {singleProvince?.sections?.map((item, index) => (
                        <div key={index}>
                            <div className='px-[100px] mt-[50px] flex flex-row w-full justify-start items-center space-x-10'>
                                <div className='h-[10px] w-1/6 bg-custom-color rounded-xl'></div>
                                <div>
                                    <span className='text-4xl text-gradient'>{item?.title}</span>
                                </div>
                            </div>
                            <div className='mt-[50px] flex flex-row w-full'>
                                <div className='w-1/2 flex items-center justify-center'>
                                    <p className='text-xl'>{item?.description}</p>
                                </div>
                                <div className='w-1/2 flex items-center justify-center'>
                                    <img src={item?.url} className='h-[450px] object-cover' />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='my-[50px]'>
                    <div className='grid grid-cols-4 gap-10 my-[50px]'>
                        {singleProvince?.University?.map((items)=>{
                            return (
                                <div className='shadow-xl flex flex-col p-2'>
                                    <div className='flex items-center'>
                                        <img src={items?.heroURL} className='object-cover h-[150px] w-full' />
                                    </div>
                                    <div className='flex flex-row justify-between p-5 items-center'>
                                        <p className='text-xl text-gradient font-bold'>{items.name}</p>
                                        <button
                                        onClick={()=>navigate(`/university/${items._id}`)} 
                                        className='text-xl text-gradient font-bold'>VIEW</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
