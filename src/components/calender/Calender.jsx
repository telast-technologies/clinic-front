/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Header from "../Header";
import Sidebar from "../Sidebar";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { DatePicker } from "antd";

const Calender = () => {
  const [menu, setMenu] = useState(false);
  const onChange = (date, dateString) => {
    // console.log(date, dateString);
  };

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };
  const [startDate, setDate] = useState(new Date()),
    [showCategory, setshowCategory] = useState(false),
    [showmodel, setshowmodel] = useState(false),
    [showEvents, setshowEvents] = useState(false),
    [show, setshow] = useState(false),
    [iseditdelete, setiseditdelete] = useState(false),
    [addneweventobj, setaddneweventobj] = useState(null),
    [isnewevent, setisnewevent] = useState(false),
    [event_title, setevent_title] = useState(""),
    [category_color, setcategory_color] = useState(""),
    [calenderevent, setcalenderevent] = useState(""),
    [weekendsVisible, setweekendsVisible] = useState(true),
    [currentEvents, setscurrentEvents] = useState([]),
    defaultEvents = [
      {
        title: "Event Name 4",
        start: Date.now() + 148000000,
        className: "bg-purple",
      },
      {
        title: "Test Event 1",
        start: Date.now(),
        end: Date.now(),
        className: "bg-success",
      },
      {
        title: "Test Event 2",
        start: Date.now() + 168000000,
        className: "bg-info",
      },
      {
        title: "Test Event 3",
        start: Date.now() + 338000000,
        className: "bg-primary",
      },
    ];
  useEffect(() => {
    let elements = Array.from(
      document.getElementsByClassName("react-datepicker-wrapper")
    );
    elements.map((element) => element.classList.add("width-100"));
  }, []);

  const handleChange = (date) => {
    setDate(date);
  };
  const addEvent = () => {
    setshowEvents(true);
  };
  const categoryHandler = () => {
    setshowCategory(true);
  };

  const handleClose = () => {
    setisnewevent(false);
    setiseditdelete(false);
    setshow(false);
    setshowCategory(false);
    setshowEvents(false);
    setshowmodel(false);
  };

  const handleEventClick = (clickInfo) => {
    setiseditdelete(false);
    setevent_title(clickInfo.event.title);
    setcalenderevent(clickInfo.event);
  };

  const handleDateSelect = (selectInfo) => {
    setisnewevent(true);
    setaddneweventobj(selectInfo);
  };
  const addnewevent = () => {
    let calendarApi = addneweventobj.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (event_title) {
      calendarApi.addEvent({
        id: 10,
        title: event_title,
        className: category_color,
        start: addneweventobj.startStr,
        end: addneweventobj.endStr,
        allDay: addneweventobj.allDay,
      });
    }
    setisnewevent(false);
  };

  const onupdateModalClose = () => {
    setiseditdelete(false);
    setevent_title("");
  };
  const oncreateeventModalClose = () => {
    setevent_title("");
    setisnewevent(false);
  };
  const removeevent = () => {
    calenderevent.remove();
    setiseditdelete(false);
  };
  const clickupdateevent = () => {
    const newArray = defaultEvents;
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].id === parseInt(calenderevent.id)) {
        newArray[i].title = event_title;
      }
    }
    defaultEvents = newArray;
    setiseditdelete(false);
  };

  const handleClick = () => {
    setshow(true);
  };
  // console.log("showmodel", showmodel);

  return (
    <>
      {/* /Page Header */}
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-body">
              <div id="calendar">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  initialView="dayGridMonth"
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  weekends={weekendsVisible}
                  initialEvents={defaultEvents} // alternatively, use the `events` setting to fetch from a feed
                  select={handleDateSelect}
                  eventClick={(clickInfo) => handleEventClick(clickInfo)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Event Modal */}

      {/* /Add Event Modal */}

      {/* /Main Wrapper */}
    </>
  );
};

export default Calender;
