import React from "react";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const Editor = ({ value, onChange, ...props }) => {
  return (
    <SunEditor
      setContents={value}
      onChange={onChange}
      height="300"
      {...props}
    />
  );
};

export default Editor;
