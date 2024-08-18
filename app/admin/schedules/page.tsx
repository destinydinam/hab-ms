import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SchedulerTab from "./scheduler";
import SettingsTab from "./settings";

type Props = {};

const SchedulesPage = (props: Props) => {
  return (
    <div className="max-w-screen-2xl mx-auto px-2 md:px-6">
      <Tabs defaultValue="scheduler" className="w-full my-10">
        <TabsList className="grid w-full sm:w-60 grid-cols-2">
          <TabsTrigger value="scheduler">Scheduler</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <br />
        <TabsContent value="scheduler">
          <SchedulerTab />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchedulesPage;
