import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const key = "25ay2rt9zs014kay8iepacupp13xjn6kv7dd4t2b6mnx148f";

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