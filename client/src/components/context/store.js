import React,{useContext,useState,useMemo, useRef} from 'react'
import { useLocation } from 'react-router-dom'

export const Store = React.createContext()
export const useMyContext = ()=> useContext(Store)
export const ContextProvider = ({children})=>{
    const [refeching,setRefeching] = useState(false)
    const {search} = useLocation()
    const [count,setCount] = useState()
    const cache = useRef({})
    const {page,sort,limit} = useMemo(()=>{
        const page = new URLSearchParams(search).get('page') ||1
        const sort = new URLSearchParams(search).get('sort')|| '-createdAt'
        const limit = new URLSearchParams(search).get('limit')||5
        return {
            page:Number(page),
            sort:sort,
            limit:Number(limit)
        }
    },[search])
    const value ={refeching,setRefeching,page,sort,limit,cache,count,setCount}
    return (
       <Store.Provider value={value}>
            {children}
       </Store.Provider>
    )
} 