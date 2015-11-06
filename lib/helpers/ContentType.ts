import isString  = require("../isString");
import isDefined = require("../isDefined");
import Exception = require("../exception/Exception");

var types:{[index:string]:ContentType} = {};

class ContentType {

    private _extension:string = null;

    private _type:string = null;

    constructor(extension:string, type:string) {
        if (!isString(extension)) {
            throw new Exception({
                message : "extension should be a string", data : {
                    extension : extension,
                    type      : type
                }
            });
        }
        if (!/^[a-z0-9]+$/i.test(extension)) {
            throw new Exception({
                message : "extension is incorrect", data : {
                    extension : extension,
                    type      : type
                }
            });
        }
        if (isDefined(types[extension])) {
            throw new Exception({
                message : "content type already defined", data : {
                    extension : extension,
                    type      : type
                }
            });
        }
        if (!isString(type)) {
            throw new Exception({
                message : "type should be a string", data : {
                    extension : extension,
                    type      : type
                }
            });
        }
        types[extension] = this;
        this._extension = extension.toLowerCase();
        this._type = type;
    }

    public toString(charset?:string):string {
        return String(this._extension).replace(/\{charset\}/g, charset || "utf-8")
    }

    public static find(extension:string):ContentType {
        var temp:string = String(extension).toLowerCase();
        if (isDefined(types[temp])) {
            return types[temp];
        }
        return ContentType.BIN;
    }

    // text
    public static TEXT:ContentType  = new ContentType("txt", "text/plain; charset={charset}");
    public static HTML:ContentType  = new ContentType("html", "text/html; charset={charset}");
    public static HTM:ContentType   = new ContentType("htm", "text/html; charset={charset}");
    public static SHTML:ContentType = new ContentType("shtml", "text/html; charset={charset}");
    public static CSS:ContentType   = new ContentType("css", "text/css; charset={charset}");
    public static XML:ContentType   = new ContentType("xml", "text/xml; charset={charset}");
    public static MML:ContentType   = new ContentType("mml", "text/mathml; charset={charset}");

    // image
    public static GIF:ContentType  = new ContentType("gif", "image/gif");
    public static JPG:ContentType  = new ContentType("jpg", "image/jpeg");
    public static JPEG:ContentType = new ContentType("jpeg", "image/jpeg");
    public static PNG:ContentType  = new ContentType("png", "image/png");
    public static TIF:ContentType  = new ContentType("tif", "image/tiff");
    public static TIFF:ContentType = new ContentType("tiff", "image/tiff");
    public static WBMP:ContentType = new ContentType("wbmp", "image/vnd.wap.wbmp");
    public static ICO:ContentType  = new ContentType("ico", "image/x-icon");
    public static JNG:ContentType  = new ContentType("jng", "image/x-jng");
    public static SVG:ContentType  = new ContentType("svg", "image/svg+xml; charset={charset}");
    public static SVGZ:ContentType = new ContentType("svgz", "image/svg+xml; charset={charset}");
    public static WEBP:ContentType = new ContentType("webp", "image/webp");
    public static BMP:ContentType  = new ContentType("bmp", "image/x-ms-bmp");

    // audio
    public static MID:ContentType  = new ContentType("mid", "audio/midi");
    public static MIDI:ContentType = new ContentType("midi", "audio/midi");
    public static KAR:ContentType  = new ContentType("kar", "audio/midi");
    public static MP3:ContentType  = new ContentType("mp3", "audio/mpeg");
    public static OGG:ContentType  = new ContentType("ogg", "audio/ogg");
    public static M4A:ContentType  = new ContentType("m4a", "audio/x-m4a");
    public static RA:ContentType   = new ContentType("ra", "audio/x-realaudio");

    // video
    public static GPP:ContentType  = new ContentType("3gpp", "video/3gpp");
    public static GP:ContentType   = new ContentType("3gp", "video/3gpp");
    public static TS:ContentType   = new ContentType("ts", "video/mp2t");
    public static MP4:ContentType  = new ContentType("mp4", "video/mp4");
    public static MPEG:ContentType = new ContentType("mpeg", "video/mpeg");
    public static MPG:ContentType  = new ContentType("mpg", "video/mpeg");
    public static MOV:ContentType  = new ContentType("mov", "video/quicktime");
    public static WEBM:ContentType = new ContentType("webm", "video/webm");
    public static FLV:ContentType  = new ContentType("flv", "video/x-flv");
    public static M4V:ContentType  = new ContentType("m4v", "video/x-m4v");
    public static MNG:ContentType  = new ContentType("mng", "video/x-mng");
    public static ASX:ContentType  = new ContentType("asx", "video/x-ms-asf");
    public static ASF:ContentType  = new ContentType("asf", "video/x-ms-asf");
    public static WMV:ContentType  = new ContentType("wmv", "video/x-ms-wmv");
    public static AVI:ContentType  = new ContentType("avi", "video/x-msvideo");

    public static BIN:ContentType   = new ContentType("bin", "application/octet-stream");

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
