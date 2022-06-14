import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import app from "./base.js";
import { Link } from 'react-router-dom';
import { AuthContext } from "./Auth.js";
import './DefaultStyles.css';
import './Login.scss';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
    <div className="backgroundPolyTech">
      <main>
        <div class="section-login">
        <div className="logoBlock"><img src="https://i.ibb.co/ZVDrjfr/1.png" style={{width: "20%"}}/></div>
          <hr />
          <div class="main-form">
            <form class="loginForm" onSubmit={handleLogin}>
              <div class="group">
                <span class="group-label">Email</span>
                <input class="group-form" type="email" placeholder="example@gmail.com" name="email" />
              </div>
              <div class="group">
                <span class="group-label">Пароль</span>
                <input class="group-form" type="password" placeholder="************" name="password" />
              </div>
              <button type="submit" class="button-submit">Войти</button>
            </form>
            
            <hr />
            <h2 class="main-form-subtitle">Нет аккаунта?</h2>
            <Link to="/signup"><button class="main-form-register">Регистрация</button></Link>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default withRouter(Login);
