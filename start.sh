#!/usr/bin/env bash

tsc --preserveConstEnums --target es5 --module commonjs lib/compiler/IOptions.ts
tsc --preserveConstEnums --target es5 --module commonjs lib/compiler/ICompiler.ts
tsc --preserveConstEnums --target es5 --module commonjs lib/compiler/Compiler.ts

tsc --preserveConstEnums --target es5 --module commonjs lib/daemon/IOptions.ts
tsc --preserveConstEnums --target es5 --module commonjs lib/daemon/IDaemon.ts
tsc --preserveConstEnums --target es5 --module commonjs lib/daemon/Daemon.ts

tsc --preserveConstEnums --target es5 --module commonjs lib/memory/client/IOptions.ts
tsc --preserveConstEnums --target es5 --module commonjs lib/memory/client/IClient.ts
tsc --preserveConstEnums --target es5 --module commonjs lib/memory/client/Client.ts
tsc --preserveConstEnums --target es5 --module commonjs lib/memory/daemon/IOptions.ts
tsc --preserveConstEnums --target es5 --module commonjs lib/memory/daemon/IDaemon.ts
tsc --preserveConstEnums --target es5 --module commonjs lib/memory/daemon/Daemon.ts
tsc --preserveConstEnums --target es5 --module commonjs lib/memory/initialization.ts
tsc --preserveConstEnums --target es5 --module commonjs lib/memory/daemon.ts

tsc --preserveConstEnums --target es5 --module commonjs lib/client/IOptions.ts
tsc --preserveConstEnums --target es5 --module commonjs lib/client/IClient.ts
tsc --preserveConstEnums --target es5 --module commonjs lib/client/Client.ts


#node ./index.js