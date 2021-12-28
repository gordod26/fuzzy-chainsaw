import Avatar from "boring-avatars";
import StoresContext from "../util/context";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  AUTH_TOKEN,
  AUTH_ID,
  AUTH_NAME,
  AUTH_EMAIL,
  AUTH_AVITAR,
} from "../constants/constants";

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
        avitar {
          name
          color0
          color1
          color2
          color3
          color4
        }
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
      //store user info to localhost
      localStorage.setItem(AUTH_TOKEN, registerFunction.signup.token);
      localStorage.setItem(AUTH_ID, registerFunction.signup.user.id);
      localStorage.setItem(AUTH_NAME, registerFunction.signup.user.name);
      localStorage.setItem(AUTH_EMAIL, registerFunction.signup.user.email);
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
      //store user info to localhost
      localStorage.setItem(AUTH_TOKEN, loginFunction.login.token);
      localStorage.setItem(AUTH_ID, loginFunction.login.user.id);
      localStorage.setItem(AUTH_NAME, loginFunction.login.user.name);
      localStorage.setItem(AUTH_EMAIL, loginFunction.login.user.email);
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
