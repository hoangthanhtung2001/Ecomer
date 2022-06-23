import axios from "axios"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

export const handleErr = (err)=>{
    if(err.response.data.msg){
        toast.error(err.response.data.msg)
        throw new Error(err.response.data.msg)
    }
    else{
        toast.error(err.message)
        throw new Error(err.message)
    }
}

export const getData = async({queryKey})=>{
    try {
        const res = await axios.get(`${queryKey[0]}`)
        return res.data
    } catch (error) {
        handleErr(error)
    }
}
export const getCart = async({queryKey})=>{
    try {
        const res = await axios.get(`${queryKey[0]}`,{
            headers:{Authorization:queryKey[1]}
        })
        return res.data
    } catch (error) {
        handleErr(error)
    }
}
export const addToCart = async(id,token)=>{

  const res= await axios.post(`/add_cart/${id}`,null,{
        headers:{Authorization:token}
    })
    return res.data
}

export const deleteCart = async(id,token)=>{
    const res = await axios.delete(`/cart/${id}`,{
        headers:{Authorization:token}
    })
    return res.data
}