import React, { createContext, useReducer } from "react";

type IState = {
  appState: "auth" | "editor" | "home";
  loginEmail: string;
  loginPassword: string;
  signupEmail: string;
  signupPassword: string;
  signupUsername: string;
  signupConfirmPassword: string;
  signupEmailError: string;
  signupPasswordError: string;
  signupConfirmPasswordError: string;
  signupUsernameError: string;
  loginEmailError: string;
  loginPasswordError: string;
  currentDocumentId: string;
  currentDocumentName: string;
  currentDocumentOwner: string;
  userId: string;
  user: {
    username: string;
    email: string;
  };
};
const initialState: IState = {
  appState: "auth",
  loginEmail: "",
  loginPassword: "",
  signupEmail: "",
  signupPassword: "",
  signupUsername: "",
  signupConfirmPassword: "",
  signupEmailError: "",
  signupPasswordError: "",
  signupConfirmPasswordError: "",
  signupUsernameError: "",
  loginEmailError: "",
  loginPasswordError: "",
  currentDocumentId: "",
  currentDocumentName: "",
  userId: "",
  user: {
    username: "",
    email: "",
  },
  currentDocumentOwner: "",
};

// Define the context type
type MyContextType = {
  state: IState;
  dispatch: React.Dispatch<Action>;
};

export const MyContext = createContext<MyContextType | undefined>(undefined);

type Action =
  | { type: "SET_APPSTATE"; payload: IState["appState"] }
  | { type: "SET_LOGIN_EMAIL"; payload: IState["loginEmail"] }
  | { type: "SET_LOGIN_PASSWORD"; payload: IState["loginPassword"] }
  | { type: "SET_SIGNUP_EMAIL"; payload: IState["signupEmail"] }
  | { type: "SET_SIGNUP_PASSWORD"; payload: IState["signupPassword"] }
  | { type: "SET_SIGNUP_USERNAME"; payload: IState["signupUsername"] }
  | {
      type: "SET_SIGNUP_CONFIRMPASSWORD";
      payload: IState["signupConfirmPassword"];
    }
  | { type: "SET_SIGNUP_EMAIL_ERROR"; payload: IState["signupEmailError"] }
  | {
      type: "SET_SIGNUP_PASSWORD_ERROR";
      payload: IState["signupPasswordError"];
    }
  | {
      type: "SET_SIGNUP_CONFIRMPASSWORD_ERROR";
      payload: IState["signupConfirmPasswordError"];
    }
  | {
      type: "SET_SIGNUP_USERNAME_ERROR";
      payload: IState["signupUsernameError"];
    }
  | { type: "SET_LOGIN_EMAIL_ERROR"; payload: IState["loginEmailError"] }
  | { type: "SET_LOGIN_PASSWORD_ERROR"; payload: IState["loginPasswordError"] }
  | { type: "SET_CREATE_DOCUMENT_ID"; payload: IState["currentDocumentId"] }
  | { type: "SET_USER_ID"; payload: IState["userId"] }
  | {
      type: "SET_CURRENT_DOCUMENT_NAME";
      payload: IState["currentDocumentName"];
    }
  | {
      type: "SET_USER";
      payload: IState["user"];
    }
  | {
      type: "SET_CURRENT_DOCUMENT_OWNER";
      payload: IState["currentDocumentOwner"];
    };

function reducer(state: typeof initialState, action: Action) {
  switch (action.type) {
    case "SET_APPSTATE":
      return { ...state, appState: action.payload };
    case "SET_LOGIN_EMAIL":
      return { ...state, loginEmail: action.payload };
    case "SET_LOGIN_PASSWORD":
      return { ...state, loginPassword: action.payload };
    case "SET_SIGNUP_EMAIL":
      return { ...state, signupEmail: action.payload };
    case "SET_SIGNUP_PASSWORD":
      return { ...state, signupPassword: action.payload };
    case "SET_SIGNUP_USERNAME":
      return { ...state, signupUsername: action.payload };
    case "SET_SIGNUP_CONFIRMPASSWORD":
      return { ...state, signupConfirmPassword: action.payload };
    case "SET_SIGNUP_EMAIL_ERROR":
      return { ...state, signupEmailError: action.payload };
    case "SET_SIGNUP_PASSWORD_ERROR":
      return { ...state, signupPasswordError: action.payload };
    case "SET_SIGNUP_CONFIRMPASSWORD_ERROR":
      return { ...state, signupConfirmPasswordError: action.payload };
    case "SET_SIGNUP_USERNAME_ERROR":
      return { ...state, signupUsernameError: action.payload };
    case "SET_LOGIN_EMAIL_ERROR":
      return { ...state, loginEmailError: action.payload };
    case "SET_LOGIN_PASSWORD_ERROR":
      return { ...state, loginPasswordError: action.payload };
    case "SET_CREATE_DOCUMENT_ID":
      return { ...state, currentDocumentId: action.payload };
    case "SET_USER_ID":
      return { ...state, userId: action.payload };
    case "SET_CURRENT_DOCUMENT_NAME":
      return { ...state, currentDocumentName: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_CURRENT_DOCUMENT_OWNER":
      return { ...state, currentDocumentOwner: action.payload };
    default:
      return state;
  }
}

//Provider
type Props = {
  children: React.ReactNode;
};
export function MyProvider({ children }: Props): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
}
