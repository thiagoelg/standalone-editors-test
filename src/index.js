import _ from 'lodash';
import * as BpmnEditor from "@ibm/bamoe-standalone-bpmn-and-dmn-editors-classic/dist/bpmn";
import * as DmnEditor from "@ibm/bamoe-standalone-bpmn-and-dmn-editors-classic/dist/dmn";
import * as NewDmnEditor from "@ibm/bamoe-standalone-dmn-editor/dist";

document.addEventListener("DOMContentLoaded", function(event) {
  let classicBpmnEditor;
  let classicDmnEditor;
  let newDmnEditor;

  function closeEditors() {
    classicBpmnEditor?.close();
    classicDmnEditor?.close();
    newDmnEditor?.close();

    document.getElementById("classic-bpmn-editor-container").setAttribute("class", "container hidden");
    document.getElementById("classic-dmn-editor-container").setAttribute("class", "container hidden");
    document.getElementById("new-dmn-editor-container").setAttribute("class", "container hidden");
  }

  document.getElementById("load-classic-bpmn-editor").onclick = () => {
    closeEditors();

    document.getElementById("classic-bpmn-editor-container").setAttribute("class", "container");
    classicBpmnEditor = BpmnEditor.open({
      container: document.getElementById("classic-bpmn-editor-container"),
      initialContent: Promise.resolve(""),
      readOnly: false
    });
  };

  document.getElementById("load-classic-dmn-editor").onclick = () => {
    closeEditors();

    document.getElementById("classic-dmn-editor-container").setAttribute("class", "container");
    classicDmnEditor = DmnEditor.open({
      container: document.getElementById("classic-dmn-editor-container"),
      initialContent: Promise.resolve(""),
      readOnly: false
    });
  }

  document.getElementById("load-new-dmn-editor").onclick = () => {
    closeEditors();

    document.getElementById("new-dmn-editor-container").setAttribute("class", "container");
    newDmnEditor = NewDmnEditor.open({
      container: document.getElementById("new-dmn-editor-container"),
      initialContent: Promise.resolve(""),
      readOnly: false
    });
  }
});