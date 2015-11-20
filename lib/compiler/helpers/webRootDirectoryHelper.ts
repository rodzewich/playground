import {IResourceLocation, ResourceLocation} from "../../helpers/resourceLocation";

export interface IWebRootDirectoryHelper extends IResourceLocation {
}

export class WebRootDirectoryHelper extends ResourceLocation implements IWebRootDirectoryHelper {
}
