import {
  Week,
  Month,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Inject,
  Resize,
  EventRenderedArgs,
} from "@syncfusion/ej2-react-schedule";
import { ScheduleSlot, Slot } from "@/types/type";
import { scheduleStatuses } from "@/lib/utils";
import { useState } from "react";
import SlotPopup from "./slot-popup";
import { SelectAppointmentFormFields } from "@/db/schema";

type Props = {
  slots: Slot[];
  hospitalId: string;
  appointmentFormFields: SelectAppointmentFormFields[];
  appointmentDuration: string;
  doctorSpecialty: string;
};

const Scheduler = ({
  slots,
  hospitalId,
  appointmentFormFields,
  appointmentDuration,
  doctorSpecialty,
}: Props) => {
  const dataSource = slots.map((slot, i) => ({
    Id: i,
    StartTime: new Date(slot.date.toLocaleDateString() + " " + slot.startTime),
    EndTime: new Date(slot.date.toLocaleDateString() + " " + slot.endTime),
    IsReadonly: true,
    Subject: slot.startTime + "-" + slot.endTime + " " + slot.status,
    Color: scheduleStatuses.find((s) => s.value === slot.status)?.color,
    ...slot,
  }));

  const [slot, setSlot] = useState<ScheduleSlot>();
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

  const handleEventClick = (args: any) => {
    console.log("handleEventClick ~ args:", args);
    args.cancel = true;
    setOpen(true);
    setSlot(args.event);
  };

  const eventTemplate = (props: any) => {
    return (
      <div className="capitalize text-[10px] text-wrap m:text-xs">
        {props.Subject}
      </div>
    );
  };
  return (
    <>
      <ScheduleComponent
        className="rounded"
        width="100%"
        height="550px"
        currentView="Week"
        selectedDate={
          dataSource[0]?.StartTime > new Date()
            ? dataSource[0].StartTime
            : new Date()
        }
        eventClick={handleEventClick}
        eventRendered={(args: EventRenderedArgs) => {
          args.element.style.background = args.data?.Color;
        }}
        eventSettings={{
          dataSource,
          allowAdding: false,
          allowDeleting: false,
          allowEditing: false,
          template: eventTemplate,
        }}
      >
        <ViewsDirective>
          <ViewDirective option="Week" />
          <ViewDirective option="Month" />
        </ViewsDirective>

        <Inject services={[Week, Month, Resize]} />
      </ScheduleComponent>

      {slot && (
        <SlotPopup
          open={open}
          setOpen={setOpen}
          closeDialog={closeDialog}
          slot={slot}
          hospitalId={hospitalId}
          appointmentDuration={appointmentDuration}
          appointmentFormFields={appointmentFormFields}
          doctorSpecialty={doctorSpecialty}
        />
      )}
    </>
  );
};

export default Scheduler;
