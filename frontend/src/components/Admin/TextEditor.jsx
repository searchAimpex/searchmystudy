import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const key = "ka8mzmmmtcs34em7olrwjfiwupqzvodf1k8ebj3rj6gmc9qp";

const TextEditor = ({ id, name, label, value, onChange, className }) => {
  const editorRef = useRef(null);

  const handleEditorChange = (content) => {
    onChange({
      target: {
        name,
        value: content, // Pass the updated value back to the parent
      },
    });
  };


  return (
    <div style={{ zIndex: 1 }} className={className}>
      {label && <label htmlFor={id} className="block mb-2 font-medium">{label}</label>}
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey={key}
        init={{
          height: 260,
          menubar: true,
          plugins:
            'advlist autolink lists link image charmap preview anchor ' +
            'searchreplace visualblocks code fullscreen ' +
            'insertdatetime media table code help wordcount',
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }',
        }}
        value={value}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default TextEditor;
