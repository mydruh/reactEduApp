import React, { useState, useCallback } from 'react';
import app from "./base.js";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import './DefaultStyles.css';
import './AddProject.scss';
import Sidebar from './Sidebar';


const AddProject = ({history}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [geolocation, setGeolocation] = useState('');
    const [transportRadio, setTransportRadio] = useState('');
    const [equipmentRadio, setEquipmentRadio] = useState('');
    const [creator, setCreator] = useState('');

    try {
        const db = app.firestore();
        db.collection("users")
        .doc(app.auth().currentUser.uid)
        .get()
        .then(doc => {
            setCreator(doc.get("lastname")+' '+doc.get("firstname"));
            window.creatorDoc = doc.get("lastname")+' '+doc.get("firstname");
        });
        

    } catch (error) {
        alert(error)
    }

    const [passDocument, setPassDocument] = useState('');

    const userId = app.auth().currentUser.uid;

    const handleAddProject = useCallback(async event => {
        event.preventDefault();
        const { title, description, date, time, geolocation, transportRadio, equipmentRadio, passDocument } = event.target.elements;

        try {
            window.project_id = uuidv4().toString();
            let project_id = window.project_id;
            const file = passDocument[0].files[0];
            uploadFiles(file);
            
            return app.firestore().collection('projects').doc(project_id)
            .set({
              project_id: project_id, 
              title_project: title.value,
              description_project: description.value,
              date: date.value,
              time: time.value,
              geolocation: geolocation.value,
              transport: transportRadio.value,
              equipment: equipmentRadio.value,
              pass_document: passDocument.value,
              creator: window.creatorDoc,
              userId: userId
            })

            

        } catch (error) {
            alert(error)
        } finally {
            history.push("/");
        }

    }, [history]); 

    const storage = app.storage();

    const [progress, setProgress] = useState(0);
  
    const uploadFiles = (file) => {
      //
      if (!file) return;
      const storageRef = app.storage().ref();
      let splitFormat = file.name.split('.')[file.name.split('.').length-1];
      const sotrageRef = storageRef.child(`filesToLesson/${window.project_id}/${window.project_id+'.'+splitFormat}`);
      const uploadTask = storageRef.child(`filesToLesson/${window.project_id}/${window.project_id+'.'+splitFormat}`).put(file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => console.log(error),
        () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('Файл доступен по', downloadURL);
        });
        }
      );
    };
    console.log('adding project')
    return (
        <>
            
            <Sidebar />

            <main>
                <div className="section-add-project">
                    <h2 className="section-title">Добавление урока</h2>
                    <div className="section-block">
                        <form onSubmit={handleAddProject} className="main-form">
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
                                {/* <input type="text" class="group-form" name="geolocation" value={geolocation} onChange={(e) => setGeolocation(e.target.value)} required /> */}
                                <select className="group-form" name="geolocation" onChange={(e) => setGeolocation(e.target.value)} required>
                                    <option value="Русский язык" selected>Русский язык</option>
                                    <option value="Математика">Математика</option>
                                    <option value="Автоматизированные информационные системы">Автоматизированные информационные системы</option>
                                </select>
                            </div>
                            <div className="group">
                                <span class="group-label" id="addFile">Закрепление файла</span>
                                <input type="file" accept=".pdf" class="group-form" name="passDocument" id="addDoc" onChange={function(e){ document.getElementById('addFile').innerHTML = e.target.value}} required />
                            </div>
                            <div className="group" style={{display: 'none'}}>
                                <span class="group-label">passDocument</span>
                                <input type="text" class="group-form" name="passDocument" value={passDocument} onChange={(e) => setPassDocument(e.target.value)} />
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
                            <button type="submit" className="add-project__button-create">Создать</button>
                        </form>
                    </div>
                    <Link to="/" className="add-project__button-cancel"><span>Отмена</span></Link>
                </div>
            </main>
        </>
    )


   
}

export default withRouter(AddProject);

