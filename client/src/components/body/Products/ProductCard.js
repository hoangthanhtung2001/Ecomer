import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from"react-router-dom"
import { addToCart, handleErr } from '../../api/api'
// import useMutation from '../../custom/useMutation'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { useMyContext } from '../../context/store'
const ProductCard = ({product}) => {
  const auth = useSelector(state=>state.auth)
  const token = useSelector(state=>state.token)
  const {setCount} = useMyContext()
  const addCart = useMutation((dataId)=>addToCart(dataId,token),{
    onSuccess:(data)=>{
        setCount(data.data.length)
       toast.success(data.msg)
    },
    onError:(err)=>handleErr(err)
  })
//   const {mutate} = useMutation()
  const {isLogged,isAdmin} = auth
  const handleAdd = async(id)=>{
    //   mutate(()=>addToCart(id,token))
    addCart.mutate(id)
  }
  return (
    <div className="card" >
        <img src={product.image} alt={product.image} />

        <div className="box">
            <h3>
                <Link to={`/products/${product._id}`}>
                <span/>
                {product.title}
                </Link>
            </h3>
            <h4>${product.price}</h4>

            {isAdmin&& <div className='btn_div'>
                <button className="btn_edit">Edit</button>
                <button className="btn_delete">Delete</button>
            </div>}
            {!isAdmin&& <div className='btn_div'>
                <button className="btn_edit" onClick={()=>handleAdd(product._id)}>Add Cart</button>
                <button className="btn_delete">Views</button>
            </div>}
            </div>
    </div>
  )
}

export default ProductCard