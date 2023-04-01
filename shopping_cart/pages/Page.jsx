import Card from '@/components/Card'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { BsCart } from 'react-icons/bs'
import data from '../api/index';
import Link from 'next/link';
import Image from 'next/image';
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteCart } from '@/slices/cartSlice';


export default function Landing() {
    const dispatch = useDispatch();

    
    const [product, setProduct] = useState([]);
    const [qnt, setQnt] = useState(0)



    const cart = useSelector(state => state.cart.cart);



    useEffect(() => {
        setProduct(data)
    }, [])

    const handleIncrement = (id) => {
        const updatedCartItems = cart?.map(prod => {
            if (prod.id === id) {
                let newQuantity =  prod?.product_quantity +  1
                return {
                    ...prod,
                    product_quantity: newQuantity ,
                };
            }
            return prod;
        });

        if (qnt > 0) {
            let quantity = qnt + 1
            setQnt(quantity)
            dispatch(setDeleteCart(updatedCartItems))
        }
        else {
            setQnt(1)
            dispatch(setDeleteCart(updatedCartItems))
        }
    }



    const handleDecrement = (id) => {
        const updatedCartItems = cart?.map(prod => {
            if (prod.id === id) {
                if(prod?.product_quantity > 1){
                    let newQuantity =  prod?.product_quantity -  1
                    return {
                        ...prod,
                        product_quantity: newQuantity ,
                    };
                } 
            }
            return prod;
        });

        if (qnt > 1) {
            let quantity = qnt - 1
            setQnt(quantity)
            dispatch(setDeleteCart(updatedCartItems))
        }
        else {
            setQnt(1)
            dispatch(setDeleteCart(updatedCartItems))

        }
    }

    const handleDelete = (id) => {
        const newCart = cart?.filter(item => item?.id !== id)
        dispatch(setDeleteCart(newCart))
    }

    const totalPrice = cart.reduce((acc, item) => {
        return acc + (item.product_quantity * item.product_price);
      }, 0);



    return (
        <div className='w-full px-2 py-2 flex flex-col items-center'>
            <h1 className='text-lg font-extrabold py-2 mb-2 border-b border-indigo-600'>Shopping Cart</h1>
            <div className='fixed top-0 right-0 '>
                <Link href="#cart" className='relative'><BsCart className=" md:text-6xl mx-4  text-2xl" /></Link>
                <p className='absolute z-10 top-0 right-1 text-red-600 text-xl font-semibold'>{cart.length}</p>
            </div>
            <div className=' w-full h-full flex md:flex-row flex-col '>
                <div className=':w-8/12 w-full py-4 flex flex-wrap'>
                    {

                        product?.map((item) => {
                            return <Card key={item.id} item={item} />
                        })
                    }
                </div>
                <div id='cart' className='lg:w-4/12 w-full py-4 px-2'>
                    {
                        cart?.map((prod) => {
                            return (
                                <div key={prod?.id} className='w-full bg-gray-100  py-2 mb-2 flex items-center justify-around'>
                                    <Image src={prod?.product_image} alt="" width={100} height={100} className="rounded-full" />
                                    <p>{prod?.product_name}</p>
                                    <p>{prod?.product_price}</p>
                                    <div className='flex '>
                                        <button onClick={() => handleIncrement(prod?.id)} className="cursor-pointer text-xl">+</button>
                                        <p className='text-xl'>{prod?.product_quantity}</p>
                                        <button onClick={() => handleDecrement(prod?.id)} className="cursor-pointer text-xl">-</button>
                                    </div>
                                    <AiFillDelete onClick={() => handleDelete(prod?.id)} className="text-red-500 cursor-pointer text-xl" />

                                </div>
                            )
                        })
                    }

                    <div className='px-2 py-2 flex justify-end items-center'>
                        <p>Total Price {totalPrice}</p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
