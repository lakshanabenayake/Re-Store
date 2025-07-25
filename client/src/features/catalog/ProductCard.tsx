import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { NavLink } from "react-router-dom";

type Props = {
product: Product;  
}

export default function ProductCard({product}:Props) {
  return (

    <Card elevation={3}
    sx={{
        width:200,
        borderRadius:2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }}>
        <CardMedia
        sx={{ height: 240 }}
        image={product.pictureUrl}
        title={product.name}
      />

      <CardContent>
        <Typography 
                    gutterBottom 
                    sx={{color: 'secodnary.main'}}
                    variant="subtitle2">
          {product.name}
        </Typography>

        <Typography 
        variant="h6"
        sx={{color:'secondary.main'}}>
          ${(product.price / 100).toFixed(2)}
        </Typography>
    </CardContent>

    <CardActions
    sx={{justifyContent: 'space-between'}}
    >
        <Button>Add to Cart</Button>
        <Button component={NavLink} to={`/catalog/${product.id}`}>View</Button>
    </CardActions>
    </Card>
)
}
