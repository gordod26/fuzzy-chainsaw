import Avatar from "boring-avatars";
import StoresContext from "../util/context";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";

export interface IProps {
  name: "Register" | "Login";
  username?: string;
  password?: string;
  email?: string;
}

const REGISTER = gql`
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

const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;
const RegisterHandler = observer(function RegisterHandler(props: IProps) {
  const store = useContext(StoresContext);
  const [registerFunction, { data, loading, error }] = useMutation(REGISTER);
  const registerHelper = () => {
    registerFunction({
      variables: {
        email: props.email,
        name: props.username,
        password: props.password,
      },
    });
  };
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  });

  return (
    <div
      className="modal-action"
      onClick={() => {
        registerHelper();
      }}
    >
      <label htmlFor={`${props.name}-modal`} className="btn btn-ghost">
        Accept
      </label>
      <label htmlFor={`${props.name}-modal`} className="btn btn-ghost">
        Close
      </label>
    </div>
  );
});

const LoginHandler = observer(function LoginHandler(props: IProps) {
  const store = useContext(StoresContext);
  const [loginFunction, { data, loading, error }] = useMutation(LOGIN);
  const loginHelper = () => {
    loginFunction({
      variables: {
        email: props.email,
        password: props.password,
      },
    });
  };
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  });

  return (
    <div
      className="modal-action"
      onClick={async () => {
        loginHelper();
        console.log(data);
      }}
    >
      <label htmlFor={`${props.name}-modal`} className="btn btn-ghost">
        Accept
      </label>
      <label htmlFor={`${props.name}-modal`} className="btn btn-ghost">
        Close
      </label>
    </div>
  );
});
const Model = observer(function Model(props: IProps) {
  const store = useContext(StoresContext);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
  });
  //if (props.name === "Login") {
  //const [RegisterFunction, { data, loading, error }] = useMutation(Register);
  //}
  //if (props.name === "Register") {
  //const [LoginFunction, { data, loading, error }] = useMutation(Login);
  //}
  useEffect(() => {
    console.log("inputs", inputs);
  }, [inputs]);

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
          {props.name === "Register" && (
            <RegisterHandler
              name="Register"
              username={inputs.username}
              password={inputs.password}
              email={inputs.email}
            />
          )}
          {props.name === "Login" && (
            <LoginHandler
              name="Login"
              email={inputs.email}
              password={inputs.password}
            />
          )}
        </div>
      </div>
    </div>
  );
});

export default Model;
