"use client";

import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

type Props = { url: string };

const Header = ({ url }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <pre className="bg-gray-200 font-bold p-4 rounded-md text-sm font-mono overflow-auto">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {url}
        <CopyToClipboard text={url} onCopy={handleCopy}>
          <pre className="bg-gray-600 cursor-pointer text-white w-fit px-4 py-0.5 rounded-md text-sm font-mono">
            {copied ? "Copied!" : "Copy"}
          </pre>
        </CopyToClipboard>
      </div>
    </pre>
  );
};

export default Header;
