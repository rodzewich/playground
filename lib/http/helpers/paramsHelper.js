var common_1 = require("../../utils/common");
var ParamsHelper = (function () {
    function ParamsHelper(params) {
        if (common_1.isObject(params)) {
            this._params = common_1.clone(params, true);
        }
        else {
            this._params = {};
        }
    }
    ParamsHelper.prototype.getParams = function () {
        return common_1.clone(this._params);
    };
    ParamsHelper.prototype.getParam = function (name) {
        if (this.hasParam(name)) {
            return common_1.clone(common_1.get(this._params, String(name))) || null;
        }
        return null;
    };
    ParamsHelper.prototype.hasParam = function (name) {
        return common_1.isDefined(common_1.get(this._params, String(name)));
    };
    return ParamsHelper;
})();
exports.ParamsHelper = ParamsHelper;
//# sourceMappingURL=paramsHelper.js.map