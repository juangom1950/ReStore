import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import agent from "../../app/api/agent";
import NotFound from "../../app/api/errors/NotFound";
import { Product } from "../../app/models/products";

export default function ProductDetails() {
    const {id }= useParams<{id:string}>();
    //This is going to have an initial value of null
    const [product, setProduct] = useState<Product | any >(null);
    const [loading, setLoading] = useState(true);

    //Typescript unknown vs any: https://stackoverflow.com/questions/51439843/unknown-vs-any
    useEffect(() => {
         //axios.get(`http://localhost:5000/api/products/${id}`)
        agent.Catalog.details(parseInt(id))
            .then((response:unknown) => setProduct(response))
            //error.response give us the full axios response for the error
            //We took the response away now, because we are doing it from the interceptors
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id])

    if (loading) return <h3>Loading...</h3>

    if (!product) return <NotFound/>

    return (
       <Grid container spacing={6}>
           <Grid item xs={6}>
               <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
           </Grid>
           <Grid item xs={6}>
               <Typography variant='h3'>{product.name}</Typography>
               <Divider sx={{mb: 2}} />
               <Typography variant='h5' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
               <TableContainer>
               <Table>
                   <TableBody>
                       <TableRow>
                           <TableCell>Name</TableCell>
                           <TableCell>{product.name}</TableCell>
                       </TableRow>
                       <TableRow>
                           <TableCell>Description</TableCell>
                           <TableCell>{product.description}</TableCell>
                       </TableRow>
                       <TableRow>
                           <TableCell>Type</TableCell>
                           <TableCell>{product.type}</TableCell>
                       </TableRow>
                       <TableRow>
                           <TableCell>Brand</TableCell>
                           <TableCell>{product.brand}</TableCell>
                       </TableRow>
                       <TableRow>
                           <TableCell>Quantity</TableCell>
                           <TableCell>{product.quantityInStock}</TableCell>
                       </TableRow>
                   </TableBody>
               </Table>
           </TableContainer>
           </Grid>
       </Grid>
    )
}