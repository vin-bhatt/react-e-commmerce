import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';
import Home from '@material-ui/icons/Home';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

export const MainListItems = () => {
  const history = useHistory();

  const handleNavigationClick = (link) => {
    history.push(`/${link}`);
  }

  return (
    <div>
      <ListItem button onClick={()=>handleNavigationClick('')}>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem  ListItem button onClick={()=>handleNavigationClick('cart')}>
        <ListItemIcon>
          <ShoppingCart />
        </ListItemIcon>
        <ListItemText primary="Cart" />
      </ListItem>
    </div>
  );
}
