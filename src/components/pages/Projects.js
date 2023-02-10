import Message from "../layout/Message"
import styles from './Projects.module.css'
import Container from '../layout/Container'
import LinkButton from "../layout/LinkButton"
import {useLocation} from 'react-router-dom'
import ProjectCard from '../project/ProjectCard'
import { useState,useEffect } from "react"
import Loading from "../layout/Loading"

function Projects(){

    const [projects , setProjects] = useState([])
    const [RemoveLoading , SetRemoveLoading] = useState(false)
    const [projectMessage , setProjectMessage] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/projects',{
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
            },
        }).then((resp) => resp.json())
        .then((data) => {
        setProjects(data)
        SetRemoveLoading(true)
        console.log(data)
        })
        .catch((err) => console.log(err))
    },[])

    const Location = useLocation()
    let message = ''
    if(Location.state){
        message = Location.state.message
    }

    function RemoveProject(id){
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'DELETE',
            headers: {
                'content-Type' : 'application/json'
            },
        }).then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto deletado com sucesso')
        })
        .catch(err => console.log(err))
    }

    return (
    <div className={styles.project_container}>
     <div className={styles.tittle_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
        </div>
        <div>
         {message && <Message type="success" msg={message}/>}
         {projectMessage && <Message type="success" msg={projectMessage}/>}
         <Container customClass="start">
            {projects.length > 0 && 
                projects.map((project) => <ProjectCard 
                id={project.id}
                name={project.name}
                budget={project.budget}
                category={project.category.name}
                key={project.id}  
                handleRemove={RemoveProject}              
                />            
                )}
                {!RemoveLoading && <Loading/>}
                {RemoveLoading && projects.length === 0 && (

                    <p>Não há Projetos cadastrados</p>
                )
                 
                }
         </Container>
        </div>
     
     
    </div>
    )
}

export default Projects