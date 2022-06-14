import React, { useState, useCallback } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import app from './base.js';
import Sidebar from './Sidebar';

import './EditUserEmail.scss';

const EditUserEmail = ({history}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const email_user = app.auth().currentUser.email;
    const user_id = app.auth().currentUser.uid;

    const handleEditUserEmail = useCallback(async event => {
        event.preventDefault();

        const { email, password } = event.target.elements;

        try {
            app.auth().signInWithEmailAndPassword(email_user, password.value)
            .then(function(userCredential) {
                userCredential.user.updateEmail(email.value)
            });

            app.firestore().collection('users').doc(user_id).update({ 
                email: email.value,
            });

            history.push('./profile')

        } catch(error) {
            alert(error);
        } finally {
        }


    },[history]);

    return (
        <>

            <Sidebar />

            <main>
                <div className="section-edit-email">
                    <div className="header-edit-email">
                        <div className="header-edit-email-items">
                            <img src={require("./images/EditUserEmail/edit-email-header-image.svg").default} alt="img-header" className="header-edit-email-image"/>
                            <h4 className="header-title">Изменение почты</h4>
                        </div>
                        <hr />
                    </div>
                    <div className="section-body">
                        <img className="edit-email-image" src={require('./images/EditUserEmail/edit-email-image.svg').default} alt="email image" className="edit-email-image"/>
                        <div className="block-edit-email">
                            <form onSubmit={handleEditUserEmail} className="edit__form-block">
                                <input 
                                    type="email" 
                                    name="email"  
                                    className="edit__new-email input" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Новый e-mail" />
                                <input 
                                    type="password" 
                                    name="password"  
                                    className="edit__password input" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Ваш текущий Пароль" />

                                <button 
                                    type="submit"
                                    className="edit__button-edit">
                                    Изменить
                                </button>
                            </form>
                            <Link to="./profile" className="edit__button-cancel">
                                Отмена
                            </Link>
                        </div>  
                    </div>
                </div>
            </main>
        </>
    )
}

/* <h2>Edit Email</h2>
            <form onSubmit={handleEditUserEmail}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Enter email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>
                <input 
                    type="password" 
                    name="password" 
                    placeholder="*******" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Edit Email</button>
            </form>
            <Link to="./profile"><button>Cancel</button></Link> */

export default withRouter(EditUserEmail);