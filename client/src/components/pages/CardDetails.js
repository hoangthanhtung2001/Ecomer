import React, { useEffect } from 'react'
import {useQuery} from'react-query'
import { useSelector } from 'react-redux'
import { deleteCart, getCart, handleErr } from '../api/api'
import { useMyContext } from '../context/store'
// import useMutation from '../custom/useMutation'
import { useMutation,useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { STATES } from 'mongoose'
const CardDetails = () => {
    const auth = useSelector(state=>state.auth)
    const {user} = auth
    const token = useSelector(state=>state.token)
    const {count,setCount} = useMyContext(user.count)
    const queryClient = useQueryClient()
    // const {mutate} = useMutation()
    const Delete =useMutation((dataId)=>deleteCart(dataId,token),{
        onSuccess:(data)=>{
            setCount(data.data.length)
            toast.success(data.msg)
        },
        onError:(err)=>handleErr(err),
        onSettled:()=>queryClient.invalidateQueries() 
    })
    const {refeching} = useMyContext()
    const key =['/cart',token]
    const {data,isLoading,isError,refetch} = useQuery({
        queryKey:key,
        queryFn:getCart,
        retry:false,
        refetchOnWindowFocus:false
    })
    useEffect(()=>{
        refetch()
    },[refeching])
    const handleDelete =async(id)=>{
        if(token){
            // mutate(()=>deleteCart(Number(id),token))
            Delete.mutate(id)
        }
    }
  return (
<div className='cart'>
    <div className='cart-title'>
             <h2>Shopping Cart</h2>
             <span>{data?.count && data.count} items in your cart</span>
    </div>
    {
      data?.data &&  data.data.map(product => (
            // <div className="detail cart" key={product.OrderId}>
                
              
            //     <img src={product.OrderImg} alt="" />

            //     <div className="box-detail">
            //         <h2>{product.OrderName}</h2>
            //         <div className="amount">
            //             <button > - </button>
            //             <span>{product.OrderQuantity}</span>
            //             <button> + </button>
            //         </div>
                    
            //         <div className="delete" onClick={()=>handleDelete(product.OrderId)}>
            //             X
            //         </div>
            //     </div>
            // </div>
            <div className="detail-cart" key={product.OrderId}>
                        <img src={product.OrderImg} alt="" />

                        <div className="box-detail">
                            <div className='box-infor'>
                                <h2>{product.OrderName}</h2>
                                <h3>{product.OrderPrice}</h3>
                            </div>
                            <div className='box-btn'>
                                <div className="amount">
                                    <button> - </button>
                                    <span>{product.OrderQuantity}</span>
                                    <button> + </button>
                                </div>
                                <div className='remove-btn' onClick={()=>handleDelete(product.OrderId)}>
                                    <button>X</button>
                                </div>
                            </div>
                        </div>
             </div>
        ))
    }

    <div className="total">
        <h3>Total: $ {data?.totalPrice&& data.totalPrice}</h3>
    </div>
</div>
  )
}

export default CardDetails