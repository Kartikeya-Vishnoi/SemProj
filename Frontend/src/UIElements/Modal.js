import ReactDOM from "react-dom";
import BackDrop from "./BackDrop";
import { CSSTransition } from "react-transition-group";
import React from "react";
import classes from "./Modal.module.css";

function ModalOverlay(props) {
  const content = ( 
    <div className={classes.modal} style={props.style}>
      <header className={classes.modal__header}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={classes.modal__content}>
          {props.children}
        </div>
        <footer className={classes.modal__footer}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

   return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
}

function Modal(props) {
  return (
    <React.Fragment>
      {props.show && <BackDrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        // timeout={200}
        classNames={classes}
      >
        {/* spred operator is used here to pass the props recieved by Modal to ModalOverlay */}
        <ModalOverlay {...props}/>
        
      </CSSTransition>
    </React.Fragment>
  );
}
export default Modal;