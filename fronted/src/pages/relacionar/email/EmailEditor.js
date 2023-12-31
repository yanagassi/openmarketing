import React, { useEffect, useRef, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { useParams } from "react-router-dom";

const EmailEditorTool = (props) => {
  const emailEditorRef = useRef(null);
  const [ready, setOnRead] = useState(false);
  const { id_email } = useParams();
  const [form, setForm] = useState({ html: "", name: "" });

  useEffect(() => {
    console.log(id_email);
  }, []);

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);
    });
  };

  const onReady = (unlayer) => {
    setOnRead(true);
  };

  return (
    <EmailEditor
      style={{ height: "calc(100vh - 65px)", overflowY: "hidden" }}
      ref={emailEditorRef}
      onReady={onReady}
      onLoad={onReady}
      options={{
        locale: "pt-BR",
        appearance: {
          panels: {
            tools: {
              dock: "left",
            },
          },
        },
      }}
    />
  );
};
export default EmailEditorTool;
