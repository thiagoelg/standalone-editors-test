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
import { loadFile } from "../../fileLoader";

document.addEventListener("DOMContentLoaded", function () {
  loadEditor();
});

function loadEditor() {
  // Loads the DMN Editor in the `<div id="dmn-editor-container" />` element.
  // Initializes with an existing file called `loan-pre-qualification.dmn` on the root of the
  // workspace.
  // The `loadFile` function loads the file from the /static/models directory and returns
  // a Promise that resolves into a string.
  // The `readOnly` flag changes the editor, locking all changes to the model, making it
  // useful for displaying diagrams without editing the Decision.
  const editor = DmnEditor.open({
    container: document.getElementById("dmn-editor-container")!,
    initialFileNormalizedPosixPathRelativeToTheWorkspaceRoot: "loan-pre-qualification.dmn",
    initialContent: loadFile("loan-pre-qualification.dmn"),
    readOnly: true,
  });

  console.log({ editor });
}
