import React, { useState, useEffect, useCallback } from 'react';
import app from "./base.js";
import { storage  } from "./base";
import { withRouter, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import './DefaultStyles.css';
import Sidebar from './Sidebar';
import './EditProject.scss';


const PassProject = ({history}) => {

    const db = app.firestore();
    const user_id = app.auth().currentUser.uid;
    const project_id = window.location.search.replace('?id=', '').toString();

    const [passDocument, setPassDocument] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [title, setTitle] = useState('');
    const [geolocation, setGeolocation] = useState('');
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
        
        
        try {
          app.firestore().collection("projects")
          .doc(project_id)
          .get()
          .then(doc => {
              setGeolocation(doc.get("geolocation"));
              setTitle(doc.get("title_project"));
          });
          

      } catch (error) {
          alert(error)
      } 
    }

    useEffect(() => {
      getUserData();
  }, []);

    const storage = app.storage();

    const [progress, setProgress] = useState(0);
    const handleEditProject = (e) => {
      e.preventDefault();

      const { passDocument } = e.target.elements;

        try {
            db.collection('projects').doc(project_id).
            update({ 
                pass_document: passDocument.value
            });
            

        } catch (error) {
            alert(error)
        }
      const file = e.target[0].files[0];
      uploadFiles(file);
    };
  
    const uploadFiles = (file) => {
      //
      if (!file) return;
      const storageRef = app.storage().ref();
      const sotrageRef = storageRef.child(`Закрепленные задания/${geolocation}/${title}/${lastname + " " + firstname}/${file.name}`);
      const uploadTask = storageRef.child(`Закрепленные задания/${geolocation}/${title}/${lastname + " " + firstname}/${file.name}`).put(file);
  
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

    
    return (
        <>
          
           <Sidebar />

            <main>
                <div className="section-edit-project">
                    <h2 className="section-title">Закрепление материала</h2>
                    <div className="section-block">
                        <form onSubmit={handleEditProject} className="main-form">
                            <div className="group">
                                <span class="group-label" id="documentName">Документ</span>
                                <br />
                                <span class="group-label">Загрузка файла {progress}%</span>
                                <input type="file" class="group-form" name="passDocument" id="passDoc" onChange={function(e){setPassDocument(e.target.value); document.getElementById('documentName').innerHTML = e.target.value}} required />
                            </div>

                            <button type="submit" className="edit-project__button-create">Загрузить</button>
                        </form>
                    </div>
                    <Link to="/" className="edit-project__button-cancel"><span>Отмена</span></Link>
                </div>
            </main>

        </>
    )
}

export default withRouter(PassProject);

