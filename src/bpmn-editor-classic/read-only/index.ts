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

import * as BpmnEditor from "@ibm/bamoe-standalone-bpmn-and-dmn-editors-classic/dist/bpmn";
import { loadFile } from "../../fileLoader";

document.addEventListener("DOMContentLoaded", function () {
  loadEditor();
});

function loadEditor() {
  // Loads the BPMN Editor in the `<div id="bpmn-editor-container" />` element.
  // Initializes with an existing file called `hiring.bpmn` on the root of the
  // workspace.
  // The `loadFile` function loads the file from the /static/models directory and returns
  // a Promise that resolves into a string.
  // The `readOnly` flag changes the editor, locking all changes to the model, making it
  // useful for displaying diagrams without editing the Process.
  const editor = BpmnEditor.open({
    container: document.getElementById("bpmn-editor-container")!,
    initialContent: loadFile("hiring.bpmn"),
    readOnly: true,
  });

  console.log({ editor });
}
