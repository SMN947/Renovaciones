import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Editor, EditorTools, EditorUtils } from '@progress/kendo-react-editor';
const {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Indent,
    Outdent,
    OrderedList,
    UnorderedList,
    Undo,
    Redo,
    FontSize,
    FontName,
    FormatBlock,
    Link,
    Unlink,
    ForeColor,
    BackColor,
} = EditorTools;

export const MultilineInput = ({ editorContent, editorRef, setting }) => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    console.log(editorRef);
    console.log(setting)
    if (editorRef.current) {
        const view = editorRef.current.view;
        EditorUtils.setHtml(view, editorContent)
    }
    return (
        <>
            <label htmlFor={setting.id}>{setting.label}:</label>
            <Editor
                tools={[
                    [Undo, Redo],
                    [Bold, Italic, Underline, Strikethrough],
                    [ForeColor, BackColor],
                    [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                    [Indent, Outdent],
                    [OrderedList, UnorderedList],
                    FontSize,
                    FontName,
                    FormatBlock,
                    [Link, Unlink],
                ]}
                contentStyle={{
                    height: 150,
                }}
                defaultContent={editorContent}
                ref={editorRef}
            />
        </>
    )
}