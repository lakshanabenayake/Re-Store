import { useParams } from 'react-router-dom';
import { Button, Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import { useFetchProductDetailsQuery } from './catalogApi';

export default function ProductDetails() {
  const {id} = useParams();
  const {data:product,isLoading} = useFetchProductDetailsQuery(id ? +id :0);

  const ProductDetails = [
    {label: 'Name', value: product?.name},
    {label: 'Description', value: product?.description},
    {label: 'Brand', value: product?.brand},
    {label: 'Type', value: product?.type},
    {label: 'Quantity in Stock', value: product?.quantityInStock}
  ]

  if (!product || isLoading) return <div>Loading...</div>; // Handle loading state

  return (
    <Grid2 container spacing={6} maxWidth="lg" sx={{mx: 'auto'}}>
      <Grid2 size={6}>
        <img src={product?.pictureUrl} alt={product?.name} style={{width: '100%'}} />
      </Grid2>
      <Grid2 size={6}>
       <Typography variant="h6">{product?.name}</Typography>
       <Divider sx={{mb: 2}} />
        <Typography variant="h4" color='secondary'>{product?.name}</Typography>
       <TableContainer sx={{mt: 2}}>
        <Table sx={{fontSize: 'medium'}}>
            <TableBody>
              {ProductDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{fontWeight: 'bold'}}>{detail.label}:</TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
        </TableContainer>
        <Grid2 container spacing={2} sx={{mt: 3}}>
          <Grid2 size={6}>
           <TextField 
           variant='outlined'
           type='number'
           label='Quantity in Cart'
           fullWidth
           defaultValue={1}
          />
          </Grid2>
          <Grid2 size={6}>
          <Button
          color='primary'
          variant='contained'
          size='large'
          sx={{height: '100%'}}
          fullWidth>Add to Cart</Button>
          </Grid2>
        </Grid2>
    </Grid2>
  </Grid2>
  )
}
