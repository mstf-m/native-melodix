import apollo from "../graphql/apollo";
import { gql } from "@apollo/client";
import axios from "axios";
import { baseURL } from "../config/env";

const LOGIN = gql`
  mutation UserLogin($password: String!, $username: String!) {
    login(
      input: {
        provider: PASSWORD
        credentials: { password: $password, username: $username }
      }
    ) {
      authToken
      authTokenExpiration
      clientMutationId
      refreshToken
      refreshTokenExpiration
      sessionToken
      user {
        avatar {
          url
        }
        email
        jwtAuthToken
        name
        username
        userId
      }
    }
  }
`;

export default AuthApi = async (credentials) => {
  try {
    const res = await axios.post(
      `http://api.afarineshweb.ir/wp-json/jwt-auth/v1/token`,
      {
        password: credentials.password,
        username: credentials.email,
      }
    );
    if (res.status === 200) {
      // const response = await apollo.mutate({
      //   mutation: LOGIN,
      //   variables: {
      //     password: credentials.password,
      //     username: res.data.user_nicename,
      //   },
      // });
      // const userData = response.data.login.user;
      return {
        user: res.data,
        status: 200,
        message: "succesfully loged in",
      };
    }
  } catch (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      return {
        user: null,
        status: error.response.status,
        message: "Email or password is wrong!",
      };
    }
  }

  // console.log(res.status);
  // const response = await apollo.mutate({
  //   mutation: LOGIN,
  //   variables: {
  //     password: credentials.password,
  //     username: res.data.user_nicename,
  //   },
  // });

  // const userData = response.data.login.user;

  // const userData = { name: "" };
  // const user = {
  //   name: userData.name,
  //   password: userData.password,
  //   email: userData.email,
  //   image: userData.avatar.url,
  // };

  // return userData;
};
