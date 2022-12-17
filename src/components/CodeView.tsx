import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeView({code}: {code: string}) {
  return (
    <SyntaxHighlighter language="javascript" style={dark}>
      {code}
    </SyntaxHighlighter>
  );
}
