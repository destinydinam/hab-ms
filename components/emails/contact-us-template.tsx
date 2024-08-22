/* eslint-disable @next/next/no-img-element */
import { ContactSchema } from "@/app/zod-schema";
import { CornerDownRight } from "lucide-react";
import { z } from "zod";
import Logo from "@/public/logo/logo1.svg";
import { Html, Body, Heading } from "@react-email/components";

type Props = z.infer<typeof ContactSchema>;

const ContactUsTemplate = (props: Props) => {
  return (
    <Html lang="en">
      <Body style={main}>
        <div style={container}>
          <img
            // src="/logo/logo1.svg"
            // src={Logo}
            src="https://profix-nine.vercel.app/logo/logo1.svg"
            alt="logo"
            width={200}
            height={200}
            style={{
              marginTop: "-20px",
              marginBottom: "-20px",
              marginLeft: "auto",
              marginRight: "auto",
              // maxWidth: "600px",
              // padding: "20px",
              // backgroundColor: "#f7f7f7",
              // borderRadius: "8px",
              // boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.05)",
            }}
            // className="w-40 sm:w-44 -my-20"
          />
          <Heading style={{ ...h1, marginTop: "20px" }}>
            Email from Contact Form on Profix website
          </Heading>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              padding: "20px 0",
            }}
          >
            <div style={div_flex}>
              <CornerDownRight />
              <div style={div_flex}>
                <span style={{ color: "gray" }}>First Name:</span>
                <span>{props.firstName}</span>
              </div>
            </div>
            <div style={div_flex}>
              <CornerDownRight />
              <div style={div_flex}>
                <span style={{ color: "gray" }}>Last Name:</span>
                <span>{props.lastName}</span>
              </div>
            </div>
            <div style={div_flex}>
              <CornerDownRight />
              <div style={div_flex}>
                <span style={{ color: "gray" }}>Address Street 1:</span>
                <span>{props.addressStreet_1}</span>
              </div>
            </div>
            <div style={div_flex}>
              <CornerDownRight />
              <div style={div_flex}>
                <span style={{ color: "gray" }}>Address Street 2:</span>
                <span>{props.addressStreet_2}</span>
              </div>
            </div>
            <div style={div_flex}>
              <CornerDownRight />
              <div style={div_flex}>
                <span style={{ color: "gray" }}>City:</span>
                <span>{props.city}</span>
              </div>
            </div>
            <div style={div_flex}>
              <CornerDownRight />
              <div style={div_flex}>
                <span style={{ color: "gray" }}>State:</span>
                <span>{props.state}</span>
              </div>
            </div>
            <div style={div_flex}>
              <CornerDownRight />
              <div style={div_flex}>
                <span style={{ color: "gray" }}>Zipcode:</span>
                <span>{props.zipcode}</span>
              </div>
            </div>
            <div style={div_flex}>
              <CornerDownRight />
              <div style={div_flex}>
                <span style={{ color: "gray" }}>DayTime Phone:</span>
                <span>{props.dayTimePhone}</span>
              </div>
            </div>
            <div style={div_flex}>
              <CornerDownRight />
              <div style={div_flex}>
                <span style={{ color: "gray" }}>Evening Phone:</span>
                <span>{props.eveningPhone}</span>
              </div>
            </div>
            <div style={div_flex}>
              <CornerDownRight />
              <div style={div_flex}>
                <span style={{ color: "gray" }}>Email:</span>
                <span>{props.email}</span>
              </div>
            </div>
            <div style={div_flex}>
              <CornerDownRight />
              <div style={div_flex}>
                <span style={{ color: "gray" }}>Message:</span>
                <span>{props.message}</span>
              </div>
            </div>
          </div>
        </div>
      </Body>
    </Html>
  );
};

export default ContactUsTemplate;

const main = {
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const div_flex = {
  display: "flex",
  gap: "8px",
};

const container = {
  margin: "auto",
  padding: "10px",
};

const h1 = {
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: "40px",
  margin: "0 0 20px",
};
