import React, { useRef } from "react";
import { Editor as TextEditor } from "@tinymce/tinymce-react";
import $ from "jquery";

declare global {
    interface Window {
        $: any;
        tinymce: any;
    }
}

const jsDemoImagesTransform = document?.createElement("script");
jsDemoImagesTransform.type = "text/javascript";
jsDemoImagesTransform.src = "https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image";
document.head.appendChild(jsDemoImagesTransform);

window.$ = $;
window.tinymce = require("tinymce");

require("@wiris/mathtype-tinymce6");

const Editor = ({ isParent, id, onEditorChange, value, height }: any) => {
    const editorRef: any = useRef(null);

    if (isParent) {
        return (
            <>
                <TextEditor
                    id={id}
                    apiKey="asaevq5vbq6crpxwfcd0aqhu68acp7hiauz8m58or35mu253"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    init={{
                        height: height,
                        menubar: false,
                        external_plugins: {
                            tiny_mce_wiris: `${window.location.href}/node_modules/@wiris/mathtype-tinymce6/plugin.min.js`,
                        },
                        toolbar:
                            "blocks fontfamily fontsize  | undo redo | formatselect | " +
                            "bold italic backcolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist | " +
                            "removeformat | " +
                            "tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        htmlAllowedTags: [".*"],
                        htmlAllowedAttrs: [".*"],
                        extended_valid_elements: "*[.*]",
                    }}
                    onEditorChange={onEditorChange}
                    value={value}
                />
            </>
        );
    }

    return (
        <>
            <TextEditor
                id={id}
                apiKey="asaevq5vbq6crpxwfcd0aqhu68acp7hiauz8m58or35mu253"
                onInit={(evt, editor) => (editorRef.current = editor)}
                disabled={true}
                init={{
                    height: height,
                    width: "100%",
                    menubar: false,
                    toolbar: false,
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    htmlAllowedTags: [".*"],
                    htmlAllowedAttrs: [".*"],
                    extended_valid_elements: "*[.*]",
                }}
                value={value}
            />
        </>
    );
};

export default Editor;
