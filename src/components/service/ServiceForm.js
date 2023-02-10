import styles from '../project/Project.module.css'
import {useState} from 'react'
import Input from '../form/MyInput'
import Submit from '../form/SubmitButton'

function ServiceForm({handleSubmit ,btnText,projectData}){

    const [service, setService] = useState({})

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)

    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

    return(

        <form onSubmit={submit} className={styles.form}>
            <Input
             type="text"
             text="Nome do Serviço"
             name="name"
             placeholder="Insira o nome do serviço."
             handleOnChange={handleChange}             
            />

            <Input
             type="number"
             text="Custo do serviço"
             name="cost"
             placeholder="Insira o custo do serviço"
             handleOnChange={handleChange}             
            />

            <Input
             type="text"
             text="Descrição do serviço."
             name="description"
             placeholder="Insira a descrição do serviço"
             handleOnChange={handleChange}             
            />
            <Submit text={btnText}/>
        </form>
    )
}

export default ServiceForm