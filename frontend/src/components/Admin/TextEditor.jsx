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
  apiKey="163byk4swq6r7cb7olxy06pn0z4nge2nc1fwiza52a77ay88"
  value={value}
  onEditorChange={handleEditorChange}
  init={{
    height: 260,
    menubar: true,
    plugins: [
      'advlist autolink lists link image charmap preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table code help wordcount',
      'codesample emoticons fontfamily fontsize lineheight'
    ].join(' '),
    toolbar: [
      'undo redo | blocks fontfamily fontsize |',
      'bold italic underline strikethrough backcolor |',
      'alignleft aligncenter alignright alignjustify lineheight |',
      'bullist numlist outdent indent |',
      'link image media table codesample |',
      'emoticons charmap | removeformat | help'
    ].join(' '),
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }',
  }}
/>

    </div>
  );
};

export default TextEditor;
