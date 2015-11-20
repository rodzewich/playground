import {IResourceLocation, ResourceLocation} from "../../helpers/resourceLocation";

export interface IMemoryLocationHelper extends IResourceLocation {
}

export class MemoryLocationHelper extends ResourceLocation implements IMemoryLocationHelper {
}
