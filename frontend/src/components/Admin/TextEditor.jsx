import React, { useRef, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ id, name, label, onChange, className, value: propValue }) => {
  const editorRef = useRef(null);
  const [value, setValue] = useState(propValue || '');
  const [wordCount, setWordCount] = useState(0);
  const wordLimit = 200;

  useEffect(() => {
    setValue(propValue || '');
  }, [propValue]);

  useEffect(() => {
    // Update word count whenever the content changes
    const text = editorRef.current.getEditor().getText();
    setWordCount(countWords(text));
  }, [value]);

  const handleChange = (content) => {
    const text = content;
    const currentWordCount = countWords(text);

    // Prevent changes if the word count exceeds the limit
    if (currentWordCount <= wordLimit) {
      setValue(content);
      if (onChange) {
        onChange({ target: { name, value: content } });
      }
    }
  };

  const countWords = (text) => {
    // Remove extra spaces and split the text into words
    const words = text.trim().split(/\s+/).filter(Boolean);
    return words.length;
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
      <div className="text-sm text-gray-600 mt-4">
        Word count: {wordCount} / {wordLimit}
      </div>
    </div>
  );
};

export default TextEditor;
