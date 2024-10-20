/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as DmnEditor from "@ibm/bamoe-standalone-dmn-editor/dist";
import { initFileLoader } from "../../fileLoader";

declare global {
  interface Window { editor: DmnEditor.DmnEditorStandaloneApi; }
}

document.addEventListener("DOMContentLoaded", function () {
  loadEditor();
});

function loadEditor() {
  // Loads the DMN Editor in the `<div id="dmn-editor-container" />` element.
  // Initializes with an empty file called `newModel.dmn` on the root of the
  // workspace.
  window.editor = DmnEditor.open({
    container: document.getElementById("dmn-editor-container")!,
    initialFileNormalizedPosixPathRelativeToTheWorkspaceRoot: "newModel.dmn",
    initialContent: Promise.resolve(``),
    readOnly: false,
  });

  // Undo button: Calls the `undo` method from the Editor API.
  // Will undo the last action (moving a node, renaming a node, adding an edge, etc).
  document.getElementById("undo")?.addEventListener("click", () => {
    window.editor.undo();
  });

  // Undo button: Calls the `redo` method from the Editor API.
  // Useful after an undo, will redo the last action undone action.
  document.getElementById("redo")?.addEventListener("click", () => {
    window.editor.redo();
  });

  // Download button: Calls the `getContent` method from the Editor API
  // and then starts a download of a .dmn file with the string contents
  // of the underlying XML for the current Decision.
  // In the end, marks the content as saved via `markAsSaved`.
  document.getElementById("download")?.addEventListener("click", () => {
    window.editor.getContent().then((content) => {
      const elem = window.document.createElement("a");
      elem.href = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
      elem.download = "model.dmn";
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
      window.editor.markAsSaved();
    });
  });

  // Download button: Calls the `getPreview` method from the Editor API
  // and then starts a download of a .svg file with the diagram generated
  // for the current Decision.
  document.getElementById("downloadSvg")?.addEventListener("click", () => {
    window.editor.getPreview().then((svgContent) => {
      if (!svgContent) {
        return;
      }
      const elem = window.document.createElement("a");
      elem.href = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgContent);
      elem.download = "model.svg";
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    });
  });

  // Listens to the `contentChange` notification.
  // Useful for checking if a model has changed and needs to be saved, for example.
  window.editor.subscribeToContentChanges((isDirty) => {
    if (isDirty) {
      document.getElementById("unsavedChanges")?.classList.remove("hidden");
    } else {
      document.getElementById("unsavedChanges")?.classList.add("hidden");
    }
  });

  initFileLoader(["empty.dmn", "empty-drd.dmn", "find-employees.dmn", "loan-pre-qualification.dmn"], window.editor);


  // File upload
  const uploadButton = document.getElementById("fileUpload");

  uploadButton?.addEventListener("change", (fileUploadEvent) => {
    let reader;
    const files = (fileUploadEvent.target as HTMLInputElement).files;
    if (files && files[0]) {
      reader = new FileReader();
      reader.onload = (fileReadEvent) => {
        if (typeof fileReadEvent.target?.result === "string") {
          window.editor.setContent(files[0].name, fileReadEvent.target.result);
        }
      };
      reader.readAsText(files[0]);
    }
  });

  console.log({ editor: window.editor });
}
