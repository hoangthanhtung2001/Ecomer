import React from 'react'
import { useQueries, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getData } from '../../api/api'
import ProductCard from './ProductCard'
const ProductDetails = () => {

    const {id} = useParams()
    const key = `/products/${id}`
    const key2 ="/products?limit=20"
    const result = useQueries([
        {
            queryKey:key,
            queryFn:getData,
            retry:false,
            refetchOnWindowFocus:false
        },
        {
            queryKey:key2,
            queryFn:getData,
            retry:false,
            refetchOnWindowFocus:false
        }
    ])
   
    // const {data,isLoading,error} = useQuery({
    //     queryKey:key,
    //     queryFn:getData,
    //     retry:false,
    //     refetchOnWindowFocus:false
    // })
    console.log({result})
  return (
    <section className='product_info'>
    {
      result[0].data?.product &&  
      
        <>
        <div className='details'>
            <img src={result[0].data.product.image} alt={result[0].data.product.image} /><div className='box'>
                    <h2>{result[0].data.product.title}</h2>
                    <h3>${result[0].data.product.price}</h3>
                    <p>{result[0].data.product.description}</p>
                    <h4>Category: {result[0].data.product.category}</h4>
                    <button>Add to cart</button>
                </div>
        </div>
              
              <div className='related'>
                      <h2>Related products</h2>
                      <div className="products">
                          {result[1].data?.products.map(product => ((
                              product.category === result[0].data.product.category & product._id !==result[0].data.product._id
                                  ? <ProductCard key={product._id} product={product} /> : null
                          )))}

                      </div>
                  </div>
        </>
    }
  </section>
      
  )
}

export default ProductDetails