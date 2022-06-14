import React, { useState, useCallback } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import Sidebar from './Sidebar';
import app from "./base.js";
import './EditProfile.scss';


const EditProfile = ({history}) => {

    
    const db = app.firestore();

    const profile_id = window.location.search.replace('?id=', '').toString();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    
   
    const handleEditProfile = useCallback(async event => {
        event.preventDefault();
        const { firstname, lastname } = event.target.elements;

        try {
            return db.collection('users').doc(profile_id).
            update({ 
                firstname: firstname.value,
                lastname: lastname.value
            });
        } catch (error) {
            alert(error)
        } finally {
            
            history.push("/");
        }
    }, [history]); 



    return (
        <>

            <Sidebar />

            <main>
                <div className="section-edit-profile">
                    <div className="header-edit-profile">
                        <div className="header-edit-profile-items">
                            <img src={require("./images/EditProfile/edit-profile-icon.svg").default} alt="img-header" className="header-edit-profile-image" />
                            <h4 className="header-title">Изменение основных данных</h4>
                        </div>
                        <hr />
                    </div>
                    <div className="section-body">
                        <img className="edit-profile-image" src={require('./images/EditProfile/edit-profile-img.svg').default} alt="profile image" className="edit-profile-image" />
                        <div className="block-edit-profile">
                            <form onSubmit={handleEditProfile} className="edit__form-block">
                                <input
                                    type="text"
                                    name="firstname"
                                    className="edit__new-profile input"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    placeholder="Имя" />
                                <input
                                    type="text"
                                    name="lastname"
                                    className="edit__password input"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    placeholder="Фамилия" />

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

export default withRouter(EditProfile);