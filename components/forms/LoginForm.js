import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Button from "../../components/Button";
import TextInput from "./TextInput";
import Profile from "../../assets/SVGs/Profile";
import Lock from "../../assets/SVGs/Lock";
import ErrorMessage from "./ErrorMessage";
import Text from "../Text";
import AuthApi from "../../api/AuthApi";
import useAuth from "../../auth/useAuth";

import { Formik } from "formik";
import { object, string } from "yup";
import colors from "../../config/colors";
import GoogleSignIn from "../GoogleSignIn";

const validationSchema = object().shape({
  email: string().required(),
  password: string().required().min(4),
});

export default function LoginForm() {
  const auth = useAuth();
  const [LoginFailed, setLoginFailed] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const Submit = async (values) => {
    setisLoading(true);
    const result = await AuthApi(values);

    if (result?.status === 200) {
      setLoginFailed(false);
      auth.logIn(result.user);
    } else {
      setLoginFailed(true);
    }
    setisLoading(false);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={Submit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
        <View style={styles.form}>
          <ErrorMessage
            error={"wrong email or password"}
            visible={LoginFailed}
          />

          <TextInput
            icon={<Profile />}
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={handleChange("email")}
            onBlur={() => setFieldTouched("email")}
          ></TextInput>
          <ErrorMessage error={errors.email} visible={touched.email} />

          <TextInput
            icon={<Lock />}
            placeholder="New Password"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            onChangeText={handleChange("password")}
            onBlur={() => setFieldTouched("password")}
            haveEye
          ></TextInput>
          <ErrorMessage error={errors.password} visible={touched.password} />

          <Button style={styles.submit} onPress={handleSubmit}>
            <Text style={styles.text}>
              {isLoading ? "Please wait..." : "login"}
            </Text>
          </Button>

          <GoogleSignIn></GoogleSignIn>

          <View style={styles.recover}>
            <Text style={styles.question}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => console.log("first")}>
              <Text style={styles.signup}>sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: "50%",
    marginHorizontal: 20,
  },
  submit: {
    marginTop: 30,
  },
  text: {
    color: colors.grayDark,
  },
  recover: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  question: {
    color: colors.gray,
  },
  signup: {
    color: colors.primary200,
  },
});
