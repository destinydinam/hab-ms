import { authUser } from "@/app/auth/actions";

type Props = {
  params: { hospitalId: string };
};

const ScheduleAppointmentPage = async ({ params: { hospitalId } }: Props) => {
  if (!hospitalId)
    return (
      <div className="text-3xl text-center my-10">
        Invalid hospital ID. Please provide a valid hospital ID.
      </div>
    );

  const user = await authUser(hospitalId);

  if (!user)
    return (
      <div className="text-3xl text-center my-10">
        Invalid hospital ID. Please provide a valid hospital ID.
      </div>
    );

  return (
    <div>
      <h2 className="text-3xl text-center my-10">Still Under Construction</h2>
      <h2 className="text-3xl text-center ">{user.hospitalName}</h2>
    </div>
  );
};

export default ScheduleAppointmentPage;
