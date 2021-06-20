/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";

import Button from "../../components/CustomButtons/Button.js";

import styles from "../../assets/jss/trade-app/components/footerStyle.js";


const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { fluid, white } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  var anchor =
    classes.a +
    cx({
      [" " + classes.whiteColor]: white
    });
  var block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white
  });
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.right}>
        <List className={classes.list}>
          <ListItem className={classes.inlineBlock}>
            <a href="#link" className={block} target="_blank">
              <Button justIcon round color="primary">
            <i
              className={
                 "fab comment"
                }
            />
            </Button>
            </a>
            </ListItem>
          
            <ListItem className={classes.inlineBlock}>
            <a href="https://www.linkedin.com/in/maria-florencia-do-nascimento/" className={block} target="_blank">
              <Button justIcon round color="linkedin">
            <i
              className={
                " fab fa-linkedin"
                }
            />
            </Button>
            </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
            <a href="#link" className={block}   target="_blank">
              <Button justIcon round color="youtube">
            <i
              className={
                " fab fa-youtube"
                }
            />
            </Button>
            </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
            <a href="#link" className={block}  target="_blank">
              <Button justIcon round color="facebook">
            <i
              className={
                " fab fa-facebook"
                }
            />
            </Button>
            </a>
            </ListItem>
      
          </List>
        </div>
      
    
      </div>
    </footer>
  );
}

Footer.propTypes = {
  fluid: PropTypes.bool,
  white: PropTypes.bool,
};
