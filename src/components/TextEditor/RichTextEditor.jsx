import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./RichTextEditor.module.css";

const RichTextEditor = ({ content, setContent }) => {
  const [editorState, setEditorState] = useState(() => {
    if (content.length > 0) {
      const options = {
        customInlineFn: (element, { Style }) => {
          if (element.style.color) {
            return Style("color-" + element.style.color);
          }
        },
      };
      let contentState = stateFromHTML(content, options);
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });

  const handleEditorChange = (state) => {
    setEditorState(state);
    console.log(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let options = {
      inlineStyleFn: (styles) => {
        let elementStyle = {};
        let key = "color-";
        let color = styles.filter((value) => value.startsWith(key)).first();
        if (color) {
          elementStyle.color = color.replace(key, "");
        }
        return {
          element: "span",
          style: elementStyle,
        };
      },
    };
    let html = stateToHTML(editorState.getCurrentContent(), options);
    setContent(html.replaceAll("&nbsp;", " "));
  };
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorChange}
      wrapperClassName={styles.wrapperClass}
      editorClassName={styles.editorClass}
      toolbarClassName={styles.toolbarClass}
      toolbar={{
        options: ["inline", "blockType", "list", "colorPicker", "link"],
        inline: {
          inDropdown: false,
          options: ["bold", "italic", "underline"],
        },
        blockType: {
          inDropdown: true,
          options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6"],
          list: {
            inDropdown: false,
            options: ["unordered", "ordered"],
            className: styles.inlineStyle,
          },
        },
      }}
    />
  );
};
export default RichTextEditor;
