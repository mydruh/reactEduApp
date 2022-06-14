import React, { useCallback, useState, useContext } from "react"; 
import { withRouter, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import { AuthContext } from "./Auth.js";
import app from "./base";
import "./SignUp.css";

const SignUp = ({ history }) => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");

  const [role, setRole] = useState("");
  const ref = app.firestore().collection("users");
  

  function addUserToDb(user) {
    ref
      .doc(user.id)
      .set(user)
      .then(() => {
        setUser((prev) => [user, ...prev]);
      })
      .catch((err) => {
        console.error(err);
      });

      
      
  }

  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { firstname, lastname, email, role, password } = event.target.elements;    
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value).then((userRecord) => {
  
          let uid = app.auth().currentUser.uid;
    
          return app.firestore().collection('users').doc(uid)
            .set({
              user_uid: uid,
              firstname: firstname.value,
              lastname: lastname.value,
              email: email.value,
              role: role.value
            })
    
        })
      history.push("/list_projects");



    } catch (error) {
      alert(error);
    }
    
  }, [history]);

  const onSubmit = (e) => {
    e.preventDefault();
    ref.add({email})
    .then(() => {
      setEmail('')    
    })
  }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
    <div className="backgroundPolyTech">
      <main>
        <div class="section-register">
          <h2 class="main-title">Регистрация</h2>
          <hr />
          <div class="main-form">
            <form class="loginForm" onSubmit={handleSignUp}>
            <div class="group">
                <span class="group-label">Имя</span>
                <input class="group-form" type="text" placeholder="John" name="firstname" />
              </div>
              <div class="group">
                <span class="group-label">Фамилия</span>
                <input class="group-form" type="text" placeholder="Mask" name="lastname" />
              </div>
              <div class="group">
                <span class="group-label">Email</span>
                <input class="group-form" type="email" placeholder="example@gmail.com" name="email" />
              </div>
              <div class="group" style={{display: 'none'}}>
                <span class="group-label">ROLE</span>
                <input class="group-form" type="text" placeholder="role" name="role" value="student" />
              </div>
              <div class="group">
                <span class="group-label">Пароль</span>
                <input class="group-form" type="password" placeholder="************" name="password" />
              </div>
              <button type="submit" class="button-submit">Регистрация</button>
            </form>
            
            <hr />
            <h2 class="main-form-subtitle">У вас есть аккаунт?</h2>
            <Link to="/login"><button class="main-form-register">Авторизоваться</button></Link>
          </div>
        </div>
      </main>
      </div>
    </>
  );
};


export default withRouter(SignUp);
