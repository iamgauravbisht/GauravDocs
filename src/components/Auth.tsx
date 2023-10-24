import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useMyContext from "@/store/useMyContext";
import ErrorText from "@/components/ui/ErrorText";
import { signup_post, login_post } from "@/authController/authController";

export default function Auth(): JSX.Element {
  const { state, dispatch } = useMyContext();

  const storeSignuphandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    if (id === "signupusername") {
      dispatch({ type: "SET_SIGNUP_USERNAME", payload: e.target.value });
    } else if (id === "signupemail") {
      dispatch({ type: "SET_SIGNUP_EMAIL", payload: e.target.value });
    } else if (id === "signuppassword") {
      dispatch({ type: "SET_SIGNUP_PASSWORD", payload: e.target.value });
    } else if (id === "signupconfirmpassword") {
      dispatch({
        type: "SET_SIGNUP_CONFIRMPASSWORD",
        payload: e.target.value,
      });
    }
  };
  const storeLoginhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    if (id === "email") {
      dispatch({ type: "SET_LOGIN_EMAIL", payload: e.target.value });
    } else if (id === "password") {
      dispatch({ type: "SET_LOGIN_PASSWORD", payload: e.target.value });
    }
  };
  const confirmPasswordCheck = () => {
    if (state.signupPassword !== state.signupConfirmPassword) {
      dispatch({
        type: "SET_SIGNUP_CONFIRMPASSWORD_ERROR",
        payload: "confirm password does not match",
      });
      return false;
    } else {
      dispatch({
        type: "SET_SIGNUP_CONFIRMPASSWORD_ERROR",
        payload: "",
      });
      return true;
    }
  };

  async function signupHandler(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    //clear all error messages
    dispatch({ type: "SET_SIGNUP_CONFIRMPASSWORD_ERROR", payload: "" });
    dispatch({ type: "SET_SIGNUP_PASSWORD_ERROR", payload: "" });
    dispatch({ type: "SET_SIGNUP_EMAIL_ERROR", payload: "" });
    dispatch({ type: "SET_SIGNUP_USERNAME_ERROR", payload: "" });

    if (confirmPasswordCheck()) {
      const data = await signup_post(username, email, password);
      if (data.errors) {
        // console.log("data.errors", data.errors);
        // if there is an error, display the error message
        if (data.errors.password) {
          dispatch({
            type: "SET_SIGNUP_PASSWORD_ERROR",
            payload: data.errors.password,
          });
        }
        if (data.errors.email) {
          dispatch({
            type: "SET_SIGNUP_EMAIL_ERROR",
            payload: data.errors.email,
          });
        }
        if (data.errors.username) {
          dispatch({
            type: "SET_SIGNUP_USERNAME_ERROR",
            payload: data.errors.username,
          });
        }
      } else {
        // if there is no error, redirect the user to the home page
        // if (data) {
        //   window.location.href = "https://iamgauravbisht.github.io/gauravdocs/";
        // }

        // clear the input fields if the user is successfully signed up
        dispatch({ type: "SET_SIGNUP_USERNAME", payload: "" });
        dispatch({ type: "SET_SIGNUP_EMAIL", payload: "" });
        dispatch({ type: "SET_SIGNUP_PASSWORD", payload: "" });
      }
    }
  }

  const loginHandler = async (
    email: string,
    password: string
  ): Promise<void> => {
    //clear all error messages
    dispatch({ type: "SET_LOGIN_EMAIL_ERROR", payload: "" });
    dispatch({ type: "SET_LOGIN_PASSWORD_ERROR", payload: "" });
    const data = await login_post(email, password);
    // console.log("data", data);

    // if there is an error, display the error message
    if (data.errors) {
      // console.log("data.errors", data.errors);

      if (data.errors.email) {
        dispatch({
          type: "SET_LOGIN_EMAIL_ERROR",
          payload: data.errors.email,
        });
      }
      if (data.errors.password) {
        dispatch({
          type: "SET_LOGIN_PASSWORD_ERROR",
          payload: data.errors.password,
        });
      }
    }
    // if there is no error, redirect the user to the home page
    // if (data.user) {
    //   window.location.href = "https://iamgauravbisht.github.io/gauravdocs/";
    // }

    // clear the input fields if the user is successfully signed up
    dispatch({ type: "SET_LOGIN_EMAIL", payload: "" });
    dispatch({ type: "SET_LOGIN_PASSWORD", payload: "" });
  };

  const Signup = () => {
    signupHandler(
      state.signupUsername,
      state.signupEmail,
      state.signupPassword
    );
  };

  const Login = () => {
    loginHandler(state.loginEmail, state.loginPassword);
  };

  return (
    <Tabs defaultValue="signup" className="min-w-[300px] max-w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">SignUp</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>SignUp</CardTitle>
            <CardDescription>
              create new account, after signup you will be logged in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="signupusername">Username</Label>
              <Input
                id="signupusername"
                placeholder="@username"
                value={state.signupUsername}
                onChange={storeSignuphandler}
              />
              <ErrorText>{state.signupUsernameError}</ErrorText>
            </div>
            <div className="space-y-1">
              <Label htmlFor="signupemail">Email</Label>
              <Input
                id="signupemail"
                placeholder="example@google.com"
                onChange={storeSignuphandler}
              />
              <ErrorText>{state.signupEmailError}</ErrorText>
            </div>
            <div className="space-y-1">
              <Label htmlFor="signuppassword">Password</Label>
              <Input
                id="signuppassword"
                type="password"
                placeholder="password"
                onChange={storeSignuphandler}
              />
              <ErrorText>{state.signupPasswordError}</ErrorText>
            </div>
            <div className="space-y-1">
              <Label htmlFor="signupconfirmpassword">confirm password</Label>
              <Input
                id="signupconfirmpassword"
                type="password"
                placeholder="confirm password"
                onChange={storeSignuphandler}
              />
              <ErrorText>{state.signupConfirmPasswordError}</ErrorText>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={Signup}>Sign up</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>login</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                placeholder="example@google.com"
                onChange={storeLoginhandler}
              />
              <ErrorText>{state.loginEmailError}</ErrorText>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                onChange={storeLoginhandler}
              />
              <ErrorText>{state.loginPasswordError}</ErrorText>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={Login}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
