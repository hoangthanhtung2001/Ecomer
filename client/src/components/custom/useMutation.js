import React,{useState} from 'react'
import { useMyContext } from '../context/store'
import {toast} from'react-toastify'
const useMutation = () => {
    const {refeching,setRefeching} = useMyContext()
    const [data,setData] = useState()
    const[loading,setLoading] = useState(false)
    const [err,setErr] = useState()
    const mutate = (callback)=>{
        setLoading(true)
        callback()
        .then(res=>{
            setData(res.data)
            toast.success('Update')
            setRefeching(prev=>!prev)
        })
        .catch(err=>{
            if(err.response.data.msg){
                throw new Error(err.response.data.msg)
            }
            else{
                throw new Error(err.message)
            }
        })
        .finally(()=>setLoading(false))
    }
  return {mutate,data,loading}
}

export default useMutation