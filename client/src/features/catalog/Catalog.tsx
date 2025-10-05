
import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";


// type Props = {
//     products?: Product[];
    
//   }
  
export default function Catalog() {

   const {data, isLoading} = useFetchProductsQuery();
    console.log(data);



if(isLoading  || !data ) return <div>Loading...</div>

  return (
  <>

      <ProductList products={data}/>

  </>
    )
}
