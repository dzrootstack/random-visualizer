import React, { createRef, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeView({ code }: { code: string }) {

  return (
    <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{
      borderRadius: 8,
    }}>
      {code}
    </SyntaxHighlighter>
  );
}

