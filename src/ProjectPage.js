import React, {useState, useEffect} from 'react';
import app from './base.js';
import { storage  } from "./base";
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import './ProjectPage.scss';
import './DefaultStyles.css';

const ProjectPage = () => {

    const project_id = window.location.search.replace('?id=', '').toString();
    

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [geolocation, setGeolocation] = useState('');
    const [foodRadio, setFoodRadio] = useState('');
    const [transportRadio, setTransportRadio] = useState('');
    const [equipmentRadio, setEquipmentRadio] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [creator, setCreator] = useState('');

    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const button = document.querySelector('.main-button-edit');
    
    const getUserData = async () => {
        try {
            app.firestore().collection("projects")
            .doc(project_id)
            .get()
            .then(doc => {
                setTitle(doc.get("title_project"));
                setDescription(doc.get("description_project"));
                setDate(doc.get("date"));
                setTime(doc.get("time"));
                setGeolocation(doc.get("geolocation"));
                setFoodRadio(doc.get("food"));
                setTransportRadio(doc.get("transport"));
                setEquipmentRadio(doc.get("equipment"));
                setCreator(doc.get("creator"));
            });
            

        } catch (error) {
            alert(error)
        } 
        //GETTING USER CREATOR
        try {
            const db = app.firestore();
            setLoading(true);
            db.collection("users")
            .doc(app.auth().currentUser.uid)
            .get()
            .then(doc => {
                setFirstname(doc.get("firstname"));
                setLastname(doc.get("lastname"));
                setRole(doc.get("role"));
                console.log('role is: '+doc.get("role"));
                setLoading(false);
            });
            

        } catch (error) {
            alert(error)
        }
        
        
        try {
          app.firestore().collection("projects")
          .doc(project_id)
          .get()
          .then(doc => {
              setGeolocation(doc.get("geolocation"));
          });
          

      } catch (error) {
          alert(error)
      } 
    }

    const downloadFiles = (file) => {
        //
        const storageRef = app.storage().ref();

        console.log(storageRef);

        storageRef.child(`filesToLesson//${project_id}/${project_id+'.pdf'}`).getDownloadURL()
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
    console.log(url);
    var docBlock = document.getElementById('documentBlock');
    docBlock.setAttribute('src', url)
    // Or inserted into an <img> element
    window.docUrl = url;
  })
  .catch((error) => {
    // Handle any errors
  });
    
       
      };

    useEffect(() => {
        getUserData();
        downloadFiles();
    }, []);

    const userId = app.auth().currentUser.uid;


    const deleteProject = () => {
        try {
            app.firestore().collection('projects').doc(project_id).delete();
            alert('Successed')
        } catch (e) {
            alert(e)
        }
    }

    function getLesson(){
        try{
            window.lesson = document.getElementById("lessonName").innerHTML;
        }catch(err){
            console.log("Задание не закреплено");
        }
    }

    return (
        <>
        
        <Sidebar />

        <main>
        <div class="section-event-info">
            <h1 class="event-info__title">{title}</h1>
            <div class="event-info__row">
                <div class="row-block"><i class="fa-solid fa fa-book" style={{fontSize: 50}}></i><span id="lessonName">{geolocation}</span></div>
                <div class="row-block"><img src={require("./images/ProjectPage/calendar.svg").default} alt="Дата" /><span>Срок сдачи: {date}</span></div>
                <div class="row-block"><img src={require("./images/ProjectPage/time.svg").default} alt="События" /><span>Время сдачи: {time}</span></div>
            </div>
          


            <div class="tabs-body">

                <div class="tabs__block event-info__description" id="description">
                    <h2 class="description__title">Описание</h2>
                    <p class="description__text">{description}</p>
                </div>
                  
                {/* <div class="tabs__block event-info__others" id="other">
                    <h2 class="others__title">Другое:</h2>
                    <div class="others-block">
                        <div class="others-row"><img src={require("./images/ProjectPage/food.svg").default} alt="Еда"/><span>Бесплатная еда: {foodRadio}</span></div>
                        <div class="others-row"><img src={require("./images/ProjectPage/transport.svg").default} alt="Транспорт"/><span>Бесплатная развозка: {transportRadio}</span></div>
                        <div class="others-row"><img src={require("./images/ProjectPage/equipment.svg").default} alt="Экипировка"/><span>Бесплатная экипировка: {equipmentRadio}</span></div>
                    </div>
                </div> */}

                <div class="tabs__block event-info__document" id="document">
                    <iframe id="documentBlock" width="100%" height="800px"></iframe>
                </div>
                  
                <div class="tabs__block event-info__contacts" id="contacts">
                    <h2 class="contacts__title">Преподаватель:</h2>
                    <div class="contacts-block">
                        <div class="contacts-row">
                            <button class="contacts__button">{creator}</button>
                        </div>
                    </div>
                </div>

                <div class="tabs__block event-info__control" id="control">
                    <h2 class="control__title">Управление</h2>
                    <div class="control-block">
                        
                        <div class="control-row">
                            <Link to={`/pass_project?id=${project_id}`} onClick={getLesson} class="control__button">Закрепить задание</Link>
                        </div>
                        <div class="control-row">
                            <Link style={ role == "teacher"? { display: 'flex'} : {display: 'none'}} to={`/edit_project?id=${project_id}`} class="control__button">Изменить урок</Link>
                        </div>
                        <div class="control-row">
                            <Link style={ role == "teacher"? { display: 'flex'} : {display: 'none'}} onClick={deleteProject} class="control__button">Удалить урок</Link>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </main>

        </>
    )
    

}

export default ProjectPage;