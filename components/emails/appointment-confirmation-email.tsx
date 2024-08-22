import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Img,
  Hr,
} from "@react-email/components";
import { ScheduleSlot } from "@/types/type";

type Props = {
  hospitalLogo: string;
  hospitalName: string;
  hospitalLocation: string;
  duration: string;
  doctorSpecialty: string;
  formInputs: { label: string; value: string }[];
  formFullname: string;
  slot: ScheduleSlot;
};

const habms =
  "https://hab-ms.matchmatchapi.com/_next/image?url=%2Flogo.png&w=1080&q=75";

const AppointmentConfirmationEmail = ({
  formInputs,
  hospitalLogo,
  hospitalName,
  hospitalLocation,
  formFullname,
  slot,
  duration,
  doctorSpecialty,
}: Props) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Img
          src={hospitalLogo || habms}
          alt={hospitalName}
          width="100"
          height="100"
          style={logoStyle}
        />

        <Heading style={heading}>Appointment Confirmation</Heading>

        <Text>Dear {formFullname},</Text>
        <Text>
          We are pleased to confirm your upcoming appointment at {hospitalName}.
          Please review the details below:
        </Text>
        <Text>Date: {slot.StartTime.toDateString()}</Text>
        <Text>Time: {getTime(slot.StartTime)} </Text>
        <Text>Location: {hospitalLocation}</Text>
        <Text>Service: {doctorSpecialty}</Text>
        <Text>Duration: {duration}</Text>

        {formInputs.map((input, i) => (
          <Text key={i}>
            {input.label}: {input.value}
          </Text>
        ))}

        <Hr style={hr} />

        <Heading style={subheading}>Before your appointment:</Heading>
        {/* <Text>Please complete the enclosed patient registration form.</Text> */}
        <Text>Bring your ID and insurance card.</Text>
        <Text>Arrive 10 minutes early to allow time for check-in.</Text>

        <Text>
          If you need to cancel or reschedule, please call us at [Clinic Phone
          Number] at least 24 hours before your appointment.
        </Text>

        <Text>
          Please don&apos;t hesitate to reach out if you have any questions or
          concerns. We look forward to seeing you.
        </Text>

        <Text>Sincerely,</Text>
        <Text>{hospitalName}</Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: "Arial, sans-serif",
  padding: "20px",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "20px",
  maxWidth: "600px",
  margin: "0 auto",
};

const heading = {
  fontSize: "24px",
  color: "#333333",
  marginBottom: "20px",
};

const subheading = {
  fontSize: "18px",
  color: "#333333",
  marginTop: "20px",
  marginBottom: "10px",
};

const hr = {
  border: "none",
  borderTop: "1px solid #dddddd",
  margin: "20px 0",
};

const logoStyle = {
  display: "block",
  margin: "0 auto 20px", // Center the logo and add some margin below it
};

export default AppointmentConfirmationEmail;

const getTime = (date: Date) => {
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  // @ts-ignore
  return date.toLocaleTimeString("en-US", options);
};
