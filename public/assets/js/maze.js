/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/component/inputText.ts":
/*!************************************!*\
  !*** ./src/component/inputText.ts ***!
  \************************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
var Component;
(function (Component) {
    class InputText extends Phaser.Text {
        constructor(game, x, y, width, height, maxLength, text, style) {
            super(game, x, y, text, style);
            this.isFocus = false;
            this.placeholder = 'Input Text';
            if (text.length == 0) {
                text = this.placeholder;
            }
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.text = text;
            this.maxLength = maxLength ? maxLength : 20;
            let group = this.game.add.group();
            let graphics = this.game.make.graphics();
            graphics.lineStyle(2, 0x000000, 1);
            // graphics.beginFill(0xFF700B, 1);
            graphics.drawRect(x, y, width, height);
            // graphics.endFill();
            group.add(graphics);
            this.phaserText = this.game.add.text(x, y, text, style);
            this.phaserText.setTextBounds(0, 0, width, height);
            this.phaserText.alpha = 0.6;
            this.phaserText.inputEnabled = true;
            this.phaserText.events.onInputDown.add((sprite, pointer) => {
                this.isFocus = true;
                this.phaserText.alpha = 1;
            }, this);
            this.game.input.onDown.add((sprite, pointer) => {
                let textX = this.phaserText.world.x;
                let textWidth = this.phaserText.width;
                let textY = this.phaserText.world.y;
                let textHeight = this.phaserText.height;
                if (pointer.clientX > textX && pointer.clientX <= textX + textWidth) {
                    if (pointer.clientY > textY && pointer.clientY <= textY + textHeight) {
                        this.isFocus = true;
                        this.phaserText.alpha = 1;
                        return;
                    }
                }
                this.phaserText.alpha = 0.6;
                this.isFocus = false;
            }, this);
            this.game.input.keyboard.addCallbacks(this, (e) => {
                if (!this.isFocus) {
                    return;
                }
                if (e.keyCode == Phaser.Keyboard.BACKSPACE) {
                    this.phaserText.text = this.phaserText.text.slice(0, -1);
                    return;
                }
                if (this.phaserText.text.length + 1 > this.maxLength) {
                    return;
                }
                this.phaserText.text += e.key;
                this.text = this.phaserText.text;
            });
        }
        render() {
        }
    }
    Component.InputText = InputText;
})(Component || (Component = {}));


/***/ }),

/***/ "./src/controller/serviceController.ts":
/*!*********************************************!*\
  !*** ./src/controller/serviceController.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ServiceController; });
/* harmony import */ var _services_stageService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/stageService */ "./src/services/stageService.ts");
/* harmony import */ var _services_authService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/authService */ "./src/services/authService.ts");
/* harmony import */ var _services_recordService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/recordService */ "./src/services/recordService.ts");



class ServiceController {
    constructor(game) {
        this.game = game;
        this.stageService = new _services_stageService__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.authService = new _services_authService__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.recordService = new _services_recordService__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.stateController = game.stateController;
    }
    login(userId, callback) {
        this.authService.login(userId, callback);
    }
    registerUser(user) {
        this.authService.registerUser(user);
    }
    getRecord() {
        const userId = this.authService.getLastLoggedInUser().userId;
        debugger;
        const record = this.recordService.getRecord(userId);
        return record;
    }
    getStageInformation() {
        return this.stageService.stageMap;
    }
    recordRank(record) {
        this.recordService.setRecord(record);
    }
}


/***/ }),

/***/ "./src/controller/stateController.ts":
/*!*******************************************!*\
  !*** ./src/controller/stateController.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StateController; });
/* harmony import */ var _state_intro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state/intro */ "./src/state/intro.ts");
/* harmony import */ var _state_login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../state/login */ "./src/state/login.ts");
/* harmony import */ var _state_level__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state/level */ "./src/state/level.ts");
/* harmony import */ var _state_play__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/play */ "./src/state/play.ts");
/* harmony import */ var _state_register__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../state/register */ "./src/state/register.ts");





class StateController {
    constructor() {
    }
    initialize(game, width, height) {
        this.stateManager = new Phaser.StateManager(game);
        this.game = game;
        this.game.state = this.stateManager;
        this.width = width;
        this.height = height;
        this.init();
    }
    startState(state) {
        let startingState = 'Intro';
        // let startingState = 'Stage';
        if (state === 'undefined' || state === null) {
            startingState = state;
        }
        this.goState(startingState, true, true, 'Horror Maze');
    }
    goState(state, clearWorld, clearCache, ...args) {
        if (!this.stateManager.checkState(state)) {
            throw new Error(`This state(${state}) does not exist!`);
        }
        this.stateManager.start(state, clearWorld, clearCache, ...args);
    }
    init() {
        this.add('Intro', _state_intro__WEBPACK_IMPORTED_MODULE_0__["Intro"], true);
        this.add('Login', _state_login__WEBPACK_IMPORTED_MODULE_1__["Login"], false);
        this.add('Register', _state_register__WEBPACK_IMPORTED_MODULE_4__["Register"], false);
        this.add('Level', _state_level__WEBPACK_IMPORTED_MODULE_2__["Level"], false);
        this.add('Play', _state_play__WEBPACK_IMPORTED_MODULE_3__["Play"], false);
    }
    add(key, state, authStart) {
        this.stateManager.add(key, state, authStart);
    }
}


/***/ }),

/***/ "./src/dao/dao.ts":
/*!************************!*\
  !*** ./src/dao/dao.ts ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DAO; });
class DAO {
    constructor(session) {
        this.session = session;
    }
}


/***/ }),

/***/ "./src/dao/recordDao.ts":
/*!******************************!*\
  !*** ./src/dao/recordDao.ts ***!
  \******************************/
/*! exports provided: RecordDao */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecordDao", function() { return RecordDao; });
/* harmony import */ var _dao__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao */ "./src/dao/dao.ts");
/* harmony import */ var _vo_record__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/record */ "./src/vo/record.ts");


class RecordDao extends _dao__WEBPACK_IMPORTED_MODULE_0__["default"] {
    insert(table, obj) {
        // const recordDatabase = {};
        // recordDatabase[obj.userId] = obj.toString();
        debugger;
        this.session.set(table, obj.userId, obj.toString());
        return obj;
    }
    select(table, userId) {
        debugger;
        const recordData = this.session.get(table, userId);
        const record = _vo_record__WEBPACK_IMPORTED_MODULE_1__["default"].by(recordData);
        return record;
    }
    update(table, userId, obj) {
        this.session.set(table, userId, obj.toString());
        return obj;
    }
    delete(table, userId) {
        let isSuccess = true;
        try {
            this.session.remove(table, userId);
        }
        catch (_a) {
            isSuccess = false;
        }
        return isSuccess;
    }
    selectAll(table) {
        const objs = this.session.allStorage();
        const obj = objs[table];
        return obj;
    }
}


/***/ }),

/***/ "./src/dao/userDao.ts":
/*!****************************!*\
  !*** ./src/dao/userDao.ts ***!
  \****************************/
/*! exports provided: UserDao */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserDao", function() { return UserDao; });
/* harmony import */ var _dao__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao */ "./src/dao/dao.ts");
/* harmony import */ var _vo_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/user */ "./src/vo/user.ts");


class UserDao extends _dao__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.userKey = 'mazeUserRepo';
    }
    insert(table, obj) {
        // const userDatabase = {};
        // userDatabase[obj.userId] = obj.toString();
        debugger;
        this.session.set(table, obj.userId, obj.toString());
        return obj;
    }
    select(table, userId) {
        const userStr = this.session.get(table, userId);
        const user = _vo_user__WEBPACK_IMPORTED_MODULE_1__["default"].by(userStr);
        return user;
    }
    update(table, userId, obj) {
        this.session.set(table, userId, obj.toString());
        return obj;
    }
    delete(table, userId) {
        let isSuccess = true;
        try {
            this.session.remove(table, userId);
        }
        catch (_a) {
            isSuccess = false;
        }
        return isSuccess;
    }
    selectAll(table) {
        const objs = this.session.allStorage();
        const obj = objs[table];
        return obj;
    }
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _maze__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maze */ "./src/maze.ts");
// import * as g from './maze'

window.onload = () => {
    const width = 640;
    const height = 600; // 120 * 420
    const parentId = 'game';
    // Should be initialize game object and run
    const maze = new _maze__WEBPACK_IMPORTED_MODULE_0__["Game"].Maze(width, height, parentId);
};


/***/ }),

/***/ "./src/maze.ts":
/*!*********************!*\
  !*** ./src/maze.ts ***!
  \*********************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
/* harmony import */ var _controller_serviceController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller/serviceController */ "./src/controller/serviceController.ts");
/* harmony import */ var _controller_stateController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller/stateController */ "./src/controller/stateController.ts");
/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts" />


var Game;
(function (Game) {
    class Maze extends Phaser.Game {
        constructor(width, height, parentId) {
            super(width, height, Phaser.AUTO, parentId, null, false, true, null);
            this.serviceController = new _controller_serviceController__WEBPACK_IMPORTED_MODULE_0__["default"](this);
            this.stateController = new _controller_stateController__WEBPACK_IMPORTED_MODULE_1__["default"]();
            this.stateController.initialize(this, width, height);
            this.stateController.startState();
        }
    }
    Game.Maze = Maze;
})(Game || (Game = {}));


/***/ }),

/***/ "./src/services/authService.ts":
/*!*************************************!*\
  !*** ./src/services/authService.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AuthService; });
/* harmony import */ var _dao_userDao__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dao/userDao */ "./src/dao/userDao.ts");
/* harmony import */ var _session_localStorageSession__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../session/localStorageSession */ "./src/session/localStorageSession.ts");


class AuthService {
    constructor() {
        this.TABLE_LAST_LOGGED_IN = 'lastLoggedInUser';
        this.USER_TABLE = 'mazeUserRepo';
        this.session = new _session_localStorageSession__WEBPACK_IMPORTED_MODULE_1__["LocalStorageSession"]();
        this.userDao = new _dao_userDao__WEBPACK_IMPORTED_MODULE_0__["UserDao"](this.session);
    }
    initialize() {
    }
    getLastLoggedInUser() {
        const obj = this.userDao.selectAll(this.TABLE_LAST_LOGGED_IN);
        let userObj;
        let user;
        debugger;
        try {
            userObj = JSON.parse(obj);
            const userId = Object.keys(userObj)[0];
            user = userObj[userId];
            user = JSON.parse(user);
        }
        catch (e) {
            user = null;
        }
        return user;
    }
    registerUser(user) {
        this.userDao.insert(this.USER_TABLE, user);
        this.userDao.insert(this.TABLE_LAST_LOGGED_IN, user);
    }
    login(userId, callback) {
        const user = this.userDao.select(this.USER_TABLE, userId);
        if (user) {
            callback(user, true);
        }
        else {
            callback(null, false);
        }
    }
    logout(userId) {
        //TODO: implements it.
        const user = this.userDao.select(this.USER_TABLE, userId);
        console.log('next user would be removed.');
        console.log(user);
        this.userDao.delete(this.USER_TABLE, userId);
    }
}


/***/ }),

/***/ "./src/services/recordService.ts":
/*!***************************************!*\
  !*** ./src/services/recordService.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RecordService; });
/* harmony import */ var _session_localStorageSession__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../session/localStorageSession */ "./src/session/localStorageSession.ts");
/* harmony import */ var _dao_recordDao__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dao/recordDao */ "./src/dao/recordDao.ts");


class RecordService {
    constructor() {
        this.RECORD_TABLE = 'mazeRecordRepo';
        this.session = new _session_localStorageSession__WEBPACK_IMPORTED_MODULE_0__["LocalStorageSession"]();
        this.recordDao = new _dao_recordDao__WEBPACK_IMPORTED_MODULE_1__["RecordDao"](this.session);
    }
    initialize() {
        throw new Error("Method not implemented.");
    }
    getRecord(userId) {
        const record = this.recordDao.select(this.RECORD_TABLE, userId);
        return record;
    }
    setRecord(record) {
        this.recordDao.insert(this.RECORD_TABLE, record);
    }
}


/***/ }),

/***/ "./src/services/stageService.ts":
/*!**************************************!*\
  !*** ./src/services/stageService.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StageService; });
/* harmony import */ var _vo_stage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vo/stage */ "./src/vo/stage.ts");
/* harmony import */ var _vo_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/point */ "./src/vo/point.ts");


class StageService {
    constructor() {
        this.stageMap = {};
        this.generateStageMap();
    }
    initialize() {
    }
    getStageInformation(userId) {
    }
    generateStageMap() {
        for (let i = 0; i < 3; i++) {
            let zeroFormat = '000' + i;
            let mapSeq = zeroFormat.slice(-3);
            const floorPath = 'assets/img/maps/floor-' + mapSeq + '.png';
            const wallPath = 'assets/img/maps/walls-' + mapSeq + '.png';
            // const stage = new Stage(i, floorPath, wallPath, Point.on(235, 85));
            const stage = new _vo_stage__WEBPACK_IMPORTED_MODULE_0__["Stage"](i, floorPath, wallPath, [
                _vo_point__WEBPACK_IMPORTED_MODULE_1__["Point"].on(235, 85),
                _vo_point__WEBPACK_IMPORTED_MODULE_1__["Point"].on(565, 400)
            ]);
            this.stageMap[i] = stage;
        }
    }
}


/***/ }),

/***/ "./src/session/localStorageSession.ts":
/*!********************************************!*\
  !*** ./src/session/localStorageSession.ts ***!
  \********************************************/
/*! exports provided: LocalStorageSession */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalStorageSession", function() { return LocalStorageSession; });
class LocalStorageSession {
    get(table, key) {
        const tableData = localStorage.getItem(table) || null;
        if (!tableData) {
            return null;
        }
        const tableJsonObj = JSON.parse(tableData);
        let item = tableJsonObj[key];
        if (typeof item === 'object') {
            return item;
        }
        if (typeof item === 'string') {
            let obj = JSON.parse(item);
            return obj;
        }
        return item;
    }
    set(table, key, value) {
        const originalDataObj = this.get(table, key);
        if (!originalDataObj) {
            let data = {};
            data[key] = value;
            localStorage.setItem(table, JSON.stringify(data));
        }
        else {
            debugger;
            let jsonValue = JSON.parse(value);
            let data = {};
            data[key] = jsonValue;
            let data2 = {};
            data2[key] = originalDataObj;
            // const obj = Object.assign({}, data, data2);
            const obj = this.extend(data, data2);
            localStorage.setItem(table, JSON.stringify(obj));
            // let jsonValue = JSON.parse(value);
            // jsonValue[key] = JSON.parse(jsonValue[key]);
            // let temp = JSON.parse(originalDataObj);
            // let originalDataJson = {};
            // originalDataJson[key] = temp;
            // const obj = Object.assign({}, originalDataObj, jsonValue);
            // localStorage.setItem(table, JSON.stringify(obj));
        }
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    allStorage() {
        let archive = {};
        let keys = Object.keys(localStorage);
        let i = keys.length;
        while (i--) {
            archive[keys[i]] = localStorage.getItem(keys[i]);
        }
        return archive;
    }
    extend(...args) {
        let o, i, k;
        for (o = {}, i = 0; i < arguments.length; i++) {
            // if (arguments[i].constructor !== Object) continue;
            for (k in arguments[i]) {
                if (arguments[i].hasOwnProperty(k)) {
                    o[k] = arguments[i][k].constructor === Object ? this.extend(o[k] || {}, arguments[i][k]) : arguments[i][k];
                }
            }
        }
        return o;
    }
}


/***/ }),

/***/ "./src/state/base.ts":
/*!***************************!*\
  !*** ./src/state/base.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
class Base extends Phaser.State {
    constructor(game) {
        super();
        // For Ignoring non-exist property error.
        this.serviceController = game.serviceController;
        this.stateController = game.stateController;
    }
    goState(string) {
        this.serviceController;
    }
}


/***/ }),

/***/ "./src/state/intro.ts":
/*!****************************!*\
  !*** ./src/state/intro.ts ***!
  \****************************/
/*! exports provided: Intro */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Intro", function() { return Intro; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/state/base.ts");

class Intro extends _base__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(game) {
        super(game);
    }
    init(gameTitle) {
        this.gameTitle = gameTitle;
    }
    preload() {
    }
    create() {
        this.stage.backgroundColor = '#4488AA';
        this.logoText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, this.gameTitle, {
            font: '80px Arial;',
            fill: '#ffffff'
        });
        this.logoText.anchor.setTo(0.5, 0.5);
        this.logoText.alpha = 0.8;
        const p = this.game.world.bounds.bottomRight;
        const footer = this.game.add.text(p.x - 100, p.y - 30, 'v1.0, made with Phaser', {
            font: '15px Arial;',
            fill: '#eeeeee'
        });
        footer.anchor.setTo(0.5, 0.5);
        const self = this;
        setTimeout(function () {
            self.stateController.goState('Login');
        }, Intro.introInterval);
    }
    update() {
    }
}
Intro.introInterval = 1500;


/***/ }),

/***/ "./src/state/level.ts":
/*!****************************!*\
  !*** ./src/state/level.ts ***!
  \****************************/
/*! exports provided: Level */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Level", function() { return Level; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/state/base.ts");
/* harmony import */ var _vo_rank__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/rank */ "./src/vo/rank.ts");


class Level extends _base__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(game) {
        super(game);
        this.numberOfStage = 3;
    }
    init(stageMap) {
        this.stageMap = stageMap;
    }
    preload() {
        this.game.load.spritesheet('stageArrows', '../assets/img/stageArrows.png', 48, 48);
        this.record = this.serviceController.getRecord();
    }
    create() {
        this.game.stage.backgroundColor = '#9B9B9B';
        this.game.stage.alpha = 0.9;
        this.drawStageBtn();
        this.drawStageMoveBtn();
    }
    update() {
    }
    drawStageBtn() {
        const width = 200;
        const height = 200;
        let offsetX = (this.game.world.width - 150) / this.numberOfStage; // 150: padding
        let stageInfos = {};
        if (this.record) {
            stageInfos = this.record.records;
        }
        for (let i = 0; i < this.numberOfStage; i++) {
            let stageInfo;
            let stageInfoStr = '';
            if (stageInfos[i]) {
                stageInfo = stageInfos[i];
                stageInfoStr += '\nTime: ' + stageInfo.time + ' seconds';
                stageInfoStr += '\nRank: ' + _vo_rank__WEBPACK_IMPORTED_MODULE_1__["RankUtil"].valueOf(stageInfo.rank);
            }
            const stageBtnText = `Stage-${i + 1}` + stageInfoStr;
            const stageBtn = this.game.add.text(145 + (offsetX * i), 90, stageBtnText, {
                fill: '#ffffff',
                font: '15px Arial'
            });
            stageBtn.inputEnabled = true;
            stageBtn.input.useHandCursor = true;
            const stageNum = i + 1;
            const self = this;
            stageBtn.events.onInputDown.add((e) => {
                if (confirm(`Wanna Go to Stage-${stageNum}?`)) {
                    self.stateController.goState('Play', true, true, self.stageMap[i]);
                }
            }, this);
        }
    }
    drawStageMoveBtn() {
        const p = this.game.world.bounds;
        this.lowerStageBtn = this.game.add.button(100, this.game.world.centerY, "stageArrows", this.buttonClicked);
        this.higherStageBtn = this.game.add.button(100, this.game.world.centerY, "stageArrows", this.buttonClicked);
        this.lowerStageBtn.frame = 0;
        this.higherStageBtn.frame = 1;
        // Align stage page move btn
        this.lowerStageBtn.x = 20;
        this.higherStageBtn.x = p.right - 20 - this.higherStageBtn.width;
        const stageText = this.game.add.text(this.game.world.centerX, 50, 'Stage', {
            fill: '#ffffff',
            font: '20px Arial'
        });
        stageText.anchor.setTo(0.5, 0.5);
    }
    buttonClicked(button, pointer) {
        if (button.frame == 0) { // lowerStageBtn
        }
        else if (button.frame == 1) { // higherStageBtn
        }
    }
}


/***/ }),

/***/ "./src/state/login.ts":
/*!****************************!*\
  !*** ./src/state/login.ts ***!
  \****************************/
/*! exports provided: Login */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Login", function() { return Login; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/state/base.ts");

class Login extends _base__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(game) {
        super(game);
    }
    preload() {
        this.game.load.image('gameLogo', 'assets/img/gamelogo.png');
    }
    create() {
        this.stage.backgroundColor = '#FFFFFF';
        this.gameLogo = this.game.add.image(this.game.world.centerX, 210, 'gameLogo');
        this.gameLogo.anchor.setTo(0.5, 0.5);
        this.loginText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Login', {
            font: '35px Arial;',
            fill: '#000000'
        });
        this.loginText.anchor.setTo(0.5, 0.5);
        this.loginText.alpha = 0.8;
        this.loginText.inputEnabled = true;
        this.loginText.input.useHandCursor = true;
        const self = this;
        this.loginText.events.onInputDown.add((e) => {
            const tween = self.game.add.tween(self.loginText).to({
                alpha: 0.2
            }, 700, Phaser.Easing.Quadratic.Out, false, 0, 0, false);
            tween.onComplete.add((e) => {
                let user = self.serviceController.authService.getLastLoggedInUser();
                if (user && user.userId) {
                    self.serviceController.login(user.userId, (user, isSuccess) => {
                        if (isSuccess) {
                            alert(`${user.userId}님 환영합니다.`);
                            const stageInfo = self.serviceController.getStageInformation();
                            self.stateController.goState('Level', true, true, stageInfo);
                        }
                        else {
                            alert('예전에 방문하신 적이 없으시군요? 사용자 등록화면으로 이동합니다.');
                            self.stateController.goState('Register');
                        }
                    });
                }
                else {
                    alert('예전에 방문하신 적이 없으시군요? 사용자 등록화면으로 이동합니다.');
                    self.stateController.goState('Register');
                }
            }, self);
            tween.start();
        }, this);
        this.loginText.events.onInputOver.add((e) => {
            self.loginText.alpha = 0.5;
        }, this);
        this.loginText.events.onInputOut.add((e) => {
            self.loginText.alpha = 0.8;
        }, this);
    }
    update() {
    }
}


/***/ }),

/***/ "./src/state/play.ts":
/*!***************************!*\
  !*** ./src/state/play.ts ***!
  \***************************/
/*! exports provided: Play */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Play", function() { return Play; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/state/base.ts");
/* harmony import */ var _vo_record__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/record */ "./src/vo/record.ts");
/* harmony import */ var _vo_rank__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vo/rank */ "./src/vo/rank.ts");



class Play extends _base__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(game) {
        super(game);
        this.speed = 2;
    }
    init(stageInfo) {
        this.stageInfo = stageInfo;
        this.playerPath = 'assets/img/player-spreadsheet.png';
    }
    preload() {
        this.game.load.image('floor', this.stageInfo.floorFilePath);
        this.game.load.image('wall', this.stageInfo.wallFilePath);
        this.game.load.spritesheet('player', this.playerPath, 64, 64, 36);
        this.load.audio("wallCollisionSound", ["assets/mp3/beep-01a.mp3"]);
        this.load.audio("tadaSound", ["assets/mp3/tada-01a.mp3"]);
    }
    create() {
        this.wallCollisionSound = this.add.audio('wallCollisionSound');
        this.tadaSound = this.add.audio('tadaSound');
        this.game.stage.backgroundColor = '#000000';
        // this.game.stage.backgroundColor = '0xffffff'; 
        this.game.world.setBounds(0, 0, this.world.width, this.world.height - 120);
        this.createFloor();
        this.makeFirstExitPoint();
        this.createWall();
        this.createPlayer();
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        this.createMask();
        this.floor.mask = this.mask;
        this.timer = this.game.time.create(false);
        this.cursor = this.game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addCallbacks(this, (key) => {
            //TODO: wasd 가능하게 할 것
            if (key.keyCode === 87) { // W, Up
            }
            else if (key.key === 65) { // A, Left
            }
            else if (key.key === 83) { // S, Down
            }
            else if (key.key === 68) { // D, Right
            }
        });
        this.createTimer();
    }
    createTimer() {
        const text = this.game.add.text(this.game.world.centerX, 500, 'Timer : ', {
            fill: '#ffffff',
            font: '15px Arial'
        });
    }
    update() {
        this.movePlayer();
        this.moveFlash();
        this.randomAlphaTo(this.floor);
    }
    render() {
        this.game.debug.inputInfo(32, 32);
    }
    makeFirstExitPoint() {
        const idxOfExitPoint = Math.round(Math.random()) * 11 % this.stageInfo.exitPoints.length;
        this.stageInfo.exitPoints[idxOfExitPoint].active = true;
        this.currentExitPoint = this.stageInfo.exitPoints[idxOfExitPoint];
        this.renderExitPoint(this.currentExitPoint);
    }
    renderExitPoint(exitPoint) {
        const graphicalPoint = (x, y) => {
            this.currentExitGraphic = this.game.add.graphics(0, 0);
            this.currentExitGraphic.beginFill(0xff0000, 0.8);
            this.currentExitGraphic.drawCircle(x, y, 10);
            this.currentExitGraphic.endFill();
        };
        graphicalPoint(exitPoint.x, exitPoint.y);
    }
    randomAlphaTo(obj) {
        obj.alpha = 0.5 + Math.random() * 0.5;
    }
    createPlayer() {
        this.player = this.game.add.sprite(75, 75, 'player');
        this.player.anchor.set(.5, .5);
        this.player.animations.add('north', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        this.player.animations.add('west', [9, 10, 11, 12, 13, 14, 15, 16, 17], 10, true);
        this.player.animations.add('south', [18, 19, 20, 21, 22, 23, 24, 25, 26], 10, true);
        this.player.animations.add('east', [27, 28, 29, 30, 31, 32, 33, 34, 35], 10, true);
    }
    createFloor() {
        this.floor = this.game.add.sprite(0, 0, 'floor');
        this.floor.width = 640;
        this.floor.height = 480;
    }
    createMask() {
        this.mask = this.game.add.graphics(0, 0);
    }
    createWall() {
        this.wallsBitMap = this.game.make.bitmapData(640, 480);
        this.wallsBitMap.draw('wall');
        this.wallsBitMap.update();
        this.wall = this.game.add.sprite(0, 0, this.wallsBitMap);
    }
    moveFlash() {
        const playerWidth = this.player.width;
        const playerHeight = this.player.height;
        const playerX = this.player.x;
        const playerY = this.player.y;
        const dy = this.game.input.y - playerY;
        const dx = this.game.input.x - playerX;
        const mouseAngle = Math.atan2(dy, dx);
        this.mask.clear();
        this.mask.lineStyle(2, 0xffffff, 1);
        this.mask.beginFill(0x000000);
        this.mask.moveTo(playerX, playerY);
        for (let i = 0; i < Play.numOfRays; i++) {
            const rayAngle = mouseAngle - (Play.lightAngle / 2) + (Play.lightAngle / Play.numOfRays) * i;
            let lastX = playerX;
            let lastY = playerY;
            for (let j = 1; j <= Play.rayLength; j++) {
                const x = Math.round(playerX + (j * Math.cos(rayAngle)));
                const y = Math.round(playerY + (j * Math.sin(rayAngle)));
                const color = this.pickColorOf(x, y, this.wallsBitMap);
                if (color == 0) {
                    lastX = x;
                    lastY = y;
                }
                else {
                    this.mask.lineTo(lastX, lastY);
                    break;
                }
            }
            this.mask.lineTo(lastX, lastY);
        }
        this.mask.lineTo(playerX, playerY);
        this.mask.endFill();
    }
    movePlayer() {
        let xSpeed = 0;
        let ySpeed = 0;
        let isMoving = false;
        let canMove = false;
        const playerWidth = this.player.width;
        const playerHeight = this.player.height;
        const playerX = this.player.x;
        const playerY = this.player.y;
        const color = {
            north: 0,
            south: 0,
            west: 0,
            east: 0
        };
        if (this.cursor.up.isDown) {
            ySpeed -= this.speed;
            this.player.animations.play('north');
            const northEast = this.pickColorOf(playerX + playerWidth / 2 + xSpeed, playerY - playerHeight / 2 + ySpeed, this.wallsBitMap);
            const northWest = this.pickColorOf(playerX - playerWidth / 2 + xSpeed, playerY - playerHeight / 2 + ySpeed, this.wallsBitMap);
            color.north = northEast + northWest;
        }
        if (this.cursor.down.isDown) {
            ySpeed += this.speed;
            this.player.animations.play('south');
            const southEast = this.pickColorOf(playerX + playerWidth / 2 + xSpeed, playerY + playerHeight / 2 + ySpeed, this.wallsBitMap);
            const southWest = this.pickColorOf(playerX - playerWidth / 2 + xSpeed, playerY + playerHeight / 2 + ySpeed, this.wallsBitMap);
            color.south = southEast + southWest;
        }
        if (this.cursor.left.isDown) {
            xSpeed -= this.speed;
            this.player.animations.play('west');
            const westNorth = this.pickColorOf(playerX - playerWidth / 2 + xSpeed, playerY - playerHeight / 2 + ySpeed, this.wallsBitMap);
            const westSouth = this.pickColorOf(playerX - playerWidth / 2 + xSpeed, playerY + playerHeight / 2 + ySpeed, this.wallsBitMap);
            color.west = westNorth + westSouth;
        }
        if (this.cursor.right.isDown) {
            xSpeed += this.speed;
            this.player.animations.play('east');
            const eastNorth = this.pickColorOf(playerX + playerWidth / 2 + xSpeed, playerY - playerHeight / 2 + ySpeed, this.wallsBitMap);
            const eastSouth = this.pickColorOf(playerX + playerWidth / 2 + xSpeed, playerY + playerHeight / 2 + ySpeed, this.wallsBitMap);
            color.east = eastNorth + eastSouth;
        }
        isMoving = Math.abs(xSpeed) + Math.abs(ySpeed) < this.speed * 2 && Math.abs(xSpeed) + Math.abs(ySpeed) > 0;
        canMove = color.north + color.south + color.east + color.west == 0;
        if (isMoving && canMove) {
            this.player.x += xSpeed;
            this.player.y += ySpeed;
        }
        else {
            this.stopPlayerAnimcateion();
        }
        if (isMoving && !canMove) {
            this.game.camera.shake();
            this.wallCollisionSound.play();
        }
        if (Math.abs(this.currentExitPoint.x - this.player.x) < 3 && Math.abs(this.player.y - this.currentExitPoint.y) < 3) {
            alert('Congrat!');
            this.tadaSound.play();
            const userId = this.serviceController.authService.getLastLoggedInUser().userId;
            const stageId = this.stageInfo.stageId;
            const stageRecord = new _vo_record__WEBPACK_IMPORTED_MODULE_1__["StageRecord"](stageId, _vo_rank__WEBPACK_IMPORTED_MODULE_2__["Rank"].S, 80);
            const stageRecordObj = {};
            stageRecordObj[stageId] = stageRecord;
            const record = new _vo_record__WEBPACK_IMPORTED_MODULE_1__["default"](userId, stageRecordObj);
            this.serviceController.recordRank(record);
            const stageInfo = this.serviceController.getStageInformation();
            this.stateController.goState('Level', true, true, stageInfo);
        }
    }
    pickColorOf(x, y, bitMapData) {
        const color = bitMapData.getPixel32(x, y);
        return color;
    }
    stopPlayerAnimcateion() {
        this.player.animations.stop('north');
        this.player.animations.stop('south');
        this.player.animations.stop('west');
        this.player.animations.stop('east');
    }
    goFullScreen() {
    }
}
Play.rayLength = 500;
Play.numOfRays = 20;
Play.lightAngle = Math.PI / 4; // 45 deg.


/***/ }),

/***/ "./src/state/register.ts":
/*!*******************************!*\
  !*** ./src/state/register.ts ***!
  \*******************************/
/*! exports provided: Register */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Register", function() { return Register; });
/* harmony import */ var _component_inputText__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component/inputText */ "./src/component/inputText.ts");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./src/state/base.ts");
/* harmony import */ var _vo_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vo/user */ "./src/vo/user.ts");
/* harmony import */ var _vo_score__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../vo/score */ "./src/vo/score.ts");




class Register extends _base__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(game) {
        super(game);
    }
    preload() {
    }
    setRegisterInputText() {
        let textWidth = 200;
        let textHeight = 80;
        let textX = this.game.world.centerX - textWidth / 2;
        let textY = this.game.world.centerY - textHeight / 2;
        let textMaxLength = 20;
        let textStyle = {
            fill: '#000000',
            boundsAlignH: 'center',
            boundsAlignV: 'middle',
            font: '20px Arial'
        };
        this.inputText = new _component_inputText__WEBPACK_IMPORTED_MODULE_0__["Component"].InputText(this.game, textX, textY, textWidth, textHeight, textMaxLength, 'ex) User00700', textStyle);
    }
    setRegisterButton() {
        let btnWidth = 200;
        let btnHeight = 80;
        let btnX = this.game.world.centerX; // - btnWidth/2;
        let btnY = this.game.world.centerY + 120; // - btnHeight/2 + 100;
        let btnText = 'Register';
        const self = this;
        let textStyle = {
            fill: '#000000',
            boundsAlignH: 'center',
            boundsAlignV: 'middle',
            font: '20px Arial'
        };
        this.registerBtn = this.game.add.text(btnX, btnY, btnText, textStyle);
        this.registerBtn.anchor.setTo(.5, .5);
        this.registerBtn.inputEnabled = true;
        this.registerBtn.input.useHandCursor = true;
        this.registerBtn.events.onInputDown.add((e) => {
            if (confirm(`${self.inputText.text}님으로 하시겠습니까?`)) {
                self.saveUserId();
                const stageInfo = self.serviceController.getStageInformation();
                self.stateController.goState('Level', true, true, stageInfo);
            }
        }, this);
        this.registerBtn.events.onInputOver.add((e) => {
            this.registerBtn.alpha = 0.7;
        }, this);
        this.registerBtn.events.onInputOut.add((e) => {
            this.registerBtn.alpha = 1;
        }, this);
    }
    create() {
        this.setRegisterInputText();
        this.setRegisterButton();
    }
    update() {
        this.inputText.render();
    }
    saveUserId() {
        let userId = this.inputText.text;
        const user = new _vo_user__WEBPACK_IMPORTED_MODULE_2__["default"](userId, new _vo_score__WEBPACK_IMPORTED_MODULE_3__["default"]());
        this.serviceController.registerUser(user);
    }
}


/***/ }),

/***/ "./src/vo/point.ts":
/*!*************************!*\
  !*** ./src/vo/point.ts ***!
  \*************************/
/*! exports provided: Point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return Point; });
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.active = false;
    }
    static on(x, y) {
        return new Point(x, y);
    }
}


/***/ }),

/***/ "./src/vo/rank.ts":
/*!************************!*\
  !*** ./src/vo/rank.ts ***!
  \************************/
/*! exports provided: Rank, RankUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rank", function() { return Rank; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RankUtil", function() { return RankUtil; });
var Rank;
(function (Rank) {
    Rank[Rank["NONE"] = 0] = "NONE";
    Rank[Rank["S"] = 1] = "S";
    Rank[Rank["A"] = 2] = "A";
    Rank[Rank["B"] = 3] = "B";
    Rank[Rank["C"] = 4] = "C";
    Rank[Rank["D"] = 5] = "D";
    Rank[Rank["E"] = 6] = "E";
    Rank[Rank["F"] = 7] = "F";
})(Rank || (Rank = {}));
class RankUtil {
    static valueOf(rank) {
        let ret = '';
        switch (rank) {
            case Rank.NONE: {
                break;
            }
            case Rank.S: {
                ret = 'S';
                break;
            }
            case Rank.A: {
                ret = 'A';
                break;
            }
            case Rank.B: {
                ret = 'B';
                break;
            }
            case Rank.C: {
                ret = 'C';
                break;
            }
            case Rank.D: {
                ret = 'D';
                break;
            }
            case Rank.E: {
                ret = 'E';
                break;
            }
            case Rank.F: {
                ret = 'F';
                break;
            }
            default: {
                ret = '';
            }
        }
        return ret;
    }
}


/***/ }),

/***/ "./src/vo/record.ts":
/*!**************************!*\
  !*** ./src/vo/record.ts ***!
  \**************************/
/*! exports provided: default, StageRecord */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Record; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StageRecord", function() { return StageRecord; });
/* harmony import */ var _vo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vo */ "./src/vo/vo.ts");

class Record extends _vo__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(userId, records) {
        super();
        this.userId = userId;
        this.records = records;
    }
    put(record) {
        this.records[record.stageId] = {
            stageId: record.stageId,
            rank: record.rank,
            time: record.time
        };
        // this.records[record.stageId] = record;
    }
    toJson() {
        let records = {};
        for (let p in this.records) {
            records[p] = this.records[p].toJson();
        }
        return {
            userId: this.userId,
            records: records
        };
    }
    static by(json) {
        if (json == null) {
            return null;
        }
        const user = new Record(json.userId, json.records);
        return user;
    }
}
class StageRecord extends _vo__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(stageId, rank, time) {
        super();
        this.stageId = stageId;
        this.rank = rank;
        this.time = time;
    }
    toJson() {
        return {
            stageId: this.stageId,
            rank: this.rank,
            time: this.time
        };
    }
}


/***/ }),

/***/ "./src/vo/score.ts":
/*!*************************!*\
  !*** ./src/vo/score.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Score; });
/* harmony import */ var _rank__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rank */ "./src/vo/rank.ts");
/* harmony import */ var _vo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vo */ "./src/vo/vo.ts");


class Score extends _vo__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(time, rank) {
        super();
        this.time = time | 0;
        this.rank = rank | _rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].NONE;
    }
    toJson() {
        return {
            time: this.time,
            rank: this.rank,
        };
    }
}


/***/ }),

/***/ "./src/vo/stage.ts":
/*!*************************!*\
  !*** ./src/vo/stage.ts ***!
  \*************************/
/*! exports provided: Stage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stage", function() { return Stage; });
class Stage {
    constructor(stageId, floorFilePath, wallFilePath, exitPoints, timeLimit = 5000) {
        this.stageId = stageId;
        this.floorFilePath = floorFilePath;
        this.wallFilePath = wallFilePath;
        this.exitPoints = exitPoints;
        this.timeLimit = timeLimit;
    }
}


/***/ }),

/***/ "./src/vo/user.ts":
/*!************************!*\
  !*** ./src/vo/user.ts ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return User; });
/* harmony import */ var _vo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vo */ "./src/vo/vo.ts");

class User extends _vo__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(userId, score) {
        super();
        this.userId = userId;
        this.score = score;
        this.registerDate = new Date();
        this.lastVisitDate = new Date();
    }
    static by(json) {
        if (json == null) {
            return null;
        }
        const user = new User(json.userId, json.score);
        user.registerDate = json.registerDate;
        user.lastVisitDate = json.lastVisitDate;
        return user;
    }
    toJson() {
        return {
            userId: this.userId,
            score: this.score,
            registerDate: this.registerDate,
            lastVisitDate: this.lastVisitDate,
        };
    }
}


/***/ }),

/***/ "./src/vo/vo.ts":
/*!**********************!*\
  !*** ./src/vo/vo.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Vo; });
class Vo {
    toString() {
        return JSON.stringify(this.toJson());
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC9pbnB1dFRleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXIvc2VydmljZUNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXIvc3RhdGVDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9kYW8vZGFvLnRzIiwid2VicGFjazovLy8uL3NyYy9kYW8vcmVjb3JkRGFvLnRzIiwid2VicGFjazovLy8uL3NyYy9kYW8vdXNlckRhby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hemUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2F1dGhTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9yZWNvcmRTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9zdGFnZVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nlc3Npb24vbG9jYWxTdG9yYWdlU2Vzc2lvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUvYmFzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUvaW50cm8udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL2xldmVsLnRzIiwid2VicGFjazovLy8uL3NyYy9zdGF0ZS9sb2dpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUvcGxheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUvcmVnaXN0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZvL3BvaW50LnRzIiwid2VicGFjazovLy8uL3NyYy92by9yYW5rLnRzIiwid2VicGFjazovLy8uL3NyYy92by9yZWNvcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZvL3Njb3JlLnRzIiwid2VicGFjazovLy8uL3NyYy92by9zdGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdm8vdXNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdm8vdm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ25FTSxJQUFXLFNBQVMsQ0FpR3pCO0FBakdELFdBQWlCLFNBQVM7SUFDekIsZUFBdUIsU0FBUSxNQUFNLENBQUMsSUFBSTtRQW1CekMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSztZQUM1RCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUcsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBbkJqQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1lBb0JmLElBQUksQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDO1lBQ2hDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQ3hCO1lBRUQsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxL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QUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLFdBQVcsR0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLE9BQU8sR0FBRyxZQUFZLEdBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUgsS0FBSyxDQUFDLEtBQUssR0FBRyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDNUIsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLFdBQVcsR0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLE9BQU8sR0FBRyxZQUFZLEdBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUgsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsV0FBVyxHQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsT0FBTyxHQUFHLFlBQVksR0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxSCxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsR0FBRyxTQUFTLENBQUM7U0FDcEM7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUM1QixNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsV0FBVyxHQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUs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RSxLQUFLO1FBQ3hCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFVO1FBQzFCLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQztTQUNaO1FBQ0QsTUFBTSxJQUFJLEdBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUV4QyxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFFRCxNQUFNO1FBQ0wsT0FBTztZQUNOLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtTQUNqQyxDQUFDO0lBQ0gsQ0FBQztDQUNEOzs7Ozs7Ozs7Ozs7Ozs7QUNwQ2E7SUFDYixRQUFRO1FBQ1AsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Q0FHRCIsImZpbGUiOiJtYXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0IG5hbWVzcGFjZSBDb21wb25lbnQge1xuXHRleHBvcnQgY2xhc3MgSW5wdXRUZXh0IGV4dGVuZHMgUGhhc2VyLlRleHQge1xuXHRcdGlzRm9jdXMgPSBmYWxzZTtcblxuXHRcdHggOiBudW1iZXI7XG5cdFx0eSA6IG51bWJlcjtcblx0XHR3aWR0aCA6IG51bWJlcjtcblx0XHRoZWlnaHQgOiBudW1iZXI7XG5cblx0XHRtYXhMZW5ndGggOiBudW1iZXI7XG5cblx0XHRwbGFjZWhvbGRlciA6IHN0cmluZztcblxuXHRcdFxuXHRcdGJvcmRlclJlY3RhbmdsZXIgOiBQaGFzZXIuUmVjdGFuZ2xlO1xuXG5cdFx0dGV4dCA6IHN0cmluZztcblxuXHRcdHBoYXNlclRleHQgOiBQaGFzZXIuVGV4dDtcblxuXHRcdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHdpZHRoLCBoZWlnaHQsIG1heExlbmd0aCwgdGV4dCwgc3R5bGUpIHtcblx0XHRcdHN1cGVyKGdhbWUsIHgsIHksICB0ZXh0LCBzdHlsZSk7XG5cdFx0XHR0aGlzLnBsYWNlaG9sZGVyID0gJ0lucHV0IFRleHQnO1xuXHRcdFx0aWYgKHRleHQubGVuZ3RoID09IDApIHtcblx0XHRcdFx0dGV4dCA9IHRoaXMucGxhY2Vob2xkZXI7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMueCA9IHg7XG5cdFx0XHR0aGlzLnkgPSB5O1xuXHRcdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHRcdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0XHR0aGlzLnRleHQgPSB0ZXh0O1xuXHRcdFx0dGhpcy5tYXhMZW5ndGggPSBtYXhMZW5ndGggPyBtYXhMZW5ndGggOiAyMDtcblxuXHRcdFx0bGV0IGdyb3VwID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuXHRcdFx0bGV0IGdyYXBoaWNzID0gdGhpcy5nYW1lLm1ha2UuZ3JhcGhpY3MoKTtcblx0XHRcdGdyYXBoaWNzLmxpbmVTdHlsZSgyLCAweDAwMDAwMCwgMSk7XG5cdFx0XHQvLyBncmFwaGljcy5iZWdpbkZpbGwoMHhGRjcwMEIsIDEpO1xuXHRcdFx0Z3JhcGhpY3MuZHJhd1JlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG5cdFx0XHQvLyBncmFwaGljcy5lbmRGaWxsKCk7XG5cdFx0XHRncm91cC5hZGQoZ3JhcGhpY3MpO1xuXG5cdFx0XHR0aGlzLnBoYXNlclRleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQoeCwgeSwgdGV4dCwgc3R5bGUpO1xuXHRcdFx0dGhpcy5waGFzZXJUZXh0LnNldFRleHRCb3VuZHMoMCwgMCwgd2lkdGgsIGhlaWdodClcblx0XHRcdHRoaXMucGhhc2VyVGV4dC5hbHBoYSA9IDAuNjtcblxuXHRcdFx0dGhpcy5waGFzZXJUZXh0LmlucHV0RW5hYmxlZCA9IHRydWU7XG5cblx0XHRcdHRoaXMucGhhc2VyVGV4dC5ldmVudHMub25JbnB1dERvd24uYWRkKChzcHJpdGUsIHBvaW50ZXIpID0+IHtcblx0XHRcdFx0dGhpcy5pc0ZvY3VzID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5waGFzZXJUZXh0LmFscGhhID0gMTtcblx0XHRcdH0sIHRoaXMpO1xuXHRcdFx0XG5cdFx0XHR0aGlzLmdhbWUuaW5wdXQub25Eb3duLmFkZCgoc3ByaXRlLCBwb2ludGVyKSA9PiB7XG5cdFx0XHRcdGxldCB0ZXh0WCA9IHRoaXMucGhhc2VyVGV4dC53b3JsZC54O1xuXHRcdFx0XHRsZXQgdGV4dFdpZHRoID0gdGhpcy5waGFzZXJUZXh0LndpZHRoO1xuXG5cdFx0XHRcdGxldCB0ZXh0WSA9IHRoaXMucGhhc2VyVGV4dC53b3JsZC55O1xuXHRcdFx0XHRsZXQgdGV4dEhlaWdodCA9IHRoaXMucGhhc2VyVGV4dC5oZWlnaHQ7XG5cblx0XHRcdFx0aWYgKHBvaW50ZXIuY2xpZW50WCA+IHRleHRYICYmIHBvaW50ZXIuY2xpZW50WCA8PSB0ZXh0WCArIHRleHRXaWR0aCkge1xuXHRcdFx0XHRcdGlmIChwb2ludGVyLmNsaWVudFkgPiB0ZXh0WSAmJiBwb2ludGVyLmNsaWVudFkgPD0gdGV4dFkgKyB0ZXh0SGVpZ2h0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmlzRm9jdXMgPSB0cnVlO1xuXHRcdFx0XHRcdFx0dGhpcy5waGFzZXJUZXh0LmFscGhhID0gMTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnBoYXNlclRleHQuYWxwaGEgPSAwLjY7XG5cdFx0XHRcdHRoaXMuaXNGb2N1cyA9IGZhbHNlO1xuXHRcdFx0fSwgdGhpcyk7XG5cblx0XHRcdHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRDYWxsYmFja3ModGhpcywgKGUpID0+IHtcblx0XHRcdFx0aWYgKCF0aGlzLmlzRm9jdXMpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGlmIChlLmtleUNvZGUgPT0gUGhhc2VyLktleWJvYXJkLkJBQ0tTUEFDRSkge1xuXHRcdFx0XHRcdHRoaXMucGhhc2VyVGV4dC50ZXh0ID0gdGhpcy5waGFzZXJUZXh0LnRleHQuc2xpY2UoMCwgLTEpO1xuXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9IFxuXG5cdFx0XHRcdGlmICh0aGlzLnBoYXNlclRleHQudGV4dC5sZW5ndGggKyAxID4gdGhpcy5tYXhMZW5ndGgpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucGhhc2VyVGV4dC50ZXh0ICs9IGUua2V5O1xuXHRcdFx0XHR0aGlzLnRleHQgPSB0aGlzLnBoYXNlclRleHQudGV4dDtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJlbmRlcigpIHtcblx0XHRcdFxuXHRcdH1cblx0fVxufSIsImltcG9ydCBTdGF0ZUNvbnRyb2xsZXIgZnJvbSBcIi4vc3RhdGVDb250cm9sbGVyXCI7XG5pbXBvcnQgQ29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5pbXBvcnQgU3RhZ2VTZXJ2aWNlIGZyb20gXCIuLi9zZXJ2aWNlcy9zdGFnZVNlcnZpY2VcIjtcbmltcG9ydCBBdXRoU2VydmljZSBmcm9tIFwiLi4vc2VydmljZXMvYXV0aFNlcnZpY2VcIjtcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi4vbWF6ZVwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuaW1wb3J0IFVzZXIgZnJvbSBcIi4uL3ZvL3VzZXJcIjtcbmltcG9ydCBSZWNvcmRTZXJ2aWNlIGZyb20gXCIuLi9zZXJ2aWNlcy9yZWNvcmRTZXJ2aWNlXCI7XG5pbXBvcnQgUmVjb3JkIGZyb20gXCIuLi92by9yZWNvcmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmljZUNvbnRyb2xsZXIgaW1wbGVtZW50cyBDb250cm9sbGVyIHtcblx0Z2FtZSA6IFBoYXNlci5HYW1lO1xuXG5cdHN0YWdlU2VydmljZSA6IFN0YWdlU2VydmljZTtcblx0YXV0aFNlcnZpY2UgOiBBdXRoU2VydmljZTtcblx0cmVjb3JkU2VydmljZSA6IFJlY29yZFNlcnZpY2U7XG5cblx0Ly8gSXQgaXMgbmVjZXNzYXJ5IGZvciBjb250cm9saW5nIHN0YXRlLlxuXHRzdGF0ZUNvbnRyb2xsZXIgOiBTdGF0ZUNvbnRyb2xsZXI7XG5cblx0Y29uc3RydWN0b3IoZ2FtZTogR2FtZS5NYXplKSB7XG5cdFx0dGhpcy5nYW1lID0gZ2FtZTtcblx0XHRcblx0XHR0aGlzLnN0YWdlU2VydmljZSA9IG5ldyBTdGFnZVNlcnZpY2UoKTtcblx0XHR0aGlzLmF1dGhTZXJ2aWNlID0gbmV3IEF1dGhTZXJ2aWNlKCk7XG5cdFx0dGhpcy5yZWNvcmRTZXJ2aWNlID0gbmV3IFJlY29yZFNlcnZpY2UoKTtcblx0XHRcblx0XHR0aGlzLnN0YXRlQ29udHJvbGxlciA9IGdhbWUuc3RhdGVDb250cm9sbGVyO1xuXHR9XHRcblx0XG5cdHB1YmxpYyBsb2dpbih1c2VySWQsIGNhbGxiYWNrKSB7XG5cdFx0dGhpcy5hdXRoU2VydmljZS5sb2dpbih1c2VySWQsIGNhbGxiYWNrKTtcblx0fVxuXG5cdHB1YmxpYyByZWdpc3RlclVzZXIodXNlcjogVXNlcikge1xuXHRcdHRoaXMuYXV0aFNlcnZpY2UucmVnaXN0ZXJVc2VyKHVzZXIpO1xuXHR9XG5cblx0cHVibGljIGdldFJlY29yZCgpIDogUmVjb3JkIHtcblx0XHRjb25zdCB1c2VySWQgPSB0aGlzLmF1dGhTZXJ2aWNlLmdldExhc3RMb2dnZWRJblVzZXIoKS51c2VySWQ7XG5cdFx0ZGVidWdnZXJcblx0XHRjb25zdCByZWNvcmQgPSB0aGlzLnJlY29yZFNlcnZpY2UuZ2V0UmVjb3JkKHVzZXJJZCk7XG5cdFx0cmV0dXJuIHJlY29yZDtcblx0fVxuXG5cdHB1YmxpYyBnZXRTdGFnZUluZm9ybWF0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnN0YWdlU2VydmljZS5zdGFnZU1hcDtcblx0fVxuXG5cdHB1YmxpYyByZWNvcmRSYW5rKHJlY29yZDogUmVjb3JkKSB7XG5cdFx0dGhpcy5yZWNvcmRTZXJ2aWNlLnNldFJlY29yZChyZWNvcmQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBJbnRybyB9IGZyb20gJy4uL3N0YXRlL2ludHJvJztcbmltcG9ydCB7IExvZ2luIH0gZnJvbSAnLi4vc3RhdGUvbG9naW4nO1xuaW1wb3J0IHsgTGV2ZWwgfSBmcm9tICcuLi9zdGF0ZS9sZXZlbCc7XG5pbXBvcnQgeyBQbGF5IH0gZnJvbSAnLi4vc3RhdGUvcGxheSc7XG5pbXBvcnQgeyBSZWdpc3RlciB9IGZyb20gJy4uL3N0YXRlL3JlZ2lzdGVyJztcblxuaW1wb3J0IFNlcnZpY2VDb250cm9sbGVyIGZyb20gJy4vc2VydmljZUNvbnRyb2xsZXInO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4uL21hemUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0ZUNvbnRyb2xsZXIge1xuXHRzdGF0ZU1hbmFnZXIgOiBQaGFzZXIuU3RhdGVNYW5hZ2VyO1xuXHRnYW1lIDogUGhhc2VyLkdhbWU7XG5cblx0d2lkdGg6IG51bWJlcjtcblx0aGVpZ2h0OiBudW1iZXI7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0fVxuXG5cdHB1YmxpYyBpbml0aWFsaXplKGdhbWU6IEdhbWUuTWF6ZSwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcblx0XHR0aGlzLnN0YXRlTWFuYWdlciA9IG5ldyBQaGFzZXIuU3RhdGVNYW5hZ2VyKGdhbWUpO1xuXHRcdHRoaXMuZ2FtZSA9IGdhbWU7XG5cdFx0dGhpcy5nYW1lLnN0YXRlID0gdGhpcy5zdGF0ZU1hbmFnZXI7XG5cblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdHN0YXJ0U3RhdGUoc3RhdGU/IDogc3RyaW5nKSB7XG5cdFx0bGV0IHN0YXJ0aW5nU3RhdGUgPSAnSW50cm8nO1xuXHRcdC8vIGxldCBzdGFydGluZ1N0YXRlID0gJ1N0YWdlJztcblx0XHRpZiAoc3RhdGUgPT09ICd1bmRlZmluZWQnIHx8IHN0YXRlID09PSBudWxsKSB7XG5cdFx0XHRzdGFydGluZ1N0YXRlID0gc3RhdGU7XG5cdFx0fVxuXG5cdFx0dGhpcy5nb1N0YXRlKHN0YXJ0aW5nU3RhdGUsIHRydWUsIHRydWUsICdIb3Jyb3IgTWF6ZScpO1xuXHR9XG5cblx0cHVibGljIGdvU3RhdGUoc3RhdGU6IHN0cmluZywgY2xlYXJXb3JsZD86IGJvb2xlYW4sIGNsZWFyQ2FjaGU/OiBib29sZWFuLCAuLi5hcmdzOiBhbnlbXSkge1xuXHRcdGlmICghdGhpcy5zdGF0ZU1hbmFnZXIuY2hlY2tTdGF0ZShzdGF0ZSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgVGhpcyBzdGF0ZSgke3N0YXRlfSkgZG9lcyBub3QgZXhpc3QhYCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zdGF0ZU1hbmFnZXIuc3RhcnQoc3RhdGUsIGNsZWFyV29ybGQsIGNsZWFyQ2FjaGUsIC4uLmFyZ3MpO1xuXHR9XG5cblx0cHJpdmF0ZSBpbml0KCkge1xuXHRcdHRoaXMuYWRkKCdJbnRybycsIEludHJvLCB0cnVlKTtcblx0XHR0aGlzLmFkZCgnTG9naW4nLCBMb2dpbiwgZmFsc2UpO1xuXHRcdHRoaXMuYWRkKCdSZWdpc3RlcicsIFJlZ2lzdGVyLCBmYWxzZSk7XG5cdFx0dGhpcy5hZGQoJ0xldmVsJywgTGV2ZWwsIGZhbHNlKTtcblx0XHR0aGlzLmFkZCgnUGxheScsIFBsYXksIGZhbHNlKTtcblx0fVxuXG5cdHByaXZhdGUgYWRkKGtleSwgc3RhdGUsIGF1dGhTdGFydD8pIHtcblx0XHR0aGlzLnN0YXRlTWFuYWdlci5hZGQoa2V5LCBzdGF0ZSwgYXV0aFN0YXJ0KTtcblx0fVxufSIsImltcG9ydCBTZXNzaW9uIGZyb20gXCIuLi9zZXNzaW9uL3Nlc3Npb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgREFPPFQ+IHtcblx0c2Vzc2lvbjogU2Vzc2lvbjtcblx0Y29uc3RydWN0b3Ioc2Vzc2lvbjogU2Vzc2lvbikge1xuXHRcdHRoaXMuc2Vzc2lvbiA9IHNlc3Npb247XG5cdH1cblxuXHRwdWJsaWMgYWJzdHJhY3QgaW5zZXJ0KHRhYmxlOiBzdHJpbmcsIG9iajogVCk6IFQ7XG5cdHB1YmxpYyBhYnN0cmFjdCBzZWxlY3QodGFibGU6IHN0cmluZywga2V5OiBzdHJpbmcpOiBUO1xuXHRwdWJsaWMgYWJzdHJhY3QgdXBkYXRlKHRhYmxlOiBzdHJpbmcsIGtleTogc3RyaW5nLCBvYmo6IFQpOiBUO1xuXHRwdWJsaWMgYWJzdHJhY3QgZGVsZXRlKHRhYmxlOiBzdHJpbmcsIGtleTogc3RyaW5nKTogYm9vbGVhbjtcblx0cHVibGljIGFic3RyYWN0IHNlbGVjdEFsbCh0YWJsZTogc3RyaW5nKTogYW55Oy8vQXJyYXk8VD47XG59IiwiaW1wb3J0IERBTyBmcm9tIFwiLi9kYW9cIjtcbmltcG9ydCBSZWNvcmQgZnJvbSBcIi4uL3ZvL3JlY29yZFwiO1xuXG5leHBvcnQgY2xhc3MgUmVjb3JkRGFvIGV4dGVuZHMgREFPPFJlY29yZD4ge1xuXG5cdHB1YmxpYyBpbnNlcnQodGFibGU6IHN0cmluZywgb2JqOiBSZWNvcmQpOiBSZWNvcmQge1xuXHRcdC8vIGNvbnN0IHJlY29yZERhdGFiYXNlID0ge307XG5cdFx0Ly8gcmVjb3JkRGF0YWJhc2Vbb2JqLnVzZXJJZF0gPSBvYmoudG9TdHJpbmcoKTtcblx0XHRkZWJ1Z2dlcjtcblx0XHR0aGlzLnNlc3Npb24uc2V0KHRhYmxlLCBvYmoudXNlcklkLCBvYmoudG9TdHJpbmcoKSk7XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9XG5cblx0cHVibGljIHNlbGVjdCh0YWJsZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZyk6IFJlY29yZCB7XG5cdFx0ZGVidWdnZXI7XG5cdFx0Y29uc3QgcmVjb3JkRGF0YSA9IHRoaXMuc2Vzc2lvbi5nZXQodGFibGUsIHVzZXJJZCk7XG5cdFx0Y29uc3QgcmVjb3JkOiBSZWNvcmQgPSBSZWNvcmQuYnkocmVjb3JkRGF0YSk7XG5cdFx0cmV0dXJuIHJlY29yZDtcblx0fVxuXG5cdHB1YmxpYyB1cGRhdGUodGFibGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcsIG9iajogUmVjb3JkKTogUmVjb3JkIHtcblx0XHR0aGlzLnNlc3Npb24uc2V0KHRhYmxlLCB1c2VySWQsIG9iai50b1N0cmluZygpKTtcblx0XHRcblx0XHRyZXR1cm4gb2JqO1xuXHR9XG5cblx0cHVibGljIGRlbGV0ZSh0YWJsZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdGxldCBpc1N1Y2Nlc3MgPSB0cnVlO1xuXHRcdHRyeSB7XG5cdFx0XHR0aGlzLnNlc3Npb24ucmVtb3ZlKHRhYmxlLCB1c2VySWQpO1xuXHRcdH0gY2F0Y2gge1xuXHRcdFx0aXNTdWNjZXNzID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlzU3VjY2Vzcztcblx0fVxuXG5cdHB1YmxpYyBzZWxlY3RBbGwodGFibGU6IHN0cmluZyk6IGFueSB7XG5cdFx0Y29uc3Qgb2JqcyA9ICg8YW55PnRoaXMpLnNlc3Npb24uYWxsU3RvcmFnZSgpO1xuXHRcdGNvbnN0IG9iaiA9IG9ianNbdGFibGVdO1xuXG5cdFx0cmV0dXJuIG9iajtcblx0fVxufSIsImltcG9ydCBEQU8gZnJvbSBcIi4vZGFvXCI7XG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vdm8vdXNlclwiO1xuXG5leHBvcnQgY2xhc3MgVXNlckRhbyBleHRlbmRzIERBTzxVc2VyPiB7XG5cdHByaXZhdGUgcmVhZG9ubHkgdXNlcktleSA9ICdtYXplVXNlclJlcG8nO1xuXHRcblx0cHVibGljIGluc2VydCh0YWJsZTogc3RyaW5nLCBvYmo6IFVzZXIpOiBVc2VyIHtcblx0XHQvLyBjb25zdCB1c2VyRGF0YWJhc2UgPSB7fTtcblx0XHQvLyB1c2VyRGF0YWJhc2Vbb2JqLnVzZXJJZF0gPSBvYmoudG9TdHJpbmcoKTtcblx0XHRkZWJ1Z2dlcjtcblx0XHR0aGlzLnNlc3Npb24uc2V0KHRhYmxlLCBvYmoudXNlcklkLCBvYmoudG9TdHJpbmcoKSk7XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9XG5cblx0cHVibGljIHNlbGVjdCh0YWJsZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZyk6IFVzZXIge1xuXHRcdGNvbnN0IHVzZXJTdHIgPSB0aGlzLnNlc3Npb24uZ2V0KHRhYmxlLCB1c2VySWQpO1xuXG5cdFx0Y29uc3QgdXNlcjogVXNlciA9IFVzZXIuYnkodXNlclN0cik7XG5cdFx0cmV0dXJuIHVzZXI7XG5cdH1cblxuXHRwdWJsaWMgdXBkYXRlKHRhYmxlOiBzdHJpbmcsdXNlcklkOiBzdHJpbmcsIG9iajogVXNlcik6IFVzZXIge1xuXHRcdHRoaXMuc2Vzc2lvbi5zZXQodGFibGUsIHVzZXJJZCwgb2JqLnRvU3RyaW5nKCkpO1xuXHRcdFxuXHRcdHJldHVybiBvYmo7XG5cdH1cblxuXHRwdWJsaWMgZGVsZXRlKHRhYmxlOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0bGV0IGlzU3VjY2VzcyA9IHRydWU7XG5cdFx0dHJ5IHtcblx0XHRcdHRoaXMuc2Vzc2lvbi5yZW1vdmUodGFibGUsIHVzZXJJZCk7XG5cdFx0fSBjYXRjaCB7XG5cdFx0XHRpc1N1Y2Nlc3MgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gaXNTdWNjZXNzO1xuXHR9XG5cblx0cHVibGljIHNlbGVjdEFsbCh0YWJsZTogc3RyaW5nKTogYW55IHtcblx0XHRjb25zdCBvYmpzID0gKDxhbnk+dGhpcykuc2Vzc2lvbi5hbGxTdG9yYWdlKCk7XG5cdFx0Y29uc3Qgb2JqID0gb2Jqc1t0YWJsZV07XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9XG59IiwiLy8gaW1wb3J0ICogYXMgZyBmcm9tICcuL21hemUnXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi9tYXplJztcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgICBjb25zdCB3aWR0aCA9IDY0MDtcbiAgICBjb25zdCBoZWlnaHQgPSA2MDA7IC8vIDEyMCAqIDQyMFxuICAgIGNvbnN0IHBhcmVudElkID0gJ2dhbWUnO1xuXG4gICAgLy8gU2hvdWxkIGJlIGluaXRpYWxpemUgZ2FtZSBvYmplY3QgYW5kIHJ1blxuICAgIGNvbnN0IG1hemUgPSBuZXcgR2FtZS5NYXplKHdpZHRoLCBoZWlnaHQsIHBhcmVudElkKTtcbn07IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL25vZGVfbW9kdWxlcy9waGFzZXItY2UvdHlwZXNjcmlwdC9waGFzZXIuZC50c1wiIC8+XG5cbmltcG9ydCBTZXJ2aWNlQ29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyL3NlcnZpY2VDb250cm9sbGVyXCI7XG5pbXBvcnQgU3RhdGVDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXIvc3RhdGVDb250cm9sbGVyXCI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgR2FtZSB7XG5cdGV4cG9ydCBjbGFzcyBNYXplIGV4dGVuZHMgUGhhc2VyLkdhbWUge1xuXHRcdHNlcnZpY2VDb250cm9sbGVyIDogU2VydmljZUNvbnRyb2xsZXI7XG5cdFx0c3RhdGVDb250cm9sbGVyIDogU3RhdGVDb250cm9sbGVyO1xuXG5cdFx0Y29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgcGFyZW50SWQpIHtcblx0XHRcdHN1cGVyKHdpZHRoLCBoZWlnaHQsIFBoYXNlci5BVVRPLCBwYXJlbnRJZCwgbnVsbCwgZmFsc2UsIHRydWUsIG51bGwpO1xuXG5cdFx0XHR0aGlzLnNlcnZpY2VDb250cm9sbGVyID0gbmV3IFNlcnZpY2VDb250cm9sbGVyKHRoaXMpO1xuXG5cdFx0XHR0aGlzLnN0YXRlQ29udHJvbGxlciA9IG5ldyBTdGF0ZUNvbnRyb2xsZXIoKTtcblx0XHRcdHRoaXMuc3RhdGVDb250cm9sbGVyLmluaXRpYWxpemUodGhpcywgd2lkdGgsIGhlaWdodCk7XG5cdFx0XHR0aGlzLnN0YXRlQ29udHJvbGxlci5zdGFydFN0YXRlKCk7XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuaW1wb3J0IFVzZXIgZnJvbSBcIi4uL3ZvL3VzZXJcIjtcbmltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlXCI7XG5pbXBvcnQgREFPIGZyb20gXCIuLi9kYW8vZGFvXCI7XG5pbXBvcnQgeyBVc2VyRGFvIH0gZnJvbSBcIi4uL2Rhby91c2VyRGFvXCI7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXNzaW9uIH0gZnJvbSBcIi4uL3Nlc3Npb24vbG9jYWxTdG9yYWdlU2Vzc2lvblwiO1xuaW1wb3J0IFNlc3Npb24gZnJvbSBcIi4uL3Nlc3Npb24vc2Vzc2lvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRoU2VydmljZSBpbXBsZW1lbnRzIFNlcnZpY2Uge1xuXHR1c2VyRGFvIDogREFPPFVzZXI+O1xuXHRzZXNzaW9uIDogU2Vzc2lvbjtcblxuXHRwcml2YXRlIHJlYWRvbmx5IFRBQkxFX0xBU1RfTE9HR0VEX0lOID0gJ2xhc3RMb2dnZWRJblVzZXInO1xuXHRwcml2YXRlIHJlYWRvbmx5IFVTRVJfVEFCTEUgPSAnbWF6ZVVzZXJSZXBvJztcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnNlc3Npb24gPSBuZXcgTG9jYWxTdG9yYWdlU2Vzc2lvbigpO1xuXHRcdHRoaXMudXNlckRhbyA9IG5ldyBVc2VyRGFvKHRoaXMuc2Vzc2lvbik7XG5cdH1cblx0XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdFxuXHR9XG5cblx0cHVibGljIGdldExhc3RMb2dnZWRJblVzZXIoKSA6IFVzZXIge1xuXHRcdGNvbnN0IG9iaiA9IHRoaXMudXNlckRhby5zZWxlY3RBbGwodGhpcy5UQUJMRV9MQVNUX0xPR0dFRF9JTik7XG5cdFx0bGV0IHVzZXJPYmo7XG5cdFx0bGV0IHVzZXI7XG5cdFx0ZGVidWdnZXI7XG5cdFx0dHJ5IHtcblx0XHRcdHVzZXJPYmogPSBKU09OLnBhcnNlKG9iaik7XG5cdFx0XHRjb25zdCB1c2VySWQgPSBPYmplY3Qua2V5cyh1c2VyT2JqKVswXTtcblx0XHRcdHVzZXIgPSB1c2VyT2JqW3VzZXJJZF07XG5cdFx0XHR1c2VyID0gSlNPTi5wYXJzZSh1c2VyKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHR1c2VyID0gbnVsbDtcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIHVzZXI7XG5cdH1cblxuXHRwdWJsaWMgcmVnaXN0ZXJVc2VyKHVzZXIgOiBVc2VyKSB7XG5cdFx0dGhpcy51c2VyRGFvLmluc2VydCh0aGlzLlVTRVJfVEFCTEUsIHVzZXIpO1xuXHRcdHRoaXMudXNlckRhby5pbnNlcnQodGhpcy5UQUJMRV9MQVNUX0xPR0dFRF9JTiwgdXNlcik7XG5cdH1cblxuXHRwdWJsaWMgbG9naW4odXNlcklkOiBzdHJpbmcsIGNhbGxiYWNrOiAodXNlcjogVXNlciwgaXNTdWNjZXNzOiBib29sZWFuKSA9PiB2b2lkKSB7XG5cdFx0Y29uc3QgdXNlciA9IHRoaXMudXNlckRhby5zZWxlY3QodGhpcy5VU0VSX1RBQkxFLCB1c2VySWQpO1xuXHRcdGlmICh1c2VyKSB7XG5cdFx0XHRjYWxsYmFjayh1c2VyLCB0cnVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2FsbGJhY2sobnVsbCwgZmFsc2UpO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBsb2dvdXQodXNlcklkKSB7XG5cdFx0Ly9UT0RPOiBpbXBsZW1lbnRzIGl0LlxuXG5cdFx0Y29uc3QgdXNlciA9IHRoaXMudXNlckRhby5zZWxlY3QodGhpcy5VU0VSX1RBQkxFLCB1c2VySWQpO1xuXHRcdFxuXHRcdGNvbnNvbGUubG9nKCduZXh0IHVzZXIgd291bGQgYmUgcmVtb3ZlZC4nKTtcblx0XHRjb25zb2xlLmxvZyh1c2VyKTtcblx0XHR0aGlzLnVzZXJEYW8uZGVsZXRlKHRoaXMuVVNFUl9UQUJMRSwgdXNlcklkKTtcblx0fVxufSIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlXCI7XG5pbXBvcnQgREFPIGZyb20gXCIuLi9kYW8vZGFvXCI7XG5pbXBvcnQgUmVjb3JkIGZyb20gXCIuLi92by9yZWNvcmRcIjtcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlc3Npb24gfSBmcm9tIFwiLi4vc2Vzc2lvbi9sb2NhbFN0b3JhZ2VTZXNzaW9uXCI7XG5pbXBvcnQgeyBSZWNvcmREYW8gfSBmcm9tIFwiLi4vZGFvL3JlY29yZERhb1wiO1xuaW1wb3J0IFNlc3Npb24gZnJvbSBcIi4uL3Nlc3Npb24vc2Vzc2lvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmRTZXJ2aWNlIGltcGxlbWVudHMgU2VydmljZSB7XG5cdHJlY29yZERhbyA6IERBTzxSZWNvcmQ+O1xuXHRzZXNzaW9uIDogU2Vzc2lvbjtcblxuXHRwcml2YXRlIHJlYWRvbmx5IFJFQ09SRF9UQUJMRSA9ICdtYXplUmVjb3JkUmVwbyc7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5zZXNzaW9uID0gbmV3IExvY2FsU3RvcmFnZVNlc3Npb24oKTtcblx0XHR0aGlzLnJlY29yZERhbyA9IG5ldyBSZWNvcmREYW8odGhpcy5zZXNzaW9uKTtcblx0fVxuXG5cdGluaXRpYWxpemUoKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XG5cdH1cblxuXHRwdWJsaWMgZ2V0UmVjb3JkKHVzZXJJZDogc3RyaW5nKTogUmVjb3JkIHtcblx0XHRjb25zdCByZWNvcmQgPSB0aGlzLnJlY29yZERhby5zZWxlY3QodGhpcy5SRUNPUkRfVEFCTEUsIHVzZXJJZCk7XG5cdFx0cmV0dXJuIHJlY29yZDtcblx0fVxuXG5cdHB1YmxpYyBzZXRSZWNvcmQocmVjb3JkOiBSZWNvcmQpIHtcblx0XHR0aGlzLnJlY29yZERhby5pbnNlcnQodGhpcy5SRUNPUkRfVEFCTEUsIHJlY29yZCk7XG5cdH1cblxuXHRcbn0iLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZVwiO1xuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tIFwiLi4vdm8vc3RhZ2VcIjtcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL3ZvL3BvaW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlU2VydmljZSBpbXBsZW1lbnRzIFNlcnZpY2Uge1xuXHR1c2VySWQgOiBzdHJpbmc7XG5cdHN0YWdlTWFwIDogYW55O1xuXHRcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5zdGFnZU1hcCA9IHt9O1xuXHRcdHRoaXMuZ2VuZXJhdGVTdGFnZU1hcCgpO1xuXHR9XG5cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0XG5cdH1cblxuXHRwdWJsaWMgZ2V0U3RhZ2VJbmZvcm1hdGlvbih1c2VySWQgOiBzdHJpbmcpIHtcblxuXHR9XG5cblx0cHJpdmF0ZSBnZW5lcmF0ZVN0YWdlTWFwKCkge1xuXHRcdGZvciAobGV0IGk9MDsgaTwzOyBpKyspIHtcblx0XHRcdGxldCB6ZXJvRm9ybWF0ID0gJzAwMCcgKyBpO1xuXHRcdFx0bGV0IG1hcFNlcSA9IHplcm9Gb3JtYXQuc2xpY2UoLTMpO1xuXG5cdFx0XHRjb25zdCBmbG9vclBhdGggPSAnYXNzZXRzL2ltZy9tYXBzL2Zsb29yLScgKyBtYXBTZXEgKyAnLnBuZyc7XG5cdFx0XHRjb25zdCB3YWxsUGF0aCA9ICdhc3NldHMvaW1nL21hcHMvd2FsbHMtJyArIG1hcFNlcSArICcucG5nJztcblxuXHRcdFx0Ly8gY29uc3Qgc3RhZ2UgPSBuZXcgU3RhZ2UoaSwgZmxvb3JQYXRoLCB3YWxsUGF0aCwgUG9pbnQub24oMjM1LCA4NSkpO1xuXG5cblx0XHRcdGNvbnN0IHN0YWdlID0gbmV3IFN0YWdlKGksIGZsb29yUGF0aCwgd2FsbFBhdGgsIFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0UG9pbnQub24oMjM1LCA4NSksXG5cdFx0XHRcdFx0UG9pbnQub24oNTY1LCA0MDApXG5cdFx0XHRcdF0pO1xuXHRcdFx0XG5cdFx0XHR0aGlzLnN0YWdlTWFwW2ldID0gc3RhZ2U7XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IFNlc3Npb24gZnJvbSBcIi4vc2Vzc2lvblwiO1xuXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlU2Vzc2lvbiBpbXBsZW1lbnRzIFNlc3Npb24ge1xuXHRnZXQodGFibGU6IHN0cmluZywga2V5OiBzdHJpbmcpIDogYW55IHtcblx0XHRjb25zdCB0YWJsZURhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0YWJsZSkgfHwgbnVsbDtcblx0XHRpZiAoIXRhYmxlRGF0YSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdGFibGVKc29uT2JqID0gSlNPTi5wYXJzZSh0YWJsZURhdGEpO1xuXHRcdGxldCBpdGVtID0gdGFibGVKc29uT2JqW2tleV07XG5cdFx0aWYgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuXHRcdFx0bGV0IG9iaiA9IEpTT04ucGFyc2UoaXRlbSk7XHRcblx0XHRcdHJldHVybiBvYmo7XG5cdFx0fVx0XHRcblx0XHRyZXR1cm4gaXRlbTtcblx0fVxuXG5cdHNldCh0YWJsZTogc3RyaW5nLCBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuXHRcdGNvbnN0IG9yaWdpbmFsRGF0YU9iaiA9IHRoaXMuZ2V0KHRhYmxlLCBrZXkpO1xuXHRcdGlmICghb3JpZ2luYWxEYXRhT2JqKSB7XG5cdFx0XHRsZXQgZGF0YSA9IHt9O1xuXHRcdFx0ZGF0YVtrZXldID0gdmFsdWU7XG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0YWJsZSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWJ1Z2dlcjtcblx0XHRcdGxldCBqc29uVmFsdWUgPSBKU09OLnBhcnNlKHZhbHVlKTtcblx0XHRcdGxldCBkYXRhID0ge307XG5cdFx0XHRkYXRhW2tleV0gPSBqc29uVmFsdWU7XG5cblx0XHRcdGxldCBkYXRhMiA9IHt9O1xuXHRcdFx0ZGF0YTJba2V5XSA9IG9yaWdpbmFsRGF0YU9iajtcblxuXHRcdFx0Ly8gY29uc3Qgb2JqID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSwgZGF0YTIpO1xuXHRcdFx0Y29uc3Qgb2JqID0gdGhpcy5leHRlbmQoZGF0YSwgZGF0YTIpO1xuXHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0odGFibGUsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuXHRcdFx0XG5cdFx0XHQvLyBsZXQganNvblZhbHVlID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG5cdFx0XHQvLyBqc29uVmFsdWVba2V5XSA9IEpTT04ucGFyc2UoanNvblZhbHVlW2tleV0pO1xuXG5cdFx0XHQvLyBsZXQgdGVtcCA9IEpTT04ucGFyc2Uob3JpZ2luYWxEYXRhT2JqKTtcblx0XHRcdC8vIGxldCBvcmlnaW5hbERhdGFKc29uID0ge307XG5cdFx0XHQvLyBvcmlnaW5hbERhdGFKc29uW2tleV0gPSB0ZW1wO1xuXG5cdFx0XHQvLyBjb25zdCBvYmogPSBPYmplY3QuYXNzaWduKHt9LCBvcmlnaW5hbERhdGFPYmosIGpzb25WYWx1ZSk7XG5cdFx0XHQvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0YWJsZSwgSlNPTi5zdHJpbmdpZnkob2JqKSk7XG5cdFx0fVxuXHR9XG5cblx0cmVtb3ZlKGtleTogc3RyaW5nKSB7XG5cdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcblx0fVxuXG5cdGFsbFN0b3JhZ2UoKSB7XG5cdFx0bGV0IGFyY2hpdmUgPSB7fTtcblx0XHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSk7XG5cdFx0bGV0IGkgPSBrZXlzLmxlbmd0aDtcblxuXHRcdHdoaWxlIChpLS0pIHtcblx0XHRcdGFyY2hpdmVba2V5c1tpXV0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXlzW2ldKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJjaGl2ZTtcblx0fVxuXG5cblx0cHJpdmF0ZSBleHRlbmQoLi4uYXJncykge1xuXHRcdGxldCBvLCBpLCBrO1xuXHRcdGZvciAobyA9IHt9LCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Ly8gaWYgKGFyZ3VtZW50c1tpXS5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0KSBjb250aW51ZTtcblx0XHRcdGZvciAoayBpbiBhcmd1bWVudHNbaV0pIHtcblx0XHRcdFx0aWYgKGFyZ3VtZW50c1tpXS5oYXNPd25Qcm9wZXJ0eShrKSkge1xuXHRcdFx0XHRcdG9ba10gPSBhcmd1bWVudHNbaV1ba10uY29uc3RydWN0b3IgPT09IE9iamVjdCA/IHRoaXMuZXh0ZW5kKG9ba10gfHwge30sIGFyZ3VtZW50c1tpXVtrXSkgOiBhcmd1bWVudHNbaV1ba107XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG87XG5cdH1cbn0iLCJpbXBvcnQgeyBTdGF0ZU1hbmFnZXIsIEdhbWUgfSBmcm9tIFwicGhhc2VyLWNlXCI7XG5pbXBvcnQgU2VydmljZUNvbnRyb2xsZXIgZnJvbSBcIi4uL2NvbnRyb2xsZXIvc2VydmljZUNvbnRyb2xsZXJcIjtcbmltcG9ydCBTdGF0ZUNvbnRyb2xsZXIgZnJvbSBcIi4uL2NvbnRyb2xsZXIvc3RhdGVDb250cm9sbGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2UgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xuXHRzZXJ2aWNlQ29udHJvbGxlciA6IFNlcnZpY2VDb250cm9sbGVyO1xuXHRzdGF0ZUNvbnRyb2xsZXIgOiBTdGF0ZUNvbnRyb2xsZXI7XG5cblx0Y29uc3RydWN0b3IoZ2FtZSA6IFBoYXNlci5HYW1lKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdC8vIEZvciBJZ25vcmluZyBub24tZXhpc3QgcHJvcGVydHkgZXJyb3IuXG5cdFx0dGhpcy5zZXJ2aWNlQ29udHJvbGxlciA9IChnYW1lIGFzIGFueSkuc2VydmljZUNvbnRyb2xsZXI7XG5cdFx0dGhpcy5zdGF0ZUNvbnRyb2xsZXIgPSAoZ2FtZSBhcyBhbnkpLnN0YXRlQ29udHJvbGxlcjtcblx0fVxuXG5cdGdvU3RhdGUoc3RyaW5nKSB7XG5cdFx0dGhpcy5zZXJ2aWNlQ29udHJvbGxlciBcblx0fVxuXHRcbn0iLCJpbXBvcnQgQmFzZSBmcm9tIFwiLi9iYXNlXCI7XG5cbmV4cG9ydCBjbGFzcyBJbnRybyBleHRlbmRzIEJhc2Uge1xuXHRzdGF0aWMgaW50cm9JbnRlcnZhbCA9IDE1MDA7XG5cblx0Z2FtZVRpdGxlIDogc3RyaW5nO1xuXHRsb2dvVGV4dCA6IFBoYXNlci5UZXh0O1xuXG5cdGNvbnN0cnVjdG9yKGdhbWU6IFBoYXNlci5HYW1lKSB7XG5cdFx0c3VwZXIoZ2FtZSk7XG5cdH1cblxuXHRpbml0KGdhbWVUaXRsZSkge1xuXHRcdHRoaXMuZ2FtZVRpdGxlID0gZ2FtZVRpdGxlO1xuXHR9XG5cblx0cHJlbG9hZCgpIHtcblx0XHRcblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHR0aGlzLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjNDQ4OEFBJztcblxuXHRcdHRoaXMubG9nb1RleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQoXG5cdFx0XHR0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgXG5cdFx0XHR0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgXG5cdFx0XHR0aGlzLmdhbWVUaXRsZSxcblx0XHRcdHtcblx0XHRcdFx0Zm9udDogJzgwcHggQXJpYWw7Jyxcblx0XHRcdFx0ZmlsbDogJyNmZmZmZmYnXG5cdFx0XHR9XG5cdFx0KTtcblx0XHR0aGlzLmxvZ29UZXh0LmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XG5cdFx0dGhpcy5sb2dvVGV4dC5hbHBoYSA9IDAuODtcblxuXHRcdGNvbnN0IHAgPSB0aGlzLmdhbWUud29ybGQuYm91bmRzLmJvdHRvbVJpZ2h0O1xuXHRcdFxuXHRcdGNvbnN0IGZvb3RlciA9IHRoaXMuZ2FtZS5hZGQudGV4dChcblx0XHRcdHAueCAtIDEwMCxcblx0XHRcdHAueSAtIDMwLFxuXHRcdFx0J3YxLjAsIG1hZGUgd2l0aCBQaGFzZXInLFxuXHRcdFx0e1xuXHRcdFx0XHRmb250OiAnMTVweCBBcmlhbDsnLFxuXHRcdFx0XHRmaWxsOiAnI2VlZWVlZSdcblx0XHRcdH1cblx0XHQpO1xuXHRcdGZvb3Rlci5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xuXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdHNlbGYuc3RhdGVDb250cm9sbGVyLmdvU3RhdGUoJ0xvZ2luJyk7XG5cdFx0fSwgSW50cm8uaW50cm9JbnRlcnZhbCk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cblx0fVxufSIsImltcG9ydCBTZXJ2aWNlQ29udHJvbGxlciBmcm9tIFwiLi4vY29udHJvbGxlci9zZXJ2aWNlQ29udHJvbGxlclwiO1xuaW1wb3J0IEJhc2UgZnJvbSBcIi4vYmFzZVwiO1xuaW1wb3J0IFJlY29yZCwgeyBTdGFnZVJlY29yZCB9IGZyb20gXCIuLi92by9yZWNvcmRcIlxuaW1wb3J0IHsgUmFua1V0aWwgfSBmcm9tIFwiLi4vdm8vcmFua1wiO1xuXG5leHBvcnQgY2xhc3MgTGV2ZWwgZXh0ZW5kcyBCYXNlIHtcblx0cmVhZG9ubHkgbnVtYmVyT2ZTdGFnZSA9IDM7XG5cblx0bG93ZXJTdGFnZUJ0biA6IFBoYXNlci5CdXR0b247XG5cdGhpZ2hlclN0YWdlQnRuIDogUGhhc2VyLkJ1dHRvbjtcblx0Y3VycmVudFN0YWdlOiBudW1iZXI7XG5cdHN0YWdlTWFwOiBhbnk7XG5cblx0cmVjb3JkOiBSZWNvcmQ7XG5cblx0Y29uc3RydWN0b3IoZ2FtZSkge1xuXHRcdHN1cGVyKGdhbWUpO1xuXHR9XG5cdFxuXHRpbml0KHN0YWdlTWFwKSB7XG5cdFx0dGhpcy5zdGFnZU1hcCA9IHN0YWdlTWFwO1xuXHR9XG5cblx0cHJlbG9hZCgpIHtcblx0XHR0aGlzLmdhbWUubG9hZC5zcHJpdGVzaGVldCgnc3RhZ2VBcnJvd3MnLCAnLi4vYXNzZXRzL2ltZy9zdGFnZUFycm93cy5wbmcnLCA0OCwgNDgpO1xuXG5cdFx0dGhpcy5yZWNvcmQgPSB0aGlzLnNlcnZpY2VDb250cm9sbGVyLmdldFJlY29yZCgpO1xuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzlCOUI5Qic7XG5cdFx0dGhpcy5nYW1lLnN0YWdlLmFscGhhID0gMC45O1xuXHRcdHRoaXMuZHJhd1N0YWdlQnRuKCk7XG5cdFx0dGhpcy5kcmF3U3RhZ2VNb3ZlQnRuKCk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cblx0fVxuXG5cdHByaXZhdGUgZHJhd1N0YWdlQnRuKCkge1xuXHRcdGNvbnN0IHdpZHRoID0gMjAwO1xuXHRcdGNvbnN0IGhlaWdodCA9IDIwMDtcblxuXHRcdGxldCBvZmZzZXRYID0gKHRoaXMuZ2FtZS53b3JsZC53aWR0aCAtIDE1MCkgLyB0aGlzLm51bWJlck9mU3RhZ2U7IC8vIDE1MDogcGFkZGluZ1xuXG5cdFx0bGV0IHN0YWdlSW5mb3MgPSB7fTtcblx0XHRpZiAodGhpcy5yZWNvcmQpIHtcblx0XHRcdHN0YWdlSW5mb3MgPSB0aGlzLnJlY29yZC5yZWNvcmRzO1xuXHRcdH1cblx0XHRcblx0XHRmb3IgKGxldCBpPTA7IGk8dGhpcy5udW1iZXJPZlN0YWdlOyBpKyspIHtcblx0XHRcdGxldCBzdGFnZUluZm86IFN0YWdlUmVjb3JkO1xuXHRcdFx0bGV0IHN0YWdlSW5mb1N0ciA9ICcnO1xuXHRcdFx0aWYgKHN0YWdlSW5mb3NbaV0pIHtcblx0XHRcdFx0c3RhZ2VJbmZvID0gc3RhZ2VJbmZvc1tpXTtcblx0XHRcdFx0c3RhZ2VJbmZvU3RyICs9ICdcXG5UaW1lOiAnICsgc3RhZ2VJbmZvLnRpbWUgKyAnIHNlY29uZHMnO1xuXHRcdFx0XHRzdGFnZUluZm9TdHIgKz0gJ1xcblJhbms6ICcgKyBSYW5rVXRpbC52YWx1ZU9mKHN0YWdlSW5mby5yYW5rKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgc3RhZ2VCdG5UZXh0ID0gYFN0YWdlLSR7aSsxfWAgKyBzdGFnZUluZm9TdHI7XG5cdFx0XHRjb25zdCBzdGFnZUJ0biA9IHRoaXMuZ2FtZS5hZGQudGV4dCgxNDUgKyAob2Zmc2V0WCAqIGkpLCA5MCwgc3RhZ2VCdG5UZXh0LCB7XG5cdFx0XHRcdGZpbGw6ICcjZmZmZmZmJyxcblx0XHRcdFx0Zm9udDogJzE1cHggQXJpYWwnXG5cdFx0XHR9KTtcblxuXHRcdFx0c3RhZ2VCdG4uaW5wdXRFbmFibGVkID0gdHJ1ZTtcblx0XHRcdHN0YWdlQnRuLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xuXHRcdFx0XG5cdFx0XHRjb25zdCBzdGFnZU51bSA9IGkrMTtcblx0XHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdFx0c3RhZ2VCdG4uZXZlbnRzLm9uSW5wdXREb3duLmFkZCgoZSkgPT4ge1xuXHRcdFx0XHRpZiAoY29uZmlybShgV2FubmEgR28gdG8gU3RhZ2UtJHtzdGFnZU51bX0/YCkpIHtcblx0XHRcdFx0XHRzZWxmLnN0YXRlQ29udHJvbGxlci5nb1N0YXRlKCdQbGF5JywgdHJ1ZSwgdHJ1ZSwgc2VsZi5zdGFnZU1hcFtpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIHRoaXMpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgZHJhd1N0YWdlTW92ZUJ0bigpIHtcblx0XHRjb25zdCBwID0gdGhpcy5nYW1lLndvcmxkLmJvdW5kcztcblxuXHRcdHRoaXMubG93ZXJTdGFnZUJ0biA9IHRoaXMuZ2FtZS5hZGQuYnV0dG9uKDEwMCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclkgLCBcInN0YWdlQXJyb3dzXCIsIHRoaXMuYnV0dG9uQ2xpY2tlZCk7XG5cdFx0dGhpcy5oaWdoZXJTdGFnZUJ0biA9IHRoaXMuZ2FtZS5hZGQuYnV0dG9uKDEwMCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclksIFwic3RhZ2VBcnJvd3NcIiwgdGhpcy5idXR0b25DbGlja2VkKTtcblxuXHRcdHRoaXMubG93ZXJTdGFnZUJ0bi5mcmFtZSA9IDA7XG5cdFx0dGhpcy5oaWdoZXJTdGFnZUJ0bi5mcmFtZSA9IDE7XG5cblx0XHQvLyBBbGlnbiBzdGFnZSBwYWdlIG1vdmUgYnRuXG5cdFx0dGhpcy5sb3dlclN0YWdlQnRuLnggPSAyMDtcblx0XHR0aGlzLmhpZ2hlclN0YWdlQnRuLnggPSBwLnJpZ2h0IC0gMjAgLSB0aGlzLmhpZ2hlclN0YWdlQnRuLndpZHRoO1xuXG5cdFx0Y29uc3Qgc3RhZ2VUZXh0ID0gdGhpcy5nYW1lLmFkZC50ZXh0KHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCA1MCwgJ1N0YWdlJywge1xuXHRcdFx0ZmlsbDogJyNmZmZmZmYnLFxuXHRcdFx0Zm9udDogJzIwcHggQXJpYWwnXG5cdFx0fSk7XG5cblx0XHRzdGFnZVRleHQuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcblx0fVxuXG5cdHByaXZhdGUgYnV0dG9uQ2xpY2tlZChidXR0b24sIHBvaW50ZXIpIHtcblx0XHRpZiAoYnV0dG9uLmZyYW1lID09IDApIHsgLy8gbG93ZXJTdGFnZUJ0blxuXG5cdFx0fSBlbHNlIGlmIChidXR0b24uZnJhbWUgPT0gMSkgeyAvLyBoaWdoZXJTdGFnZUJ0blxuXG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vdm8vdXNlcic7XG5cbmV4cG9ydCBjbGFzcyBMb2dpbiBleHRlbmRzIEJhc2Uge1xuXHRsb2dpblRleHQgOiBQaGFzZXIuVGV4dDtcblx0Z2FtZUxvZ28gOiBQaGFzZXIuSW1hZ2U7XG5cblx0Z3Vlc3RVVUlEIDogc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKGdhbWUpIHtcblx0XHRzdXBlcihnYW1lKTtcblx0fVxuXG5cdHByZWxvYWQoKSB7XG5cdFx0dGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ2dhbWVMb2dvJywgJ2Fzc2V0cy9pbWcvZ2FtZWxvZ28ucG5nJyk7XG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0dGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI0ZGRkZGRic7XG5cblx0XHR0aGlzLmdhbWVMb2dvID0gdGhpcy5nYW1lLmFkZC5pbWFnZSh0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgMjEwLCAnZ2FtZUxvZ28nKTtcblx0XHR0aGlzLmdhbWVMb2dvLmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XG5cblx0XHR0aGlzLmxvZ2luVGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dChcblx0XHRcdHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCBcblx0XHRcdHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZLCBcblx0XHRcdCdMb2dpbicsXG5cdFx0XHR7XG5cdFx0XHRcdGZvbnQ6ICczNXB4IEFyaWFsOycsXG5cdFx0XHRcdGZpbGw6ICcjMDAwMDAwJ1xuXHRcdFx0fVxuXHRcdCk7XG5cdFx0dGhpcy5sb2dpblRleHQuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcblx0XHR0aGlzLmxvZ2luVGV4dC5hbHBoYSA9IDAuODtcblxuXHRcdHRoaXMubG9naW5UZXh0LmlucHV0RW5hYmxlZCA9IHRydWU7XG5cdFx0dGhpcy5sb2dpblRleHQuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XG5cblx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHR0aGlzLmxvZ2luVGV4dC5ldmVudHMub25JbnB1dERvd24uYWRkKChlKSA9PiB7XG5cdFx0XHRjb25zdCB0d2VlbiA9IHNlbGYuZ2FtZS5hZGQudHdlZW4oc2VsZi5sb2dpblRleHQpLnRvKHtcblx0XHRcdFx0YWxwaGE6IDAuMlxuXHRcdFx0fSwgNzAwLCBQaGFzZXIuRWFzaW5nLlF1YWRyYXRpYy5PdXQsIGZhbHNlLCAwLCAwLCBmYWxzZSk7XG5cdFx0XHRcblx0XHRcdHR3ZWVuLm9uQ29tcGxldGUuYWRkKChlKSA9PiB7XG5cdFx0XHRcdGxldCB1c2VyID0gc2VsZi5zZXJ2aWNlQ29udHJvbGxlci5hdXRoU2VydmljZS5nZXRMYXN0TG9nZ2VkSW5Vc2VyKCk7XG5cdFx0XHRcdGlmICh1c2VyICYmIHVzZXIudXNlcklkKSB7XG5cdFx0XHRcdFx0c2VsZi5zZXJ2aWNlQ29udHJvbGxlci5sb2dpbih1c2VyLnVzZXJJZCwgKHVzZXI6IFVzZXIsIGlzU3VjY2VzczogYm9vbGVhbikgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKGlzU3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0XHRhbGVydChgJHt1c2VyLnVzZXJJZH3ri5gg7ZmY7JiB7ZWp64uI64ukLmApO1xuXHRcdFx0XHRcdFx0XHRjb25zdCBzdGFnZUluZm8gPSBzZWxmLnNlcnZpY2VDb250cm9sbGVyLmdldFN0YWdlSW5mb3JtYXRpb24oKTtcblx0XHRcdFx0XHRcdFx0c2VsZi5zdGF0ZUNvbnRyb2xsZXIuZ29TdGF0ZSgnTGV2ZWwnLCB0cnVlLCB0cnVlLCBzdGFnZUluZm8pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0YWxlcnQoJ+yYiOyghOyXkCDrsKnrrLjtlZjsi6Ag7KCB7J20IOyXhuycvOyLnOq1sOyalD8g7IKs7Jqp7J6QIOuTseuhne2ZlOuptOycvOuhnCDsnbTrj5ntlanri4jri6QuJyk7XG5cdFx0XHRcdFx0XHRcdHNlbGYuc3RhdGVDb250cm9sbGVyLmdvU3RhdGUoJ1JlZ2lzdGVyJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XHRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhbGVydCgn7JiI7KCE7JeQIOuwqeusuO2VmOyLoCDsoIHsnbQg7JeG7Jy87Iuc6rWw7JqUPyDsgqzsmqnsnpAg65Ox66Gd7ZmU66m07Jy866GcIOydtOuPme2VqeuLiOuLpC4nKTtcblx0XHRcdFx0XHRzZWxmLnN0YXRlQ29udHJvbGxlci5nb1N0YXRlKCdSZWdpc3RlcicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCBzZWxmKTtcblxuXHRcdFx0dHdlZW4uc3RhcnQoKTtcblx0XHR9LCB0aGlzKTtcblxuXG5cdFx0dGhpcy5sb2dpblRleHQuZXZlbnRzLm9uSW5wdXRPdmVyLmFkZCgoZSkgPT4ge1xuXHRcdFx0c2VsZi5sb2dpblRleHQuYWxwaGEgPSAwLjU7XG5cdFx0fSwgdGhpcyk7XG5cblx0XHR0aGlzLmxvZ2luVGV4dC5ldmVudHMub25JbnB1dE91dC5hZGQoKGUpID0+IHtcblx0XHRcdHNlbGYubG9naW5UZXh0LmFscGhhID0gMC44O1xuXHRcdH0sIHRoaXMpO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXG5cdH1cbn0iLCJpbXBvcnQgQmFzZSBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgeyBTdGFnZSB9IGZyb20gXCIuLi92by9zdGFnZVwiO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vdm8vcG9pbnRcIjtcbmltcG9ydCB7IFJlY29yZERhbyB9IGZyb20gXCIuLi9kYW8vcmVjb3JkRGFvXCI7XG5pbXBvcnQgUmVjb3JkLCB7IFN0YWdlUmVjb3JkIH0gZnJvbSBcIi4uL3ZvL3JlY29yZFwiO1xuaW1wb3J0IHsgUmFuayB9IGZyb20gXCIuLi92by9yYW5rXCI7XG5cbmV4cG9ydCBjbGFzcyBQbGF5IGV4dGVuZHMgQmFzZSB7XG5cdHN0YXRpYyByZWFkb25seSByYXlMZW5ndGggPSA1MDA7XG5cdHN0YXRpYyByZWFkb25seSBudW1PZlJheXMgPSAyMDtcblx0c3RhdGljIHJlYWRvbmx5IGxpZ2h0QW5nbGUgPSBNYXRoLlBJLzQ7IC8vIDQ1IGRlZy5cblxuXHRwcml2YXRlIHJlYWRvbmx5IHNwZWVkID0gMjtcblxuXHR0aW1lciA6IFBoYXNlci5UaW1lcjtcblxuXHQvLyBmbG9vciA6IFBoYXNlci5UaWxlU3ByaXRlO1xuXHRmbG9vciA6IFBoYXNlci5TcHJpdGU7XG5cdHdhbGwgOiBQaGFzZXIuU3ByaXRlO1xuXHR3YWxsc0JpdE1hcCA6IFBoYXNlci5CaXRtYXBEYXRhO1xuXHRtYXNrIDogUGhhc2VyLkdyYXBoaWNzO1xuXHRwbGF5ZXIgOiBQaGFzZXIuU3ByaXRlO1xuXHRwbGF5ZXJQYXRoIDogc3RyaW5nO1xuXG5cdGN1cnNvciA6IFBoYXNlci5DdXJzb3JLZXlzO1xuXHRcblx0c3RhZ2VJbmZvIDogU3RhZ2U7XG5cdGN1cnJlbnRFeGl0UG9pbnQgOiBQb2ludDtcblx0Y3VycmVudEV4aXRHcmFwaGljIDogUGhhc2VyLkdyYXBoaWNzO1xuXG5cdHdhbGxDb2xsaXNpb25Tb3VuZDogUGhhc2VyLlNvdW5kO1xuXHR0YWRhU291bmQ6IFBoYXNlci5Tb3VuZDtcblxuXHRjb25zdHJ1Y3RvcihnYW1lKSB7XG5cdFx0c3VwZXIoZ2FtZSk7XG5cdH1cblxuXHRpbml0KHN0YWdlSW5mbyA6IFN0YWdlKSB7XG5cdFx0dGhpcy5zdGFnZUluZm8gPSBzdGFnZUluZm87XG5cdFx0dGhpcy5wbGF5ZXJQYXRoID0gJ2Fzc2V0cy9pbWcvcGxheWVyLXNwcmVhZHNoZWV0LnBuZyc7XG5cdH1cblxuXHRwcmVsb2FkKCkge1xuXHRcdHRoaXMuZ2FtZS5sb2FkLmltYWdlKCdmbG9vcicsIHRoaXMuc3RhZ2VJbmZvLmZsb29yRmlsZVBhdGgpO1xuXHRcdHRoaXMuZ2FtZS5sb2FkLmltYWdlKCd3YWxsJywgdGhpcy5zdGFnZUluZm8ud2FsbEZpbGVQYXRoKTtcblx0XHR0aGlzLmdhbWUubG9hZC5zcHJpdGVzaGVldCgncGxheWVyJywgdGhpcy5wbGF5ZXJQYXRoLCA2NCwgNjQsIDM2KTtcblx0XHR0aGlzLmxvYWQuYXVkaW8oXCJ3YWxsQ29sbGlzaW9uU291bmRcIiwgW1wiYXNzZXRzL21wMy9iZWVwLTAxYS5tcDNcIl0pO1xuXHRcdHRoaXMubG9hZC5hdWRpbyhcInRhZGFTb3VuZFwiLCBbXCJhc3NldHMvbXAzL3RhZGEtMDFhLm1wM1wiXSk7XG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0dGhpcy53YWxsQ29sbGlzaW9uU291bmQgPSB0aGlzLmFkZC5hdWRpbygnd2FsbENvbGxpc2lvblNvdW5kJyk7XG5cdFx0dGhpcy50YWRhU291bmQgPSB0aGlzLmFkZC5hdWRpbygndGFkYVNvdW5kJyk7XG5cblx0XHR0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAwMDAnOyBcblx0XHQvLyB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJzB4ZmZmZmZmJzsgXG5cblx0XHR0aGlzLmdhbWUud29ybGQuc2V0Qm91bmRzKDAsIDAsIHRoaXMud29ybGQud2lkdGgsIHRoaXMud29ybGQuaGVpZ2h0LTEyMCk7XG5cdFx0XG5cdFx0dGhpcy5jcmVhdGVGbG9vcigpO1xuXHRcdHRoaXMubWFrZUZpcnN0RXhpdFBvaW50KCk7XG5cdFx0dGhpcy5jcmVhdGVXYWxsKCk7XG5cdFx0dGhpcy5jcmVhdGVQbGF5ZXIoKTsgXG5cblx0XHR0aGlzLmdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllciwgUGhhc2VyLkNhbWVyYS5GT0xMT1dfTE9DS09OLCAwLjEsIDAuMSk7XG5cblx0XHR0aGlzLmNyZWF0ZU1hc2soKTtcblxuXHRcdHRoaXMuZmxvb3IubWFzayA9IHRoaXMubWFzaztcblxuXHRcdHRoaXMudGltZXIgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUoZmFsc2UpO1xuXG5cdFx0dGhpcy5jdXJzb3IgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xuXHRcdHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRDYWxsYmFja3ModGhpcywgKGtleSkgPT4ge1xuXHRcdFx0Ly9UT0RPOiB3YXNkIOqwgOuKpe2VmOqyjCDtlaAg6rKDXG5cdFx0XHRpZiAoa2V5LmtleUNvZGUgPT09IDg3KSB7XHRcdC8vIFcsIFVwXG5cdFx0XHRcdFxuXHRcdFx0fSBlbHNlIGlmIChrZXkua2V5ID09PSA2NSkge1x0Ly8gQSwgTGVmdFxuXHRcdFx0XG5cdFx0XHR9IGVsc2UgaWYgKGtleS5rZXkgPT09IDgzKSB7XHQvLyBTLCBEb3duXG5cdFx0XHRcblx0XHRcdH0gZWxzZSBpZiAoa2V5LmtleSA9PT0gNjgpIHtcdC8vIEQsIFJpZ2h0XG5cdFx0XHRcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMuY3JlYXRlVGltZXIoKTtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlVGltZXIoKSB7XG5cdFx0Y29uc3QgdGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dCh0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgNTAwLCAnVGltZXIgOiAnLCB7XG5cdFx0XHRmaWxsOiAnI2ZmZmZmZicsXG5cdFx0XHRmb250OiAnMTVweCBBcmlhbCdcblx0XHR9KTtcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblx0XHR0aGlzLm1vdmVQbGF5ZXIoKTtcblx0XHR0aGlzLm1vdmVGbGFzaCgpO1xuXHRcdHRoaXMucmFuZG9tQWxwaGFUbyh0aGlzLmZsb29yKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLmdhbWUuZGVidWcuaW5wdXRJbmZvKDMyLCAzMik7XG5cdH1cblxuXHRwcml2YXRlIG1ha2VGaXJzdEV4aXRQb2ludCgpIHtcblx0XHRjb25zdCBpZHhPZkV4aXRQb2ludCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSkqMTEgJSB0aGlzLnN0YWdlSW5mby5leGl0UG9pbnRzLmxlbmd0aDtcblx0XHR0aGlzLnN0YWdlSW5mby5leGl0UG9pbnRzW2lkeE9mRXhpdFBvaW50XS5hY3RpdmUgPSB0cnVlO1xuXHRcdHRoaXMuY3VycmVudEV4aXRQb2ludCA9IHRoaXMuc3RhZ2VJbmZvLmV4aXRQb2ludHNbaWR4T2ZFeGl0UG9pbnRdO1xuXHRcdHRoaXMucmVuZGVyRXhpdFBvaW50KHRoaXMuY3VycmVudEV4aXRQb2ludCk7XG5cdH1cblxuXHRwcml2YXRlIHJlbmRlckV4aXRQb2ludChleGl0UG9pbnQgOiBQb2ludCkge1xuXHRcdGNvbnN0IGdyYXBoaWNhbFBvaW50ID0gKHgsIHkpID0+IHtcblx0XHRcdHRoaXMuY3VycmVudEV4aXRHcmFwaGljID0gdGhpcy5nYW1lLmFkZC5ncmFwaGljcygwLCAwKTtcblx0XHRcdHRoaXMuY3VycmVudEV4aXRHcmFwaGljLmJlZ2luRmlsbCgweGZmMDAwMCwgMC44KTtcblx0XHRcdHRoaXMuY3VycmVudEV4aXRHcmFwaGljLmRyYXdDaXJjbGUoeCwgeSwgMTApO1xuXHRcdFx0dGhpcy5jdXJyZW50RXhpdEdyYXBoaWMuZW5kRmlsbCgpO1xuXHRcdH07XG5cblx0XHRncmFwaGljYWxQb2ludChleGl0UG9pbnQueCwgZXhpdFBvaW50LnkpO1xuXHR9XG5cblx0cHJpdmF0ZSByYW5kb21BbHBoYVRvKG9iaiA6YW55KSB7XG5cdFx0b2JqLmFscGhhID0gMC41ICsgTWF0aC5yYW5kb20oKSAqIDAuNTtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlUGxheWVyKCkge1xuXHRcdHRoaXMucGxheWVyID0gdGhpcy5nYW1lLmFkZC5zcHJpdGUoNzUsIDc1LCAncGxheWVyJyk7XG5cdFx0dGhpcy5wbGF5ZXIuYW5jaG9yLnNldCguNSwgLjUpO1x0XG5cblx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgnbm9ydGgnLCBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOF0sIDEwLCB0cnVlKTtcblx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgnd2VzdCcsIFs5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTddLCAxMCwgdHJ1ZSk7XG5cdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5hZGQoJ3NvdXRoJywgWzE4LCAxOSwgMjAsIDIxLCAyMiwgMjMsIDI0LCAyNSwgMjZdLCAxMCwgdHJ1ZSk7XG5cdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5hZGQoJ2Vhc3QnLCBbMjcsIDI4LCAyOSwgMzAsIDMxLCAzMiwgMzMsIDM0LCAzNSBdLCAxMCwgdHJ1ZSk7XG5cdH1cblxuXHRwcml2YXRlIGNyZWF0ZUZsb29yKCkge1xuXHRcdHRoaXMuZmxvb3IgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSgwLCAwLCAnZmxvb3InKTtcblx0XHR0aGlzLmZsb29yLndpZHRoID0gNjQwO1xuXHRcdHRoaXMuZmxvb3IuaGVpZ2h0ID0gNDgwO1xuXHR9XG5cblx0cHJpdmF0ZSBjcmVhdGVNYXNrKCkge1xuXHRcdHRoaXMubWFzayA9IHRoaXMuZ2FtZS5hZGQuZ3JhcGhpY3MoMCwgMCk7XG5cdH1cblxuXHRwcml2YXRlIGNyZWF0ZVdhbGwoKSB7XG5cdFx0dGhpcy53YWxsc0JpdE1hcCA9IHRoaXMuZ2FtZS5tYWtlLmJpdG1hcERhdGEoNjQwLCA0ODApO1xuXHRcdHRoaXMud2FsbHNCaXRNYXAuZHJhdygnd2FsbCcpO1xuXHRcdHRoaXMud2FsbHNCaXRNYXAudXBkYXRlKCk7XG5cdFx0dGhpcy53YWxsID0gdGhpcy5nYW1lLmFkZC5zcHJpdGUoMCwgMCwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdH1cblxuXHRwcml2YXRlIG1vdmVGbGFzaCgpIHtcblx0XHRjb25zdCBwbGF5ZXJXaWR0aCA9IHRoaXMucGxheWVyLndpZHRoO1xuXHRcdGNvbnN0IHBsYXllckhlaWdodCA9IHRoaXMucGxheWVyLmhlaWdodDtcblxuXHRcdGNvbnN0IHBsYXllclggPSB0aGlzLnBsYXllci54O1xuXHRcdGNvbnN0IHBsYXllclkgPSB0aGlzLnBsYXllci55O1xuXHRcdFxuXHRcdGNvbnN0IGR5ID0gdGhpcy5nYW1lLmlucHV0LnkgLSBwbGF5ZXJZO1xuXHRcdGNvbnN0IGR4ID0gdGhpcy5nYW1lLmlucHV0LnggLSBwbGF5ZXJYO1xuXG5cdFx0Y29uc3QgbW91c2VBbmdsZSA9IE1hdGguYXRhbjIoZHksIGR4KTtcblxuXHRcdHRoaXMubWFzay5jbGVhcigpO1xuXHRcdHRoaXMubWFzay5saW5lU3R5bGUoMiwgMHhmZmZmZmYsIDEpO1xuXG5cdFx0dGhpcy5tYXNrLmJlZ2luRmlsbCgweDAwMDAwMCk7XG5cdFx0dGhpcy5tYXNrLm1vdmVUbyhwbGF5ZXJYLCBwbGF5ZXJZKTtcblx0XHRmb3IgKGxldCBpPTA7IGk8UGxheS5udW1PZlJheXM7IGkrKykge1xuXHRcdFx0Y29uc3QgcmF5QW5nbGUgPSBtb3VzZUFuZ2xlIC0gKFBsYXkubGlnaHRBbmdsZS8yKSArIChQbGF5LmxpZ2h0QW5nbGUvUGxheS5udW1PZlJheXMpICogaTtcblx0XHRcdGxldCBsYXN0WCA9IHBsYXllclg7XG5cdFx0XHRsZXQgbGFzdFkgPSBwbGF5ZXJZO1xuXHRcdFx0XG5cdFx0XHRmb3IgKGxldCBqPTE7IGo8PVBsYXkucmF5TGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0Y29uc3QgeCA9IE1hdGgucm91bmQocGxheWVyWCArIChqICogTWF0aC5jb3MocmF5QW5nbGUpKSk7XG5cdFx0XHRcdGNvbnN0IHkgPSBNYXRoLnJvdW5kKHBsYXllclkgKyAoaiAqIE1hdGguc2luKHJheUFuZ2xlKSkpO1xuXG5cdFx0XHRcdGNvbnN0IGNvbG9yID0gdGhpcy5waWNrQ29sb3JPZih4LCB5LCB0aGlzLndhbGxzQml0TWFwKTtcblx0XHRcdFx0aWYgKGNvbG9yID09IDApIHtcblx0XHRcdFx0XHRsYXN0WCA9IHg7XG5cdFx0XHRcdFx0bGFzdFkgPSB5O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMubWFzay5saW5lVG8obGFzdFgsIGxhc3RZKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5tYXNrLmxpbmVUbyhsYXN0WCwgbGFzdFkpO1xuXHRcdH1cblxuXHRcdHRoaXMubWFzay5saW5lVG8ocGxheWVyWCwgcGxheWVyWSk7XG5cdFx0dGhpcy5tYXNrLmVuZEZpbGwoKTtcblx0fVxuXG5cdHByaXZhdGUgbW92ZVBsYXllcigpIHtcblx0XHRsZXQgeFNwZWVkID0gMDtcblx0XHRsZXQgeVNwZWVkID0gMDtcblx0XHRsZXQgaXNNb3ZpbmcgPSBmYWxzZTtcblx0XHRsZXQgY2FuTW92ZSA9IGZhbHNlO1xuXG5cdFx0Y29uc3QgcGxheWVyV2lkdGggPSB0aGlzLnBsYXllci53aWR0aDtcblx0XHRjb25zdCBwbGF5ZXJIZWlnaHQgPSB0aGlzLnBsYXllci5oZWlnaHQ7XG5cblx0XHRjb25zdCBwbGF5ZXJYID0gdGhpcy5wbGF5ZXIueDtcblx0XHRjb25zdCBwbGF5ZXJZID0gdGhpcy5wbGF5ZXIueTtcblxuXHRcdGNvbnN0IGNvbG9yID0ge1xuXHRcdFx0bm9ydGggOiAwLFxuXHRcdFx0c291dGggOiAwLFxuXHRcdFx0d2VzdCA6IDAsXG5cdFx0XHRlYXN0IDogMFxuXHRcdH1cblxuXHRcdGlmICh0aGlzLmN1cnNvci51cC5pc0Rvd24pIHtcblx0XHRcdHlTcGVlZCAtPSB0aGlzLnNwZWVkO1xuXHRcdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdub3J0aCcpO1xuXHRcdFx0Y29uc3Qgbm9ydGhFYXN0ID0gdGhpcy5waWNrQ29sb3JPZihwbGF5ZXJYICsgcGxheWVyV2lkdGgvMiArIHhTcGVlZCwgcGxheWVyWSAtIHBsYXllckhlaWdodC8yICsgeVNwZWVkLCB0aGlzLndhbGxzQml0TWFwKTtcblx0XHRcdGNvbnN0IG5vcnRoV2VzdCA9IHRoaXMucGlja0NvbG9yT2YocGxheWVyWCAtIHBsYXllcldpZHRoLzIgKyB4U3BlZWQsIHBsYXllclkgLSBwbGF5ZXJIZWlnaHQvMiArIHlTcGVlZCwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdFx0XHRjb2xvci5ub3J0aCA9IG5vcnRoRWFzdCArIG5vcnRoV2VzdDtcblx0XHR9XG5cdFx0XG5cdFx0aWYgKHRoaXMuY3Vyc29yLmRvd24uaXNEb3duKSB7XG5cdFx0XHR5U3BlZWQgKz0gdGhpcy5zcGVlZDtcblx0XHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnc291dGgnKTtcblx0XHRcdGNvbnN0IHNvdXRoRWFzdCA9IHRoaXMucGlja0NvbG9yT2YocGxheWVyWCArIHBsYXllcldpZHRoLzIgKyB4U3BlZWQsIHBsYXllclkgKyBwbGF5ZXJIZWlnaHQvMiArIHlTcGVlZCwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdFx0XHRjb25zdCBzb3V0aFdlc3QgPSB0aGlzLnBpY2tDb2xvck9mKHBsYXllclggLSBwbGF5ZXJXaWR0aC8yICsgeFNwZWVkLCBwbGF5ZXJZICsgcGxheWVySGVpZ2h0LzIgKyB5U3BlZWQsIHRoaXMud2FsbHNCaXRNYXApO1xuXHRcdFx0Y29sb3Iuc291dGggPSBzb3V0aEVhc3QgKyBzb3V0aFdlc3Q7XG5cdFx0fVxuXHRcdFxuXHRcdGlmICh0aGlzLmN1cnNvci5sZWZ0LmlzRG93bikge1xuXHRcdFx0eFNwZWVkIC09IHRoaXMuc3BlZWQ7XG5cdFx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3dlc3QnKTtcblx0XHRcdGNvbnN0IHdlc3ROb3J0aCA9IHRoaXMucGlja0NvbG9yT2YocGxheWVyWCAtIHBsYXllcldpZHRoLzIgKyB4U3BlZWQsIHBsYXllclkgLSBwbGF5ZXJIZWlnaHQvMiArIHlTcGVlZCwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdFx0XHRjb25zdCB3ZXN0U291dGggPSB0aGlzLnBpY2tDb2xvck9mKHBsYXllclggLSBwbGF5ZXJXaWR0aC8yICsgeFNwZWVkLCBwbGF5ZXJZICsgcGxheWVySGVpZ2h0LzIgKyB5U3BlZWQsIHRoaXMud2FsbHNCaXRNYXApO1xuXHRcdFx0Y29sb3Iud2VzdCA9IHdlc3ROb3J0aCArIHdlc3RTb3V0aDtcblx0XHR9XG5cdFx0XG5cdFx0aWYgKHRoaXMuY3Vyc29yLnJpZ2h0LmlzRG93bikge1xuXHRcdFx0eFNwZWVkICs9IHRoaXMuc3BlZWQ7XG5cdFx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2Vhc3QnKTtcblx0XHRcdGNvbnN0IGVhc3ROb3J0aCA9IHRoaXMucGlja0NvbG9yT2YocGxheWVyWCArIHBsYXllcldpZHRoLzIgKyB4U3BlZWQsIHBsYXllclkgLSBwbGF5ZXJIZWlnaHQvMiArIHlTcGVlZCwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdFx0XHRjb25zdCBlYXN0U291dGggPSB0aGlzLnBpY2tDb2xvck9mKHBsYXllclggKyBwbGF5ZXJXaWR0aC8yICsgeFNwZWVkLCBwbGF5ZXJZICsgcGxheWVySGVpZ2h0LzIgKyB5U3BlZWQsIHRoaXMud2FsbHNCaXRNYXApO1xuXHRcdFx0Y29sb3IuZWFzdCA9IGVhc3ROb3J0aCArIGVhc3RTb3V0aDtcblx0XHR9XG5cblx0XHRpc01vdmluZyA9IE1hdGguYWJzKHhTcGVlZCkgKyBNYXRoLmFicyh5U3BlZWQpIDwgdGhpcy5zcGVlZCoyICYmIE1hdGguYWJzKHhTcGVlZCkgKyBNYXRoLmFicyh5U3BlZWQpID4gMDtcblx0XHRjYW5Nb3ZlID0gY29sb3Iubm9ydGggKyBjb2xvci5zb3V0aCArIGNvbG9yLmVhc3QgKyBjb2xvci53ZXN0ID09IDA7XG5cdFx0aWYgKGlzTW92aW5nICYmIGNhbk1vdmUpIHtcblx0XHRcdHRoaXMucGxheWVyLnggKz0geFNwZWVkO1xuXHRcdFx0dGhpcy5wbGF5ZXIueSArPSB5U3BlZWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc3RvcFBsYXllckFuaW1jYXRlaW9uKCk7XG5cdFx0fVxuXG5cdFx0aWYgKGlzTW92aW5nICYmICFjYW5Nb3ZlKSB7XG5cdFx0XHR0aGlzLmdhbWUuY2FtZXJhLnNoYWtlKCk7XG5cdFx0XHR0aGlzLndhbGxDb2xsaXNpb25Tb3VuZC5wbGF5KCk7XG5cdFx0fVxuXG5cdFx0XG5cdFx0aWYgKE1hdGguYWJzKHRoaXMuY3VycmVudEV4aXRQb2ludC54LXRoaXMucGxheWVyLngpIDwgMyAmJiBNYXRoLmFicyh0aGlzLnBsYXllci55LXRoaXMuY3VycmVudEV4aXRQb2ludC55KSA8IDMpIHtcblx0XHRcdGFsZXJ0KCdDb25ncmF0IScpO1xuXHRcdFx0dGhpcy50YWRhU291bmQucGxheSgpO1xuXG5cdFx0XHRjb25zdCB1c2VySWQgPSB0aGlzLnNlcnZpY2VDb250cm9sbGVyLmF1dGhTZXJ2aWNlLmdldExhc3RMb2dnZWRJblVzZXIoKS51c2VySWQ7XG5cdFx0XHRjb25zdCBzdGFnZUlkID0gdGhpcy5zdGFnZUluZm8uc3RhZ2VJZDtcblx0XHRcdGNvbnN0IHN0YWdlUmVjb3JkID0gbmV3IFN0YWdlUmVjb3JkKHN0YWdlSWQsIFJhbmsuUywgODApO1xuXHRcdFx0Y29uc3Qgc3RhZ2VSZWNvcmRPYmogPSB7fTtcblx0XHRcdHN0YWdlUmVjb3JkT2JqW3N0YWdlSWRdID0gc3RhZ2VSZWNvcmQ7XG5cdFx0XHRjb25zdCByZWNvcmQgPSBuZXcgUmVjb3JkKHVzZXJJZCwgc3RhZ2VSZWNvcmRPYmopO1xuXHRcdFx0dGhpcy5zZXJ2aWNlQ29udHJvbGxlci5yZWNvcmRSYW5rKHJlY29yZCk7XG5cdFx0XHRcblx0XHRcdGNvbnN0IHN0YWdlSW5mbyA9IHRoaXMuc2VydmljZUNvbnRyb2xsZXIuZ2V0U3RhZ2VJbmZvcm1hdGlvbigpO1xuXHRcdFx0dGhpcy5zdGF0ZUNvbnRyb2xsZXIuZ29TdGF0ZSgnTGV2ZWwnLCB0cnVlLCB0cnVlLCBzdGFnZUluZm8pO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgcGlja0NvbG9yT2YoeDogbnVtYmVyLCB5OiBudW1iZXIsIGJpdE1hcERhdGE6IFBoYXNlci5CaXRtYXBEYXRhKSB7XG5cdFx0Y29uc3QgY29sb3IgPSBiaXRNYXBEYXRhLmdldFBpeGVsMzIoeCwgeSk7XG5cdFx0cmV0dXJuIGNvbG9yO1xuXHR9XG5cblx0cHJpdmF0ZSBzdG9wUGxheWVyQW5pbWNhdGVpb24oKSB7XG5cdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5zdG9wKCdub3J0aCcpO1xuXHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMuc3RvcCgnc291dGgnKTtcblx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLnN0b3AoJ3dlc3QnKTtcblx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLnN0b3AoJ2Vhc3QnKTtcblx0fVxuXG5cblx0cHJpdmF0ZSBnb0Z1bGxTY3JlZW4oKSB7XG5cblx0fVxufSIsImltcG9ydCBVdGlsIGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnQvaW5wdXRUZXh0JztcbmltcG9ydCBCYXNlIGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi92by91c2VyJztcbmltcG9ydCBTY29yZSBmcm9tICcuLi92by9zY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBSZWdpc3RlciBleHRlbmRzIEJhc2Uge1xuXHRpbnB1dFRleHQgOiBDb21wb25lbnQuSW5wdXRUZXh0O1xuXHRyZWdpc3RlckJ0biA6IFBoYXNlci5UZXh0O1xuXG5cdGNvbnN0cnVjdG9yKGdhbWUpIHtcblx0XHRzdXBlcihnYW1lKTtcblx0fVxuXG5cdHByZWxvYWQoKSB7XG5cdFx0XG5cdH1cblxuXHRwcml2YXRlIHNldFJlZ2lzdGVySW5wdXRUZXh0KCkge1xuXHRcdGxldCB0ZXh0V2lkdGggPSAyMDA7XG5cdFx0bGV0IHRleHRIZWlnaHQgPSA4MDtcblx0XHRsZXQgdGV4dFggPSB0aGlzLmdhbWUud29ybGQuY2VudGVyWCAtIHRleHRXaWR0aC8yO1xuXHRcdGxldCB0ZXh0WSA9IHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZIC0gdGV4dEhlaWdodC8yO1xuXG5cdFx0bGV0IHRleHRNYXhMZW5ndGggPSAyMDtcblxuXHRcdGxldCB0ZXh0U3R5bGUgPSB7XG5cdFx0XHRmaWxsOiAnIzAwMDAwMCcsXG5cdFx0XHRib3VuZHNBbGlnbkg6ICdjZW50ZXInLFxuXHRcdFx0Ym91bmRzQWxpZ25WOiAnbWlkZGxlJyxcblx0XHRcdGZvbnQ6ICcyMHB4IEFyaWFsJ1xuXHRcdH1cblxuXHRcdHRoaXMuaW5wdXRUZXh0ID0gbmV3IENvbXBvbmVudC5JbnB1dFRleHQodGhpcy5nYW1lLCB0ZXh0WCwgdGV4dFksIHRleHRXaWR0aCwgdGV4dEhlaWdodCwgdGV4dE1heExlbmd0aCwgJ2V4KSBVc2VyMDA3MDAnLCB0ZXh0U3R5bGUpO1xuXHR9XG5cblx0cHJpdmF0ZSBzZXRSZWdpc3RlckJ1dHRvbigpIHtcblx0XHRsZXQgYnRuV2lkdGggPSAyMDA7XG5cdFx0bGV0IGJ0bkhlaWdodCA9IDgwO1xuXHRcdFxuXHRcdGxldCBidG5YID0gdGhpcy5nYW1lLndvcmxkLmNlbnRlclg7Ly8gLSBidG5XaWR0aC8yO1xuXHRcdGxldCBidG5ZID0gdGhpcy5nYW1lLndvcmxkLmNlbnRlclkgKyAxMjA7Ly8gLSBidG5IZWlnaHQvMiArIDEwMDtcblxuXHRcdGxldCBidG5UZXh0ID0gJ1JlZ2lzdGVyJztcblxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0bGV0IHRleHRTdHlsZSA9IHtcblx0XHRcdGZpbGw6ICcjMDAwMDAwJyxcblx0XHRcdGJvdW5kc0FsaWduSDogJ2NlbnRlcicsXG5cdFx0XHRib3VuZHNBbGlnblY6ICdtaWRkbGUnLFxuXHRcdFx0Zm9udDogJzIwcHggQXJpYWwnXG5cdFx0fVxuXHRcdHRoaXMucmVnaXN0ZXJCdG4gPSB0aGlzLmdhbWUuYWRkLnRleHQoYnRuWCwgYnRuWSwgYnRuVGV4dCwgdGV4dFN0eWxlKTtcblx0XHR0aGlzLnJlZ2lzdGVyQnRuLmFuY2hvci5zZXRUbyguNSwgLjUpO1xuXHRcdFxuXHRcdHRoaXMucmVnaXN0ZXJCdG4uaW5wdXRFbmFibGVkID0gdHJ1ZTtcblx0XHR0aGlzLnJlZ2lzdGVyQnRuLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xuXG5cdFx0dGhpcy5yZWdpc3RlckJ0bi5ldmVudHMub25JbnB1dERvd24uYWRkKChlKSA9PiB7XG5cdFx0XHRpZiAoY29uZmlybShgJHtzZWxmLmlucHV0VGV4dC50ZXh0feuLmOycvOuhnCDtlZjsi5zqsqDsirXri4jquYw/YCkpIHtcblx0XHRcdFx0c2VsZi5zYXZlVXNlcklkKCk7XG5cdFx0XHRcdGNvbnN0IHN0YWdlSW5mbyA9IHNlbGYuc2VydmljZUNvbnRyb2xsZXIuZ2V0U3RhZ2VJbmZvcm1hdGlvbigpO1xuXHRcdFx0XHRzZWxmLnN0YXRlQ29udHJvbGxlci5nb1N0YXRlKCdMZXZlbCcsIHRydWUsIHRydWUsIHN0YWdlSW5mbyk7XG5cdFx0XHR9XG5cdFx0fSwgdGhpcyk7XG5cblx0XHR0aGlzLnJlZ2lzdGVyQnRuLmV2ZW50cy5vbklucHV0T3Zlci5hZGQoKGUpID0+IHtcblx0XHRcdHRoaXMucmVnaXN0ZXJCdG4uYWxwaGEgPSAwLjc7XG5cdFx0fSwgdGhpcyk7XG5cblx0XHR0aGlzLnJlZ2lzdGVyQnRuLmV2ZW50cy5vbklucHV0T3V0LmFkZCgoZSkgPT4ge1xuXHRcdFx0dGhpcy5yZWdpc3RlckJ0bi5hbHBoYSA9IDE7XG5cdFx0fSwgdGhpcyk7XG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cblx0XHR0aGlzLnNldFJlZ2lzdGVySW5wdXRUZXh0KCk7XG5cdFx0dGhpcy5zZXRSZWdpc3RlckJ1dHRvbigpO1xuXHRcdFxuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdHRoaXMuaW5wdXRUZXh0LnJlbmRlcigpO1xuXHR9XG5cblx0c2F2ZVVzZXJJZCgpIHtcblx0XHRsZXQgdXNlcklkID0gdGhpcy5pbnB1dFRleHQudGV4dDtcblx0XHRjb25zdCB1c2VyID0gbmV3IFVzZXIodXNlcklkLCBuZXcgU2NvcmUoKSk7XG5cdFx0dGhpcy5zZXJ2aWNlQ29udHJvbGxlci5yZWdpc3RlclVzZXIodXNlcik7XG5cdH1cbn0iLCJleHBvcnQgY2xhc3MgUG9pbnQge1xuXHR4OiBudW1iZXI7XG5cdHk6IG51bWJlcjtcblx0YWN0aXZlOiBib29sZWFuO1xuXG5cdGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTpudW1iZXIpIHtcblx0XHR0aGlzLnggPSB4O1xuXHRcdHRoaXMueSA9IHk7XG5cdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgb24oeDogbnVtYmVyLCB5Om51bWJlcikge1xuXHRcdHJldHVybiBuZXcgUG9pbnQoeCx5KTtcblx0fVxufSIsImV4cG9ydCBlbnVtIFJhbmsge1xuXHROT05FID0gMCxcblx0UyA9IDEsXG5cdEEgPSAyLFxuXHRCID0gMyxcblx0QyA9IDQsXG5cdEQgPSA1LFxuXHRFID0gNixcblx0RiA9IDdcbn1cblxuXG5leHBvcnQgY2xhc3MgUmFua1V0aWwge1xuXHRzdGF0aWMgdmFsdWVPZihyYW5rOiBSYW5rKTogc3RyaW5nIHtcblx0XHRsZXQgcmV0ID0gJyc7XG5cblx0XHRzd2l0Y2gocmFuaykge1xuXHRcdFx0Y2FzZSBSYW5rLk5PTkU6IHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFJhbmsuUzoge1xuXHRcdFx0XHRyZXQgPSAnUyc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBSYW5rLkE6IHtcblx0XHRcdFx0cmV0ID0gJ0EnO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgUmFuay5COiB7XG5cdFx0XHRcdHJldCA9ICdCJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFJhbmsuQzoge1xuXHRcdFx0XHRyZXQgPSAnQyc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBSYW5rLkQ6IHtcblx0XHRcdFx0cmV0ID0gJ0QnO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgUmFuay5FOiB7XG5cdFx0XHRcdHJldCA9ICdFJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFJhbmsuRjoge1xuXHRcdFx0XHRyZXQgPSAnRic7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRyZXQgPSAnJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9XG59IiwiaW1wb3J0IHsgUmFuayB9IGZyb20gXCIuL3JhbmtcIjtcbmltcG9ydCBWbyBmcm9tIFwiLi92b1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmQgZXh0ZW5kcyBWbyB7XG5cdHVzZXJJZDogc3RyaW5nO1xuXHRyZWNvcmRzOiBhbnk7XG5cblx0Y29uc3RydWN0b3IodXNlcklkLCByZWNvcmRzKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnVzZXJJZCA9IHVzZXJJZDtcblx0XHR0aGlzLnJlY29yZHMgPSByZWNvcmRzO1xuXHR9XG5cblx0cHV0KHJlY29yZDogU3RhZ2VSZWNvcmQpIHtcblx0XHR0aGlzLnJlY29yZHNbcmVjb3JkLnN0YWdlSWRdID0ge1xuXHRcdFx0c3RhZ2VJZDogcmVjb3JkLnN0YWdlSWQsXG5cdFx0XHRyYW5rOiByZWNvcmQucmFuayxcblx0XHRcdHRpbWU6IHJlY29yZC50aW1lXG5cdFx0fVxuXHRcdC8vIHRoaXMucmVjb3Jkc1tyZWNvcmQuc3RhZ2VJZF0gPSByZWNvcmQ7XG5cdH1cblxuXHR0b0pzb24oKSB7XG5cdFx0bGV0IHJlY29yZHMgPSB7fTtcblxuXHRcdGZvciAobGV0IHAgaW4gdGhpcy5yZWNvcmRzKSB7XG5cdFx0XHRyZWNvcmRzW3BdID0gdGhpcy5yZWNvcmRzW3BdLnRvSnNvbigpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR1c2VySWQ6IHRoaXMudXNlcklkLFxuXHRcdFx0cmVjb3JkczogcmVjb3Jkc1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgYnkoanNvbiA6IGFueSk6IFJlY29yZCB7XG5cdFx0aWYgKGpzb24gPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdGNvbnN0IHVzZXI6IFJlY29yZCA9IG5ldyBSZWNvcmQoanNvbi51c2VySWQsIGpzb24ucmVjb3Jkcyk7XG5cdFx0cmV0dXJuIHVzZXI7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIFN0YWdlUmVjb3JkIGV4dGVuZHMgVm8ge1xuXHRzdGFnZUlkOiBudW1iZXI7XG5cdHJhbms6IFJhbms7XG5cdHRpbWU6IG51bWJlcjtcblxuXHRjb25zdHJ1Y3RvcihzdGFnZUlkLCByYW5rOiBSYW5rLCB0aW1lKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnN0YWdlSWQgPSBzdGFnZUlkO1xuXHRcdHRoaXMucmFuayA9IHJhbms7XG5cdFx0dGhpcy50aW1lID0gdGltZTtcblx0fVxuXG5cdHRvSnNvbigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c3RhZ2VJZDogdGhpcy5zdGFnZUlkLFxuXHRcdFx0cmFuazogdGhpcy5yYW5rLFxuXHRcdFx0dGltZTogdGhpcy50aW1lXG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IHsgUmFuayB9IGZyb20gXCIuL3JhbmtcIjtcbmltcG9ydCBWbyBmcm9tIFwiLi92b1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yZSBleHRlbmRzIFZvIHtcblx0dGltZSA6IG51bWJlcjtcblx0cmFuayA6IFJhbms7XG5cdFxuXHRjb25zdHJ1Y3Rvcih0aW1lPzogbnVtYmVyLCByYW5rPzogUmFuaykge1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLnRpbWUgPSB0aW1lIHwgMDtcblx0XHR0aGlzLnJhbmsgPSByYW5rIHwgUmFuay5OT05FO1xuXHR9XG5cblx0dG9Kc29uKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR0aW1lOiB0aGlzLnRpbWUsXG5cdFx0XHRyYW5rOiB0aGlzLnJhbmssXG5cdFx0fVxuXHR9XG5cdFxufSIsImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vcG9pbnRcIjtcbmltcG9ydCB7IE1hcFR5cGUgfSBmcm9tIFwiLi9tYXBUeXBlXCI7XG5pbXBvcnQgeyBSYW5rIH0gZnJvbSBcIi4vcmFua1wiO1xuXG5leHBvcnQgY2xhc3MgU3RhZ2Uge1xuXHRjb25zdHJ1Y3RvcihzdGFnZUlkOiBudW1iZXIsIGZsb29yRmlsZVBhdGg6IHN0cmluZywgd2FsbEZpbGVQYXRoOiBzdHJpbmcsIGV4aXRQb2ludHM6IEFycmF5PFBvaW50PiwgdGltZUxpbWl0PTUwMDApIHtcblx0XHR0aGlzLnN0YWdlSWQgPSBzdGFnZUlkO1xuXHRcdHRoaXMuZmxvb3JGaWxlUGF0aCA9IGZsb29yRmlsZVBhdGg7XG5cdFx0dGhpcy53YWxsRmlsZVBhdGggPSB3YWxsRmlsZVBhdGg7XG5cdFx0dGhpcy5leGl0UG9pbnRzID0gZXhpdFBvaW50cztcblxuXHRcdHRoaXMudGltZUxpbWl0ID0gdGltZUxpbWl0O1xuXHR9XG5cdFxuXHRzdGFnZUlkIDogbnVtYmVyO1xuXHRmbG9vckZpbGVQYXRoIDogc3RyaW5nO1xuXHR3YWxsRmlsZVBhdGggOiBzdHJpbmc7XG5cblx0ZXhpdFBvaW50cyA6IEFycmF5PFBvaW50Pjtcblx0dGltZUxpbWl0IDogbnVtYmVyO1xuXG5cdHRyZWFzdXJlUG9pbnRzIDogQXJyYXk8UG9pbnQ+O1xuXG5cdG1hcFR5cGU6IE1hcFR5cGU7XG5cblx0Ly9UT0RPOiA/Pz9cblx0c291bmQgOiBQaGFzZXIuU291bmQ7XG5cblx0XG59IiwiaW1wb3J0IFNjb3JlIGZyb20gXCIuL3Njb3JlXCI7XG5pbXBvcnQgVm8gZnJvbSBcIi4vdm9cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIFZvIHtcblx0dXNlcklkIDogc3RyaW5nO1xuXHRzY29yZSA6IFNjb3JlO1xuXHRyZWdpc3RlckRhdGUgOiBEYXRlO1xuXHRsYXN0VmlzaXREYXRlIDogRGF0ZTtcblxuXHRjb25zdHJ1Y3Rvcih1c2VySWQsIHNjb3JlKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnVzZXJJZCA9IHVzZXJJZDtcblx0XHR0aGlzLnNjb3JlID0gc2NvcmU7XG5cdFx0dGhpcy5yZWdpc3RlckRhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdHRoaXMubGFzdFZpc2l0RGF0ZSA9IG5ldyBEYXRlKCk7XG5cdH1cblxuXHRwdWJsaWMgc3RhdGljIGJ5KGpzb24gOiBhbnkpOiBVc2VyIHtcblx0XHRpZiAoanNvbiA9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0Y29uc3QgdXNlcjogVXNlciA9IG5ldyBVc2VyKGpzb24udXNlcklkLCBqc29uLnNjb3JlKTtcblx0XHR1c2VyLnJlZ2lzdGVyRGF0ZSA9IGpzb24ucmVnaXN0ZXJEYXRlO1xuXHRcdHVzZXIubGFzdFZpc2l0RGF0ZSA9IGpzb24ubGFzdFZpc2l0RGF0ZTtcblxuXHRcdHJldHVybiB1c2VyO1xuXHR9XG5cblx0dG9Kc29uKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR1c2VySWQ6IHRoaXMudXNlcklkLFxuXHRcdFx0c2NvcmU6IHRoaXMuc2NvcmUsXG5cdFx0XHRyZWdpc3RlckRhdGU6IHRoaXMucmVnaXN0ZXJEYXRlLFxuXHRcdFx0bGFzdFZpc2l0RGF0ZTogdGhpcy5sYXN0VmlzaXREYXRlLFxuXHRcdH07XG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBWbyB7XG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnRvSnNvbigpKTtcblx0fVxuXG5cdGFic3RyYWN0IHRvSnNvbigpIDogYW55O1xufSJdLCJzb3VyY2VSb290IjoiIn0=