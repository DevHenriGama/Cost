import MyInput from '../form/MyInput'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import {useEffect, useState} from 'react'

import styles from './Project.module.css'

function ProjectForm({handleSubmit,btnText, projectData}) {

    const [project, setProject] = useState(projectData || {})
    const [categories, SetCategories] = useState([])
  useEffect(() => {
    
    fetch("http://localhost:5000/categories", {

    method:"GET",
    headers: {
     'content-Type' : 'application/json',   
    },
    }).then((resp) => resp.json())
    .then((data) => {SetCategories(data)})
    .catch((err) => console.log(err))
  },[])

  const submit =  (e) => {
    e.preventDefault()
    handleSubmit(project)
  }

  function handleChange(e){
    setProject({ ...project,[e.target.name]: e.target.value })

  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    })
  }
    return(
            <form onSubmit={submit} className={styles.form}>
                <MyInput 
                type="text" 
                text="Nome do Projeto" 
                name="name" placeholder="Insiara o Nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
                />
                <MyInput 
                type="number" 
                text="Orçamento do Projeto" 
                name="budget" placeholder="Insiara o Orçamento"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
                />
                <Select 
                name="category_id" 
                text="Selecione a Categoria" 
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
                />
                <SubmitButton text={btnText}/>
            </form>
    )
}

export default ProjectForm