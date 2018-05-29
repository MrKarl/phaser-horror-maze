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
            this.clickCount = 0;
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
            graphics.drawRect(x, y, width, height);
            group.add(graphics);
            this.phaserText = this.game.add.text(x, y, text, style);
            this.phaserText.setTextBounds(0, 0, width, height);
            this.phaserText.alpha = 0.6;
            this.phaserText.inputEnabled = true;
            this.phaserText.events.onInputDown.add((sprite, pointer) => {
                this.isFocus = true;
                this.phaserText.alpha = 1;
            }, this);
            const self = this;
            this.game.input.onDown.add((sprite, pointer) => {
                self.clickCount++;
                if (self.clickCount == 1) {
                    self.phaserText.setText('');
                }
                let textX = self.phaserText.world.x;
                let textWidth = self.width;
                let textY = self.phaserText.world.y;
                let textHeight = self.height;
                if (pointer.clientX > textX && pointer.clientX <= textX + textWidth) {
                    if (pointer.clientY > textY && pointer.clientY <= textY + textHeight) {
                        self.isFocus = true;
                        self.phaserText.alpha = 1;
                        return;
                    }
                }
                self.phaserText.alpha = 0.6;
                self.isFocus = false;
            }, this);
            this.game.input.keyboard.addCallbacks(this, (e) => {
                if (!self.isFocus) {
                    return;
                }
                if (e.keyCode == Phaser.Keyboard.BACKSPACE) {
                    self.phaserText.text = self.phaserText.text.slice(0, -1);
                    return;
                }
                if (self.phaserText.text.length + 1 > self.maxLength) {
                    return;
                }
                self.phaserText.text += e.key;
                self.text = self.phaserText.text;
            });
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
/* harmony import */ var _services_rankService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/rankService */ "./src/services/rankService.ts");




class ServiceController {
    constructor(game) {
        this.game = game;
        this.stageService = new _services_stageService__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.authService = new _services_authService__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.recordService = new _services_recordService__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.rankService = new _services_rankService__WEBPACK_IMPORTED_MODULE_3__["default"]();
        this.stateController = game.stateController;
    }
    login(userId, callback) {
        this.authService.login(userId, callback);
    }
    registerUser(user, callback) {
        this.authService.registerUser(user, callback);
    }
    getRecord() {
        const userId = this.authService.getLastLoggedInUser().userId;
        const record = this.recordService.getRecord(userId);
        return record;
    }
    getStageInformation() {
        return this.stageService.getStageInformation();
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
    initialize(game, width, height, gameVersion) {
        this.stateManager = new Phaser.StateManager(game);
        this.game = game;
        this.game.state = this.stateManager;
        this.gameVersion = gameVersion;
        this.width = width;
        this.height = height;
        this.init();
    }
    startState(state) {
        let startingState = 'Intro';
        if (state === 'undefined' || state === null) {
            startingState = state;
        }
        this.goState(startingState, true, true, 'Horror Maze', this.gameVersion);
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
        this.session.set(table, obj.userId, obj.toString());
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
        this.session.set(table, obj.userId, obj.toString());
        return obj;
    }
    select(table, userId) {
        const userJson = this.session.get(table, userId);
        const user = _vo_user__WEBPACK_IMPORTED_MODULE_1__["default"].by(userJson);
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
            this.stateController.initialize(this, width, height, Maze.GAME_VERSION);
            this.stateController.startState();
        }
    }
    Maze.GAME_VERSION = "v1.0";
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
            let userStr = userObj[userId];
            if (typeof userStr === 'string') {
                user = JSON.parse(userStr);
            }
            else {
                user = userStr;
            }
        }
        catch (e) {
            user = null;
        }
        return user;
    }
    registerUser(user, callback) {
        const userId = user.userId;
        const userInSession = this.userDao.select(this.USER_TABLE, userId);
        let isAlreadyExist = true;
        if (!userInSession) {
            this.userDao.insert(this.USER_TABLE, user);
            isAlreadyExist = false;
        }
        callback(user, isAlreadyExist);
    }
    login(userId, callback) {
        const user = this.userDao.select(this.USER_TABLE, userId);
        if (user) {
            this.userDao.delete(this.TABLE_LAST_LOGGED_IN, userId);
            this.userDao.insert(this.TABLE_LAST_LOGGED_IN, user);
            callback(user, true);
        }
        else {
            callback(null, false);
        }
    }
    logout(userId) {
        this.userDao.delete(this.TABLE_LAST_LOGGED_IN, userId);
    }
}


/***/ }),

/***/ "./src/services/rankService.ts":
/*!*************************************!*\
  !*** ./src/services/rankService.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RankService; });
/* harmony import */ var _vo_rank__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vo/rank */ "./src/vo/rank.ts");

class RankService {
    initialize() {
    }
    calculateRank(stageId, elapsedTime) {
        const rankMetrix = {
            0: {
                10: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].S,
                15: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].A,
                20: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].B,
                25: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].C,
                30: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].D,
                35: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].E,
            },
            1: {
                10: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].S,
                15: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].A,
                20: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].B,
                25: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].C,
                30: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].D,
                35: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].E,
            },
            2: {
                10: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].S,
                15: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].A,
                20: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].B,
                25: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].C,
                30: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].D,
                35: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].E,
            },
            3: {
                10: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].S,
                15: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].A,
                20: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].B,
                25: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].C,
                30: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].D,
                35: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].E,
            },
            4: {
                10: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].S,
                15: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].A,
                20: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].B,
                25: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].C,
                30: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].D,
                35: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].E,
            },
            5: {
                10: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].S,
                15: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].A,
                20: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].B,
                25: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].C,
                30: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].D,
                35: _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].E,
            }
        };
        const stageRankMetrix = rankMetrix[stageId];
        for (let key in stageRankMetrix) {
            const timeLimit = parseInt(key);
            if (timeLimit > elapsedTime) {
                return stageRankMetrix[key];
            }
        }
        return _vo_rank__WEBPACK_IMPORTED_MODULE_0__["Rank"].F;
    }
    loadRankInformation() {
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
    initialize() { }
    getStageInformation() {
        return this.stageMap;
    }
    // Load Stage Map Information
    generateStageMap() {
        for (let i = 0; i < StageService.NUM_OF_STAGE; i++) {
            let zeroFormat = '000' + i;
            let mapSeq = zeroFormat.slice(-3);
            const floorPath = 'assets/img/maps/floor-' + mapSeq + '.png';
            const wallPath = 'assets/img/maps/walls-' + mapSeq + '.png';
            const stage = new _vo_stage__WEBPACK_IMPORTED_MODULE_0__["Stage"](i, floorPath, wallPath, [
                _vo_point__WEBPACK_IMPORTED_MODULE_1__["Point"].on(235, 85),
                _vo_point__WEBPACK_IMPORTED_MODULE_1__["Point"].on(565, 400)
            ]);
            this.stageMap[i] = stage;
        }
    }
}
StageService.NUM_OF_STAGE = 5;


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
            const tableData = localStorage.getItem(table) || null;
            if (tableData) {
                const tableJsonObj = JSON.parse(tableData);
                let data = tableJsonObj;
                data[key] = value;
                localStorage.setItem(table, JSON.stringify(data));
            }
            else {
                let data = {};
                data[key] = value;
                localStorage.setItem(table, JSON.stringify(data));
            }
        }
        else {
            const tableData = localStorage.getItem(table);
            const tableJsonObj = JSON.parse(tableData);
            let jsonValue = JSON.parse(value);
            let data = {};
            data[key] = jsonValue;
            let data2 = tableJsonObj;
            data2[key] = originalDataObj;
            const obj = this.extend(data2, data);
            localStorage.setItem(table, JSON.stringify(obj));
        }
    }
    remove(table, key) {
        const originalDataObj = this.get(table, key);
        if (!originalDataObj) {
            return;
        }
        else {
            const tableData = localStorage.getItem(table);
            const tableJsonObj = JSON.parse(tableData);
            delete tableJsonObj[key];
            localStorage.setItem(table, JSON.stringify(tableJsonObj));
        }
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
    init(gameTitle, gameVersion) {
        this.gameTitle = gameTitle;
        this.gameVersion = gameVersion;
    }
    preload() {
    }
    create() {
        this.stage.backgroundColor = '#3b3b3b';
        this.logoText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, this.gameTitle, {
            font: '80px Arial;',
            fill: '#ffffff'
        });
        this.logoText.anchor.setTo(0.5, 0.5);
        this.logoText.alpha = 0.8;
        const p = this.game.world.bounds.bottomRight;
        const footer = this.game.add.text(p.x - 50, p.y - 30, this.gameVersion, {
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
Intro.introInterval = 2000;


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
        this.numberOfStagePerPage = 3;
        this.currentPage = 1;
    }
    init(stageMap) {
        this.stageMap = stageMap;
        this.numberOfStage = Object.keys(stageMap).length;
        this.numberOfPage = Math.ceil(this.numberOfStage / this.numberOfStagePerPage);
    }
    preload() {
        this.game.load.spritesheet('stageArrows', '../assets/img/stageArrows.png', 48, 48);
        this.game.load.image('logoutBtn', '../assets/img/logoutBtn.png');
        this.record = this.serviceController.getRecord();
        this.stageBtnGroup = this.game.add.group();
    }
    create() {
        this.game.stage.backgroundColor = '#3b3b3b';
        this.game.stage.alpha = 0.9;
        this.drawStageBtn(this.currentPage);
        this.drawStageMoveBtn();
        this.drawLogoutBtn();
    }
    update() {
    }
    drawLogoutBtn() {
        this.logoutBtn = this.game.add.button(this.game.world.centerX, 500, 'logoutBtn', () => {
            if (confirm('Logout 하시겠습니까?')) {
                // Remove lastLoggedInUser
                this.serviceController.authService.logout(this.serviceController.authService.getLastLoggedInUser().userId);
                this.stateController.goState('Login');
            }
        }, this);
        this.logoutBtn.anchor.setTo(0.5, 0.5);
    }
    clearStageBtnField() {
        this.stageBtnGroup.callAll('kill', '');
    }
    drawStageBtn(pageNum) {
        this.clearStageBtnField();
        const width = 200;
        const height = 200;
        let offsetX = (this.game.world.width - 150) / this.numberOfStagePerPage; // 150: padding
        let stageInfos = {};
        if (this.record) {
            stageInfos = this.record.records;
        }
        const offset = (pageNum - 1) * this.numberOfStagePerPage;
        for (let i = offset; i < offset + this.numberOfStagePerPage; i++) {
            if (!this.stageMap[i]) {
                return;
            }
            let stageInfo;
            let stageInfoStr = '';
            if (stageInfos[i]) {
                stageInfo = stageInfos[i];
                stageInfoStr += '\nTime: ' + stageInfo.time + ' seconds';
                stageInfoStr += '\nRank: ' + _vo_rank__WEBPACK_IMPORTED_MODULE_1__["RankUtil"].valueOf(stageInfo.rank);
            }
            const stageBtnText = `Stage-${i + 1}` + stageInfoStr;
            const offsetXOfBtn = offsetX * (i % this.numberOfStagePerPage);
            const stageBtn = this.game.add.text(145 + offsetXOfBtn, 90, stageBtnText, {
                fill: '#ffffff',
                font: '15px Arial'
            });
            stageBtn.inputEnabled = true;
            stageBtn.input.useHandCursor = true;
            const stageNum = i + 1;
            const self = this;
            stageBtn.events.onInputDown.add((e) => {
                if (confirm(`Stage-${stageNum} 이동할까요?`)) {
                    self.stateController.goState('Play', true, true, self.stageMap[i]);
                }
            }, this);
            this.stageBtnGroup.add(stageBtn);
        }
    }
    drawStageMoveBtn() {
        const p = this.game.world.bounds;
        this.lowerStageBtn = this.game.add.button(100, this.game.world.centerY, "stageArrows", this.buttonClicked, this);
        this.higherStageBtn = this.game.add.button(100, this.game.world.centerY, "stageArrows", this.buttonClicked, this);
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
        let currentPage = this.currentPage;
        if (button.frame == 0) { // lowerStageBtn
            if (currentPage === 1) {
                return;
            }
            this.drawStageBtn(--this.currentPage);
        }
        else if (button.frame == 1) { // higherStageBtn
            if (currentPage + 1 > this.numberOfPage) {
                return;
            }
            this.drawStageBtn(++this.currentPage);
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
                            alert(`${user.userId}님, 다시 방문해주셨군요. 환영합니다.`);
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
        this.timeText = this.game.add.text(this.game.world.centerX, 500, 'Timer: 0 second', {
            fill: '#ffffff',
            font: '15px Arial'
        });
        this.startTimer();
    }
    startTimer() {
        this.elapsedTime = 0;
        const self = this;
        this.timeHandler = setInterval(() => {
            self.elapsedTime++;
        }, 1000);
    }
    stopTimer() {
        clearInterval(this.timeHandler);
    }
    countTime() {
        // this.elapsedTime = this.game.time.totalElapsedSeconds();
        let timeText = 'Timer: ' + this.elapsedTime + ' seconds';
        this.timeText.setText(timeText, true);
    }
    update() {
        this.movePlayer();
        this.moveFlash();
        this.randomAlphaTo(this.floor);
        this.countTime();
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
            const rank = this.serviceController.rankService.calculateRank(stageId, this.elapsedTime);
            const stageRecord = new _vo_record__WEBPACK_IMPORTED_MODULE_1__["StageRecord"](stageId, rank, this.elapsedTime);
            const stageRecordObj = {};
            stageRecordObj[stageId] = stageRecord;
            const record = new _vo_record__WEBPACK_IMPORTED_MODULE_1__["default"](userId, stageRecordObj);
            this.serviceController.recordRank(record);
            const stageInfo = this.serviceController.getStageInformation();
            this.stateController.goState('Level', true, true, stageInfo);
            this.stopTimer();
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
        let textMaxLength = 14;
        let textStyle = {
            fill: '#000000',
            boundsAlignH: 'center',
            boundsAlignV: 'middle',
            font: '20px Arial'
        };
        this.inputText = new _component_inputText__WEBPACK_IMPORTED_MODULE_0__["Component"].InputText(this.game, textX, textY, textWidth, textHeight, textMaxLength, 'ex)user001', textStyle);
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
            const userId = self.inputText.text;
            if (confirm(`${userId}님으로 하시겠습니까?`)) {
                self.saveUserId(userId, (user, isAlreadyExist) => {
                    if (isAlreadyExist) {
                        alert(`${self.inputText.text}님 예전에 오신적이있으시군요. 다시 한번 환영합니다.`);
                    }
                    self.serviceController.login(user.userId, (user, isSuccess) => {
                        const stageInfo = self.serviceController.getStageInformation();
                        self.stateController.goState('Level', true, true, stageInfo);
                    });
                });
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
    saveUserId(userId, callback) {
        const user = new _vo_user__WEBPACK_IMPORTED_MODULE_2__["default"](userId, new _vo_score__WEBPACK_IMPORTED_MODULE_3__["default"]());
        this.serviceController.registerUser(user, callback);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC9pbnB1dFRleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXIvc2VydmljZUNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXIvc3RhdGVDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9kYW8vZGFvLnRzIiwid2VicGFjazovLy8uL3NyYy9kYW8vcmVjb3JkRGFvLnRzIiwid2VicGFjazovLy8uL3NyYy9kYW8vdXNlckRhby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hemUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2F1dGhTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9yYW5rU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvcmVjb3JkU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvc3RhZ2VTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXNzaW9uL2xvY2FsU3RvcmFnZVNlc3Npb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL2Jhc2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL2ludHJvLnRzIiwid2VicGFjazovLy8uL3NyYy9zdGF0ZS9sZXZlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUvbG9naW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL3BsYXkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL3JlZ2lzdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy92by9wb2ludC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdm8vcmFuay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdm8vcmVjb3JkLnRzIiwid2VicGFjazovLy8uL3NyYy92by9zY29yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdm8vc3RhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZvL3VzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZvL3ZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNuRU0sSUFBVyxTQUFTLENBb0d6QjtBQXBHRCxXQUFpQixTQUFTO0lBQ3pCLGVBQXVCLFNBQVEsTUFBTSxDQUFDLElBQUk7UUFxQnpDLFlBQVksSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUs7WUFDNUQsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFHLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQXJCakMsWUFBTyxHQUFHLEtBQUssQ0FBQztZQWtCaEIsZUFBVSxHQUFHLENBQUMsQ0FBQztZQUlkLElBQUksQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDO1lBQ2hDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQ3hCO1lBRUQsSUFBSSxDQUFDLENB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LENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFF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Q0FBQztZQUNULElBQUksRUFBRyxDQUFDO1lBQ1IsSUFBSSxFQUFHLENBQUM7U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFO1lBQzFCLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxXQUFXLEdBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxPQUFPLEdBQUcsWUFBWSxHQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFILE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLFdBQVcsR0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLE9BQU8sR0FBRyxZQUFZLEdBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUgsS0FBSyxDQUFDLEtBQUssR0FBRyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDNUIsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLFdBQVcsR0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLE9BQU8sR0FBRyxZQUFZLEdBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUgsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsV0FBVyxHQUFDLENBQUMs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QyxJQUFVO1FBQzFCLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQztTQUNaO1FBQ0QsTUFBTSxJQUFJLEdBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUV4QyxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFFRCxNQUFNO1FBQ0wsT0FBTztZQUNOLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtTQUNqQyxDQUFDO0lBQ0gsQ0FBQztDQUNEOzs7Ozs7Ozs7Ozs7Ozs7QUNwQ2E7SUFDYixRQUFRO1FBQ1AsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Q0FHRCIsImZpbGUiOiJtYXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0IG5hbWVzcGFjZSBDb21wb25lbnQge1xuXHRleHBvcnQgY2xhc3MgSW5wdXRUZXh0IGV4dGVuZHMgUGhhc2VyLlRleHQge1xuXHRcdGlzRm9jdXMgPSBmYWxzZTtcblxuXHRcdHggOiBudW1iZXI7XG5cdFx0eSA6IG51bWJlcjtcblx0XHR3aWR0aCA6IG51bWJlcjtcblx0XHRoZWlnaHQgOiBudW1iZXI7XG5cblx0XHRtYXhMZW5ndGggOiBudW1iZXI7XG5cblx0XHRwbGFjZWhvbGRlciA6IHN0cmluZztcblxuXHRcdFxuXHRcdGJvcmRlclJlY3RhbmdsZXIgOiBQaGFzZXIuUmVjdGFuZ2xlO1xuXG5cdFx0dGV4dCA6IHN0cmluZztcblxuXHRcdHBoYXNlclRleHQgOiBQaGFzZXIuVGV4dDtcblxuXHRcdGNsaWNrQ291bnQgPSAwO1xuXG5cdFx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgd2lkdGgsIGhlaWdodCwgbWF4TGVuZ3RoLCB0ZXh0LCBzdHlsZSkge1xuXHRcdFx0c3VwZXIoZ2FtZSwgeCwgeSwgIHRleHQsIHN0eWxlKTtcblx0XHRcdHRoaXMucGxhY2Vob2xkZXIgPSAnSW5wdXQgVGV4dCc7XG5cdFx0XHRpZiAodGV4dC5sZW5ndGggPT0gMCkge1xuXHRcdFx0XHR0ZXh0ID0gdGhpcy5wbGFjZWhvbGRlcjtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy54ID0geDtcblx0XHRcdHRoaXMueSA9IHk7XG5cdFx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdFx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHRcdHRoaXMudGV4dCA9IHRleHQ7XG5cdFx0XHR0aGlzLm1heExlbmd0aCA9IG1heExlbmd0aCA/IG1heExlbmd0aCA6IDIwO1xuXG5cdFx0XHRsZXQgZ3JvdXAgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG5cdFx0XHRsZXQgZ3JhcGhpY3MgPSB0aGlzLmdhbWUubWFrZS5ncmFwaGljcygpO1xuXHRcdFx0Z3JhcGhpY3MubGluZVN0eWxlKDIsIDB4MDAwMDAwLCAxKTtcblx0XHRcdGdyYXBoaWNzLmRyYXdSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuXHRcdFx0Z3JvdXAuYWRkKGdyYXBoaWNzKTtcblxuXHRcdFx0dGhpcy5waGFzZXJUZXh0ID0gdGhpcy5nYW1lLmFkZC50ZXh0KHgsIHksIHRleHQsIHN0eWxlKTtcblx0XHRcdHRoaXMucGhhc2VyVGV4dC5zZXRUZXh0Qm91bmRzKDAsIDAsIHdpZHRoLCBoZWlnaHQpXG5cdFx0XHR0aGlzLnBoYXNlclRleHQuYWxwaGEgPSAwLjY7XG5cblx0XHRcdHRoaXMucGhhc2VyVGV4dC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xuXG5cdFx0XHR0aGlzLnBoYXNlclRleHQuZXZlbnRzLm9uSW5wdXREb3duLmFkZCgoc3ByaXRlLCBwb2ludGVyKSA9PiB7XG5cdFx0XHRcdHRoaXMuaXNGb2N1cyA9IHRydWU7XG5cdFx0XHRcdHRoaXMucGhhc2VyVGV4dC5hbHBoYSA9IDE7XG5cdFx0XHR9LCB0aGlzKTtcblx0XHRcdFxuXG5cdFx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHRcdHRoaXMuZ2FtZS5pbnB1dC5vbkRvd24uYWRkKChzcHJpdGUsIHBvaW50ZXIpID0+IHtcblx0XHRcdFx0c2VsZi5jbGlja0NvdW50Kys7XG5cdFx0XHRcdGlmIChzZWxmLmNsaWNrQ291bnQgPT0gMSkge1xuXHRcdFx0XHRcdHNlbGYucGhhc2VyVGV4dC5zZXRUZXh0KCcnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCB0ZXh0WCA9IHNlbGYucGhhc2VyVGV4dC53b3JsZC54O1xuXHRcdFx0XHRsZXQgdGV4dFdpZHRoID0gc2VsZi53aWR0aDtcblxuXHRcdFx0XHRsZXQgdGV4dFkgPSBzZWxmLnBoYXNlclRleHQud29ybGQueTtcblx0XHRcdFx0bGV0IHRleHRIZWlnaHQgPSBzZWxmLmhlaWdodDtcblxuXHRcdFx0XHRpZiAocG9pbnRlci5jbGllbnRYID4gdGV4dFggJiYgcG9pbnRlci5jbGllbnRYIDw9IHRleHRYICsgdGV4dFdpZHRoKSB7XG5cdFx0XHRcdFx0aWYgKHBvaW50ZXIuY2xpZW50WSA+IHRleHRZICYmIHBvaW50ZXIuY2xpZW50WSA8PSB0ZXh0WSArIHRleHRIZWlnaHQpIHtcblx0XHRcdFx0XHRcdHNlbGYuaXNGb2N1cyA9IHRydWU7XG5cdFx0XHRcdFx0XHRzZWxmLnBoYXNlclRleHQuYWxwaGEgPSAxO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNlbGYucGhhc2VyVGV4dC5hbHBoYSA9IDAuNjtcblx0XHRcdFx0c2VsZi5pc0ZvY3VzID0gZmFsc2U7XG5cdFx0XHR9LCB0aGlzKTtcblxuXHRcdFx0dGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZENhbGxiYWNrcyh0aGlzLCAoZSkgPT4ge1xuXHRcdFx0XHRpZiAoIXNlbGYuaXNGb2N1cykge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0aWYgKGUua2V5Q29kZSA9PSBQaGFzZXIuS2V5Ym9hcmQuQkFDS1NQQUNFKSB7XG5cdFx0XHRcdFx0c2VsZi5waGFzZXJUZXh0LnRleHQgPSBzZWxmLnBoYXNlclRleHQudGV4dC5zbGljZSgwLCAtMSk7XG5cblx0XHRcdFx0XHRcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH0gXG5cblx0XHRcdFx0aWYgKHNlbGYucGhhc2VyVGV4dC50ZXh0Lmxlbmd0aCArIDEgPiBzZWxmLm1heExlbmd0aCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0c2VsZi5waGFzZXJUZXh0LnRleHQgKz0gZS5rZXk7XG5cdFx0XHRcdHNlbGYudGV4dCA9IHNlbGYucGhhc2VyVGV4dC50ZXh0O1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IFN0YXRlQ29udHJvbGxlciBmcm9tIFwiLi9zdGF0ZUNvbnRyb2xsZXJcIjtcbmltcG9ydCBDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcbmltcG9ydCBTdGFnZVNlcnZpY2UgZnJvbSBcIi4uL3NlcnZpY2VzL3N0YWdlU2VydmljZVwiO1xuaW1wb3J0IEF1dGhTZXJ2aWNlIGZyb20gXCIuLi9zZXJ2aWNlcy9hdXRoU2VydmljZVwiO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuLi9tYXplXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vdm8vdXNlclwiO1xuaW1wb3J0IFJlY29yZFNlcnZpY2UgZnJvbSBcIi4uL3NlcnZpY2VzL3JlY29yZFNlcnZpY2VcIjtcbmltcG9ydCBSZWNvcmQgZnJvbSBcIi4uL3ZvL3JlY29yZFwiO1xuaW1wb3J0IFJhbmtTZXJ2aWNlIGZyb20gXCIuLi9zZXJ2aWNlcy9yYW5rU2VydmljZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2aWNlQ29udHJvbGxlciBpbXBsZW1lbnRzIENvbnRyb2xsZXIge1xuXHRnYW1lIDogUGhhc2VyLkdhbWU7XG5cblx0c3RhZ2VTZXJ2aWNlIDogU3RhZ2VTZXJ2aWNlO1xuXHRhdXRoU2VydmljZSA6IEF1dGhTZXJ2aWNlO1xuXHRyZWNvcmRTZXJ2aWNlIDogUmVjb3JkU2VydmljZTtcblx0cmFua1NlcnZpY2UgOiBSYW5rU2VydmljZTtcblxuXHQvLyBJdCBpcyBuZWNlc3NhcnkgZm9yIGNvbnRyb2xpbmcgc3RhdGUuXG5cdHN0YXRlQ29udHJvbGxlciA6IFN0YXRlQ29udHJvbGxlcjtcblxuXHRjb25zdHJ1Y3RvcihnYW1lOiBHYW1lLk1hemUpIHtcblx0XHR0aGlzLmdhbWUgPSBnYW1lO1x0XHRcblx0XHR0aGlzLnN0YWdlU2VydmljZSA9IG5ldyBTdGFnZVNlcnZpY2UoKTtcblx0XHR0aGlzLmF1dGhTZXJ2aWNlID0gbmV3IEF1dGhTZXJ2aWNlKCk7XG5cdFx0dGhpcy5yZWNvcmRTZXJ2aWNlID0gbmV3IFJlY29yZFNlcnZpY2UoKTtcblx0XHR0aGlzLnJhbmtTZXJ2aWNlID0gbmV3IFJhbmtTZXJ2aWNlKCk7XHRcdFxuXHRcdFxuXHRcdHRoaXMuc3RhdGVDb250cm9sbGVyID0gZ2FtZS5zdGF0ZUNvbnRyb2xsZXI7XG5cdH1cdFxuXHRcblx0cHVibGljIGxvZ2luKHVzZXJJZCwgY2FsbGJhY2spIHtcblx0XHR0aGlzLmF1dGhTZXJ2aWNlLmxvZ2luKHVzZXJJZCwgY2FsbGJhY2spO1xuXHR9XG5cblx0cHVibGljIHJlZ2lzdGVyVXNlcih1c2VyOiBVc2VyLCBjYWxsYmFjazogKHVzZXI6IFVzZXIsIGlzQWxyZWFkeUV4aXN0OiBib29sZWFuKSA9PiB2b2lkKSB7XG5cdFx0dGhpcy5hdXRoU2VydmljZS5yZWdpc3RlclVzZXIodXNlciwgY2FsbGJhY2spO1xuXHR9XG5cblx0cHVibGljIGdldFJlY29yZCgpIDogUmVjb3JkIHtcblx0XHRjb25zdCB1c2VySWQgPSB0aGlzLmF1dGhTZXJ2aWNlLmdldExhc3RMb2dnZWRJblVzZXIoKS51c2VySWQ7XG5cdFx0Y29uc3QgcmVjb3JkID0gdGhpcy5yZWNvcmRTZXJ2aWNlLmdldFJlY29yZCh1c2VySWQpO1xuXHRcdHJldHVybiByZWNvcmQ7XG5cdH1cblxuXHRwdWJsaWMgZ2V0U3RhZ2VJbmZvcm1hdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5zdGFnZVNlcnZpY2UuZ2V0U3RhZ2VJbmZvcm1hdGlvbigpO1xuXHR9XG5cblx0cHVibGljIHJlY29yZFJhbmsocmVjb3JkOiBSZWNvcmQpIHtcblx0XHR0aGlzLnJlY29yZFNlcnZpY2Uuc2V0UmVjb3JkKHJlY29yZCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IEludHJvIH0gZnJvbSAnLi4vc3RhdGUvaW50cm8nO1xuaW1wb3J0IHsgTG9naW4gfSBmcm9tICcuLi9zdGF0ZS9sb2dpbic7XG5pbXBvcnQgeyBMZXZlbCB9IGZyb20gJy4uL3N0YXRlL2xldmVsJztcbmltcG9ydCB7IFBsYXkgfSBmcm9tICcuLi9zdGF0ZS9wbGF5JztcbmltcG9ydCB7IFJlZ2lzdGVyIH0gZnJvbSAnLi4vc3RhdGUvcmVnaXN0ZXInO1xuXG5pbXBvcnQgU2VydmljZUNvbnRyb2xsZXIgZnJvbSAnLi9zZXJ2aWNlQ29udHJvbGxlcic7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi4vbWF6ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRlQ29udHJvbGxlciB7XG5cdHN0YXRlTWFuYWdlciA6IFBoYXNlci5TdGF0ZU1hbmFnZXI7XG5cdGdhbWUgOiBQaGFzZXIuR2FtZTtcblxuXHR3aWR0aDogbnVtYmVyO1xuXHRoZWlnaHQ6IG51bWJlcjtcblxuXG5cdGdhbWVWZXJzaW9uOiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0fVxuXG5cdHB1YmxpYyBpbml0aWFsaXplKGdhbWU6IEdhbWUuTWF6ZSwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGdhbWVWZXJzaW9uOiBzdHJpbmcpIHtcblx0XHR0aGlzLnN0YXRlTWFuYWdlciA9IG5ldyBQaGFzZXIuU3RhdGVNYW5hZ2VyKGdhbWUpO1xuXHRcdHRoaXMuZ2FtZSA9IGdhbWU7XG5cdFx0dGhpcy5nYW1lLnN0YXRlID0gdGhpcy5zdGF0ZU1hbmFnZXI7XG5cdFx0dGhpcy5nYW1lVmVyc2lvbiA9IGdhbWVWZXJzaW9uO1xuXG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRzdGFydFN0YXRlKHN0YXRlPyA6IHN0cmluZykge1xuXHRcdGxldCBzdGFydGluZ1N0YXRlID0gJ0ludHJvJztcblx0XHRpZiAoc3RhdGUgPT09ICd1bmRlZmluZWQnIHx8IHN0YXRlID09PSBudWxsKSB7XG5cdFx0XHRzdGFydGluZ1N0YXRlID0gc3RhdGU7XG5cdFx0fVxuXG5cdFx0dGhpcy5nb1N0YXRlKHN0YXJ0aW5nU3RhdGUsIHRydWUsIHRydWUsICdIb3Jyb3IgTWF6ZScsIHRoaXMuZ2FtZVZlcnNpb24pO1xuXHR9XG5cblx0cHVibGljIGdvU3RhdGUoc3RhdGU6IHN0cmluZywgY2xlYXJXb3JsZD86IGJvb2xlYW4sIGNsZWFyQ2FjaGU/OiBib29sZWFuLCAuLi5hcmdzOiBhbnlbXSkge1xuXHRcdGlmICghdGhpcy5zdGF0ZU1hbmFnZXIuY2hlY2tTdGF0ZShzdGF0ZSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgVGhpcyBzdGF0ZSgke3N0YXRlfSkgZG9lcyBub3QgZXhpc3QhYCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zdGF0ZU1hbmFnZXIuc3RhcnQoc3RhdGUsIGNsZWFyV29ybGQsIGNsZWFyQ2FjaGUsIC4uLmFyZ3MpO1xuXHR9XG5cblx0cHJpdmF0ZSBpbml0KCkge1xuXHRcdHRoaXMuYWRkKCdJbnRybycsIEludHJvLCB0cnVlKTtcblx0XHR0aGlzLmFkZCgnTG9naW4nLCBMb2dpbiwgZmFsc2UpO1xuXHRcdHRoaXMuYWRkKCdSZWdpc3RlcicsIFJlZ2lzdGVyLCBmYWxzZSk7XG5cdFx0dGhpcy5hZGQoJ0xldmVsJywgTGV2ZWwsIGZhbHNlKTtcblx0XHR0aGlzLmFkZCgnUGxheScsIFBsYXksIGZhbHNlKTtcblx0fVxuXG5cdHByaXZhdGUgYWRkKGtleSwgc3RhdGUsIGF1dGhTdGFydD8pIHtcblx0XHR0aGlzLnN0YXRlTWFuYWdlci5hZGQoa2V5LCBzdGF0ZSwgYXV0aFN0YXJ0KTtcblx0fVxufSIsImltcG9ydCBTZXNzaW9uIGZyb20gXCIuLi9zZXNzaW9uL3Nlc3Npb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgREFPPFQ+IHtcblx0c2Vzc2lvbjogU2Vzc2lvbjtcblx0Y29uc3RydWN0b3Ioc2Vzc2lvbjogU2Vzc2lvbikge1xuXHRcdHRoaXMuc2Vzc2lvbiA9IHNlc3Npb247XG5cdH1cblxuXHRwdWJsaWMgYWJzdHJhY3QgaW5zZXJ0KHRhYmxlOiBzdHJpbmcsIG9iajogVCk6IFQ7XG5cdHB1YmxpYyBhYnN0cmFjdCBzZWxlY3QodGFibGU6IHN0cmluZywga2V5OiBzdHJpbmcpOiBUO1xuXHRwdWJsaWMgYWJzdHJhY3QgdXBkYXRlKHRhYmxlOiBzdHJpbmcsIGtleTogc3RyaW5nLCBvYmo6IFQpOiBUO1xuXHRwdWJsaWMgYWJzdHJhY3QgZGVsZXRlKHRhYmxlOiBzdHJpbmcsIGtleTogc3RyaW5nKTogYm9vbGVhbjtcblx0cHVibGljIGFic3RyYWN0IHNlbGVjdEFsbCh0YWJsZTogc3RyaW5nKTogYW55Oy8vQXJyYXk8VD47XG59IiwiaW1wb3J0IERBTyBmcm9tIFwiLi9kYW9cIjtcbmltcG9ydCBSZWNvcmQgZnJvbSBcIi4uL3ZvL3JlY29yZFwiO1xuXG5leHBvcnQgY2xhc3MgUmVjb3JkRGFvIGV4dGVuZHMgREFPPFJlY29yZD4ge1xuXG5cdHB1YmxpYyBpbnNlcnQodGFibGU6IHN0cmluZywgb2JqOiBSZWNvcmQpOiBSZWNvcmQge1xuXHRcdHRoaXMuc2Vzc2lvbi5zZXQodGFibGUsIG9iai51c2VySWQsIG9iai50b1N0cmluZygpKTtcblxuXHRcdHJldHVybiBvYmo7XG5cdH1cblxuXHRwdWJsaWMgc2VsZWN0KHRhYmxlOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKTogUmVjb3JkIHtcblx0XHRjb25zdCByZWNvcmREYXRhID0gdGhpcy5zZXNzaW9uLmdldCh0YWJsZSwgdXNlcklkKTtcblx0XHRjb25zdCByZWNvcmQ6IFJlY29yZCA9IFJlY29yZC5ieShyZWNvcmREYXRhKTtcblx0XHRyZXR1cm4gcmVjb3JkO1xuXHR9XG5cblx0cHVibGljIHVwZGF0ZSh0YWJsZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZywgb2JqOiBSZWNvcmQpOiBSZWNvcmQge1xuXHRcdHRoaXMuc2Vzc2lvbi5zZXQodGFibGUsIHVzZXJJZCwgb2JqLnRvU3RyaW5nKCkpO1xuXHRcdFxuXHRcdHJldHVybiBvYmo7XG5cdH1cblxuXHRwdWJsaWMgZGVsZXRlKHRhYmxlOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0bGV0IGlzU3VjY2VzcyA9IHRydWU7XG5cdFx0dHJ5IHtcblx0XHRcdHRoaXMuc2Vzc2lvbi5yZW1vdmUodGFibGUsIHVzZXJJZCk7XG5cdFx0fSBjYXRjaCB7XG5cdFx0XHRpc1N1Y2Nlc3MgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gaXNTdWNjZXNzO1xuXHR9XG5cblx0cHVibGljIHNlbGVjdEFsbCh0YWJsZTogc3RyaW5nKTogYW55IHtcblx0XHRjb25zdCBvYmpzID0gKDxhbnk+dGhpcykuc2Vzc2lvbi5hbGxTdG9yYWdlKCk7XG5cdFx0Y29uc3Qgb2JqID0gb2Jqc1t0YWJsZV07XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9XG59IiwiaW1wb3J0IERBTyBmcm9tIFwiLi9kYW9cIjtcbmltcG9ydCBVc2VyIGZyb20gXCIuLi92by91c2VyXCI7XG5cbmV4cG9ydCBjbGFzcyBVc2VyRGFvIGV4dGVuZHMgREFPPFVzZXI+IHtcblx0cHJpdmF0ZSByZWFkb25seSB1c2VyS2V5ID0gJ21hemVVc2VyUmVwbyc7XG5cdFxuXHRwdWJsaWMgaW5zZXJ0KHRhYmxlOiBzdHJpbmcsIG9iajogVXNlcik6IFVzZXIge1xuXHRcdHRoaXMuc2Vzc2lvbi5zZXQodGFibGUsIG9iai51c2VySWQsIG9iai50b1N0cmluZygpKTtcblxuXHRcdHJldHVybiBvYmo7XG5cdH1cblxuXHRwdWJsaWMgc2VsZWN0KHRhYmxlOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKTogVXNlciB7XG5cdFx0Y29uc3QgdXNlckpzb24gPSB0aGlzLnNlc3Npb24uZ2V0KHRhYmxlLCB1c2VySWQpO1xuXG5cdFx0Y29uc3QgdXNlcjogVXNlciA9IFVzZXIuYnkodXNlckpzb24pO1xuXHRcdHJldHVybiB1c2VyO1xuXHR9XG5cblx0cHVibGljIHVwZGF0ZSh0YWJsZTogc3RyaW5nLHVzZXJJZDogc3RyaW5nLCBvYmo6IFVzZXIpOiBVc2VyIHtcblx0XHR0aGlzLnNlc3Npb24uc2V0KHRhYmxlLCB1c2VySWQsIG9iai50b1N0cmluZygpKTtcblx0XHRcblx0XHRyZXR1cm4gb2JqO1xuXHR9XG5cblx0cHVibGljIGRlbGV0ZSh0YWJsZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdGxldCBpc1N1Y2Nlc3MgPSB0cnVlO1xuXHRcdHRyeSB7XG5cdFx0XHR0aGlzLnNlc3Npb24ucmVtb3ZlKHRhYmxlLCB1c2VySWQpO1xuXHRcdH0gY2F0Y2gge1xuXHRcdFx0aXNTdWNjZXNzID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlzU3VjY2Vzcztcblx0fVxuXG5cdHB1YmxpYyBzZWxlY3RBbGwodGFibGU6IHN0cmluZyk6IGFueSB7XG5cdFx0Y29uc3Qgb2JqcyA9ICg8YW55PnRoaXMpLnNlc3Npb24uYWxsU3RvcmFnZSgpO1xuXHRcdGNvbnN0IG9iaiA9IG9ianNbdGFibGVdO1xuXG5cdFx0cmV0dXJuIG9iajtcblx0fVxufSIsImltcG9ydCB7IEdhbWUgfSBmcm9tICcuL21hemUnO1xuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICAgIGNvbnN0IHdpZHRoID0gNjQwO1xuICAgIGNvbnN0IGhlaWdodCA9IDYwMDsgLy8gMTIwICogNDIwXG4gICAgY29uc3QgcGFyZW50SWQgPSAnZ2FtZSc7XG5cbiAgICAvLyBTaG91bGQgYmUgaW5pdGlhbGl6ZSBnYW1lIG9iamVjdCBhbmQgcnVuXG4gICAgY29uc3QgbWF6ZSA9IG5ldyBHYW1lLk1hemUod2lkdGgsIGhlaWdodCwgcGFyZW50SWQpO1xufTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL3BoYXNlci1jZS90eXBlc2NyaXB0L3BoYXNlci5kLnRzXCIgLz5cblxuaW1wb3J0IFNlcnZpY2VDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXIvc2VydmljZUNvbnRyb2xsZXJcIjtcbmltcG9ydCBTdGF0ZUNvbnRyb2xsZXIgZnJvbSBcIi4vY29udHJvbGxlci9zdGF0ZUNvbnRyb2xsZXJcIjtcblxuZXhwb3J0IG5hbWVzcGFjZSBHYW1lIHtcblx0ZXhwb3J0IGNsYXNzIE1hemUgZXh0ZW5kcyBQaGFzZXIuR2FtZSB7XG5cdFx0c3RhdGljIEdBTUVfVkVSU0lPTiA9IFwidjEuMFwiO1xuXG5cdFx0c2VydmljZUNvbnRyb2xsZXIgOiBTZXJ2aWNlQ29udHJvbGxlcjtcblx0XHRzdGF0ZUNvbnRyb2xsZXIgOiBTdGF0ZUNvbnRyb2xsZXI7XG5cblx0XHRjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCBwYXJlbnRJZCkge1xuXHRcdFx0c3VwZXIod2lkdGgsIGhlaWdodCwgUGhhc2VyLkFVVE8sIHBhcmVudElkLCBudWxsLCBmYWxzZSwgdHJ1ZSwgbnVsbCk7XG5cblx0XHRcdHRoaXMuc2VydmljZUNvbnRyb2xsZXIgPSBuZXcgU2VydmljZUNvbnRyb2xsZXIodGhpcyk7XG5cblx0XHRcdHRoaXMuc3RhdGVDb250cm9sbGVyID0gbmV3IFN0YXRlQ29udHJvbGxlcigpO1xuXHRcdFx0dGhpcy5zdGF0ZUNvbnRyb2xsZXIuaW5pdGlhbGl6ZSh0aGlzLCB3aWR0aCwgaGVpZ2h0LCBNYXplLkdBTUVfVkVSU0lPTik7XG5cdFx0XHR0aGlzLnN0YXRlQ29udHJvbGxlci5zdGFydFN0YXRlKCk7XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuaW1wb3J0IFVzZXIgZnJvbSBcIi4uL3ZvL3VzZXJcIjtcbmltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlXCI7XG5pbXBvcnQgREFPIGZyb20gXCIuLi9kYW8vZGFvXCI7XG5pbXBvcnQgeyBVc2VyRGFvIH0gZnJvbSBcIi4uL2Rhby91c2VyRGFvXCI7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXNzaW9uIH0gZnJvbSBcIi4uL3Nlc3Npb24vbG9jYWxTdG9yYWdlU2Vzc2lvblwiO1xuaW1wb3J0IFNlc3Npb24gZnJvbSBcIi4uL3Nlc3Npb24vc2Vzc2lvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRoU2VydmljZSBpbXBsZW1lbnRzIFNlcnZpY2Uge1xuXHR1c2VyRGFvIDogREFPPFVzZXI+O1xuXHRzZXNzaW9uIDogU2Vzc2lvbjtcblxuXHRwcml2YXRlIHJlYWRvbmx5IFRBQkxFX0xBU1RfTE9HR0VEX0lOID0gJ2xhc3RMb2dnZWRJblVzZXInO1xuXHRwcml2YXRlIHJlYWRvbmx5IFVTRVJfVEFCTEUgPSAnbWF6ZVVzZXJSZXBvJztcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnNlc3Npb24gPSBuZXcgTG9jYWxTdG9yYWdlU2Vzc2lvbigpO1xuXHRcdHRoaXMudXNlckRhbyA9IG5ldyBVc2VyRGFvKHRoaXMuc2Vzc2lvbik7XG5cdH1cblx0XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdFxuXHR9XG5cblx0cHVibGljIGdldExhc3RMb2dnZWRJblVzZXIoKSA6IFVzZXIge1xuXHRcdGNvbnN0IG9iaiA9IHRoaXMudXNlckRhby5zZWxlY3RBbGwodGhpcy5UQUJMRV9MQVNUX0xPR0dFRF9JTik7XG5cdFx0bGV0IHVzZXJPYmo7XG5cdFx0bGV0IHVzZXI7XG5cdFx0XG5cdFx0dHJ5IHtcblx0XHRcdHVzZXJPYmogPSBKU09OLnBhcnNlKG9iaik7XG5cdFx0XHRjb25zdCB1c2VySWQgPSBPYmplY3Qua2V5cyh1c2VyT2JqKVswXTtcblx0XHRcdGxldCB1c2VyU3RyID0gdXNlck9ialt1c2VySWRdO1xuXHRcdFx0aWYgKHR5cGVvZiB1c2VyU3RyID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHR1c2VyID0gSlNPTi5wYXJzZSh1c2VyU3RyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHVzZXIgPSB1c2VyU3RyO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0dXNlciA9IG51bGw7XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiB1c2VyO1xuXHR9XG5cblx0cHVibGljIHJlZ2lzdGVyVXNlcih1c2VyIDogVXNlciwgY2FsbGJhY2s6ICh1c2VyOiBVc2VyLCBpc0FscmVhZHlFeGlzdDogYm9vbGVhbikgPT4gdm9pZCkge1xuXHRcdGNvbnN0IHVzZXJJZCA9IHVzZXIudXNlcklkO1xuXHRcdGNvbnN0IHVzZXJJblNlc3Npb24gPSB0aGlzLnVzZXJEYW8uc2VsZWN0KHRoaXMuVVNFUl9UQUJMRSwgdXNlcklkKTtcblx0XHRcblx0XHRsZXQgaXNBbHJlYWR5RXhpc3QgPSB0cnVlO1xuXHRcdGlmICghdXNlckluU2Vzc2lvbikge1xuXHRcdFx0dGhpcy51c2VyRGFvLmluc2VydCh0aGlzLlVTRVJfVEFCTEUsIHVzZXIpO1xuXHRcdFx0aXNBbHJlYWR5RXhpc3QgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRjYWxsYmFjayh1c2VyLCBpc0FscmVhZHlFeGlzdCk7XG5cdH1cblxuXHRwdWJsaWMgbG9naW4odXNlcklkOiBzdHJpbmcsIGNhbGxiYWNrOiAodXNlcjogVXNlciwgaXNTdWNjZXNzOiBib29sZWFuKSA9PiB2b2lkKSB7XG5cdFx0Y29uc3QgdXNlciA9IHRoaXMudXNlckRhby5zZWxlY3QodGhpcy5VU0VSX1RBQkxFLCB1c2VySWQpO1xuXHRcdGlmICh1c2VyKSB7XG5cdFx0XHR0aGlzLnVzZXJEYW8uZGVsZXRlKHRoaXMuVEFCTEVfTEFTVF9MT0dHRURfSU4sIHVzZXJJZCk7XG5cdFx0XHR0aGlzLnVzZXJEYW8uaW5zZXJ0KHRoaXMuVEFCTEVfTEFTVF9MT0dHRURfSU4sIHVzZXIpO1xuXHRcdFx0Y2FsbGJhY2sodXNlciwgdHJ1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNhbGxiYWNrKG51bGwsIGZhbHNlKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgbG9nb3V0KHVzZXJJZDogc3RyaW5nKSB7XG5cdFx0dGhpcy51c2VyRGFvLmRlbGV0ZSh0aGlzLlRBQkxFX0xBU1RfTE9HR0VEX0lOLCB1c2VySWQpO1xuXHR9XG59IiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VcIjtcbmltcG9ydCBEQU8gZnJvbSBcIi4uL2Rhby9kYW9cIjtcbmltcG9ydCB7IFJhbmsgfSBmcm9tIFwiLi4vdm8vcmFua1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5rU2VydmljZSBpbXBsZW1lbnRzIFNlcnZpY2Uge1xuXHRyYW5rSW5mbzogYW55O1xuXHRyYW5rREFPIDogREFPPFJhbms+O1xuXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdFxuXHR9XG5cblx0cHVibGljIGNhbGN1bGF0ZVJhbmsoc3RhZ2VJZDogbnVtYmVyLCBlbGFwc2VkVGltZTogbnVtYmVyKSA6IFJhbmsge1xuXHRcdGNvbnN0IHJhbmtNZXRyaXggPSB7XG5cdFx0XHQwOiB7XG5cdFx0XHRcdDEwOiBSYW5rLlMsXG5cdFx0XHRcdDE1OiBSYW5rLkEsXG5cdFx0XHRcdDIwOiBSYW5rLkIsXG5cdFx0XHRcdDI1OiBSYW5rLkMsXG5cdFx0XHRcdDMwOiBSYW5rLkQsXG5cdFx0XHRcdDM1OiBSYW5rLkUsXG5cdFx0XHR9LFxuXHRcdFx0MToge1xuXHRcdFx0XHQxMDogUmFuay5TLFxuXHRcdFx0XHQxNTogUmFuay5BLFxuXHRcdFx0XHQyMDogUmFuay5CLFxuXHRcdFx0XHQyNTogUmFuay5DLFxuXHRcdFx0XHQzMDogUmFuay5ELFxuXHRcdFx0XHQzNTogUmFuay5FLFxuXHRcdFx0fSxcblx0XHRcdDI6IHtcblx0XHRcdFx0MTA6IFJhbmsuUyxcblx0XHRcdFx0MTU6IFJhbmsuQSxcblx0XHRcdFx0MjA6IFJhbmsuQixcblx0XHRcdFx0MjU6IFJhbmsuQyxcblx0XHRcdFx0MzA6IFJhbmsuRCxcblx0XHRcdFx0MzU6IFJhbmsuRSxcblx0XHRcdH0sXG5cdFx0XHQzOiB7XG5cdFx0XHRcdDEwOiBSYW5rLlMsXG5cdFx0XHRcdDE1OiBSYW5rLkEsXG5cdFx0XHRcdDIwOiBSYW5rLkIsXG5cdFx0XHRcdDI1OiBSYW5rLkMsXG5cdFx0XHRcdDMwOiBSYW5rLkQsXG5cdFx0XHRcdDM1OiBSYW5rLkUsXG5cdFx0XHR9LFxuXHRcdFx0NDoge1xuXHRcdFx0XHQxMDogUmFuay5TLFxuXHRcdFx0XHQxNTogUmFuay5BLFxuXHRcdFx0XHQyMDogUmFuay5CLFxuXHRcdFx0XHQyNTogUmFuay5DLFxuXHRcdFx0XHQzMDogUmFuay5ELFxuXHRcdFx0XHQzNTogUmFuay5FLFxuXHRcdFx0fSxcblx0XHRcdDU6IHtcblx0XHRcdFx0MTA6IFJhbmsuUyxcblx0XHRcdFx0MTU6IFJhbmsuQSxcblx0XHRcdFx0MjA6IFJhbmsuQixcblx0XHRcdFx0MjU6IFJhbmsuQyxcblx0XHRcdFx0MzA6IFJhbmsuRCxcblx0XHRcdFx0MzU6IFJhbmsuRSxcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Y29uc3Qgc3RhZ2VSYW5rTWV0cml4ID0gcmFua01ldHJpeFtzdGFnZUlkXTtcblx0XHRmb3IgKGxldCBrZXkgaW4gc3RhZ2VSYW5rTWV0cml4KSB7XG5cdFx0XHRjb25zdCB0aW1lTGltaXQgPSBwYXJzZUludChrZXkpO1xuXHRcdFx0aWYgKHRpbWVMaW1pdCA+IGVsYXBzZWRUaW1lKSB7XG5cdFx0XHRcdHJldHVybiBzdGFnZVJhbmtNZXRyaXhba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gUmFuay5GO1xuXHR9XG5cblx0bG9hZFJhbmtJbmZvcm1hdGlvbigpIHtcblxuXHR9XG59IiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VcIjtcbmltcG9ydCBEQU8gZnJvbSBcIi4uL2Rhby9kYW9cIjtcbmltcG9ydCBSZWNvcmQgZnJvbSBcIi4uL3ZvL3JlY29yZFwiO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlU2Vzc2lvbiB9IGZyb20gXCIuLi9zZXNzaW9uL2xvY2FsU3RvcmFnZVNlc3Npb25cIjtcbmltcG9ydCB7IFJlY29yZERhbyB9IGZyb20gXCIuLi9kYW8vcmVjb3JkRGFvXCI7XG5pbXBvcnQgU2Vzc2lvbiBmcm9tIFwiLi4vc2Vzc2lvbi9zZXNzaW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZFNlcnZpY2UgaW1wbGVtZW50cyBTZXJ2aWNlIHtcblx0cmVjb3JkRGFvIDogREFPPFJlY29yZD47XG5cdHNlc3Npb24gOiBTZXNzaW9uO1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgUkVDT1JEX1RBQkxFID0gJ21hemVSZWNvcmRSZXBvJztcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnNlc3Npb24gPSBuZXcgTG9jYWxTdG9yYWdlU2Vzc2lvbigpO1xuXHRcdHRoaXMucmVjb3JkRGFvID0gbmV3IFJlY29yZERhbyh0aGlzLnNlc3Npb24pO1xuXHR9XG5cblx0aW5pdGlhbGl6ZSgpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcblx0fVxuXG5cdHB1YmxpYyBnZXRSZWNvcmQodXNlcklkOiBzdHJpbmcpOiBSZWNvcmQge1xuXHRcdGNvbnN0IHJlY29yZCA9IHRoaXMucmVjb3JkRGFvLnNlbGVjdCh0aGlzLlJFQ09SRF9UQUJMRSwgdXNlcklkKTtcblx0XHRyZXR1cm4gcmVjb3JkO1xuXHR9XG5cblx0cHVibGljIHNldFJlY29yZChyZWNvcmQ6IFJlY29yZCkge1xuXHRcdHRoaXMucmVjb3JkRGFvLmluc2VydCh0aGlzLlJFQ09SRF9UQUJMRSwgcmVjb3JkKTtcblx0fVxufSIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTdGFnZSB9IGZyb20gXCIuLi92by9zdGFnZVwiO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vdm8vcG9pbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2VTZXJ2aWNlIGltcGxlbWVudHMgU2VydmljZSB7XG5cdHN0YXRpYyBOVU1fT0ZfU1RBR0UgPSA1O1xuXHRzdGFnZU1hcCA6IGFueTtcblx0XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuc3RhZ2VNYXAgPSB7fTtcblx0XHR0aGlzLmdlbmVyYXRlU3RhZ2VNYXAoKTtcblx0fVxuXG5cdHB1YmxpYyBpbml0aWFsaXplKCkgeyB9XG5cblx0cHVibGljIGdldFN0YWdlSW5mb3JtYXRpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhZ2VNYXA7XG5cdH1cblxuXHQvLyBMb2FkIFN0YWdlIE1hcCBJbmZvcm1hdGlvblxuXHRwcml2YXRlIGdlbmVyYXRlU3RhZ2VNYXAoKSB7XG5cdFx0Zm9yIChsZXQgaT0wOyBpPFN0YWdlU2VydmljZS5OVU1fT0ZfU1RBR0U7IGkrKykge1xuXHRcdFx0bGV0IHplcm9Gb3JtYXQgPSAnMDAwJyArIGk7XG5cdFx0XHRsZXQgbWFwU2VxID0gemVyb0Zvcm1hdC5zbGljZSgtMyk7XG5cblx0XHRcdGNvbnN0IGZsb29yUGF0aCA9ICdhc3NldHMvaW1nL21hcHMvZmxvb3ItJyArIG1hcFNlcSArICcucG5nJztcblx0XHRcdGNvbnN0IHdhbGxQYXRoID0gJ2Fzc2V0cy9pbWcvbWFwcy93YWxscy0nICsgbWFwU2VxICsgJy5wbmcnO1xuXG5cdFx0XHRjb25zdCBzdGFnZSA9IG5ldyBTdGFnZShpLCBmbG9vclBhdGgsIHdhbGxQYXRoLCBcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFBvaW50Lm9uKDIzNSwgODUpLFxuXHRcdFx0XHRcdFBvaW50Lm9uKDU2NSwgNDAwKVxuXHRcdFx0XHRdKTtcblx0XHRcdFxuXHRcdFx0dGhpcy5zdGFnZU1hcFtpXSA9IHN0YWdlO1xuXHRcdH1cblx0fVxufSIsImltcG9ydCBTZXNzaW9uIGZyb20gXCIuL3Nlc3Npb25cIjtcblxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZVNlc3Npb24gaW1wbGVtZW50cyBTZXNzaW9uIHtcblx0Z2V0KHRhYmxlOiBzdHJpbmcsIGtleTogc3RyaW5nKSA6IGFueSB7XG5cdFx0Y29uc3QgdGFibGVEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGFibGUpIHx8IG51bGw7XG5cdFx0aWYgKCF0YWJsZURhdGEpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGNvbnN0IHRhYmxlSnNvbk9iaiA9IEpTT04ucGFyc2UodGFibGVEYXRhKTtcblx0XHRsZXQgaXRlbSA9IHRhYmxlSnNvbk9ialtrZXldO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGxldCBvYmogPSBKU09OLnBhcnNlKGl0ZW0pO1x0XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH1cdFx0XG5cdFx0cmV0dXJuIGl0ZW07XG5cdH1cblxuXHRzZXQodGFibGU6IHN0cmluZywga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcblx0XHRjb25zdCBvcmlnaW5hbERhdGFPYmogPSB0aGlzLmdldCh0YWJsZSwga2V5KTtcblx0XHRpZiAoIW9yaWdpbmFsRGF0YU9iaikge1xuXHRcdFx0Y29uc3QgdGFibGVEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGFibGUpIHx8IG51bGw7XG5cdFx0XHRpZiAodGFibGVEYXRhKSB7XG5cdFx0XHRcdGNvbnN0IHRhYmxlSnNvbk9iaiA9IEpTT04ucGFyc2UodGFibGVEYXRhKTtcblx0XHRcdFx0bGV0IGRhdGEgPSB0YWJsZUpzb25PYmo7XG5cdFx0XHRcdGRhdGFba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0YWJsZSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IGRhdGEgPSB7fTtcblx0XHRcdFx0ZGF0YVtrZXldID0gdmFsdWU7XG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRhYmxlLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHRhYmxlRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRhYmxlKTtcblx0XHRcdGNvbnN0IHRhYmxlSnNvbk9iaiA9IEpTT04ucGFyc2UodGFibGVEYXRhKTtcblx0XHRcdGxldCBqc29uVmFsdWUgPSBKU09OLnBhcnNlKHZhbHVlKTtcblx0XHRcdGxldCBkYXRhID0ge307XG5cdFx0XHRkYXRhW2tleV0gPSBqc29uVmFsdWU7XG5cblx0XHRcdGxldCBkYXRhMiA9IHRhYmxlSnNvbk9iajtcblx0XHRcdGRhdGEyW2tleV0gPSBvcmlnaW5hbERhdGFPYmo7XG5cdFx0XHRcblx0XHRcdGNvbnN0IG9iaiA9IHRoaXMuZXh0ZW5kKGRhdGEyLCBkYXRhKTtcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRhYmxlLCBKU09OLnN0cmluZ2lmeShvYmopKTtcblx0XHR9XG5cdH1cblxuXHRyZW1vdmUodGFibGU6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcblx0XHRjb25zdCBvcmlnaW5hbERhdGFPYmogPSB0aGlzLmdldCh0YWJsZSwga2V5KTtcblx0XHRpZiAoIW9yaWdpbmFsRGF0YU9iaikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCB0YWJsZURhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0YWJsZSk7XG5cdFx0XHRjb25zdCB0YWJsZUpzb25PYmogPSBKU09OLnBhcnNlKHRhYmxlRGF0YSk7XG5cdFx0XHRkZWxldGUgdGFibGVKc29uT2JqW2tleV07XG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0YWJsZSwgSlNPTi5zdHJpbmdpZnkodGFibGVKc29uT2JqKSk7XG5cdFx0fVxuXHR9XG5cblx0YWxsU3RvcmFnZSgpIHtcblx0XHRsZXQgYXJjaGl2ZSA9IHt9O1xuXHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKTtcblx0XHRsZXQgaSA9IGtleXMubGVuZ3RoO1xuXG5cdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0YXJjaGl2ZVtrZXlzW2ldXSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleXNbaV0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBhcmNoaXZlO1xuXHR9XG5cblxuXHRwcml2YXRlIGV4dGVuZCguLi5hcmdzKSB7XG5cdFx0bGV0IG8sIGksIGs7XG5cdFx0Zm9yIChvID0ge30sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHQvLyBpZiAoYXJndW1lbnRzW2ldLmNvbnN0cnVjdG9yICE9PSBPYmplY3QpIGNvbnRpbnVlO1xuXHRcdFx0Zm9yIChrIGluIGFyZ3VtZW50c1tpXSkge1xuXHRcdFx0XHRpZiAoYXJndW1lbnRzW2ldLmhhc093blByb3BlcnR5KGspKSB7XG5cdFx0XHRcdFx0b1trXSA9IGFyZ3VtZW50c1tpXVtrXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0ID8gdGhpcy5leHRlbmQob1trXSB8fCB7fSwgYXJndW1lbnRzW2ldW2tdKSA6IGFyZ3VtZW50c1tpXVtrXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbztcblx0fVxufSIsImltcG9ydCB7IFN0YXRlTWFuYWdlciwgR2FtZSB9IGZyb20gXCJwaGFzZXItY2VcIjtcbmltcG9ydCBTZXJ2aWNlQ29udHJvbGxlciBmcm9tIFwiLi4vY29udHJvbGxlci9zZXJ2aWNlQ29udHJvbGxlclwiO1xuaW1wb3J0IFN0YXRlQ29udHJvbGxlciBmcm9tIFwiLi4vY29udHJvbGxlci9zdGF0ZUNvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZSBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XG5cdHNlcnZpY2VDb250cm9sbGVyIDogU2VydmljZUNvbnRyb2xsZXI7XG5cdHN0YXRlQ29udHJvbGxlciA6IFN0YXRlQ29udHJvbGxlcjtcblxuXHRjb25zdHJ1Y3RvcihnYW1lIDogUGhhc2VyLkdhbWUpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0Ly8gRm9yIElnbm9yaW5nIG5vbi1leGlzdCBwcm9wZXJ0eSBlcnJvci5cblx0XHR0aGlzLnNlcnZpY2VDb250cm9sbGVyID0gKGdhbWUgYXMgYW55KS5zZXJ2aWNlQ29udHJvbGxlcjtcblx0XHR0aGlzLnN0YXRlQ29udHJvbGxlciA9IChnYW1lIGFzIGFueSkuc3RhdGVDb250cm9sbGVyO1xuXHR9XG5cblx0Z29TdGF0ZShzdHJpbmcpIHtcblx0XHR0aGlzLnNlcnZpY2VDb250cm9sbGVyIFxuXHR9XG5cdFxufSIsImltcG9ydCBCYXNlIGZyb20gXCIuL2Jhc2VcIjtcblxuZXhwb3J0IGNsYXNzIEludHJvIGV4dGVuZHMgQmFzZSB7XG5cdHN0YXRpYyBpbnRyb0ludGVydmFsID0gMjAwMDtcblxuXHRnYW1lVGl0bGUgOiBzdHJpbmc7XG5cdGdhbWVWZXJzaW9uIDogc3RyaW5nO1xuXHRsb2dvVGV4dCA6IFBoYXNlci5UZXh0O1xuXG5cdGNvbnN0cnVjdG9yKGdhbWU6IFBoYXNlci5HYW1lKSB7XG5cdFx0c3VwZXIoZ2FtZSk7XG5cdH1cblxuXHRpbml0KGdhbWVUaXRsZSwgZ2FtZVZlcnNpb24pIHtcblx0XHR0aGlzLmdhbWVUaXRsZSA9IGdhbWVUaXRsZTtcblx0XHR0aGlzLmdhbWVWZXJzaW9uID0gZ2FtZVZlcnNpb247XG5cdH1cblxuXHRwcmVsb2FkKCkge1xuXHRcdFxuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMzYjNiM2InO1xuXG5cdFx0dGhpcy5sb2dvVGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dChcblx0XHRcdHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCBcblx0XHRcdHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZLCBcblx0XHRcdHRoaXMuZ2FtZVRpdGxlLFxuXHRcdFx0e1xuXHRcdFx0XHRmb250OiAnODBweCBBcmlhbDsnLFxuXHRcdFx0XHRmaWxsOiAnI2ZmZmZmZidcblx0XHRcdH1cblx0XHQpO1xuXHRcdHRoaXMubG9nb1RleHQuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcblx0XHR0aGlzLmxvZ29UZXh0LmFscGhhID0gMC44O1xuXG5cdFx0Y29uc3QgcCA9IHRoaXMuZ2FtZS53b3JsZC5ib3VuZHMuYm90dG9tUmlnaHQ7XG5cdFx0XG5cdFx0Y29uc3QgZm9vdGVyID0gdGhpcy5nYW1lLmFkZC50ZXh0KFxuXHRcdFx0cC54LTUwLFxuXHRcdFx0cC55LTMwLFxuXHRcdFx0dGhpcy5nYW1lVmVyc2lvbixcblx0XHRcdHtcblx0XHRcdFx0Zm9udDogJzE1cHggQXJpYWw7Jyxcblx0XHRcdFx0ZmlsbDogJyNlZWVlZWUnXG5cdFx0XHR9XG5cdFx0KTtcblx0XHRmb290ZXIuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcblxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRzZWxmLnN0YXRlQ29udHJvbGxlci5nb1N0YXRlKCdMb2dpbicpO1xuXHRcdH0sIEludHJvLmludHJvSW50ZXJ2YWwpO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXG5cdH1cbn0iLCJpbXBvcnQgU2VydmljZUNvbnRyb2xsZXIgZnJvbSBcIi4uL2NvbnRyb2xsZXIvc2VydmljZUNvbnRyb2xsZXJcIjtcbmltcG9ydCBCYXNlIGZyb20gXCIuL2Jhc2VcIjtcbmltcG9ydCBSZWNvcmQsIHsgU3RhZ2VSZWNvcmQgfSBmcm9tIFwiLi4vdm8vcmVjb3JkXCJcbmltcG9ydCB7IFJhbmtVdGlsIH0gZnJvbSBcIi4uL3ZvL3JhbmtcIjtcblxuZXhwb3J0IGNsYXNzIExldmVsIGV4dGVuZHMgQmFzZSB7XG5cdHJlYWRvbmx5IG51bWJlck9mU3RhZ2VQZXJQYWdlID0gMztcblxuXHRsb3dlclN0YWdlQnRuIDogUGhhc2VyLkJ1dHRvbjtcblx0aGlnaGVyU3RhZ2VCdG4gOiBQaGFzZXIuQnV0dG9uO1xuXG5cdGxvZ291dEJ0biA6IFBoYXNlci5CdXR0b247XG5cdFxuXHRudW1iZXJPZlN0YWdlOiBudW1iZXI7XG5cdG51bWJlck9mUGFnZTogbnVtYmVyO1xuXHRjdXJyZW50UGFnZTogbnVtYmVyO1xuXHRzdGFnZU1hcDogYW55O1xuXG5cdHJlY29yZDogUmVjb3JkO1xuXG5cdHN0YWdlQnRuR3JvdXA6IFBoYXNlci5Hcm91cDtcblxuXHRjb25zdHJ1Y3RvcihnYW1lKSB7XG5cdFx0c3VwZXIoZ2FtZSk7XG5cdFx0dGhpcy5jdXJyZW50UGFnZSA9IDE7XG5cdH1cblx0XG5cdGluaXQoc3RhZ2VNYXApIHtcblx0XHR0aGlzLnN0YWdlTWFwID0gc3RhZ2VNYXA7XG5cdFx0dGhpcy5udW1iZXJPZlN0YWdlID0gT2JqZWN0LmtleXMoc3RhZ2VNYXApLmxlbmd0aDtcblx0XHR0aGlzLm51bWJlck9mUGFnZSA9IE1hdGguY2VpbCh0aGlzLm51bWJlck9mU3RhZ2UvdGhpcy5udW1iZXJPZlN0YWdlUGVyUGFnZSk7XG5cdH1cblxuXHRwcmVsb2FkKCkge1xuXHRcdHRoaXMuZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KCdzdGFnZUFycm93cycsICcuLi9hc3NldHMvaW1nL3N0YWdlQXJyb3dzLnBuZycsIDQ4LCA0OCk7XG5cdFx0dGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ2xvZ291dEJ0bicsICcuLi9hc3NldHMvaW1nL2xvZ291dEJ0bi5wbmcnKTtcblxuXHRcdHRoaXMucmVjb3JkID0gdGhpcy5zZXJ2aWNlQ29udHJvbGxlci5nZXRSZWNvcmQoKTtcblx0XHR0aGlzLnN0YWdlQnRuR3JvdXAgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0dGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjM2IzYjNiJztcblx0XHR0aGlzLmdhbWUuc3RhZ2UuYWxwaGEgPSAwLjk7XG5cdFx0dGhpcy5kcmF3U3RhZ2VCdG4odGhpcy5jdXJyZW50UGFnZSk7XG5cdFx0dGhpcy5kcmF3U3RhZ2VNb3ZlQnRuKCk7XG5cdFx0dGhpcy5kcmF3TG9nb3V0QnRuKCk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cblx0fVxuXG5cdHByaXZhdGUgZHJhd0xvZ291dEJ0bigpIHtcblx0XHR0aGlzLmxvZ291dEJ0biA9IHRoaXMuZ2FtZS5hZGQuYnV0dG9uKHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCA1MDAsICdsb2dvdXRCdG4nLCAoKSA9PiB7XG5cdFx0XHRpZiAoY29uZmlybSgnTG9nb3V0IO2VmOyLnOqyoOyKteuLiOq5jD8nKSkge1xuXHRcdFx0XHQvLyBSZW1vdmUgbGFzdExvZ2dlZEluVXNlclxuXHRcdFx0XHR0aGlzLnNlcnZpY2VDb250cm9sbGVyLmF1dGhTZXJ2aWNlLmxvZ291dCh0aGlzLnNlcnZpY2VDb250cm9sbGVyLmF1dGhTZXJ2aWNlLmdldExhc3RMb2dnZWRJblVzZXIoKS51c2VySWQpO1xuXHRcdFx0XHR0aGlzLnN0YXRlQ29udHJvbGxlci5nb1N0YXRlKCdMb2dpbicpO1xuXHRcdFx0fVxuXHRcdH0sIHRoaXMpO1xuXG5cdFx0dGhpcy5sb2dvdXRCdG4uYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcblx0fVxuXG5cdHByaXZhdGUgY2xlYXJTdGFnZUJ0bkZpZWxkKCkge1xuXHRcdHRoaXMuc3RhZ2VCdG5Hcm91cC5jYWxsQWxsKCdraWxsJywgJycpO1xuXHR9XG5cblx0cHJpdmF0ZSBkcmF3U3RhZ2VCdG4ocGFnZU51bSkge1xuXHRcdHRoaXMuY2xlYXJTdGFnZUJ0bkZpZWxkKCk7XG5cblx0XHRjb25zdCB3aWR0aCA9IDIwMDtcblx0XHRjb25zdCBoZWlnaHQgPSAyMDA7XG5cblx0XHRsZXQgb2Zmc2V0WCA9ICh0aGlzLmdhbWUud29ybGQud2lkdGggLSAxNTApIC8gdGhpcy5udW1iZXJPZlN0YWdlUGVyUGFnZTsgLy8gMTUwOiBwYWRkaW5nXG5cblx0XHRsZXQgc3RhZ2VJbmZvcyA9IHt9O1xuXHRcdGlmICh0aGlzLnJlY29yZCkge1xuXHRcdFx0c3RhZ2VJbmZvcyA9IHRoaXMucmVjb3JkLnJlY29yZHM7XG5cdFx0fVxuXHRcdFxuXHRcdGNvbnN0IG9mZnNldCA9IChwYWdlTnVtLTEpICogdGhpcy5udW1iZXJPZlN0YWdlUGVyUGFnZTtcblx0XHRmb3IgKGxldCBpPW9mZnNldDsgaTxvZmZzZXQrdGhpcy5udW1iZXJPZlN0YWdlUGVyUGFnZTsgaSsrKSB7XG5cdFx0XHRpZiAoIXRoaXMuc3RhZ2VNYXBbaV0pIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRsZXQgc3RhZ2VJbmZvOiBTdGFnZVJlY29yZDtcblx0XHRcdGxldCBzdGFnZUluZm9TdHIgPSAnJztcblx0XHRcdGlmIChzdGFnZUluZm9zW2ldKSB7XG5cdFx0XHRcdHN0YWdlSW5mbyA9IHN0YWdlSW5mb3NbaV07XG5cdFx0XHRcdHN0YWdlSW5mb1N0ciArPSAnXFxuVGltZTogJyArIHN0YWdlSW5mby50aW1lICsgJyBzZWNvbmRzJztcblx0XHRcdFx0c3RhZ2VJbmZvU3RyICs9ICdcXG5SYW5rOiAnICsgUmFua1V0aWwudmFsdWVPZihzdGFnZUluZm8ucmFuayk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHN0YWdlQnRuVGV4dCA9IGBTdGFnZS0ke2krMX1gICsgc3RhZ2VJbmZvU3RyO1xuXG5cdFx0XHRjb25zdCBvZmZzZXRYT2ZCdG4gPSBvZmZzZXRYICogKGkldGhpcy5udW1iZXJPZlN0YWdlUGVyUGFnZSk7XG5cblx0XHRcdGNvbnN0IHN0YWdlQnRuID0gdGhpcy5nYW1lLmFkZC50ZXh0KDE0NSArIG9mZnNldFhPZkJ0biwgOTAsIHN0YWdlQnRuVGV4dCwge1xuXHRcdFx0XHRmaWxsOiAnI2ZmZmZmZicsXG5cdFx0XHRcdGZvbnQ6ICcxNXB4IEFyaWFsJ1xuXHRcdFx0fSk7XG5cblx0XHRcdHN0YWdlQnRuLmlucHV0RW5hYmxlZCA9IHRydWU7XG5cdFx0XHRzdGFnZUJ0bi5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcblx0XHRcdFxuXHRcdFx0Y29uc3Qgc3RhZ2VOdW0gPSBpKzE7XG5cdFx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHRcdHN0YWdlQnRuLmV2ZW50cy5vbklucHV0RG93bi5hZGQoKGUpID0+IHtcblx0XHRcdFx0aWYgKGNvbmZpcm0oYFN0YWdlLSR7c3RhZ2VOdW19IOydtOuPme2VoOq5jOyalD9gKSkge1xuXHRcdFx0XHRcdHNlbGYuc3RhdGVDb250cm9sbGVyLmdvU3RhdGUoJ1BsYXknLCB0cnVlLCB0cnVlLCBzZWxmLnN0YWdlTWFwW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgdGhpcyk7XG5cblx0XHRcdHRoaXMuc3RhZ2VCdG5Hcm91cC5hZGQoc3RhZ2VCdG4pO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgZHJhd1N0YWdlTW92ZUJ0bigpIHtcblx0XHRjb25zdCBwID0gdGhpcy5nYW1lLndvcmxkLmJvdW5kcztcblxuXHRcdHRoaXMubG93ZXJTdGFnZUJ0biA9IHRoaXMuZ2FtZS5hZGQuYnV0dG9uKDEwMCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclkgLCBcInN0YWdlQXJyb3dzXCIsIHRoaXMuYnV0dG9uQ2xpY2tlZCwgdGhpcyk7XG5cdFx0dGhpcy5oaWdoZXJTdGFnZUJ0biA9IHRoaXMuZ2FtZS5hZGQuYnV0dG9uKDEwMCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclksIFwic3RhZ2VBcnJvd3NcIiwgdGhpcy5idXR0b25DbGlja2VkLCB0aGlzKTtcblxuXHRcdHRoaXMubG93ZXJTdGFnZUJ0bi5mcmFtZSA9IDA7XG5cdFx0dGhpcy5oaWdoZXJTdGFnZUJ0bi5mcmFtZSA9IDE7XG5cblx0XHQvLyBBbGlnbiBzdGFnZSBwYWdlIG1vdmUgYnRuXG5cdFx0dGhpcy5sb3dlclN0YWdlQnRuLnggPSAyMDtcblx0XHR0aGlzLmhpZ2hlclN0YWdlQnRuLnggPSBwLnJpZ2h0IC0gMjAgLSB0aGlzLmhpZ2hlclN0YWdlQnRuLndpZHRoO1xuXG5cdFx0Y29uc3Qgc3RhZ2VUZXh0ID0gdGhpcy5nYW1lLmFkZC50ZXh0KHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCA1MCwgJ1N0YWdlJywge1xuXHRcdFx0ZmlsbDogJyNmZmZmZmYnLFxuXHRcdFx0Zm9udDogJzIwcHggQXJpYWwnXG5cdFx0fSk7XG5cblx0XHRzdGFnZVRleHQuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcblx0fVxuXG5cdHByaXZhdGUgYnV0dG9uQ2xpY2tlZChidXR0b24sIHBvaW50ZXIpIHtcblx0XHRsZXQgY3VycmVudFBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlO1xuXHRcdGlmIChidXR0b24uZnJhbWUgPT0gMCkgeyAvLyBsb3dlclN0YWdlQnRuXG5cdFx0XHRpZiAoY3VycmVudFBhZ2UgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5kcmF3U3RhZ2VCdG4oLS10aGlzLmN1cnJlbnRQYWdlKTtcblx0XHR9IGVsc2UgaWYgKGJ1dHRvbi5mcmFtZSA9PSAxKSB7IC8vIGhpZ2hlclN0YWdlQnRuXG5cdFx0XHRpZiAoY3VycmVudFBhZ2UrMSA+IHRoaXMubnVtYmVyT2ZQYWdlKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuZHJhd1N0YWdlQnRuKCsrdGhpcy5jdXJyZW50UGFnZSk7XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vdm8vdXNlcic7XG5cbmV4cG9ydCBjbGFzcyBMb2dpbiBleHRlbmRzIEJhc2Uge1xuXHRsb2dpblRleHQgOiBQaGFzZXIuVGV4dDtcblx0Z2FtZUxvZ28gOiBQaGFzZXIuSW1hZ2U7XG5cblx0Z3Vlc3RVVUlEIDogc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKGdhbWUpIHtcblx0XHRzdXBlcihnYW1lKTtcblx0fVxuXG5cdHByZWxvYWQoKSB7XG5cdFx0dGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ2dhbWVMb2dvJywgJ2Fzc2V0cy9pbWcvZ2FtZWxvZ28ucG5nJyk7XG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0dGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI0ZGRkZGRic7XG5cblx0XHR0aGlzLmdhbWVMb2dvID0gdGhpcy5nYW1lLmFkZC5pbWFnZSh0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgMjEwLCAnZ2FtZUxvZ28nKTtcblx0XHR0aGlzLmdhbWVMb2dvLmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XG5cblx0XHR0aGlzLmxvZ2luVGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dChcblx0XHRcdHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCBcblx0XHRcdHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZLCBcblx0XHRcdCdMb2dpbicsXG5cdFx0XHR7XG5cdFx0XHRcdGZvbnQ6ICczNXB4IEFyaWFsOycsXG5cdFx0XHRcdGZpbGw6ICcjMDAwMDAwJ1xuXHRcdFx0fVxuXHRcdCk7XG5cdFx0dGhpcy5sb2dpblRleHQuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcblx0XHR0aGlzLmxvZ2luVGV4dC5hbHBoYSA9IDAuODtcblxuXHRcdHRoaXMubG9naW5UZXh0LmlucHV0RW5hYmxlZCA9IHRydWU7XG5cdFx0dGhpcy5sb2dpblRleHQuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XG5cblx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHR0aGlzLmxvZ2luVGV4dC5ldmVudHMub25JbnB1dERvd24uYWRkKChlKSA9PiB7XG5cdFx0XHRjb25zdCB0d2VlbiA9IHNlbGYuZ2FtZS5hZGQudHdlZW4oc2VsZi5sb2dpblRleHQpLnRvKHtcblx0XHRcdFx0YWxwaGE6IDAuMlxuXHRcdFx0fSwgNzAwLCBQaGFzZXIuRWFzaW5nLlF1YWRyYXRpYy5PdXQsIGZhbHNlLCAwLCAwLCBmYWxzZSk7XG5cdFx0XHRcblx0XHRcdHR3ZWVuLm9uQ29tcGxldGUuYWRkKChlKSA9PiB7XG5cdFx0XHRcdGxldCB1c2VyID0gc2VsZi5zZXJ2aWNlQ29udHJvbGxlci5hdXRoU2VydmljZS5nZXRMYXN0TG9nZ2VkSW5Vc2VyKCk7XG5cdFx0XHRcdGlmICh1c2VyICYmIHVzZXIudXNlcklkKSB7XG5cdFx0XHRcdFx0c2VsZi5zZXJ2aWNlQ29udHJvbGxlci5sb2dpbih1c2VyLnVzZXJJZCwgKHVzZXI6IFVzZXIsIGlzU3VjY2VzczogYm9vbGVhbikgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKGlzU3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0XHRhbGVydChgJHt1c2VyLnVzZXJJZH3ri5gsIOuLpOyLnCDrsKnrrLjtlbTso7zshajqtbDsmpQuIO2ZmOyYge2VqeuLiOuLpC5gKTtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc3RhZ2VJbmZvID0gc2VsZi5zZXJ2aWNlQ29udHJvbGxlci5nZXRTdGFnZUluZm9ybWF0aW9uKCk7XG5cdFx0XHRcdFx0XHRcdHNlbGYuc3RhdGVDb250cm9sbGVyLmdvU3RhdGUoJ0xldmVsJywgdHJ1ZSwgdHJ1ZSwgc3RhZ2VJbmZvKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGFsZXJ0KCfsmIjsoITsl5Ag67Cp66y47ZWY7IugIOyggeydtCDsl4bsnLzsi5zqtbDsmpQ/IOyCrOyaqeyekCDrk7HroZ3tmZTrqbTsnLzroZwg7J2064+Z7ZWp64uI64ukLicpO1xuXHRcdFx0XHRcdFx0XHRzZWxmLnN0YXRlQ29udHJvbGxlci5nb1N0YXRlKCdSZWdpc3RlcicpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1x0XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWxlcnQoJ+yYiOyghOyXkCDrsKnrrLjtlZjsi6Ag7KCB7J20IOyXhuycvOyLnOq1sOyalD8g7IKs7Jqp7J6QIOuTseuhne2ZlOuptOycvOuhnCDsnbTrj5ntlanri4jri6QuJyk7XG5cdFx0XHRcdFx0c2VsZi5zdGF0ZUNvbnRyb2xsZXIuZ29TdGF0ZSgnUmVnaXN0ZXInKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgc2VsZik7XG5cblx0XHRcdHR3ZWVuLnN0YXJ0KCk7XG5cdFx0fSwgdGhpcyk7XG5cblxuXHRcdHRoaXMubG9naW5UZXh0LmV2ZW50cy5vbklucHV0T3Zlci5hZGQoKGUpID0+IHtcblx0XHRcdHNlbGYubG9naW5UZXh0LmFscGhhID0gMC41O1xuXHRcdH0sIHRoaXMpO1xuXG5cdFx0dGhpcy5sb2dpblRleHQuZXZlbnRzLm9uSW5wdXRPdXQuYWRkKChlKSA9PiB7XG5cdFx0XHRzZWxmLmxvZ2luVGV4dC5hbHBoYSA9IDAuODtcblx0XHR9LCB0aGlzKTtcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblxuXHR9XG59IiwiaW1wb3J0IEJhc2UgZnJvbSBcIi4vYmFzZVwiO1xuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tIFwiLi4vdm8vc3RhZ2VcIjtcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL3ZvL3BvaW50XCI7XG5pbXBvcnQgeyBSZWNvcmREYW8gfSBmcm9tIFwiLi4vZGFvL3JlY29yZERhb1wiO1xuaW1wb3J0IFJlY29yZCwgeyBTdGFnZVJlY29yZCB9IGZyb20gXCIuLi92by9yZWNvcmRcIjtcbmltcG9ydCB7IFJhbmsgfSBmcm9tIFwiLi4vdm8vcmFua1wiO1xuXG5leHBvcnQgY2xhc3MgUGxheSBleHRlbmRzIEJhc2Uge1xuXHRzdGF0aWMgcmVhZG9ubHkgcmF5TGVuZ3RoID0gNTAwO1xuXHRzdGF0aWMgcmVhZG9ubHkgbnVtT2ZSYXlzID0gMjA7XG5cdHN0YXRpYyByZWFkb25seSBsaWdodEFuZ2xlID0gTWF0aC5QSS80OyAvLyA0NSBkZWcuXG5cblx0cHJpdmF0ZSByZWFkb25seSBzcGVlZCA9IDI7XG5cblx0dGltZXIgOiBQaGFzZXIuVGltZXI7XG5cdGVsYXBzZWRUaW1lIDogbnVtYmVyO1xuXHR0aW1lSGFuZGxlcjogbnVtYmVyO1xuXHR0aW1lVGV4dCA6IFBoYXNlci5UZXh0O1xuXHRcblx0Zmxvb3IgOiBQaGFzZXIuU3ByaXRlO1xuXHR3YWxsIDogUGhhc2VyLlNwcml0ZTtcblx0d2FsbHNCaXRNYXAgOiBQaGFzZXIuQml0bWFwRGF0YTtcblx0bWFzayA6IFBoYXNlci5HcmFwaGljcztcblx0cGxheWVyIDogUGhhc2VyLlNwcml0ZTtcblx0cGxheWVyUGF0aCA6IHN0cmluZztcblxuXHRjdXJzb3IgOiBQaGFzZXIuQ3Vyc29yS2V5cztcblx0XG5cdHN0YWdlSW5mbyA6IFN0YWdlO1xuXHRjdXJyZW50RXhpdFBvaW50IDogUG9pbnQ7XG5cdGN1cnJlbnRFeGl0R3JhcGhpYyA6IFBoYXNlci5HcmFwaGljcztcblxuXHR3YWxsQ29sbGlzaW9uU291bmQ6IFBoYXNlci5Tb3VuZDtcblx0dGFkYVNvdW5kOiBQaGFzZXIuU291bmQ7XG5cblx0Y29uc3RydWN0b3IoZ2FtZSkge1xuXHRcdHN1cGVyKGdhbWUpO1xuXHR9XG5cblx0aW5pdChzdGFnZUluZm8gOiBTdGFnZSkge1xuXHRcdHRoaXMuc3RhZ2VJbmZvID0gc3RhZ2VJbmZvO1xuXHRcdHRoaXMucGxheWVyUGF0aCA9ICdhc3NldHMvaW1nL3BsYXllci1zcHJlYWRzaGVldC5wbmcnO1xuXHR9XG5cblx0cHJlbG9hZCgpIHtcblx0XHR0aGlzLmdhbWUubG9hZC5pbWFnZSgnZmxvb3InLCB0aGlzLnN0YWdlSW5mby5mbG9vckZpbGVQYXRoKTtcblx0XHR0aGlzLmdhbWUubG9hZC5pbWFnZSgnd2FsbCcsIHRoaXMuc3RhZ2VJbmZvLndhbGxGaWxlUGF0aCk7XG5cdFx0dGhpcy5nYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ3BsYXllcicsIHRoaXMucGxheWVyUGF0aCwgNjQsIDY0LCAzNik7XG5cdFx0dGhpcy5sb2FkLmF1ZGlvKFwid2FsbENvbGxpc2lvblNvdW5kXCIsIFtcImFzc2V0cy9tcDMvYmVlcC0wMWEubXAzXCJdKTtcblx0XHR0aGlzLmxvYWQuYXVkaW8oXCJ0YWRhU291bmRcIiwgW1wiYXNzZXRzL21wMy90YWRhLTAxYS5tcDNcIl0pO1xuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMud2FsbENvbGxpc2lvblNvdW5kID0gdGhpcy5hZGQuYXVkaW8oJ3dhbGxDb2xsaXNpb25Tb3VuZCcpO1xuXHRcdHRoaXMudGFkYVNvdW5kID0gdGhpcy5hZGQuYXVkaW8oJ3RhZGFTb3VuZCcpO1xuXG5cdFx0dGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwMDAwJzsgXG5cdFx0Ly8gdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcweGZmZmZmZic7IFxuXG5cdFx0dGhpcy5nYW1lLndvcmxkLnNldEJvdW5kcygwLCAwLCB0aGlzLndvcmxkLndpZHRoLCB0aGlzLndvcmxkLmhlaWdodC0xMjApO1xuXHRcdFxuXHRcdHRoaXMuY3JlYXRlRmxvb3IoKTtcblx0XHR0aGlzLm1ha2VGaXJzdEV4aXRQb2ludCgpO1xuXHRcdHRoaXMuY3JlYXRlV2FsbCgpO1xuXHRcdHRoaXMuY3JlYXRlUGxheWVyKCk7IFxuXG5cdFx0dGhpcy5nYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIsIFBoYXNlci5DYW1lcmEuRk9MTE9XX0xPQ0tPTiwgMC4xLCAwLjEpO1xuXG5cdFx0dGhpcy5jcmVhdGVNYXNrKCk7XG5cblx0XHR0aGlzLmZsb29yLm1hc2sgPSB0aGlzLm1hc2s7XG5cblx0XHR0aGlzLnRpbWVyID0gdGhpcy5nYW1lLnRpbWUuY3JlYXRlKGZhbHNlKTtcblxuXHRcdHRoaXMuY3Vyc29yID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcblx0XHR0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkQ2FsbGJhY2tzKHRoaXMsIChrZXkpID0+IHtcblx0XHRcdC8vVE9ETzogd2FzZCDqsIDriqXtlZjqsowg7ZWgIOqyg1xuXHRcdFx0aWYgKGtleS5rZXlDb2RlID09PSA4Nykge1x0XHQvLyBXLCBVcFxuXHRcdFx0XHRcblx0XHRcdH0gZWxzZSBpZiAoa2V5LmtleSA9PT0gNjUpIHtcdC8vIEEsIExlZnRcblx0XHRcdFxuXHRcdFx0fSBlbHNlIGlmIChrZXkua2V5ID09PSA4Mykge1x0Ly8gUywgRG93blxuXHRcdFx0XG5cdFx0XHR9IGVsc2UgaWYgKGtleS5rZXkgPT09IDY4KSB7XHQvLyBELCBSaWdodFxuXHRcdFx0XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLmNyZWF0ZVRpbWVyKCk7XG5cdH1cblxuXHRwcml2YXRlIGNyZWF0ZVRpbWVyKCkge1xuXHRcdHRoaXMudGltZVRleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQodGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIDUwMCwgJ1RpbWVyOiAwIHNlY29uZCcsIHtcblx0XHRcdGZpbGw6ICcjZmZmZmZmJyxcblx0XHRcdGZvbnQ6ICcxNXB4IEFyaWFsJ1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5zdGFydFRpbWVyKCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXJ0VGltZXIoKSB7XG5cdFx0dGhpcy5lbGFwc2VkVGltZSA9IDA7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0dGhpcy50aW1lSGFuZGxlciA9IHNldEludGVydmFsKCgpID0+IHtcblx0XHRcdHNlbGYuZWxhcHNlZFRpbWUrKztcblx0XHR9LCAxMDAwKTtcblx0fVxuXG5cdHByaXZhdGUgc3RvcFRpbWVyKCkge1xuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy50aW1lSGFuZGxlcik7XG5cdH1cblxuXHRwcml2YXRlIGNvdW50VGltZSgpIHtcblx0XHQvLyB0aGlzLmVsYXBzZWRUaW1lID0gdGhpcy5nYW1lLnRpbWUudG90YWxFbGFwc2VkU2Vjb25kcygpO1xuXG5cdFx0bGV0IHRpbWVUZXh0ID0gJ1RpbWVyOiAnICsgdGhpcy5lbGFwc2VkVGltZSArICcgc2Vjb25kcydcblx0XHR0aGlzLnRpbWVUZXh0LnNldFRleHQodGltZVRleHQsIHRydWUpO1xuXHR9XG5cblxuXHR1cGRhdGUoKSB7XG5cdFx0dGhpcy5tb3ZlUGxheWVyKCk7XG5cdFx0dGhpcy5tb3ZlRmxhc2goKTtcblx0XHR0aGlzLnJhbmRvbUFscGhhVG8odGhpcy5mbG9vcik7XG5cdFx0dGhpcy5jb3VudFRpbWUoKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLmdhbWUuZGVidWcuaW5wdXRJbmZvKDMyLCAzMik7XG5cblx0XHRcblx0fVxuXG5cdHByaXZhdGUgbWFrZUZpcnN0RXhpdFBvaW50KCkge1xuXHRcdGNvbnN0IGlkeE9mRXhpdFBvaW50ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSoxMSAlIHRoaXMuc3RhZ2VJbmZvLmV4aXRQb2ludHMubGVuZ3RoO1xuXHRcdHRoaXMuc3RhZ2VJbmZvLmV4aXRQb2ludHNbaWR4T2ZFeGl0UG9pbnRdLmFjdGl2ZSA9IHRydWU7XG5cdFx0dGhpcy5jdXJyZW50RXhpdFBvaW50ID0gdGhpcy5zdGFnZUluZm8uZXhpdFBvaW50c1tpZHhPZkV4aXRQb2ludF07XG5cdFx0dGhpcy5yZW5kZXJFeGl0UG9pbnQodGhpcy5jdXJyZW50RXhpdFBvaW50KTtcblx0fVxuXG5cdHByaXZhdGUgcmVuZGVyRXhpdFBvaW50KGV4aXRQb2ludCA6IFBvaW50KSB7XG5cdFx0Y29uc3QgZ3JhcGhpY2FsUG9pbnQgPSAoeCwgeSkgPT4ge1xuXHRcdFx0dGhpcy5jdXJyZW50RXhpdEdyYXBoaWMgPSB0aGlzLmdhbWUuYWRkLmdyYXBoaWNzKDAsIDApO1xuXHRcdFx0dGhpcy5jdXJyZW50RXhpdEdyYXBoaWMuYmVnaW5GaWxsKDB4ZmYwMDAwLCAwLjgpO1xuXHRcdFx0dGhpcy5jdXJyZW50RXhpdEdyYXBoaWMuZHJhd0NpcmNsZSh4LCB5LCAxMCk7XG5cdFx0XHR0aGlzLmN1cnJlbnRFeGl0R3JhcGhpYy5lbmRGaWxsKCk7XG5cdFx0fTtcblxuXHRcdGdyYXBoaWNhbFBvaW50KGV4aXRQb2ludC54LCBleGl0UG9pbnQueSk7XG5cdH1cblxuXHRwcml2YXRlIHJhbmRvbUFscGhhVG8ob2JqIDphbnkpIHtcblx0XHRvYmouYWxwaGEgPSAwLjUgKyBNYXRoLnJhbmRvbSgpICogMC41O1xuXHR9XG5cblx0cHJpdmF0ZSBjcmVhdGVQbGF5ZXIoKSB7XG5cdFx0dGhpcy5wbGF5ZXIgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSg3NSwgNzUsICdwbGF5ZXInKTtcblx0XHR0aGlzLnBsYXllci5hbmNob3Iuc2V0KC41LCAuNSk7XHRcblxuXHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMuYWRkKCdub3J0aCcsIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4XSwgMTAsIHRydWUpO1xuXHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMuYWRkKCd3ZXN0JywgWzksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxN10sIDEwLCB0cnVlKTtcblx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgnc291dGgnLCBbMTgsIDE5LCAyMCwgMjEsIDIyLCAyMywgMjQsIDI1LCAyNl0sIDEwLCB0cnVlKTtcblx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgnZWFzdCcsIFsyNywgMjgsIDI5LCAzMCwgMzEsIDMyLCAzMywgMzQsIDM1IF0sIDEwLCB0cnVlKTtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlRmxvb3IoKSB7XG5cdFx0dGhpcy5mbG9vciA9IHRoaXMuZ2FtZS5hZGQuc3ByaXRlKDAsIDAsICdmbG9vcicpO1xuXHRcdHRoaXMuZmxvb3Iud2lkdGggPSA2NDA7XG5cdFx0dGhpcy5mbG9vci5oZWlnaHQgPSA0ODA7XG5cdH1cblxuXHRwcml2YXRlIGNyZWF0ZU1hc2soKSB7XG5cdFx0dGhpcy5tYXNrID0gdGhpcy5nYW1lLmFkZC5ncmFwaGljcygwLCAwKTtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlV2FsbCgpIHtcblx0XHR0aGlzLndhbGxzQml0TWFwID0gdGhpcy5nYW1lLm1ha2UuYml0bWFwRGF0YSg2NDAsIDQ4MCk7XG5cdFx0dGhpcy53YWxsc0JpdE1hcC5kcmF3KCd3YWxsJyk7XG5cdFx0dGhpcy53YWxsc0JpdE1hcC51cGRhdGUoKTtcblx0XHR0aGlzLndhbGwgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSgwLCAwLCB0aGlzLndhbGxzQml0TWFwKTtcblx0fVxuXG5cdHByaXZhdGUgbW92ZUZsYXNoKCkge1xuXHRcdGNvbnN0IHBsYXllcldpZHRoID0gdGhpcy5wbGF5ZXIud2lkdGg7XG5cdFx0Y29uc3QgcGxheWVySGVpZ2h0ID0gdGhpcy5wbGF5ZXIuaGVpZ2h0O1xuXG5cdFx0Y29uc3QgcGxheWVyWCA9IHRoaXMucGxheWVyLng7XG5cdFx0Y29uc3QgcGxheWVyWSA9IHRoaXMucGxheWVyLnk7XG5cdFx0XG5cdFx0Y29uc3QgZHkgPSB0aGlzLmdhbWUuaW5wdXQueSAtIHBsYXllclk7XG5cdFx0Y29uc3QgZHggPSB0aGlzLmdhbWUuaW5wdXQueCAtIHBsYXllclg7XG5cblx0XHRjb25zdCBtb3VzZUFuZ2xlID0gTWF0aC5hdGFuMihkeSwgZHgpO1xuXG5cdFx0dGhpcy5tYXNrLmNsZWFyKCk7XG5cdFx0dGhpcy5tYXNrLmxpbmVTdHlsZSgyLCAweGZmZmZmZiwgMSk7XG5cblx0XHR0aGlzLm1hc2suYmVnaW5GaWxsKDB4MDAwMDAwKTtcblx0XHR0aGlzLm1hc2subW92ZVRvKHBsYXllclgsIHBsYXllclkpO1xuXHRcdGZvciAobGV0IGk9MDsgaTxQbGF5Lm51bU9mUmF5czsgaSsrKSB7XG5cdFx0XHRjb25zdCByYXlBbmdsZSA9IG1vdXNlQW5nbGUgLSAoUGxheS5saWdodEFuZ2xlLzIpICsgKFBsYXkubGlnaHRBbmdsZS9QbGF5Lm51bU9mUmF5cykgKiBpO1xuXHRcdFx0bGV0IGxhc3RYID0gcGxheWVyWDtcblx0XHRcdGxldCBsYXN0WSA9IHBsYXllclk7XG5cdFx0XHRcblx0XHRcdGZvciAobGV0IGo9MTsgajw9UGxheS5yYXlMZW5ndGg7IGorKykge1xuXHRcdFx0XHRjb25zdCB4ID0gTWF0aC5yb3VuZChwbGF5ZXJYICsgKGogKiBNYXRoLmNvcyhyYXlBbmdsZSkpKTtcblx0XHRcdFx0Y29uc3QgeSA9IE1hdGgucm91bmQocGxheWVyWSArIChqICogTWF0aC5zaW4ocmF5QW5nbGUpKSk7XG5cblx0XHRcdFx0Y29uc3QgY29sb3IgPSB0aGlzLnBpY2tDb2xvck9mKHgsIHksIHRoaXMud2FsbHNCaXRNYXApO1xuXHRcdFx0XHRpZiAoY29sb3IgPT0gMCkge1xuXHRcdFx0XHRcdGxhc3RYID0geDtcblx0XHRcdFx0XHRsYXN0WSA9IHk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5tYXNrLmxpbmVUbyhsYXN0WCwgbGFzdFkpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLm1hc2subGluZVRvKGxhc3RYLCBsYXN0WSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5tYXNrLmxpbmVUbyhwbGF5ZXJYLCBwbGF5ZXJZKTtcblx0XHR0aGlzLm1hc2suZW5kRmlsbCgpO1xuXHR9XG5cblx0cHJpdmF0ZSBtb3ZlUGxheWVyKCkge1xuXHRcdGxldCB4U3BlZWQgPSAwO1xuXHRcdGxldCB5U3BlZWQgPSAwO1xuXHRcdGxldCBpc01vdmluZyA9IGZhbHNlO1xuXHRcdGxldCBjYW5Nb3ZlID0gZmFsc2U7XG5cblx0XHRjb25zdCBwbGF5ZXJXaWR0aCA9IHRoaXMucGxheWVyLndpZHRoO1xuXHRcdGNvbnN0IHBsYXllckhlaWdodCA9IHRoaXMucGxheWVyLmhlaWdodDtcblxuXHRcdGNvbnN0IHBsYXllclggPSB0aGlzLnBsYXllci54O1xuXHRcdGNvbnN0IHBsYXllclkgPSB0aGlzLnBsYXllci55O1xuXG5cdFx0Y29uc3QgY29sb3IgPSB7XG5cdFx0XHRub3J0aCA6IDAsXG5cdFx0XHRzb3V0aCA6IDAsXG5cdFx0XHR3ZXN0IDogMCxcblx0XHRcdGVhc3QgOiAwXG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY3Vyc29yLnVwLmlzRG93bikge1xuXHRcdFx0eVNwZWVkIC09IHRoaXMuc3BlZWQ7XG5cdFx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ25vcnRoJyk7XG5cdFx0XHRjb25zdCBub3J0aEVhc3QgPSB0aGlzLnBpY2tDb2xvck9mKHBsYXllclggKyBwbGF5ZXJXaWR0aC8yICsgeFNwZWVkLCBwbGF5ZXJZIC0gcGxheWVySGVpZ2h0LzIgKyB5U3BlZWQsIHRoaXMud2FsbHNCaXRNYXApO1xuXHRcdFx0Y29uc3Qgbm9ydGhXZXN0ID0gdGhpcy5waWNrQ29sb3JPZihwbGF5ZXJYIC0gcGxheWVyV2lkdGgvMiArIHhTcGVlZCwgcGxheWVyWSAtIHBsYXllckhlaWdodC8yICsgeVNwZWVkLCB0aGlzLndhbGxzQml0TWFwKTtcblx0XHRcdGNvbG9yLm5vcnRoID0gbm9ydGhFYXN0ICsgbm9ydGhXZXN0O1xuXHRcdH1cblx0XHRcblx0XHRpZiAodGhpcy5jdXJzb3IuZG93bi5pc0Rvd24pIHtcblx0XHRcdHlTcGVlZCArPSB0aGlzLnNwZWVkO1xuXHRcdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdzb3V0aCcpO1xuXHRcdFx0Y29uc3Qgc291dGhFYXN0ID0gdGhpcy5waWNrQ29sb3JPZihwbGF5ZXJYICsgcGxheWVyV2lkdGgvMiArIHhTcGVlZCwgcGxheWVyWSArIHBsYXllckhlaWdodC8yICsgeVNwZWVkLCB0aGlzLndhbGxzQml0TWFwKTtcblx0XHRcdGNvbnN0IHNvdXRoV2VzdCA9IHRoaXMucGlja0NvbG9yT2YocGxheWVyWCAtIHBsYXllcldpZHRoLzIgKyB4U3BlZWQsIHBsYXllclkgKyBwbGF5ZXJIZWlnaHQvMiArIHlTcGVlZCwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdFx0XHRjb2xvci5zb3V0aCA9IHNvdXRoRWFzdCArIHNvdXRoV2VzdDtcblx0XHR9XG5cdFx0XG5cdFx0aWYgKHRoaXMuY3Vyc29yLmxlZnQuaXNEb3duKSB7XG5cdFx0XHR4U3BlZWQgLT0gdGhpcy5zcGVlZDtcblx0XHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnd2VzdCcpO1xuXHRcdFx0Y29uc3Qgd2VzdE5vcnRoID0gdGhpcy5waWNrQ29sb3JPZihwbGF5ZXJYIC0gcGxheWVyV2lkdGgvMiArIHhTcGVlZCwgcGxheWVyWSAtIHBsYXllckhlaWdodC8yICsgeVNwZWVkLCB0aGlzLndhbGxzQml0TWFwKTtcblx0XHRcdGNvbnN0IHdlc3RTb3V0aCA9IHRoaXMucGlja0NvbG9yT2YocGxheWVyWCAtIHBsYXllcldpZHRoLzIgKyB4U3BlZWQsIHBsYXllclkgKyBwbGF5ZXJIZWlnaHQvMiArIHlTcGVlZCwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdFx0XHRjb2xvci53ZXN0ID0gd2VzdE5vcnRoICsgd2VzdFNvdXRoO1xuXHRcdH1cblx0XHRcblx0XHRpZiAodGhpcy5jdXJzb3IucmlnaHQuaXNEb3duKSB7XG5cdFx0XHR4U3BlZWQgKz0gdGhpcy5zcGVlZDtcblx0XHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnZWFzdCcpO1xuXHRcdFx0Y29uc3QgZWFzdE5vcnRoID0gdGhpcy5waWNrQ29sb3JPZihwbGF5ZXJYICsgcGxheWVyV2lkdGgvMiArIHhTcGVlZCwgcGxheWVyWSAtIHBsYXllckhlaWdodC8yICsgeVNwZWVkLCB0aGlzLndhbGxzQml0TWFwKTtcblx0XHRcdGNvbnN0IGVhc3RTb3V0aCA9IHRoaXMucGlja0NvbG9yT2YocGxheWVyWCArIHBsYXllcldpZHRoLzIgKyB4U3BlZWQsIHBsYXllclkgKyBwbGF5ZXJIZWlnaHQvMiArIHlTcGVlZCwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdFx0XHRjb2xvci5lYXN0ID0gZWFzdE5vcnRoICsgZWFzdFNvdXRoO1xuXHRcdH1cblxuXHRcdGlzTW92aW5nID0gTWF0aC5hYnMoeFNwZWVkKSArIE1hdGguYWJzKHlTcGVlZCkgPCB0aGlzLnNwZWVkKjIgJiYgTWF0aC5hYnMoeFNwZWVkKSArIE1hdGguYWJzKHlTcGVlZCkgPiAwO1xuXHRcdGNhbk1vdmUgPSBjb2xvci5ub3J0aCArIGNvbG9yLnNvdXRoICsgY29sb3IuZWFzdCArIGNvbG9yLndlc3QgPT0gMDtcblx0XHRpZiAoaXNNb3ZpbmcgJiYgY2FuTW92ZSkge1xuXHRcdFx0dGhpcy5wbGF5ZXIueCArPSB4U3BlZWQ7XG5cdFx0XHR0aGlzLnBsYXllci55ICs9IHlTcGVlZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zdG9wUGxheWVyQW5pbWNhdGVpb24oKTtcblx0XHR9XG5cblx0XHRpZiAoaXNNb3ZpbmcgJiYgIWNhbk1vdmUpIHtcblx0XHRcdHRoaXMuZ2FtZS5jYW1lcmEuc2hha2UoKTtcblx0XHRcdHRoaXMud2FsbENvbGxpc2lvblNvdW5kLnBsYXkoKTtcblx0XHR9XG5cblx0XHRcblx0XHRpZiAoTWF0aC5hYnModGhpcy5jdXJyZW50RXhpdFBvaW50LngtdGhpcy5wbGF5ZXIueCkgPCAzICYmIE1hdGguYWJzKHRoaXMucGxheWVyLnktdGhpcy5jdXJyZW50RXhpdFBvaW50LnkpIDwgMykge1xuXHRcdFx0YWxlcnQoJ0NvbmdyYXQhJyk7XG5cdFx0XHR0aGlzLnRhZGFTb3VuZC5wbGF5KCk7XG5cblx0XHRcdGNvbnN0IHVzZXJJZCA9IHRoaXMuc2VydmljZUNvbnRyb2xsZXIuYXV0aFNlcnZpY2UuZ2V0TGFzdExvZ2dlZEluVXNlcigpLnVzZXJJZDtcblx0XHRcdGNvbnN0IHN0YWdlSWQgPSB0aGlzLnN0YWdlSW5mby5zdGFnZUlkO1xuXHRcdFx0Y29uc3QgcmFuayA9IHRoaXMuc2VydmljZUNvbnRyb2xsZXIucmFua1NlcnZpY2UuY2FsY3VsYXRlUmFuayhzdGFnZUlkLCB0aGlzLmVsYXBzZWRUaW1lKTtcblxuXHRcdFx0Y29uc3Qgc3RhZ2VSZWNvcmQgPSBuZXcgU3RhZ2VSZWNvcmQoc3RhZ2VJZCwgcmFuaywgdGhpcy5lbGFwc2VkVGltZSk7XG5cdFx0XHRjb25zdCBzdGFnZVJlY29yZE9iaiA9IHt9O1xuXHRcdFx0c3RhZ2VSZWNvcmRPYmpbc3RhZ2VJZF0gPSBzdGFnZVJlY29yZDtcblx0XHRcdGNvbnN0IHJlY29yZCA9IG5ldyBSZWNvcmQodXNlcklkLCBzdGFnZVJlY29yZE9iaik7XG5cdFx0XHR0aGlzLnNlcnZpY2VDb250cm9sbGVyLnJlY29yZFJhbmsocmVjb3JkKTtcblx0XHRcdFxuXHRcdFx0Y29uc3Qgc3RhZ2VJbmZvID0gdGhpcy5zZXJ2aWNlQ29udHJvbGxlci5nZXRTdGFnZUluZm9ybWF0aW9uKCk7XG5cdFx0XHR0aGlzLnN0YXRlQ29udHJvbGxlci5nb1N0YXRlKCdMZXZlbCcsIHRydWUsIHRydWUsIHN0YWdlSW5mbyk7XG5cblx0XHRcdHRoaXMuc3RvcFRpbWVyKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBwaWNrQ29sb3JPZih4OiBudW1iZXIsIHk6IG51bWJlciwgYml0TWFwRGF0YTogUGhhc2VyLkJpdG1hcERhdGEpIHtcblx0XHRjb25zdCBjb2xvciA9IGJpdE1hcERhdGEuZ2V0UGl4ZWwzMih4LCB5KTtcblx0XHRyZXR1cm4gY29sb3I7XG5cdH1cblxuXHRwcml2YXRlIHN0b3BQbGF5ZXJBbmltY2F0ZWlvbigpIHtcblx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLnN0b3AoJ25vcnRoJyk7XG5cdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5zdG9wKCdzb3V0aCcpO1xuXHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMuc3RvcCgnd2VzdCcpO1xuXHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMuc3RvcCgnZWFzdCcpO1xuXHR9XG59IiwiaW1wb3J0IFV0aWwgZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudC9pbnB1dFRleHQnO1xuaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlJztcbmltcG9ydCBVc2VyIGZyb20gJy4uL3ZvL3VzZXInO1xuaW1wb3J0IFNjb3JlIGZyb20gJy4uL3ZvL3Njb3JlJztcblxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyIGV4dGVuZHMgQmFzZSB7XG5cdGlucHV0VGV4dCA6IENvbXBvbmVudC5JbnB1dFRleHQ7XG5cdHJlZ2lzdGVyQnRuIDogUGhhc2VyLlRleHQ7XG5cblx0Y29uc3RydWN0b3IoZ2FtZSkge1xuXHRcdHN1cGVyKGdhbWUpO1xuXHR9XG5cblx0cHJlbG9hZCgpIHtcblx0XHRcblx0fVxuXG5cdHByaXZhdGUgc2V0UmVnaXN0ZXJJbnB1dFRleHQoKSB7XG5cdFx0bGV0IHRleHRXaWR0aCA9IDIwMDtcblx0XHRsZXQgdGV4dEhlaWdodCA9IDgwO1xuXHRcdGxldCB0ZXh0WCA9IHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYIC0gdGV4dFdpZHRoLzI7XG5cdFx0bGV0IHRleHRZID0gdGhpcy5nYW1lLndvcmxkLmNlbnRlclkgLSB0ZXh0SGVpZ2h0LzI7XG5cblx0XHRsZXQgdGV4dE1heExlbmd0aCA9IDE0O1xuXG5cdFx0bGV0IHRleHRTdHlsZSA9IHtcblx0XHRcdGZpbGw6ICcjMDAwMDAwJyxcblx0XHRcdGJvdW5kc0FsaWduSDogJ2NlbnRlcicsXG5cdFx0XHRib3VuZHNBbGlnblY6ICdtaWRkbGUnLFxuXHRcdFx0Zm9udDogJzIwcHggQXJpYWwnXG5cdFx0fVxuXG5cdFx0dGhpcy5pbnB1dFRleHQgPSBuZXcgQ29tcG9uZW50LklucHV0VGV4dCh0aGlzLmdhbWUsIHRleHRYLCB0ZXh0WSwgdGV4dFdpZHRoLCB0ZXh0SGVpZ2h0LCB0ZXh0TWF4TGVuZ3RoLCAnZXgpdXNlcjAwMScsIHRleHRTdHlsZSk7XG5cdH1cblxuXHRwcml2YXRlIHNldFJlZ2lzdGVyQnV0dG9uKCkge1xuXHRcdGxldCBidG5XaWR0aCA9IDIwMDtcblx0XHRsZXQgYnRuSGVpZ2h0ID0gODA7XG5cdFx0XG5cdFx0bGV0IGJ0blggPSB0aGlzLmdhbWUud29ybGQuY2VudGVyWDsvLyAtIGJ0bldpZHRoLzI7XG5cdFx0bGV0IGJ0blkgPSB0aGlzLmdhbWUud29ybGQuY2VudGVyWSArIDEyMDsvLyAtIGJ0bkhlaWdodC8yICsgMTAwO1xuXG5cdFx0bGV0IGJ0blRleHQgPSAnUmVnaXN0ZXInO1xuXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cblx0XHRsZXQgdGV4dFN0eWxlID0ge1xuXHRcdFx0ZmlsbDogJyMwMDAwMDAnLFxuXHRcdFx0Ym91bmRzQWxpZ25IOiAnY2VudGVyJyxcblx0XHRcdGJvdW5kc0FsaWduVjogJ21pZGRsZScsXG5cdFx0XHRmb250OiAnMjBweCBBcmlhbCdcblx0XHR9XG5cdFx0dGhpcy5yZWdpc3RlckJ0biA9IHRoaXMuZ2FtZS5hZGQudGV4dChidG5YLCBidG5ZLCBidG5UZXh0LCB0ZXh0U3R5bGUpO1xuXHRcdHRoaXMucmVnaXN0ZXJCdG4uYW5jaG9yLnNldFRvKC41LCAuNSk7XG5cdFx0XG5cdFx0dGhpcy5yZWdpc3RlckJ0bi5pbnB1dEVuYWJsZWQgPSB0cnVlO1xuXHRcdHRoaXMucmVnaXN0ZXJCdG4uaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XG5cblx0XHR0aGlzLnJlZ2lzdGVyQnRuLmV2ZW50cy5vbklucHV0RG93bi5hZGQoKGUpID0+IHtcblx0XHRcdGNvbnN0IHVzZXJJZCA9IHNlbGYuaW5wdXRUZXh0LnRleHQ7XG5cdFx0XHRpZiAoY29uZmlybShgJHt1c2VySWR964uY7Jy866GcIO2VmOyLnOqyoOyKteuLiOq5jD9gKSkge1xuXHRcdFx0XHRcblx0XHRcdFx0c2VsZi5zYXZlVXNlcklkKHVzZXJJZCwgKHVzZXIsIGlzQWxyZWFkeUV4aXN0KSA9PiB7XG5cdFx0XHRcdFx0aWYgKGlzQWxyZWFkeUV4aXN0KSB7XG5cdFx0XHRcdFx0XHRhbGVydChgJHtzZWxmLmlucHV0VGV4dC50ZXh0feuLmCDsmIjsoITsl5Ag7Jik7Iug7KCB7J207J6I7Jy87Iuc6rWw7JqULiDri6Tsi5wg7ZWc67KIIO2ZmOyYge2VqeuLiOuLpC5gKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzZWxmLnNlcnZpY2VDb250cm9sbGVyLmxvZ2luKHVzZXIudXNlcklkLCAodXNlciwgaXNTdWNjZXNzKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBzdGFnZUluZm8gPSBzZWxmLnNlcnZpY2VDb250cm9sbGVyLmdldFN0YWdlSW5mb3JtYXRpb24oKTtcblx0XHRcdFx0XHRcdHNlbGYuc3RhdGVDb250cm9sbGVyLmdvU3RhdGUoJ0xldmVsJywgdHJ1ZSwgdHJ1ZSwgc3RhZ2VJbmZvKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSwgdGhpcyk7XG5cblx0XHR0aGlzLnJlZ2lzdGVyQnRuLmV2ZW50cy5vbklucHV0T3Zlci5hZGQoKGUpID0+IHtcblx0XHRcdHRoaXMucmVnaXN0ZXJCdG4uYWxwaGEgPSAwLjc7XG5cdFx0fSwgdGhpcyk7XG5cblx0XHR0aGlzLnJlZ2lzdGVyQnRuLmV2ZW50cy5vbklucHV0T3V0LmFkZCgoZSkgPT4ge1xuXHRcdFx0dGhpcy5yZWdpc3RlckJ0bi5hbHBoYSA9IDE7XG5cdFx0fSwgdGhpcyk7XG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0dGhpcy5zZXRSZWdpc3RlcklucHV0VGV4dCgpO1xuXHRcdHRoaXMuc2V0UmVnaXN0ZXJCdXR0b24oKTtcblx0XHRcblx0fVxuXG5cdHNhdmVVc2VySWQodXNlcklkLCBjYWxsYmFjaykge1xuXHRcdGNvbnN0IHVzZXIgPSBuZXcgVXNlcih1c2VySWQsIG5ldyBTY29yZSgpKTtcblx0XHR0aGlzLnNlcnZpY2VDb250cm9sbGVyLnJlZ2lzdGVyVXNlcih1c2VyLCBjYWxsYmFjayk7XG5cdH1cbn0iLCJleHBvcnQgY2xhc3MgUG9pbnQge1xuXHR4OiBudW1iZXI7XG5cdHk6IG51bWJlcjtcblx0YWN0aXZlOiBib29sZWFuO1xuXG5cdGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTpudW1iZXIpIHtcblx0XHR0aGlzLnggPSB4O1xuXHRcdHRoaXMueSA9IHk7XG5cdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgb24oeDogbnVtYmVyLCB5Om51bWJlcikge1xuXHRcdHJldHVybiBuZXcgUG9pbnQoeCx5KTtcblx0fVxufSIsImV4cG9ydCBlbnVtIFJhbmsge1xuXHROT05FID0gMCxcblx0UyA9IDEsXG5cdEEgPSAyLFxuXHRCID0gMyxcblx0QyA9IDQsXG5cdEQgPSA1LFxuXHRFID0gNixcblx0RiA9IDdcbn1cblxuXG5leHBvcnQgY2xhc3MgUmFua1V0aWwge1xuXHRzdGF0aWMgdmFsdWVPZihyYW5rOiBSYW5rKTogc3RyaW5nIHtcblx0XHRsZXQgcmV0ID0gJyc7XG5cblx0XHRzd2l0Y2gocmFuaykge1xuXHRcdFx0Y2FzZSBSYW5rLk5PTkU6IHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFJhbmsuUzoge1xuXHRcdFx0XHRyZXQgPSAnUyc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBSYW5rLkE6IHtcblx0XHRcdFx0cmV0ID0gJ0EnO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgUmFuay5COiB7XG5cdFx0XHRcdHJldCA9ICdCJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFJhbmsuQzoge1xuXHRcdFx0XHRyZXQgPSAnQyc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBSYW5rLkQ6IHtcblx0XHRcdFx0cmV0ID0gJ0QnO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgUmFuay5FOiB7XG5cdFx0XHRcdHJldCA9ICdFJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFJhbmsuRjoge1xuXHRcdFx0XHRyZXQgPSAnRic7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRyZXQgPSAnJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9XG59IiwiaW1wb3J0IHsgUmFuayB9IGZyb20gXCIuL3JhbmtcIjtcbmltcG9ydCBWbyBmcm9tIFwiLi92b1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmQgZXh0ZW5kcyBWbyB7XG5cdHVzZXJJZDogc3RyaW5nO1xuXHRyZWNvcmRzOiBhbnk7XG5cblx0Y29uc3RydWN0b3IodXNlcklkLCByZWNvcmRzKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnVzZXJJZCA9IHVzZXJJZDtcblx0XHR0aGlzLnJlY29yZHMgPSByZWNvcmRzO1xuXHR9XG5cblx0cHV0KHJlY29yZDogU3RhZ2VSZWNvcmQpIHtcblx0XHR0aGlzLnJlY29yZHNbcmVjb3JkLnN0YWdlSWRdID0ge1xuXHRcdFx0c3RhZ2VJZDogcmVjb3JkLnN0YWdlSWQsXG5cdFx0XHRyYW5rOiByZWNvcmQucmFuayxcblx0XHRcdHRpbWU6IHJlY29yZC50aW1lXG5cdFx0fVxuXHRcdC8vIHRoaXMucmVjb3Jkc1tyZWNvcmQuc3RhZ2VJZF0gPSByZWNvcmQ7XG5cdH1cblxuXHR0b0pzb24oKSB7XG5cdFx0bGV0IHJlY29yZHMgPSB7fTtcblxuXHRcdGZvciAobGV0IHAgaW4gdGhpcy5yZWNvcmRzKSB7XG5cdFx0XHRyZWNvcmRzW3BdID0gdGhpcy5yZWNvcmRzW3BdLnRvSnNvbigpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR1c2VySWQ6IHRoaXMudXNlcklkLFxuXHRcdFx0cmVjb3JkczogcmVjb3Jkc1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgYnkoanNvbiA6IGFueSk6IFJlY29yZCB7XG5cdFx0aWYgKGpzb24gPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdGNvbnN0IHVzZXI6IFJlY29yZCA9IG5ldyBSZWNvcmQoanNvbi51c2VySWQsIGpzb24ucmVjb3Jkcyk7XG5cdFx0cmV0dXJuIHVzZXI7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIFN0YWdlUmVjb3JkIGV4dGVuZHMgVm8ge1xuXHRzdGFnZUlkOiBudW1iZXI7XG5cdHJhbms6IFJhbms7XG5cdHRpbWU6IG51bWJlcjtcblxuXHRjb25zdHJ1Y3RvcihzdGFnZUlkLCByYW5rOiBSYW5rLCB0aW1lKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnN0YWdlSWQgPSBzdGFnZUlkO1xuXHRcdHRoaXMucmFuayA9IHJhbms7XG5cdFx0dGhpcy50aW1lID0gdGltZTtcblx0fVxuXG5cdHRvSnNvbigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c3RhZ2VJZDogdGhpcy5zdGFnZUlkLFxuXHRcdFx0cmFuazogdGhpcy5yYW5rLFxuXHRcdFx0dGltZTogdGhpcy50aW1lXG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IHsgUmFuayB9IGZyb20gXCIuL3JhbmtcIjtcbmltcG9ydCBWbyBmcm9tIFwiLi92b1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yZSBleHRlbmRzIFZvIHtcblx0dGltZSA6IG51bWJlcjtcblx0cmFuayA6IFJhbms7XG5cdFxuXHRjb25zdHJ1Y3Rvcih0aW1lPzogbnVtYmVyLCByYW5rPzogUmFuaykge1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLnRpbWUgPSB0aW1lIHwgMDtcblx0XHR0aGlzLnJhbmsgPSByYW5rIHwgUmFuay5OT05FO1xuXHR9XG5cblx0dG9Kc29uKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR0aW1lOiB0aGlzLnRpbWUsXG5cdFx0XHRyYW5rOiB0aGlzLnJhbmssXG5cdFx0fVxuXHR9XG5cdFxufSIsImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vcG9pbnRcIjtcbmltcG9ydCB7IE1hcFR5cGUgfSBmcm9tIFwiLi9tYXBUeXBlXCI7XG5pbXBvcnQgeyBSYW5rIH0gZnJvbSBcIi4vcmFua1wiO1xuXG5leHBvcnQgY2xhc3MgU3RhZ2Uge1xuXHRjb25zdHJ1Y3RvcihzdGFnZUlkOiBudW1iZXIsIGZsb29yRmlsZVBhdGg6IHN0cmluZywgd2FsbEZpbGVQYXRoOiBzdHJpbmcsIGV4aXRQb2ludHM6IEFycmF5PFBvaW50PiwgdGltZUxpbWl0PTUwMDApIHtcblx0XHR0aGlzLnN0YWdlSWQgPSBzdGFnZUlkO1xuXHRcdHRoaXMuZmxvb3JGaWxlUGF0aCA9IGZsb29yRmlsZVBhdGg7XG5cdFx0dGhpcy53YWxsRmlsZVBhdGggPSB3YWxsRmlsZVBhdGg7XG5cdFx0dGhpcy5leGl0UG9pbnRzID0gZXhpdFBvaW50cztcblxuXHRcdHRoaXMudGltZUxpbWl0ID0gdGltZUxpbWl0O1xuXHR9XG5cdFxuXHRzdGFnZUlkIDogbnVtYmVyO1xuXHRmbG9vckZpbGVQYXRoIDogc3RyaW5nO1xuXHR3YWxsRmlsZVBhdGggOiBzdHJpbmc7XG5cblx0ZXhpdFBvaW50cyA6IEFycmF5PFBvaW50Pjtcblx0dGltZUxpbWl0IDogbnVtYmVyO1xuXG5cdHRyZWFzdXJlUG9pbnRzIDogQXJyYXk8UG9pbnQ+O1xuXG5cdG1hcFR5cGU6IE1hcFR5cGU7XG5cblx0Ly9UT0RPOiA/Pz9cblx0c291bmQgOiBQaGFzZXIuU291bmQ7XG5cblx0XG59IiwiaW1wb3J0IFNjb3JlIGZyb20gXCIuL3Njb3JlXCI7XG5pbXBvcnQgVm8gZnJvbSBcIi4vdm9cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIFZvIHtcblx0dXNlcklkIDogc3RyaW5nO1xuXHRzY29yZSA6IFNjb3JlO1xuXHRyZWdpc3RlckRhdGUgOiBEYXRlO1xuXHRsYXN0VmlzaXREYXRlIDogRGF0ZTtcblxuXHRjb25zdHJ1Y3Rvcih1c2VySWQsIHNjb3JlKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnVzZXJJZCA9IHVzZXJJZDtcblx0XHR0aGlzLnNjb3JlID0gc2NvcmU7XG5cdFx0dGhpcy5yZWdpc3RlckRhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdHRoaXMubGFzdFZpc2l0RGF0ZSA9IG5ldyBEYXRlKCk7XG5cdH1cblxuXHRwdWJsaWMgc3RhdGljIGJ5KGpzb24gOiBhbnkpOiBVc2VyIHtcblx0XHRpZiAoanNvbiA9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0Y29uc3QgdXNlcjogVXNlciA9IG5ldyBVc2VyKGpzb24udXNlcklkLCBqc29uLnNjb3JlKTtcblx0XHR1c2VyLnJlZ2lzdGVyRGF0ZSA9IGpzb24ucmVnaXN0ZXJEYXRlO1xuXHRcdHVzZXIubGFzdFZpc2l0RGF0ZSA9IGpzb24ubGFzdFZpc2l0RGF0ZTtcblxuXHRcdHJldHVybiB1c2VyO1xuXHR9XG5cblx0dG9Kc29uKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR1c2VySWQ6IHRoaXMudXNlcklkLFxuXHRcdFx0c2NvcmU6IHRoaXMuc2NvcmUsXG5cdFx0XHRyZWdpc3RlckRhdGU6IHRoaXMucmVnaXN0ZXJEYXRlLFxuXHRcdFx0bGFzdFZpc2l0RGF0ZTogdGhpcy5sYXN0VmlzaXREYXRlLFxuXHRcdH07XG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBWbyB7XG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnRvSnNvbigpKTtcblx0fVxuXG5cdGFic3RyYWN0IHRvSnNvbigpIDogYW55O1xufSJdLCJzb3VyY2VSb290IjoiIn0=