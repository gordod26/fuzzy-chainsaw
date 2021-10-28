import StoresContext from "../util/context";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import AuthModelBody from "./AuthModelBody";

export interface IProps {
  name: "Register" | "Login";
  username?: string;
  password?: string;
  email?: string;
}

const Model = observer(function Model(props: IProps) {
  const store = useContext(StoresContext);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    store.authStore.setIsAuthenticated();
    console.log("inputs", inputs);
  }, [inputs, store.authStore]);

  if (store.authStore.isAuthenticated) {
    return (
      <div>
        <div>
          <label
            htmlFor={`logout-modal`}
            className="btn btn-ghost modal-button"
            onClick={() => {
              localStorage.clear();
              store.authStore.logout();
            }}
          >
            logout
          </label>
          <div className="modal">
            <div className="modal-box">
              <h1>Are you sure you want to log out?</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label
        htmlFor={`${props.name}-modal`}
        className="btn btn-ghost modal-button"
      >
        {props.name}
      </label>
      <input
        type="checkbox"
        id={`${props.name}-modal`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h1>{props.name}</h1>
          {props.name && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered"
                onChange={(e) => {
                  setInputs({ ...inputs, email: e.target.value });
                }}
              />
            </div>
          )}
          {props.name === "Register" && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>{" "}
              </label>
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered"
                onChange={(e) => {
                  setInputs({ ...inputs, username: e.target.value });
                }}
              />
            </div>
          )}
          {props.name && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>{" "}
              </label>
              <input
                type="text"
                placeholder="Password"
                className="input input-bordered"
                onChange={(e) => {
                  setInputs({ ...inputs, password: e.target.value });
                }}
              />
            </div>
          )}
          <AuthModelBody
            name={props.name}
            username={inputs.username}
            password={inputs.password}
            email={inputs.email}
          />
        </div>
      </div>
    </div>
  );
});

export default Model;
