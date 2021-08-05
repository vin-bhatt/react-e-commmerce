import { Container , Grid, Typography, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import  EmptyCart  from '../components/atoms/EmptyCart';
import  CartItems  from '../components/molecules/CartItems';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f2f3f3',
    minHeight: '93vh',
  },
  titleContainer: {
    backgroundColor: 'white',
    borderRadius: '0.25em',
    margin: theme.spacing(1, 0, 1.2),
    boxShadow: theme.shadows[1],
  },
  title: {
    margin: theme.spacing(1, 0),
    fontSize: '2rem',
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
      fontSize: '1.65rem',
    },
  },
  itemAmount: {
    color: theme.palette.primary.dark,
    fontSize: '1.5rem',
    [theme.breakpoints.only('xs')]: {
      fontSize: '1.2rem',
    },
  },
}))

const Cart = () => {
  //getting the value from store
  const cart = useSelector((state) => state.cart.cart);
  const amount = useSelector((state) => state.cart.amount);
  const classes = useStyles();
  //get amount suffix text
  const amountText = (amount) => (amount === 1 ? 'item' : 'items');

  return (
    <Container className={classes.container}>
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.titleContainer}
      >
        <Typography className={classes.title} variant="h4">
          Your Shopping Cart {}
          <Typography
            variant="button"
            component="span"
            className={classes.itemAmount}
          >
            ({amount} {amountText(amount)})
          </Typography>
        </Typography>
      </Grid>
      {cart.length ? <CartItems /> : <EmptyCart />}
    </Container>
  );
};

export default Cart;