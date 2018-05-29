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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC9pbnB1dFRleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXIvc2VydmljZUNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXIvc3RhdGVDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9kYW8vZGFvLnRzIiwid2VicGFjazovLy8uL3NyYy9kYW8vcmVjb3JkRGFvLnRzIiwid2VicGFjazovLy8uL3NyYy9kYW8vdXNlckRhby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hemUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2F1dGhTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9yYW5rU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvcmVjb3JkU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvc3RhZ2VTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXNzaW9uL2xvY2FsU3RvcmFnZVNlc3Npb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL2Jhc2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL2ludHJvLnRzIiwid2VicGFjazovLy8uL3NyYy9zdGF0ZS9sZXZlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUvbG9naW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL3BsYXkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL3JlZ2lzdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy92by9wb2ludC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdm8vcmFuay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdm8vcmVjb3JkLnRzIiwid2VicGFjazovLy8uL3NyYy92by9zY29yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdm8vc3RhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZvL3VzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZvL3ZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNuRU0sSUFBVyxTQUFTLENBb0d6QjtBQXBHRCxXQUFpQixTQUFTO0lBQ3pCLGVBQXVCLFNBQVEsTUFBTSxDQUFDLElBQUk7UUFxQnpDLFlBQVksSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUs7WUFDNUQsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFHLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQXJCakMsWUFBTyxHQUFHLEtBQUssQ0FBQztZQWtCaEIsZUFBVSxHQUFHLENBQUMsQ0FBQztZQUlkLElBQUksQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDO1lBQ2hDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQ3hCO1lBRUQsSUFBSSxDQUFDLENB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SztZQUNqQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDL0IsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1NBQ2pDLENBQUM7SUFDSCxDQUFDO0NBQ0Q7Ozs7Ozs7Ozs7Ozs7OztBQ3BDYTtJQUNiLFFBQVE7UUFDUCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUdEIiwiZmlsZSI6Im1hemUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJleHBvcnQgbmFtZXNwYWNlIENvbXBvbmVudCB7XG5cdGV4cG9ydCBjbGFzcyBJbnB1dFRleHQgZXh0ZW5kcyBQaGFzZXIuVGV4dCB7XG5cdFx0aXNGb2N1cyA9IGZhbHNlO1xuXG5cdFx0eCA6IG51bWJlcjtcblx0XHR5IDogbnVtYmVyO1xuXHRcdHdpZHRoIDogbnVtYmVyO1xuXHRcdGhlaWdodCA6IG51bWJlcjtcblxuXHRcdG1heExlbmd0aCA6IG51bWJlcjtcblxuXHRcdHBsYWNlaG9sZGVyIDogc3RyaW5nO1xuXG5cdFx0XG5cdFx0Ym9yZGVyUmVjdGFuZ2xlciA6IFBoYXNlci5SZWN0YW5nbGU7XG5cblx0XHR0ZXh0IDogc3RyaW5nO1xuXG5cdFx0cGhhc2VyVGV4dCA6IFBoYXNlci5UZXh0O1xuXG5cdFx0Y2xpY2tDb3VudCA9IDA7XG5cblx0XHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBtYXhMZW5ndGgsIHRleHQsIHN0eWxlKSB7XG5cdFx0XHRzdXBlcihnYW1lLCB4LCB5LCAgdGV4dCwgc3R5bGUpO1xuXHRcdFx0dGhpcy5wbGFjZWhvbGRlciA9ICdJbnB1dCBUZXh0Jztcblx0XHRcdGlmICh0ZXh0Lmxlbmd0aCA9PSAwKSB7XG5cdFx0XHRcdHRleHQgPSB0aGlzLnBsYWNlaG9sZGVyO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnggPSB4O1xuXHRcdFx0dGhpcy55ID0geTtcblx0XHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0XHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdFx0dGhpcy50ZXh0ID0gdGV4dDtcblx0XHRcdHRoaXMubWF4TGVuZ3RoID0gbWF4TGVuZ3RoID8gbWF4TGVuZ3RoIDogMjA7XG5cblx0XHRcdGxldCBncm91cCA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcblx0XHRcdGxldCBncmFwaGljcyA9IHRoaXMuZ2FtZS5tYWtlLmdyYXBoaWNzKCk7XG5cdFx0XHRncmFwaGljcy5saW5lU3R5bGUoMiwgMHgwMDAwMDAsIDEpO1xuXHRcdFx0Z3JhcGhpY3MuZHJhd1JlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG5cdFx0XHRncm91cC5hZGQoZ3JhcGhpY3MpO1xuXG5cdFx0XHR0aGlzLnBoYXNlclRleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQoeCwgeSwgdGV4dCwgc3R5bGUpO1xuXHRcdFx0dGhpcy5waGFzZXJUZXh0LnNldFRleHRCb3VuZHMoMCwgMCwgd2lkdGgsIGhlaWdodClcblx0XHRcdHRoaXMucGhhc2VyVGV4dC5hbHBoYSA9IDAuNjtcblxuXHRcdFx0dGhpcy5waGFzZXJUZXh0LmlucHV0RW5hYmxlZCA9IHRydWU7XG5cblx0XHRcdHRoaXMucGhhc2VyVGV4dC5ldmVudHMub25JbnB1dERvd24uYWRkKChzcHJpdGUsIHBvaW50ZXIpID0+IHtcblx0XHRcdFx0dGhpcy5pc0ZvY3VzID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5waGFzZXJUZXh0LmFscGhhID0gMTtcblx0XHRcdH0sIHRoaXMpO1xuXHRcdFx0XG5cblx0XHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdFx0dGhpcy5nYW1lLmlucHV0Lm9uRG93bi5hZGQoKHNwcml0ZSwgcG9pbnRlcikgPT4ge1xuXHRcdFx0XHRzZWxmLmNsaWNrQ291bnQrKztcblx0XHRcdFx0aWYgKHNlbGYuY2xpY2tDb3VudCA9PSAxKSB7XG5cdFx0XHRcdFx0c2VsZi5waGFzZXJUZXh0LnNldFRleHQoJycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IHRleHRYID0gc2VsZi5waGFzZXJUZXh0LndvcmxkLng7XG5cdFx0XHRcdGxldCB0ZXh0V2lkdGggPSBzZWxmLndpZHRoO1xuXG5cdFx0XHRcdGxldCB0ZXh0WSA9IHNlbGYucGhhc2VyVGV4dC53b3JsZC55O1xuXHRcdFx0XHRsZXQgdGV4dEhlaWdodCA9IHNlbGYuaGVpZ2h0O1xuXG5cdFx0XHRcdGlmIChwb2ludGVyLmNsaWVudFggPiB0ZXh0WCAmJiBwb2ludGVyLmNsaWVudFggPD0gdGV4dFggKyB0ZXh0V2lkdGgpIHtcblx0XHRcdFx0XHRpZiAocG9pbnRlci5jbGllbnRZID4gdGV4dFkgJiYgcG9pbnRlci5jbGllbnRZIDw9IHRleHRZICsgdGV4dEhlaWdodCkge1xuXHRcdFx0XHRcdFx0c2VsZi5pc0ZvY3VzID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHNlbGYucGhhc2VyVGV4dC5hbHBoYSA9IDE7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2VsZi5waGFzZXJUZXh0LmFscGhhID0gMC42O1xuXHRcdFx0XHRzZWxmLmlzRm9jdXMgPSBmYWxzZTtcblx0XHRcdH0sIHRoaXMpO1xuXG5cdFx0XHR0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkQ2FsbGJhY2tzKHRoaXMsIChlKSA9PiB7XG5cdFx0XHRcdGlmICghc2VsZi5pc0ZvY3VzKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAoZS5rZXlDb2RlID09IFBoYXNlci5LZXlib2FyZC5CQUNLU1BBQ0UpIHtcblx0XHRcdFx0XHRzZWxmLnBoYXNlclRleHQudGV4dCA9IHNlbGYucGhhc2VyVGV4dC50ZXh0LnNsaWNlKDAsIC0xKTtcblxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fSBcblxuXHRcdFx0XHRpZiAoc2VsZi5waGFzZXJUZXh0LnRleHQubGVuZ3RoICsgMSA+IHNlbGYubWF4TGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRzZWxmLnBoYXNlclRleHQudGV4dCArPSBlLmtleTtcblx0XHRcdFx0c2VsZi50ZXh0ID0gc2VsZi5waGFzZXJUZXh0LnRleHQ7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgU3RhdGVDb250cm9sbGVyIGZyb20gXCIuL3N0YXRlQ29udHJvbGxlclwiO1xuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSBcIi4vY29udHJvbGxlclwiO1xuaW1wb3J0IFN0YWdlU2VydmljZSBmcm9tIFwiLi4vc2VydmljZXMvc3RhZ2VTZXJ2aWNlXCI7XG5pbXBvcnQgQXV0aFNlcnZpY2UgZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGhTZXJ2aWNlXCI7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4uL21hemVcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcbmltcG9ydCBVc2VyIGZyb20gXCIuLi92by91c2VyXCI7XG5pbXBvcnQgUmVjb3JkU2VydmljZSBmcm9tIFwiLi4vc2VydmljZXMvcmVjb3JkU2VydmljZVwiO1xuaW1wb3J0IFJlY29yZCBmcm9tIFwiLi4vdm8vcmVjb3JkXCI7XG5pbXBvcnQgUmFua1NlcnZpY2UgZnJvbSBcIi4uL3NlcnZpY2VzL3JhbmtTZXJ2aWNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZpY2VDb250cm9sbGVyIGltcGxlbWVudHMgQ29udHJvbGxlciB7XG5cdGdhbWUgOiBQaGFzZXIuR2FtZTtcblxuXHRzdGFnZVNlcnZpY2UgOiBTdGFnZVNlcnZpY2U7XG5cdGF1dGhTZXJ2aWNlIDogQXV0aFNlcnZpY2U7XG5cdHJlY29yZFNlcnZpY2UgOiBSZWNvcmRTZXJ2aWNlO1xuXHRyYW5rU2VydmljZSA6IFJhbmtTZXJ2aWNlO1xuXG5cdC8vIEl0IGlzIG5lY2Vzc2FyeSBmb3IgY29udHJvbGluZyBzdGF0ZS5cblx0c3RhdGVDb250cm9sbGVyIDogU3RhdGVDb250cm9sbGVyO1xuXG5cdGNvbnN0cnVjdG9yKGdhbWU6IEdhbWUuTWF6ZSkge1xuXHRcdHRoaXMuZ2FtZSA9IGdhbWU7XHRcdFxuXHRcdHRoaXMuc3RhZ2VTZXJ2aWNlID0gbmV3IFN0YWdlU2VydmljZSgpO1xuXHRcdHRoaXMuYXV0aFNlcnZpY2UgPSBuZXcgQXV0aFNlcnZpY2UoKTtcblx0XHR0aGlzLnJlY29yZFNlcnZpY2UgPSBuZXcgUmVjb3JkU2VydmljZSgpO1xuXHRcdHRoaXMucmFua1NlcnZpY2UgPSBuZXcgUmFua1NlcnZpY2UoKTtcdFx0XG5cdFx0XG5cdFx0dGhpcy5zdGF0ZUNvbnRyb2xsZXIgPSBnYW1lLnN0YXRlQ29udHJvbGxlcjtcblx0fVx0XG5cdFxuXHRwdWJsaWMgbG9naW4odXNlcklkLCBjYWxsYmFjaykge1xuXHRcdHRoaXMuYXV0aFNlcnZpY2UubG9naW4odXNlcklkLCBjYWxsYmFjayk7XG5cdH1cblxuXHRwdWJsaWMgcmVnaXN0ZXJVc2VyKHVzZXI6IFVzZXIsIGNhbGxiYWNrOiAodXNlcjogVXNlciwgaXNBbHJlYWR5RXhpc3Q6IGJvb2xlYW4pID0+IHZvaWQpIHtcblx0XHR0aGlzLmF1dGhTZXJ2aWNlLnJlZ2lzdGVyVXNlcih1c2VyLCBjYWxsYmFjayk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0UmVjb3JkKCkgOiBSZWNvcmQge1xuXHRcdGNvbnN0IHVzZXJJZCA9IHRoaXMuYXV0aFNlcnZpY2UuZ2V0TGFzdExvZ2dlZEluVXNlcigpLnVzZXJJZDtcblx0XHRjb25zdCByZWNvcmQgPSB0aGlzLnJlY29yZFNlcnZpY2UuZ2V0UmVjb3JkKHVzZXJJZCk7XG5cdFx0cmV0dXJuIHJlY29yZDtcblx0fVxuXG5cdHB1YmxpYyBnZXRTdGFnZUluZm9ybWF0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnN0YWdlU2VydmljZS5nZXRTdGFnZUluZm9ybWF0aW9uKCk7XG5cdH1cblxuXHRwdWJsaWMgcmVjb3JkUmFuayhyZWNvcmQ6IFJlY29yZCkge1xuXHRcdHRoaXMucmVjb3JkU2VydmljZS5zZXRSZWNvcmQocmVjb3JkKTtcblx0fVxufVxuIiwiaW1wb3J0IHsgSW50cm8gfSBmcm9tICcuLi9zdGF0ZS9pbnRybyc7XG5pbXBvcnQgeyBMb2dpbiB9IGZyb20gJy4uL3N0YXRlL2xvZ2luJztcbmltcG9ydCB7IExldmVsIH0gZnJvbSAnLi4vc3RhdGUvbGV2ZWwnO1xuaW1wb3J0IHsgUGxheSB9IGZyb20gJy4uL3N0YXRlL3BsYXknO1xuaW1wb3J0IHsgUmVnaXN0ZXIgfSBmcm9tICcuLi9zdGF0ZS9yZWdpc3Rlcic7XG5cbmltcG9ydCBTZXJ2aWNlQ29udHJvbGxlciBmcm9tICcuL3NlcnZpY2VDb250cm9sbGVyJztcbmltcG9ydCB7IEdhbWUgfSBmcm9tICcuLi9tYXplJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGVDb250cm9sbGVyIHtcblx0c3RhdGVNYW5hZ2VyIDogUGhhc2VyLlN0YXRlTWFuYWdlcjtcblx0Z2FtZSA6IFBoYXNlci5HYW1lO1xuXG5cdHdpZHRoOiBudW1iZXI7XG5cdGhlaWdodDogbnVtYmVyO1xuXG5cblx0Z2FtZVZlcnNpb246IHN0cmluZztcblxuXHRjb25zdHJ1Y3RvcigpIHtcblxuXHR9XG5cblx0cHVibGljIGluaXRpYWxpemUoZ2FtZTogR2FtZS5NYXplLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgZ2FtZVZlcnNpb246IHN0cmluZykge1xuXHRcdHRoaXMuc3RhdGVNYW5hZ2VyID0gbmV3IFBoYXNlci5TdGF0ZU1hbmFnZXIoZ2FtZSk7XG5cdFx0dGhpcy5nYW1lID0gZ2FtZTtcblx0XHR0aGlzLmdhbWUuc3RhdGUgPSB0aGlzLnN0YXRlTWFuYWdlcjtcblx0XHR0aGlzLmdhbWVWZXJzaW9uID0gZ2FtZVZlcnNpb247XG5cblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdHN0YXJ0U3RhdGUoc3RhdGU/IDogc3RyaW5nKSB7XG5cdFx0bGV0IHN0YXJ0aW5nU3RhdGUgPSAnSW50cm8nO1xuXHRcdGlmIChzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgc3RhdGUgPT09IG51bGwpIHtcblx0XHRcdHN0YXJ0aW5nU3RhdGUgPSBzdGF0ZTtcblx0XHR9XG5cblx0XHR0aGlzLmdvU3RhdGUoc3RhcnRpbmdTdGF0ZSwgdHJ1ZSwgdHJ1ZSwgJ0hvcnJvciBNYXplJywgdGhpcy5nYW1lVmVyc2lvbik7XG5cdH1cblxuXHRwdWJsaWMgZ29TdGF0ZShzdGF0ZTogc3RyaW5nLCBjbGVhcldvcmxkPzogYm9vbGVhbiwgY2xlYXJDYWNoZT86IGJvb2xlYW4sIC4uLmFyZ3M6IGFueVtdKSB7XG5cdFx0aWYgKCF0aGlzLnN0YXRlTWFuYWdlci5jaGVja1N0YXRlKHN0YXRlKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBUaGlzIHN0YXRlKCR7c3RhdGV9KSBkb2VzIG5vdCBleGlzdCFgKTtcblx0XHR9XG5cblx0XHR0aGlzLnN0YXRlTWFuYWdlci5zdGFydChzdGF0ZSwgY2xlYXJXb3JsZCwgY2xlYXJDYWNoZSwgLi4uYXJncyk7XG5cdH1cblxuXHRwcml2YXRlIGluaXQoKSB7XG5cdFx0dGhpcy5hZGQoJ0ludHJvJywgSW50cm8sIHRydWUpO1xuXHRcdHRoaXMuYWRkKCdMb2dpbicsIExvZ2luLCBmYWxzZSk7XG5cdFx0dGhpcy5hZGQoJ1JlZ2lzdGVyJywgUmVnaXN0ZXIsIGZhbHNlKTtcblx0XHR0aGlzLmFkZCgnTGV2ZWwnLCBMZXZlbCwgZmFsc2UpO1xuXHRcdHRoaXMuYWRkKCdQbGF5JywgUGxheSwgZmFsc2UpO1xuXHR9XG5cblx0cHJpdmF0ZSBhZGQoa2V5LCBzdGF0ZSwgYXV0aFN0YXJ0Pykge1xuXHRcdHRoaXMuc3RhdGVNYW5hZ2VyLmFkZChrZXksIHN0YXRlLCBhdXRoU3RhcnQpO1xuXHR9XG59IiwiaW1wb3J0IFNlc3Npb24gZnJvbSBcIi4uL3Nlc3Npb24vc2Vzc2lvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBEQU88VD4ge1xuXHRzZXNzaW9uOiBTZXNzaW9uO1xuXHRjb25zdHJ1Y3RvcihzZXNzaW9uOiBTZXNzaW9uKSB7XG5cdFx0dGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcblx0fVxuXG5cdHB1YmxpYyBhYnN0cmFjdCBpbnNlcnQodGFibGU6IHN0cmluZywgb2JqOiBUKTogVDtcblx0cHVibGljIGFic3RyYWN0IHNlbGVjdCh0YWJsZTogc3RyaW5nLCBrZXk6IHN0cmluZyk6IFQ7XG5cdHB1YmxpYyBhYnN0cmFjdCB1cGRhdGUodGFibGU6IHN0cmluZywga2V5OiBzdHJpbmcsIG9iajogVCk6IFQ7XG5cdHB1YmxpYyBhYnN0cmFjdCBkZWxldGUodGFibGU6IHN0cmluZywga2V5OiBzdHJpbmcpOiBib29sZWFuO1xuXHRwdWJsaWMgYWJzdHJhY3Qgc2VsZWN0QWxsKHRhYmxlOiBzdHJpbmcpOiBhbnk7Ly9BcnJheTxUPjtcbn0iLCJpbXBvcnQgREFPIGZyb20gXCIuL2Rhb1wiO1xuaW1wb3J0IFJlY29yZCBmcm9tIFwiLi4vdm8vcmVjb3JkXCI7XG5cbmV4cG9ydCBjbGFzcyBSZWNvcmREYW8gZXh0ZW5kcyBEQU88UmVjb3JkPiB7XG5cblx0cHVibGljIGluc2VydCh0YWJsZTogc3RyaW5nLCBvYmo6IFJlY29yZCk6IFJlY29yZCB7XG5cdFx0dGhpcy5zZXNzaW9uLnNldCh0YWJsZSwgb2JqLnVzZXJJZCwgb2JqLnRvU3RyaW5nKCkpO1xuXG5cdFx0cmV0dXJuIG9iajtcblx0fVxuXG5cdHB1YmxpYyBzZWxlY3QodGFibGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpOiBSZWNvcmQge1xuXHRcdGNvbnN0IHJlY29yZERhdGEgPSB0aGlzLnNlc3Npb24uZ2V0KHRhYmxlLCB1c2VySWQpO1xuXHRcdGNvbnN0IHJlY29yZDogUmVjb3JkID0gUmVjb3JkLmJ5KHJlY29yZERhdGEpO1xuXHRcdHJldHVybiByZWNvcmQ7XG5cdH1cblxuXHRwdWJsaWMgdXBkYXRlKHRhYmxlOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nLCBvYmo6IFJlY29yZCk6IFJlY29yZCB7XG5cdFx0dGhpcy5zZXNzaW9uLnNldCh0YWJsZSwgdXNlcklkLCBvYmoudG9TdHJpbmcoKSk7XG5cdFx0XG5cdFx0cmV0dXJuIG9iajtcblx0fVxuXG5cdHB1YmxpYyBkZWxldGUodGFibGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRsZXQgaXNTdWNjZXNzID0gdHJ1ZTtcblx0XHR0cnkge1xuXHRcdFx0dGhpcy5zZXNzaW9uLnJlbW92ZSh0YWJsZSwgdXNlcklkKTtcblx0XHR9IGNhdGNoIHtcblx0XHRcdGlzU3VjY2VzcyA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBpc1N1Y2Nlc3M7XG5cdH1cblxuXHRwdWJsaWMgc2VsZWN0QWxsKHRhYmxlOiBzdHJpbmcpOiBhbnkge1xuXHRcdGNvbnN0IG9ianMgPSAoPGFueT50aGlzKS5zZXNzaW9uLmFsbFN0b3JhZ2UoKTtcblx0XHRjb25zdCBvYmogPSBvYmpzW3RhYmxlXTtcblxuXHRcdHJldHVybiBvYmo7XG5cdH1cbn0iLCJpbXBvcnQgREFPIGZyb20gXCIuL2Rhb1wiO1xuaW1wb3J0IFVzZXIgZnJvbSBcIi4uL3ZvL3VzZXJcIjtcblxuZXhwb3J0IGNsYXNzIFVzZXJEYW8gZXh0ZW5kcyBEQU88VXNlcj4ge1xuXHRwcml2YXRlIHJlYWRvbmx5IHVzZXJLZXkgPSAnbWF6ZVVzZXJSZXBvJztcblx0XG5cdHB1YmxpYyBpbnNlcnQodGFibGU6IHN0cmluZywgb2JqOiBVc2VyKTogVXNlciB7XG5cdFx0dGhpcy5zZXNzaW9uLnNldCh0YWJsZSwgb2JqLnVzZXJJZCwgb2JqLnRvU3RyaW5nKCkpO1xuXG5cdFx0cmV0dXJuIG9iajtcblx0fVxuXG5cdHB1YmxpYyBzZWxlY3QodGFibGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpOiBVc2VyIHtcblx0XHRjb25zdCB1c2VySnNvbiA9IHRoaXMuc2Vzc2lvbi5nZXQodGFibGUsIHVzZXJJZCk7XG5cblx0XHRjb25zdCB1c2VyOiBVc2VyID0gVXNlci5ieSh1c2VySnNvbik7XG5cdFx0cmV0dXJuIHVzZXI7XG5cdH1cblxuXHRwdWJsaWMgdXBkYXRlKHRhYmxlOiBzdHJpbmcsdXNlcklkOiBzdHJpbmcsIG9iajogVXNlcik6IFVzZXIge1xuXHRcdHRoaXMuc2Vzc2lvbi5zZXQodGFibGUsIHVzZXJJZCwgb2JqLnRvU3RyaW5nKCkpO1xuXHRcdFxuXHRcdHJldHVybiBvYmo7XG5cdH1cblxuXHRwdWJsaWMgZGVsZXRlKHRhYmxlOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0bGV0IGlzU3VjY2VzcyA9IHRydWU7XG5cdFx0dHJ5IHtcblx0XHRcdHRoaXMuc2Vzc2lvbi5yZW1vdmUodGFibGUsIHVzZXJJZCk7XG5cdFx0fSBjYXRjaCB7XG5cdFx0XHRpc1N1Y2Nlc3MgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gaXNTdWNjZXNzO1xuXHR9XG5cblx0cHVibGljIHNlbGVjdEFsbCh0YWJsZTogc3RyaW5nKTogYW55IHtcblx0XHRjb25zdCBvYmpzID0gKDxhbnk+dGhpcykuc2Vzc2lvbi5hbGxTdG9yYWdlKCk7XG5cdFx0Y29uc3Qgb2JqID0gb2Jqc1t0YWJsZV07XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9XG59IiwiaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4vbWF6ZSc7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2lkdGggPSA2NDA7XG4gICAgY29uc3QgaGVpZ2h0ID0gNjAwOyAvLyAxMjAgKiA0MjBcbiAgICBjb25zdCBwYXJlbnRJZCA9ICdnYW1lJztcblxuICAgIC8vIFNob3VsZCBiZSBpbml0aWFsaXplIGdhbWUgb2JqZWN0IGFuZCBydW5cbiAgICBjb25zdCBtYXplID0gbmV3IEdhbWUuTWF6ZSh3aWR0aCwgaGVpZ2h0LCBwYXJlbnRJZCk7XG59OyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvcGhhc2VyLWNlL3R5cGVzY3JpcHQvcGhhc2VyLmQudHNcIiAvPlxuXG5pbXBvcnQgU2VydmljZUNvbnRyb2xsZXIgZnJvbSBcIi4vY29udHJvbGxlci9zZXJ2aWNlQ29udHJvbGxlclwiO1xuaW1wb3J0IFN0YXRlQ29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyL3N0YXRlQ29udHJvbGxlclwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIEdhbWUge1xuXHRleHBvcnQgY2xhc3MgTWF6ZSBleHRlbmRzIFBoYXNlci5HYW1lIHtcblx0XHRzdGF0aWMgR0FNRV9WRVJTSU9OID0gXCJ2MS4wXCI7XG5cblx0XHRzZXJ2aWNlQ29udHJvbGxlciA6IFNlcnZpY2VDb250cm9sbGVyO1xuXHRcdHN0YXRlQ29udHJvbGxlciA6IFN0YXRlQ29udHJvbGxlcjtcblxuXHRcdGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIHBhcmVudElkKSB7XG5cdFx0XHRzdXBlcih3aWR0aCwgaGVpZ2h0LCBQaGFzZXIuQVVUTywgcGFyZW50SWQsIG51bGwsIGZhbHNlLCB0cnVlLCBudWxsKTtcblxuXHRcdFx0dGhpcy5zZXJ2aWNlQ29udHJvbGxlciA9IG5ldyBTZXJ2aWNlQ29udHJvbGxlcih0aGlzKTtcblxuXHRcdFx0dGhpcy5zdGF0ZUNvbnRyb2xsZXIgPSBuZXcgU3RhdGVDb250cm9sbGVyKCk7XG5cdFx0XHR0aGlzLnN0YXRlQ29udHJvbGxlci5pbml0aWFsaXplKHRoaXMsIHdpZHRoLCBoZWlnaHQsIE1hemUuR0FNRV9WRVJTSU9OKTtcblx0XHRcdHRoaXMuc3RhdGVDb250cm9sbGVyLnN0YXJ0U3RhdGUoKTtcblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vdm8vdXNlclwiO1xuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VcIjtcbmltcG9ydCBEQU8gZnJvbSBcIi4uL2Rhby9kYW9cIjtcbmltcG9ydCB7IFVzZXJEYW8gfSBmcm9tIFwiLi4vZGFvL3VzZXJEYW9cIjtcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlc3Npb24gfSBmcm9tIFwiLi4vc2Vzc2lvbi9sb2NhbFN0b3JhZ2VTZXNzaW9uXCI7XG5pbXBvcnQgU2Vzc2lvbiBmcm9tIFwiLi4vc2Vzc2lvbi9zZXNzaW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dGhTZXJ2aWNlIGltcGxlbWVudHMgU2VydmljZSB7XG5cdHVzZXJEYW8gOiBEQU88VXNlcj47XG5cdHNlc3Npb24gOiBTZXNzaW9uO1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgVEFCTEVfTEFTVF9MT0dHRURfSU4gPSAnbGFzdExvZ2dlZEluVXNlcic7XG5cdHByaXZhdGUgcmVhZG9ubHkgVVNFUl9UQUJMRSA9ICdtYXplVXNlclJlcG8nO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuc2Vzc2lvbiA9IG5ldyBMb2NhbFN0b3JhZ2VTZXNzaW9uKCk7XG5cdFx0dGhpcy51c2VyRGFvID0gbmV3IFVzZXJEYW8odGhpcy5zZXNzaW9uKTtcblx0fVxuXHRcblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0XG5cdH1cblxuXHRwdWJsaWMgZ2V0TGFzdExvZ2dlZEluVXNlcigpIDogVXNlciB7XG5cdFx0Y29uc3Qgb2JqID0gdGhpcy51c2VyRGFvLnNlbGVjdEFsbCh0aGlzLlRBQkxFX0xBU1RfTE9HR0VEX0lOKTtcblx0XHRsZXQgdXNlck9iajtcblx0XHRsZXQgdXNlcjtcblx0XHRcblx0XHR0cnkge1xuXHRcdFx0dXNlck9iaiA9IEpTT04ucGFyc2Uob2JqKTtcblx0XHRcdGNvbnN0IHVzZXJJZCA9IE9iamVjdC5rZXlzKHVzZXJPYmopWzBdO1xuXHRcdFx0bGV0IHVzZXJTdHIgPSB1c2VyT2JqW3VzZXJJZF07XG5cdFx0XHRpZiAodHlwZW9mIHVzZXJTdHIgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHVzZXIgPSBKU09OLnBhcnNlKHVzZXJTdHIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dXNlciA9IHVzZXJTdHI7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHR1c2VyID0gbnVsbDtcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIHVzZXI7XG5cdH1cblxuXHRwdWJsaWMgcmVnaXN0ZXJVc2VyKHVzZXIgOiBVc2VyLCBjYWxsYmFjazogKHVzZXI6IFVzZXIsIGlzQWxyZWFkeUV4aXN0OiBib29sZWFuKSA9PiB2b2lkKSB7XG5cdFx0Y29uc3QgdXNlcklkID0gdXNlci51c2VySWQ7XG5cdFx0Y29uc3QgdXNlckluU2Vzc2lvbiA9IHRoaXMudXNlckRhby5zZWxlY3QodGhpcy5VU0VSX1RBQkxFLCB1c2VySWQpO1xuXHRcdFxuXHRcdGxldCBpc0FscmVhZHlFeGlzdCA9IHRydWU7XG5cdFx0aWYgKCF1c2VySW5TZXNzaW9uKSB7XG5cdFx0XHR0aGlzLnVzZXJEYW8uaW5zZXJ0KHRoaXMuVVNFUl9UQUJMRSwgdXNlcik7XG5cdFx0XHRpc0FscmVhZHlFeGlzdCA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGNhbGxiYWNrKHVzZXIsIGlzQWxyZWFkeUV4aXN0KTtcblx0fVxuXG5cdHB1YmxpYyBsb2dpbih1c2VySWQ6IHN0cmluZywgY2FsbGJhY2s6ICh1c2VyOiBVc2VyLCBpc1N1Y2Nlc3M6IGJvb2xlYW4pID0+IHZvaWQpIHtcblx0XHRjb25zdCB1c2VyID0gdGhpcy51c2VyRGFvLnNlbGVjdCh0aGlzLlVTRVJfVEFCTEUsIHVzZXJJZCk7XG5cdFx0aWYgKHVzZXIpIHtcblx0XHRcdHRoaXMudXNlckRhby5kZWxldGUodGhpcy5UQUJMRV9MQVNUX0xPR0dFRF9JTiwgdXNlcklkKTtcblx0XHRcdHRoaXMudXNlckRhby5pbnNlcnQodGhpcy5UQUJMRV9MQVNUX0xPR0dFRF9JTiwgdXNlcik7XG5cdFx0XHRjYWxsYmFjayh1c2VyLCB0cnVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2FsbGJhY2sobnVsbCwgZmFsc2UpO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBsb2dvdXQodXNlcklkOiBzdHJpbmcpIHtcblx0XHR0aGlzLnVzZXJEYW8uZGVsZXRlKHRoaXMuVEFCTEVfTEFTVF9MT0dHRURfSU4sIHVzZXJJZCk7XG5cdH1cbn0iLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZVwiO1xuaW1wb3J0IERBTyBmcm9tIFwiLi4vZGFvL2Rhb1wiO1xuaW1wb3J0IHsgUmFuayB9IGZyb20gXCIuLi92by9yYW5rXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhbmtTZXJ2aWNlIGltcGxlbWVudHMgU2VydmljZSB7XG5cdHJhbmtJbmZvOiBhbnk7XG5cdHJhbmtEQU8gOiBEQU88UmFuaz47XG5cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0XG5cdH1cblxuXHRwdWJsaWMgY2FsY3VsYXRlUmFuayhzdGFnZUlkOiBudW1iZXIsIGVsYXBzZWRUaW1lOiBudW1iZXIpIDogUmFuayB7XG5cdFx0Y29uc3QgcmFua01ldHJpeCA9IHtcblx0XHRcdDA6IHtcblx0XHRcdFx0MTA6IFJhbmsuUyxcblx0XHRcdFx0MTU6IFJhbmsuQSxcblx0XHRcdFx0MjA6IFJhbmsuQixcblx0XHRcdFx0MjU6IFJhbmsuQyxcblx0XHRcdFx0MzA6IFJhbmsuRCxcblx0XHRcdFx0MzU6IFJhbmsuRSxcblx0XHRcdH0sXG5cdFx0XHQxOiB7XG5cdFx0XHRcdDEwOiBSYW5rLlMsXG5cdFx0XHRcdDE1OiBSYW5rLkEsXG5cdFx0XHRcdDIwOiBSYW5rLkIsXG5cdFx0XHRcdDI1OiBSYW5rLkMsXG5cdFx0XHRcdDMwOiBSYW5rLkQsXG5cdFx0XHRcdDM1OiBSYW5rLkUsXG5cdFx0XHR9LFxuXHRcdFx0Mjoge1xuXHRcdFx0XHQxMDogUmFuay5TLFxuXHRcdFx0XHQxNTogUmFuay5BLFxuXHRcdFx0XHQyMDogUmFuay5CLFxuXHRcdFx0XHQyNTogUmFuay5DLFxuXHRcdFx0XHQzMDogUmFuay5ELFxuXHRcdFx0XHQzNTogUmFuay5FLFxuXHRcdFx0fSxcblx0XHRcdDM6IHtcblx0XHRcdFx0MTA6IFJhbmsuUyxcblx0XHRcdFx0MTU6IFJhbmsuQSxcblx0XHRcdFx0MjA6IFJhbmsuQixcblx0XHRcdFx0MjU6IFJhbmsuQyxcblx0XHRcdFx0MzA6IFJhbmsuRCxcblx0XHRcdFx0MzU6IFJhbmsuRSxcblx0XHRcdH0sXG5cdFx0XHQ0OiB7XG5cdFx0XHRcdDEwOiBSYW5rLlMsXG5cdFx0XHRcdDE1OiBSYW5rLkEsXG5cdFx0XHRcdDIwOiBSYW5rLkIsXG5cdFx0XHRcdDI1OiBSYW5rLkMsXG5cdFx0XHRcdDMwOiBSYW5rLkQsXG5cdFx0XHRcdDM1OiBSYW5rLkUsXG5cdFx0XHR9LFxuXHRcdFx0NToge1xuXHRcdFx0XHQxMDogUmFuay5TLFxuXHRcdFx0XHQxNTogUmFuay5BLFxuXHRcdFx0XHQyMDogUmFuay5CLFxuXHRcdFx0XHQyNTogUmFuay5DLFxuXHRcdFx0XHQzMDogUmFuay5ELFxuXHRcdFx0XHQzNTogUmFuay5FLFxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRjb25zdCBzdGFnZVJhbmtNZXRyaXggPSByYW5rTWV0cml4W3N0YWdlSWRdO1xuXHRcdGZvciAobGV0IGtleSBpbiBzdGFnZVJhbmtNZXRyaXgpIHtcblx0XHRcdGNvbnN0IHRpbWVMaW1pdCA9IHBhcnNlSW50KGtleSk7XG5cdFx0XHRpZiAodGltZUxpbWl0ID4gZWxhcHNlZFRpbWUpIHtcblx0XHRcdFx0cmV0dXJuIHN0YWdlUmFua01ldHJpeFtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBSYW5rLkY7XG5cdH1cblxuXHRsb2FkUmFua0luZm9ybWF0aW9uKCkge1xuXG5cdH1cbn0iLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZVwiO1xuaW1wb3J0IERBTyBmcm9tIFwiLi4vZGFvL2Rhb1wiO1xuaW1wb3J0IFJlY29yZCBmcm9tIFwiLi4vdm8vcmVjb3JkXCI7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXNzaW9uIH0gZnJvbSBcIi4uL3Nlc3Npb24vbG9jYWxTdG9yYWdlU2Vzc2lvblwiO1xuaW1wb3J0IHsgUmVjb3JkRGFvIH0gZnJvbSBcIi4uL2Rhby9yZWNvcmREYW9cIjtcbmltcG9ydCBTZXNzaW9uIGZyb20gXCIuLi9zZXNzaW9uL3Nlc3Npb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb3JkU2VydmljZSBpbXBsZW1lbnRzIFNlcnZpY2Uge1xuXHRyZWNvcmREYW8gOiBEQU88UmVjb3JkPjtcblx0c2Vzc2lvbiA6IFNlc3Npb247XG5cblx0cHJpdmF0ZSByZWFkb25seSBSRUNPUkRfVEFCTEUgPSAnbWF6ZVJlY29yZFJlcG8nO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuc2Vzc2lvbiA9IG5ldyBMb2NhbFN0b3JhZ2VTZXNzaW9uKCk7XG5cdFx0dGhpcy5yZWNvcmREYW8gPSBuZXcgUmVjb3JkRGFvKHRoaXMuc2Vzc2lvbik7XG5cdH1cblxuXHRpbml0aWFsaXplKCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xuXHR9XG5cblx0cHVibGljIGdldFJlY29yZCh1c2VySWQ6IHN0cmluZyk6IFJlY29yZCB7XG5cdFx0Y29uc3QgcmVjb3JkID0gdGhpcy5yZWNvcmREYW8uc2VsZWN0KHRoaXMuUkVDT1JEX1RBQkxFLCB1c2VySWQpO1xuXHRcdHJldHVybiByZWNvcmQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0UmVjb3JkKHJlY29yZDogUmVjb3JkKSB7XG5cdFx0dGhpcy5yZWNvcmREYW8uaW5zZXJ0KHRoaXMuUkVDT1JEX1RBQkxFLCByZWNvcmQpO1xuXHR9XG59IiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VcIjtcbmltcG9ydCB7IFN0YWdlIH0gZnJvbSBcIi4uL3ZvL3N0YWdlXCI7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi92by9wb2ludFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZVNlcnZpY2UgaW1wbGVtZW50cyBTZXJ2aWNlIHtcblx0c3RhdGljIE5VTV9PRl9TVEFHRSA9IDU7XG5cdHN0YWdlTWFwIDogYW55O1xuXHRcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5zdGFnZU1hcCA9IHt9O1xuXHRcdHRoaXMuZ2VuZXJhdGVTdGFnZU1hcCgpO1xuXHR9XG5cblx0cHVibGljIGluaXRpYWxpemUoKSB7IH1cblxuXHRwdWJsaWMgZ2V0U3RhZ2VJbmZvcm1hdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5zdGFnZU1hcDtcblx0fVxuXG5cdC8vIExvYWQgU3RhZ2UgTWFwIEluZm9ybWF0aW9uXG5cdHByaXZhdGUgZ2VuZXJhdGVTdGFnZU1hcCgpIHtcblx0XHRmb3IgKGxldCBpPTA7IGk8U3RhZ2VTZXJ2aWNlLk5VTV9PRl9TVEFHRTsgaSsrKSB7XG5cdFx0XHRsZXQgemVyb0Zvcm1hdCA9ICcwMDAnICsgaTtcblx0XHRcdGxldCBtYXBTZXEgPSB6ZXJvRm9ybWF0LnNsaWNlKC0zKTtcblxuXHRcdFx0Y29uc3QgZmxvb3JQYXRoID0gJ2Fzc2V0cy9pbWcvbWFwcy9mbG9vci0nICsgbWFwU2VxICsgJy5wbmcnO1xuXHRcdFx0Y29uc3Qgd2FsbFBhdGggPSAnYXNzZXRzL2ltZy9tYXBzL3dhbGxzLScgKyBtYXBTZXEgKyAnLnBuZyc7XG5cblx0XHRcdGNvbnN0IHN0YWdlID0gbmV3IFN0YWdlKGksIGZsb29yUGF0aCwgd2FsbFBhdGgsIFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0UG9pbnQub24oMjM1LCA4NSksXG5cdFx0XHRcdFx0UG9pbnQub24oNTY1LCA0MDApXG5cdFx0XHRcdF0pO1xuXHRcdFx0XG5cdFx0XHR0aGlzLnN0YWdlTWFwW2ldID0gc3RhZ2U7XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IFNlc3Npb24gZnJvbSBcIi4vc2Vzc2lvblwiO1xuXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlU2Vzc2lvbiBpbXBsZW1lbnRzIFNlc3Npb24ge1xuXHRnZXQodGFibGU6IHN0cmluZywga2V5OiBzdHJpbmcpIDogYW55IHtcblx0XHRjb25zdCB0YWJsZURhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0YWJsZSkgfHwgbnVsbDtcblx0XHRpZiAoIXRhYmxlRGF0YSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdGFibGVKc29uT2JqID0gSlNPTi5wYXJzZSh0YWJsZURhdGEpO1xuXHRcdGxldCBpdGVtID0gdGFibGVKc29uT2JqW2tleV07XG5cdFx0aWYgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuXHRcdFx0bGV0IG9iaiA9IEpTT04ucGFyc2UoaXRlbSk7XHRcblx0XHRcdHJldHVybiBvYmo7XG5cdFx0fVx0XHRcblx0XHRyZXR1cm4gaXRlbTtcblx0fVxuXG5cdHNldCh0YWJsZTogc3RyaW5nLCBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuXHRcdGNvbnN0IG9yaWdpbmFsRGF0YU9iaiA9IHRoaXMuZ2V0KHRhYmxlLCBrZXkpO1xuXHRcdGlmICghb3JpZ2luYWxEYXRhT2JqKSB7XG5cdFx0XHRjb25zdCB0YWJsZURhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0YWJsZSkgfHwgbnVsbDtcblx0XHRcdGlmICh0YWJsZURhdGEpIHtcblx0XHRcdFx0Y29uc3QgdGFibGVKc29uT2JqID0gSlNPTi5wYXJzZSh0YWJsZURhdGEpO1xuXHRcdFx0XHRsZXQgZGF0YSA9IHRhYmxlSnNvbk9iajtcblx0XHRcdFx0ZGF0YVtrZXldID0gdmFsdWU7XG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRhYmxlLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgZGF0YSA9IHt9O1xuXHRcdFx0XHRkYXRhW2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0odGFibGUsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgdGFibGVEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGFibGUpO1xuXHRcdFx0Y29uc3QgdGFibGVKc29uT2JqID0gSlNPTi5wYXJzZSh0YWJsZURhdGEpO1xuXHRcdFx0bGV0IGpzb25WYWx1ZSA9IEpTT04ucGFyc2UodmFsdWUpO1xuXHRcdFx0bGV0IGRhdGEgPSB7fTtcblx0XHRcdGRhdGFba2V5XSA9IGpzb25WYWx1ZTtcblxuXHRcdFx0bGV0IGRhdGEyID0gdGFibGVKc29uT2JqO1xuXHRcdFx0ZGF0YTJba2V5XSA9IG9yaWdpbmFsRGF0YU9iajtcblx0XHRcdFxuXHRcdFx0Y29uc3Qgb2JqID0gdGhpcy5leHRlbmQoZGF0YTIsIGRhdGEpO1xuXHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0odGFibGUsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuXHRcdH1cblx0fVxuXG5cdHJlbW92ZSh0YWJsZTogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuXHRcdGNvbnN0IG9yaWdpbmFsRGF0YU9iaiA9IHRoaXMuZ2V0KHRhYmxlLCBrZXkpO1xuXHRcdGlmICghb3JpZ2luYWxEYXRhT2JqKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHRhYmxlRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRhYmxlKTtcblx0XHRcdGNvbnN0IHRhYmxlSnNvbk9iaiA9IEpTT04ucGFyc2UodGFibGVEYXRhKTtcblx0XHRcdGRlbGV0ZSB0YWJsZUpzb25PYmpba2V5XTtcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRhYmxlLCBKU09OLnN0cmluZ2lmeSh0YWJsZUpzb25PYmopKTtcblx0XHR9XG5cdH1cblxuXHRhbGxTdG9yYWdlKCkge1xuXHRcdGxldCBhcmNoaXZlID0ge307XG5cdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhsb2NhbFN0b3JhZ2UpO1xuXHRcdGxldCBpID0ga2V5cy5sZW5ndGg7XG5cblx0XHR3aGlsZSAoaS0tKSB7XG5cdFx0XHRhcmNoaXZlW2tleXNbaV1dID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5c1tpXSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFyY2hpdmU7XG5cdH1cblxuXG5cdHByaXZhdGUgZXh0ZW5kKC4uLmFyZ3MpIHtcblx0XHRsZXQgbywgaSwgaztcblx0XHRmb3IgKG8gPSB7fSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdC8vIGlmIChhcmd1bWVudHNbaV0uY29uc3RydWN0b3IgIT09IE9iamVjdCkgY29udGludWU7XG5cdFx0XHRmb3IgKGsgaW4gYXJndW1lbnRzW2ldKSB7XG5cdFx0XHRcdGlmIChhcmd1bWVudHNbaV0uaGFzT3duUHJvcGVydHkoaykpIHtcblx0XHRcdFx0XHRvW2tdID0gYXJndW1lbnRzW2ldW2tdLmNvbnN0cnVjdG9yID09PSBPYmplY3QgPyB0aGlzLmV4dGVuZChvW2tdIHx8IHt9LCBhcmd1bWVudHNbaV1ba10pIDogYXJndW1lbnRzW2ldW2tdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvO1xuXHR9XG59IiwiaW1wb3J0IHsgU3RhdGVNYW5hZ2VyLCBHYW1lIH0gZnJvbSBcInBoYXNlci1jZVwiO1xuaW1wb3J0IFNlcnZpY2VDb250cm9sbGVyIGZyb20gXCIuLi9jb250cm9sbGVyL3NlcnZpY2VDb250cm9sbGVyXCI7XG5pbXBvcnQgU3RhdGVDb250cm9sbGVyIGZyb20gXCIuLi9jb250cm9sbGVyL3N0YXRlQ29udHJvbGxlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlIGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcblx0c2VydmljZUNvbnRyb2xsZXIgOiBTZXJ2aWNlQ29udHJvbGxlcjtcblx0c3RhdGVDb250cm9sbGVyIDogU3RhdGVDb250cm9sbGVyO1xuXG5cdGNvbnN0cnVjdG9yKGdhbWUgOiBQaGFzZXIuR2FtZSkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHQvLyBGb3IgSWdub3Jpbmcgbm9uLWV4aXN0IHByb3BlcnR5IGVycm9yLlxuXHRcdHRoaXMuc2VydmljZUNvbnRyb2xsZXIgPSAoZ2FtZSBhcyBhbnkpLnNlcnZpY2VDb250cm9sbGVyO1xuXHRcdHRoaXMuc3RhdGVDb250cm9sbGVyID0gKGdhbWUgYXMgYW55KS5zdGF0ZUNvbnRyb2xsZXI7XG5cdH1cblxuXHRnb1N0YXRlKHN0cmluZykge1xuXHRcdHRoaXMuc2VydmljZUNvbnRyb2xsZXIgXG5cdH1cblx0XG59IiwiaW1wb3J0IEJhc2UgZnJvbSBcIi4vYmFzZVwiO1xuXG5leHBvcnQgY2xhc3MgSW50cm8gZXh0ZW5kcyBCYXNlIHtcblx0c3RhdGljIGludHJvSW50ZXJ2YWwgPSAyMDAwO1xuXG5cdGdhbWVUaXRsZSA6IHN0cmluZztcblx0Z2FtZVZlcnNpb24gOiBzdHJpbmc7XG5cdGxvZ29UZXh0IDogUGhhc2VyLlRleHQ7XG5cblx0Y29uc3RydWN0b3IoZ2FtZTogUGhhc2VyLkdhbWUpIHtcblx0XHRzdXBlcihnYW1lKTtcblx0fVxuXG5cdGluaXQoZ2FtZVRpdGxlLCBnYW1lVmVyc2lvbikge1xuXHRcdHRoaXMuZ2FtZVRpdGxlID0gZ2FtZVRpdGxlO1xuXHRcdHRoaXMuZ2FtZVZlcnNpb24gPSBnYW1lVmVyc2lvbjtcblx0fVxuXG5cdHByZWxvYWQoKSB7XG5cdFx0XG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0dGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzNiM2IzYic7XG5cblx0XHR0aGlzLmxvZ29UZXh0ID0gdGhpcy5nYW1lLmFkZC50ZXh0KFxuXHRcdFx0dGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIFxuXHRcdFx0dGhpcy5nYW1lLndvcmxkLmNlbnRlclksIFxuXHRcdFx0dGhpcy5nYW1lVGl0bGUsXG5cdFx0XHR7XG5cdFx0XHRcdGZvbnQ6ICc4MHB4IEFyaWFsOycsXG5cdFx0XHRcdGZpbGw6ICcjZmZmZmZmJ1xuXHRcdFx0fVxuXHRcdCk7XG5cdFx0dGhpcy5sb2dvVGV4dC5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xuXHRcdHRoaXMubG9nb1RleHQuYWxwaGEgPSAwLjg7XG5cblx0XHRjb25zdCBwID0gdGhpcy5nYW1lLndvcmxkLmJvdW5kcy5ib3R0b21SaWdodDtcblx0XHRcblx0XHRjb25zdCBmb290ZXIgPSB0aGlzLmdhbWUuYWRkLnRleHQoXG5cdFx0XHRwLngtNTAsXG5cdFx0XHRwLnktMzAsXG5cdFx0XHR0aGlzLmdhbWVWZXJzaW9uLFxuXHRcdFx0e1xuXHRcdFx0XHRmb250OiAnMTVweCBBcmlhbDsnLFxuXHRcdFx0XHRmaWxsOiAnI2VlZWVlZSdcblx0XHRcdH1cblx0XHQpO1xuXHRcdGZvb3Rlci5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xuXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdHNlbGYuc3RhdGVDb250cm9sbGVyLmdvU3RhdGUoJ0xvZ2luJyk7XG5cdFx0fSwgSW50cm8uaW50cm9JbnRlcnZhbCk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cblx0fVxufSIsImltcG9ydCBTZXJ2aWNlQ29udHJvbGxlciBmcm9tIFwiLi4vY29udHJvbGxlci9zZXJ2aWNlQ29udHJvbGxlclwiO1xuaW1wb3J0IEJhc2UgZnJvbSBcIi4vYmFzZVwiO1xuaW1wb3J0IFJlY29yZCwgeyBTdGFnZVJlY29yZCB9IGZyb20gXCIuLi92by9yZWNvcmRcIlxuaW1wb3J0IHsgUmFua1V0aWwgfSBmcm9tIFwiLi4vdm8vcmFua1wiO1xuXG5leHBvcnQgY2xhc3MgTGV2ZWwgZXh0ZW5kcyBCYXNlIHtcblx0cmVhZG9ubHkgbnVtYmVyT2ZTdGFnZVBlclBhZ2UgPSAzO1xuXG5cdGxvd2VyU3RhZ2VCdG4gOiBQaGFzZXIuQnV0dG9uO1xuXHRoaWdoZXJTdGFnZUJ0biA6IFBoYXNlci5CdXR0b247XG5cblx0bG9nb3V0QnRuIDogUGhhc2VyLkJ1dHRvbjtcblx0XG5cdG51bWJlck9mU3RhZ2U6IG51bWJlcjtcblx0bnVtYmVyT2ZQYWdlOiBudW1iZXI7XG5cdGN1cnJlbnRQYWdlOiBudW1iZXI7XG5cdHN0YWdlTWFwOiBhbnk7XG5cblx0cmVjb3JkOiBSZWNvcmQ7XG5cblx0c3RhZ2VCdG5Hcm91cDogUGhhc2VyLkdyb3VwO1xuXG5cdGNvbnN0cnVjdG9yKGdhbWUpIHtcblx0XHRzdXBlcihnYW1lKTtcblx0XHR0aGlzLmN1cnJlbnRQYWdlID0gMTtcblx0fVxuXHRcblx0aW5pdChzdGFnZU1hcCkge1xuXHRcdHRoaXMuc3RhZ2VNYXAgPSBzdGFnZU1hcDtcblx0XHR0aGlzLm51bWJlck9mU3RhZ2UgPSBPYmplY3Qua2V5cyhzdGFnZU1hcCkubGVuZ3RoO1xuXHRcdHRoaXMubnVtYmVyT2ZQYWdlID0gTWF0aC5jZWlsKHRoaXMubnVtYmVyT2ZTdGFnZS90aGlzLm51bWJlck9mU3RhZ2VQZXJQYWdlKTtcblx0fVxuXG5cdHByZWxvYWQoKSB7XG5cdFx0dGhpcy5nYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ3N0YWdlQXJyb3dzJywgJy4uL2Fzc2V0cy9pbWcvc3RhZ2VBcnJvd3MucG5nJywgNDgsIDQ4KTtcblx0XHR0aGlzLmdhbWUubG9hZC5pbWFnZSgnbG9nb3V0QnRuJywgJy4uL2Fzc2V0cy9pbWcvbG9nb3V0QnRuLnBuZycpO1xuXG5cdFx0dGhpcy5yZWNvcmQgPSB0aGlzLnNlcnZpY2VDb250cm9sbGVyLmdldFJlY29yZCgpO1xuXHRcdHRoaXMuc3RhZ2VCdG5Hcm91cCA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHR0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMzYjNiM2InO1xuXHRcdHRoaXMuZ2FtZS5zdGFnZS5hbHBoYSA9IDAuOTtcblx0XHR0aGlzLmRyYXdTdGFnZUJ0bih0aGlzLmN1cnJlbnRQYWdlKTtcblx0XHR0aGlzLmRyYXdTdGFnZU1vdmVCdG4oKTtcblx0XHR0aGlzLmRyYXdMb2dvdXRCdG4oKTtcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblxuXHR9XG5cblx0cHJpdmF0ZSBkcmF3TG9nb3V0QnRuKCkge1xuXHRcdHRoaXMubG9nb3V0QnRuID0gdGhpcy5nYW1lLmFkZC5idXR0b24odGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIDUwMCwgJ2xvZ291dEJ0bicsICgpID0+IHtcblx0XHRcdGlmIChjb25maXJtKCdMb2dvdXQg7ZWY7Iuc6rKg7Iq164uI6rmMPycpKSB7XG5cdFx0XHRcdC8vIFJlbW92ZSBsYXN0TG9nZ2VkSW5Vc2VyXG5cdFx0XHRcdHRoaXMuc2VydmljZUNvbnRyb2xsZXIuYXV0aFNlcnZpY2UubG9nb3V0KHRoaXMuc2VydmljZUNvbnRyb2xsZXIuYXV0aFNlcnZpY2UuZ2V0TGFzdExvZ2dlZEluVXNlcigpLnVzZXJJZCk7XG5cdFx0XHRcdHRoaXMuc3RhdGVDb250cm9sbGVyLmdvU3RhdGUoJ0xvZ2luJyk7XG5cdFx0XHR9XG5cdFx0fSwgdGhpcyk7XG5cblx0XHR0aGlzLmxvZ291dEJ0bi5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xuXHR9XG5cblx0cHJpdmF0ZSBjbGVhclN0YWdlQnRuRmllbGQoKSB7XG5cdFx0dGhpcy5zdGFnZUJ0bkdyb3VwLmNhbGxBbGwoJ2tpbGwnLCAnJyk7XG5cdH1cblxuXHRwcml2YXRlIGRyYXdTdGFnZUJ0bihwYWdlTnVtKSB7XG5cdFx0dGhpcy5jbGVhclN0YWdlQnRuRmllbGQoKTtcblxuXHRcdGNvbnN0IHdpZHRoID0gMjAwO1xuXHRcdGNvbnN0IGhlaWdodCA9IDIwMDtcblxuXHRcdGxldCBvZmZzZXRYID0gKHRoaXMuZ2FtZS53b3JsZC53aWR0aCAtIDE1MCkgLyB0aGlzLm51bWJlck9mU3RhZ2VQZXJQYWdlOyAvLyAxNTA6IHBhZGRpbmdcblxuXHRcdGxldCBzdGFnZUluZm9zID0ge307XG5cdFx0aWYgKHRoaXMucmVjb3JkKSB7XG5cdFx0XHRzdGFnZUluZm9zID0gdGhpcy5yZWNvcmQucmVjb3Jkcztcblx0XHR9XG5cdFx0XG5cdFx0Y29uc3Qgb2Zmc2V0ID0gKHBhZ2VOdW0tMSkgKiB0aGlzLm51bWJlck9mU3RhZ2VQZXJQYWdlO1xuXHRcdGZvciAobGV0IGk9b2Zmc2V0OyBpPG9mZnNldCt0aGlzLm51bWJlck9mU3RhZ2VQZXJQYWdlOyBpKyspIHtcblx0XHRcdGlmICghdGhpcy5zdGFnZU1hcFtpXSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGxldCBzdGFnZUluZm86IFN0YWdlUmVjb3JkO1xuXHRcdFx0bGV0IHN0YWdlSW5mb1N0ciA9ICcnO1xuXHRcdFx0aWYgKHN0YWdlSW5mb3NbaV0pIHtcblx0XHRcdFx0c3RhZ2VJbmZvID0gc3RhZ2VJbmZvc1tpXTtcblx0XHRcdFx0c3RhZ2VJbmZvU3RyICs9ICdcXG5UaW1lOiAnICsgc3RhZ2VJbmZvLnRpbWUgKyAnIHNlY29uZHMnO1xuXHRcdFx0XHRzdGFnZUluZm9TdHIgKz0gJ1xcblJhbms6ICcgKyBSYW5rVXRpbC52YWx1ZU9mKHN0YWdlSW5mby5yYW5rKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgc3RhZ2VCdG5UZXh0ID0gYFN0YWdlLSR7aSsxfWAgKyBzdGFnZUluZm9TdHI7XG5cblx0XHRcdGNvbnN0IG9mZnNldFhPZkJ0biA9IG9mZnNldFggKiAoaSV0aGlzLm51bWJlck9mU3RhZ2VQZXJQYWdlKTtcblxuXHRcdFx0Y29uc3Qgc3RhZ2VCdG4gPSB0aGlzLmdhbWUuYWRkLnRleHQoMTQ1ICsgb2Zmc2V0WE9mQnRuLCA5MCwgc3RhZ2VCdG5UZXh0LCB7XG5cdFx0XHRcdGZpbGw6ICcjZmZmZmZmJyxcblx0XHRcdFx0Zm9udDogJzE1cHggQXJpYWwnXG5cdFx0XHR9KTtcblxuXHRcdFx0c3RhZ2VCdG4uaW5wdXRFbmFibGVkID0gdHJ1ZTtcblx0XHRcdHN0YWdlQnRuLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xuXHRcdFx0XG5cdFx0XHRjb25zdCBzdGFnZU51bSA9IGkrMTtcblx0XHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdFx0c3RhZ2VCdG4uZXZlbnRzLm9uSW5wdXREb3duLmFkZCgoZSkgPT4ge1xuXHRcdFx0XHRpZiAoY29uZmlybShgU3RhZ2UtJHtzdGFnZU51bX0g7J2064+Z7ZWg6rmM7JqUP2ApKSB7XG5cdFx0XHRcdFx0c2VsZi5zdGF0ZUNvbnRyb2xsZXIuZ29TdGF0ZSgnUGxheScsIHRydWUsIHRydWUsIHNlbGYuc3RhZ2VNYXBbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCB0aGlzKTtcblxuXHRcdFx0dGhpcy5zdGFnZUJ0bkdyb3VwLmFkZChzdGFnZUJ0bik7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBkcmF3U3RhZ2VNb3ZlQnRuKCkge1xuXHRcdGNvbnN0IHAgPSB0aGlzLmdhbWUud29ybGQuYm91bmRzO1xuXG5cdFx0dGhpcy5sb3dlclN0YWdlQnRuID0gdGhpcy5nYW1lLmFkZC5idXR0b24oMTAwLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSAsIFwic3RhZ2VBcnJvd3NcIiwgdGhpcy5idXR0b25DbGlja2VkLCB0aGlzKTtcblx0XHR0aGlzLmhpZ2hlclN0YWdlQnRuID0gdGhpcy5nYW1lLmFkZC5idXR0b24oMTAwLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgXCJzdGFnZUFycm93c1wiLCB0aGlzLmJ1dHRvbkNsaWNrZWQsIHRoaXMpO1xuXG5cdFx0dGhpcy5sb3dlclN0YWdlQnRuLmZyYW1lID0gMDtcblx0XHR0aGlzLmhpZ2hlclN0YWdlQnRuLmZyYW1lID0gMTtcblxuXHRcdC8vIEFsaWduIHN0YWdlIHBhZ2UgbW92ZSBidG5cblx0XHR0aGlzLmxvd2VyU3RhZ2VCdG4ueCA9IDIwO1xuXHRcdHRoaXMuaGlnaGVyU3RhZ2VCdG4ueCA9IHAucmlnaHQgLSAyMCAtIHRoaXMuaGlnaGVyU3RhZ2VCdG4ud2lkdGg7XG5cblx0XHRjb25zdCBzdGFnZVRleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQodGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIDUwLCAnU3RhZ2UnLCB7XG5cdFx0XHRmaWxsOiAnI2ZmZmZmZicsXG5cdFx0XHRmb250OiAnMjBweCBBcmlhbCdcblx0XHR9KTtcblxuXHRcdHN0YWdlVGV4dC5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xuXHR9XG5cblx0cHJpdmF0ZSBidXR0b25DbGlja2VkKGJ1dHRvbiwgcG9pbnRlcikge1xuXHRcdGxldCBjdXJyZW50UGFnZSA9IHRoaXMuY3VycmVudFBhZ2U7XG5cdFx0aWYgKGJ1dHRvbi5mcmFtZSA9PSAwKSB7IC8vIGxvd2VyU3RhZ2VCdG5cblx0XHRcdGlmIChjdXJyZW50UGFnZSA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmRyYXdTdGFnZUJ0bigtLXRoaXMuY3VycmVudFBhZ2UpO1xuXHRcdH0gZWxzZSBpZiAoYnV0dG9uLmZyYW1lID09IDEpIHsgLy8gaGlnaGVyU3RhZ2VCdG5cblx0XHRcdGlmIChjdXJyZW50UGFnZSsxID4gdGhpcy5udW1iZXJPZlBhZ2UpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5kcmF3U3RhZ2VCdG4oKyt0aGlzLmN1cnJlbnRQYWdlKTtcblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCBCYXNlIGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi92by91c2VyJztcblxuZXhwb3J0IGNsYXNzIExvZ2luIGV4dGVuZHMgQmFzZSB7XG5cdGxvZ2luVGV4dCA6IFBoYXNlci5UZXh0O1xuXHRnYW1lTG9nbyA6IFBoYXNlci5JbWFnZTtcblxuXHRndWVzdFVVSUQgOiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IoZ2FtZSkge1xuXHRcdHN1cGVyKGdhbWUpO1xuXHR9XG5cblx0cHJlbG9hZCgpIHtcblx0XHR0aGlzLmdhbWUubG9hZC5pbWFnZSgnZ2FtZUxvZ28nLCAnYXNzZXRzL2ltZy9nYW1lbG9nby5wbmcnKTtcblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHR0aGlzLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjRkZGRkZGJztcblxuXHRcdHRoaXMuZ2FtZUxvZ28gPSB0aGlzLmdhbWUuYWRkLmltYWdlKHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCAyMTAsICdnYW1lTG9nbycpO1xuXHRcdHRoaXMuZ2FtZUxvZ28uYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcblxuXHRcdHRoaXMubG9naW5UZXh0ID0gdGhpcy5nYW1lLmFkZC50ZXh0KFxuXHRcdFx0dGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIFxuXHRcdFx0dGhpcy5nYW1lLndvcmxkLmNlbnRlclksIFxuXHRcdFx0J0xvZ2luJyxcblx0XHRcdHtcblx0XHRcdFx0Zm9udDogJzM1cHggQXJpYWw7Jyxcblx0XHRcdFx0ZmlsbDogJyMwMDAwMDAnXG5cdFx0XHR9XG5cdFx0KTtcblx0XHR0aGlzLmxvZ2luVGV4dC5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xuXHRcdHRoaXMubG9naW5UZXh0LmFscGhhID0gMC44O1xuXG5cdFx0dGhpcy5sb2dpblRleHQuaW5wdXRFbmFibGVkID0gdHJ1ZTtcblx0XHR0aGlzLmxvZ2luVGV4dC5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcblxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdHRoaXMubG9naW5UZXh0LmV2ZW50cy5vbklucHV0RG93bi5hZGQoKGUpID0+IHtcblx0XHRcdGNvbnN0IHR3ZWVuID0gc2VsZi5nYW1lLmFkZC50d2VlbihzZWxmLmxvZ2luVGV4dCkudG8oe1xuXHRcdFx0XHRhbHBoYTogMC4yXG5cdFx0XHR9LCA3MDAsIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLk91dCwgZmFsc2UsIDAsIDAsIGZhbHNlKTtcblx0XHRcdFxuXHRcdFx0dHdlZW4ub25Db21wbGV0ZS5hZGQoKGUpID0+IHtcblx0XHRcdFx0bGV0IHVzZXIgPSBzZWxmLnNlcnZpY2VDb250cm9sbGVyLmF1dGhTZXJ2aWNlLmdldExhc3RMb2dnZWRJblVzZXIoKTtcblx0XHRcdFx0aWYgKHVzZXIgJiYgdXNlci51c2VySWQpIHtcblx0XHRcdFx0XHRzZWxmLnNlcnZpY2VDb250cm9sbGVyLmxvZ2luKHVzZXIudXNlcklkLCAodXNlcjogVXNlciwgaXNTdWNjZXNzOiBib29sZWFuKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoaXNTdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRcdGFsZXJ0KGAke3VzZXIudXNlcklkfeuLmCwg64uk7IucIOuwqeusuO2VtOyjvOyFqOq1sOyalC4g7ZmY7JiB7ZWp64uI64ukLmApO1xuXHRcdFx0XHRcdFx0XHRjb25zdCBzdGFnZUluZm8gPSBzZWxmLnNlcnZpY2VDb250cm9sbGVyLmdldFN0YWdlSW5mb3JtYXRpb24oKTtcblx0XHRcdFx0XHRcdFx0c2VsZi5zdGF0ZUNvbnRyb2xsZXIuZ29TdGF0ZSgnTGV2ZWwnLCB0cnVlLCB0cnVlLCBzdGFnZUluZm8pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0YWxlcnQoJ+yYiOyghOyXkCDrsKnrrLjtlZjsi6Ag7KCB7J20IOyXhuycvOyLnOq1sOyalD8g7IKs7Jqp7J6QIOuTseuhne2ZlOuptOycvOuhnCDsnbTrj5ntlanri4jri6QuJyk7XG5cdFx0XHRcdFx0XHRcdHNlbGYuc3RhdGVDb250cm9sbGVyLmdvU3RhdGUoJ1JlZ2lzdGVyJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XHRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhbGVydCgn7JiI7KCE7JeQIOuwqeusuO2VmOyLoCDsoIHsnbQg7JeG7Jy87Iuc6rWw7JqUPyDsgqzsmqnsnpAg65Ox66Gd7ZmU66m07Jy866GcIOydtOuPme2VqeuLiOuLpC4nKTtcblx0XHRcdFx0XHRzZWxmLnN0YXRlQ29udHJvbGxlci5nb1N0YXRlKCdSZWdpc3RlcicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCBzZWxmKTtcblxuXHRcdFx0dHdlZW4uc3RhcnQoKTtcblx0XHR9LCB0aGlzKTtcblxuXG5cdFx0dGhpcy5sb2dpblRleHQuZXZlbnRzLm9uSW5wdXRPdmVyLmFkZCgoZSkgPT4ge1xuXHRcdFx0c2VsZi5sb2dpblRleHQuYWxwaGEgPSAwLjU7XG5cdFx0fSwgdGhpcyk7XG5cblx0XHR0aGlzLmxvZ2luVGV4dC5ldmVudHMub25JbnB1dE91dC5hZGQoKGUpID0+IHtcblx0XHRcdHNlbGYubG9naW5UZXh0LmFscGhhID0gMC44O1xuXHRcdH0sIHRoaXMpO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXG5cdH1cbn0iLCJpbXBvcnQgQmFzZSBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgeyBTdGFnZSB9IGZyb20gXCIuLi92by9zdGFnZVwiO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vdm8vcG9pbnRcIjtcbmltcG9ydCB7IFJlY29yZERhbyB9IGZyb20gXCIuLi9kYW8vcmVjb3JkRGFvXCI7XG5pbXBvcnQgUmVjb3JkLCB7IFN0YWdlUmVjb3JkIH0gZnJvbSBcIi4uL3ZvL3JlY29yZFwiO1xuaW1wb3J0IHsgUmFuayB9IGZyb20gXCIuLi92by9yYW5rXCI7XG5cbmV4cG9ydCBjbGFzcyBQbGF5IGV4dGVuZHMgQmFzZSB7XG5cdHN0YXRpYyByZWFkb25seSByYXlMZW5ndGggPSA1MDA7XG5cdHN0YXRpYyByZWFkb25seSBudW1PZlJheXMgPSAyMDtcblx0c3RhdGljIHJlYWRvbmx5IGxpZ2h0QW5nbGUgPSBNYXRoLlBJLzQ7IC8vIDQ1IGRlZy5cblxuXHRwcml2YXRlIHJlYWRvbmx5IHNwZWVkID0gMjtcblxuXHR0aW1lciA6IFBoYXNlci5UaW1lcjtcblx0ZWxhcHNlZFRpbWUgOiBudW1iZXI7XG5cdHRpbWVIYW5kbGVyOiBudW1iZXI7XG5cdHRpbWVUZXh0IDogUGhhc2VyLlRleHQ7XG5cdFxuXHRmbG9vciA6IFBoYXNlci5TcHJpdGU7XG5cdHdhbGwgOiBQaGFzZXIuU3ByaXRlO1xuXHR3YWxsc0JpdE1hcCA6IFBoYXNlci5CaXRtYXBEYXRhO1xuXHRtYXNrIDogUGhhc2VyLkdyYXBoaWNzO1xuXHRwbGF5ZXIgOiBQaGFzZXIuU3ByaXRlO1xuXHRwbGF5ZXJQYXRoIDogc3RyaW5nO1xuXG5cdGN1cnNvciA6IFBoYXNlci5DdXJzb3JLZXlzO1xuXHRcblx0c3RhZ2VJbmZvIDogU3RhZ2U7XG5cdGN1cnJlbnRFeGl0UG9pbnQgOiBQb2ludDtcblx0Y3VycmVudEV4aXRHcmFwaGljIDogUGhhc2VyLkdyYXBoaWNzO1xuXG5cdHdhbGxDb2xsaXNpb25Tb3VuZDogUGhhc2VyLlNvdW5kO1xuXHR0YWRhU291bmQ6IFBoYXNlci5Tb3VuZDtcblxuXHRjb25zdHJ1Y3RvcihnYW1lKSB7XG5cdFx0c3VwZXIoZ2FtZSk7XG5cdH1cblxuXHRpbml0KHN0YWdlSW5mbyA6IFN0YWdlKSB7XG5cdFx0dGhpcy5zdGFnZUluZm8gPSBzdGFnZUluZm87XG5cdFx0dGhpcy5wbGF5ZXJQYXRoID0gJ2Fzc2V0cy9pbWcvcGxheWVyLXNwcmVhZHNoZWV0LnBuZyc7XG5cdH1cblxuXHRwcmVsb2FkKCkge1xuXHRcdHRoaXMuZ2FtZS5sb2FkLmltYWdlKCdmbG9vcicsIHRoaXMuc3RhZ2VJbmZvLmZsb29yRmlsZVBhdGgpO1xuXHRcdHRoaXMuZ2FtZS5sb2FkLmltYWdlKCd3YWxsJywgdGhpcy5zdGFnZUluZm8ud2FsbEZpbGVQYXRoKTtcblx0XHR0aGlzLmdhbWUubG9hZC5zcHJpdGVzaGVldCgncGxheWVyJywgdGhpcy5wbGF5ZXJQYXRoLCA2NCwgNjQsIDM2KTtcblx0XHR0aGlzLmxvYWQuYXVkaW8oXCJ3YWxsQ29sbGlzaW9uU291bmRcIiwgW1wiYXNzZXRzL21wMy9iZWVwLTAxYS5tcDNcIl0pO1xuXHRcdHRoaXMubG9hZC5hdWRpbyhcInRhZGFTb3VuZFwiLCBbXCJhc3NldHMvbXAzL3RhZGEtMDFhLm1wM1wiXSk7XG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0dGhpcy53YWxsQ29sbGlzaW9uU291bmQgPSB0aGlzLmFkZC5hdWRpbygnd2FsbENvbGxpc2lvblNvdW5kJyk7XG5cdFx0dGhpcy50YWRhU291bmQgPSB0aGlzLmFkZC5hdWRpbygndGFkYVNvdW5kJyk7XG5cblx0XHR0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAwMDAnOyBcblx0XHQvLyB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJzB4ZmZmZmZmJzsgXG5cblx0XHR0aGlzLmdhbWUud29ybGQuc2V0Qm91bmRzKDAsIDAsIHRoaXMud29ybGQud2lkdGgsIHRoaXMud29ybGQuaGVpZ2h0LTEyMCk7XG5cdFx0XG5cdFx0dGhpcy5jcmVhdGVGbG9vcigpO1xuXHRcdHRoaXMubWFrZUZpcnN0RXhpdFBvaW50KCk7XG5cdFx0dGhpcy5jcmVhdGVXYWxsKCk7XG5cdFx0dGhpcy5jcmVhdGVQbGF5ZXIoKTsgXG5cblx0XHR0aGlzLmdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllciwgUGhhc2VyLkNhbWVyYS5GT0xMT1dfTE9DS09OLCAwLjEsIDAuMSk7XG5cblx0XHR0aGlzLmNyZWF0ZU1hc2soKTtcblxuXHRcdHRoaXMuZmxvb3IubWFzayA9IHRoaXMubWFzaztcblxuXHRcdHRoaXMudGltZXIgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUoZmFsc2UpO1xuXG5cdFx0dGhpcy5jdXJzb3IgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xuXHRcdHRoaXMuY3JlYXRlVGltZXIoKTtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlVGltZXIoKSB7XG5cdFx0dGhpcy50aW1lVGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dCh0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgNTAwLCAnVGltZXI6IDAgc2Vjb25kJywge1xuXHRcdFx0ZmlsbDogJyNmZmZmZmYnLFxuXHRcdFx0Zm9udDogJzE1cHggQXJpYWwnXG5cdFx0fSk7XG5cblx0XHR0aGlzLnN0YXJ0VGltZXIoKTtcblx0fVxuXG5cdHByaXZhdGUgc3RhcnRUaW1lcigpIHtcblx0XHR0aGlzLmVsYXBzZWRUaW1lID0gMDtcblx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHR0aGlzLnRpbWVIYW5kbGVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXHRcdFx0c2VsZi5lbGFwc2VkVGltZSsrO1xuXHRcdH0sIDEwMDApO1xuXHR9XG5cblx0cHJpdmF0ZSBzdG9wVGltZXIoKSB7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVIYW5kbGVyKTtcblx0fVxuXG5cdHByaXZhdGUgY291bnRUaW1lKCkge1xuXHRcdC8vIHRoaXMuZWxhcHNlZFRpbWUgPSB0aGlzLmdhbWUudGltZS50b3RhbEVsYXBzZWRTZWNvbmRzKCk7XG5cblx0XHRsZXQgdGltZVRleHQgPSAnVGltZXI6ICcgKyB0aGlzLmVsYXBzZWRUaW1lICsgJyBzZWNvbmRzJ1xuXHRcdHRoaXMudGltZVRleHQuc2V0VGV4dCh0aW1lVGV4dCwgdHJ1ZSk7XG5cdH1cblxuXG5cdHVwZGF0ZSgpIHtcblx0XHR0aGlzLm1vdmVQbGF5ZXIoKTtcblx0XHR0aGlzLm1vdmVGbGFzaCgpO1xuXHRcdHRoaXMucmFuZG9tQWxwaGFUbyh0aGlzLmZsb29yKTtcblx0XHR0aGlzLmNvdW50VGltZSgpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMuZ2FtZS5kZWJ1Zy5pbnB1dEluZm8oMzIsIDMyKTtcblxuXHRcdFxuXHR9XG5cblx0cHJpdmF0ZSBtYWtlRmlyc3RFeGl0UG9pbnQoKSB7XG5cdFx0Y29uc3QgaWR4T2ZFeGl0UG9pbnQgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpKjExICUgdGhpcy5zdGFnZUluZm8uZXhpdFBvaW50cy5sZW5ndGg7XG5cdFx0dGhpcy5zdGFnZUluZm8uZXhpdFBvaW50c1tpZHhPZkV4aXRQb2ludF0uYWN0aXZlID0gdHJ1ZTtcblx0XHR0aGlzLmN1cnJlbnRFeGl0UG9pbnQgPSB0aGlzLnN0YWdlSW5mby5leGl0UG9pbnRzW2lkeE9mRXhpdFBvaW50XTtcblx0XHR0aGlzLnJlbmRlckV4aXRQb2ludCh0aGlzLmN1cnJlbnRFeGl0UG9pbnQpO1xuXHR9XG5cblx0cHJpdmF0ZSByZW5kZXJFeGl0UG9pbnQoZXhpdFBvaW50IDogUG9pbnQpIHtcblx0XHRjb25zdCBncmFwaGljYWxQb2ludCA9ICh4LCB5KSA9PiB7XG5cdFx0XHR0aGlzLmN1cnJlbnRFeGl0R3JhcGhpYyA9IHRoaXMuZ2FtZS5hZGQuZ3JhcGhpY3MoMCwgMCk7XG5cdFx0XHR0aGlzLmN1cnJlbnRFeGl0R3JhcGhpYy5iZWdpbkZpbGwoMHhmZjAwMDAsIDAuOCk7XG5cdFx0XHR0aGlzLmN1cnJlbnRFeGl0R3JhcGhpYy5kcmF3Q2lyY2xlKHgsIHksIDEwKTtcblx0XHRcdHRoaXMuY3VycmVudEV4aXRHcmFwaGljLmVuZEZpbGwoKTtcblx0XHR9O1xuXG5cdFx0Z3JhcGhpY2FsUG9pbnQoZXhpdFBvaW50LngsIGV4aXRQb2ludC55KTtcblx0fVxuXG5cdHByaXZhdGUgcmFuZG9tQWxwaGFUbyhvYmogOmFueSkge1xuXHRcdG9iai5hbHBoYSA9IDAuNSArIE1hdGgucmFuZG9tKCkgKiAwLjU7XG5cdH1cblxuXHRwcml2YXRlIGNyZWF0ZVBsYXllcigpIHtcblx0XHR0aGlzLnBsYXllciA9IHRoaXMuZ2FtZS5hZGQuc3ByaXRlKDc1LCA3NSwgJ3BsYXllcicpO1xuXHRcdHRoaXMucGxheWVyLmFuY2hvci5zZXQoLjUsIC41KTtcdFxuXG5cdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5hZGQoJ25vcnRoJywgWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDhdLCAxMCwgdHJ1ZSk7XG5cdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5hZGQoJ3dlc3QnLCBbOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3XSwgMTAsIHRydWUpO1xuXHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMuYWRkKCdzb3V0aCcsIFsxOCwgMTksIDIwLCAyMSwgMjIsIDIzLCAyNCwgMjUsIDI2XSwgMTAsIHRydWUpO1xuXHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMuYWRkKCdlYXN0JywgWzI3LCAyOCwgMjksIDMwLCAzMSwgMzIsIDMzLCAzNCwgMzUgXSwgMTAsIHRydWUpO1xuXHR9XG5cblx0cHJpdmF0ZSBjcmVhdGVGbG9vcigpIHtcblx0XHR0aGlzLmZsb29yID0gdGhpcy5nYW1lLmFkZC5zcHJpdGUoMCwgMCwgJ2Zsb29yJyk7XG5cdFx0dGhpcy5mbG9vci53aWR0aCA9IDY0MDtcblx0XHR0aGlzLmZsb29yLmhlaWdodCA9IDQ4MDtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlTWFzaygpIHtcblx0XHR0aGlzLm1hc2sgPSB0aGlzLmdhbWUuYWRkLmdyYXBoaWNzKDAsIDApO1xuXHR9XG5cblx0cHJpdmF0ZSBjcmVhdGVXYWxsKCkge1xuXHRcdHRoaXMud2FsbHNCaXRNYXAgPSB0aGlzLmdhbWUubWFrZS5iaXRtYXBEYXRhKDY0MCwgNDgwKTtcblx0XHR0aGlzLndhbGxzQml0TWFwLmRyYXcoJ3dhbGwnKTtcblx0XHR0aGlzLndhbGxzQml0TWFwLnVwZGF0ZSgpO1xuXHRcdHRoaXMud2FsbCA9IHRoaXMuZ2FtZS5hZGQuc3ByaXRlKDAsIDAsIHRoaXMud2FsbHNCaXRNYXApO1xuXHR9XG5cblx0cHJpdmF0ZSBtb3ZlRmxhc2goKSB7XG5cdFx0Y29uc3QgcGxheWVyV2lkdGggPSB0aGlzLnBsYXllci53aWR0aDtcblx0XHRjb25zdCBwbGF5ZXJIZWlnaHQgPSB0aGlzLnBsYXllci5oZWlnaHQ7XG5cblx0XHRjb25zdCBwbGF5ZXJYID0gdGhpcy5wbGF5ZXIueDtcblx0XHRjb25zdCBwbGF5ZXJZID0gdGhpcy5wbGF5ZXIueTtcblx0XHRcblx0XHRjb25zdCBkeSA9IHRoaXMuZ2FtZS5pbnB1dC55IC0gcGxheWVyWTtcblx0XHRjb25zdCBkeCA9IHRoaXMuZ2FtZS5pbnB1dC54IC0gcGxheWVyWDtcblxuXHRcdGNvbnN0IG1vdXNlQW5nbGUgPSBNYXRoLmF0YW4yKGR5LCBkeCk7XG5cblx0XHR0aGlzLm1hc2suY2xlYXIoKTtcblx0XHR0aGlzLm1hc2subGluZVN0eWxlKDIsIDB4ZmZmZmZmLCAxKTtcblxuXHRcdHRoaXMubWFzay5iZWdpbkZpbGwoMHgwMDAwMDApO1xuXHRcdHRoaXMubWFzay5tb3ZlVG8ocGxheWVyWCwgcGxheWVyWSk7XG5cdFx0Zm9yIChsZXQgaT0wOyBpPFBsYXkubnVtT2ZSYXlzOyBpKyspIHtcblx0XHRcdGNvbnN0IHJheUFuZ2xlID0gbW91c2VBbmdsZSAtIChQbGF5LmxpZ2h0QW5nbGUvMikgKyAoUGxheS5saWdodEFuZ2xlL1BsYXkubnVtT2ZSYXlzKSAqIGk7XG5cdFx0XHRsZXQgbGFzdFggPSBwbGF5ZXJYO1xuXHRcdFx0bGV0IGxhc3RZID0gcGxheWVyWTtcblx0XHRcdFxuXHRcdFx0Zm9yIChsZXQgaj0xOyBqPD1QbGF5LnJheUxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGNvbnN0IHggPSBNYXRoLnJvdW5kKHBsYXllclggKyAoaiAqIE1hdGguY29zKHJheUFuZ2xlKSkpO1xuXHRcdFx0XHRjb25zdCB5ID0gTWF0aC5yb3VuZChwbGF5ZXJZICsgKGogKiBNYXRoLnNpbihyYXlBbmdsZSkpKTtcblxuXHRcdFx0XHRjb25zdCBjb2xvciA9IHRoaXMucGlja0NvbG9yT2YoeCwgeSwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdFx0XHRcdGlmIChjb2xvciA9PSAwKSB7XG5cdFx0XHRcdFx0bGFzdFggPSB4O1xuXHRcdFx0XHRcdGxhc3RZID0geTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLm1hc2subGluZVRvKGxhc3RYLCBsYXN0WSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMubWFzay5saW5lVG8obGFzdFgsIGxhc3RZKTtcblx0XHR9XG5cblx0XHR0aGlzLm1hc2subGluZVRvKHBsYXllclgsIHBsYXllclkpO1xuXHRcdHRoaXMubWFzay5lbmRGaWxsKCk7XG5cdH1cblxuXHRwcml2YXRlIG1vdmVQbGF5ZXIoKSB7XG5cdFx0bGV0IHhTcGVlZCA9IDA7XG5cdFx0bGV0IHlTcGVlZCA9IDA7XG5cdFx0bGV0IGlzTW92aW5nID0gZmFsc2U7XG5cdFx0bGV0IGNhbk1vdmUgPSBmYWxzZTtcblxuXHRcdGNvbnN0IHBsYXllcldpZHRoID0gdGhpcy5wbGF5ZXIud2lkdGg7XG5cdFx0Y29uc3QgcGxheWVySGVpZ2h0ID0gdGhpcy5wbGF5ZXIuaGVpZ2h0O1xuXG5cdFx0Y29uc3QgcGxheWVyWCA9IHRoaXMucGxheWVyLng7XG5cdFx0Y29uc3QgcGxheWVyWSA9IHRoaXMucGxheWVyLnk7XG5cblx0XHRjb25zdCBjb2xvciA9IHtcblx0XHRcdG5vcnRoIDogMCxcblx0XHRcdHNvdXRoIDogMCxcblx0XHRcdHdlc3QgOiAwLFxuXHRcdFx0ZWFzdCA6IDBcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jdXJzb3IudXAuaXNEb3duKSB7XG5cdFx0XHR5U3BlZWQgLT0gdGhpcy5zcGVlZDtcblx0XHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnbm9ydGgnKTtcblx0XHRcdGNvbnN0IG5vcnRoRWFzdCA9IHRoaXMucGlja0NvbG9yT2YocGxheWVyWCArIHBsYXllcldpZHRoLzIgKyB4U3BlZWQsIHBsYXllclkgLSBwbGF5ZXJIZWlnaHQvMiArIHlTcGVlZCwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdFx0XHRjb25zdCBub3J0aFdlc3QgPSB0aGlzLnBpY2tDb2xvck9mKHBsYXllclggLSBwbGF5ZXJXaWR0aC8yICsgeFNwZWVkLCBwbGF5ZXJZIC0gcGxheWVySGVpZ2h0LzIgKyB5U3BlZWQsIHRoaXMud2FsbHNCaXRNYXApO1xuXHRcdFx0Y29sb3Iubm9ydGggPSBub3J0aEVhc3QgKyBub3J0aFdlc3Q7XG5cdFx0fVxuXHRcdFxuXHRcdGlmICh0aGlzLmN1cnNvci5kb3duLmlzRG93bikge1xuXHRcdFx0eVNwZWVkICs9IHRoaXMuc3BlZWQ7XG5cdFx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3NvdXRoJyk7XG5cdFx0XHRjb25zdCBzb3V0aEVhc3QgPSB0aGlzLnBpY2tDb2xvck9mKHBsYXllclggKyBwbGF5ZXJXaWR0aC8yICsgeFNwZWVkLCBwbGF5ZXJZICsgcGxheWVySGVpZ2h0LzIgKyB5U3BlZWQsIHRoaXMud2FsbHNCaXRNYXApO1xuXHRcdFx0Y29uc3Qgc291dGhXZXN0ID0gdGhpcy5waWNrQ29sb3JPZihwbGF5ZXJYIC0gcGxheWVyV2lkdGgvMiArIHhTcGVlZCwgcGxheWVyWSArIHBsYXllckhlaWdodC8yICsgeVNwZWVkLCB0aGlzLndhbGxzQml0TWFwKTtcblx0XHRcdGNvbG9yLnNvdXRoID0gc291dGhFYXN0ICsgc291dGhXZXN0O1xuXHRcdH1cblx0XHRcblx0XHRpZiAodGhpcy5jdXJzb3IubGVmdC5pc0Rvd24pIHtcblx0XHRcdHhTcGVlZCAtPSB0aGlzLnNwZWVkO1xuXHRcdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCd3ZXN0Jyk7XG5cdFx0XHRjb25zdCB3ZXN0Tm9ydGggPSB0aGlzLnBpY2tDb2xvck9mKHBsYXllclggLSBwbGF5ZXJXaWR0aC8yICsgeFNwZWVkLCBwbGF5ZXJZIC0gcGxheWVySGVpZ2h0LzIgKyB5U3BlZWQsIHRoaXMud2FsbHNCaXRNYXApO1xuXHRcdFx0Y29uc3Qgd2VzdFNvdXRoID0gdGhpcy5waWNrQ29sb3JPZihwbGF5ZXJYIC0gcGxheWVyV2lkdGgvMiArIHhTcGVlZCwgcGxheWVyWSArIHBsYXllckhlaWdodC8yICsgeVNwZWVkLCB0aGlzLndhbGxzQml0TWFwKTtcblx0XHRcdGNvbG9yLndlc3QgPSB3ZXN0Tm9ydGggKyB3ZXN0U291dGg7XG5cdFx0fVxuXHRcdFxuXHRcdGlmICh0aGlzLmN1cnNvci5yaWdodC5pc0Rvd24pIHtcblx0XHRcdHhTcGVlZCArPSB0aGlzLnNwZWVkO1xuXHRcdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdlYXN0Jyk7XG5cdFx0XHRjb25zdCBlYXN0Tm9ydGggPSB0aGlzLnBpY2tDb2xvck9mKHBsYXllclggKyBwbGF5ZXJXaWR0aC8yICsgeFNwZWVkLCBwbGF5ZXJZIC0gcGxheWVySGVpZ2h0LzIgKyB5U3BlZWQsIHRoaXMud2FsbHNCaXRNYXApO1xuXHRcdFx0Y29uc3QgZWFzdFNvdXRoID0gdGhpcy5waWNrQ29sb3JPZihwbGF5ZXJYICsgcGxheWVyV2lkdGgvMiArIHhTcGVlZCwgcGxheWVyWSArIHBsYXllckhlaWdodC8yICsgeVNwZWVkLCB0aGlzLndhbGxzQml0TWFwKTtcblx0XHRcdGNvbG9yLmVhc3QgPSBlYXN0Tm9ydGggKyBlYXN0U291dGg7XG5cdFx0fVxuXG5cdFx0aXNNb3ZpbmcgPSBNYXRoLmFicyh4U3BlZWQpICsgTWF0aC5hYnMoeVNwZWVkKSA8IHRoaXMuc3BlZWQqMiAmJiBNYXRoLmFicyh4U3BlZWQpICsgTWF0aC5hYnMoeVNwZWVkKSA+IDA7XG5cdFx0Y2FuTW92ZSA9IGNvbG9yLm5vcnRoICsgY29sb3Iuc291dGggKyBjb2xvci5lYXN0ICsgY29sb3Iud2VzdCA9PSAwO1xuXHRcdGlmIChpc01vdmluZyAmJiBjYW5Nb3ZlKSB7XG5cdFx0XHR0aGlzLnBsYXllci54ICs9IHhTcGVlZDtcblx0XHRcdHRoaXMucGxheWVyLnkgKz0geVNwZWVkO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnN0b3BQbGF5ZXJBbmltY2F0ZWlvbigpO1xuXHRcdH1cblxuXHRcdGlmIChpc01vdmluZyAmJiAhY2FuTW92ZSkge1xuXHRcdFx0dGhpcy5nYW1lLmNhbWVyYS5zaGFrZSgpO1xuXHRcdFx0dGhpcy53YWxsQ29sbGlzaW9uU291bmQucGxheSgpO1xuXHRcdH1cblxuXHRcdFxuXHRcdGlmIChNYXRoLmFicyh0aGlzLmN1cnJlbnRFeGl0UG9pbnQueC10aGlzLnBsYXllci54KSA8IDMgJiYgTWF0aC5hYnModGhpcy5wbGF5ZXIueS10aGlzLmN1cnJlbnRFeGl0UG9pbnQueSkgPCAzKSB7XG5cdFx0XHRhbGVydCgnQ29uZ3JhdCEnKTtcblx0XHRcdHRoaXMudGFkYVNvdW5kLnBsYXkoKTtcblxuXHRcdFx0Y29uc3QgdXNlcklkID0gdGhpcy5zZXJ2aWNlQ29udHJvbGxlci5hdXRoU2VydmljZS5nZXRMYXN0TG9nZ2VkSW5Vc2VyKCkudXNlcklkO1xuXHRcdFx0Y29uc3Qgc3RhZ2VJZCA9IHRoaXMuc3RhZ2VJbmZvLnN0YWdlSWQ7XG5cdFx0XHRjb25zdCByYW5rID0gdGhpcy5zZXJ2aWNlQ29udHJvbGxlci5yYW5rU2VydmljZS5jYWxjdWxhdGVSYW5rKHN0YWdlSWQsIHRoaXMuZWxhcHNlZFRpbWUpO1xuXG5cdFx0XHRjb25zdCBzdGFnZVJlY29yZCA9IG5ldyBTdGFnZVJlY29yZChzdGFnZUlkLCByYW5rLCB0aGlzLmVsYXBzZWRUaW1lKTtcblx0XHRcdGNvbnN0IHN0YWdlUmVjb3JkT2JqID0ge307XG5cdFx0XHRzdGFnZVJlY29yZE9ialtzdGFnZUlkXSA9IHN0YWdlUmVjb3JkO1xuXHRcdFx0Y29uc3QgcmVjb3JkID0gbmV3IFJlY29yZCh1c2VySWQsIHN0YWdlUmVjb3JkT2JqKTtcblx0XHRcdHRoaXMuc2VydmljZUNvbnRyb2xsZXIucmVjb3JkUmFuayhyZWNvcmQpO1xuXHRcdFx0XG5cdFx0XHRjb25zdCBzdGFnZUluZm8gPSB0aGlzLnNlcnZpY2VDb250cm9sbGVyLmdldFN0YWdlSW5mb3JtYXRpb24oKTtcblx0XHRcdHRoaXMuc3RhdGVDb250cm9sbGVyLmdvU3RhdGUoJ0xldmVsJywgdHJ1ZSwgdHJ1ZSwgc3RhZ2VJbmZvKTtcblxuXHRcdFx0dGhpcy5zdG9wVGltZXIoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHBpY2tDb2xvck9mKHg6IG51bWJlciwgeTogbnVtYmVyLCBiaXRNYXBEYXRhOiBQaGFzZXIuQml0bWFwRGF0YSkge1xuXHRcdGNvbnN0IGNvbG9yID0gYml0TWFwRGF0YS5nZXRQaXhlbDMyKHgsIHkpO1xuXHRcdHJldHVybiBjb2xvcjtcblx0fVxuXG5cdHByaXZhdGUgc3RvcFBsYXllckFuaW1jYXRlaW9uKCkge1xuXHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMuc3RvcCgnbm9ydGgnKTtcblx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLnN0b3AoJ3NvdXRoJyk7XG5cdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5zdG9wKCd3ZXN0Jyk7XG5cdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5zdG9wKCdlYXN0Jyk7XG5cdH1cbn0iLCJpbXBvcnQgVXRpbCBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50L2lucHV0VGV4dCc7XG5pbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vdm8vdXNlcic7XG5pbXBvcnQgU2NvcmUgZnJvbSAnLi4vdm8vc2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXIgZXh0ZW5kcyBCYXNlIHtcblx0aW5wdXRUZXh0IDogQ29tcG9uZW50LklucHV0VGV4dDtcblx0cmVnaXN0ZXJCdG4gOiBQaGFzZXIuVGV4dDtcblxuXHRjb25zdHJ1Y3RvcihnYW1lKSB7XG5cdFx0c3VwZXIoZ2FtZSk7XG5cdH1cblxuXHRwcmVsb2FkKCkge1xuXHRcdFxuXHR9XG5cblx0cHJpdmF0ZSBzZXRSZWdpc3RlcklucHV0VGV4dCgpIHtcblx0XHRsZXQgdGV4dFdpZHRoID0gMjAwO1xuXHRcdGxldCB0ZXh0SGVpZ2h0ID0gODA7XG5cdFx0bGV0IHRleHRYID0gdGhpcy5nYW1lLndvcmxkLmNlbnRlclggLSB0ZXh0V2lkdGgvMjtcblx0XHRsZXQgdGV4dFkgPSB0aGlzLmdhbWUud29ybGQuY2VudGVyWSAtIHRleHRIZWlnaHQvMjtcblxuXHRcdGxldCB0ZXh0TWF4TGVuZ3RoID0gMTQ7XG5cblx0XHRsZXQgdGV4dFN0eWxlID0ge1xuXHRcdFx0ZmlsbDogJyMwMDAwMDAnLFxuXHRcdFx0Ym91bmRzQWxpZ25IOiAnY2VudGVyJyxcblx0XHRcdGJvdW5kc0FsaWduVjogJ21pZGRsZScsXG5cdFx0XHRmb250OiAnMjBweCBBcmlhbCdcblx0XHR9XG5cblx0XHR0aGlzLmlucHV0VGV4dCA9IG5ldyBDb21wb25lbnQuSW5wdXRUZXh0KHRoaXMuZ2FtZSwgdGV4dFgsIHRleHRZLCB0ZXh0V2lkdGgsIHRleHRIZWlnaHQsIHRleHRNYXhMZW5ndGgsICdleCl1c2VyMDAxJywgdGV4dFN0eWxlKTtcblx0fVxuXG5cdHByaXZhdGUgc2V0UmVnaXN0ZXJCdXR0b24oKSB7XG5cdFx0bGV0IGJ0bldpZHRoID0gMjAwO1xuXHRcdGxldCBidG5IZWlnaHQgPSA4MDtcblx0XHRcblx0XHRsZXQgYnRuWCA9IHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYOy8vIC0gYnRuV2lkdGgvMjtcblx0XHRsZXQgYnRuWSA9IHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZICsgMTIwOy8vIC0gYnRuSGVpZ2h0LzIgKyAxMDA7XG5cblx0XHRsZXQgYnRuVGV4dCA9ICdSZWdpc3Rlcic7XG5cblx0XHRjb25zdCBzZWxmID0gdGhpcztcblxuXHRcdGxldCB0ZXh0U3R5bGUgPSB7XG5cdFx0XHRmaWxsOiAnIzAwMDAwMCcsXG5cdFx0XHRib3VuZHNBbGlnbkg6ICdjZW50ZXInLFxuXHRcdFx0Ym91bmRzQWxpZ25WOiAnbWlkZGxlJyxcblx0XHRcdGZvbnQ6ICcyMHB4IEFyaWFsJ1xuXHRcdH1cblx0XHR0aGlzLnJlZ2lzdGVyQnRuID0gdGhpcy5nYW1lLmFkZC50ZXh0KGJ0blgsIGJ0blksIGJ0blRleHQsIHRleHRTdHlsZSk7XG5cdFx0dGhpcy5yZWdpc3RlckJ0bi5hbmNob3Iuc2V0VG8oLjUsIC41KTtcblx0XHRcblx0XHR0aGlzLnJlZ2lzdGVyQnRuLmlucHV0RW5hYmxlZCA9IHRydWU7XG5cdFx0dGhpcy5yZWdpc3RlckJ0bi5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcblxuXHRcdHRoaXMucmVnaXN0ZXJCdG4uZXZlbnRzLm9uSW5wdXREb3duLmFkZCgoZSkgPT4ge1xuXHRcdFx0Y29uc3QgdXNlcklkID0gc2VsZi5pbnB1dFRleHQudGV4dDtcblx0XHRcdGlmIChjb25maXJtKGAke3VzZXJJZH3ri5jsnLzroZwg7ZWY7Iuc6rKg7Iq164uI6rmMP2ApKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRzZWxmLnNhdmVVc2VySWQodXNlcklkLCAodXNlciwgaXNBbHJlYWR5RXhpc3QpID0+IHtcblx0XHRcdFx0XHRpZiAoaXNBbHJlYWR5RXhpc3QpIHtcblx0XHRcdFx0XHRcdGFsZXJ0KGAke3NlbGYuaW5wdXRUZXh0LnRleHR964uYIOyYiOyghOyXkCDsmKTsi6DsoIHsnbTsnojsnLzsi5zqtbDsmpQuIOuLpOyLnCDtlZzrsogg7ZmY7JiB7ZWp64uI64ukLmApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHNlbGYuc2VydmljZUNvbnRyb2xsZXIubG9naW4odXNlci51c2VySWQsICh1c2VyLCBpc1N1Y2Nlc3MpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHN0YWdlSW5mbyA9IHNlbGYuc2VydmljZUNvbnRyb2xsZXIuZ2V0U3RhZ2VJbmZvcm1hdGlvbigpO1xuXHRcdFx0XHRcdFx0c2VsZi5zdGF0ZUNvbnRyb2xsZXIuZ29TdGF0ZSgnTGV2ZWwnLCB0cnVlLCB0cnVlLCBzdGFnZUluZm8pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9LCB0aGlzKTtcblxuXHRcdHRoaXMucmVnaXN0ZXJCdG4uZXZlbnRzLm9uSW5wdXRPdmVyLmFkZCgoZSkgPT4ge1xuXHRcdFx0dGhpcy5yZWdpc3RlckJ0bi5hbHBoYSA9IDAuNztcblx0XHR9LCB0aGlzKTtcblxuXHRcdHRoaXMucmVnaXN0ZXJCdG4uZXZlbnRzLm9uSW5wdXRPdXQuYWRkKChlKSA9PiB7XG5cdFx0XHR0aGlzLnJlZ2lzdGVyQnRuLmFscGhhID0gMTtcblx0XHR9LCB0aGlzKTtcblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHR0aGlzLnNldFJlZ2lzdGVySW5wdXRUZXh0KCk7XG5cdFx0dGhpcy5zZXRSZWdpc3RlckJ1dHRvbigpO1xuXHRcdFxuXHR9XG5cblx0c2F2ZVVzZXJJZCh1c2VySWQsIGNhbGxiYWNrKSB7XG5cdFx0Y29uc3QgdXNlciA9IG5ldyBVc2VyKHVzZXJJZCwgbmV3IFNjb3JlKCkpO1xuXHRcdHRoaXMuc2VydmljZUNvbnRyb2xsZXIucmVnaXN0ZXJVc2VyKHVzZXIsIGNhbGxiYWNrKTtcblx0fVxufSIsImV4cG9ydCBjbGFzcyBQb2ludCB7XG5cdHg6IG51bWJlcjtcblx0eTogbnVtYmVyO1xuXHRhY3RpdmU6IGJvb2xlYW47XG5cblx0Y29uc3RydWN0b3IoeDogbnVtYmVyLCB5Om51bWJlcikge1xuXHRcdHRoaXMueCA9IHg7XG5cdFx0dGhpcy55ID0geTtcblx0XHR0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuXHR9XG5cblx0cHVibGljIHN0YXRpYyBvbih4OiBudW1iZXIsIHk6bnVtYmVyKSB7XG5cdFx0cmV0dXJuIG5ldyBQb2ludCh4LHkpO1xuXHR9XG59IiwiZXhwb3J0IGVudW0gUmFuayB7XG5cdE5PTkUgPSAwLFxuXHRTID0gMSxcblx0QSA9IDIsXG5cdEIgPSAzLFxuXHRDID0gNCxcblx0RCA9IDUsXG5cdEUgPSA2LFxuXHRGID0gN1xufVxuXG5cbmV4cG9ydCBjbGFzcyBSYW5rVXRpbCB7XG5cdHN0YXRpYyB2YWx1ZU9mKHJhbms6IFJhbmspOiBzdHJpbmcge1xuXHRcdGxldCByZXQgPSAnJztcblxuXHRcdHN3aXRjaChyYW5rKSB7XG5cdFx0XHRjYXNlIFJhbmsuTk9ORToge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgUmFuay5TOiB7XG5cdFx0XHRcdHJldCA9ICdTJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFJhbmsuQToge1xuXHRcdFx0XHRyZXQgPSAnQSc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBSYW5rLkI6IHtcblx0XHRcdFx0cmV0ID0gJ0InO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgUmFuay5DOiB7XG5cdFx0XHRcdHJldCA9ICdDJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFJhbmsuRDoge1xuXHRcdFx0XHRyZXQgPSAnRCc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBSYW5rLkU6IHtcblx0XHRcdFx0cmV0ID0gJ0UnO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgUmFuay5GOiB7XG5cdFx0XHRcdHJldCA9ICdGJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdHJldCA9ICcnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXQ7XG5cdH1cbn0iLCJpbXBvcnQgeyBSYW5rIH0gZnJvbSBcIi4vcmFua1wiO1xuaW1wb3J0IFZvIGZyb20gXCIuL3ZvXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZCBleHRlbmRzIFZvIHtcblx0dXNlcklkOiBzdHJpbmc7XG5cdHJlY29yZHM6IGFueTtcblxuXHRjb25zdHJ1Y3Rvcih1c2VySWQsIHJlY29yZHMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMudXNlcklkID0gdXNlcklkO1xuXHRcdHRoaXMucmVjb3JkcyA9IHJlY29yZHM7XG5cdH1cblxuXHRwdXQocmVjb3JkOiBTdGFnZVJlY29yZCkge1xuXHRcdHRoaXMucmVjb3Jkc1tyZWNvcmQuc3RhZ2VJZF0gPSB7XG5cdFx0XHRzdGFnZUlkOiByZWNvcmQuc3RhZ2VJZCxcblx0XHRcdHJhbms6IHJlY29yZC5yYW5rLFxuXHRcdFx0dGltZTogcmVjb3JkLnRpbWVcblx0XHR9XG5cdFx0Ly8gdGhpcy5yZWNvcmRzW3JlY29yZC5zdGFnZUlkXSA9IHJlY29yZDtcblx0fVxuXG5cdHRvSnNvbigpIHtcblx0XHRsZXQgcmVjb3JkcyA9IHt9O1xuXG5cdFx0Zm9yIChsZXQgcCBpbiB0aGlzLnJlY29yZHMpIHtcblx0XHRcdHJlY29yZHNbcF0gPSB0aGlzLnJlY29yZHNbcF0udG9Kc29uKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHVzZXJJZDogdGhpcy51c2VySWQsXG5cdFx0XHRyZWNvcmRzOiByZWNvcmRzXG5cdFx0fVxuXHR9XG5cblx0cHVibGljIHN0YXRpYyBieShqc29uIDogYW55KTogUmVjb3JkIHtcblx0XHRpZiAoanNvbiA9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0Y29uc3QgdXNlcjogUmVjb3JkID0gbmV3IFJlY29yZChqc29uLnVzZXJJZCwganNvbi5yZWNvcmRzKTtcblx0XHRyZXR1cm4gdXNlcjtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgU3RhZ2VSZWNvcmQgZXh0ZW5kcyBWbyB7XG5cdHN0YWdlSWQ6IG51bWJlcjtcblx0cmFuazogUmFuaztcblx0dGltZTogbnVtYmVyO1xuXG5cdGNvbnN0cnVjdG9yKHN0YWdlSWQsIHJhbms6IFJhbmssIHRpbWUpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc3RhZ2VJZCA9IHN0YWdlSWQ7XG5cdFx0dGhpcy5yYW5rID0gcmFuaztcblx0XHR0aGlzLnRpbWUgPSB0aW1lO1xuXHR9XG5cblx0dG9Kc29uKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRzdGFnZUlkOiB0aGlzLnN0YWdlSWQsXG5cdFx0XHRyYW5rOiB0aGlzLnJhbmssXG5cdFx0XHR0aW1lOiB0aGlzLnRpbWVcblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgeyBSYW5rIH0gZnJvbSBcIi4vcmFua1wiO1xuaW1wb3J0IFZvIGZyb20gXCIuL3ZvXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JlIGV4dGVuZHMgVm8ge1xuXHR0aW1lIDogbnVtYmVyO1xuXHRyYW5rIDogUmFuaztcblx0XG5cdGNvbnN0cnVjdG9yKHRpbWU/OiBudW1iZXIsIHJhbms/OiBSYW5rKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMudGltZSA9IHRpbWUgfCAwO1xuXHRcdHRoaXMucmFuayA9IHJhbmsgfCBSYW5rLk5PTkU7XG5cdH1cblxuXHR0b0pzb24oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpbWU6IHRoaXMudGltZSxcblx0XHRcdHJhbms6IHRoaXMucmFuayxcblx0XHR9XG5cdH1cblx0XG59IiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi9wb2ludFwiO1xuaW1wb3J0IHsgTWFwVHlwZSB9IGZyb20gXCIuL21hcFR5cGVcIjtcbmltcG9ydCB7IFJhbmsgfSBmcm9tIFwiLi9yYW5rXCI7XG5cbmV4cG9ydCBjbGFzcyBTdGFnZSB7XG5cdGNvbnN0cnVjdG9yKHN0YWdlSWQ6IG51bWJlciwgZmxvb3JGaWxlUGF0aDogc3RyaW5nLCB3YWxsRmlsZVBhdGg6IHN0cmluZywgZXhpdFBvaW50czogQXJyYXk8UG9pbnQ+LCB0aW1lTGltaXQ9NTAwMCkge1xuXHRcdHRoaXMuc3RhZ2VJZCA9IHN0YWdlSWQ7XG5cdFx0dGhpcy5mbG9vckZpbGVQYXRoID0gZmxvb3JGaWxlUGF0aDtcblx0XHR0aGlzLndhbGxGaWxlUGF0aCA9IHdhbGxGaWxlUGF0aDtcblx0XHR0aGlzLmV4aXRQb2ludHMgPSBleGl0UG9pbnRzO1xuXG5cdFx0dGhpcy50aW1lTGltaXQgPSB0aW1lTGltaXQ7XG5cdH1cblx0XG5cdHN0YWdlSWQgOiBudW1iZXI7XG5cdGZsb29yRmlsZVBhdGggOiBzdHJpbmc7XG5cdHdhbGxGaWxlUGF0aCA6IHN0cmluZztcblxuXHRleGl0UG9pbnRzIDogQXJyYXk8UG9pbnQ+O1xuXHR0aW1lTGltaXQgOiBudW1iZXI7XG5cblx0dHJlYXN1cmVQb2ludHMgOiBBcnJheTxQb2ludD47XG5cblx0bWFwVHlwZTogTWFwVHlwZTtcblxuXHQvL1RPRE86ID8/P1xuXHRzb3VuZCA6IFBoYXNlci5Tb3VuZDtcblxuXHRcbn0iLCJpbXBvcnQgU2NvcmUgZnJvbSBcIi4vc2NvcmVcIjtcbmltcG9ydCBWbyBmcm9tIFwiLi92b1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgVm8ge1xuXHR1c2VySWQgOiBzdHJpbmc7XG5cdHNjb3JlIDogU2NvcmU7XG5cdHJlZ2lzdGVyRGF0ZSA6IERhdGU7XG5cdGxhc3RWaXNpdERhdGUgOiBEYXRlO1xuXG5cdGNvbnN0cnVjdG9yKHVzZXJJZCwgc2NvcmUpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMudXNlcklkID0gdXNlcklkO1xuXHRcdHRoaXMuc2NvcmUgPSBzY29yZTtcblx0XHR0aGlzLnJlZ2lzdGVyRGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0dGhpcy5sYXN0VmlzaXREYXRlID0gbmV3IERhdGUoKTtcblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgYnkoanNvbiA6IGFueSk6IFVzZXIge1xuXHRcdGlmIChqc29uID09IG51bGwpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRjb25zdCB1c2VyOiBVc2VyID0gbmV3IFVzZXIoanNvbi51c2VySWQsIGpzb24uc2NvcmUpO1xuXHRcdHVzZXIucmVnaXN0ZXJEYXRlID0ganNvbi5yZWdpc3RlckRhdGU7XG5cdFx0dXNlci5sYXN0VmlzaXREYXRlID0ganNvbi5sYXN0VmlzaXREYXRlO1xuXG5cdFx0cmV0dXJuIHVzZXI7XG5cdH1cblxuXHR0b0pzb24oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHVzZXJJZDogdGhpcy51c2VySWQsXG5cdFx0XHRzY29yZTogdGhpcy5zY29yZSxcblx0XHRcdHJlZ2lzdGVyRGF0ZTogdGhpcy5yZWdpc3RlckRhdGUsXG5cdFx0XHRsYXN0VmlzaXREYXRlOiB0aGlzLmxhc3RWaXNpdERhdGUsXG5cdFx0fTtcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIFZvIHtcblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMudG9Kc29uKCkpO1xuXHR9XG5cblx0YWJzdHJhY3QgdG9Kc29uKCkgOiBhbnk7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==