var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var qs = require("querystring");
var common_1 = require("../../utils/common");
var paramsHelper_1 = require("./paramsHelper");
var PostHelper = (function (_super) {
    __extends(PostHelper, _super);
    function PostHelper(data) {
        var params = {};
        try {
            if (common_1.isString(data) && data.slice(0, 1) === "{") {
                params = JSON.parse(data);
            }
            else if (common_1.isString(data)) {
                params = qs.parse(data);
            }
        }
        catch (error) {
        }
        _super.call(this, params);
    }
    return PostHelper;
})(paramsHelper_1.ParamsHelper);
exports.PostHelper = PostHelper;
//# sourceMappingURL=postHelper.js.map