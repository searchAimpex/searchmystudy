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
    // Update word count when the value changes
    const text = editorRef.current.getEditor().getText();
    setWordCount(countWords(text));
  }, [value]);

  const handleChange = (content) => {
    // Delay processing to optimize performance
    debounce(() => {
      const cleanContent = cleanHtmlContent(content);
      const currentWordCount = countWords(cleanContent);

      if (currentWordCount <= wordLimit) {
        setValue(cleanContent);
        if (onChange) {
          onChange({ target: { name, value: cleanContent } });
        }
      }
    });
  };

  const debounce = (func, delay = 300) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delay);
  };

  const countWords = (text) => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    return words.length;
  };

  let debounceTimer; // Store timer for debouncing

  const cleanHtmlContent = (html) => {
    // Clean content (strip unwanted <p> tags, empty tags, etc.)
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const body = doc.body;

    // Strip empty <p> tags or other tags you don't want
    const pTags = body.querySelectorAll('p');
    pTags.forEach(p => {
      if (p.innerHTML.trim() === '') {
        p.remove();
      }
    });

    return body.innerHTML.trim();
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
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'link', 'image'
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
