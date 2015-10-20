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

    public setNamespace(namespace:string):void {
        this.getNamespaceHelper().setNamespace(NamespaceHelper.parse(namespace, Separator.DOT));
        this.getMetadataNamespaceHelper().setNamespace(NamespaceHelper.parse(namespace, Separator.DOT).addToNamespace(["metadata"]));
        this.getBinaryNamespaceHelper().setNamespace(NamespaceHelper.parse(namespace, Separator.DOT).addToNamespace(["binary"]));
        this.getGzipNamespaceHelper().setNamespace(NamespaceHelper.parse(namespace, Separator.DOT).addToNamespace(["gzip"]));
    }

    public getNamespace():string {
        return this.getNamespaceHelper().getValue();
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

    public getContent(filename:string, callback?:(errors:IException[], response:string) => void):void {

    }

}

export = Client;
