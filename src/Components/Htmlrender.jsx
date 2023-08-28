import React from 'react';

const Htmlrender = ({ htmlContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default Htmlrender;