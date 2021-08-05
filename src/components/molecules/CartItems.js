import { Button, Grid, Typography, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../../store/actions';
import CartItem from '../atoms/CartItem';

const useStyles = makeStyles(theme => ({
    cardDetails: {
      width: '100%',
      margin: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        width: '66%',
      },
    },
    btnContainer: {
      margin: theme.spacing(2, 0, 5.6),
    },
    total: {
      background: '#3f51b5',
      color: '#fafafa',
      padding: '0.3em 0.5em',
      fontSize: '1.6rem',
    },
  }));

const CartItems = () => {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(()=>{dispatch(allActions.cartActions.getTotals())})
  return (
    <>
      <Grid container spacing={3} justify="center">
        {cart.map((item) => (
          <Grid item xs={12} sm={6} lg={4} key={item.id}>
            <CartItem {...item} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography
          variant="h4"
          component="p"
          className={classes.total}
          align="center"
          title={totalPrice}
        >
          Subtotal: <strong>{totalPrice}&nbsp;$</strong>
        </Typography>
        <Grid
          container
          justify="space-between"
          align="center"
          className={classes.btnContainer}
        >
          <Button
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => dispatch(allActions.cartActions.clearCart())}
            startIcon={<DeleteIcon />}
            aria-label="Clear the cart"
          >
            Empty cart
          </Button>
          <Button
            size="large"
            type="button"
            variant="contained"
            color="primary"
            startIcon={<NextWeekIcon />}
            aria-label="Proceed to checkout"
          >
            Checkout
          </Button>
        </Grid>
      </div>
    </>
  );
};

export default CartItems;