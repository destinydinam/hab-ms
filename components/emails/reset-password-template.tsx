type Props = { user_email: string; pass_reset_link: string };

const ResetPasswordTemplate = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-blue-500">
          HOSPITAL APPOINTMENT BOOKING and MANAGEMENT SYSTEM
        </h1>
      </div>
      <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          Hello! Forgot your password?
        </h2>
        <p className="mb-4">
          We received a password reset request for your account:
          <a href="#" className="text-blue-400">
            {" "}
            {props.user_email}
          </a>
          .
        </p>
        <p className="mb-4">Click the button below to proceed.</p>
        <div className="mb-6">
          <a
            href={props.pass_reset_link}
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            Reset Password
          </a>
        </div>
        <p className="mb-4">
          Or click this link in your browser:
          <a href={props.pass_reset_link} className="text-blue-400 break-words">
            {props.pass_reset_link}
          </a>
        </p>
        <p className="mb-4">
          The password reset link is only valid for the next 24 hours.
        </p>
        <p className="mb-4">
          If you didn&apos;t request the password reset, please ignore this
          message.
        </p>
        <hr className="border-gray-700 my-4" />
        <p className="text-center">Best regards</p>
      </div>
    </div>
  );
};

export default ResetPasswordTemplate;
