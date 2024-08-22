"use server";

import { authUser } from "@/app/auth/actions";
import AppointmentConfirmationEmail from "@/components/emails/appointment-confirmation-email";
import { urls } from "@/lib/utils";
import { ScheduleSlot } from "@/types/type";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL!;

const resend = new Resend(process.env.RESEND_API_KEY!);

export const bookSlot = async ({
  formInputs,
  slot,
  hospitalId,
}: {
  formInputs: { label: string; value: string }[];
  slot: ScheduleSlot;
  hospitalId: string;
}) => {
  const errorMsg =
    "Failed to send email. Please contact hospital to report this issue.";

  try {
    const hospital = await authUser(hospitalId);

    const formEmail = formInputs.find((f) => f.label === "Email")?.value || "";
    const formFullname =
      formInputs.find((f) => f.label === "Full Name")?.value || "";

    if (!hospital) return { success: false, message: "no hospital found" };

    const { data, error } = await resend.emails.send({
      from: `${hospital.hospitalName} <${SENDER_EMAIL}>`,
      to: [SENDER_EMAIL, hospital.email, formEmail],
      subject: `Appointment Confirmation for ${formFullname} at ${hospital.hospitalName} on `,
      react: AppointmentConfirmationEmail({
        formInputs,
        hospitalLogo: hospital.hospitalLogo || "",
        hospitalName: hospital.hospitalName,
        hospitalLocation: hospital.address,
        formEmail,
        formFullname,
        slot,
      }),
    });

    if (!error) {
      revalidatePath(
        process.env.NEXT_PUBLIC_APP_URL +
          urls.public["schedule-appointment"] +
          "/" +
          hospitalId
      );

      return {
        success: true,
        message:
          "Thanks for Booking an appointment, Please check your email for more information.",
      };
    } else return { success: false, message: errorMsg };
  } catch (error) {
    return { success: false, message: errorMsg };
  }
};
