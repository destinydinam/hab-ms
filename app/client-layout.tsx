"use client";

import { registerLicense } from "@syncfusion/ej2-base";

type Props = {};

const ClientLayout = (props: Props) => {
  registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_KEY!);

  return <></>;
};

export default ClientLayout;
