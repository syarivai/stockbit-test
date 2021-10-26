import React from 'react';
import { IconButton, makeStyles, Modal } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles({
  modal: {
    display: 'block',
    position: 'fixed',
    top: '20%',
    left: '40%',
    backgroundColor: 'white',
    padding: 24,
    paddingTop: 12,
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
});

const MyModal = (props) => {
  // Props
  const { isOpen, onHide, children, noHunger } = props;
  const classes = useStyles();

  return (
    <Modal open={isOpen} onClose={onHide}>
      <div className={isOpen ? classes.modal : 'hide'}>
        {!noHunger ? <div className="small-hunger" /> : <div />}
        <div className={classes.header}>
          <div className="float-right">
            <IconButton style={{ padding: 0 }} onClick={onHide}>
              <Close style={{ color: 'black', fontSize: 22 }} />
            </IconButton>
          </div>
        </div>
        <div className="children">{children}</div>
      </div>
    </Modal>
  );
};

export default MyModal;
