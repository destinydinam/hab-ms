"use client";
import {
  Week,
  Month,
  Agenda,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  EventSettingsModel,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { timelineResourceData } from "./data-source";

const Scheduler = () => {
  const eventSettings: EventSettingsModel = {
    dataSource: timelineResourceData,
  };

  return (
    <>
      <ScheduleComponent
        width="100%"
        height="550px"
        currentView="Month"
        selectedDate={new Date(2018, 3, 4)}
        eventSettings={eventSettings}
      >
        <ViewsDirective>
          <ViewDirective option="Week" />
          <ViewDirective option="Month" />
          <ViewDirective option="Agenda" />
        </ViewsDirective>

        <Inject services={[Week, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </>
  );
};

export default Scheduler;
