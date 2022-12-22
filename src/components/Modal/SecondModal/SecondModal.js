import React, { useState, useEffect } from 'react';
import "../Modal.css";
import { DropDownList } from './DropDownList';
import { DropDownListUser } from './DropDownListUser'

export const SecondModal = ({ setPbi }) => {

    const [project, setProject] = useState(null);
    const [projects, setProjects] = useState(null);
    const [stringProject, setStringProject] = useState(null);

    const [epic, setEpic] = useState(null);
    const [epics, setEpics] = useState(null);
    const [stringEpic, setStringEpics] = useState(null);
    const [projectEpics, setProjectEpics] = useState(null);
    const [selectedEpics, setSelectedEpics] = useState(null);

    const [feature, setFeature] = useState(null);
    const [features, setFeatures] = useState();
    const [selectedFeatures, setSelectedFeatures] = useState(null);
    const [stringFeature, setStringFeatures] = useState(null);

    const [pbis, setPbis] = useState();
    const [selectedPbis, setSelectedPbis] = useState(null);
    const [stringPbi, setStringPbi] = useState(null);

    const [tasks, setTasks] = useState()
    const [data, setData] = useState({})
    const loggedUser = localStorage.getItem('email')
    const status = localStorage.getItem('status')

    useEffect(() => {
        fetchAllTasks()

    }, [])

    useEffect(() => {
        if (stringProject) {
                setProject(projects.filter(e => e.projectname === stringProject)[0])
        }
    }, [stringProject])

    useEffect(() => {
        if (stringEpic) {
            setEpic(epics.filter(e => e.epicname === stringEpic)[0])
        }
    }, [stringEpic])

    useEffect(() => {
        if (stringFeature) {
            setFeature(features.filter(e => e.featurename === stringFeature)[0])
        }
    }, [stringFeature])

    useEffect(() => {
        if (stringPbi) {
            setPbi(pbis.filter(e => e.pbiname === stringPbi)[0])
        }

    }, [stringPbi])

    useEffect(() => {
        if (project) {
            const epicsArray = epics.filter(e => {
                if (project.epics.includes(e.id)) {
                    return e.epicname
                }
            })
            setSelectedEpics(epicsArray)
        }//project

    }, [project])

    useEffect(() => {

        if (epic) {
            const featuresArray = features.filter(e => {
                if (epic.features.includes(e.id)) {
                    return e.featurename
                }
            })
            setSelectedFeatures(featuresArray)

        }//epic

    }, [epic])

    useEffect(() => {

        if (feature) {
            const pbisArray = pbis.filter(e => {

                if (feature.pbis.includes(e.id)) {
                    return e.pbiname
                }
            })
            setSelectedPbis(pbisArray)
        }//feature

    }, [feature])

    const fetchAllTasks = async () => {

        const respProjects = await fetch("http://localhost:8000/projects")
        const projects = await respProjects.json()
        setProjects(projects);
        const respEpics = await fetch("http://localhost:8000/epics")
        const epics = await respEpics.json()
        setEpics(epics);
        const respFeatures = await fetch("http://localhost:8000/features")
        const features = await respFeatures.json()
        setFeatures(features);
        const respPbis = await fetch("http://localhost:8000/pbis")
        const pbis = await respPbis.json()
        setPbis(pbis);
        const respTasks = await fetch("http://localhost:8000/tasks")
        const tasks = await respTasks.json()
        setTasks(tasks);
    }

    return (
        <>
            <div className="contenedorPrincipal" >
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'flex-start',
                    align: "center",
                    marginTop: "1.2em",
                    justifyContent: 'center',
                    zIndex: "1000",
                    textAlign: "center"
                }}>
                    {projects && <DropDownList list={projects} setValue={setStringProject} string={"projects"} />}
                    {selectedEpics && <DropDownList list={selectedEpics} setValue={setStringEpics} string={"epics"} />}
                    {selectedFeatures && <DropDownList list={selectedFeatures} setValue={setStringFeatures} string={"features"} />}
                    {selectedPbis && <DropDownList list={selectedPbis} setValue={setStringPbi} string={"pbis"} />}
                </div>
            </div>
        </>)
}

