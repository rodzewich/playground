<?php

declare(strict_types=1);

namespace xlib\memory\client;

interface IClient {
    public function getNamespace();
    /*public function setNamespace($namespace):IClient;
    public function ping():IClient;
    public function stop():IClient;
    public function getInfo():IClient;
    public function getNamespaces():IClient;
    public function hasNamespace($namespace):IClient;
    public function removeNamespace($namespace):IClient;
    public function getItem($key, $namespace):IClient;*/
    /*public function getItems($keys, $namespace):IClient;
        public function getBin(key:string, callback?:(errors:IException[], response:Buffer) => void, namespace?:string):IClient;
        public function getBins(keys:string[], callback?:(errors:IException[], response:{[index:string]:Buffer;}|any) => void, namespace?:string):IClient;
        public function setItem(key:string, value:any, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):IClient;
        public function setItems(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):IClient;
        public function setBin(key:string, value:any, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):IClient;
        public function setBins(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):IClient;
        public function getTtl(key:string, callback?:(errors:IException[], response:number) => void, namespace?:string):IClient;
        public function getTtls(keys:string[], callback?:(errors:IException[], response:{[index:string]:number;}|any) => void, namespace?:string):IClient;
        public function setTtl(key:string, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):IClient;
        public function setTtls(keys:string[], ttl:number, callback?:(errors:IException[]) => void, namespace?:string):IClient;
        public function increment(key:string, ttl:number, callback?:(errors:IException[], response:string) => void, namespace?:string):IClient;
        public function decrement(key:string, ttl:number, callback?:(errors:IException[], response:string) => void, namespace?:string):IClient;
        public function removeItem(key:string, callback?:(errors:IException[]) => void, namespace?:string):IClient;
        public function removeItems(keys:string[], callback?:(errors:IException[]) => void, namespace?:string):IClient;
        public function hasItem(key:string, callback?:(errors:IException[], response:boolean) => void, namespace?:string):IClient;
        public function hasItems(keys:string[], callback?:(errors:IException[], response:{[index:string]:boolean;}|any) => void, namespace?:string):IClient;
        public function getKey(index:number, callback?:(errors:IException[], response:string) => void, namespace?:string):IClient;
        public function getKeys(indexes:number[], callback?:(errors:IException[], response:string[]) => void, namespace?:string):IClient;
        public function getLength(callback?:(errors:IException[], response:number) => void, namespace?:string):IClient;
        public function lock(key:string, callback?:(errors:IException[], unlock:(callback?:(errors:IException[]) => void) => void) => void, namespace?:string):IClient;*/
}