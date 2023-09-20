import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

const ErrorModal = ({ errorMessage, clearMessage, isOpen, onClose }) => {
  const nodeRef = useRef(null);

  const closeOnEscapeKeyDown = (event) => {
    if ((event.charCode || event.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);

    return function cleanup() {
      document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    };
  });

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" ref={nodeRef}>
        <div
          className="w-80 sm:min-w-80 py-4 px-6 bg-primary-hover dark:bg-gray-700 rounded-lg truncate"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="text-left mb-8">
            <h3 className="text-2xl mb-4 text-red-600 font-semibold">Error</h3>
            <p className="whitespace-normal text-black dark:text-primary">
              {errorMessage}
            </p>
          </div>

          <div className="flex justify-end items-center mb-1">
            <button
              aria-label="Clear error message"
              className="text-lg sm:text-2xl px-4 rounded-md border outline-none border-gray-900 text-primary bg-gray-700 dark:text-gray-900 dark:border-primary dark:bg-primary shadow-light dark:shadow-none hover:bg-gray-800 active:bg-gray-900 hover:scale-95 active:scale-95 dark:hover:bg-primary-hover dark:active:bg-primary-active transition-all ease-in-out duration-300"
              onClick={clearMessage}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
};

export default ErrorModal;
