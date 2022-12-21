import { useEffect, useState } from "react"
import DataTable, { defaultThemes } from 'react-data-table-component'
import React from 'react'
import Select from 'react-select'
import "./projects.scss"

const Projects = () => {
    let [modalOpen, setModalOpen] = useState(false)
    let [allTask, setAllTask] = useState(undefined)
    let [projectName, setProjectName] = useState(undefined)
    let [epicName, setEpicName] = useState(undefined)
    let [featureName, setFeatureName] = useState(undefined)
    let [pbiName, setPbiName] = useState(undefined)
    let [taskName, setTaskName] = useState(undefined)

    let [projects, setProjects] = useState([])
    let [epics, setEpics] = useState([])
    let [feature, setFeature] = useState([])
    let [pbi, setPbi] = useState([])
    let [tasks, setTasks] = useState([])

    let [doneStatus, setDoneStatus] = useState("⚫")

    let [flag, setFlag] = useState(false)
    
    let user = localStorage.getItem('email')
    console.log(user)
    function finish() {
        setDoneStatus("🟢")
    }
    function doing() {
        setDoneStatus("🟠")
    }
    useEffect(() => {

    }, [featureName])

    function changeProjectName(e) {
        setProjectName(e.value)
        setEpicName(undefined)
        setFeatureName(undefined)
        setPbiName(undefined)
        setTaskName(undefined)
    }

    function changeEpicName(e) {
        setEpicName(e.value)
        setFeatureName(undefined)
        setPbiName(undefined)
        setTaskName(undefined)
    }

    function changeFeatureName(e) {
        setFeatureName(e.value)
        setPbiName(undefined)
        setTaskName(undefined)
    }
    function changePbiName(e) {
        console.log(e.value)
        setPbiName(e.value)
        setTaskName(undefined)
    }
    function changeTasksName(e) {
        setTaskName(e.value)
    }

    useEffect(() => {
        fetch('http://localhost:8000/projects')
            .then(response => response.json())
            .then((res) => {
                setProjects(res)
            });

        fetch('http://localhost:8000/tasks')
            .then(response => response.json())
            .then((res) => {
                console.log(res)
            });
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8000/projects/${projectName}`)
            .then((res) => res.json())
            .then((res) => {
                setEpics(res.epics)
            })
    }, [projectName])


    useEffect(() => {
        fetch(`http://localhost:8000/epics/${epicName}`)
            .then((res) => res.json())
            .then((res) => {
                setFeature(res.features)
            })
    }, [epicName])

    useEffect(() => {
        fetch(`http://localhost:8000/features/${featureName}`)
            .then((res) => res.json())
            .then((res) => {
                setPbi(res.pbis)
            })
    }, [featureName])

    useEffect(() => {
        console.log(pbiName)
        fetch(`http://localhost:8000/pbis/${pbiName}`)
            .then((res) => res.json())
            .then((res) => {
                setTasks(res.tasks)
            })
    }, [pbiName])

    // useEffect(() => {
    //     const putTaskInPbi = {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(statuss,"doneStatus")
    //     };
    //     fetch(`http://localhost:8000/tasks/${taskName}`,putTaskInPbi)
    //         .then(response => response.json())
    //         .then(data => console.log(data));
    // }, [tasks])


    

    return (
        <>
            <button onClick={finish} id="done">Done</button>
            <button onClick={doing}>doing</button>
            <div id="selects">
                <Select className="item"
                    onChange={changeProjectName} options={projects.length != undefined && projects.length > 0 ? projects.map(element => {
                        return { value: element.projectname, label: element.projectname }
                    }) : ""} />

                {projectName && <Select onChange={changeEpicName} options={
                    epics != undefined && epics.length != undefined && epics.length > 0 ?
                        epics.map(element => {
                            return { value: element, label: element }
                        })
                        : ''
                } />}

                {epicName && <Select onChange={changeFeatureName} options={
                    feature != undefined && feature.length != undefined && feature.length > 0 ? feature.map(element => {
                        return { value: element, label: element }
                    })
                        : ""
                } />}

                {featureName && <Select onChange={changePbiName} options={
                    pbi != undefined && pbi.length != undefined && pbi.length > 0 ? pbi.map(element => {
                        return { value: element, label: element }
                    })
                        : ""
                } />}
                {pbiName && <Select onChange={changeTasksName} options={
                    tasks != undefined && tasks.length != undefined && tasks.length > 0 ? tasks.map(element => {
                       
                        return { value: element, label: element }
                    })
                        : ""
                } />}

            </div>

        </>
    )
}
export default Projects;



