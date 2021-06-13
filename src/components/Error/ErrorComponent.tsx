import React, {ReactElement} from 'react';
import Box from "@material-ui/core/Box";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      margin: 0,
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',


      border: '1px solid',
      borderColor: theme.palette.error.main,
      borderRadius: '10px',
      padding: '20px'
    }
  })
);

function ErrorComponent(): ReactElement {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      An error has occurred.
    </Box>
  )
}

export {ErrorComponent};