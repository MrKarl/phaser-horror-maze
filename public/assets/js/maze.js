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
        const userId = this.authService.getLastLoggedInUser().userId;
        debugger;
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
    constructor() {
        super(...arguments);
        this.recordKey = 'mazeRecordInfo';
    }
    insert(table, obj) {
        const recordDatabase = {};
        recordDatabase[obj.userId] = obj.toString();
        this.session.set(table, obj.userId, JSON.stringify(recordDatabase));
        return obj;
    }
    select(table, userId) {
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
        const userDatabase = {};
        userDatabase[obj.userId] = obj.toString();
        this.session.set(table, obj.userId, JSON.stringify(userDatabase));
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
        this.RECORD_TABLE = 'mazeRecordInfo';
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
        return item;
    }
    set(table, key, value) {
        const originalDataObj = this.get(table, key);
        if (!originalDataObj) {
            const obj = {};
            obj[key] = value;
            const writtenData = JSON.stringify(obj);
            if (typeof value === 'string') {
                localStorage.setItem(table, value);
            }
            else {
                localStorage.setItem(table, writtenData);
            }
        }
        else {
            let jsonValue = JSON.parse(value);
            jsonValue[key] = JSON.parse(jsonValue[key]);
            let temp = JSON.parse(originalDataObj);
            let originalDataJson = {};
            originalDataJson[key] = temp;
            const obj = Object.assign({}, originalDataObj, jsonValue);
            localStorage.setItem(table, obj);
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
        this.load.audio("wallCollisionSound", ["assets/mp3/beep-01a.mp3.mp3"]);
    }
    create() {
        this.wallCollisionSound = this.add.audio('wallCollisionSound');
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
            this.game.camera.shake();
            this.wallCollisionSound.play();
            this.stopPlayerAnimcateion();
        }
        if (Math.abs(this.currentExitPoint.x - this.player.x) < 3 && Math.abs(this.player.y - this.currentExitPoint.y) < 3) {
            alert('Congrat!');
            const userId = this.serviceController.authService.getLastLoggedInUser().userId;
            const stageId = this.stageInfo.stageId;
            const stageRecord = new _vo_record__WEBPACK_IMPORTED_MODULE_1__["StageRecord"](stageId, _vo_rank__WEBPACK_IMPORTED_MODULE_2__["Rank"].S, 80);
            const stageRecordObj = {};
            stageRecordObj[stageId] = stageRecord;
            const record = new _vo_record__WEBPACK_IMPORTED_MODULE_1__["default"](userId, stageRecordObj);
            debugger;
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
        this.records[record.stageId] = record;
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
    static by(jsonString) {
        let json;
        let record = null;
        try {
            json = JSON.parse(jsonString);
            record = new Record(json.userId, json.records);
        }
        catch (e) {
            // jsonString is not valid.
            // Just ignore this case.
        }
        return record;
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

class Score {
    constructor(time, rank) {
        this.time = time | 0;
        this.rank = rank | _rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].NONE;
    }
    toString() {
        return JSON.stringify({
            time: this.time,
            rank: this.rank
        });
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
class User {
    constructor(userId, score) {
        this.userId = userId;
        this.score = score;
        this.registerDate = new Date();
        this.lastVisitDate = new Date();
    }
    static by(jsonString) {
        let json;
        let user = null;
        try {
            json = JSON.parse(jsonString);
            user = new User(json.userId, json.score);
            user.registerDate = json.registerDate;
            user.lastVisitDate = json.lastVisitDate;
        }
        catch (e) {
            // jsonString is not valid.
            // Just ignore this case.
        }
        return user;
    }
    toString() {
        return JSON.stringify(this.toJson());
    }
    toJson() {
        return {
            userId: this.userId,
            score: this.score.toString,
            registerDate: this.registerDate.toString(),
            lastVisitDate: this.lastVisitDate.toString(),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC9pbnB1dFRleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXIvc2VydmljZUNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXIvc3RhdGVDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9kYW8vZGFvLnRzIiwid2VicGFjazovLy8uL3NyYy9kYW8vcmVjb3JkRGFvLnRzIiwid2VicGFjazovLy8uL3NyYy9kYW8vdXNlckRhby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hemUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2F1dGhTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9yZWNvcmRTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9zdGFnZVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nlc3Npb24vbG9jYWxTdG9yYWdlU2Vzc2lvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUvYmFzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUvaW50cm8udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL2xldmVsLnRzIiwid2VicGFjazovLy8uL3NyYy9zdGF0ZS9sb2dpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUvcGxheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUvcmVnaXN0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZvL3BvaW50LnRzIiwid2VicGFjazovLy8uL3NyYy92by9yYW5rLnRzIiwid2VicGFjazovLy8uL3NyYy92by9yZWNvcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZvL3Njb3JlLnRzIiwid2VicGFjazovLy8uL3NyYy92by9zdGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdm8vdXNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdm8vdm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ25FTSxJQUFXLFNBQVMsQ0FpR3pCO0FBakdELFdBQWlCLFNBQVM7SUFDekIsZUFBdUIsU0FBUSxNQUFNLENBQUMsSUFBSTtRQW1CekMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSztZQUM1RCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUcsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBbkJqQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1lBb0JmLElBQUksQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDO1lBQ2hDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQ3hCO1lBRUQsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxL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QUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFTyxXQUFXO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUN6QixDQUFDO0lBRU8sVUFBVTtRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVPLFVBQVU7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVPLFNBQVM7UUFDaEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDdEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFFeEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDOUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFOUIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUN2QyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBRXZDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkMsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsTUFBTSxRQUFRLEdBQUcsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6RixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUM7WUFDcEIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDO1lBRXBCLEtBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsSUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNyQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekQsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXpELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3ZELElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtvQkFDZixLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUNWLEtBQUssR0FBRyxDQUFDLENBQUM7aUJBQ1Y7cUJBQU07b0JBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUMvQixNQUFNO2lCQUNOO2FBQ0Q7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDL0I7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU8sVUFBVTtRQUNqQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXBCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3RDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBRXhDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBRTlCLE1BQU0sS0FBSyxHQUFHO1lBQ2IsS0FBSyxFQUFHLENBQUM7WUFDVCxLQUFLLEVBQUcsQ0FBQztZQUNULElBQUksRUFBRyxDQUFDO1lBQ1IsSUFBSSxFQUFHLENBQUM7U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFO1lBQzFCLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxXQUFXLEdBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxPQUFPLEdBQUcsWUFBWSxHQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFILE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLFdBQVcsR0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLE9BQU8sR0FBRyxZQUFZLEdBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUgsS0FBSyxDQUFDLEtBQUssR0FBRyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDNUIsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLFdBQVcsR0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLE9BQU8sR0FBRyxZQUFZLEdBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUgsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsV0FBVyxHQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsT0FBTyxHQUFHLFlBQVksR0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLElBQUksQ0FB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LENBQUMsTUFBTTtZQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzFCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRTtZQUMxQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUU7U0FDNUMsQ0FBQztJQUNILENBQUM7Q0FDRDs7Ozs7Ozs7Ozs7Ozs7O0FDM0NhO0lBQ2IsUUFBUTtRQUNQLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBR0QiLCJmaWxlIjoibWF6ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImV4cG9ydCBuYW1lc3BhY2UgQ29tcG9uZW50IHtcblx0ZXhwb3J0IGNsYXNzIElucHV0VGV4dCBleHRlbmRzIFBoYXNlci5UZXh0IHtcblx0XHRpc0ZvY3VzID0gZmFsc2U7XG5cblx0XHR4IDogbnVtYmVyO1xuXHRcdHkgOiBudW1iZXI7XG5cdFx0d2lkdGggOiBudW1iZXI7XG5cdFx0aGVpZ2h0IDogbnVtYmVyO1xuXG5cdFx0bWF4TGVuZ3RoIDogbnVtYmVyO1xuXG5cdFx0cGxhY2Vob2xkZXIgOiBzdHJpbmc7XG5cblx0XHRcblx0XHRib3JkZXJSZWN0YW5nbGVyIDogUGhhc2VyLlJlY3RhbmdsZTtcblxuXHRcdHRleHQgOiBzdHJpbmc7XG5cblx0XHRwaGFzZXJUZXh0IDogUGhhc2VyLlRleHQ7XG5cblx0XHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBtYXhMZW5ndGgsIHRleHQsIHN0eWxlKSB7XG5cdFx0XHRzdXBlcihnYW1lLCB4LCB5LCAgdGV4dCwgc3R5bGUpO1xuXHRcdFx0dGhpcy5wbGFjZWhvbGRlciA9ICdJbnB1dCBUZXh0Jztcblx0XHRcdGlmICh0ZXh0Lmxlbmd0aCA9PSAwKSB7XG5cdFx0XHRcdHRleHQgPSB0aGlzLnBsYWNlaG9sZGVyO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnggPSB4O1xuXHRcdFx0dGhpcy55ID0geTtcblx0XHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0XHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdFx0dGhpcy50ZXh0ID0gdGV4dDtcblx0XHRcdHRoaXMubWF4TGVuZ3RoID0gbWF4TGVuZ3RoID8gbWF4TGVuZ3RoIDogMjA7XG5cblx0XHRcdGxldCBncm91cCA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcblx0XHRcdGxldCBncmFwaGljcyA9IHRoaXMuZ2FtZS5tYWtlLmdyYXBoaWNzKCk7XG5cdFx0XHRncmFwaGljcy5saW5lU3R5bGUoMiwgMHgwMDAwMDAsIDEpO1xuXHRcdFx0Ly8gZ3JhcGhpY3MuYmVnaW5GaWxsKDB4RkY3MDBCLCAxKTtcblx0XHRcdGdyYXBoaWNzLmRyYXdSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuXHRcdFx0Ly8gZ3JhcGhpY3MuZW5kRmlsbCgpO1xuXHRcdFx0Z3JvdXAuYWRkKGdyYXBoaWNzKTtcblxuXHRcdFx0dGhpcy5waGFzZXJUZXh0ID0gdGhpcy5nYW1lLmFkZC50ZXh0KHgsIHksIHRleHQsIHN0eWxlKTtcblx0XHRcdHRoaXMucGhhc2VyVGV4dC5zZXRUZXh0Qm91bmRzKDAsIDAsIHdpZHRoLCBoZWlnaHQpXG5cdFx0XHR0aGlzLnBoYXNlclRleHQuYWxwaGEgPSAwLjY7XG5cblx0XHRcdHRoaXMucGhhc2VyVGV4dC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xuXG5cdFx0XHR0aGlzLnBoYXNlclRleHQuZXZlbnRzLm9uSW5wdXREb3duLmFkZCgoc3ByaXRlLCBwb2ludGVyKSA9PiB7XG5cdFx0XHRcdHRoaXMuaXNGb2N1cyA9IHRydWU7XG5cdFx0XHRcdHRoaXMucGhhc2VyVGV4dC5hbHBoYSA9IDE7XG5cdFx0XHR9LCB0aGlzKTtcblx0XHRcdFxuXHRcdFx0dGhpcy5nYW1lLmlucHV0Lm9uRG93bi5hZGQoKHNwcml0ZSwgcG9pbnRlcikgPT4ge1xuXHRcdFx0XHRsZXQgdGV4dFggPSB0aGlzLnBoYXNlclRleHQud29ybGQueDtcblx0XHRcdFx0bGV0IHRleHRXaWR0aCA9IHRoaXMucGhhc2VyVGV4dC53aWR0aDtcblxuXHRcdFx0XHRsZXQgdGV4dFkgPSB0aGlzLnBoYXNlclRleHQud29ybGQueTtcblx0XHRcdFx0bGV0IHRleHRIZWlnaHQgPSB0aGlzLnBoYXNlclRleHQuaGVpZ2h0O1xuXG5cdFx0XHRcdGlmIChwb2ludGVyLmNsaWVudFggPiB0ZXh0WCAmJiBwb2ludGVyLmNsaWVudFggPD0gdGV4dFggKyB0ZXh0V2lkdGgpIHtcblx0XHRcdFx0XHRpZiAocG9pbnRlci5jbGllbnRZID4gdGV4dFkgJiYgcG9pbnRlci5jbGllbnRZIDw9IHRleHRZICsgdGV4dEhlaWdodCkge1xuXHRcdFx0XHRcdFx0dGhpcy5pc0ZvY3VzID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHRoaXMucGhhc2VyVGV4dC5hbHBoYSA9IDE7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5waGFzZXJUZXh0LmFscGhhID0gMC42O1xuXHRcdFx0XHR0aGlzLmlzRm9jdXMgPSBmYWxzZTtcblx0XHRcdH0sIHRoaXMpO1xuXG5cdFx0XHR0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkQ2FsbGJhY2tzKHRoaXMsIChlKSA9PiB7XG5cdFx0XHRcdGlmICghdGhpcy5pc0ZvY3VzKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAoZS5rZXlDb2RlID09IFBoYXNlci5LZXlib2FyZC5CQUNLU1BBQ0UpIHtcblx0XHRcdFx0XHR0aGlzLnBoYXNlclRleHQudGV4dCA9IHRoaXMucGhhc2VyVGV4dC50ZXh0LnNsaWNlKDAsIC0xKTtcblxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fSBcblxuXHRcdFx0XHRpZiAodGhpcy5waGFzZXJUZXh0LnRleHQubGVuZ3RoICsgMSA+IHRoaXMubWF4TGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnBoYXNlclRleHQudGV4dCArPSBlLmtleTtcblx0XHRcdFx0dGhpcy50ZXh0ID0gdGhpcy5waGFzZXJUZXh0LnRleHQ7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZW5kZXIoKSB7XG5cdFx0XHRcblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgU3RhdGVDb250cm9sbGVyIGZyb20gXCIuL3N0YXRlQ29udHJvbGxlclwiO1xuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSBcIi4vY29udHJvbGxlclwiO1xuaW1wb3J0IFN0YWdlU2VydmljZSBmcm9tIFwiLi4vc2VydmljZXMvc3RhZ2VTZXJ2aWNlXCI7XG5pbXBvcnQgQXV0aFNlcnZpY2UgZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGhTZXJ2aWNlXCI7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4uL21hemVcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcbmltcG9ydCBVc2VyIGZyb20gXCIuLi92by91c2VyXCI7XG5pbXBvcnQgUmVjb3JkU2VydmljZSBmcm9tIFwiLi4vc2VydmljZXMvcmVjb3JkU2VydmljZVwiO1xuaW1wb3J0IFJlY29yZCBmcm9tIFwiLi4vdm8vcmVjb3JkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZpY2VDb250cm9sbGVyIGltcGxlbWVudHMgQ29udHJvbGxlciB7XG5cdGdhbWUgOiBQaGFzZXIuR2FtZTtcblxuXHRzdGFnZVNlcnZpY2UgOiBTdGFnZVNlcnZpY2U7XG5cdGF1dGhTZXJ2aWNlIDogQXV0aFNlcnZpY2U7XG5cdHJlY29yZFNlcnZpY2UgOiBSZWNvcmRTZXJ2aWNlO1xuXG5cdC8vIEl0IGlzIG5lY2Vzc2FyeSBmb3IgY29udHJvbGluZyBzdGF0ZS5cblx0c3RhdGVDb250cm9sbGVyIDogU3RhdGVDb250cm9sbGVyO1xuXG5cdGNvbnN0cnVjdG9yKGdhbWU6IEdhbWUuTWF6ZSkge1xuXHRcdHRoaXMuZ2FtZSA9IGdhbWU7XG5cdFx0XG5cdFx0dGhpcy5zdGFnZVNlcnZpY2UgPSBuZXcgU3RhZ2VTZXJ2aWNlKCk7XG5cdFx0dGhpcy5hdXRoU2VydmljZSA9IG5ldyBBdXRoU2VydmljZSgpO1xuXHRcdHRoaXMucmVjb3JkU2VydmljZSA9IG5ldyBSZWNvcmRTZXJ2aWNlKCk7XG5cdFx0XG5cdFx0dGhpcy5zdGF0ZUNvbnRyb2xsZXIgPSBnYW1lLnN0YXRlQ29udHJvbGxlcjtcblx0fVx0XG5cdFxuXHRwdWJsaWMgbG9naW4odXNlcklkLCBjYWxsYmFjaykge1xuXHRcdHRoaXMuYXV0aFNlcnZpY2UubG9naW4odXNlcklkLCBjYWxsYmFjayk7XG5cdH1cblxuXHRwdWJsaWMgcmVnaXN0ZXJVc2VyKHVzZXI6IFVzZXIpIHtcblx0XHR0aGlzLmF1dGhTZXJ2aWNlLnJlZ2lzdGVyVXNlcih1c2VyKTtcblx0fVxuXG5cdHB1YmxpYyBnZXRSZWNvcmQoKSA6IFJlY29yZCB7XG5cdFx0Y29uc3QgdXNlcklkID0gdGhpcy5hdXRoU2VydmljZS5nZXRMYXN0TG9nZ2VkSW5Vc2VyKCkudXNlcklkO1xuXHRcdGRlYnVnZ2VyXG5cdFx0Y29uc3QgcmVjb3JkID0gdGhpcy5yZWNvcmRTZXJ2aWNlLmdldFJlY29yZCh1c2VySWQpO1xuXHRcdHJldHVybiByZWNvcmQ7XG5cdH1cblxuXHRwdWJsaWMgZ2V0U3RhZ2VJbmZvcm1hdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5zdGFnZVNlcnZpY2Uuc3RhZ2VNYXA7XG5cdH1cblxuXHRwdWJsaWMgcmVjb3JkUmFuayhyZWNvcmQ6IFJlY29yZCkge1xuXHRcdGNvbnN0IHVzZXJJZCA9IHRoaXMuYXV0aFNlcnZpY2UuZ2V0TGFzdExvZ2dlZEluVXNlcigpLnVzZXJJZDtcblx0XHRkZWJ1Z2dlclxuXHRcdHRoaXMucmVjb3JkU2VydmljZS5zZXRSZWNvcmQocmVjb3JkKTtcblx0fVxufVxuIiwiaW1wb3J0IHsgSW50cm8gfSBmcm9tICcuLi9zdGF0ZS9pbnRybyc7XG5pbXBvcnQgeyBMb2dpbiB9IGZyb20gJy4uL3N0YXRlL2xvZ2luJztcbmltcG9ydCB7IExldmVsIH0gZnJvbSAnLi4vc3RhdGUvbGV2ZWwnO1xuaW1wb3J0IHsgUGxheSB9IGZyb20gJy4uL3N0YXRlL3BsYXknO1xuaW1wb3J0IHsgUmVnaXN0ZXIgfSBmcm9tICcuLi9zdGF0ZS9yZWdpc3Rlcic7XG5cbmltcG9ydCBTZXJ2aWNlQ29udHJvbGxlciBmcm9tICcuL3NlcnZpY2VDb250cm9sbGVyJztcbmltcG9ydCB7IEdhbWUgfSBmcm9tICcuLi9tYXplJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGVDb250cm9sbGVyIHtcblx0c3RhdGVNYW5hZ2VyIDogUGhhc2VyLlN0YXRlTWFuYWdlcjtcblx0Z2FtZSA6IFBoYXNlci5HYW1lO1xuXG5cdHdpZHRoOiBudW1iZXI7XG5cdGhlaWdodDogbnVtYmVyO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdH1cblxuXHRwdWJsaWMgaW5pdGlhbGl6ZShnYW1lOiBHYW1lLk1hemUsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG5cdFx0dGhpcy5zdGF0ZU1hbmFnZXIgPSBuZXcgUGhhc2VyLlN0YXRlTWFuYWdlcihnYW1lKTtcblx0XHR0aGlzLmdhbWUgPSBnYW1lO1xuXHRcdHRoaXMuZ2FtZS5zdGF0ZSA9IHRoaXMuc3RhdGVNYW5hZ2VyO1xuXG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRzdGFydFN0YXRlKHN0YXRlPyA6IHN0cmluZykge1xuXHRcdGxldCBzdGFydGluZ1N0YXRlID0gJ0ludHJvJztcblx0XHQvLyBsZXQgc3RhcnRpbmdTdGF0ZSA9ICdTdGFnZSc7XG5cdFx0aWYgKHN0YXRlID09PSAndW5kZWZpbmVkJyB8fCBzdGF0ZSA9PT0gbnVsbCkge1xuXHRcdFx0c3RhcnRpbmdTdGF0ZSA9IHN0YXRlO1xuXHRcdH1cblxuXHRcdHRoaXMuZ29TdGF0ZShzdGFydGluZ1N0YXRlLCB0cnVlLCB0cnVlLCAnSG9ycm9yIE1hemUnKTtcblx0fVxuXG5cdHB1YmxpYyBnb1N0YXRlKHN0YXRlOiBzdHJpbmcsIGNsZWFyV29ybGQ/OiBib29sZWFuLCBjbGVhckNhY2hlPzogYm9vbGVhbiwgLi4uYXJnczogYW55W10pIHtcblx0XHRpZiAoIXRoaXMuc3RhdGVNYW5hZ2VyLmNoZWNrU3RhdGUoc3RhdGUpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFRoaXMgc3RhdGUoJHtzdGF0ZX0pIGRvZXMgbm90IGV4aXN0IWApO1xuXHRcdH1cblxuXHRcdHRoaXMuc3RhdGVNYW5hZ2VyLnN0YXJ0KHN0YXRlLCBjbGVhcldvcmxkLCBjbGVhckNhY2hlLCAuLi5hcmdzKTtcblx0fVxuXG5cdHByaXZhdGUgaW5pdCgpIHtcblx0XHR0aGlzLmFkZCgnSW50cm8nLCBJbnRybywgdHJ1ZSk7XG5cdFx0dGhpcy5hZGQoJ0xvZ2luJywgTG9naW4sIGZhbHNlKTtcblx0XHR0aGlzLmFkZCgnUmVnaXN0ZXInLCBSZWdpc3RlciwgZmFsc2UpO1xuXHRcdHRoaXMuYWRkKCdMZXZlbCcsIExldmVsLCBmYWxzZSk7XG5cdFx0dGhpcy5hZGQoJ1BsYXknLCBQbGF5LCBmYWxzZSk7XG5cdH1cblxuXHRwcml2YXRlIGFkZChrZXksIHN0YXRlLCBhdXRoU3RhcnQ/KSB7XG5cdFx0dGhpcy5zdGF0ZU1hbmFnZXIuYWRkKGtleSwgc3RhdGUsIGF1dGhTdGFydCk7XG5cdH1cbn0iLCJpbXBvcnQgU2Vzc2lvbiBmcm9tIFwiLi4vc2Vzc2lvbi9zZXNzaW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIERBTzxUPiB7XG5cdHNlc3Npb246IFNlc3Npb247XG5cdGNvbnN0cnVjdG9yKHNlc3Npb246IFNlc3Npb24pIHtcblx0XHR0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xuXHR9XG5cblx0cHVibGljIGFic3RyYWN0IGluc2VydCh0YWJsZTogc3RyaW5nLCBvYmo6IFQpOiBUO1xuXHRwdWJsaWMgYWJzdHJhY3Qgc2VsZWN0KHRhYmxlOiBzdHJpbmcsIGtleTogc3RyaW5nKTogVDtcblx0cHVibGljIGFic3RyYWN0IHVwZGF0ZSh0YWJsZTogc3RyaW5nLCBrZXk6IHN0cmluZywgb2JqOiBUKTogVDtcblx0cHVibGljIGFic3RyYWN0IGRlbGV0ZSh0YWJsZTogc3RyaW5nLCBrZXk6IHN0cmluZyk6IGJvb2xlYW47XG5cdHB1YmxpYyBhYnN0cmFjdCBzZWxlY3RBbGwodGFibGU6IHN0cmluZyk6IGFueTsvL0FycmF5PFQ+O1xufSIsImltcG9ydCBEQU8gZnJvbSBcIi4vZGFvXCI7XG5pbXBvcnQgUmVjb3JkIGZyb20gXCIuLi92by9yZWNvcmRcIjtcblxuZXhwb3J0IGNsYXNzIFJlY29yZERhbyBleHRlbmRzIERBTzxSZWNvcmQ+IHtcblx0cHJpdmF0ZSByZWFkb25seSByZWNvcmRLZXkgPSAnbWF6ZVJlY29yZEluZm8nO1xuXG5cdHB1YmxpYyBpbnNlcnQodGFibGU6IHN0cmluZywgb2JqOiBSZWNvcmQpOiBSZWNvcmQge1xuXHRcdGNvbnN0IHJlY29yZERhdGFiYXNlID0ge307XG5cdFx0cmVjb3JkRGF0YWJhc2Vbb2JqLnVzZXJJZF0gPSBvYmoudG9TdHJpbmcoKTtcblx0XHR0aGlzLnNlc3Npb24uc2V0KHRhYmxlLCBvYmoudXNlcklkLCBKU09OLnN0cmluZ2lmeShyZWNvcmREYXRhYmFzZSkpO1xuXG5cdFx0cmV0dXJuIG9iajtcblx0fVxuXG5cdHB1YmxpYyBzZWxlY3QodGFibGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpOiBSZWNvcmQge1xuXHRcdGNvbnN0IHJlY29yZERhdGEgPSB0aGlzLnNlc3Npb24uZ2V0KHRhYmxlLCB1c2VySWQpO1xuXG5cdFx0Y29uc3QgcmVjb3JkOiBSZWNvcmQgPSBSZWNvcmQuYnkocmVjb3JkRGF0YSk7XG5cdFx0cmV0dXJuIHJlY29yZDtcblx0fVxuXG5cdHB1YmxpYyB1cGRhdGUodGFibGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcsIG9iajogUmVjb3JkKTogUmVjb3JkIHtcblx0XHR0aGlzLnNlc3Npb24uc2V0KHRhYmxlLCB1c2VySWQsIG9iai50b1N0cmluZygpKTtcblx0XHRcblx0XHRyZXR1cm4gb2JqO1xuXHR9XG5cblx0cHVibGljIGRlbGV0ZSh0YWJsZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdGxldCBpc1N1Y2Nlc3MgPSB0cnVlO1xuXHRcdHRyeSB7XG5cdFx0XHR0aGlzLnNlc3Npb24ucmVtb3ZlKHRhYmxlLCB1c2VySWQpO1xuXHRcdH0gY2F0Y2gge1xuXHRcdFx0aXNTdWNjZXNzID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlzU3VjY2Vzcztcblx0fVxuXG5cdHB1YmxpYyBzZWxlY3RBbGwodGFibGU6IHN0cmluZyk6IGFueSB7XG5cdFx0Y29uc3Qgb2JqcyA9ICg8YW55PnRoaXMpLnNlc3Npb24uYWxsU3RvcmFnZSgpO1xuXHRcdGNvbnN0IG9iaiA9IG9ianNbdGFibGVdO1xuXG5cdFx0cmV0dXJuIG9iajtcblx0fVxufSIsImltcG9ydCBEQU8gZnJvbSBcIi4vZGFvXCI7XG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vdm8vdXNlclwiO1xuXG5leHBvcnQgY2xhc3MgVXNlckRhbyBleHRlbmRzIERBTzxVc2VyPiB7XG5cdHByaXZhdGUgcmVhZG9ubHkgdXNlcktleSA9ICdtYXplVXNlclJlcG8nO1xuXHRcblx0cHVibGljIGluc2VydCh0YWJsZTogc3RyaW5nLCBvYmo6IFVzZXIpOiBVc2VyIHtcblx0XHRjb25zdCB1c2VyRGF0YWJhc2UgPSB7fTtcblx0XHR1c2VyRGF0YWJhc2Vbb2JqLnVzZXJJZF0gPSBvYmoudG9TdHJpbmcoKTtcblxuXHRcdHRoaXMuc2Vzc2lvbi5zZXQodGFibGUsIG9iai51c2VySWQsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhYmFzZSkpO1xuXG5cdFx0cmV0dXJuIG9iajtcblx0fVxuXG5cdHB1YmxpYyBzZWxlY3QodGFibGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpOiBVc2VyIHtcblx0XHRjb25zdCB1c2VyU3RyID0gdGhpcy5zZXNzaW9uLmdldCh0YWJsZSwgdXNlcklkKTtcblxuXHRcdGNvbnN0IHVzZXI6IFVzZXIgPSBVc2VyLmJ5KHVzZXJTdHIpO1xuXHRcdHJldHVybiB1c2VyO1xuXHR9XG5cblx0cHVibGljIHVwZGF0ZSh0YWJsZTogc3RyaW5nLHVzZXJJZDogc3RyaW5nLCBvYmo6IFVzZXIpOiBVc2VyIHtcblx0XHR0aGlzLnNlc3Npb24uc2V0KHRhYmxlLCB1c2VySWQsIG9iai50b1N0cmluZygpKTtcblx0XHRcblx0XHRyZXR1cm4gb2JqO1xuXHR9XG5cblx0cHVibGljIGRlbGV0ZSh0YWJsZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdGxldCBpc1N1Y2Nlc3MgPSB0cnVlO1xuXHRcdHRyeSB7XG5cdFx0XHR0aGlzLnNlc3Npb24ucmVtb3ZlKHRhYmxlLCB1c2VySWQpO1xuXHRcdH0gY2F0Y2gge1xuXHRcdFx0aXNTdWNjZXNzID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlzU3VjY2Vzcztcblx0fVxuXG5cdHB1YmxpYyBzZWxlY3RBbGwodGFibGU6IHN0cmluZyk6IGFueSB7XG5cdFx0Y29uc3Qgb2JqcyA9ICg8YW55PnRoaXMpLnNlc3Npb24uYWxsU3RvcmFnZSgpO1xuXHRcdGNvbnN0IG9iaiA9IG9ianNbdGFibGVdO1xuXG5cdFx0cmV0dXJuIG9iajtcblx0fVxufSIsIi8vIGltcG9ydCAqIGFzIGcgZnJvbSAnLi9tYXplJ1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4vbWF6ZSc7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2lkdGggPSA2NDA7XG4gICAgY29uc3QgaGVpZ2h0ID0gNjAwOyAvLyAxMjAgKiA0MjBcbiAgICBjb25zdCBwYXJlbnRJZCA9ICdnYW1lJztcblxuICAgIC8vIFNob3VsZCBiZSBpbml0aWFsaXplIGdhbWUgb2JqZWN0IGFuZCBydW5cbiAgICBjb25zdCBtYXplID0gbmV3IEdhbWUuTWF6ZSh3aWR0aCwgaGVpZ2h0LCBwYXJlbnRJZCk7XG59OyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvcGhhc2VyLWNlL3R5cGVzY3JpcHQvcGhhc2VyLmQudHNcIiAvPlxuXG5pbXBvcnQgU2VydmljZUNvbnRyb2xsZXIgZnJvbSBcIi4vY29udHJvbGxlci9zZXJ2aWNlQ29udHJvbGxlclwiO1xuaW1wb3J0IFN0YXRlQ29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyL3N0YXRlQ29udHJvbGxlclwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIEdhbWUge1xuXHRleHBvcnQgY2xhc3MgTWF6ZSBleHRlbmRzIFBoYXNlci5HYW1lIHtcblx0XHRzZXJ2aWNlQ29udHJvbGxlciA6IFNlcnZpY2VDb250cm9sbGVyO1xuXHRcdHN0YXRlQ29udHJvbGxlciA6IFN0YXRlQ29udHJvbGxlcjtcblxuXHRcdGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIHBhcmVudElkKSB7XG5cdFx0XHRzdXBlcih3aWR0aCwgaGVpZ2h0LCBQaGFzZXIuQVVUTywgcGFyZW50SWQsIG51bGwsIGZhbHNlLCB0cnVlLCBudWxsKTtcblxuXHRcdFx0dGhpcy5zZXJ2aWNlQ29udHJvbGxlciA9IG5ldyBTZXJ2aWNlQ29udHJvbGxlcih0aGlzKTtcblxuXHRcdFx0dGhpcy5zdGF0ZUNvbnRyb2xsZXIgPSBuZXcgU3RhdGVDb250cm9sbGVyKCk7XG5cdFx0XHR0aGlzLnN0YXRlQ29udHJvbGxlci5pbml0aWFsaXplKHRoaXMsIHdpZHRoLCBoZWlnaHQpO1xuXHRcdFx0dGhpcy5zdGF0ZUNvbnRyb2xsZXIuc3RhcnRTdGF0ZSgpO1xuXHRcdH1cblx0fVxufSIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcbmltcG9ydCBVc2VyIGZyb20gXCIuLi92by91c2VyXCI7XG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZVwiO1xuaW1wb3J0IERBTyBmcm9tIFwiLi4vZGFvL2Rhb1wiO1xuaW1wb3J0IHsgVXNlckRhbyB9IGZyb20gXCIuLi9kYW8vdXNlckRhb1wiO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlU2Vzc2lvbiB9IGZyb20gXCIuLi9zZXNzaW9uL2xvY2FsU3RvcmFnZVNlc3Npb25cIjtcbmltcG9ydCBTZXNzaW9uIGZyb20gXCIuLi9zZXNzaW9uL3Nlc3Npb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0aFNlcnZpY2UgaW1wbGVtZW50cyBTZXJ2aWNlIHtcblx0dXNlckRhbyA6IERBTzxVc2VyPjtcblx0c2Vzc2lvbiA6IFNlc3Npb247XG5cblx0cHJpdmF0ZSByZWFkb25seSBUQUJMRV9MQVNUX0xPR0dFRF9JTiA9ICdsYXN0TG9nZ2VkSW5Vc2VyJztcblx0cHJpdmF0ZSByZWFkb25seSBVU0VSX1RBQkxFID0gJ21hemVVc2VyUmVwbyc7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5zZXNzaW9uID0gbmV3IExvY2FsU3RvcmFnZVNlc3Npb24oKTtcblx0XHR0aGlzLnVzZXJEYW8gPSBuZXcgVXNlckRhbyh0aGlzLnNlc3Npb24pO1xuXHR9XG5cdFxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcblx0XHRcblx0fVxuXG5cdHB1YmxpYyBnZXRMYXN0TG9nZ2VkSW5Vc2VyKCkgOiBVc2VyIHtcblx0XHRjb25zdCBvYmogPSB0aGlzLnVzZXJEYW8uc2VsZWN0QWxsKHRoaXMuVEFCTEVfTEFTVF9MT0dHRURfSU4pO1xuXHRcdGxldCB1c2VyT2JqO1xuXHRcdGxldCB1c2VyO1xuXHRcdHRyeSB7XG5cdFx0XHR1c2VyT2JqID0gSlNPTi5wYXJzZShvYmopO1xuXHRcdFx0Y29uc3QgdXNlcklkID0gT2JqZWN0LmtleXModXNlck9iailbMF07XG5cdFx0XHR1c2VyID0gdXNlck9ialt1c2VySWRdO1xuXHRcdFx0dXNlciA9IEpTT04ucGFyc2UodXNlcik7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0dXNlciA9IG51bGw7XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiB1c2VyO1xuXHR9XG5cblx0cHVibGljIHJlZ2lzdGVyVXNlcih1c2VyIDogVXNlcikge1xuXHRcdHRoaXMudXNlckRhby5pbnNlcnQodGhpcy5VU0VSX1RBQkxFLCB1c2VyKTtcblx0XHR0aGlzLnVzZXJEYW8uaW5zZXJ0KHRoaXMuVEFCTEVfTEFTVF9MT0dHRURfSU4sIHVzZXIpO1xuXHR9XG5cblx0cHVibGljIGxvZ2luKHVzZXJJZDogc3RyaW5nLCBjYWxsYmFjazogKHVzZXI6IFVzZXIsIGlzU3VjY2VzczogYm9vbGVhbikgPT4gdm9pZCkge1xuXHRcdGNvbnN0IHVzZXIgPSB0aGlzLnVzZXJEYW8uc2VsZWN0KHRoaXMuVVNFUl9UQUJMRSwgdXNlcklkKTtcblx0XHRpZiAodXNlcikge1xuXHRcdFx0Y2FsbGJhY2sodXNlciwgdHJ1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNhbGxiYWNrKG51bGwsIGZhbHNlKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgbG9nb3V0KHVzZXJJZCkge1xuXHRcdC8vVE9ETzogaW1wbGVtZW50cyBpdC5cblxuXHRcdGNvbnN0IHVzZXIgPSB0aGlzLnVzZXJEYW8uc2VsZWN0KHRoaXMuVVNFUl9UQUJMRSwgdXNlcklkKTtcblx0XHRcblx0XHRjb25zb2xlLmxvZygnbmV4dCB1c2VyIHdvdWxkIGJlIHJlbW92ZWQuJyk7XG5cdFx0Y29uc29sZS5sb2codXNlcik7XG5cdFx0dGhpcy51c2VyRGFvLmRlbGV0ZSh0aGlzLlVTRVJfVEFCTEUsIHVzZXJJZCk7XG5cdH1cbn0iLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZVwiO1xuaW1wb3J0IERBTyBmcm9tIFwiLi4vZGFvL2Rhb1wiO1xuaW1wb3J0IFJlY29yZCBmcm9tIFwiLi4vdm8vcmVjb3JkXCI7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXNzaW9uIH0gZnJvbSBcIi4uL3Nlc3Npb24vbG9jYWxTdG9yYWdlU2Vzc2lvblwiO1xuaW1wb3J0IHsgUmVjb3JkRGFvIH0gZnJvbSBcIi4uL2Rhby9yZWNvcmREYW9cIjtcbmltcG9ydCBTZXNzaW9uIGZyb20gXCIuLi9zZXNzaW9uL3Nlc3Npb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb3JkU2VydmljZSBpbXBsZW1lbnRzIFNlcnZpY2Uge1xuXHRyZWNvcmREYW8gOiBEQU88UmVjb3JkPjtcblx0c2Vzc2lvbiA6IFNlc3Npb247XG5cblx0cHJpdmF0ZSByZWFkb25seSBSRUNPUkRfVEFCTEUgPSAnbWF6ZVJlY29yZEluZm8nO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuc2Vzc2lvbiA9IG5ldyBMb2NhbFN0b3JhZ2VTZXNzaW9uKCk7XG5cdFx0dGhpcy5yZWNvcmREYW8gPSBuZXcgUmVjb3JkRGFvKHRoaXMuc2Vzc2lvbik7XG5cdH1cblxuXHRpbml0aWFsaXplKCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xuXHR9XG5cblx0cHVibGljIGdldFJlY29yZCh1c2VySWQ6IHN0cmluZyk6IFJlY29yZCB7XG5cdFx0Y29uc3QgcmVjb3JkID0gdGhpcy5yZWNvcmREYW8uc2VsZWN0KHRoaXMuUkVDT1JEX1RBQkxFLCB1c2VySWQpO1xuXHRcdHJldHVybiByZWNvcmQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0UmVjb3JkKHJlY29yZDogUmVjb3JkKSB7XG5cdFx0dGhpcy5yZWNvcmREYW8uaW5zZXJ0KHRoaXMuUkVDT1JEX1RBQkxFLCByZWNvcmQpO1xuXHR9XG5cblx0XG59IiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VcIjtcbmltcG9ydCB7IFN0YWdlIH0gZnJvbSBcIi4uL3ZvL3N0YWdlXCI7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi92by9wb2ludFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZVNlcnZpY2UgaW1wbGVtZW50cyBTZXJ2aWNlIHtcblx0dXNlcklkIDogc3RyaW5nO1xuXHRzdGFnZU1hcCA6IGFueTtcblx0XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuc3RhZ2VNYXAgPSB7fTtcblx0XHR0aGlzLmdlbmVyYXRlU3RhZ2VNYXAoKTtcblx0fVxuXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdFxuXHR9XG5cblx0cHVibGljIGdldFN0YWdlSW5mb3JtYXRpb24odXNlcklkIDogc3RyaW5nKSB7XG5cblx0fVxuXG5cdHByaXZhdGUgZ2VuZXJhdGVTdGFnZU1hcCgpIHtcblx0XHRmb3IgKGxldCBpPTA7IGk8MzsgaSsrKSB7XG5cdFx0XHRsZXQgemVyb0Zvcm1hdCA9ICcwMDAnICsgaTtcblx0XHRcdGxldCBtYXBTZXEgPSB6ZXJvRm9ybWF0LnNsaWNlKC0zKTtcblxuXHRcdFx0Y29uc3QgZmxvb3JQYXRoID0gJ2Fzc2V0cy9pbWcvbWFwcy9mbG9vci0nICsgbWFwU2VxICsgJy5wbmcnO1xuXHRcdFx0Y29uc3Qgd2FsbFBhdGggPSAnYXNzZXRzL2ltZy9tYXBzL3dhbGxzLScgKyBtYXBTZXEgKyAnLnBuZyc7XG5cblx0XHRcdC8vIGNvbnN0IHN0YWdlID0gbmV3IFN0YWdlKGksIGZsb29yUGF0aCwgd2FsbFBhdGgsIFBvaW50Lm9uKDIzNSwgODUpKTtcblxuXG5cdFx0XHRjb25zdCBzdGFnZSA9IG5ldyBTdGFnZShpLCBmbG9vclBhdGgsIHdhbGxQYXRoLCBcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFBvaW50Lm9uKDIzNSwgODUpLFxuXHRcdFx0XHRcdFBvaW50Lm9uKDU2NSwgNDAwKVxuXHRcdFx0XHRdKTtcblx0XHRcdFxuXHRcdFx0dGhpcy5zdGFnZU1hcFtpXSA9IHN0YWdlO1xuXHRcdH1cblx0fVxufSIsImltcG9ydCBTZXNzaW9uIGZyb20gXCIuL3Nlc3Npb25cIjtcblxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZVNlc3Npb24gaW1wbGVtZW50cyBTZXNzaW9uIHtcblx0Z2V0KHRhYmxlOiBzdHJpbmcsIGtleTogc3RyaW5nKSA6IGFueSB7XG5cdFx0Y29uc3QgdGFibGVEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGFibGUpIHx8IG51bGw7XG5cdFx0aWYgKCF0YWJsZURhdGEpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGNvbnN0IHRhYmxlSnNvbk9iaiA9IEpTT04ucGFyc2UodGFibGVEYXRhKTtcblx0XHRsZXQgaXRlbSA9IHRhYmxlSnNvbk9ialtrZXldO1xuXG5cdFx0cmV0dXJuIGl0ZW07XG5cdH1cblxuXHRzZXQodGFibGU6IHN0cmluZywga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHsgLy8gdmFsdWU6IHN0cmluZztcblx0XHRjb25zdCBvcmlnaW5hbERhdGFPYmogPSB0aGlzLmdldCh0YWJsZSwga2V5KTtcblx0XHRpZiAoIW9yaWdpbmFsRGF0YU9iaikge1xuXHRcdFx0Y29uc3Qgb2JqID0ge307XG5cdFx0XHRvYmpba2V5XSA9ICB2YWx1ZTtcblxuXHRcdFx0Y29uc3Qgd3JpdHRlbkRhdGEgPSBKU09OLnN0cmluZ2lmeShvYmopO1xuXG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0YWJsZSwgdmFsdWUpO1x0XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0YWJsZSwgd3JpdHRlbkRhdGEpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQganNvblZhbHVlID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG5cdFx0XHRqc29uVmFsdWVba2V5XSA9IEpTT04ucGFyc2UoanNvblZhbHVlW2tleV0pO1xuXG5cdFx0XHRsZXQgdGVtcCA9IEpTT04ucGFyc2Uob3JpZ2luYWxEYXRhT2JqKTtcblx0XHRcdGxldCBvcmlnaW5hbERhdGFKc29uID0ge307XG5cdFx0XHRvcmlnaW5hbERhdGFKc29uW2tleV0gPSB0ZW1wO1xuXG5cdFx0XHRjb25zdCBvYmogPSBPYmplY3QuYXNzaWduKHt9LCBvcmlnaW5hbERhdGFPYmosIGpzb25WYWx1ZSk7XG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0YWJsZSwgb2JqKTtcblx0XHR9XG5cdH1cblxuXHRyZW1vdmUoa2V5OiBzdHJpbmcpIHtcblx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuXHR9XG5cblx0YWxsU3RvcmFnZSgpIHtcblx0XHRsZXQgYXJjaGl2ZSA9IHt9O1xuXHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKTtcblx0XHRsZXQgaSA9IGtleXMubGVuZ3RoO1xuXG5cdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0YXJjaGl2ZVtrZXlzW2ldXSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleXNbaV0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBhcmNoaXZlO1xuXHR9XG59IiwiaW1wb3J0IHsgU3RhdGVNYW5hZ2VyLCBHYW1lIH0gZnJvbSBcInBoYXNlci1jZVwiO1xuaW1wb3J0IFNlcnZpY2VDb250cm9sbGVyIGZyb20gXCIuLi9jb250cm9sbGVyL3NlcnZpY2VDb250cm9sbGVyXCI7XG5pbXBvcnQgU3RhdGVDb250cm9sbGVyIGZyb20gXCIuLi9jb250cm9sbGVyL3N0YXRlQ29udHJvbGxlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlIGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcblx0c2VydmljZUNvbnRyb2xsZXIgOiBTZXJ2aWNlQ29udHJvbGxlcjtcblx0c3RhdGVDb250cm9sbGVyIDogU3RhdGVDb250cm9sbGVyO1xuXG5cdGNvbnN0cnVjdG9yKGdhbWUgOiBQaGFzZXIuR2FtZSkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHQvLyBGb3IgSWdub3Jpbmcgbm9uLWV4aXN0IHByb3BlcnR5IGVycm9yLlxuXHRcdHRoaXMuc2VydmljZUNvbnRyb2xsZXIgPSAoZ2FtZSBhcyBhbnkpLnNlcnZpY2VDb250cm9sbGVyO1xuXHRcdHRoaXMuc3RhdGVDb250cm9sbGVyID0gKGdhbWUgYXMgYW55KS5zdGF0ZUNvbnRyb2xsZXI7XG5cdH1cblxuXHRnb1N0YXRlKHN0cmluZykge1xuXHRcdHRoaXMuc2VydmljZUNvbnRyb2xsZXIgXG5cdH1cblx0XG59IiwiaW1wb3J0IEJhc2UgZnJvbSBcIi4vYmFzZVwiO1xuXG5leHBvcnQgY2xhc3MgSW50cm8gZXh0ZW5kcyBCYXNlIHtcblx0c3RhdGljIGludHJvSW50ZXJ2YWwgPSAxNTAwO1xuXG5cdGdhbWVUaXRsZSA6IHN0cmluZztcblx0bG9nb1RleHQgOiBQaGFzZXIuVGV4dDtcblxuXHRjb25zdHJ1Y3RvcihnYW1lOiBQaGFzZXIuR2FtZSkge1xuXHRcdHN1cGVyKGdhbWUpO1xuXHR9XG5cblx0aW5pdChnYW1lVGl0bGUpIHtcblx0XHR0aGlzLmdhbWVUaXRsZSA9IGdhbWVUaXRsZTtcblx0fVxuXG5cdHByZWxvYWQoKSB7XG5cdFx0XG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0dGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzQ0ODhBQSc7XG5cblx0XHR0aGlzLmxvZ29UZXh0ID0gdGhpcy5nYW1lLmFkZC50ZXh0KFxuXHRcdFx0dGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIFxuXHRcdFx0dGhpcy5nYW1lLndvcmxkLmNlbnRlclksIFxuXHRcdFx0dGhpcy5nYW1lVGl0bGUsXG5cdFx0XHR7XG5cdFx0XHRcdGZvbnQ6ICc4MHB4IEFyaWFsOycsXG5cdFx0XHRcdGZpbGw6ICcjZmZmZmZmJ1xuXHRcdFx0fVxuXHRcdCk7XG5cdFx0dGhpcy5sb2dvVGV4dC5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xuXHRcdHRoaXMubG9nb1RleHQuYWxwaGEgPSAwLjg7XG5cblx0XHRjb25zdCBwID0gdGhpcy5nYW1lLndvcmxkLmJvdW5kcy5ib3R0b21SaWdodDtcblx0XHRcblx0XHRjb25zdCBmb290ZXIgPSB0aGlzLmdhbWUuYWRkLnRleHQoXG5cdFx0XHRwLnggLSAxMDAsXG5cdFx0XHRwLnkgLSAzMCxcblx0XHRcdCd2MS4wLCBtYWRlIHdpdGggUGhhc2VyJyxcblx0XHRcdHtcblx0XHRcdFx0Zm9udDogJzE1cHggQXJpYWw7Jyxcblx0XHRcdFx0ZmlsbDogJyNlZWVlZWUnXG5cdFx0XHR9XG5cdFx0KTtcblx0XHRmb290ZXIuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcblxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRzZWxmLnN0YXRlQ29udHJvbGxlci5nb1N0YXRlKCdMb2dpbicpO1xuXHRcdH0sIEludHJvLmludHJvSW50ZXJ2YWwpO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXG5cdH1cbn0iLCJpbXBvcnQgU2VydmljZUNvbnRyb2xsZXIgZnJvbSBcIi4uL2NvbnRyb2xsZXIvc2VydmljZUNvbnRyb2xsZXJcIjtcbmltcG9ydCBCYXNlIGZyb20gXCIuL2Jhc2VcIjtcbmltcG9ydCBSZWNvcmQsIHsgU3RhZ2VSZWNvcmQgfSBmcm9tIFwiLi4vdm8vcmVjb3JkXCJcbmltcG9ydCB7IFJhbmtVdGlsIH0gZnJvbSBcIi4uL3ZvL3JhbmtcIjtcblxuZXhwb3J0IGNsYXNzIExldmVsIGV4dGVuZHMgQmFzZSB7XG5cdHJlYWRvbmx5IG51bWJlck9mU3RhZ2UgPSAzO1xuXG5cdGxvd2VyU3RhZ2VCdG4gOiBQaGFzZXIuQnV0dG9uO1xuXHRoaWdoZXJTdGFnZUJ0biA6IFBoYXNlci5CdXR0b247XG5cdGN1cnJlbnRTdGFnZTogbnVtYmVyO1xuXHRzdGFnZU1hcDogYW55O1xuXG5cdHJlY29yZDogUmVjb3JkO1xuXG5cdGNvbnN0cnVjdG9yKGdhbWUpIHtcblx0XHRzdXBlcihnYW1lKTtcblx0fVxuXHRcblx0aW5pdChzdGFnZU1hcCkge1xuXHRcdHRoaXMuc3RhZ2VNYXAgPSBzdGFnZU1hcDtcblx0fVxuXG5cdHByZWxvYWQoKSB7XG5cdFx0dGhpcy5nYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ3N0YWdlQXJyb3dzJywgJy4uL2Fzc2V0cy9pbWcvc3RhZ2VBcnJvd3MucG5nJywgNDgsIDQ4KTtcblxuXHRcdHRoaXMucmVjb3JkID0gdGhpcy5zZXJ2aWNlQ29udHJvbGxlci5nZXRSZWNvcmQoKTtcblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHR0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyM5QjlCOUInO1xuXHRcdHRoaXMuZ2FtZS5zdGFnZS5hbHBoYSA9IDAuOTtcblx0XHR0aGlzLmRyYXdTdGFnZUJ0bigpO1xuXHRcdHRoaXMuZHJhd1N0YWdlTW92ZUJ0bigpO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXG5cdH1cblxuXHRwcml2YXRlIGRyYXdTdGFnZUJ0bigpIHtcblx0XHRjb25zdCB3aWR0aCA9IDIwMDtcblx0XHRjb25zdCBoZWlnaHQgPSAyMDA7XG5cblx0XHRsZXQgb2Zmc2V0WCA9ICh0aGlzLmdhbWUud29ybGQud2lkdGggLSAxNTApIC8gdGhpcy5udW1iZXJPZlN0YWdlOyAvLyAxNTA6IHBhZGRpbmdcblxuXHRcdGxldCBzdGFnZUluZm9zID0ge307XG5cdFx0aWYgKHRoaXMucmVjb3JkKSB7XG5cdFx0XHRzdGFnZUluZm9zID0gdGhpcy5yZWNvcmQucmVjb3Jkcztcblx0XHR9XG5cdFx0XG5cdFx0Zm9yIChsZXQgaT0wOyBpPHRoaXMubnVtYmVyT2ZTdGFnZTsgaSsrKSB7XG5cdFx0XHRsZXQgc3RhZ2VJbmZvOiBTdGFnZVJlY29yZDtcblx0XHRcdGxldCBzdGFnZUluZm9TdHIgPSAnJztcblx0XHRcdGlmIChzdGFnZUluZm9zW2ldKSB7XG5cdFx0XHRcdHN0YWdlSW5mbyA9IHN0YWdlSW5mb3NbaV07XG5cdFx0XHRcdHN0YWdlSW5mb1N0ciArPSAnXFxuVGltZTogJyArIHN0YWdlSW5mby50aW1lICsgJyBzZWNvbmRzJztcblx0XHRcdFx0c3RhZ2VJbmZvU3RyICs9ICdcXG5SYW5rOiAnICsgUmFua1V0aWwudmFsdWVPZihzdGFnZUluZm8ucmFuayk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHN0YWdlQnRuVGV4dCA9IGBTdGFnZS0ke2krMX1gICsgc3RhZ2VJbmZvU3RyO1xuXHRcdFx0Y29uc3Qgc3RhZ2VCdG4gPSB0aGlzLmdhbWUuYWRkLnRleHQoMTQ1ICsgKG9mZnNldFggKiBpKSwgOTAsIHN0YWdlQnRuVGV4dCwge1xuXHRcdFx0XHRmaWxsOiAnI2ZmZmZmZicsXG5cdFx0XHRcdGZvbnQ6ICcxNXB4IEFyaWFsJ1xuXHRcdFx0fSk7XG5cblx0XHRcdHN0YWdlQnRuLmlucHV0RW5hYmxlZCA9IHRydWU7XG5cdFx0XHRzdGFnZUJ0bi5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcblx0XHRcdFxuXHRcdFx0Y29uc3Qgc3RhZ2VOdW0gPSBpKzE7XG5cdFx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHRcdHN0YWdlQnRuLmV2ZW50cy5vbklucHV0RG93bi5hZGQoKGUpID0+IHtcblx0XHRcdFx0aWYgKGNvbmZpcm0oYFdhbm5hIEdvIHRvIFN0YWdlLSR7c3RhZ2VOdW19P2ApKSB7XG5cdFx0XHRcdFx0c2VsZi5zdGF0ZUNvbnRyb2xsZXIuZ29TdGF0ZSgnUGxheScsIHRydWUsIHRydWUsIHNlbGYuc3RhZ2VNYXBbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCB0aGlzKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGRyYXdTdGFnZU1vdmVCdG4oKSB7XG5cdFx0Y29uc3QgcCA9IHRoaXMuZ2FtZS53b3JsZC5ib3VuZHM7XG5cblx0XHR0aGlzLmxvd2VyU3RhZ2VCdG4gPSB0aGlzLmdhbWUuYWRkLmJ1dHRvbigxMDAsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZICwgXCJzdGFnZUFycm93c1wiLCB0aGlzLmJ1dHRvbkNsaWNrZWQpO1xuXHRcdHRoaXMuaGlnaGVyU3RhZ2VCdG4gPSB0aGlzLmdhbWUuYWRkLmJ1dHRvbigxMDAsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZLCBcInN0YWdlQXJyb3dzXCIsIHRoaXMuYnV0dG9uQ2xpY2tlZCk7XG5cblx0XHR0aGlzLmxvd2VyU3RhZ2VCdG4uZnJhbWUgPSAwO1xuXHRcdHRoaXMuaGlnaGVyU3RhZ2VCdG4uZnJhbWUgPSAxO1xuXG5cdFx0Ly8gQWxpZ24gc3RhZ2UgcGFnZSBtb3ZlIGJ0blxuXHRcdHRoaXMubG93ZXJTdGFnZUJ0bi54ID0gMjA7XG5cdFx0dGhpcy5oaWdoZXJTdGFnZUJ0bi54ID0gcC5yaWdodCAtIDIwIC0gdGhpcy5oaWdoZXJTdGFnZUJ0bi53aWR0aDtcblxuXHRcdGNvbnN0IHN0YWdlVGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dCh0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgNTAsICdTdGFnZScsIHtcblx0XHRcdGZpbGw6ICcjZmZmZmZmJyxcblx0XHRcdGZvbnQ6ICcyMHB4IEFyaWFsJ1xuXHRcdH0pO1xuXG5cdFx0c3RhZ2VUZXh0LmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XG5cdH1cblxuXHRwcml2YXRlIGJ1dHRvbkNsaWNrZWQoYnV0dG9uLCBwb2ludGVyKSB7XG5cdFx0aWYgKGJ1dHRvbi5mcmFtZSA9PSAwKSB7IC8vIGxvd2VyU3RhZ2VCdG5cblxuXHRcdH0gZWxzZSBpZiAoYnV0dG9uLmZyYW1lID09IDEpIHsgLy8gaGlnaGVyU3RhZ2VCdG5cblxuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlJztcbmltcG9ydCBVc2VyIGZyb20gJy4uL3ZvL3VzZXInO1xuXG5leHBvcnQgY2xhc3MgTG9naW4gZXh0ZW5kcyBCYXNlIHtcblx0bG9naW5UZXh0IDogUGhhc2VyLlRleHQ7XG5cdGdhbWVMb2dvIDogUGhhc2VyLkltYWdlO1xuXG5cdGd1ZXN0VVVJRCA6IHN0cmluZztcblxuXHRjb25zdHJ1Y3RvcihnYW1lKSB7XG5cdFx0c3VwZXIoZ2FtZSk7XG5cdH1cblxuXHRwcmVsb2FkKCkge1xuXHRcdHRoaXMuZ2FtZS5sb2FkLmltYWdlKCdnYW1lTG9nbycsICdhc3NldHMvaW1nL2dhbWVsb2dvLnBuZycpO1xuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyNGRkZGRkYnO1xuXG5cdFx0dGhpcy5nYW1lTG9nbyA9IHRoaXMuZ2FtZS5hZGQuaW1hZ2UodGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIDIxMCwgJ2dhbWVMb2dvJyk7XG5cdFx0dGhpcy5nYW1lTG9nby5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xuXG5cdFx0dGhpcy5sb2dpblRleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQoXG5cdFx0XHR0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgXG5cdFx0XHR0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgXG5cdFx0XHQnTG9naW4nLFxuXHRcdFx0e1xuXHRcdFx0XHRmb250OiAnMzVweCBBcmlhbDsnLFxuXHRcdFx0XHRmaWxsOiAnIzAwMDAwMCdcblx0XHRcdH1cblx0XHQpO1xuXHRcdHRoaXMubG9naW5UZXh0LmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XG5cdFx0dGhpcy5sb2dpblRleHQuYWxwaGEgPSAwLjg7XG5cblx0XHR0aGlzLmxvZ2luVGV4dC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xuXHRcdHRoaXMubG9naW5UZXh0LmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xuXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0dGhpcy5sb2dpblRleHQuZXZlbnRzLm9uSW5wdXREb3duLmFkZCgoZSkgPT4ge1xuXHRcdFx0Y29uc3QgdHdlZW4gPSBzZWxmLmdhbWUuYWRkLnR3ZWVuKHNlbGYubG9naW5UZXh0KS50byh7XG5cdFx0XHRcdGFscGhhOiAwLjJcblx0XHRcdH0sIDcwMCwgUGhhc2VyLkVhc2luZy5RdWFkcmF0aWMuT3V0LCBmYWxzZSwgMCwgMCwgZmFsc2UpO1xuXHRcdFx0XG5cdFx0XHR0d2Vlbi5vbkNvbXBsZXRlLmFkZCgoZSkgPT4ge1xuXHRcdFx0XHRsZXQgdXNlciA9IHNlbGYuc2VydmljZUNvbnRyb2xsZXIuYXV0aFNlcnZpY2UuZ2V0TGFzdExvZ2dlZEluVXNlcigpO1xuXHRcdFx0XHRpZiAodXNlciAmJiB1c2VyLnVzZXJJZCkge1xuXHRcdFx0XHRcdHNlbGYuc2VydmljZUNvbnRyb2xsZXIubG9naW4odXNlci51c2VySWQsICh1c2VyOiBVc2VyLCBpc1N1Y2Nlc3M6IGJvb2xlYW4pID0+IHtcblx0XHRcdFx0XHRcdGlmIChpc1N1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdFx0YWxlcnQoYCR7dXNlci51c2VySWR964uYIO2ZmOyYge2VqeuLiOuLpC5gKTtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc3RhZ2VJbmZvID0gc2VsZi5zZXJ2aWNlQ29udHJvbGxlci5nZXRTdGFnZUluZm9ybWF0aW9uKCk7XG5cdFx0XHRcdFx0XHRcdHNlbGYuc3RhdGVDb250cm9sbGVyLmdvU3RhdGUoJ0xldmVsJywgdHJ1ZSwgdHJ1ZSwgc3RhZ2VJbmZvKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGFsZXJ0KCfsmIjsoITsl5Ag67Cp66y47ZWY7IugIOyggeydtCDsl4bsnLzsi5zqtbDsmpQ/IOyCrOyaqeyekCDrk7HroZ3tmZTrqbTsnLzroZwg7J2064+Z7ZWp64uI64ukLicpO1xuXHRcdFx0XHRcdFx0XHRzZWxmLnN0YXRlQ29udHJvbGxlci5nb1N0YXRlKCdSZWdpc3RlcicpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1x0XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWxlcnQoJ+yYiOyghOyXkCDrsKnrrLjtlZjsi6Ag7KCB7J20IOyXhuycvOyLnOq1sOyalD8g7IKs7Jqp7J6QIOuTseuhne2ZlOuptOycvOuhnCDsnbTrj5ntlanri4jri6QuJyk7XG5cdFx0XHRcdFx0c2VsZi5zdGF0ZUNvbnRyb2xsZXIuZ29TdGF0ZSgnUmVnaXN0ZXInKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgc2VsZik7XG5cblx0XHRcdHR3ZWVuLnN0YXJ0KCk7XG5cdFx0fSwgdGhpcyk7XG5cblxuXHRcdHRoaXMubG9naW5UZXh0LmV2ZW50cy5vbklucHV0T3Zlci5hZGQoKGUpID0+IHtcblx0XHRcdHNlbGYubG9naW5UZXh0LmFscGhhID0gMC41O1xuXHRcdH0sIHRoaXMpO1xuXG5cdFx0dGhpcy5sb2dpblRleHQuZXZlbnRzLm9uSW5wdXRPdXQuYWRkKChlKSA9PiB7XG5cdFx0XHRzZWxmLmxvZ2luVGV4dC5hbHBoYSA9IDAuODtcblx0XHR9LCB0aGlzKTtcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblxuXHR9XG59IiwiaW1wb3J0IEJhc2UgZnJvbSBcIi4vYmFzZVwiO1xuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tIFwiLi4vdm8vc3RhZ2VcIjtcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL3ZvL3BvaW50XCI7XG5pbXBvcnQgeyBSZWNvcmREYW8gfSBmcm9tIFwiLi4vZGFvL3JlY29yZERhb1wiO1xuaW1wb3J0IFJlY29yZCwgeyBTdGFnZVJlY29yZCB9IGZyb20gXCIuLi92by9yZWNvcmRcIjtcbmltcG9ydCB7IFJhbmsgfSBmcm9tIFwiLi4vdm8vcmFua1wiO1xuXG5leHBvcnQgY2xhc3MgUGxheSBleHRlbmRzIEJhc2Uge1xuXHRzdGF0aWMgcmVhZG9ubHkgcmF5TGVuZ3RoID0gNTAwO1xuXHRzdGF0aWMgcmVhZG9ubHkgbnVtT2ZSYXlzID0gMjA7XG5cdHN0YXRpYyByZWFkb25seSBsaWdodEFuZ2xlID0gTWF0aC5QSS80OyAvLyA0NSBkZWcuXG5cblx0cHJpdmF0ZSByZWFkb25seSBzcGVlZCA9IDI7XG5cblx0dGltZXIgOiBQaGFzZXIuVGltZXI7XG5cblx0Ly8gZmxvb3IgOiBQaGFzZXIuVGlsZVNwcml0ZTtcblx0Zmxvb3IgOiBQaGFzZXIuU3ByaXRlO1xuXHR3YWxsIDogUGhhc2VyLlNwcml0ZTtcblx0d2FsbHNCaXRNYXAgOiBQaGFzZXIuQml0bWFwRGF0YTtcblx0bWFzayA6IFBoYXNlci5HcmFwaGljcztcblx0cGxheWVyIDogUGhhc2VyLlNwcml0ZTtcblx0cGxheWVyUGF0aCA6IHN0cmluZztcblxuXHRjdXJzb3IgOiBQaGFzZXIuQ3Vyc29yS2V5cztcblx0XG5cdHN0YWdlSW5mbyA6IFN0YWdlO1xuXHRjdXJyZW50RXhpdFBvaW50IDogUG9pbnQ7XG5cdGN1cnJlbnRFeGl0R3JhcGhpYyA6IFBoYXNlci5HcmFwaGljcztcblxuXHR3YWxsQ29sbGlzaW9uU291bmQ6IFBoYXNlci5Tb3VuZDtcblxuXHRjb25zdHJ1Y3RvcihnYW1lKSB7XG5cdFx0c3VwZXIoZ2FtZSk7XG5cdH1cblxuXHRpbml0KHN0YWdlSW5mbyA6IFN0YWdlKSB7XG5cdFx0dGhpcy5zdGFnZUluZm8gPSBzdGFnZUluZm87XG5cdFx0dGhpcy5wbGF5ZXJQYXRoID0gJ2Fzc2V0cy9pbWcvcGxheWVyLXNwcmVhZHNoZWV0LnBuZyc7XG5cdH1cblxuXHRwcmVsb2FkKCkge1xuXHRcdHRoaXMuZ2FtZS5sb2FkLmltYWdlKCdmbG9vcicsIHRoaXMuc3RhZ2VJbmZvLmZsb29yRmlsZVBhdGgpO1xuXHRcdHRoaXMuZ2FtZS5sb2FkLmltYWdlKCd3YWxsJywgdGhpcy5zdGFnZUluZm8ud2FsbEZpbGVQYXRoKTtcblx0XHR0aGlzLmdhbWUubG9hZC5zcHJpdGVzaGVldCgncGxheWVyJywgdGhpcy5wbGF5ZXJQYXRoLCA2NCwgNjQsIDM2KTtcblx0XHR0aGlzLmxvYWQuYXVkaW8oXCJ3YWxsQ29sbGlzaW9uU291bmRcIiwgW1wiYXNzZXRzL21wMy9iZWVwLTAxYS5tcDMubXAzXCJdKTtcblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHR0aGlzLndhbGxDb2xsaXNpb25Tb3VuZCA9IHRoaXMuYWRkLmF1ZGlvKCd3YWxsQ29sbGlzaW9uU291bmQnKTtcblxuXHRcdHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMDAwMCc7IFxuXHRcdC8vIHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnMHhmZmZmZmYnOyBcblxuXHRcdHRoaXMuZ2FtZS53b3JsZC5zZXRCb3VuZHMoMCwgMCwgdGhpcy53b3JsZC53aWR0aCwgdGhpcy53b3JsZC5oZWlnaHQtMTIwKTtcblx0XHRcblx0XHR0aGlzLmNyZWF0ZUZsb29yKCk7XG5cdFx0dGhpcy5tYWtlRmlyc3RFeGl0UG9pbnQoKTtcblx0XHR0aGlzLmNyZWF0ZVdhbGwoKTtcblx0XHR0aGlzLmNyZWF0ZVBsYXllcigpOyBcblxuXHRcdHRoaXMuZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyLCBQaGFzZXIuQ2FtZXJhLkZPTExPV19MT0NLT04sIDAuMSwgMC4xKTtcblxuXHRcdHRoaXMuY3JlYXRlTWFzaygpO1xuXG5cdFx0dGhpcy5mbG9vci5tYXNrID0gdGhpcy5tYXNrO1xuXG5cdFx0dGhpcy50aW1lciA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZShmYWxzZSk7XG5cblx0XHR0aGlzLmN1cnNvciA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XG5cdFx0dGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZENhbGxiYWNrcyh0aGlzLCAoa2V5KSA9PiB7XG5cdFx0XHQvL1RPRE86IHdhc2Qg6rCA64ql7ZWY6rKMIO2VoCDqsoNcblx0XHRcdGlmIChrZXkua2V5Q29kZSA9PT0gODcpIHtcdFx0Ly8gVywgVXBcblx0XHRcdFx0XG5cdFx0XHR9IGVsc2UgaWYgKGtleS5rZXkgPT09IDY1KSB7XHQvLyBBLCBMZWZ0XG5cdFx0XHRcblx0XHRcdH0gZWxzZSBpZiAoa2V5LmtleSA9PT0gODMpIHtcdC8vIFMsIERvd25cblx0XHRcdFxuXHRcdFx0fSBlbHNlIGlmIChrZXkua2V5ID09PSA2OCkge1x0Ly8gRCwgUmlnaHRcblx0XHRcdFxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5jcmVhdGVUaW1lcigpO1xuXHR9XG5cblx0cHJpdmF0ZSBjcmVhdGVUaW1lcigpIHtcblx0XHRjb25zdCB0ZXh0ID0gdGhpcy5nYW1lLmFkZC50ZXh0KHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCA1MDAsICdUaW1lciA6ICcsIHtcblx0XHRcdGZpbGw6ICcjZmZmZmZmJyxcblx0XHRcdGZvbnQ6ICcxNXB4IEFyaWFsJ1xuXHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdHRoaXMubW92ZVBsYXllcigpO1xuXHRcdHRoaXMubW92ZUZsYXNoKCk7XG5cdFx0dGhpcy5yYW5kb21BbHBoYVRvKHRoaXMuZmxvb3IpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMuZ2FtZS5kZWJ1Zy5pbnB1dEluZm8oMzIsIDMyKTtcblx0fVxuXG5cdHByaXZhdGUgbWFrZUZpcnN0RXhpdFBvaW50KCkge1xuXHRcdGNvbnN0IGlkeE9mRXhpdFBvaW50ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSoxMSAlIHRoaXMuc3RhZ2VJbmZvLmV4aXRQb2ludHMubGVuZ3RoO1xuXHRcdHRoaXMuc3RhZ2VJbmZvLmV4aXRQb2ludHNbaWR4T2ZFeGl0UG9pbnRdLmFjdGl2ZSA9IHRydWU7XG5cdFx0dGhpcy5jdXJyZW50RXhpdFBvaW50ID0gdGhpcy5zdGFnZUluZm8uZXhpdFBvaW50c1tpZHhPZkV4aXRQb2ludF07XG5cdFx0dGhpcy5yZW5kZXJFeGl0UG9pbnQodGhpcy5jdXJyZW50RXhpdFBvaW50KTtcblx0fVxuXG5cdHByaXZhdGUgcmVuZGVyRXhpdFBvaW50KGV4aXRQb2ludCA6IFBvaW50KSB7XG5cdFx0Y29uc3QgZ3JhcGhpY2FsUG9pbnQgPSAoeCwgeSkgPT4ge1xuXHRcdFx0dGhpcy5jdXJyZW50RXhpdEdyYXBoaWMgPSB0aGlzLmdhbWUuYWRkLmdyYXBoaWNzKDAsIDApO1xuXHRcdFx0dGhpcy5jdXJyZW50RXhpdEdyYXBoaWMuYmVnaW5GaWxsKDB4ZmYwMDAwLCAwLjgpO1xuXHRcdFx0dGhpcy5jdXJyZW50RXhpdEdyYXBoaWMuZHJhd0NpcmNsZSh4LCB5LCAxMCk7XG5cdFx0XHR0aGlzLmN1cnJlbnRFeGl0R3JhcGhpYy5lbmRGaWxsKCk7XG5cdFx0fTtcblxuXHRcdGdyYXBoaWNhbFBvaW50KGV4aXRQb2ludC54LCBleGl0UG9pbnQueSk7XG5cdH1cblxuXHRwcml2YXRlIHJhbmRvbUFscGhhVG8ob2JqIDphbnkpIHtcblx0XHRvYmouYWxwaGEgPSAwLjUgKyBNYXRoLnJhbmRvbSgpICogMC41O1xuXHR9XG5cblx0cHJpdmF0ZSBjcmVhdGVQbGF5ZXIoKSB7XG5cdFx0dGhpcy5wbGF5ZXIgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSg3NSwgNzUsICdwbGF5ZXInKTtcblx0XHR0aGlzLnBsYXllci5hbmNob3Iuc2V0KC41LCAuNSk7XHRcblxuXHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMuYWRkKCdub3J0aCcsIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4XSwgMTAsIHRydWUpO1xuXHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMuYWRkKCd3ZXN0JywgWzksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxN10sIDEwLCB0cnVlKTtcblx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgnc291dGgnLCBbMTgsIDE5LCAyMCwgMjEsIDIyLCAyMywgMjQsIDI1LCAyNl0sIDEwLCB0cnVlKTtcblx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgnZWFzdCcsIFsyNywgMjgsIDI5LCAzMCwgMzEsIDMyLCAzMywgMzQsIDM1IF0sIDEwLCB0cnVlKTtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlRmxvb3IoKSB7XG5cdFx0dGhpcy5mbG9vciA9IHRoaXMuZ2FtZS5hZGQuc3ByaXRlKDAsIDAsICdmbG9vcicpO1xuXHRcdHRoaXMuZmxvb3Iud2lkdGggPSA2NDA7XG5cdFx0dGhpcy5mbG9vci5oZWlnaHQgPSA0ODA7XG5cdH1cblxuXHRwcml2YXRlIGNyZWF0ZU1hc2soKSB7XG5cdFx0dGhpcy5tYXNrID0gdGhpcy5nYW1lLmFkZC5ncmFwaGljcygwLCAwKTtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlV2FsbCgpIHtcblx0XHR0aGlzLndhbGxzQml0TWFwID0gdGhpcy5nYW1lLm1ha2UuYml0bWFwRGF0YSg2NDAsIDQ4MCk7XG5cdFx0dGhpcy53YWxsc0JpdE1hcC5kcmF3KCd3YWxsJyk7XG5cdFx0dGhpcy53YWxsc0JpdE1hcC51cGRhdGUoKTtcblx0XHR0aGlzLndhbGwgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSgwLCAwLCB0aGlzLndhbGxzQml0TWFwKTtcblx0fVxuXG5cdHByaXZhdGUgbW92ZUZsYXNoKCkge1xuXHRcdGNvbnN0IHBsYXllcldpZHRoID0gdGhpcy5wbGF5ZXIud2lkdGg7XG5cdFx0Y29uc3QgcGxheWVySGVpZ2h0ID0gdGhpcy5wbGF5ZXIuaGVpZ2h0O1xuXG5cdFx0Y29uc3QgcGxheWVyWCA9IHRoaXMucGxheWVyLng7XG5cdFx0Y29uc3QgcGxheWVyWSA9IHRoaXMucGxheWVyLnk7XG5cdFx0XG5cdFx0Y29uc3QgZHkgPSB0aGlzLmdhbWUuaW5wdXQueSAtIHBsYXllclk7XG5cdFx0Y29uc3QgZHggPSB0aGlzLmdhbWUuaW5wdXQueCAtIHBsYXllclg7XG5cblx0XHRjb25zdCBtb3VzZUFuZ2xlID0gTWF0aC5hdGFuMihkeSwgZHgpO1xuXG5cdFx0dGhpcy5tYXNrLmNsZWFyKCk7XG5cdFx0dGhpcy5tYXNrLmxpbmVTdHlsZSgyLCAweGZmZmZmZiwgMSk7XG5cblx0XHR0aGlzLm1hc2suYmVnaW5GaWxsKDB4MDAwMDAwKTtcblx0XHR0aGlzLm1hc2subW92ZVRvKHBsYXllclgsIHBsYXllclkpO1xuXHRcdGZvciAobGV0IGk9MDsgaTxQbGF5Lm51bU9mUmF5czsgaSsrKSB7XG5cdFx0XHRjb25zdCByYXlBbmdsZSA9IG1vdXNlQW5nbGUgLSAoUGxheS5saWdodEFuZ2xlLzIpICsgKFBsYXkubGlnaHRBbmdsZS9QbGF5Lm51bU9mUmF5cykgKiBpO1xuXHRcdFx0bGV0IGxhc3RYID0gcGxheWVyWDtcblx0XHRcdGxldCBsYXN0WSA9IHBsYXllclk7XG5cdFx0XHRcblx0XHRcdGZvciAobGV0IGo9MTsgajw9UGxheS5yYXlMZW5ndGg7IGorKykge1xuXHRcdFx0XHRjb25zdCB4ID0gTWF0aC5yb3VuZChwbGF5ZXJYICsgKGogKiBNYXRoLmNvcyhyYXlBbmdsZSkpKTtcblx0XHRcdFx0Y29uc3QgeSA9IE1hdGgucm91bmQocGxheWVyWSArIChqICogTWF0aC5zaW4ocmF5QW5nbGUpKSk7XG5cblx0XHRcdFx0Y29uc3QgY29sb3IgPSB0aGlzLnBpY2tDb2xvck9mKHgsIHksIHRoaXMud2FsbHNCaXRNYXApO1xuXHRcdFx0XHRpZiAoY29sb3IgPT0gMCkge1xuXHRcdFx0XHRcdGxhc3RYID0geDtcblx0XHRcdFx0XHRsYXN0WSA9IHk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5tYXNrLmxpbmVUbyhsYXN0WCwgbGFzdFkpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLm1hc2subGluZVRvKGxhc3RYLCBsYXN0WSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5tYXNrLmxpbmVUbyhwbGF5ZXJYLCBwbGF5ZXJZKTtcblx0XHR0aGlzLm1hc2suZW5kRmlsbCgpO1xuXHR9XG5cblx0cHJpdmF0ZSBtb3ZlUGxheWVyKCkge1xuXHRcdGxldCB4U3BlZWQgPSAwO1xuXHRcdGxldCB5U3BlZWQgPSAwO1xuXHRcdGxldCBpc01vdmluZyA9IGZhbHNlO1xuXHRcdGxldCBjYW5Nb3ZlID0gZmFsc2U7XG5cblx0XHRjb25zdCBwbGF5ZXJXaWR0aCA9IHRoaXMucGxheWVyLndpZHRoO1xuXHRcdGNvbnN0IHBsYXllckhlaWdodCA9IHRoaXMucGxheWVyLmhlaWdodDtcblxuXHRcdGNvbnN0IHBsYXllclggPSB0aGlzLnBsYXllci54O1xuXHRcdGNvbnN0IHBsYXllclkgPSB0aGlzLnBsYXllci55O1xuXG5cdFx0Y29uc3QgY29sb3IgPSB7XG5cdFx0XHRub3J0aCA6IDAsXG5cdFx0XHRzb3V0aCA6IDAsXG5cdFx0XHR3ZXN0IDogMCxcblx0XHRcdGVhc3QgOiAwXG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY3Vyc29yLnVwLmlzRG93bikge1xuXHRcdFx0eVNwZWVkIC09IHRoaXMuc3BlZWQ7XG5cdFx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ25vcnRoJyk7XG5cdFx0XHRjb25zdCBub3J0aEVhc3QgPSB0aGlzLnBpY2tDb2xvck9mKHBsYXllclggKyBwbGF5ZXJXaWR0aC8yICsgeFNwZWVkLCBwbGF5ZXJZIC0gcGxheWVySGVpZ2h0LzIgKyB5U3BlZWQsIHRoaXMud2FsbHNCaXRNYXApO1xuXHRcdFx0Y29uc3Qgbm9ydGhXZXN0ID0gdGhpcy5waWNrQ29sb3JPZihwbGF5ZXJYIC0gcGxheWVyV2lkdGgvMiArIHhTcGVlZCwgcGxheWVyWSAtIHBsYXllckhlaWdodC8yICsgeVNwZWVkLCB0aGlzLndhbGxzQml0TWFwKTtcblx0XHRcdGNvbG9yLm5vcnRoID0gbm9ydGhFYXN0ICsgbm9ydGhXZXN0O1xuXHRcdH1cblx0XHRcblx0XHRpZiAodGhpcy5jdXJzb3IuZG93bi5pc0Rvd24pIHtcblx0XHRcdHlTcGVlZCArPSB0aGlzLnNwZWVkO1xuXHRcdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdzb3V0aCcpO1xuXHRcdFx0Y29uc3Qgc291dGhFYXN0ID0gdGhpcy5waWNrQ29sb3JPZihwbGF5ZXJYICsgcGxheWVyV2lkdGgvMiArIHhTcGVlZCwgcGxheWVyWSArIHBsYXllckhlaWdodC8yICsgeVNwZWVkLCB0aGlzLndhbGxzQml0TWFwKTtcblx0XHRcdGNvbnN0IHNvdXRoV2VzdCA9IHRoaXMucGlja0NvbG9yT2YocGxheWVyWCAtIHBsYXllcldpZHRoLzIgKyB4U3BlZWQsIHBsYXllclkgKyBwbGF5ZXJIZWlnaHQvMiArIHlTcGVlZCwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdFx0XHRjb2xvci5zb3V0aCA9IHNvdXRoRWFzdCArIHNvdXRoV2VzdDtcblx0XHR9XG5cdFx0XG5cdFx0aWYgKHRoaXMuY3Vyc29yLmxlZnQuaXNEb3duKSB7XG5cdFx0XHR4U3BlZWQgLT0gdGhpcy5zcGVlZDtcblx0XHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnd2VzdCcpO1xuXHRcdFx0Y29uc3Qgd2VzdE5vcnRoID0gdGhpcy5waWNrQ29sb3JPZihwbGF5ZXJYIC0gcGxheWVyV2lkdGgvMiArIHhTcGVlZCwgcGxheWVyWSAtIHBsYXllckhlaWdodC8yICsgeVNwZWVkLCB0aGlzLndhbGxzQml0TWFwKTtcblx0XHRcdGNvbnN0IHdlc3RTb3V0aCA9IHRoaXMucGlja0NvbG9yT2YocGxheWVyWCAtIHBsYXllcldpZHRoLzIgKyB4U3BlZWQsIHBsYXllclkgKyBwbGF5ZXJIZWlnaHQvMiArIHlTcGVlZCwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdFx0XHRjb2xvci53ZXN0ID0gd2VzdE5vcnRoICsgd2VzdFNvdXRoO1xuXHRcdH1cblx0XHRcblx0XHRpZiAodGhpcy5jdXJzb3IucmlnaHQuaXNEb3duKSB7XG5cdFx0XHR4U3BlZWQgKz0gdGhpcy5zcGVlZDtcblx0XHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnZWFzdCcpO1xuXHRcdFx0Y29uc3QgZWFzdE5vcnRoID0gdGhpcy5waWNrQ29sb3JPZihwbGF5ZXJYICsgcGxheWVyV2lkdGgvMiArIHhTcGVlZCwgcGxheWVyWSAtIHBsYXllckhlaWdodC8yICsgeVNwZWVkLCB0aGlzLndhbGxzQml0TWFwKTtcblx0XHRcdGNvbnN0IGVhc3RTb3V0aCA9IHRoaXMucGlja0NvbG9yT2YocGxheWVyWCArIHBsYXllcldpZHRoLzIgKyB4U3BlZWQsIHBsYXllclkgKyBwbGF5ZXJIZWlnaHQvMiArIHlTcGVlZCwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdFx0XHRjb2xvci5lYXN0ID0gZWFzdE5vcnRoICsgZWFzdFNvdXRoO1xuXHRcdH1cblxuXHRcdGlzTW92aW5nID0gTWF0aC5hYnMoeFNwZWVkKSArIE1hdGguYWJzKHlTcGVlZCkgPCB0aGlzLnNwZWVkKjIgJiYgTWF0aC5hYnMoeFNwZWVkKSArIE1hdGguYWJzKHlTcGVlZCkgPiAwO1xuXHRcdGNhbk1vdmUgPSBjb2xvci5ub3J0aCArIGNvbG9yLnNvdXRoICsgY29sb3IuZWFzdCArIGNvbG9yLndlc3QgPT0gMDtcblx0XHRpZiAoaXNNb3ZpbmcgJiYgY2FuTW92ZSkge1xuXHRcdFx0dGhpcy5wbGF5ZXIueCArPSB4U3BlZWQ7XG5cdFx0XHR0aGlzLnBsYXllci55ICs9IHlTcGVlZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5nYW1lLmNhbWVyYS5zaGFrZSgpO1xuXHRcdFx0dGhpcy53YWxsQ29sbGlzaW9uU291bmQucGxheSgpO1xuXHRcdFx0dGhpcy5zdG9wUGxheWVyQW5pbWNhdGVpb24oKTtcblx0XHR9XG5cblx0XHRcblx0XHRpZiAoTWF0aC5hYnModGhpcy5jdXJyZW50RXhpdFBvaW50LngtdGhpcy5wbGF5ZXIueCkgPCAzICYmIE1hdGguYWJzKHRoaXMucGxheWVyLnktdGhpcy5jdXJyZW50RXhpdFBvaW50LnkpIDwgMykge1xuXHRcdFx0YWxlcnQoJ0NvbmdyYXQhJyk7XG5cblx0XHRcdGNvbnN0IHVzZXJJZCA9IHRoaXMuc2VydmljZUNvbnRyb2xsZXIuYXV0aFNlcnZpY2UuZ2V0TGFzdExvZ2dlZEluVXNlcigpLnVzZXJJZDtcblx0XHRcdGNvbnN0IHN0YWdlSWQgPSB0aGlzLnN0YWdlSW5mby5zdGFnZUlkO1xuXHRcdFx0Y29uc3Qgc3RhZ2VSZWNvcmQgPSBuZXcgU3RhZ2VSZWNvcmQoc3RhZ2VJZCwgUmFuay5TLCA4MCk7XG5cdFx0XHRjb25zdCBzdGFnZVJlY29yZE9iaiA9IHt9O1xuXHRcdFx0c3RhZ2VSZWNvcmRPYmpbc3RhZ2VJZF0gPSBzdGFnZVJlY29yZDtcblx0XHRcdGNvbnN0IHJlY29yZCA9IG5ldyBSZWNvcmQodXNlcklkLCBzdGFnZVJlY29yZE9iaik7XG5cdFx0XHRkZWJ1Z2dlcjtcblx0XHRcdHRoaXMuc2VydmljZUNvbnRyb2xsZXIucmVjb3JkUmFuayhyZWNvcmQpO1xuXHRcdFx0XG5cdFx0XHRjb25zdCBzdGFnZUluZm8gPSB0aGlzLnNlcnZpY2VDb250cm9sbGVyLmdldFN0YWdlSW5mb3JtYXRpb24oKTtcblx0XHRcdHRoaXMuc3RhdGVDb250cm9sbGVyLmdvU3RhdGUoJ0xldmVsJywgdHJ1ZSwgdHJ1ZSwgc3RhZ2VJbmZvKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHBpY2tDb2xvck9mKHg6IG51bWJlciwgeTogbnVtYmVyLCBiaXRNYXBEYXRhOiBQaGFzZXIuQml0bWFwRGF0YSkge1xuXHRcdGNvbnN0IGNvbG9yID0gYml0TWFwRGF0YS5nZXRQaXhlbDMyKHgsIHkpO1xuXHRcdHJldHVybiBjb2xvcjtcblx0fVxuXG5cdHByaXZhdGUgc3RvcFBsYXllckFuaW1jYXRlaW9uKCkge1xuXHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMuc3RvcCgnbm9ydGgnKTtcblx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLnN0b3AoJ3NvdXRoJyk7XG5cdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5zdG9wKCd3ZXN0Jyk7XG5cdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5zdG9wKCdlYXN0Jyk7XG5cdH1cblxuXG5cdHByaXZhdGUgZ29GdWxsU2NyZWVuKCkge1xuXG5cdH1cbn0iLCJpbXBvcnQgVXRpbCBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50L2lucHV0VGV4dCc7XG5pbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vdm8vdXNlcic7XG5pbXBvcnQgU2NvcmUgZnJvbSAnLi4vdm8vc2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXIgZXh0ZW5kcyBCYXNlIHtcblx0aW5wdXRUZXh0IDogQ29tcG9uZW50LklucHV0VGV4dDtcblx0cmVnaXN0ZXJCdG4gOiBQaGFzZXIuVGV4dDtcblxuXHRjb25zdHJ1Y3RvcihnYW1lKSB7XG5cdFx0c3VwZXIoZ2FtZSk7XG5cdH1cblxuXHRwcmVsb2FkKCkge1xuXHRcdFxuXHR9XG5cblx0cHJpdmF0ZSBzZXRSZWdpc3RlcklucHV0VGV4dCgpIHtcblx0XHRsZXQgdGV4dFdpZHRoID0gMjAwO1xuXHRcdGxldCB0ZXh0SGVpZ2h0ID0gODA7XG5cdFx0bGV0IHRleHRYID0gdGhpcy5nYW1lLndvcmxkLmNlbnRlclggLSB0ZXh0V2lkdGgvMjtcblx0XHRsZXQgdGV4dFkgPSB0aGlzLmdhbWUud29ybGQuY2VudGVyWSAtIHRleHRIZWlnaHQvMjtcblxuXHRcdGxldCB0ZXh0TWF4TGVuZ3RoID0gMjA7XG5cblx0XHRsZXQgdGV4dFN0eWxlID0ge1xuXHRcdFx0ZmlsbDogJyMwMDAwMDAnLFxuXHRcdFx0Ym91bmRzQWxpZ25IOiAnY2VudGVyJyxcblx0XHRcdGJvdW5kc0FsaWduVjogJ21pZGRsZScsXG5cdFx0XHRmb250OiAnMjBweCBBcmlhbCdcblx0XHR9XG5cblx0XHR0aGlzLmlucHV0VGV4dCA9IG5ldyBDb21wb25lbnQuSW5wdXRUZXh0KHRoaXMuZ2FtZSwgdGV4dFgsIHRleHRZLCB0ZXh0V2lkdGgsIHRleHRIZWlnaHQsIHRleHRNYXhMZW5ndGgsICdleCkgVXNlcjAwNzAwJywgdGV4dFN0eWxlKTtcblx0fVxuXG5cdHByaXZhdGUgc2V0UmVnaXN0ZXJCdXR0b24oKSB7XG5cdFx0bGV0IGJ0bldpZHRoID0gMjAwO1xuXHRcdGxldCBidG5IZWlnaHQgPSA4MDtcblx0XHRcblx0XHRsZXQgYnRuWCA9IHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYOy8vIC0gYnRuV2lkdGgvMjtcblx0XHRsZXQgYnRuWSA9IHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZICsgMTIwOy8vIC0gYnRuSGVpZ2h0LzIgKyAxMDA7XG5cblx0XHRsZXQgYnRuVGV4dCA9ICdSZWdpc3Rlcic7XG5cblx0XHRjb25zdCBzZWxmID0gdGhpcztcblxuXHRcdGxldCB0ZXh0U3R5bGUgPSB7XG5cdFx0XHRmaWxsOiAnIzAwMDAwMCcsXG5cdFx0XHRib3VuZHNBbGlnbkg6ICdjZW50ZXInLFxuXHRcdFx0Ym91bmRzQWxpZ25WOiAnbWlkZGxlJyxcblx0XHRcdGZvbnQ6ICcyMHB4IEFyaWFsJ1xuXHRcdH1cblx0XHR0aGlzLnJlZ2lzdGVyQnRuID0gdGhpcy5nYW1lLmFkZC50ZXh0KGJ0blgsIGJ0blksIGJ0blRleHQsIHRleHRTdHlsZSk7XG5cdFx0dGhpcy5yZWdpc3RlckJ0bi5hbmNob3Iuc2V0VG8oLjUsIC41KTtcblx0XHRcblx0XHR0aGlzLnJlZ2lzdGVyQnRuLmlucHV0RW5hYmxlZCA9IHRydWU7XG5cdFx0dGhpcy5yZWdpc3RlckJ0bi5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcblxuXHRcdHRoaXMucmVnaXN0ZXJCdG4uZXZlbnRzLm9uSW5wdXREb3duLmFkZCgoZSkgPT4ge1xuXHRcdFx0aWYgKGNvbmZpcm0oYCR7c2VsZi5pbnB1dFRleHQudGV4dH3ri5jsnLzroZwg7ZWY7Iuc6rKg7Iq164uI6rmMP2ApKSB7XG5cdFx0XHRcdHNlbGYuc2F2ZVVzZXJJZCgpO1xuXHRcdFx0XHRjb25zdCBzdGFnZUluZm8gPSBzZWxmLnNlcnZpY2VDb250cm9sbGVyLmdldFN0YWdlSW5mb3JtYXRpb24oKTtcblx0XHRcdFx0c2VsZi5zdGF0ZUNvbnRyb2xsZXIuZ29TdGF0ZSgnTGV2ZWwnLCB0cnVlLCB0cnVlLCBzdGFnZUluZm8pO1xuXHRcdFx0fVxuXHRcdH0sIHRoaXMpO1xuXG5cdFx0dGhpcy5yZWdpc3RlckJ0bi5ldmVudHMub25JbnB1dE92ZXIuYWRkKChlKSA9PiB7XG5cdFx0XHR0aGlzLnJlZ2lzdGVyQnRuLmFscGhhID0gMC43O1xuXHRcdH0sIHRoaXMpO1xuXG5cdFx0dGhpcy5yZWdpc3RlckJ0bi5ldmVudHMub25JbnB1dE91dC5hZGQoKGUpID0+IHtcblx0XHRcdHRoaXMucmVnaXN0ZXJCdG4uYWxwaGEgPSAxO1xuXHRcdH0sIHRoaXMpO1xuXHR9XG5cblx0Y3JlYXRlKCkge1xuXG5cdFx0dGhpcy5zZXRSZWdpc3RlcklucHV0VGV4dCgpO1xuXHRcdHRoaXMuc2V0UmVnaXN0ZXJCdXR0b24oKTtcblx0XHRcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblx0XHR0aGlzLmlucHV0VGV4dC5yZW5kZXIoKTtcblx0fVxuXG5cdHNhdmVVc2VySWQoKSB7XG5cdFx0bGV0IHVzZXJJZCA9IHRoaXMuaW5wdXRUZXh0LnRleHQ7XG5cdFx0Y29uc3QgdXNlciA9IG5ldyBVc2VyKHVzZXJJZCwgbmV3IFNjb3JlKCkpO1xuXHRcdHRoaXMuc2VydmljZUNvbnRyb2xsZXIucmVnaXN0ZXJVc2VyKHVzZXIpO1xuXHR9XG59IiwiZXhwb3J0IGNsYXNzIFBvaW50IHtcblx0eDogbnVtYmVyO1xuXHR5OiBudW1iZXI7XG5cdGFjdGl2ZTogYm9vbGVhbjtcblxuXHRjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6bnVtYmVyKSB7XG5cdFx0dGhpcy54ID0geDtcblx0XHR0aGlzLnkgPSB5O1xuXHRcdHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cdH1cblxuXHRwdWJsaWMgc3RhdGljIG9uKHg6IG51bWJlciwgeTpudW1iZXIpIHtcblx0XHRyZXR1cm4gbmV3IFBvaW50KHgseSk7XG5cdH1cbn0iLCJleHBvcnQgZW51bSBSYW5rIHtcblx0Tk9ORSA9IDAsXG5cdFMgPSAxLFxuXHRBID0gMixcblx0QiA9IDMsXG5cdEMgPSA0LFxuXHREID0gNSxcblx0RSA9IDYsXG5cdEYgPSA3XG59XG5cblxuZXhwb3J0IGNsYXNzIFJhbmtVdGlsIHtcblx0c3RhdGljIHZhbHVlT2YocmFuazogUmFuayk6IHN0cmluZyB7XG5cdFx0bGV0IHJldCA9ICcnO1xuXG5cdFx0c3dpdGNoKHJhbmspIHtcblx0XHRcdGNhc2UgUmFuay5OT05FOiB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBSYW5rLlM6IHtcblx0XHRcdFx0cmV0ID0gJ1MnO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgUmFuay5BOiB7XG5cdFx0XHRcdHJldCA9ICdBJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFJhbmsuQjoge1xuXHRcdFx0XHRyZXQgPSAnQic7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBSYW5rLkM6IHtcblx0XHRcdFx0cmV0ID0gJ0MnO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgUmFuay5EOiB7XG5cdFx0XHRcdHJldCA9ICdEJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFJhbmsuRToge1xuXHRcdFx0XHRyZXQgPSAnRSc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBSYW5rLkY6IHtcblx0XHRcdFx0cmV0ID0gJ0YnO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0cmV0ID0gJyc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJldDtcblx0fVxufSIsImltcG9ydCB7IFJhbmsgfSBmcm9tIFwiLi9yYW5rXCI7XG5pbXBvcnQgVm8gZnJvbSBcIi4vdm9cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb3JkIGV4dGVuZHMgVm8ge1xuXHR1c2VySWQ6IHN0cmluZztcblx0cmVjb3JkczogYW55O1xuXG5cdGNvbnN0cnVjdG9yKHVzZXJJZCwgcmVjb3Jkcykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy51c2VySWQgPSB1c2VySWQ7XG5cdFx0dGhpcy5yZWNvcmRzID0gcmVjb3Jkcztcblx0fVxuXG5cdHB1dChyZWNvcmQ6IFN0YWdlUmVjb3JkKSB7XG5cdFx0dGhpcy5yZWNvcmRzW3JlY29yZC5zdGFnZUlkXSA9IHJlY29yZDtcblx0fVxuXG5cdHRvSnNvbigpIHtcblx0XHRsZXQgcmVjb3JkcyA9IHt9O1xuXG5cdFx0Zm9yIChsZXQgcCBpbiB0aGlzLnJlY29yZHMpIHtcblx0XHRcdHJlY29yZHNbcF0gPSB0aGlzLnJlY29yZHNbcF0udG9Kc29uKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHVzZXJJZDogdGhpcy51c2VySWQsXG5cdFx0XHRyZWNvcmRzOiByZWNvcmRzXG5cdFx0fVxuXHR9XG5cblx0cHVibGljIHN0YXRpYyBieShqc29uU3RyaW5nIDogc3RyaW5nKTogUmVjb3JkIHtcblx0XHRsZXQganNvbjtcblx0XHRsZXQgcmVjb3JkID0gbnVsbDtcblx0XHR0cnkge1xuXHRcdFx0anNvbiA9IEpTT04ucGFyc2UoanNvblN0cmluZyk7XG5cdFx0XHRyZWNvcmQgPSBuZXcgUmVjb3JkKGpzb24udXNlcklkLCBqc29uLnJlY29yZHMpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC8vIGpzb25TdHJpbmcgaXMgbm90IHZhbGlkLlxuXHRcdFx0Ly8gSnVzdCBpZ25vcmUgdGhpcyBjYXNlLlxuXHRcdH1cblxuXHRcdHJldHVybiByZWNvcmQ7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIFN0YWdlUmVjb3JkIGV4dGVuZHMgVm8ge1xuXHRzdGFnZUlkOiBudW1iZXI7XG5cdHJhbms6IFJhbms7XG5cdHRpbWU6IG51bWJlcjtcblxuXHRjb25zdHJ1Y3RvcihzdGFnZUlkLCByYW5rOiBSYW5rLCB0aW1lKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnN0YWdlSWQgPSBzdGFnZUlkO1xuXHRcdHRoaXMucmFuayA9IHJhbms7XG5cdFx0dGhpcy50aW1lID0gdGltZTtcblx0fVxuXG5cdHRvSnNvbigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c3RhZ2VJZDogdGhpcy5zdGFnZUlkLFxuXHRcdFx0cmFuazogdGhpcy5yYW5rLFxuXHRcdFx0dGltZTogdGhpcy50aW1lXG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IHsgUmFuayB9IGZyb20gXCIuL3JhbmtcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmUge1xuXHR0aW1lIDogbnVtYmVyO1xuXHRyYW5rIDogUmFuaztcblx0XG5cdGNvbnN0cnVjdG9yKHRpbWU/OiBudW1iZXIsIHJhbms/OiBSYW5rKSB7XG5cdFx0dGhpcy50aW1lID0gdGltZSB8IDA7XG5cdFx0dGhpcy5yYW5rID0gcmFuayB8IFJhbmsuTk9ORTtcblx0fVxuXG5cdHB1YmxpYyB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0dGltZTogdGhpcy50aW1lLFxuXHRcdFx0cmFuazogdGhpcy5yYW5rXG5cdFx0fSk7XG5cdH1cbn0iLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL3BvaW50XCI7XG5pbXBvcnQgeyBNYXBUeXBlIH0gZnJvbSBcIi4vbWFwVHlwZVwiO1xuaW1wb3J0IHsgUmFuayB9IGZyb20gXCIuL3JhbmtcIjtcblxuZXhwb3J0IGNsYXNzIFN0YWdlIHtcblx0c3RhZ2VJZCA6IG51bWJlcjtcblx0Zmxvb3JGaWxlUGF0aCA6IHN0cmluZztcblx0d2FsbEZpbGVQYXRoIDogc3RyaW5nO1xuXG5cdGV4aXRQb2ludHMgOiBBcnJheTxQb2ludD47XG5cdHRpbWVMaW1pdCA6IG51bWJlcjtcblxuXHR0cmVhc3VyZVBvaW50cyA6IEFycmF5PFBvaW50PjtcblxuXHRtYXBUeXBlOiBNYXBUeXBlO1xuXG5cdC8vVE9ETzogPz8/XG5cdHNvdW5kIDogUGhhc2VyLlNvdW5kO1xuXG5cdGNvbnN0cnVjdG9yKHN0YWdlSWQ6IG51bWJlciwgZmxvb3JGaWxlUGF0aDogc3RyaW5nLCB3YWxsRmlsZVBhdGg6IHN0cmluZywgZXhpdFBvaW50czogQXJyYXk8UG9pbnQ+LCB0aW1lTGltaXQ9NTAwMCkge1xuXHRcdHRoaXMuc3RhZ2VJZCA9IHN0YWdlSWQ7XG5cdFx0dGhpcy5mbG9vckZpbGVQYXRoID0gZmxvb3JGaWxlUGF0aDtcblx0XHR0aGlzLndhbGxGaWxlUGF0aCA9IHdhbGxGaWxlUGF0aDtcblx0XHR0aGlzLmV4aXRQb2ludHMgPSBleGl0UG9pbnRzO1xuXG5cdFx0dGhpcy50aW1lTGltaXQgPSB0aW1lTGltaXQ7XG5cdH1cbn0iLCJpbXBvcnQgU2NvcmUgZnJvbSBcIi4vc2NvcmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciB7XG5cdHVzZXJJZCA6IHN0cmluZztcblx0c2NvcmUgOiBTY29yZTtcblx0cmVnaXN0ZXJEYXRlIDogRGF0ZTtcblx0bGFzdFZpc2l0RGF0ZSA6IERhdGU7XG5cblx0Y29uc3RydWN0b3IodXNlcklkLCBzY29yZSkge1xuXHRcdHRoaXMudXNlcklkID0gdXNlcklkO1xuXHRcdHRoaXMuc2NvcmUgPSBzY29yZTtcblx0XHR0aGlzLnJlZ2lzdGVyRGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0dGhpcy5sYXN0VmlzaXREYXRlID0gbmV3IERhdGUoKTtcblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgYnkoanNvblN0cmluZyA6IHN0cmluZyk6IFVzZXIge1xuXHRcdGxldCBqc29uO1xuXHRcdGxldCB1c2VyID0gbnVsbDtcblx0XHR0cnkge1xuXHRcdFx0anNvbiA9IEpTT04ucGFyc2UoanNvblN0cmluZyk7XG5cdFx0XHR1c2VyID0gbmV3IFVzZXIoanNvbi51c2VySWQsIGpzb24uc2NvcmUpO1xuXHRcdFx0dXNlci5yZWdpc3RlckRhdGUgPSBqc29uLnJlZ2lzdGVyRGF0ZTtcblx0XHRcdHVzZXIubGFzdFZpc2l0RGF0ZSA9IGpzb24ubGFzdFZpc2l0RGF0ZTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHQvLyBqc29uU3RyaW5nIGlzIG5vdCB2YWxpZC5cblx0XHRcdC8vIEp1c3QgaWdub3JlIHRoaXMgY2FzZS5cblx0XHR9XG5cblx0XHRyZXR1cm4gdXNlcjtcblx0fVxuXG5cdHB1YmxpYyB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy50b0pzb24oKSk7XG5cdH1cblxuXHRwdWJsaWMgdG9Kc29uKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR1c2VySWQ6IHRoaXMudXNlcklkLFxuXHRcdFx0c2NvcmU6IHRoaXMuc2NvcmUudG9TdHJpbmcsXG5cdFx0XHRyZWdpc3RlckRhdGU6IHRoaXMucmVnaXN0ZXJEYXRlLnRvU3RyaW5nKCksXG5cdFx0XHRsYXN0VmlzaXREYXRlOiB0aGlzLmxhc3RWaXNpdERhdGUudG9TdHJpbmcoKSxcblx0XHR9O1xuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgVm8ge1xuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy50b0pzb24oKSk7XG5cdH1cblxuXHRhYnN0cmFjdCB0b0pzb24oKSA6IGFueTtcbn0iXSwic291cmNlUm9vdCI6IiJ9