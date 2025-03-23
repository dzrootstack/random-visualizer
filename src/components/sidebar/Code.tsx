import React from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";

// Register language manually if using PrismLight
SyntaxHighlighter.registerLanguage("jsx", jsx);

export default function Code({ code }: { code: string }) {
  return (
    <SyntaxHighlighter
      language="jsx"
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
