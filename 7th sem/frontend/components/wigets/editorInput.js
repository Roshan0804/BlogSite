import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const EditorInput = ({ changeVal, value }) => {
  const [ready, setReady] = useState(false);

  var editors = useRef(null);

  useEffect(() => {
    setReady(true);
  }, [value]);

  const buttonLists = [
    [
      "undo",
      "redo",
      "font",
      "fontSize",
      "formatBlock",
      "paragraphStyle",
      "blockquote",
      "bold",
      "underline",
      "italic",
      "strike",
      "subscript",
      "superscript",
      "fontColor",
      "hiliteColor",
      "textStyle",
      "removeFormat",
      "outdent",
      "indent",
      "align",
      "horizontalRule",
      "list",
      "lineHeight",
      "table",
      "link",
      "image",
      "video",
      "fullScreen",
      "showBlocks",
      "codeView",
      "preview",
      "print",
      "save",
    ],
  ];
  return useMemo(
    () =>
      ready ? (
        <div className="mt-5">
          <p className="font-bold mb-2"> Description </p>
          <SunEditor
            ref={editors}
            setOptions={{ buttonList: buttonLists }}
            defaultValue={value}
            onChange={(val) => changeVal(val)}
          />
        </div>
      ) : (
        "Please wait..."
      ),
    [changeVal]
  );
};
export default EditorInput;

// return useMemo(
//   () => (
//     <SunEditor
//       ref={editors}
//       enable={true}
//       setContents={content || defaultValue}
//       setOptions={{ buttonList: buttonLists }}
//       onChange={(content) => onChange(content)}
//     />
//   ),
//   [content, defaultValue]
// );
