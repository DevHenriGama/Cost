import styles from './Project.module.css'
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loading from '../layout/Loading'
import Container  from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import { v4 as uuidv4 } from 'uuid';
import ServiceCard from '../service/ServiceCard'


function Project(){

let { id } = useParams()

const [project , setProject] = useState([])
const [services , setServices] = useState([])
const [showProjectForm , setShowProjectForm] = useState(false)
const [showServiceForm , setShowServiceForm] = useState(false)
const [message , setMessage] = useState()
const [typeMessage , setTypeMessage] = useState()

useEffect(() => {
    setTimeout(() => {
        fetch(`http://localhost:5000/projects/${id}`,{
    method : 'GET',
    headers : {
        'Content-Type' : 'application/json',
},

})
.then((resp) => resp.json())
.then((data) => {
    setProject(data)
    setServices(data.services)
  })
.catch((err) => console.log(err))
    },5000)
},[id])

function editPost(project){
 //budget validation
 setMessage('')

 if (project.budget < project.cost){
    setMessage("O Orçamento não pode ser menor que o custo")
   setTypeMessage('error')
   return false 
 }

  fetch(`http://localhost:5000/projects/${project.id}`,{
    method:'PATCH',
    headers: {
        'Content-Type' : 'application/json',
    },body: JSON.stringify(project),
  })
  .then(resp => resp.json())
  .then((data) => {
    setProject(data)
    setShowProjectForm(false)
    setMessage("Projeto Atualizado")
    setTypeMessage('success')
  })
  .catch(err => console.log(err))
}


function createService(project){
    const lastService = project.services[project.services.length - 1]
  
  lastService.id = uuidv4()

  const lastServiceCost = lastService.cost
  const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

  //maximum value validation

  if(newCost > parseFloat(project.budget)){
    setMessage('Orçamento Ultrapassa o custo do serviço')
    setTypeMessage('error')
    project.services.pop()
    return false

  }

  //add service cost
  project.cost = newCost


  //update Project

  fetch(`http://localhost:5000/projects/${project.id}`, {
  method:'PATCH',
  headers: {
    'content-type' : 'application/json',
  },
  body: JSON.stringify(project)

  }).then(
    (resp) => resp.json()
  ).then((data) => {
    console.log(data)
  })
    .catch(err => console.log(err))
}

 function removeService(id, cost){
 const servicesUpdate = project.services.filter(
  (service) => service.id !== id
 )
  const projectUpdated = project
  projectUpdated.services = servicesUpdate

  projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)
    
  fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
    method: 'PATCH',
    headers: { 'Content-Type' : 'application/json'},
    body : JSON.stringify(projectUpdated)
  }).then((resp) => resp.json())
    .then((data) => {
      setProject(projectUpdated)
      setServices(servicesUpdate)
      setMessage('Serviço removido com sucesso')
    })
  .catch((err) => console.log(err))
 }

function toogleProjectForm(){
 setShowProjectForm(!showProjectForm)
}

function toogleServiceForm(){
setShowServiceForm(!showServiceForm)
}

    return <>{project.name ? ( 
        <div className={styles.project_datails}>
            <Container customClass="colum">
                {message && <Message type={typeMessage} msg={message} />}
            <div className={styles.details_container}>
                <h1>Projeto: {project.name}</h1>
                <button onClick={toogleProjectForm} className={styles.btn}> 
                    {!showProjectForm ? 'Editar Projeto' : 'Fechar'}                  
                </button>

                {!showProjectForm ? (
                <div className={styles.project_info}>
                 <p>
                <span>Categoria: </span> {project.category.name}
                 </p>
                 <p>
                 <span>Total Orçamento:</span> R${project.budget}
                 </p>
                 <p>
                 <span>Total Ultilizado:</span> R${project.cost}
                 </p>
                </div>
                ) :(
                    <div className={styles.project_info}>
                        <ProjectForm 
                        handleSubmit={editPost}
                         btnText="Concluir edição" 
                         projectData={project}/>
                   </div>
                )}
            </div>
            <div className={styles.service_form_container}>
                <h2>Adicione um Serviço:</h2>
                <button onClick={toogleServiceForm} className={styles.btn}>
                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}   
                </button> 

                <div className={styles.project_info}>

                    {showServiceForm && <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}  
                  /> }
                </div>    
            </div>
            <h2>Serviço</h2>
            <Container customClass="start">
                {services.length > 0 &&
                  services.map((service) => (
                    <ServiceCard
                      id={service.id}
                      name={service.name}
                      cost={service.cost}
                      description={service.description}
                      key={service.id}
                      handleRemove={removeService}
                    />                    
                  ))
                }
                {services.length === 0 && <p>Não há Serviços cadastrados.</p>

                }
            </Container>
            </Container>
        </div>)
        
        : (<Loading/>)}</>
}

export default Project