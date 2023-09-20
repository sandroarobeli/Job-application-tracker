import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

const DeleteModal = ({ isOpen, onClose, onDelete, companyName }) => {
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
      <div className="modal" onClick={onClose} ref={nodeRef}>
        <div
          className="min-w-80 py-4 px-6 bg-primary-hover dark:bg-gray-700 rounded-lg"
          onClick={(event) => event.stopPropagation()}
        >
          <h3 className="text-center text-lg sm:text-2xl mb-4 dark:text-primary">
            Deleting will be permanent!
          </h3>
          <p className="text-left text-sm sm:text-lg mb-6 dark:text-primary">
            {companyName}
          </p>

          <div className="flex justify-end items-center mb-1">
            <button
              aria-label="Cancel"
              className="text-lg sm:text-2xl px-2 mr-2 rounded-md border outline-none border-gray-900 dark:text-primary dark:border-primary dark:bg-gray-700 shadow-light dark:shadow-none hover:bg-primary-active active:bg-primary-active hover:scale-95 active:scale-95 dark:hover:bg-gray-800 dark:active:bg-gray-900 transition-all ease-in-out duration-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              aria-label="Delete"
              className="text-lg sm:text-2xl px-2 ml-2 rounded-md border outline-none border-gray-900 text-primary bg-gray-700 dark:text-gray-900 dark:border-primary dark:bg-primary  shadow-light dark:shadow-none hover:bg-gray-800 active:bg-gray-900 hover:scale-95 active:scale-95 dark:hover:bg-primary-hover dark:active:bg-primary-active transition-all ease-in-out duration-300"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
};

export default DeleteModal;
