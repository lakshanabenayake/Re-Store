
import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";

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
