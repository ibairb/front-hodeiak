import './Tasks.scss'
import React, { useEffect, useState } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import ModalTask from '../Modal/ModalTask'

export default function DemoApp() {
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([])
  const [projects, setProjects] = useState([])
  const [modalOpen, setModalOpen] = useState(false)


  useEffect(() => {
    fetch('http://localhost:8000/tasks')
      .then(response => response.json())
      .then(data => {
        data.id = createEventId()
        setProjects([...data, ...INITIAL_EVENTS])
      });
  }, [])

  function handleDateSelect(event) {
    console.log(event.username)
    setModalOpen(true)
    // let title
    // let calendarApi = selectInfo.view.calendar

    // calendarApi.unselect() // clear date selection

    // if (title) {
    //   let obj = {
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   }
    //   calendarApi.addEvent(obj)

    //   addProyect(obj)
    // }
  }

  function handleEventClick(clickInfo) {
    let confirm = prompt('write "confirm" to delete the event').toLowerCase()
    
    if (confirm === "confirm"){
      console.log(clickInfo.event._def)
      deleteProyect(clickInfo.event._def.title)
      // alert('elemento eliminado')
      
      clickInfo.event.remove()
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events)
  }

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible)
  }

  function addProyect(obj) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch('http://localhost:8000/tasks', requestOptions)
      .then(response => response.json())
      .then(data => console.log());
  }
  
  function deleteProyect(title) {
    console.log(title)
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title:title})
    };
    fetch('http://localhost:8000/tasks', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  return (

    <div className='demo-app'>
      {<RenderSidebar handleWeekendsToggle={handleWeekendsToggle} currentEvents={currentEvents} weekendsVisible={weekendsVisible} />}
      <div className='demo-app-main'>
        <div className='modal' style={{
          display: 'flex',
          justifyContent: 'center',
          zIndex: '999',
          width: '100%',
        }}>
          {modalOpen && <ModalTask setOpenModal={setModalOpen} />}
        </div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={projects} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
        */
        />
      </div>
    </div>
  )
}

function RenderSidebar({ handleWeekendsToggle, weekendsVisible }) {
  return (
    <div className='demo-app-sidebar'>
      <div className='demo-app-sidebar-section'>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div className='demo-app-sidebar-section'>
        <label>
          <input
            type='checkbox'
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          ></input>
          toggle weekends
        </label>
      </div>
    </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}