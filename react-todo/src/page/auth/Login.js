import React, { useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
} from "@mui/material/";

import * as Auth from "../../services/Auth";

function Login({ setToken }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username && password) {
      const payload = { username, password };
      const token = await Auth.login(payload);
      setToken(token.data);
      localStorage.setItem("token", JSON.stringify(token.data));
    }
  };

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (username && password) {
        handleLogin();
      }
    }
  };

  return (
    <Grid justify="center">
      <form>
        <Card>
          <CardHeader title="Login App" />
          <CardContent>
            <div>
              <TextField
                //   error={state.isError}
                fullWidth
                id="username"
                type="email"
                label="Username"
                placeholder="Username"
                margin="normal"
                value={username}
                onChange={handleUsernameChange}
                onKeyDown={handleKeyDown}
              />
              <TextField
                //   error={state.isError}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                value={password}
                onChange={handlePasswordChange}
                //   helperText={state.helperText}
                onKeyDown={handleKeyDown}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              // className={classes.loginBtn}
              onClick={handleLogin}
              // disabled={state.isButtonDisabled}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    </Grid>
  );
}
export default Login;
