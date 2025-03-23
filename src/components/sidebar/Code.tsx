import React from "react";
import { Prism as SyntaxHighlighterBase } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const SyntaxHighlighter = SyntaxHighlighterBase as unknown as React.FC<any>;

export default function Code({ code }: { code: string }) {
  return (
    <SyntaxHighlighter
      language="javascript"
      style={vscDarkPlus}
      customStyle={{
        borderRadius: 8,
        flexShrink: 0,
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
