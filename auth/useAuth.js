import { useContext } from "react";

import AuthContext from "./context";
import authStorage from "./storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (User) => {
    setUser(User);
    authStorage.storeToken(User.idToken);
  };

  const logOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};
