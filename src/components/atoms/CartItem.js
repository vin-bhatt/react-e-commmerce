import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Typography,
    makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import allActions from '../../store/actions';

const useStyles = makeStyles(theme => ({
  media: {
      height: 276,
      backgroundSize: 'contain',
      cursor: 'pointer',
    },
    title: {
      padding: theme.spacing(1.5, 1),
      background: '#f7f8ff',
      minHeight: '6.25em',
      display: 'grid',
      placeItems: 'center',
    },
    priceContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#3f51b5',
      color: '#fafafa',
      padding: theme.spacing(0.7, 1),
    },
    priceNumber: {
      border: `2px outset ${theme.palette.info.dark}`,
      padding: '0.3em 0.5em',
      borderRadius: '0.15em',
      [theme.breakpoints.down('sm')]: {
        padding: '0.3em',
      },
      [theme.breakpoints.down('xs')]: {
        padding: '0.3em 0.5em',
      },
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#f7f7f7',
    },
    btnDel: {
      background: theme.palette.secondary.main,
      color: '#fafafa',
      '&:hover': {
        background: theme.palette.secondary.dark,
      },
    },
    btnAdd: {
      background: theme.palette.primary.main,
      color: '#fafafa',
      '&:hover': {
        background: theme.palette.primary.dark,
      },
    },
    rightBtns: {
      display: 'flex',
      // justifyContent: 'space-between',
      alignItems: 'center',
      gap: theme.spacing(1.4),
      [theme.breakpoints.down('sm')]: {
        gap: theme.spacing(1),
      },
    },
    btnRoot: {
      minWidth: 0,
    },
  }));
  

const CartItem = memo(({ id, image, title, price, qty }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const totalPrice = (qty * price).toFixed(2);

  return (
    <Card raised>
      <CardMedia
        image={image}
        alt={title}
        className={classes.media}
        classes={{   
          root: classes.media,
        }}
      />
      <CardContent className={classes.title}>
        <Typography variant="h6" align="center">
          {title}
        </Typography>
      </CardContent>
      <CardContent className={classes.priceContainer}>
        <Typography variant="h6">Total price:</Typography>
        <Typography
          className={classes.priceNumber}
          variant="h6"
          title={totalPrice}
        >
          {totalPrice} $
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Typography variant="h6">Quantity:</Typography>
        <div className={classes.rightBtns}>
            <Button
              type="button"
              onClick={() => dispatch(allActions.cartActions.decrease(id))}
              variant="outlined"
              disabled={qty <= 1}
              className={classes.btnDel}
              classes={{ root: classes.btnRoot }}
              aria-label="remove one item from cart"
              component="span"
            >
              <RemoveIcon />
            </Button>
          <Typography variant="h6" component="p">
            <strong>{qty}</strong>
          </Typography>
            <Button
              type="button"
              variant="outlined"
              onClick={() => dispatch(allActions.cartActions.increase(id))}
              className={classes.btnAdd}
              classes={{ root: classes.btnRoot }}
              aria-label="add one more item to cart"
            >
              <AddIcon />
            </Button>
        </div>
      </CardActions>
      <Divider variant="fullWidth" />
      <Button
        variant="contained"
        type="button"
        color="secondary"
        onClick={() => dispatch(allActions.cartActions.removeItem(id))}
        startIcon={<DeleteIcon />}
        aria-label="remove item from cart"
        size="large"
        fullWidth
      >
        Remove
      </Button>
    </Card>
  );
});

export default CartItem;