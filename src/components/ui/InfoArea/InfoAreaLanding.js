import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "../../assets/jss/trade-app/components/infoStyleLanding";

const useStyles = makeStyles(styles);

export default function InfoAreaLanding(props) {
  const classes = useStyles();
  const { title, description, iconColor } = props;
  return (
    <div className={classes.infoArea}>
      <div className={classes.iconWrapper + " " + classes[iconColor]}>
        <props.icon className={classes.icon} />
      </div>
      <div className={classes.descriptionWrapper}>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
}


