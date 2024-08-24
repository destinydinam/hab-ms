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
import { Slot } from "@/types/type";
import { scheduleStatuses } from "@/lib/utils";

type Props = { slots: Slot[] };

const Scheduler = ({ slots }: Props) => {
  const dataSource = slots.map((slot, i) => ({
    Id: i,
    StartTime: new Date(slot.date.toLocaleDateString() + " " + slot.startTime),
    EndTime: new Date(slot.date.toLocaleDateString() + " " + slot.endTime),
    IsReadonly: true,
    Subject: slot.startTime + "-" + slot.endTime + " " + slot.status,
    Color: scheduleStatuses.find((s) => s.value === slot.status)?.color,
  }));

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
    </>
  );
};

export default Scheduler;
