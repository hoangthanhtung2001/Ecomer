import React,{useState,useEffect} from 'react'
import {useQuery} from'react-query'
import { getData } from '../api/api'
import Products from '../body/Products/Products'
import { useMyContext } from '../context/store'
const Home = () => {
    const {page,sort,limit,refeching} = useMyContext()
    const key =`/products?limit=${limit}&page=${page}&sort=${sort}`
    const {data,isLoading,error,refetch} = useQuery({
        queryKey:key,
        queryFn:getData,
        retry:false,
        refetchOnWindowFocus:false
    })
 
    useEffect(()=>{
      refetch()
    },[refeching])
  return (
    <div>
       {data?.products&&<Products products={data.products}/>}
    </div>
  )
}

export default Home