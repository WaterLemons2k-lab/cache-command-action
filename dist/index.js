'use strict';

var node_fs = require('node:fs');
var cache = require('@actions/cache');
var core = require('@actions/core');
var exec = require('@actions/exec');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var cache__namespace = /*#__PURE__*/_interopNamespaceDefault(cache);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * Create a empty file
 * @param file File to be created
 */
var _createFile = function (file) {
    node_fs.closeSync(node_fs.openSync(file, 'w'));
};
/**
 * Delete a file
 * @param file File to be deleted
 */
var _deleteFile = function (file) {
    node_fs.unlinkSync(file);
};

/**
 * Return true if found the cache, otherwize return false.
 * @param file The file to be found from the cache
 * @param output an explicit output for found the cache
 * @returns boolean
 */
function isCacheFound(file, output) {
    return __awaiter(this, void 0, void 0, function () {
        var cacheOutput, cacheId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cache__namespace.restoreCache([file], output, [], {
                        lookupOnly: true,
                    })];
                case 1:
                    cacheOutput = _a.sent();
                    if (!!cacheOutput) return [3 /*break*/, 3];
                    // Create a cache file to be used as a placeholder before saving cache
                    _createFile(file);
                    return [4 /*yield*/, cache__namespace.saveCache([file], output)];
                case 2:
                    cacheId = _a.sent();
                    if (cacheId !== -1) {
                        console.log("Cache saved with output: ".concat(output));
                    }
                    // Delete the file after saving cache as it is no longer needed
                    _deleteFile(file);
                    return [2 /*return*/, false];
                case 3:
                    console.log("Cache found from output: ".concat(output));
                    return [2 /*return*/, true];
            }
        });
    });
}

/**
 * Exec a command and gets the output.
 * Output will be streamed to the live console.
 * Returns promise with the stdout
 * @param command command to execute (can include additional args).
 * Must be correctly escaped.
 * @returns Promise<string> stdout
 */
var getCommandOutput = function (command) { return __awaiter(void 0, void 0, void 0, function () {
    var stdout, output;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                core.startGroup('Getting command output');
                return [4 /*yield*/, exec.getExecOutput(command)];
            case 1:
                stdout = (_a.sent()).stdout;
                output = stdout.trim();
                if (output.length === 0) {
                    throw new Error("The stdout of ".concat(command, " cannot be null or empty!"));
                }
                core.endGroup();
                return [2 /*return*/, output];
        }
    });
}); };

var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var output, file, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, getCommandOutput(core.getInput('run', { required: true }))];
            case 1:
                output = _c.sent();
                core.setOutput('output', output);
                file = '.cache-command-action-file';
                // Set the output hit depending on whether the cache is found or not
                _a = core.setOutput;
                _b = ['hit'];
                return [4 /*yield*/, isCacheFound(file, output)];
            case 2:
                // Set the output hit depending on whether the cache is found or not
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); };
run().catch(function (err) {
    // Ensure output hit is false
    core.setOutput('hit', false);
    core.setFailed(err.message);
});
