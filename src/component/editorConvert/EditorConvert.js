import React from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './editor.css';
import { Input } from 'antd';

const { TextArea } = Input;

class EditorConvert extends React.Component {
    state = {
        editorState: EditorState.createEmpty(),
        editContent: '',
    }

      onEditorStateChange (editorState) {
        this.setState({
          editorState,
        });
        // console.log(editorState)
        let editContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        this.setState({
            editContent
        },this.props.editContentChange(editContent));
      };

    render () {
        return (
            <Editor
                editorState={this.state.editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(editorState)=>this.onEditorStateChange(editorState)}
            />
        )
    }
}
export default EditorConvert;