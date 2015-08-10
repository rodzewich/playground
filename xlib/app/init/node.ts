/// <reference path="../../utils/require/Require.ts" />
/// <reference path="../../utils/loader/factory/node/Factory.ts" />
/// <reference path="../../utils/dependency/ICallback.ts" />
/// <reference path="../../utils/dependency/IDependency.ts" />
/// <reference path="../../utils/dependency/Dependency.ts" />
/// <reference path="../../ui/element/factory/node/Factory.ts" />

module app.init {

  var dependency: xlib.utils.dependency.IDependency = new xlib.utils.dependency.Dependency();

  dependency.register("dom:factory", <xlib.utils.dependency.ICallback>((error: (message: Error) => void, success: (instance: any) => void): void => {
    try {
      success(new xlib.ui.element.factory.node.Factory());
    } catch (err) {
      error(err);
    }
  }), true);

}