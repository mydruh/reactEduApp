import React, { useState, useCallback } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import app from './base.js';
import Sidebar from './Sidebar';
import "./EditUserPassword.scss";

const EditUserPassword = ({history}) => {

    const [current_password, setCurrentPassword] = useState('');
    const [new_password, setNewPassword] = useState('');

    const email_user = app.auth().currentUser.email;
    const user_id = app.auth().currentUser.uid;

    const handleEditUserEmail = useCallback(async event => {
        event.preventDefault();

        const { current_password, new_password } = event.target.elements;

        try {
            app.auth().signInWithEmailAndPassword(email_user, current_password.value)
            .then(function(userCredential) {
                userCredential.user.updatePassword(new_password.value)
            });


            history.push('/')

        } catch(error) {
            alert(error);
        } finally {
        }


    },[history]);

    return (
        <>

            <Sidebar />

            <main>
                <div className="section-edit-password">
                    <div className="header-edit-password">
                        <div className="header-edit-password-items">
                            <img src={require("./images/EditUserPassword/edit-password-header-image.svg").default} alt="img-header" className="header-edit-password-image"/>
                            <h4 className="header-title">Изменение пароля</h4>
                        </div>
                        <hr />
                    </div>
                    <div className="section-body">
                        <img className="edit-password-image" src={require('./images/EditUserPassword/edit-password-image.svg').default} alt="password image" className="edit-password-image"/>
                        <div className="block-edit-password">
                            <form onSubmit={handleEditUserEmail} className="edit__form-block">
                                <input 
                                    type="password" 
                                    name="current_password"  
                                    className="edit__new-password input" 
                                    value={current_password} 
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Ваш текущий пароль" />
                                <input 
                                    type="password" 
                                    name="new_password"  
                                    className="edit__password input" 
                                    value={new_password} 
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Новый пароль" />

                                <button 
                                    type="submit"
                                    className="edit__button-edit">
                                    Изменить
                                </button>
                            </form>
                            <Link to="/" className="edit__button-cancel">
                                Отмена
                            </Link>
                        </div>  
                    </div>
                </div>
            </main>
        </>
    )
}

export default withRouter(EditUserPassword);

/* <h2>Edit Password</h2>
            <form onSubmit={handleEditUserEmail}>
                <input 
                    type="password" 
                    name="current_password" 
                    placeholder="Current password" 
                    value={current_password} 
                    onChange={(e) => setCurrentPassword(e.target.value)}/>
                <input 
                    type="password" 
                    name="new_password" 
                    placeholder="New password" 
                    value={new_password} 
                    onChange={(e) => setNewPassword(e.target.value)}/>
                <button type="submit">Edit Password</button>
            </form>
            <Link to="./password"><button>Cancel</button></Link> */