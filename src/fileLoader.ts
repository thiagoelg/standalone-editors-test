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

import { DmnEditorStandaloneApi } from "@ibm/bamoe-standalone-dmn-editor/dist";
import { StandaloneEditorApi as BpmnStandaloneEditorApi } from "@ibm/bamoe-standalone-bpmn-and-dmn-editors-classic/dist/bpmn";
import { StandaloneEditorApi as DmnStandaloneEditorApi } from "@ibm/bamoe-standalone-bpmn-and-dmn-editors-classic/dist/dmn";

export function loadFile(fileName: string) {
  return fetch(`/static/models/${fileName}`).then((value) => value.text());
}

export function initFileLoader(files: Array<string>, editor: DmnEditorStandaloneApi | BpmnStandaloneEditorApi | DmnStandaloneEditorApi) {
  files.map((fileName) => {
    document.getElementById(fileName)?.addEventListener("click", () => {
      loadFile(fileName).then((fileContent) => editor.setContent(fileName, fileContent));
    });
  });
}
