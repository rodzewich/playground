/// <reference path="../../utils/require/Require.ts" />
/// <reference path="../../utils/loader/factory/browser/Factory.ts" />
/// <reference path="../../utils/dependency/ICallback.ts" />
/// <reference path="../../utils/dependency/IDependency.ts" />
/// <reference path="../../utils/dependency/Dependency.ts" />
/// <reference path="../../utils/storage/local/Storage.ts" />
/// <reference path="../../utils/storage/local/IStorage.ts" />
/// <reference path="../../utils/storage/session/Storage.ts" />
/// <reference path="../../utils/storage/session/IStorage.ts" />
/// <reference path="../../utils/storage/memory/Storage.ts" />
/// <reference path="../../utils/storage/memory/IStorage.ts" />
/// <reference path="../../utils/listener/IListener.ts" />
/// <reference path="../../utils/listener/Listener.ts" />
/// <reference path="../../ui/element/factory/browser/Factory.ts" />
/// <reference path="../../ui/element/factory.ts" />
/// <reference path="../../ui/Button.ts" />
/// <reference path="../../ui/Window.ts" />
/// <reference path="../../ui/Loader.ts" />

module app.init {

  var dependency: xlib.utils.dependency.IDependency = new xlib.utils.dependency.Dependency();

  dependency.register("loader:factory", <xlib.utils.dependency.ICallback>((error: (message: Error) => void, success: (instance: any) => void): void => {
    success(new xlib.utils.loader.factory.browser.Factory());
  }), true);

  dependency.register("storage:local", <xlib.utils.dependency.ICallback>((error: (message: Error) => void, success: (instance: any) => void): void => {
    /*if (xlib.utils.storage.local.isSupported()) {*/
      success(new xlib.utils.storage.local.Storage());
    /*} else {
      success(new xlib.utils.storage.memory.Storage());
    }*/
  }), true);

  dependency.register("storage:session", <xlib.utils.dependency.ICallback>((error: (message: Error) => void, success: (instance: any) => void): void => {
    success(new xlib.utils.storage.session.Storage());
  }), true);

  dependency.register("dom:factory", <xlib.utils.dependency.ICallback>((error: (message: Error) => void, success: (instance: any) => void): void => {
    try {
      success(new xlib.ui.element.factory.browser.Factory());
    } catch (err) {
      error(err);
    }
  }), true);

}

