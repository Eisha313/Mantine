import React, { useState } from 'react';

const TextEditor = ({ onConvert }) => {
  const [inputContent, setInputContent] = useState('');

  const handleInputChange = (event) => {
    setInputContent(event.target.value);
  };

  return (
    <div>
      <textarea
        value={inputContent}
        onChange={handleInputChange}
        rows={10}
        cols={50}
      />
      <button onClick={() => onConvert(inputContent)}>Convert</button>
    </div>
  );
};

const DisplayConvertedHTML = ({ convertedHTML }) => {
  return <div dangerouslySetInnerHTML={{ __html: convertedHTML }} />;
};

const Reactrender = () => {
  const [convertedHTML, setConvertedHTML] = useState('');

  const convertToHTML = (inputHTML) => {
    setConvertedHTML(inputHTML);
  };

  return (
    <div>
      <h1>HTML Content Converter</h1>
      <TextEditor onConvert={convertToHTML} />
      <h2>Converted Content</h2>
      <DisplayConvertedHTML convertedHTML={convertedHTML} />
    </div>
  );
};

export default Reactrender;