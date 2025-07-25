import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Product } from '../../app/models/product';

export default function ProductDetails() {
  const {id} = useParams();
  const [product, setProduct] = useState<Product | null>(null); // Assuming you have a way to fetch the product by ID

  useEffect(() => {
    // Fetch product details by ID
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://localhost:5001/api/products/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>{product?.name}</div>
  )
}
