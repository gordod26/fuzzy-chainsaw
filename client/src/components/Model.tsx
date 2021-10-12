import Avatar from "boring-avatars";
import StoresContext from "../util/context";
import { observer } from "mobx-react";
import { useContext } from "react";
import { gql, useMutation } from "@apollo/client";

interface IProps {
  name: "Register" | "Login";
}

const Register = gql`
  mutation Mutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const Login = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
        email
      }
    }
  }
`;

const Model = observer(function Model(props: IProps) {
  const store = useContext(StoresContext);
  if (props.name === "Login") {
    const [RegisterFunction, { data, loading, error }] = useMutation(Register);
  }
  if (props.name === "Register") {
    const [LoginFunction, { data, loading, error }] = useMutation(Login);
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
          {props.name === "Register" && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered"
              />
            </div>
          )}
          {props.name && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>{" "}
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered"
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
                placeholder="password"
                className="input input-bordered"
              />
            </div>
          )}
          <div className="modal-action" onClick={()=>{ if (props.name === "Login"){LoginFunction({variables:{email: store.authStore.emailInput, password: store.authStore.passwordInput}})}
            if (props.name === "Register"){RegisterFunction({variables:{email: store.authStore.emailInput,name:store.authStore.usernameInput, password: store.authStore.passwordInput}})}}}>
            <label htmlFor={`${props.name}-modal`} className="btn btn-ghost">
              Accept
            </label>
            <label htmlFor={`${props.name}-modal`} className="btn btn-ghost">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
