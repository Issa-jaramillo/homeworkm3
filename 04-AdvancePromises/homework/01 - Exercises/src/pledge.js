'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor) {

    if(typeof executor !== "function") throw TypeError(
        "Executor must be a function"
    );
    this._state = 'pending';
    this._handleGroups = [];

    executor(
     this._internalResolve.bind(this),
     this._internalReject.bind(this)
     );
}
$Promise.prototype._internalResolve = function(value) {
    if(this._state === "pendind"){
    this._state = "fultfilled";
    this._value = value;
    this._callHandlers();

}
}
$Promise.prototype._internalReject = function(reason){
    if(this._state === 'pending'){
        this._state = "rejected";
        this._value = reason;
        this._callHandlers();
    }
}


$Promise.prototype._callHandlers = function(){
    while(this._handleGroups.length){
        const hd = this._handleGroups.shift();
        if(this._state === "fulfilled"){
            if(hd.successCb){
                hd.successCb(this._value);
            }
        } else if(this._state === "rejected"){
            if(hd.errorCb){
                hd.errorCb(this._value);
            }
        }
    }
}

$Promise.prototype.then = function(successCb, errorCb){
    if(typeof successCb !== "function" ) successCb = false;
    if(typeof errorCb !== "function" ) errorCb = false;
 this._handleGroups.push({
    successCb,
    errorCb
 })
 if(this._state !== "pending") this._callHandlers();
}

$Promise.prototype.catch = function(errorCb){
return this.then(null, errorCb);
}

const promise = new $Promise(resolve, reject => {
 //promise._internalResolve()
 resolve("value");
 //resolve("new value")
});



const otraPromesa = new $Promise("hola");


promise
.then("hola", e1)
.then(s2, 8)
.then(null, 8)
.then(null, 8)
.then(null, 8)
.then(null, e5)

_handleGroups = [
    { successCb: false, errorCb: e1 },
    { successCb: s2, errorCb: false },
    { successCb: s2, errorCb: false },
    { successCb: s2, errorCb: false },
    { successCb: s2, errorCb: false }
]

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
