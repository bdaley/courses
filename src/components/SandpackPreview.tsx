import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview as SandpackPreviewPanel,
  defaultDark,
  defaultLight,
} from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";

interface Props {
  html?: string;
  css?: string;
  externalResources?: string[];
}

export default function SandpackPreview({ html, css, externalResources }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const el = document.documentElement;
    const update = () =>
      setTheme(el.dataset.theme === "dark" ? "dark" : "light");
    update();
    const observer = new MutationObserver(() => update());
    observer.observe(el, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const files: Record<string, string> = {};

  if (html) {
    files["/index.html"] = html;
  } else if (css) {
    files["/index.html"] = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="styles.css" />
  <title>Preview</title>
</head>
<body>
  <p>Edit the CSS to see changes</p>
</body>
</html>`;
  }

  if (css) files["/styles.css"] = css;

  return (
    <div className="not-content">
      <SandpackProvider
        template="static"
        files={files}
        options={externalResources ? { externalResources } : undefined}
        theme={theme === "dark" ? defaultDark : defaultLight}
      >
        <SandpackCodeEditor
          showLineNumbers
          showInlineErrors
          closableTabs={false}
        />
        <SandpackPreviewPanel />
      </SandpackProvider>
    </div>
  );
}
