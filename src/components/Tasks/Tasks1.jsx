import './Tasks.scss'
import React, { useEffect, useState } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'

export default function DemoApp() {
  const[weekendsVisible, setWeekendsVisible] = useState(true)
  const[currentEvents, setCurrentEvents] = useState([])
  const[projects, setProjects] = useState([])


  useEffect(() => {
    fetch('http://localhost:8000/projects')
      .then(response => response.json())
      .then(data => {
        data.id = createEventId()
        setProjects([...data, ...INITIAL_EVENTS])
      });
  }, [])

  function handleDateSelect(selectInfo){
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar
  
    calendarApi.unselect() // clear date selection
  
    if (title) {
      let obj = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      }
      calendarApi.addEvent(obj)
      
      addProyect(obj)
    }
  }
  
  function handleEventClick(clickInfo){
    // let confirm = prompt('write "confirm" to delete the event').toLowerCase()
    if (clickInfo.event){
      alert('elemento eliminado')
      clickInfo.event.remove()
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events) 
  }

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible) 
  }

  return (
    <div className='demo-app'>
      {<RenderSidebar handleWeekendsToggle={handleWeekendsToggle} currentEvents={currentEvents} weekendsVisible={weekendsVisible}/>}
      <div className='demo-app-main'>
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

function addProyect(obj) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  };
  fetch('http://localhost:8000/projects/create', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data));
}

function RenderSidebar({handleWeekendsToggle, currentEvents, weekendsVisible}) {
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
      <div className='demo-app-sidebar-section'>
        <h2>All Events ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map(renderSidebarEvent)}
        </ul>
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

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  )
}