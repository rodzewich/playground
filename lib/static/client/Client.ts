import IClient    = require("./IClient");
import ClientBase = require("../../client/Client");
import log4js     = require("../../../logger");
import Separator  = require("../../helpers/Separator");
import NamespaceHelper  = require("../../helpers/NamespaceHelper");
import INamespaceHelper = require("../../helpers/INamespaceHelper");

var logger:log4js.Logger = log4js.getLogger("memory");

class Client extends ClientBase implements IClient {

    private _namespaceHelper:INamespaceHelper;

    private _metadataNamespaceHelper:INamespaceHelper;

    private _binaryNamespaceHelper:INamespaceHelper;

    private _gzipNamespaceHelper:INamespaceHelper;

    protected createNamespaceHelper():INamespaceHelper {
        return new NamespaceHelper(["default"]);
    }

    protected getNamespaceHelper():INamespaceHelper {
        if (!this._namespaceHelper) {
            this._namespaceHelper = this.createNamespaceHelper();
        }
        return this._namespaceHelper;
    }

    protected createMetadataNamespaceHelper():INamespaceHelper {
        return new NamespaceHelper(["default", "metadata"]);
    }

    protected getMetadataNamespaceHelper():INamespaceHelper {
        if (!this._metadataNamespaceHelper) {
            this._metadataNamespaceHelper = this.createMetadataNamespaceHelper();
        }
        return this._metadataNamespaceHelper;
    }

    protected createBinaryNamespaceHelper():INamespaceHelper {
        return new NamespaceHelper(["default", "metadata"]);
    }

    protected getBinaryNamespaceHelper():INamespaceHelper {
        if (!this._binaryNamespaceHelper) {
            this._binaryNamespaceHelper = this.createBinaryNamespaceHelper();
        }
        return this._binaryNamespaceHelper;
    }

    protected createGzipNamespaceHelper():INamespaceHelper {
        return new NamespaceHelper(["default", "gzip"]);
    }

    protected getGzipNamespaceHelper():INamespaceHelper {
        if (!this._gzipNamespaceHelper) {
            this._gzipNamespaceHelper = this.createGzipNamespaceHelper();
        }
        return this._gzipNamespaceHelper;
    }

    public setNamespace(namespace:string, separator:Separator = Separator.DOT):void {
        var metadata:string[],
            binary:string[],
            gzip:string[];
        this.getNamespaceHelper().setNamespace(namespace, );
        metadata = this.getNamespace();
        binary = this.getNamespace();
        gzip = this.getNamespace();
        metadata.push("metadata");
        binary.push("binary");
        gzip.push("gzip");
        this.getMetadataNamespaceHelper().setNamespace(metadata);
        this.getBinaryNamespaceHelper().setNamespace(binary);
        this.getGzipNamespaceHelper().setNamespace(gzip);
    }

    public getNamespace():string[] {
        return this.getNamespaceHelper().getNamespace();
    }

    public getMetadataNamespace():string {
        this.getMetadataNamespaceHelper().getValue();
    }

    public getBinaryNamespace():string {
        this.getBinaryNamespaceHelper().getValue();
    }

    public getGzipNamespace():string {
        this.getGzipNamespaceHelper().getValue();
    }

}

export = Client;
