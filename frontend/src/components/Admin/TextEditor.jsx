import React, { useRef, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ id, name, label, onChange, className, value: propValue }) => {
  const editorRef = useRef(null);
  const [value, setValue] = useState(propValue || '');

  useEffect(() => {
    setValue(propValue || '');
  }, [propValue]);

  const handleChange = (content) => {
    setValue(content);
    if (onChange) {
      onChange({ target: { name, value: content } });
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
  ];

  return (
    <div style={{ zIndex: 1 }} className={className}>
      {label && <label htmlFor={id} className="block mb-2 font-medium">{label}</label>}
      <ReactQuill
        ref={editorRef}
        id={id}
        theme="snow"
        value={value}
        onChange={handleChange}
        placeholder="Write something amazing..."
        modules={modules}
        formats={formats}
        style={{ height: '260px', marginBottom: '20px' }}
      />
    </div>
  );
};

export default TextEditor;
