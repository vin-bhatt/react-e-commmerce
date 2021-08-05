import React, { useState, useEffect } from "react";
import {
  getFields,
} from "../utils/methods";
import SearchInput from "../components/atoms/SearchInput";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Button, Typography, Grid } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import allActions from '../store/actions';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  pos: {
    marginBottom: 12,
  },
  productField: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  fieldValue: {
    marginLeft: "10px",
    marginBottom: 0,
  },
  fieldName: {
    marginRight: '5px'
  },
  image: {
    maxWidth: '50px',
    maxHeight: '50px'
  },
  addToCart: {
    justifyContent: "center",
  },
  description: {
    maxHeight: '100px',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
  }
});
const override = css`
  display: block;
  justify-content:center;
  margin: 15% auto;
  border-color: red;
`;

const Home = () => {
  const productsSelector = useSelector((state) => state.products.products);
  const loadingSelector = useSelector((state) => state.products.loading);
  const [products, setProducts] = useState([]);
  const [fields, setFields] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#3f51b5");
  const classes = useStyles();
  const dispatch = useDispatch();
  
  //gets the corresponding fields 
  useEffect(() => {
    setFields(getFields("products"));
  }, []);

  //dispatches the action creator to fetch products 
  useEffect(() => {
    dispatch(allActions.productsActions.fetchProducts());
  }, []);

  //updates the products state whenever the store updates 
  useEffect(() => {
    setProducts(productsSelector || []);
  }, [productsSelector]);

  //updates the loading state whenever the store updates 
  useEffect(() => {
    setLoading(loadingSelector);
  }, [loadingSelector]);

  const filterData = () => {
    //if any title includes the searchText it is returned
    return (products?.filter(e => {
            const hasProduct = e.title.toLowerCase().includes(searchText.toLowerCase().trim());
            return (hasProduct);
        })
    )
  };

  let filteredData  = filterData();

  //dispatches the add
  const handleAddToCart = ({id,title,price,description,category,image}) => {
    dispatch(
      allActions.cartActions.addToCart(
        id,
        title,
        price,
        description,
        category,
        image,
        1
      )
    )
  }
  const handleChange = (value) => {
    setSearchText(value);
  };
  if(!loading){
    return (
      <>
        <Grid item xs={12}>
          <SearchInput onChange={handleChange} />
        </Grid>
        <br />
        {filteredData?.map((product) => {
          if (product)
            return (
              <Grid key={product.id} item xs={4}>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textPrimary"
                      gutterBottom
                    >
                      {product["title"]}
                    </Typography>
                    {fields?.map((field) => {
                      if(field.field === "image"){
                        return (
                          <div className={classes.productField}>
                            <img className={classes.image} alt={product['title']} src={product[field.field]} />
                          </div>
                        )
                      }
                      if (field.field !== "title")
                        return (
                          <div className={classes.productField}>
                            <p className={classes.fieldName}>
                              <strong>{field.label}:</strong>
                            </p>
                            <p className={classes.fieldValue, field.field==='description'?classes.description:null}>
                              {product[field.field]}{field.field==='price' && ` $`}
                            </p>
                          </div>
                        );
                      else return <></>;
                    })}
                  </CardContent>
                  <CardActions className={classes.addToCart}>
                    <Button size="small" onClick={() => handleAddToCart(product)}>
                      <strong>Add to Cart</strong>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          else return <></>;
        })}
      </>
    )
  }
  else return  <ClipLoader color={color} loading={true} css={override} size={30} />
};

export default Home;
