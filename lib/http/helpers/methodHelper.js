var registered = {}, system = false;
var MethodHelper = (function () {
    function MethodHelper(name, value) {
        this._name = name;
        this._value = value;
        if (system) {
            registered[name] = this;
        }
    }
    MethodHelper.prototype.equal = function (value) {
        return this.toString().toLowerCase() === String(value).toLowerCase();
    };
    MethodHelper.prototype.toString = function () {
        return this._value;
    };
    return MethodHelper;
})();
exports.MethodHelper = MethodHelper;
var methods;
(function (methods) {
    system = true;
    methods.GET = new MethodHelper("get", "GET");
    methods.OPTIONS = new MethodHelper("options", "OPTIONS");
    methods.HEAD = new MethodHelper("head", "HEAD");
    methods.POST = new MethodHelper("post", "POST");
    methods.PUT = new MethodHelper("put", "PUT");
    methods.DELETE = new MethodHelper("delete", "DELETE");
    methods.TRACE = new MethodHelper("trace", "TRACE");
    methods.CONNECT = new MethodHelper("connect", "CONNECT");
    system = false;
})(methods = exports.methods || (exports.methods = {}));
function find(name) {
    return registered[String(name).toLowerCase()] || methods.GET;
}
exports.find = find;
//# sourceMappingURL=methodHelper.js.map