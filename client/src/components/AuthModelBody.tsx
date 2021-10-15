import Avatar from "boring-avatars";
import StoresContext from "../util/context";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../constants/constants";

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

const AuthModelBody = observer(function AuthModelBody(props: IProps) {
  const store = useContext(StoresContext);
  const [registerFunction] = useMutation(REGISTER, {
    variables: {
      email: props.email,
      name: props.username,
      password: props.password,
    },
    onCompleted: (registerFunction) => {
      localStorage.setItem(AUTH_TOKEN, registerFunction.signup.token);
      store.authStore.setIsAuthenticated();
      console.log(registerFunction);
    },
  });
  const [loginFunction] = useMutation(LOGIN, {
    variables: {
      email: props.email,
      password: props.password,
    },
    onCompleted: (loginFunction) => {
      localStorage.setItem(AUTH_TOKEN, loginFunction.login.token);
      store.authStore.setIsAuthenticated();
      console.log(loginFunction);
    },
  });
  return (
    <div className="modal-action">
      <label
        htmlFor={`${props.name}-modal`}
        className="btn btn-ghost"
        onClick={() => {
          if (props.name === "Register") {
            registerFunction();
          }
          if (props.name === "Login") {
            loginFunction();
          }
        }}
      >
        Accept
      </label>
      <label htmlFor={`${props.name}-modal`} className="btn btn-ghost">
        Close
      </label>
    </div>
  );
});

export default AuthModelBody;
