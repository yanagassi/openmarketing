import React, { useEffect, useRef, useState } from "react";
import EmailEditor from "react-email-editor";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import email from "../../../models/email";
import { toast } from "react-toastify";
import MenuGenerical from "../../../components/MenuGenerical";

const EmailEditorTool = () => {
  const emailEditorRef = useRef(null);
  const [isReady, setReady] = useState(false);
  const { id_email } = useParams();
  const [form, setForm] = useState({ html: "", name: "", design: {} });

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      const responseData = await email.get_email(id_email);
      if (!responseData) {
        window.history.back();
        return;
      }

      setForm(responseData);
      const unlayer = emailEditorRef.current?.editor;
      unlayer?.loadDesign(responseData.design);
    } catch (error) {
      console.error("Error initializing Email Editor:", error);
    }
  }

  async function save(html, design) {
    try {
      await email.update_email(id_email, { html, design });
      toast.success("Email salvo com sucesso.");
    } catch (error) {
      toast.error(
        "Não foi possivel salvar as alterações no email, tente novamente."
      );
    }
  }

  const saveEmail = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      save(html, design);
    });
  };

  const onReady = () => {
    setReady(true);
  };

  return (
    <>
      <MenuGenerical title={form.name} onSave={() => saveEmail()} />

      <EmailEditor
        style={{
          height: "calc(100vh - 60px)",
          overflowY: "hidden",
          marginTop: 40,
        }}
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
    </>
  );
};

export default EmailEditorTool;
