import isString  = require("../isString");
import isDefined = require("../isDefined");
import Exception = require("../exception/Exception");

var types:{[index:string]:ContentType} = {};

function registry(type:ContentType) {
    types[type.getExtension()] = type;
    return type;
}

class ContentType {

    private _extension:string = null;

    private _type:string = null;

    constructor(extension:string, type:string) {
        if (!isString(extension)) {
            throw new Exception({
                message : "extension should be a string",
                data    : {
                    extension : extension,
                    type      : type
                }
            });
        }
        if (!/^[a-z0-9]+$/i.test(extension)) {
            throw new Exception({
                message : "extension is incorrect",
                data    : {
                    extension : extension,
                    type      : type
                }
            });
        }
        if (!isString(type)) {
            throw new Exception({
                message : "type should be a string",
                data    : {
                    extension : extension,
                    type      : type
                }
            });
        }
        this._extension = extension.toLowerCase();
        this._type = type;
    }

    public getExtension():string {
        return String(this._extension || "");
    }

    public toString(charset?:string):string {
        return String(this._type || "").replace(/\{charset\}/g, charset || "utf-8")
    }

    public static find(extension:string):ContentType {
        var temp:string = String(extension).toLowerCase();
        if (isDefined(types[temp])) {
            return types[temp];
        }
        return ContentType.BIN;
    }

    // text
    public static TEXT:ContentType  = registry(new ContentType("txt", "text/plain; charset={charset}"));
    public static HTML:ContentType  = registry(new ContentType("html", "text/html; charset={charset}"));
    public static HTM:ContentType   = registry(new ContentType("htm", "text/html; charset={charset}"));
    public static SHTML:ContentType = registry(new ContentType("shtml", "text/html; charset={charset}"));
    public static CSS:ContentType   = registry(new ContentType("css", "text/css; charset={charset}"));
    public static XML:ContentType   = registry(new ContentType("xml", "text/xml; charset={charset}"));
    public static MML:ContentType   = registry(new ContentType("mml", "text/mathml; charset={charset}"));

    // image
    public static GIF:ContentType  = registry(new ContentType("gif", "image/gif"));
    public static JPG:ContentType  = registry(new ContentType("jpg", "image/jpeg"));
    public static JPEG:ContentType = registry(new ContentType("jpeg", "image/jpeg"));
    public static PNG:ContentType  = registry(new ContentType("png", "image/png"));
    public static TIF:ContentType  = registry(new ContentType("tif", "image/tiff"));
    public static TIFF:ContentType = registry(new ContentType("tiff", "image/tiff"));
    public static WBMP:ContentType = registry(new ContentType("wbmp", "image/vnd.wap.wbmp"));
    public static ICO:ContentType  = registry(new ContentType("ico", "image/x-icon"));
    public static JNG:ContentType  = registry(new ContentType("jng", "image/x-jng"));
    public static SVG:ContentType  = registry(new ContentType("svg", "image/svg+xml; charset={charset}"));
    public static SVGZ:ContentType = registry(new ContentType("svgz", "image/svg+xml; charset={charset}"));
    public static WEBP:ContentType = registry(new ContentType("webp", "image/webp"));
    public static BMP:ContentType  = registry(new ContentType("bmp", "image/x-ms-bmp"));

    // audio
    public static MID:ContentType  = registry(new ContentType("mid", "audio/midi"));
    public static MIDI:ContentType = registry(new ContentType("midi", "audio/midi"));
    public static KAR:ContentType  = registry(new ContentType("kar", "audio/midi"));
    public static MP3:ContentType  = registry(new ContentType("mp3", "audio/mpeg"));
    public static OGG:ContentType  = registry(new ContentType("ogg", "audio/ogg"));
    public static M4A:ContentType  = registry(new ContentType("m4a", "audio/x-m4a"));
    public static RA:ContentType   = registry(new ContentType("ra", "audio/x-realaudio"));

    // video
    public static GPP:ContentType  = registry(new ContentType("3gpp", "video/3gpp"));
    public static GP:ContentType   = registry(new ContentType("3gp", "video/3gpp"));
    public static TS:ContentType   = registry(new ContentType("ts", "video/mp2t"));
    public static MP4:ContentType  = registry(new ContentType("mp4", "video/mp4"));
    public static MPEG:ContentType = registry(new ContentType("mpeg", "video/mpeg"));
    public static MPG:ContentType  = registry(new ContentType("mpg", "video/mpeg"));
    public static MOV:ContentType  = registry(new ContentType("mov", "video/quicktime"));
    public static WEBM:ContentType = registry(new ContentType("webm", "video/webm"));
    public static FLV:ContentType  = registry(new ContentType("flv", "video/x-flv"));
    public static M4V:ContentType  = registry(new ContentType("m4v", "video/x-m4v"));
    public static MNG:ContentType  = registry(new ContentType("mng", "video/x-mng"));
    public static ASX:ContentType  = registry(new ContentType("asx", "video/x-ms-asf"));
    public static ASF:ContentType  = registry(new ContentType("asf", "video/x-ms-asf"));
    public static WMV:ContentType  = registry(new ContentType("wmv", "video/x-ms-wmv"));
    public static AVI:ContentType  = registry(new ContentType("avi", "video/x-msvideo"));

    public static BIN:ContentType = registry(new ContentType("bin", "application/octet-stream"));

    /*

     application/javascript                js;
     application/atom+xml                  atom;
     application/rss+xml                   rss;
     application/font-woff                 woff;
     application/java-archive              jar war ear;
     application/json                      json;
     application/mac-binhex40              hqx;
     application/msword                    doc;
     application/pdf                       pdf;
     application/postscript                ps eps ai;
     application/rtf                       rtf;
     application/vnd.ms-excel              xls;
     application/vnd.ms-fontobject         eot;
     application/vnd.ms-powerpoint         ppt;
     application/x-7z-compressed           7z;
     application/x-cocoa                   cco;
     application/x-makeself                run;
     application/x-perl                    pl pm;
     application/x-pilot                   prc pdb;
     application/x-rar-compressed          rar;
     application/x-redhat-package-manager  rpm;
     application/x-sea                     sea;
     application/x-shockwave-flash         swf;
     application/x-stuffit                 sit;
     application/x-tcl                     tcl tk;
     application/x-xpinstall               xpi;
     application/xhtml+xml                 xhtml;
     application/xspf+xml                  xspf;
     application/zip                       zip;

     application/octet-stream              bin exe dll;
     application/octet-stream              deb;
     application/octet-stream              dmg;
     application/octet-stream              iso img;
     application/octet-stream              msi msp msm;

     */

}

export = ContentType;
