import '../../App/rootColor.css'

import { Product } from '../../components/Product/Product'
import React, { useState } from 'react'
import { AddProduct } from '../../components/Product/AddProduct'
import { DraftCart } from '../../redux/cart/reducer';

export function CreatorOnlineStore() {

  // local state , not redux state
  const [productEditing, setProductEditing] = useState<DraftCart | undefined>(undefined);
  const [productid, setProductid] = useState<number | null>(null);


  return (

    <div className="center-scroll-area">
      <div className='title'>商店</div>
      <div className='middle-section-flex'>
        <div className='add_product'>
          {productEditing ?
            <AddProduct key={productEditing.id} product={productEditing} productid={productid}/> :
            <AddProduct />
          }
        </div>

        <div className='product'>
          {/* Mother pass information to son */}
          <Product editProduct={product => setProductEditing(product)} setproductid={(id)=>setProductid(id)}/>
        </div>

       
      </div>
    </div>
  )
}