/// <reference path='ITransport.ts' />
/// <reference path='State.ts' />
/// <reference path="../../builder/IBuilder.ts" />
/// <reference path="../Transport.ts" />

module xlib.utils.service.transport.ajax {

  function createXMLHttpRequest(): XMLHttpRequest {
    try {
      return new XMLHttpRequest();
    } catch (e) {}
    try {
      return new ActiveXObject('Msxml2.XMLHTTP.6.0');
    } catch (e) {}
    try {
      return new ActiveXObject('Msxml2.XMLHTTP.3.0');
    } catch (e) {}
    try {
      return new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {}
    try {
      return new ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {}
    throw new Error('This browser does not support XMLHttpRequest.');
  }

  import builder = service.builder;

  export class Transport extends transport.Transport implements ITransport {
    private _method: string = 'GET';
    private _login: string = null;
    private _password: string = null;
    load(name: string, method: string, params?: any, callback?: (error?: Error[], data?: any) => void): void {
      var xhr: XMLHttpRequest = createXMLHttpRequest(),
        builder: builder.IBuilder = this.getBuilder(),
        address: string;
      if (this.getMethod() === 'GET' && params) {
        address = builder.build(name, method, params);
      } else {
        address = builder.build(name, method);
      }
      if (this.getLogin() !== null) {
        xhr.open(this.getMethod(), address, true, this.getLogin(), this.getPassword());
      } else {
        xhr.open(this.getMethod(), address, true);
      }
      xhr.ontimeout = () => {

      };
      xhr.onreadystatechange = () => {

      };
      xhr.onload = () => {

      };
      if (this.getMethod() === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(JSON.stringify(params || null));
      } else {
        xhr.send();
      }
    }
    getMethod(): string {
      return this._method;
    }
    setMethod(value: string): void {
      var temp: string = String(value || '').toUpperCase();
      if (['GET', 'POST'].indexOf(temp) === -1) {
        throw new Error('bla bla bla');
      }
      this._method = temp;
    }
    getLogin(): string {
      return this._login;
    }
    setLogin(value: string): void {
      this._login = String(value || '').
        replace(/^\s*(\S(?:.*\S)?)?\s*$/, '$1') || null;
    }
    getPassword(): string {
      return this._password;
    }
    setPassword(value: string): void {
      this._password = String(value || '') || null;
    }
  }

}