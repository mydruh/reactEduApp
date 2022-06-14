import React, { useState, useCallback } from 'react';
import app from "./base.js";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import './DefaultStyles.css';
import Sidebar from './Sidebar';
import './EditProject.scss';


const EditProject = ({history}) => {


    const db = app.firestore();

    // const ref = app.firestore().collection('projects');

    // const [projects, setProjects] = useState([]);
    // const [loading, setLoading] = useState(false);

    // function getProjects() {
    //     setLoading(true);
    //     ref.onSnapshot((querySnapshot) => {
    //         const items = [];
    //         querySnapshot.forEach((doc) => {
    //             items.push(doc.data());
    //         });
    //         setProjects(items);
    //         setLoading(false);
    //     })
    // }

    //     getProjects();

    const project_id = window.location.search.replace('?id=', '').toString();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [geolocation, setGeolocation] = useState('');
    const [foodRadio, setFoodRadio] = useState('');
    const [transportRadio, setTransportRadio] = useState('');
    const [equipmentRadio, setEquipmentRadio] = useState('');
    
    const [passDocument, setPassDocument] = useState('');
  

    const handleEditProject = useCallback(async event => {
        event.preventDefault();
        const { title, date, time, description } = event.target.elements;
        try {
            return db.collection('projects').doc(project_id).
            update({ 
                title_project: title.value,
                date: date.value,
                time: time.value,
                description_project: description.value
            });
            

        } catch (error) {
            alert(error)
        } finally {
            
            history.push("/");
        }

      


    }, [history]); 

    console.log('EDIT PROJECT');
    return (
        <>
          
           <Sidebar />

            <main>
                <div className="section-edit-project">
                    <h2 className="section-title">Добавление урока</h2>
                    <div className="section-block">
                        <form onSubmit={handleEditProject} className="main-form">
                            <div className="group">
                                <span class="group-label">Тема урока</span>
                                <input type="text" class="group-form" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>
                            <div className="group">
                                <span class="group-label">Срок сдачи</span>
                                <input type="date" class="group-form" name="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                            </div>
                            <div className="group">
                                <span class="group-label">Время сдачи</span>
                                <input type="time" class="group-form" name="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                            </div>
                            <div className="group">
                                <span class="group-label">Наименование дисциплины</span>
                                <input type="text" class="group-form" name="geolocation" value={geolocation} onChange={(e) => setGeolocation(e.target.value)} required />
                            </div>
                            <div className="group" style={{display: 'none'}}>
                                <span class="group-label">passDocument</span>
                                <input type="text" class="group-form" name="passDocument" value={passDocument} onChange={(e) => setPassDocument(e.target.value)} />
                            </div>
                            <div className="group" style={{display: 'none'}}>
                                <span class="group__subtitle">Бесплатная еда</span>
                                <div className="group-radio">
                                    <div className="radio">
                                        <input className="radio__input" type="radio" name="foodRadio" value={"Yes"} onChange={(e) => setFoodRadio(e.target.value)} id="radio1" />
                                        <span className="radio__text">Да</span>
                                    </div>
                                    <div className="radio">
                                        <input className="radio__input" type="radio" name="foodRadio" value={"No"} onChange={(e) => setFoodRadio(e.target.value)} id="radio2" />
                                        <span className="radio__text">Нет</span>
                                    </div>
                                </div>
                            </div>
                            <div className="group" style={{display: 'none'}}>
                                <span class="group__subtitle">Бесплатная развозка</span>
                                <div className="group-radio">
                                    <div className="radio">
                                        <input className="radio__input" type="radio" name="transportRadio" value={"Yes"} onChange={(e) => setTransportRadio(e.target.value)} id="radio1" />
                                        <span className="radio__text">Да</span>
                                    </div>
                                    <div className="radio">
                                        <input className="radio__input" type="radio" name="transportRadio" value={"No"} onChange={(e) => setTransportRadio(e.target.value)} id="radio2" />
                                        <span className="radio__text">Нет</span>
                                    </div>
                                </div>
                            </div>
                            <div className="group" style={{display: 'none'}}>
                                <span class="group__subtitle">Бесплатное оборудование</span>
                                <div className="group-radio">
                                    <div className="radio">
                                        <input className="radio__input" type="radio" name="equipmentRadio" value={"Yes"} onChange={(e) => setEquipmentRadio(e.target.value)} id="radio1" />
                                        <span className="radio__text">Да</span>
                                    </div>
                                    <div className="radio">
                                        <input className="radio__input" type="radio" name="equipmentRadio" value={"No"} onChange={(e) => setEquipmentRadio(e.target.value)} id="radio2" />
                                        <span className="radio__text">Нет</span>
                                    </div>
                                </div>
                            </div>
                            <div className="group">
                                <span className="group-label">Описание урока</span>
                                <textarea type="text" className="group-form label-description" name="description" maxLength="1000" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                            </div>
                            <button type="submit" className="edit-project__button-create">Изменить</button>
                        </form>
                    </div>
                    <Link to="/" className="edit-project__button-cancel"><span>Отмена</span></Link>
                </div>
            </main>

        </>
    )
}

export default withRouter(EditProject);


