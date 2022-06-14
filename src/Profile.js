import React, { useState, useEffect, useCallback } from 'react';
import { Route, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import './DefaultStyles.css';
import './Profile.scss';
import app from "./base.js";

const Profile = () => {

    const db = app.firestore();
    const user_id = app.auth().currentUser.uid;

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [loading, setLoading] = useState(false);
    const email = app.auth().currentUser.email;

    const getUserData = async () => {
        try {
            setLoading(true);
            db.collection("users")
            .doc(app.auth().currentUser.uid)
            .get()
            .then(doc => {
                setFirstname(doc.get("firstname"));
                setLastname(doc.get("lastname"));
                setLoading(false);
            });
            

        } catch (error) {
            alert(error)
        } 
    }

    useEffect(() => {
        getUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }
    

    const deleteUser = () => {

        let user = app.auth().currentUser;
        let userData = app.firestore().collection('users');

        userData.doc(user.uid).delete().then(() => {
            console.log('Data profile from firestore successful deleted');
        }).catch((error) => {
            console.log('Error data is: ', error);
        })

        user.delete().then(function(){
            console.log('Profile successful deleted');
        }).catch(function(error) {
            console.log('Error is: ', error);
        });

    }
    
    
    return (
        <>
            <Sidebar />
            <main>
                <div className="section-profile">
                    <div className="profile__control_block">
                        <p className="profile__fullname">{firstname + " " + lastname}</p>
                        <Link to={`./edit_profile?id=${user_id}`} className="profile__outline_buttons profile__button_edit_fullname">
                            <img src={require("./images/profile/change_profile_basic_info.svg").default} className="profile__icons" />Изменить основное
                        </Link>
                        <Link to={`./edit_user_email?id=${user_id}`} className="profile__outline_buttons profile__button_edit_email">
                            <img src={require("./images/profile/change_email.svg").default} className="profile__icons" />Изменить почту
                        </Link>
        
                        <Link to={`./edit_user_password?id=${user_id}`} className="profile__outline_buttons profile__button_edit_password">
                            <img src={require("./images/profile/change_password.svg").default} className="profile__icons" />Изменить пароль
                        </Link>
        
                        <button onClick={() => app.auth().signOut()} className="profile__outline_buttons profile__button_logout">
                            <img src={require("./images/profile/log_out.svg").default} className="profile__icons" />Выйти из аккаунта
                        </button>
                    </div>
        
                    <div className="profile_image">
                        <img src={require("./images/profile/profile_menu.svg").default } />
                    </div>
                </div>
            </main>
            
        </>
    )
}

export default Profile;

