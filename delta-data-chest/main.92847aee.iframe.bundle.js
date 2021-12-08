(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"./docs/preview.tsx-generated-config-entry.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var preview_namespaceObject={};__webpack_require__.r(preview_namespaceObject),__webpack_require__.d(preview_namespaceObject,"parameters",(function(){return parameters})),__webpack_require__.d(preview_namespaceObject,"decorators",(function(){return decorators}));var ClientApi=__webpack_require__("../../node_modules/@storybook/client-api/dist/esm/ClientApi.js"),esm=__webpack_require__("../../node_modules/@storybook/client-logger/dist/esm/index.js"),parameters={controls:{hideNoControlsWarning:!0}},decorators=[];function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.keys(preview_namespaceObject).forEach((function(key){var value=preview_namespaceObject[key];switch(key){case"args":case"argTypes":return esm.a.warn("Invalid args/argTypes in config, ignoring.",JSON.stringify(value));case"decorators":return value.forEach((function(decorator){return Object(ClientApi.d)(decorator,!1)}));case"loaders":return value.forEach((function(loader){return Object(ClientApi.e)(loader,!1)}));case"parameters":return Object(ClientApi.f)(function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({},value),!1);case"argTypesEnhancers":return value.forEach((function(enhancer){return Object(ClientApi.b)(enhancer)}));case"argsEnhancers":return value.forEach((function(enhancer){return Object(ClientApi.c)(enhancer)}));case"render":return Object(ClientApi.g)(value);case"globals":case"globalTypes":var v={};return v[key]=value,Object(ClientApi.f)(v,!1);case"decorateStory":case"renderToDOM":return null;default:return console.log(key+" was not supported :( !")}}))},"./docs/stories sync recursive ^\\.(?:(?:^|[\\\\/]|(?:(?:(?!(?:^|[\\\\/])\\.).)*?)[\\\\/])(?!\\.)(?=.)[^\\\\/]*?\\.stories\\.(js|jsx|ts|tsx))$":function(module,exports,__webpack_require__){var map={"./Basics.stories.tsx":"./docs/stories/Basics.stories.tsx"};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id="./docs/stories sync recursive ^\\.(?:(?:^|[\\\\/]|(?:(?:(?!(?:^|[\\\\/])\\.).)*?)[\\\\/])(?!\\.)(?=.)[^\\\\/]*?\\.stories\\.(js|jsx|ts|tsx))$"},"./docs/stories sync recursive ^\\.(?:(?:^|[\\\\/]|(?:(?:(?!(?:^|[\\\\/])\\.).)*?)[\\\\/])(?!\\.)(?=.)[^\\\\/]*?\\.stories\\.mdx)$":function(module,exports){function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=function(){return[]},webpackEmptyContext.resolve=webpackEmptyContext,module.exports=webpackEmptyContext,webpackEmptyContext.id="./docs/stories sync recursive ^\\.(?:(?:^|[\\\\/]|(?:(?:(?!(?:^|[\\\\/])\\.).)*?)[\\\\/])(?!\\.)(?=.)[^\\\\/]*?\\.stories\\.mdx)$"},"./docs/stories/Basics.stories.tsx":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Operator",(function(){return Basics_stories_Operator})),__webpack_require__.d(__webpack_exports__,"DataChest",(function(){return Basics_stories_DataChest})),__webpack_require__.d(__webpack_exports__,"ReactiveDataChest",(function(){return Basics_stories_ReactiveDataChest}));var helpers_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/extends.js"),extends_default=__webpack_require__.n(helpers_extends),asyncToGenerator=__webpack_require__("../../node_modules/@babel/runtime/helpers/asyncToGenerator.js"),asyncToGenerator_default=__webpack_require__.n(asyncToGenerator),regenerator=__webpack_require__("../../node_modules/@babel/runtime/regenerator/index.js"),regenerator_default=__webpack_require__.n(regenerator),nats=__webpack_require__("../../node_modules/nats.ws/nats.cjs"),react=__webpack_require__("../../node_modules/react/index.js"),react_default=__webpack_require__.n(react),useDataChest_useDataChest=function useDataChest(initializer){var dataRef=Object(react.useRef)(initializer instanceof Function?initializer():initializer),usesRef=Object(react.useRef)(new Set),use=Object(react.useCallback)((function(){var _useReducer=Object(react.useReducer)((function(v){return(v+1)%1e3}),0),update=(_useReducer[0],_useReducer[1]);return Object(react.useEffect)((function(){return usesRef.current.add(update),function(){usesRef.current.delete(update)}}),[]),dataRef.current}),[]),get=Object(react.useCallback)((function(){return dataRef.current}),[]),set=Object(react.useCallback)((function(update){dataRef.current=update instanceof Function?update(dataRef.current):update,usesRef.current.forEach((function(fn){return fn()}))}),[]);return Object(react.useMemo)((function(){return{use:use,get:get,set:set}}),[])};try{useDataChest_useDataChest.displayName="useDataChest",useDataChest_useDataChest.__docgenInfo={description:"",displayName:"useDataChest",props:{apply:{defaultValue:null,description:"Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.\n@param thisArg The object to be used as the this object.\n@param argArray A set of arguments to be passed to the function.",name:"apply",required:!0,type:{name:"(this: Function, thisArg: any, argArray?: any) => any"}},call:{defaultValue:null,description:"Calls a method of an object, substituting another object for the current object.\n@param thisArg The object to be used as the current object.\n@param argArray A list of arguments to be passed to the method.",name:"call",required:!0,type:{name:"(this: Function, thisArg: any, ...argArray: any[]) => any"}},bind:{defaultValue:null,description:"For a given function, creates a bound function that has the same body as the original function.\nThe this object of the bound function is associated with the specified object, and has the specified initial parameters.\n@param thisArg An object to which the this keyword can refer inside the new function.\n@param argArray A list of arguments to be passed to the new function.",name:"bind",required:!0,type:{name:"(this: Function, thisArg: any, ...argArray: any[]) => any"}},toString:{defaultValue:null,description:"Returns a string representation of a function.",name:"toString",required:!1,type:{name:"() => string"}},prototype:{defaultValue:null,description:"",name:"prototype",required:!0,type:{name:"any"}},length:{defaultValue:null,description:"",name:"length",required:!0,type:{name:"number"}},arguments:{defaultValue:null,description:"",name:"arguments",required:!0,type:{name:"any"}},caller:{defaultValue:null,description:"",name:"caller",required:!0,type:{name:"Function"}},name:{defaultValue:null,description:"Returns the name of the function. Function names are read-only and can not be changed.",name:"name",required:!0,type:{name:"string"}},"__@hasInstance@261":{defaultValue:null,description:"Determines whether the given value inherits from this function if this function was used\nas a constructor function.\n\nA constructor function can control which objects are recognized as its instances by\n'instanceof' by overriding this method.",name:"__@hasInstance@261",required:!0,type:{name:"(value: any) => boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["lib/hooks/useDataChest.tsx#useDataChest"]={docgenInfo:useDataChest_useDataChest.__docgenInfo,name:"useDataChest",path:"lib/hooks/useDataChest.tsx#useDataChest"})}catch(__react_docgen_typescript_loader_error){}try{useDataChest.displayName="useDataChest",useDataChest.__docgenInfo={description:"",displayName:"useDataChest",props:{apply:{defaultValue:null,description:"Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.\n@param thisArg The object to be used as the this object.\n@param argArray A set of arguments to be passed to the function.",name:"apply",required:!0,type:{name:"(this: Function, thisArg: any, argArray?: any) => any"}},call:{defaultValue:null,description:"Calls a method of an object, substituting another object for the current object.\n@param thisArg The object to be used as the current object.\n@param argArray A list of arguments to be passed to the method.",name:"call",required:!0,type:{name:"(this: Function, thisArg: any, ...argArray: any[]) => any"}},bind:{defaultValue:null,description:"For a given function, creates a bound function that has the same body as the original function.\nThe this object of the bound function is associated with the specified object, and has the specified initial parameters.\n@param thisArg An object to which the this keyword can refer inside the new function.\n@param argArray A list of arguments to be passed to the new function.",name:"bind",required:!0,type:{name:"(this: Function, thisArg: any, ...argArray: any[]) => any"}},toString:{defaultValue:null,description:"Returns a string representation of a function.",name:"toString",required:!1,type:{name:"() => string"}},prototype:{defaultValue:null,description:"",name:"prototype",required:!0,type:{name:"any"}},length:{defaultValue:null,description:"",name:"length",required:!0,type:{name:"number"}},arguments:{defaultValue:null,description:"",name:"arguments",required:!0,type:{name:"any"}},caller:{defaultValue:null,description:"",name:"caller",required:!0,type:{name:"Function"}},name:{defaultValue:null,description:"Returns the name of the function. Function names are read-only and can not be changed.",name:"name",required:!0,type:{name:"string"}},"__@hasInstance@261":{defaultValue:null,description:"Determines whether the given value inherits from this function if this function was used\nas a constructor function.\n\nA constructor function can control which objects are recognized as its instances by\n'instanceof' by overriding this method.",name:"__@hasInstance@261",required:!0,type:{name:"(value: any) => boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["lib/hooks/index.tsx#useDataChest"]={docgenInfo:useDataChest.__docgenInfo,name:"useDataChest",path:"lib/hooks/index.tsx#useDataChest"})}catch(__react_docgen_typescript_loader_error){}var build=__webpack_require__("../../node_modules/restyler/build/index.js"),defaultConnectionOptions=void 0,getNatsConnection_setDefaultNatsConnectionOptions=function setDefaultNatsConnectionOptions(options){defaultConnectionOptions=options},connections=new Map,getNatsConnection_getNatsConnection=function(){var _ref=asyncToGenerator_default()(regenerator_default.a.mark((function _callee(options){var id,connection;return regenerator_default.a.wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:if(options||(options=defaultConnectionOptions),options){_context.next=3;break}throw new Error("Either options must be provided or default options set");case 3:if(id=Object(build.a)(options),connections.has(id)){_context.next=10;break}return _context.next=7,Object(nats.connect)(options);case 7:connection=_context.sent,connections.set(id,connection),connection.closed().finally((function(){return connections.delete(id)}));case 10:return _context.abrupt("return",connections.get(id));case 11:case"end":return _context.stop()}}),_callee)})));return function getNatsConnection(_x){return _ref.apply(this,arguments)}}();try{getNatsConnection_setDefaultNatsConnectionOptions.displayName="setDefaultNatsConnectionOptions",getNatsConnection_setDefaultNatsConnectionOptions.__docgenInfo={description:"",displayName:"setDefaultNatsConnectionOptions",props:{authenticator:{defaultValue:null,description:"",name:"authenticator",required:!1,type:{name:"Authenticator"}},debug:{defaultValue:null,description:"",name:"debug",required:!1,type:{name:"boolean"}},maxPingOut:{defaultValue:null,description:"",name:"maxPingOut",required:!1,type:{name:"number"}},maxReconnectAttempts:{defaultValue:null,description:"",name:"maxReconnectAttempts",required:!1,type:{name:"number"}},name:{defaultValue:null,description:"",name:"name",required:!1,type:{name:"string"}},noEcho:{defaultValue:null,description:"",name:"noEcho",required:!1,type:{name:"boolean"}},noRandomize:{defaultValue:null,description:"",name:"noRandomize",required:!1,type:{name:"boolean"}},pass:{defaultValue:null,description:"",name:"pass",required:!1,type:{name:"string"}},pedantic:{defaultValue:null,description:"",name:"pedantic",required:!1,type:{name:"boolean"}},pingInterval:{defaultValue:null,description:"",name:"pingInterval",required:!1,type:{name:"number"}},port:{defaultValue:null,description:"",name:"port",required:!1,type:{name:"number"}},reconnect:{defaultValue:null,description:"",name:"reconnect",required:!1,type:{name:"boolean"}},reconnectDelayHandler:{defaultValue:null,description:"",name:"reconnectDelayHandler",required:!1,type:{name:"(() => number)"}},reconnectJitter:{defaultValue:null,description:"",name:"reconnectJitter",required:!1,type:{name:"number"}},reconnectJitterTLS:{defaultValue:null,description:"",name:"reconnectJitterTLS",required:!1,type:{name:"number"}},reconnectTimeWait:{defaultValue:null,description:"",name:"reconnectTimeWait",required:!1,type:{name:"number"}},servers:{defaultValue:null,description:"",name:"servers",required:!1,type:{name:"string | string[]"}},timeout:{defaultValue:null,description:"",name:"timeout",required:!1,type:{name:"number"}},tls:{defaultValue:null,description:"",name:"tls",required:!1,type:{name:"TlsOptions"}},token:{defaultValue:null,description:"",name:"token",required:!1,type:{name:"string"}},user:{defaultValue:null,description:"",name:"user",required:!1,type:{name:"string"}},verbose:{defaultValue:null,description:"",name:"verbose",required:!1,type:{name:"boolean"}},waitOnFirstConnect:{defaultValue:null,description:"",name:"waitOnFirstConnect",required:!1,type:{name:"boolean"}},ignoreClusterUpdates:{defaultValue:null,description:"",name:"ignoreClusterUpdates",required:!1,type:{name:"boolean"}},inboxPrefix:{defaultValue:null,description:"",name:"inboxPrefix",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["lib/utils/getNatsConnection.tsx#setDefaultNatsConnectionOptions"]={docgenInfo:getNatsConnection_setDefaultNatsConnectionOptions.__docgenInfo,name:"setDefaultNatsConnectionOptions",path:"lib/utils/getNatsConnection.tsx#setDefaultNatsConnectionOptions"})}catch(__react_docgen_typescript_loader_error){}try{getNatsConnection_getNatsConnection.displayName="getNatsConnection",getNatsConnection_getNatsConnection.__docgenInfo={description:"",displayName:"getNatsConnection",props:{authenticator:{defaultValue:null,description:"",name:"authenticator",required:!1,type:{name:"Authenticator"}},debug:{defaultValue:null,description:"",name:"debug",required:!1,type:{name:"boolean"}},maxPingOut:{defaultValue:null,description:"",name:"maxPingOut",required:!1,type:{name:"number"}},maxReconnectAttempts:{defaultValue:null,description:"",name:"maxReconnectAttempts",required:!1,type:{name:"number"}},name:{defaultValue:null,description:"",name:"name",required:!1,type:{name:"string"}},noEcho:{defaultValue:null,description:"",name:"noEcho",required:!1,type:{name:"boolean"}},noRandomize:{defaultValue:null,description:"",name:"noRandomize",required:!1,type:{name:"boolean"}},pass:{defaultValue:null,description:"",name:"pass",required:!1,type:{name:"string"}},pedantic:{defaultValue:null,description:"",name:"pedantic",required:!1,type:{name:"boolean"}},pingInterval:{defaultValue:null,description:"",name:"pingInterval",required:!1,type:{name:"number"}},port:{defaultValue:null,description:"",name:"port",required:!1,type:{name:"number"}},reconnect:{defaultValue:null,description:"",name:"reconnect",required:!1,type:{name:"boolean"}},reconnectDelayHandler:{defaultValue:null,description:"",name:"reconnectDelayHandler",required:!1,type:{name:"(() => number)"}},reconnectJitter:{defaultValue:null,description:"",name:"reconnectJitter",required:!1,type:{name:"number"}},reconnectJitterTLS:{defaultValue:null,description:"",name:"reconnectJitterTLS",required:!1,type:{name:"number"}},reconnectTimeWait:{defaultValue:null,description:"",name:"reconnectTimeWait",required:!1,type:{name:"number"}},servers:{defaultValue:null,description:"",name:"servers",required:!1,type:{name:"string | string[]"}},timeout:{defaultValue:null,description:"",name:"timeout",required:!1,type:{name:"number"}},tls:{defaultValue:null,description:"",name:"tls",required:!1,type:{name:"TlsOptions"}},token:{defaultValue:null,description:"",name:"token",required:!1,type:{name:"string"}},user:{defaultValue:null,description:"",name:"user",required:!1,type:{name:"string"}},verbose:{defaultValue:null,description:"",name:"verbose",required:!1,type:{name:"boolean"}},waitOnFirstConnect:{defaultValue:null,description:"",name:"waitOnFirstConnect",required:!1,type:{name:"boolean"}},ignoreClusterUpdates:{defaultValue:null,description:"",name:"ignoreClusterUpdates",required:!1,type:{name:"boolean"}},inboxPrefix:{defaultValue:null,description:"",name:"inboxPrefix",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["lib/utils/getNatsConnection.tsx#getNatsConnection"]={docgenInfo:getNatsConnection_getNatsConnection.__docgenInfo,name:"getNatsConnection",path:"lib/utils/getNatsConnection.tsx#getNatsConnection"})}catch(__react_docgen_typescript_loader_error){}try{setDefaultNatsConnectionOptions.displayName="setDefaultNatsConnectionOptions",setDefaultNatsConnectionOptions.__docgenInfo={description:"",displayName:"setDefaultNatsConnectionOptions",props:{authenticator:{defaultValue:null,description:"",name:"authenticator",required:!1,type:{name:"Authenticator"}},debug:{defaultValue:null,description:"",name:"debug",required:!1,type:{name:"boolean"}},maxPingOut:{defaultValue:null,description:"",name:"maxPingOut",required:!1,type:{name:"number"}},maxReconnectAttempts:{defaultValue:null,description:"",name:"maxReconnectAttempts",required:!1,type:{name:"number"}},name:{defaultValue:null,description:"",name:"name",required:!1,type:{name:"string"}},noEcho:{defaultValue:null,description:"",name:"noEcho",required:!1,type:{name:"boolean"}},noRandomize:{defaultValue:null,description:"",name:"noRandomize",required:!1,type:{name:"boolean"}},pass:{defaultValue:null,description:"",name:"pass",required:!1,type:{name:"string"}},pedantic:{defaultValue:null,description:"",name:"pedantic",required:!1,type:{name:"boolean"}},pingInterval:{defaultValue:null,description:"",name:"pingInterval",required:!1,type:{name:"number"}},port:{defaultValue:null,description:"",name:"port",required:!1,type:{name:"number"}},reconnect:{defaultValue:null,description:"",name:"reconnect",required:!1,type:{name:"boolean"}},reconnectDelayHandler:{defaultValue:null,description:"",name:"reconnectDelayHandler",required:!1,type:{name:"(() => number)"}},reconnectJitter:{defaultValue:null,description:"",name:"reconnectJitter",required:!1,type:{name:"number"}},reconnectJitterTLS:{defaultValue:null,description:"",name:"reconnectJitterTLS",required:!1,type:{name:"number"}},reconnectTimeWait:{defaultValue:null,description:"",name:"reconnectTimeWait",required:!1,type:{name:"number"}},servers:{defaultValue:null,description:"",name:"servers",required:!1,type:{name:"string | string[]"}},timeout:{defaultValue:null,description:"",name:"timeout",required:!1,type:{name:"number"}},tls:{defaultValue:null,description:"",name:"tls",required:!1,type:{name:"TlsOptions"}},token:{defaultValue:null,description:"",name:"token",required:!1,type:{name:"string"}},user:{defaultValue:null,description:"",name:"user",required:!1,type:{name:"string"}},verbose:{defaultValue:null,description:"",name:"verbose",required:!1,type:{name:"boolean"}},waitOnFirstConnect:{defaultValue:null,description:"",name:"waitOnFirstConnect",required:!1,type:{name:"boolean"}},ignoreClusterUpdates:{defaultValue:null,description:"",name:"ignoreClusterUpdates",required:!1,type:{name:"boolean"}},inboxPrefix:{defaultValue:null,description:"",name:"inboxPrefix",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["lib/utils/index.tsx#setDefaultNatsConnectionOptions"]={docgenInfo:setDefaultNatsConnectionOptions.__docgenInfo,name:"setDefaultNatsConnectionOptions",path:"lib/utils/index.tsx#setDefaultNatsConnectionOptions"})}catch(__react_docgen_typescript_loader_error){}try{getNatsConnection.displayName="getNatsConnection",getNatsConnection.__docgenInfo={description:"",displayName:"getNatsConnection",props:{authenticator:{defaultValue:null,description:"",name:"authenticator",required:!1,type:{name:"Authenticator"}},debug:{defaultValue:null,description:"",name:"debug",required:!1,type:{name:"boolean"}},maxPingOut:{defaultValue:null,description:"",name:"maxPingOut",required:!1,type:{name:"number"}},maxReconnectAttempts:{defaultValue:null,description:"",name:"maxReconnectAttempts",required:!1,type:{name:"number"}},name:{defaultValue:null,description:"",name:"name",required:!1,type:{name:"string"}},noEcho:{defaultValue:null,description:"",name:"noEcho",required:!1,type:{name:"boolean"}},noRandomize:{defaultValue:null,description:"",name:"noRandomize",required:!1,type:{name:"boolean"}},pass:{defaultValue:null,description:"",name:"pass",required:!1,type:{name:"string"}},pedantic:{defaultValue:null,description:"",name:"pedantic",required:!1,type:{name:"boolean"}},pingInterval:{defaultValue:null,description:"",name:"pingInterval",required:!1,type:{name:"number"}},port:{defaultValue:null,description:"",name:"port",required:!1,type:{name:"number"}},reconnect:{defaultValue:null,description:"",name:"reconnect",required:!1,type:{name:"boolean"}},reconnectDelayHandler:{defaultValue:null,description:"",name:"reconnectDelayHandler",required:!1,type:{name:"(() => number)"}},reconnectJitter:{defaultValue:null,description:"",name:"reconnectJitter",required:!1,type:{name:"number"}},reconnectJitterTLS:{defaultValue:null,description:"",name:"reconnectJitterTLS",required:!1,type:{name:"number"}},reconnectTimeWait:{defaultValue:null,description:"",name:"reconnectTimeWait",required:!1,type:{name:"number"}},servers:{defaultValue:null,description:"",name:"servers",required:!1,type:{name:"string | string[]"}},timeout:{defaultValue:null,description:"",name:"timeout",required:!1,type:{name:"number"}},tls:{defaultValue:null,description:"",name:"tls",required:!1,type:{name:"TlsOptions"}},token:{defaultValue:null,description:"",name:"token",required:!1,type:{name:"string"}},user:{defaultValue:null,description:"",name:"user",required:!1,type:{name:"string"}},verbose:{defaultValue:null,description:"",name:"verbose",required:!1,type:{name:"boolean"}},waitOnFirstConnect:{defaultValue:null,description:"",name:"waitOnFirstConnect",required:!1,type:{name:"boolean"}},ignoreClusterUpdates:{defaultValue:null,description:"",name:"ignoreClusterUpdates",required:!1,type:{name:"boolean"}},inboxPrefix:{defaultValue:null,description:"",name:"inboxPrefix",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["lib/utils/index.tsx#getNatsConnection"]={docgenInfo:getNatsConnection.__docgenInfo,name:"getNatsConnection",path:"lib/utils/index.tsx#getNatsConnection"})}catch(__react_docgen_typescript_loader_error){}try{useDataChest.displayName="useDataChest",useDataChest.__docgenInfo={description:"",displayName:"useDataChest",props:{apply:{defaultValue:null,description:"Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.\n@param thisArg The object to be used as the this object.\n@param argArray A set of arguments to be passed to the function.",name:"apply",required:!0,type:{name:"(this: Function, thisArg: any, argArray?: any) => any"}},call:{defaultValue:null,description:"Calls a method of an object, substituting another object for the current object.\n@param thisArg The object to be used as the current object.\n@param argArray A list of arguments to be passed to the method.",name:"call",required:!0,type:{name:"(this: Function, thisArg: any, ...argArray: any[]) => any"}},bind:{defaultValue:null,description:"For a given function, creates a bound function that has the same body as the original function.\nThe this object of the bound function is associated with the specified object, and has the specified initial parameters.\n@param thisArg An object to which the this keyword can refer inside the new function.\n@param argArray A list of arguments to be passed to the new function.",name:"bind",required:!0,type:{name:"(this: Function, thisArg: any, ...argArray: any[]) => any"}},toString:{defaultValue:null,description:"Returns a string representation of a function.",name:"toString",required:!1,type:{name:"() => string"}},prototype:{defaultValue:null,description:"",name:"prototype",required:!0,type:{name:"any"}},length:{defaultValue:null,description:"",name:"length",required:!0,type:{name:"number"}},arguments:{defaultValue:null,description:"",name:"arguments",required:!0,type:{name:"any"}},caller:{defaultValue:null,description:"",name:"caller",required:!0,type:{name:"Function"}},name:{defaultValue:null,description:"Returns the name of the function. Function names are read-only and can not be changed.",name:"name",required:!0,type:{name:"string"}},"__@hasInstance@261":{defaultValue:null,description:"Determines whether the given value inherits from this function if this function was used\nas a constructor function.\n\nA constructor function can control which objects are recognized as its instances by\n'instanceof' by overriding this method.",name:"__@hasInstance@261",required:!0,type:{name:"(value: any) => boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["lib/index.tsx#useDataChest"]={docgenInfo:useDataChest.__docgenInfo,name:"useDataChest",path:"lib/index.tsx#useDataChest"})}catch(__react_docgen_typescript_loader_error){}try{setDefaultNatsConnectionOptions.displayName="setDefaultNatsConnectionOptions",setDefaultNatsConnectionOptions.__docgenInfo={description:"",displayName:"setDefaultNatsConnectionOptions",props:{authenticator:{defaultValue:null,description:"",name:"authenticator",required:!1,type:{name:"Authenticator"}},debug:{defaultValue:null,description:"",name:"debug",required:!1,type:{name:"boolean"}},maxPingOut:{defaultValue:null,description:"",name:"maxPingOut",required:!1,type:{name:"number"}},maxReconnectAttempts:{defaultValue:null,description:"",name:"maxReconnectAttempts",required:!1,type:{name:"number"}},name:{defaultValue:null,description:"",name:"name",required:!1,type:{name:"string"}},noEcho:{defaultValue:null,description:"",name:"noEcho",required:!1,type:{name:"boolean"}},noRandomize:{defaultValue:null,description:"",name:"noRandomize",required:!1,type:{name:"boolean"}},pass:{defaultValue:null,description:"",name:"pass",required:!1,type:{name:"string"}},pedantic:{defaultValue:null,description:"",name:"pedantic",required:!1,type:{name:"boolean"}},pingInterval:{defaultValue:null,description:"",name:"pingInterval",required:!1,type:{name:"number"}},port:{defaultValue:null,description:"",name:"port",required:!1,type:{name:"number"}},reconnect:{defaultValue:null,description:"",name:"reconnect",required:!1,type:{name:"boolean"}},reconnectDelayHandler:{defaultValue:null,description:"",name:"reconnectDelayHandler",required:!1,type:{name:"(() => number)"}},reconnectJitter:{defaultValue:null,description:"",name:"reconnectJitter",required:!1,type:{name:"number"}},reconnectJitterTLS:{defaultValue:null,description:"",name:"reconnectJitterTLS",required:!1,type:{name:"number"}},reconnectTimeWait:{defaultValue:null,description:"",name:"reconnectTimeWait",required:!1,type:{name:"number"}},servers:{defaultValue:null,description:"",name:"servers",required:!1,type:{name:"string | string[]"}},timeout:{defaultValue:null,description:"",name:"timeout",required:!1,type:{name:"number"}},tls:{defaultValue:null,description:"",name:"tls",required:!1,type:{name:"TlsOptions"}},token:{defaultValue:null,description:"",name:"token",required:!1,type:{name:"string"}},user:{defaultValue:null,description:"",name:"user",required:!1,type:{name:"string"}},verbose:{defaultValue:null,description:"",name:"verbose",required:!1,type:{name:"boolean"}},waitOnFirstConnect:{defaultValue:null,description:"",name:"waitOnFirstConnect",required:!1,type:{name:"boolean"}},ignoreClusterUpdates:{defaultValue:null,description:"",name:"ignoreClusterUpdates",required:!1,type:{name:"boolean"}},inboxPrefix:{defaultValue:null,description:"",name:"inboxPrefix",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["lib/index.tsx#setDefaultNatsConnectionOptions"]={docgenInfo:setDefaultNatsConnectionOptions.__docgenInfo,name:"setDefaultNatsConnectionOptions",path:"lib/index.tsx#setDefaultNatsConnectionOptions"})}catch(__react_docgen_typescript_loader_error){}try{getNatsConnection.displayName="getNatsConnection",getNatsConnection.__docgenInfo={description:"",displayName:"getNatsConnection",props:{authenticator:{defaultValue:null,description:"",name:"authenticator",required:!1,type:{name:"Authenticator"}},debug:{defaultValue:null,description:"",name:"debug",required:!1,type:{name:"boolean"}},maxPingOut:{defaultValue:null,description:"",name:"maxPingOut",required:!1,type:{name:"number"}},maxReconnectAttempts:{defaultValue:null,description:"",name:"maxReconnectAttempts",required:!1,type:{name:"number"}},name:{defaultValue:null,description:"",name:"name",required:!1,type:{name:"string"}},noEcho:{defaultValue:null,description:"",name:"noEcho",required:!1,type:{name:"boolean"}},noRandomize:{defaultValue:null,description:"",name:"noRandomize",required:!1,type:{name:"boolean"}},pass:{defaultValue:null,description:"",name:"pass",required:!1,type:{name:"string"}},pedantic:{defaultValue:null,description:"",name:"pedantic",required:!1,type:{name:"boolean"}},pingInterval:{defaultValue:null,description:"",name:"pingInterval",required:!1,type:{name:"number"}},port:{defaultValue:null,description:"",name:"port",required:!1,type:{name:"number"}},reconnect:{defaultValue:null,description:"",name:"reconnect",required:!1,type:{name:"boolean"}},reconnectDelayHandler:{defaultValue:null,description:"",name:"reconnectDelayHandler",required:!1,type:{name:"(() => number)"}},reconnectJitter:{defaultValue:null,description:"",name:"reconnectJitter",required:!1,type:{name:"number"}},reconnectJitterTLS:{defaultValue:null,description:"",name:"reconnectJitterTLS",required:!1,type:{name:"number"}},reconnectTimeWait:{defaultValue:null,description:"",name:"reconnectTimeWait",required:!1,type:{name:"number"}},servers:{defaultValue:null,description:"",name:"servers",required:!1,type:{name:"string | string[]"}},timeout:{defaultValue:null,description:"",name:"timeout",required:!1,type:{name:"number"}},tls:{defaultValue:null,description:"",name:"tls",required:!1,type:{name:"TlsOptions"}},token:{defaultValue:null,description:"",name:"token",required:!1,type:{name:"string"}},user:{defaultValue:null,description:"",name:"user",required:!1,type:{name:"string"}},verbose:{defaultValue:null,description:"",name:"verbose",required:!1,type:{name:"boolean"}},waitOnFirstConnect:{defaultValue:null,description:"",name:"waitOnFirstConnect",required:!1,type:{name:"boolean"}},ignoreClusterUpdates:{defaultValue:null,description:"",name:"ignoreClusterUpdates",required:!1,type:{name:"boolean"}},inboxPrefix:{defaultValue:null,description:"",name:"inboxPrefix",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["lib/index.tsx#getNatsConnection"]={docgenInfo:getNatsConnection.__docgenInfo,name:"getNatsConnection",path:"lib/index.tsx#getNatsConnection"})}catch(__react_docgen_typescript_loader_error){}__webpack_exports__.default={title:"Basics"};var _search2,Basics_stories_Operator=function Operator(){return Object(react.useEffect)((function(){getNatsConnection_setDefaultNatsConnectionOptions({servers:demo.servers}),collectioner.search({}).then((function(v){return console.log(v)}))}),[]),null},Basics_stories_DataChest=function DataChest(){var collection=useDataChest_useDataChest([]);return Object(react.useEffect)((function(){getNatsConnection_setDefaultNatsConnectionOptions({servers:demo.servers}),collectioner.search({}).then(collection.set)}),[]),react_default.a.createElement("div",null,JSON.stringify(collection.get(),null,2))},Basics_stories_ReactiveDataChest=function ReactiveDataChest(){var collection=useDataChest_useDataChest([]),data=collection.use();return Object(react.useEffect)((function(){getNatsConnection_setDefaultNatsConnectionOptions({servers:demo.servers}),collectioner.search({}).then(collection.set)}),[]),react_default.a.createElement("div",null,JSON.stringify(data,null,2))},demo={servers:"ws://192.168.200.49:2222",searchSubject:"DS.DCM.DATACENTER.REQUEST.SEARCH.DEFAULT"},codec=Object(nats.JSONCodec)(),collectioner={search:(_search2=asyncToGenerator_default()(regenerator_default.a.mark((function _callee(_search){var connection,message,data;return regenerator_default.a.wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,getNatsConnection_getNatsConnection();case 2:return connection=_context.sent,_context.next=5,connection.request(demo.searchSubject,codec.encode(_search));case 5:return message=_context.sent,data=codec.decode(message.data),_context.abrupt("return",data);case 8:case"end":return _context.stop()}}),_callee)}))),function search(_x){return _search2.apply(this,arguments)})};Basics_stories_Operator.parameters=extends_default()({storySource:{source:"() => {\n  useEffect(() => {\n    setDefaultNatsConnectionOptions({ servers: demo.servers });\n    collectioner.search({}).then(v => console.log(v));\n  }, []);\n  return null;\n}"}},Basics_stories_Operator.parameters),Basics_stories_DataChest.parameters=extends_default()({storySource:{source:"() => {\n  const collection = useDataChest<object[]>([]);\n  useEffect(() => {\n    setDefaultNatsConnectionOptions({ servers: demo.servers });\n    collectioner.search({}).then(collection.set);\n  }, []);\n  return <div>{JSON.stringify(collection.get(), null, 2)}</div>;\n}"}},Basics_stories_DataChest.parameters),Basics_stories_ReactiveDataChest.parameters=extends_default()({storySource:{source:"() => {\n  const collection = useDataChest<object[]>([]);\n  const data = collection.use();\n  useEffect(() => {\n    setDefaultNatsConnectionOptions({ servers: demo.servers });\n    collectioner.search({}).then(collection.set);\n  }, []);\n  return <div>{JSON.stringify(data, null, 2)}</div>;\n}"}},Basics_stories_ReactiveDataChest.parameters)},"./generated-stories-entry.js":function(module,exports,__webpack_require__){"use strict";(function(module){(0,__webpack_require__("../../node_modules/@storybook/react/dist/esm/client/index.js").configure)([__webpack_require__("./docs/stories sync recursive ^\\.(?:(?:^|[\\\\/]|(?:(?:(?!(?:^|[\\\\/])\\.).)*?)[\\\\/])(?!\\.)(?=.)[^\\\\/]*?\\.stories\\.mdx)$"),__webpack_require__("./docs/stories sync recursive ^\\.(?:(?:^|[\\\\/]|(?:(?:(?!(?:^|[\\\\/])\\.).)*?)[\\\\/])(?!\\.)(?=.)[^\\\\/]*?\\.stories\\.(js|jsx|ts|tsx))$")],module,!1)}).call(this,__webpack_require__("../../node_modules/@storybook/builder-webpack4/node_modules/webpack/buildin/module.js")(module))},"./storybook-init-framework-entry.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__("../../node_modules/@storybook/react/dist/esm/client/index.js")},0:function(module,exports,__webpack_require__){__webpack_require__("../../node_modules/@storybook/core-client/dist/esm/globals/polyfills.js"),__webpack_require__("../../node_modules/@storybook/core-client/dist/esm/globals/globals.js"),__webpack_require__("./storybook-init-framework-entry.js"),__webpack_require__("../../node_modules/@storybook/addon-docs/dist/esm/frameworks/common/config.js-generated-config-entry.js"),__webpack_require__("../../node_modules/@storybook/addon-docs/dist/esm/frameworks/react/config.js-generated-config-entry.js"),__webpack_require__("../../node_modules/@storybook/react/dist/esm/client/preview/config-generated-config-entry.js"),__webpack_require__("../../node_modules/@storybook/addon-actions/dist/esm/preset/addDecorator.js-generated-config-entry.js"),__webpack_require__("../../node_modules/@storybook/addon-actions/dist/esm/preset/addArgs.js-generated-config-entry.js"),__webpack_require__("../../node_modules/@storybook/addon-backgrounds/dist/esm/preset/addDecorator.js-generated-config-entry.js"),__webpack_require__("../../node_modules/@storybook/addon-backgrounds/dist/esm/preset/addParameter.js-generated-config-entry.js"),__webpack_require__("../../node_modules/@storybook/addon-measure/dist/esm/preset/addDecorator.js-generated-config-entry.js"),__webpack_require__("../../node_modules/@storybook/addon-outline/dist/esm/preset/addDecorator.js-generated-config-entry.js"),__webpack_require__("./docs/preview.tsx-generated-config-entry.js"),module.exports=__webpack_require__("./generated-stories-entry.js")},1:function(module,exports){}},[[0,5,6]]]);