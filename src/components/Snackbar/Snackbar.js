import React from 'react';
import clsx from 'clsx';
import { amber, green } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: 'yellow',
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const {
    position,
    hideDuration,
    open,
    handleClose,
    variant,
    message,
    action,
    className,
    onClose,
    ...other
  } = props;

  let customProps = {};
  if (hideDuration) {
    customProps = {
      ...customProps,
      onClose: handleClose,
      autoHideDuration: hideDuration,
    };
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        className={position}
        open={open}
        autoHideDuration={hideDuration || 3000}
        {...customProps}
        onClose={handleClose}
      >
        <SnackbarContent
          className={clsx(classes[variant], className, `snack-${variant}`)}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <div className="message-items">{message}</div>
            </span>
        }
          action={action}
          {...other}
        />
      </Snackbar>
    </>
  );
}
