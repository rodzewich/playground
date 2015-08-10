/// <reference path="ITransport.ts" />
/// <reference path="../Transport.ts" />
/// <reference path="../../../require/scripts/Require.ts" />
/// <reference path="../../../deferred/IAction.ts" />
/// <reference path="../../../deferred/IDeferred.ts" />
/// <reference path="../../../deferred/Deferred.ts" />
/// <reference path="../../../../service/IService.ts" />

module xlib.utils.service.transport.node {

  import deferred = utils.deferred;
  import service = xlib.service;

  export class Transport extends transport.Transport implements ITransport {
    public load(namespace: string, name: string, params?: any, callback?: (error?: Error[], data?: any) => void): void {
      var tempNamespace: string = String(namespace || ''),
        tempName: string = String(name || '');
      super.load(tempNamespace, tempName, params, (): void => {
        utils.require.scripts.load([this.getBuilder().build(tempNamespace, tempName, params)], (errors?: Error[]) => {
          var data: any;
          if (errors && errors.length) {
            callback(errors, null);
          } else {
            deferred
              .create()
              .add(<deferred.IAction>((success: () => void, error: (message: any) => void): void => {
                var temp: any = service;
                var keys: string[] = tempNamespace.split('.'),
                  message: string = 'Service ' + JSON.stringify([tempNamespace, tempName].join('.')) + ' not found!',
                  length: number = keys.length,
                  index: number;
                try {
                  for (index = 0; index < length; index++) {
                    temp = temp[keys[index]];
                  }
                  temp = temp[tempName];
                } catch (err) {
                  error(new Error(message));
                }
                if (xlib.typeOf(temp) === 'undefined') {
                  error(new Error(message));
                } else {
                  try {
                    new temp(params, (errors: Error[], response: any): void => {
                      if (errors && errors.length) {
                        error(errors);
                      } else {
                        data = response;
                      }
                    });
                  } catch (err) {
                    error(err);
                  }
                }
              }))
              .run((errors: Error[]): void => {
                if (errors && errors.length) {
                  callback(errors, null);
                } else {
                  callback(null, xlib.clone(data, true));
                }
              });
          }
        });
      });
    }
  }

}
