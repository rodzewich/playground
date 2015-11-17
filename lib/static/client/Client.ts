import IClient    = require("./IClient");
import ClientBase = require("../../client/Client");
import log4js     = require("../../../logger");
import IResponseClient  = require("./IResponse");
import IResponseDaemon  = require("../daemon/IResponse");
import IOptions   = require("./IOptions");
import {isDefined, isString, isFunction} from "../../utils";
import {IException, Exception} from "../exception";
import CacheOnlyHelper  = require("../helpers/CacheOnlyHelper");
import ICacheOnlyHelper = require("../helpers/ICacheOnlyHelper");

var logger:log4js.Logger = log4js.getLogger("memory");

class Client extends ClientBase implements IClient {

    private _cacheOnlyHelper:ICacheOnlyHelper;

    protected createCacheOnlyHelper():ICacheOnlyHelper {
        return new CacheOnlyHelper();
    }

    protected getCacheOnlyHelper():ICacheOnlyHelper {
        if (!this._cacheOnlyHelper) {
            this._cacheOnlyHelper = this.createCacheOnlyHelper();
        }
        return this._cacheOnlyHelper;
    }

    constructor(options?:IOptions) {
        super(options);
        if (options && isDefined(options.cacheOnly)) {
            this.setIsCacheOnly(options.cacheOnly);
        }
    }

    public isCacheOnly():boolean {
        return this.getCacheOnlyHelper().isUsed();
    }

    public getIsCacheOnly():boolean {
        return this.getCacheOnlyHelper().getIsUsed();
    }

    public setIsCacheOnly(value:boolean):void {
        this.getCacheOnlyHelper().setIsUsed(value);
    }

    public ping(callback?:(errors:IException[]) => void):void {

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0).ref();
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        this.call((errors:IException[]):void => {
            handler(errors && errors.length ? errors : null);
        }, null, "ping");

    }

    public stop(callback?:(errors:IException[]) => void):void {

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0).ref();
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        this.call((errors:IException[]):void => {
            handler(errors && errors.length ? errors : null);
        }, null, "stop");

    }

    public getContent(filename:string, callback?:(errors:IException[], response:IResponseClient) => void):void {

        function handler(errors:IException[], response:IResponseClient):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        if (!isString(filename)) {
            handler([new Exception({message : "filename should be a string"})], null);
        } else {
            this.call((errors:IException[], response:IResponseDaemon):void => {
                var result:IResponseClient = {
                    filename   : null,
                    original   : null,
                    content    : null,
                    type       : null,
                    length     : null,
                    zipContent : null,
                    zipLength  : null,
                    date       : null
                };
                if (response) {
                    result.filename  = response.filename;
                    result.original  = response.original;
                    result.type      = response.type;
                    result.length    = response.length;
                    result.zipLength = response.zipLength;
                    result.date      = response.date;
                    if (response.content) {
                        result.content = new Buffer(response.content, 'base64');
                    }
                    if (response.zipContent) {
                        result.zipContent = new Buffer(response.zipContent, 'base64');
                    }
                }
                handler(errors && errors.length ? errors : null,
                    (!errors || !errors.length) && response ? result : null);
            }, null, "getContent", filename, this.isCacheOnly());
        }

    }

}

export = Client;
