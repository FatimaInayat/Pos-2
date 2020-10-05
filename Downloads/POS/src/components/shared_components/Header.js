import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import classes from '../../content/css/useStyles';
import { MenuItem, MenuList, Fab, AppBar, Drawer, Hidden, IconButton, Toolbar, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';


function Header(props) {
    
    return (

            <AppBar  position="sticky" style={{ background: '#CD450B', height: '75px', marginBottom: 25 }}>
                <Toolbar>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                       // onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to={{ pathname: "/" }}>
                        {/* <img style={{ marginTop: '12px' }} src={require('../../content/img/bg.jpg')} alt="sadad" /> */}
                    </Link>

                    
                </Toolbar>
            </AppBar>

           
           


    );
}

export default withRouter(Header);