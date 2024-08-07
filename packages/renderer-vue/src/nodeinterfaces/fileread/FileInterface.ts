import { type ComponentOptions, markRaw } from "vue";
import { NodeInterface } from "@baklavajs/core";
import FileComponent from "./FileInterface.vue";

export class FileInterface extends NodeInterface<string> {
    component = markRaw(FileComponent) as ComponentOptions;
}

export { FileComponent };