import React, {useState, useEffect, Component} from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import app from "./base";
import './ListProjects.scss';
import Sidebar from './Sidebar';
import './DefaultStyles.css';



const ListProjects = () => {
    console.log("page started");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const [role, setRole] = useState('');

    const ref = app.firestore().collection('projects');

    function getProjects() {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setProjects(items);
            setLoading(false);
        })
    }

    const getUserRole = async () => {
        //GETTING USER CREATOR
        try {
            const db = app.firestore();
            setLoading(true);
            db.collection("users")
            .doc(app.auth().currentUser.uid)
            .get()
            .then(doc => {
                setRole(doc.get("role"));
                console.log('role is: '+doc.get("role"));
                setLoading(false);
            });
            

        } catch (error) {
            alert(error)
        }
        
    }

  
    useEffect(() => {
        getProjects();
        getUserRole();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    function MyComponent() {
        return <span>Successed</span>;
      }

      function sortInputFnc() {
        let val = document.getElementById('sortInput').value.trim();
        let elasticItems = document.querySelectorAll('#cardsListSort .link-block');
        let hideShowValue = document.getElementById('');
        if (val != '') {
            elasticItems.forEach(function (elem) {
                if (elem.children[1].children[0].children[0].innerText.search((RegExp(val,"gi"))) == -1 && val != "allCategories") {
                    elem.style.display = "none"
                }
                else if (val == "allCategories"){
                    elem.style.display = "block"
                }
                else {
                    elem.style.display = "block"
                }
            });
        }
        else {
              elasticItems.forEach(function (elem) {
               
                    elem.classList.remove('hide');
                
              });
        }
    }
    
    return (
        <>
            <Sidebar />
            <main class="listProjectsMain">
            <div>
                <img src="https://dier.rs/images/profesionalni-pristup.jpg" style={{width: "100%", objectFit: "none", height: 500}} />
            </div>
                <div className="section-list-projects">
                    <div className="list__group-text" style={{borderBottom: 'none'}}>
                        <h2 className="list__title">Дисциплины</h2>
                        <Link class="link-reset-style" style={ role == "teacher"? { display: 'block'} : {display: 'none'}} to="add_project"><button class="button-green list__button">Добавить дисциплины</button></Link>
                    </div>

                    <div className="list__group-text" style={{paddingTop: 0}}>
                        <select className="sortInput" id="sortInput" onChange={sortInputFnc}>
                            <option selected value="allCategories">Все уроки</option>
                            <option value="Русский язык">Русский язык</option>
                            <option value="Математика">Математика</option>
                            <option value="Автоматизированные информационные системы">Автоматизированные информационные системы </option>
                        </select>
                    </div>
                    
                    <div class="cards-list" id='cardsListSort'>
                        {projects.map((project) => (
                            
                        <Link class="link-block card-event" key={project.project_id} to={`/project_page?id=${project.project_id}`} style={ project.pass_document != ""? { background:'#d0dbd0'} : {}} >
                            <div class="card-header">
                                <div class="card-row__block">
                                    <h2 class="card-title">{project.title_project.length > 40 ? project.title_project.substring(0, 40) + "..." : project.title_project }</h2>
                                </div>
                                <div class="card-row__block">

                                    {project.pass_document != "" &&        <i class="fa-solid fa fa-check" style={{color: 'green', fontSize: 30}}></i>      }

                                    {/* <img src={require('./images/Card image/default-image.svg').default} alt="" class="card-img" /> */}
                                </div>
                            </div>

                            
                            <div class="card-main">
                                <div class="card-main-group">
                                    <div class="card-row__block">
                                    <i class="fa-solid fa fa-book"></i>
                                        <span class="card-subtext">{project.geolocation}</span>
                                    </div>
                                    <div class="card-row__block">
                                    <i class="fa-solid fa fa-clock-o"></i>
                                        <span class="card-subtext">{project.date} / {project.time}</span>
                                    </div>
                                </div>
                                <p class="card-description">{ project.description_project.length > 40 ? project.description_project.substring(0, 40) + "..." : project.description_project }</p>  
                            </div>
                        </Link>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )

}

export default ListProjects;