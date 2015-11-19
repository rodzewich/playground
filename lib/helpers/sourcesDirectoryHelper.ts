import {IResourceLocation, ResourceLocation} from "./resourceLocation";

export interface ISourcesDirectoryHelper extends IResourceLocation {
}

export class SourcesDirectoryHelper extends ResourceLocation implements ISourcesDirectoryHelper {
}
