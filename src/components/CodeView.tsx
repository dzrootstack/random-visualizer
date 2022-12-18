import React, { createRef, useEffect, useState } from "react";
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

export default function CodeView({code}: {code: string}) {
  const [codeRef] = useState(createRef<HTMLPreElement>)
  
  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
  }, []);
  
  // display the code with syntax highlighting using highlight.js
  useEffect(() => {
    codeRef && codeRef.current && hljs.highlightElement(codeRef.current);
  }
  , [codeRef]);

  return (
    <pre ref={codeRef}>
      <code className="javascript">
        {code}
      </code>
    </pre>
  );
}

