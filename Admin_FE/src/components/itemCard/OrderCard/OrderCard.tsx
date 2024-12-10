import React from 'react';
import ImageCustom from '@/components/image/ImageCustom';

const OrderCard = () => {
    return (
        <div className='bg-white border-sm shadow-lg h-fit w-1/5 p-5 m-4 rounded-md'>
            <div className='flex flex-col'>
                <h1>User: Thanh Trong</h1>
                <div>
                    <span>Cart:</span>
                    <div className='flex flex-col'>
                        <div className='flex flex-col'>
                            <ImageCustom
                                src='https://www.w3schools.com/w3images/lights.jpg'
                                alt='image'
                            />
                            <div className='flex flex-col'>
                                <span>Product Name:</span>
                                <span>Price:</span>
                                <span>Quantity:</span>
                            </div>
                        </div>
                    </div>
                </div>
                <span>Total Price:</span>
            </div>
        </div>
    );
};

export default OrderCard;
