import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../BackDrop/Backdrop";

const ModalOverlay = (props) => {
  const content = (
    <div
      className={`z-[100] fixed top-[22vh] left-[26%] w-[50%] shadow-lg rounded-xl bg-white ${props.className}`}
      style={props.style}
    >
      <header
        className={`w-[100%] p-6 bg-[#2a006e] text-white rounded-t-lg ${props.headerClass}`}
      >
        <h2 className="m-[0.5rem]">{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`p-[1rem] ${props.contentClass}`}>{props.children}</div>
        <footer className={`p-[1rem] flex justify-end ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("overlays"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
