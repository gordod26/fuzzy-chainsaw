import StoresContext from "../../util/context";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import AuthModelBody from "./../AuthModelBody";

// #2 create model to confirm delete
const DeleteCommentModal = observer((props: any) => {
  const store = useContext(StoresContext);

  useEffect(() => {}, []);

  return (
    <div className="modal">
      <div className="modal-box">
        <p>Are you sure? you cannot undo this action</p>
        <div className="modal-action">
          <div onClick={props.deletePost} className="btn btn-primary">
            Delete
          </div>
          <div onClick={props.toggleModel} className="btn">
            Close
          </div>
        </div>
      </div>
    </div>
  );
});

export default DeleteCommentModal;
