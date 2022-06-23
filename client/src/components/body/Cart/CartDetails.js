import React from 'react'
import { useSelector } from 'react-redux'
import { useMyContext } from '../../context/store'
import { deleteCart,handleErr } from '../../api/api'
import { toast } from 'react-toastify'
import { useMutation,useQueryClient } from 'react-query'
const CartDetails = () => {
    const auth = useSelector(state=>state.auth)
    const {user} = auth
    const token = useSelector(state=>state.token)
    const {count,setCount} = useMyContext()
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
    const handleDelete =async(id)=>{
        if(token){
            // mutate(()=>deleteCart(Number(id),token))
            Delete.mutate(id)
        }
    }
  return (
    <div className='cart'>
    {
      user?.order &&  user.order.map(product => (
            <div className="detail cart" key={product.OrderId}>
                <img src={product.OrderImg} alt="" />

                <div className="box-detail">
                    <h2>{product.OrderName}</h2>
                    <h3>{user?.count && user.count}</h3>
                    <div className="amount">
                        <button > - </button>
                        <button> + </button>
                    </div>
                    
                    <div className="delete" onClick={()=>handleDelete(product.OrderId)}>
                        X
                    </div>
                </div>
            </div>
        ))
    }

    <div className="total">
        <h3>Total: $ {user?.totalPrice&& user.totalPrice}</h3>
    </div>
</div>


  )
}

export default CartDetails