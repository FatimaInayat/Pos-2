import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import classes from '../../content/css/useStyles';
import { MenuItem, MenuList, Fab, AppBar, Drawer, Hidden, IconButton, Toolbar, Typography, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';


function Header(props) {
    
    return (

        <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Eatery POS
          </Typography>
        </Toolbar>
      </AppBar>

           
           


    );
}

export default withRouter(Header);