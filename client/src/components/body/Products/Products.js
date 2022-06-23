import React from 'react'
import ProductCard from './ProductCard'

const Products = ({products}) => {
  return (
<div>
  <div className="filter_menu">
            <div className="row-filter">
                <span>Filters: </span>
                <select name="category" defaultValue="all">
                    <option value='' defaultValue="all">All Products</option>
                    {/* {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    } */}
                </select>
            </div>

            <input type="text"  defaultValue="value" placeholder="Enter your search!"/>

            <div className="sort">
                <span>Sort By: </span>
                <select  defaultValue="select">
                    <option value='sort=-createdAt'>Newest</option>
                    <option value='sort=createdAt'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort=-price'>Price: Hight-Low</option>
                    <option value='sort=price'>Price: Low-Hight</option>
                </select>
            </div>
        </div>
    <div className='products'>
      {
        products.map(product=>(
          <ProductCard key={product._id} product={product}/>
        ))
      }
    </div>
 </div>
  )
}

export default Products