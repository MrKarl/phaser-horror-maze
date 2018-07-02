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
        // For debug
        // this.game.debug.inputInfo(32, 32);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC9pbnB1dFRleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXIvc2VydmljZUNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXIvc3RhdGVDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9kYW8vZGFvLnRzIiwid2VicGFjazovLy8uL3NyYy9kYW8vcmVjb3JkRGFvLnRzIiwid2VicGFjazovLy8uL3NyYy9kYW8vdXNlckRhby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hemUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2F1dGhTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9yYW5rU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvcmVjb3JkU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvc3RhZ2VTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXNzaW9uL2xvY2FsU3RvcmFnZVNlc3Npb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL2Jhc2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL2ludHJvLnRzIiwid2VicGFjazovLy8uL3NyYy9zdGF0ZS9sZXZlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUvbG9naW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL3BsYXkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL3JlZ2lzdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy92by9wb2ludC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdm8vcmFuay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdm8vcmVjb3JkLnRzIiwid2VicGFjazovLy8uL3NyYy92by9zY29yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdm8vc3RhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZvL3VzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZvL3ZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNuRU0sSUFBVyxTQUFTLENBb0d6QjtBQXBHRCxXQUFpQixTQUFTO0lBQ3pCLGVBQXVCLFNBQVEsTUFBTSxDQUFDLElBQUk7UUFxQnpDLFlBQVksSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUs7WUFDNUQsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFHLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQXJCakMsWUFBTyxHQUFHLEtBQUssQ0FBQztZQWtCaEIsZUFBVSxHQUFHLENBQUMsQ0FBQztZQUlkLElBQUksQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDO1lBQ2hDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQ3hCO1lBRUQsSUFBSSxDQUFDLENB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QyxHQUFHLE1BQU0sRUFBRSxPQUFPLEdBQUcsWUFBWSxHQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFILEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxHQUFHLFNBQVMsQ0FBQztTQUNwQztRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzVCLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxXQUFXLEdBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxPQUFPLEdBQUcsWUFBWSxHQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFILE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLFdBQVcsR0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLE9BQU8sR0FBRyxZQUFZLEdBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUgsS0FBSyxDQUFDLEtBQUssR0FBRyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDNUIsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLFdBQVcsR0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLE9BQU8sR0FBRyxZQUFZLEdBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxJQUFJLENB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QWE7U0FDakMsQ0FBQztJQUNILENBQUM7Q0FDRDs7Ozs7Ozs7Ozs7Ozs7O0FDcENhO0lBQ2IsUUFBUTtRQUNQLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBR0QiLCJmaWxlIjoibWF6ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImV4cG9ydCBuYW1lc3BhY2UgQ29tcG9uZW50IHtcblx0ZXhwb3J0IGNsYXNzIElucHV0VGV4dCBleHRlbmRzIFBoYXNlci5UZXh0IHtcblx0XHRpc0ZvY3VzID0gZmFsc2U7XG5cblx0XHR4IDogbnVtYmVyO1xuXHRcdHkgOiBudW1iZXI7XG5cdFx0d2lkdGggOiBudW1iZXI7XG5cdFx0aGVpZ2h0IDogbnVtYmVyO1xuXG5cdFx0bWF4TGVuZ3RoIDogbnVtYmVyO1xuXG5cdFx0cGxhY2Vob2xkZXIgOiBzdHJpbmc7XG5cblx0XHRcblx0XHRib3JkZXJSZWN0YW5nbGVyIDogUGhhc2VyLlJlY3RhbmdsZTtcblxuXHRcdHRleHQgOiBzdHJpbmc7XG5cblx0XHRwaGFzZXJUZXh0IDogUGhhc2VyLlRleHQ7XG5cblx0XHRjbGlja0NvdW50ID0gMDtcblxuXHRcdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHdpZHRoLCBoZWlnaHQsIG1heExlbmd0aCwgdGV4dCwgc3R5bGUpIHtcblx0XHRcdHN1cGVyKGdhbWUsIHgsIHksICB0ZXh0LCBzdHlsZSk7XG5cdFx0XHR0aGlzLnBsYWNlaG9sZGVyID0gJ0lucHV0IFRleHQnO1xuXHRcdFx0aWYgKHRleHQubGVuZ3RoID09IDApIHtcblx0XHRcdFx0dGV4dCA9IHRoaXMucGxhY2Vob2xkZXI7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMueCA9IHg7XG5cdFx0XHR0aGlzLnkgPSB5O1xuXHRcdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHRcdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0XHR0aGlzLnRleHQgPSB0ZXh0O1xuXHRcdFx0dGhpcy5tYXhMZW5ndGggPSBtYXhMZW5ndGggPyBtYXhMZW5ndGggOiAyMDtcblxuXHRcdFx0bGV0IGdyb3VwID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuXHRcdFx0bGV0IGdyYXBoaWNzID0gdGhpcy5nYW1lLm1ha2UuZ3JhcGhpY3MoKTtcblx0XHRcdGdyYXBoaWNzLmxpbmVTdHlsZSgyLCAweDAwMDAwMCwgMSk7XG5cdFx0XHRncmFwaGljcy5kcmF3UmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcblx0XHRcdGdyb3VwLmFkZChncmFwaGljcyk7XG5cblx0XHRcdHRoaXMucGhhc2VyVGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dCh4LCB5LCB0ZXh0LCBzdHlsZSk7XG5cdFx0XHR0aGlzLnBoYXNlclRleHQuc2V0VGV4dEJvdW5kcygwLCAwLCB3aWR0aCwgaGVpZ2h0KVxuXHRcdFx0dGhpcy5waGFzZXJUZXh0LmFscGhhID0gMC42O1xuXG5cdFx0XHR0aGlzLnBoYXNlclRleHQuaW5wdXRFbmFibGVkID0gdHJ1ZTtcblxuXHRcdFx0dGhpcy5waGFzZXJUZXh0LmV2ZW50cy5vbklucHV0RG93bi5hZGQoKHNwcml0ZSwgcG9pbnRlcikgPT4ge1xuXHRcdFx0XHR0aGlzLmlzRm9jdXMgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLnBoYXNlclRleHQuYWxwaGEgPSAxO1xuXHRcdFx0fSwgdGhpcyk7XG5cdFx0XHRcblxuXHRcdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0XHR0aGlzLmdhbWUuaW5wdXQub25Eb3duLmFkZCgoc3ByaXRlLCBwb2ludGVyKSA9PiB7XG5cdFx0XHRcdHNlbGYuY2xpY2tDb3VudCsrO1xuXHRcdFx0XHRpZiAoc2VsZi5jbGlja0NvdW50ID09IDEpIHtcblx0XHRcdFx0XHRzZWxmLnBoYXNlclRleHQuc2V0VGV4dCgnJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgdGV4dFggPSBzZWxmLnBoYXNlclRleHQud29ybGQueDtcblx0XHRcdFx0bGV0IHRleHRXaWR0aCA9IHNlbGYud2lkdGg7XG5cblx0XHRcdFx0bGV0IHRleHRZID0gc2VsZi5waGFzZXJUZXh0LndvcmxkLnk7XG5cdFx0XHRcdGxldCB0ZXh0SGVpZ2h0ID0gc2VsZi5oZWlnaHQ7XG5cblx0XHRcdFx0aWYgKHBvaW50ZXIuY2xpZW50WCA+IHRleHRYICYmIHBvaW50ZXIuY2xpZW50WCA8PSB0ZXh0WCArIHRleHRXaWR0aCkge1xuXHRcdFx0XHRcdGlmIChwb2ludGVyLmNsaWVudFkgPiB0ZXh0WSAmJiBwb2ludGVyLmNsaWVudFkgPD0gdGV4dFkgKyB0ZXh0SGVpZ2h0KSB7XG5cdFx0XHRcdFx0XHRzZWxmLmlzRm9jdXMgPSB0cnVlO1xuXHRcdFx0XHRcdFx0c2VsZi5waGFzZXJUZXh0LmFscGhhID0gMTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzZWxmLnBoYXNlclRleHQuYWxwaGEgPSAwLjY7XG5cdFx0XHRcdHNlbGYuaXNGb2N1cyA9IGZhbHNlO1xuXHRcdFx0fSwgdGhpcyk7XG5cblx0XHRcdHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRDYWxsYmFja3ModGhpcywgKGUpID0+IHtcblx0XHRcdFx0aWYgKCFzZWxmLmlzRm9jdXMpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGlmIChlLmtleUNvZGUgPT0gUGhhc2VyLktleWJvYXJkLkJBQ0tTUEFDRSkge1xuXHRcdFx0XHRcdHNlbGYucGhhc2VyVGV4dC50ZXh0ID0gc2VsZi5waGFzZXJUZXh0LnRleHQuc2xpY2UoMCwgLTEpO1xuXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9IFxuXG5cdFx0XHRcdGlmIChzZWxmLnBoYXNlclRleHQudGV4dC5sZW5ndGggKyAxID4gc2VsZi5tYXhMZW5ndGgpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHNlbGYucGhhc2VyVGV4dC50ZXh0ICs9IGUua2V5O1xuXHRcdFx0XHRzZWxmLnRleHQgPSBzZWxmLnBoYXNlclRleHQudGV4dDtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufSIsImltcG9ydCBTdGF0ZUNvbnRyb2xsZXIgZnJvbSBcIi4vc3RhdGVDb250cm9sbGVyXCI7XG5pbXBvcnQgQ29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5pbXBvcnQgU3RhZ2VTZXJ2aWNlIGZyb20gXCIuLi9zZXJ2aWNlcy9zdGFnZVNlcnZpY2VcIjtcbmltcG9ydCBBdXRoU2VydmljZSBmcm9tIFwiLi4vc2VydmljZXMvYXV0aFNlcnZpY2VcIjtcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi4vbWF6ZVwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuaW1wb3J0IFVzZXIgZnJvbSBcIi4uL3ZvL3VzZXJcIjtcbmltcG9ydCBSZWNvcmRTZXJ2aWNlIGZyb20gXCIuLi9zZXJ2aWNlcy9yZWNvcmRTZXJ2aWNlXCI7XG5pbXBvcnQgUmVjb3JkIGZyb20gXCIuLi92by9yZWNvcmRcIjtcbmltcG9ydCBSYW5rU2VydmljZSBmcm9tIFwiLi4vc2VydmljZXMvcmFua1NlcnZpY2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmljZUNvbnRyb2xsZXIgaW1wbGVtZW50cyBDb250cm9sbGVyIHtcblx0Z2FtZSA6IFBoYXNlci5HYW1lO1xuXG5cdHN0YWdlU2VydmljZSA6IFN0YWdlU2VydmljZTtcblx0YXV0aFNlcnZpY2UgOiBBdXRoU2VydmljZTtcblx0cmVjb3JkU2VydmljZSA6IFJlY29yZFNlcnZpY2U7XG5cdHJhbmtTZXJ2aWNlIDogUmFua1NlcnZpY2U7XG5cblx0Ly8gSXQgaXMgbmVjZXNzYXJ5IGZvciBjb250cm9saW5nIHN0YXRlLlxuXHRzdGF0ZUNvbnRyb2xsZXIgOiBTdGF0ZUNvbnRyb2xsZXI7XG5cblx0Y29uc3RydWN0b3IoZ2FtZTogR2FtZS5NYXplKSB7XG5cdFx0dGhpcy5nYW1lID0gZ2FtZTtcdFx0XG5cdFx0dGhpcy5zdGFnZVNlcnZpY2UgPSBuZXcgU3RhZ2VTZXJ2aWNlKCk7XG5cdFx0dGhpcy5hdXRoU2VydmljZSA9IG5ldyBBdXRoU2VydmljZSgpO1xuXHRcdHRoaXMucmVjb3JkU2VydmljZSA9IG5ldyBSZWNvcmRTZXJ2aWNlKCk7XG5cdFx0dGhpcy5yYW5rU2VydmljZSA9IG5ldyBSYW5rU2VydmljZSgpO1x0XHRcblx0XHRcblx0XHR0aGlzLnN0YXRlQ29udHJvbGxlciA9IGdhbWUuc3RhdGVDb250cm9sbGVyO1xuXHR9XHRcblx0XG5cdHB1YmxpYyBsb2dpbih1c2VySWQsIGNhbGxiYWNrKSB7XG5cdFx0dGhpcy5hdXRoU2VydmljZS5sb2dpbih1c2VySWQsIGNhbGxiYWNrKTtcblx0fVxuXG5cdHB1YmxpYyByZWdpc3RlclVzZXIodXNlcjogVXNlciwgY2FsbGJhY2s6ICh1c2VyOiBVc2VyLCBpc0FscmVhZHlFeGlzdDogYm9vbGVhbikgPT4gdm9pZCkge1xuXHRcdHRoaXMuYXV0aFNlcnZpY2UucmVnaXN0ZXJVc2VyKHVzZXIsIGNhbGxiYWNrKTtcblx0fVxuXG5cdHB1YmxpYyBnZXRSZWNvcmQoKSA6IFJlY29yZCB7XG5cdFx0Y29uc3QgdXNlcklkID0gdGhpcy5hdXRoU2VydmljZS5nZXRMYXN0TG9nZ2VkSW5Vc2VyKCkudXNlcklkO1xuXHRcdGNvbnN0IHJlY29yZCA9IHRoaXMucmVjb3JkU2VydmljZS5nZXRSZWNvcmQodXNlcklkKTtcblx0XHRyZXR1cm4gcmVjb3JkO1xuXHR9XG5cblx0cHVibGljIGdldFN0YWdlSW5mb3JtYXRpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhZ2VTZXJ2aWNlLmdldFN0YWdlSW5mb3JtYXRpb24oKTtcblx0fVxuXG5cdHB1YmxpYyByZWNvcmRSYW5rKHJlY29yZDogUmVjb3JkKSB7XG5cdFx0dGhpcy5yZWNvcmRTZXJ2aWNlLnNldFJlY29yZChyZWNvcmQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBJbnRybyB9IGZyb20gJy4uL3N0YXRlL2ludHJvJztcbmltcG9ydCB7IExvZ2luIH0gZnJvbSAnLi4vc3RhdGUvbG9naW4nO1xuaW1wb3J0IHsgTGV2ZWwgfSBmcm9tICcuLi9zdGF0ZS9sZXZlbCc7XG5pbXBvcnQgeyBQbGF5IH0gZnJvbSAnLi4vc3RhdGUvcGxheSc7XG5pbXBvcnQgeyBSZWdpc3RlciB9IGZyb20gJy4uL3N0YXRlL3JlZ2lzdGVyJztcblxuaW1wb3J0IFNlcnZpY2VDb250cm9sbGVyIGZyb20gJy4vc2VydmljZUNvbnRyb2xsZXInO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4uL21hemUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0ZUNvbnRyb2xsZXIge1xuXHRzdGF0ZU1hbmFnZXIgOiBQaGFzZXIuU3RhdGVNYW5hZ2VyO1xuXHRnYW1lIDogUGhhc2VyLkdhbWU7XG5cblx0d2lkdGg6IG51bWJlcjtcblx0aGVpZ2h0OiBudW1iZXI7XG5cblxuXHRnYW1lVmVyc2lvbjogc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdH1cblxuXHRwdWJsaWMgaW5pdGlhbGl6ZShnYW1lOiBHYW1lLk1hemUsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBnYW1lVmVyc2lvbjogc3RyaW5nKSB7XG5cdFx0dGhpcy5zdGF0ZU1hbmFnZXIgPSBuZXcgUGhhc2VyLlN0YXRlTWFuYWdlcihnYW1lKTtcblx0XHR0aGlzLmdhbWUgPSBnYW1lO1xuXHRcdHRoaXMuZ2FtZS5zdGF0ZSA9IHRoaXMuc3RhdGVNYW5hZ2VyO1xuXHRcdHRoaXMuZ2FtZVZlcnNpb24gPSBnYW1lVmVyc2lvbjtcblxuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0c3RhcnRTdGF0ZShzdGF0ZT8gOiBzdHJpbmcpIHtcblx0XHRsZXQgc3RhcnRpbmdTdGF0ZSA9ICdJbnRybyc7XG5cdFx0aWYgKHN0YXRlID09PSAndW5kZWZpbmVkJyB8fCBzdGF0ZSA9PT0gbnVsbCkge1xuXHRcdFx0c3RhcnRpbmdTdGF0ZSA9IHN0YXRlO1xuXHRcdH1cblxuXHRcdHRoaXMuZ29TdGF0ZShzdGFydGluZ1N0YXRlLCB0cnVlLCB0cnVlLCAnSG9ycm9yIE1hemUnLCB0aGlzLmdhbWVWZXJzaW9uKTtcblx0fVxuXG5cdHB1YmxpYyBnb1N0YXRlKHN0YXRlOiBzdHJpbmcsIGNsZWFyV29ybGQ/OiBib29sZWFuLCBjbGVhckNhY2hlPzogYm9vbGVhbiwgLi4uYXJnczogYW55W10pIHtcblx0XHRpZiAoIXRoaXMuc3RhdGVNYW5hZ2VyLmNoZWNrU3RhdGUoc3RhdGUpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFRoaXMgc3RhdGUoJHtzdGF0ZX0pIGRvZXMgbm90IGV4aXN0IWApO1xuXHRcdH1cblxuXHRcdHRoaXMuc3RhdGVNYW5hZ2VyLnN0YXJ0KHN0YXRlLCBjbGVhcldvcmxkLCBjbGVhckNhY2hlLCAuLi5hcmdzKTtcblx0fVxuXG5cdHByaXZhdGUgaW5pdCgpIHtcblx0XHR0aGlzLmFkZCgnSW50cm8nLCBJbnRybywgdHJ1ZSk7XG5cdFx0dGhpcy5hZGQoJ0xvZ2luJywgTG9naW4sIGZhbHNlKTtcblx0XHR0aGlzLmFkZCgnUmVnaXN0ZXInLCBSZWdpc3RlciwgZmFsc2UpO1xuXHRcdHRoaXMuYWRkKCdMZXZlbCcsIExldmVsLCBmYWxzZSk7XG5cdFx0dGhpcy5hZGQoJ1BsYXknLCBQbGF5LCBmYWxzZSk7XG5cdH1cblxuXHRwcml2YXRlIGFkZChrZXksIHN0YXRlLCBhdXRoU3RhcnQ/KSB7XG5cdFx0dGhpcy5zdGF0ZU1hbmFnZXIuYWRkKGtleSwgc3RhdGUsIGF1dGhTdGFydCk7XG5cdH1cbn0iLCJpbXBvcnQgU2Vzc2lvbiBmcm9tIFwiLi4vc2Vzc2lvbi9zZXNzaW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIERBTzxUPiB7XG5cdHNlc3Npb246IFNlc3Npb247XG5cdGNvbnN0cnVjdG9yKHNlc3Npb246IFNlc3Npb24pIHtcblx0XHR0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xuXHR9XG5cblx0cHVibGljIGFic3RyYWN0IGluc2VydCh0YWJsZTogc3RyaW5nLCBvYmo6IFQpOiBUO1xuXHRwdWJsaWMgYWJzdHJhY3Qgc2VsZWN0KHRhYmxlOiBzdHJpbmcsIGtleTogc3RyaW5nKTogVDtcblx0cHVibGljIGFic3RyYWN0IHVwZGF0ZSh0YWJsZTogc3RyaW5nLCBrZXk6IHN0cmluZywgb2JqOiBUKTogVDtcblx0cHVibGljIGFic3RyYWN0IGRlbGV0ZSh0YWJsZTogc3RyaW5nLCBrZXk6IHN0cmluZyk6IGJvb2xlYW47XG5cdHB1YmxpYyBhYnN0cmFjdCBzZWxlY3RBbGwodGFibGU6IHN0cmluZyk6IGFueTsvL0FycmF5PFQ+O1xufSIsImltcG9ydCBEQU8gZnJvbSBcIi4vZGFvXCI7XG5pbXBvcnQgUmVjb3JkIGZyb20gXCIuLi92by9yZWNvcmRcIjtcblxuZXhwb3J0IGNsYXNzIFJlY29yZERhbyBleHRlbmRzIERBTzxSZWNvcmQ+IHtcblxuXHRwdWJsaWMgaW5zZXJ0KHRhYmxlOiBzdHJpbmcsIG9iajogUmVjb3JkKTogUmVjb3JkIHtcblx0XHR0aGlzLnNlc3Npb24uc2V0KHRhYmxlLCBvYmoudXNlcklkLCBvYmoudG9TdHJpbmcoKSk7XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9XG5cblx0cHVibGljIHNlbGVjdCh0YWJsZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZyk6IFJlY29yZCB7XG5cdFx0Y29uc3QgcmVjb3JkRGF0YSA9IHRoaXMuc2Vzc2lvbi5nZXQodGFibGUsIHVzZXJJZCk7XG5cdFx0Y29uc3QgcmVjb3JkOiBSZWNvcmQgPSBSZWNvcmQuYnkocmVjb3JkRGF0YSk7XG5cdFx0cmV0dXJuIHJlY29yZDtcblx0fVxuXG5cdHB1YmxpYyB1cGRhdGUodGFibGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcsIG9iajogUmVjb3JkKTogUmVjb3JkIHtcblx0XHR0aGlzLnNlc3Npb24uc2V0KHRhYmxlLCB1c2VySWQsIG9iai50b1N0cmluZygpKTtcblx0XHRcblx0XHRyZXR1cm4gb2JqO1xuXHR9XG5cblx0cHVibGljIGRlbGV0ZSh0YWJsZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdGxldCBpc1N1Y2Nlc3MgPSB0cnVlO1xuXHRcdHRyeSB7XG5cdFx0XHR0aGlzLnNlc3Npb24ucmVtb3ZlKHRhYmxlLCB1c2VySWQpO1xuXHRcdH0gY2F0Y2gge1xuXHRcdFx0aXNTdWNjZXNzID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlzU3VjY2Vzcztcblx0fVxuXG5cdHB1YmxpYyBzZWxlY3RBbGwodGFibGU6IHN0cmluZyk6IGFueSB7XG5cdFx0Y29uc3Qgb2JqcyA9ICg8YW55PnRoaXMpLnNlc3Npb24uYWxsU3RvcmFnZSgpO1xuXHRcdGNvbnN0IG9iaiA9IG9ianNbdGFibGVdO1xuXG5cdFx0cmV0dXJuIG9iajtcblx0fVxufSIsImltcG9ydCBEQU8gZnJvbSBcIi4vZGFvXCI7XG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vdm8vdXNlclwiO1xuXG5leHBvcnQgY2xhc3MgVXNlckRhbyBleHRlbmRzIERBTzxVc2VyPiB7XG5cdHByaXZhdGUgcmVhZG9ubHkgdXNlcktleSA9ICdtYXplVXNlclJlcG8nO1xuXHRcblx0cHVibGljIGluc2VydCh0YWJsZTogc3RyaW5nLCBvYmo6IFVzZXIpOiBVc2VyIHtcblx0XHR0aGlzLnNlc3Npb24uc2V0KHRhYmxlLCBvYmoudXNlcklkLCBvYmoudG9TdHJpbmcoKSk7XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9XG5cblx0cHVibGljIHNlbGVjdCh0YWJsZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZyk6IFVzZXIge1xuXHRcdGNvbnN0IHVzZXJKc29uID0gdGhpcy5zZXNzaW9uLmdldCh0YWJsZSwgdXNlcklkKTtcblxuXHRcdGNvbnN0IHVzZXI6IFVzZXIgPSBVc2VyLmJ5KHVzZXJKc29uKTtcblx0XHRyZXR1cm4gdXNlcjtcblx0fVxuXG5cdHB1YmxpYyB1cGRhdGUodGFibGU6IHN0cmluZyx1c2VySWQ6IHN0cmluZywgb2JqOiBVc2VyKTogVXNlciB7XG5cdFx0dGhpcy5zZXNzaW9uLnNldCh0YWJsZSwgdXNlcklkLCBvYmoudG9TdHJpbmcoKSk7XG5cdFx0XG5cdFx0cmV0dXJuIG9iajtcblx0fVxuXG5cdHB1YmxpYyBkZWxldGUodGFibGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRsZXQgaXNTdWNjZXNzID0gdHJ1ZTtcblx0XHR0cnkge1xuXHRcdFx0dGhpcy5zZXNzaW9uLnJlbW92ZSh0YWJsZSwgdXNlcklkKTtcblx0XHR9IGNhdGNoIHtcblx0XHRcdGlzU3VjY2VzcyA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBpc1N1Y2Nlc3M7XG5cdH1cblxuXHRwdWJsaWMgc2VsZWN0QWxsKHRhYmxlOiBzdHJpbmcpOiBhbnkge1xuXHRcdGNvbnN0IG9ianMgPSAoPGFueT50aGlzKS5zZXNzaW9uLmFsbFN0b3JhZ2UoKTtcblx0XHRjb25zdCBvYmogPSBvYmpzW3RhYmxlXTtcblxuXHRcdHJldHVybiBvYmo7XG5cdH1cbn0iLCJpbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi9tYXplJztcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgICBjb25zdCB3aWR0aCA9IDY0MDtcbiAgICBjb25zdCBoZWlnaHQgPSA2MDA7IC8vIDEyMCAqIDQyMFxuICAgIGNvbnN0IHBhcmVudElkID0gJ2dhbWUnO1xuXG4gICAgLy8gU2hvdWxkIGJlIGluaXRpYWxpemUgZ2FtZSBvYmplY3QgYW5kIHJ1blxuICAgIGNvbnN0IG1hemUgPSBuZXcgR2FtZS5NYXplKHdpZHRoLCBoZWlnaHQsIHBhcmVudElkKTtcbn07IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL25vZGVfbW9kdWxlcy9waGFzZXItY2UvdHlwZXNjcmlwdC9waGFzZXIuZC50c1wiIC8+XG5cbmltcG9ydCBTZXJ2aWNlQ29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyL3NlcnZpY2VDb250cm9sbGVyXCI7XG5pbXBvcnQgU3RhdGVDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXIvc3RhdGVDb250cm9sbGVyXCI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgR2FtZSB7XG5cdGV4cG9ydCBjbGFzcyBNYXplIGV4dGVuZHMgUGhhc2VyLkdhbWUge1xuXHRcdHN0YXRpYyBHQU1FX1ZFUlNJT04gPSBcInYxLjBcIjtcblxuXHRcdHNlcnZpY2VDb250cm9sbGVyIDogU2VydmljZUNvbnRyb2xsZXI7XG5cdFx0c3RhdGVDb250cm9sbGVyIDogU3RhdGVDb250cm9sbGVyO1xuXG5cdFx0Y29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgcGFyZW50SWQpIHtcblx0XHRcdHN1cGVyKHdpZHRoLCBoZWlnaHQsIFBoYXNlci5BVVRPLCBwYXJlbnRJZCwgbnVsbCwgZmFsc2UsIHRydWUsIG51bGwpO1xuXG5cdFx0XHR0aGlzLnNlcnZpY2VDb250cm9sbGVyID0gbmV3IFNlcnZpY2VDb250cm9sbGVyKHRoaXMpO1xuXG5cdFx0XHR0aGlzLnN0YXRlQ29udHJvbGxlciA9IG5ldyBTdGF0ZUNvbnRyb2xsZXIoKTtcblx0XHRcdHRoaXMuc3RhdGVDb250cm9sbGVyLmluaXRpYWxpemUodGhpcywgd2lkdGgsIGhlaWdodCwgTWF6ZS5HQU1FX1ZFUlNJT04pO1xuXHRcdFx0dGhpcy5zdGF0ZUNvbnRyb2xsZXIuc3RhcnRTdGF0ZSgpO1xuXHRcdH1cblx0fVxufSIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcbmltcG9ydCBVc2VyIGZyb20gXCIuLi92by91c2VyXCI7XG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZVwiO1xuaW1wb3J0IERBTyBmcm9tIFwiLi4vZGFvL2Rhb1wiO1xuaW1wb3J0IHsgVXNlckRhbyB9IGZyb20gXCIuLi9kYW8vdXNlckRhb1wiO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlU2Vzc2lvbiB9IGZyb20gXCIuLi9zZXNzaW9uL2xvY2FsU3RvcmFnZVNlc3Npb25cIjtcbmltcG9ydCBTZXNzaW9uIGZyb20gXCIuLi9zZXNzaW9uL3Nlc3Npb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0aFNlcnZpY2UgaW1wbGVtZW50cyBTZXJ2aWNlIHtcblx0dXNlckRhbyA6IERBTzxVc2VyPjtcblx0c2Vzc2lvbiA6IFNlc3Npb247XG5cblx0cHJpdmF0ZSByZWFkb25seSBUQUJMRV9MQVNUX0xPR0dFRF9JTiA9ICdsYXN0TG9nZ2VkSW5Vc2VyJztcblx0cHJpdmF0ZSByZWFkb25seSBVU0VSX1RBQkxFID0gJ21hemVVc2VyUmVwbyc7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5zZXNzaW9uID0gbmV3IExvY2FsU3RvcmFnZVNlc3Npb24oKTtcblx0XHR0aGlzLnVzZXJEYW8gPSBuZXcgVXNlckRhbyh0aGlzLnNlc3Npb24pO1xuXHR9XG5cdFxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcblx0XHRcblx0fVxuXG5cdHB1YmxpYyBnZXRMYXN0TG9nZ2VkSW5Vc2VyKCkgOiBVc2VyIHtcblx0XHRjb25zdCBvYmogPSB0aGlzLnVzZXJEYW8uc2VsZWN0QWxsKHRoaXMuVEFCTEVfTEFTVF9MT0dHRURfSU4pO1xuXHRcdGxldCB1c2VyT2JqO1xuXHRcdGxldCB1c2VyO1xuXHRcdFxuXHRcdHRyeSB7XG5cdFx0XHR1c2VyT2JqID0gSlNPTi5wYXJzZShvYmopO1xuXHRcdFx0Y29uc3QgdXNlcklkID0gT2JqZWN0LmtleXModXNlck9iailbMF07XG5cdFx0XHRsZXQgdXNlclN0ciA9IHVzZXJPYmpbdXNlcklkXTtcblx0XHRcdGlmICh0eXBlb2YgdXNlclN0ciA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0dXNlciA9IEpTT04ucGFyc2UodXNlclN0cik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR1c2VyID0gdXNlclN0cjtcblx0XHRcdH1cblx0XHRcdFxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHVzZXIgPSBudWxsO1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gdXNlcjtcblx0fVxuXG5cdHB1YmxpYyByZWdpc3RlclVzZXIodXNlciA6IFVzZXIsIGNhbGxiYWNrOiAodXNlcjogVXNlciwgaXNBbHJlYWR5RXhpc3Q6IGJvb2xlYW4pID0+IHZvaWQpIHtcblx0XHRjb25zdCB1c2VySWQgPSB1c2VyLnVzZXJJZDtcblx0XHRjb25zdCB1c2VySW5TZXNzaW9uID0gdGhpcy51c2VyRGFvLnNlbGVjdCh0aGlzLlVTRVJfVEFCTEUsIHVzZXJJZCk7XG5cdFx0XG5cdFx0bGV0IGlzQWxyZWFkeUV4aXN0ID0gdHJ1ZTtcblx0XHRpZiAoIXVzZXJJblNlc3Npb24pIHtcblx0XHRcdHRoaXMudXNlckRhby5pbnNlcnQodGhpcy5VU0VSX1RBQkxFLCB1c2VyKTtcblx0XHRcdGlzQWxyZWFkeUV4aXN0ID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Y2FsbGJhY2sodXNlciwgaXNBbHJlYWR5RXhpc3QpO1xuXHR9XG5cblx0cHVibGljIGxvZ2luKHVzZXJJZDogc3RyaW5nLCBjYWxsYmFjazogKHVzZXI6IFVzZXIsIGlzU3VjY2VzczogYm9vbGVhbikgPT4gdm9pZCkge1xuXHRcdGNvbnN0IHVzZXIgPSB0aGlzLnVzZXJEYW8uc2VsZWN0KHRoaXMuVVNFUl9UQUJMRSwgdXNlcklkKTtcblx0XHRpZiAodXNlcikge1xuXHRcdFx0dGhpcy51c2VyRGFvLmRlbGV0ZSh0aGlzLlRBQkxFX0xBU1RfTE9HR0VEX0lOLCB1c2VySWQpO1xuXHRcdFx0dGhpcy51c2VyRGFvLmluc2VydCh0aGlzLlRBQkxFX0xBU1RfTE9HR0VEX0lOLCB1c2VyKTtcblx0XHRcdGNhbGxiYWNrKHVzZXIsIHRydWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjYWxsYmFjayhudWxsLCBmYWxzZSk7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIGxvZ291dCh1c2VySWQ6IHN0cmluZykge1xuXHRcdHRoaXMudXNlckRhby5kZWxldGUodGhpcy5UQUJMRV9MQVNUX0xPR0dFRF9JTiwgdXNlcklkKTtcblx0fVxufSIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlXCI7XG5pbXBvcnQgREFPIGZyb20gXCIuLi9kYW8vZGFvXCI7XG5pbXBvcnQgeyBSYW5rIH0gZnJvbSBcIi4uL3ZvL3JhbmtcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFua1NlcnZpY2UgaW1wbGVtZW50cyBTZXJ2aWNlIHtcblx0cmFua0luZm86IGFueTtcblx0cmFua0RBTyA6IERBTzxSYW5rPjtcblxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcblx0XHRcblx0fVxuXG5cdHB1YmxpYyBjYWxjdWxhdGVSYW5rKHN0YWdlSWQ6IG51bWJlciwgZWxhcHNlZFRpbWU6IG51bWJlcikgOiBSYW5rIHtcblx0XHRjb25zdCByYW5rTWV0cml4ID0ge1xuXHRcdFx0MDoge1xuXHRcdFx0XHQxMDogUmFuay5TLFxuXHRcdFx0XHQxNTogUmFuay5BLFxuXHRcdFx0XHQyMDogUmFuay5CLFxuXHRcdFx0XHQyNTogUmFuay5DLFxuXHRcdFx0XHQzMDogUmFuay5ELFxuXHRcdFx0XHQzNTogUmFuay5FLFxuXHRcdFx0fSxcblx0XHRcdDE6IHtcblx0XHRcdFx0MTA6IFJhbmsuUyxcblx0XHRcdFx0MTU6IFJhbmsuQSxcblx0XHRcdFx0MjA6IFJhbmsuQixcblx0XHRcdFx0MjU6IFJhbmsuQyxcblx0XHRcdFx0MzA6IFJhbmsuRCxcblx0XHRcdFx0MzU6IFJhbmsuRSxcblx0XHRcdH0sXG5cdFx0XHQyOiB7XG5cdFx0XHRcdDEwOiBSYW5rLlMsXG5cdFx0XHRcdDE1OiBSYW5rLkEsXG5cdFx0XHRcdDIwOiBSYW5rLkIsXG5cdFx0XHRcdDI1OiBSYW5rLkMsXG5cdFx0XHRcdDMwOiBSYW5rLkQsXG5cdFx0XHRcdDM1OiBSYW5rLkUsXG5cdFx0XHR9LFxuXHRcdFx0Mzoge1xuXHRcdFx0XHQxMDogUmFuay5TLFxuXHRcdFx0XHQxNTogUmFuay5BLFxuXHRcdFx0XHQyMDogUmFuay5CLFxuXHRcdFx0XHQyNTogUmFuay5DLFxuXHRcdFx0XHQzMDogUmFuay5ELFxuXHRcdFx0XHQzNTogUmFuay5FLFxuXHRcdFx0fSxcblx0XHRcdDQ6IHtcblx0XHRcdFx0MTA6IFJhbmsuUyxcblx0XHRcdFx0MTU6IFJhbmsuQSxcblx0XHRcdFx0MjA6IFJhbmsuQixcblx0XHRcdFx0MjU6IFJhbmsuQyxcblx0XHRcdFx0MzA6IFJhbmsuRCxcblx0XHRcdFx0MzU6IFJhbmsuRSxcblx0XHRcdH0sXG5cdFx0XHQ1OiB7XG5cdFx0XHRcdDEwOiBSYW5rLlMsXG5cdFx0XHRcdDE1OiBSYW5rLkEsXG5cdFx0XHRcdDIwOiBSYW5rLkIsXG5cdFx0XHRcdDI1OiBSYW5rLkMsXG5cdFx0XHRcdDMwOiBSYW5rLkQsXG5cdFx0XHRcdDM1OiBSYW5rLkUsXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGNvbnN0IHN0YWdlUmFua01ldHJpeCA9IHJhbmtNZXRyaXhbc3RhZ2VJZF07XG5cdFx0Zm9yIChsZXQga2V5IGluIHN0YWdlUmFua01ldHJpeCkge1xuXHRcdFx0Y29uc3QgdGltZUxpbWl0ID0gcGFyc2VJbnQoa2V5KTtcblx0XHRcdGlmICh0aW1lTGltaXQgPiBlbGFwc2VkVGltZSkge1xuXHRcdFx0XHRyZXR1cm4gc3RhZ2VSYW5rTWV0cml4W2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFJhbmsuRjtcblx0fVxuXG5cdGxvYWRSYW5rSW5mb3JtYXRpb24oKSB7XG5cblx0fVxufSIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlXCI7XG5pbXBvcnQgREFPIGZyb20gXCIuLi9kYW8vZGFvXCI7XG5pbXBvcnQgUmVjb3JkIGZyb20gXCIuLi92by9yZWNvcmRcIjtcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlc3Npb24gfSBmcm9tIFwiLi4vc2Vzc2lvbi9sb2NhbFN0b3JhZ2VTZXNzaW9uXCI7XG5pbXBvcnQgeyBSZWNvcmREYW8gfSBmcm9tIFwiLi4vZGFvL3JlY29yZERhb1wiO1xuaW1wb3J0IFNlc3Npb24gZnJvbSBcIi4uL3Nlc3Npb24vc2Vzc2lvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmRTZXJ2aWNlIGltcGxlbWVudHMgU2VydmljZSB7XG5cdHJlY29yZERhbyA6IERBTzxSZWNvcmQ+O1xuXHRzZXNzaW9uIDogU2Vzc2lvbjtcblxuXHRwcml2YXRlIHJlYWRvbmx5IFJFQ09SRF9UQUJMRSA9ICdtYXplUmVjb3JkUmVwbyc7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5zZXNzaW9uID0gbmV3IExvY2FsU3RvcmFnZVNlc3Npb24oKTtcblx0XHR0aGlzLnJlY29yZERhbyA9IG5ldyBSZWNvcmREYW8odGhpcy5zZXNzaW9uKTtcblx0fVxuXG5cdGluaXRpYWxpemUoKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XG5cdH1cblxuXHRwdWJsaWMgZ2V0UmVjb3JkKHVzZXJJZDogc3RyaW5nKTogUmVjb3JkIHtcblx0XHRjb25zdCByZWNvcmQgPSB0aGlzLnJlY29yZERhby5zZWxlY3QodGhpcy5SRUNPUkRfVEFCTEUsIHVzZXJJZCk7XG5cdFx0cmV0dXJuIHJlY29yZDtcblx0fVxuXG5cdHB1YmxpYyBzZXRSZWNvcmQocmVjb3JkOiBSZWNvcmQpIHtcblx0XHR0aGlzLnJlY29yZERhby5pbnNlcnQodGhpcy5SRUNPUkRfVEFCTEUsIHJlY29yZCk7XG5cdH1cbn0iLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZVwiO1xuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tIFwiLi4vdm8vc3RhZ2VcIjtcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL3ZvL3BvaW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlU2VydmljZSBpbXBsZW1lbnRzIFNlcnZpY2Uge1xuXHRzdGF0aWMgTlVNX09GX1NUQUdFID0gNTtcblx0c3RhZ2VNYXAgOiBhbnk7XG5cdFxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnN0YWdlTWFwID0ge307XG5cdFx0dGhpcy5nZW5lcmF0ZVN0YWdlTWFwKCk7XG5cdH1cblxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHsgfVxuXG5cdHB1YmxpYyBnZXRTdGFnZUluZm9ybWF0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnN0YWdlTWFwO1xuXHR9XG5cblx0Ly8gTG9hZCBTdGFnZSBNYXAgSW5mb3JtYXRpb25cblx0cHJpdmF0ZSBnZW5lcmF0ZVN0YWdlTWFwKCkge1xuXHRcdGZvciAobGV0IGk9MDsgaTxTdGFnZVNlcnZpY2UuTlVNX09GX1NUQUdFOyBpKyspIHtcblx0XHRcdGxldCB6ZXJvRm9ybWF0ID0gJzAwMCcgKyBpO1xuXHRcdFx0bGV0IG1hcFNlcSA9IHplcm9Gb3JtYXQuc2xpY2UoLTMpO1xuXG5cdFx0XHRjb25zdCBmbG9vclBhdGggPSAnYXNzZXRzL2ltZy9tYXBzL2Zsb29yLScgKyBtYXBTZXEgKyAnLnBuZyc7XG5cdFx0XHRjb25zdCB3YWxsUGF0aCA9ICdhc3NldHMvaW1nL21hcHMvd2FsbHMtJyArIG1hcFNlcSArICcucG5nJztcblxuXHRcdFx0Y29uc3Qgc3RhZ2UgPSBuZXcgU3RhZ2UoaSwgZmxvb3JQYXRoLCB3YWxsUGF0aCwgXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRQb2ludC5vbigyMzUsIDg1KSxcblx0XHRcdFx0XHRQb2ludC5vbig1NjUsIDQwMClcblx0XHRcdFx0XSk7XG5cdFx0XHRcblx0XHRcdHRoaXMuc3RhZ2VNYXBbaV0gPSBzdGFnZTtcblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgU2Vzc2lvbiBmcm9tIFwiLi9zZXNzaW9uXCI7XG5cbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2VTZXNzaW9uIGltcGxlbWVudHMgU2Vzc2lvbiB7XG5cdGdldCh0YWJsZTogc3RyaW5nLCBrZXk6IHN0cmluZykgOiBhbnkge1xuXHRcdGNvbnN0IHRhYmxlRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRhYmxlKSB8fCBudWxsO1xuXHRcdGlmICghdGFibGVEYXRhKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRjb25zdCB0YWJsZUpzb25PYmogPSBKU09OLnBhcnNlKHRhYmxlRGF0YSk7XG5cdFx0bGV0IGl0ZW0gPSB0YWJsZUpzb25PYmpba2V5XTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRsZXQgb2JqID0gSlNPTi5wYXJzZShpdGVtKTtcdFxuXHRcdFx0cmV0dXJuIG9iajtcblx0XHR9XHRcdFxuXHRcdHJldHVybiBpdGVtO1xuXHR9XG5cblx0c2V0KHRhYmxlOiBzdHJpbmcsIGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG5cdFx0Y29uc3Qgb3JpZ2luYWxEYXRhT2JqID0gdGhpcy5nZXQodGFibGUsIGtleSk7XG5cdFx0aWYgKCFvcmlnaW5hbERhdGFPYmopIHtcblx0XHRcdGNvbnN0IHRhYmxlRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRhYmxlKSB8fCBudWxsO1xuXHRcdFx0aWYgKHRhYmxlRGF0YSkge1xuXHRcdFx0XHRjb25zdCB0YWJsZUpzb25PYmogPSBKU09OLnBhcnNlKHRhYmxlRGF0YSk7XG5cdFx0XHRcdGxldCBkYXRhID0gdGFibGVKc29uT2JqO1xuXHRcdFx0XHRkYXRhW2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0odGFibGUsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxldCBkYXRhID0ge307XG5cdFx0XHRcdGRhdGFba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0YWJsZSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCB0YWJsZURhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0YWJsZSk7XG5cdFx0XHRjb25zdCB0YWJsZUpzb25PYmogPSBKU09OLnBhcnNlKHRhYmxlRGF0YSk7XG5cdFx0XHRsZXQganNvblZhbHVlID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG5cdFx0XHRsZXQgZGF0YSA9IHt9O1xuXHRcdFx0ZGF0YVtrZXldID0ganNvblZhbHVlO1xuXG5cdFx0XHRsZXQgZGF0YTIgPSB0YWJsZUpzb25PYmo7XG5cdFx0XHRkYXRhMltrZXldID0gb3JpZ2luYWxEYXRhT2JqO1xuXHRcdFx0XG5cdFx0XHRjb25zdCBvYmogPSB0aGlzLmV4dGVuZChkYXRhMiwgZGF0YSk7XG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0YWJsZSwgSlNPTi5zdHJpbmdpZnkob2JqKSk7XG5cdFx0fVxuXHR9XG5cblx0cmVtb3ZlKHRhYmxlOiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG5cdFx0Y29uc3Qgb3JpZ2luYWxEYXRhT2JqID0gdGhpcy5nZXQodGFibGUsIGtleSk7XG5cdFx0aWYgKCFvcmlnaW5hbERhdGFPYmopIHtcblx0XHRcdHJldHVybjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgdGFibGVEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGFibGUpO1xuXHRcdFx0Y29uc3QgdGFibGVKc29uT2JqID0gSlNPTi5wYXJzZSh0YWJsZURhdGEpO1xuXHRcdFx0ZGVsZXRlIHRhYmxlSnNvbk9ialtrZXldO1xuXHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0odGFibGUsIEpTT04uc3RyaW5naWZ5KHRhYmxlSnNvbk9iaikpO1xuXHRcdH1cblx0fVxuXG5cdGFsbFN0b3JhZ2UoKSB7XG5cdFx0bGV0IGFyY2hpdmUgPSB7fTtcblx0XHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSk7XG5cdFx0bGV0IGkgPSBrZXlzLmxlbmd0aDtcblxuXHRcdHdoaWxlIChpLS0pIHtcblx0XHRcdGFyY2hpdmVba2V5c1tpXV0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXlzW2ldKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJjaGl2ZTtcblx0fVxuXG5cblx0cHJpdmF0ZSBleHRlbmQoLi4uYXJncykge1xuXHRcdGxldCBvLCBpLCBrO1xuXHRcdGZvciAobyA9IHt9LCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Ly8gaWYgKGFyZ3VtZW50c1tpXS5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0KSBjb250aW51ZTtcblx0XHRcdGZvciAoayBpbiBhcmd1bWVudHNbaV0pIHtcblx0XHRcdFx0aWYgKGFyZ3VtZW50c1tpXS5oYXNPd25Qcm9wZXJ0eShrKSkge1xuXHRcdFx0XHRcdG9ba10gPSBhcmd1bWVudHNbaV1ba10uY29uc3RydWN0b3IgPT09IE9iamVjdCA/IHRoaXMuZXh0ZW5kKG9ba10gfHwge30sIGFyZ3VtZW50c1tpXVtrXSkgOiBhcmd1bWVudHNbaV1ba107XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG87XG5cdH1cbn0iLCJpbXBvcnQgeyBTdGF0ZU1hbmFnZXIsIEdhbWUgfSBmcm9tIFwicGhhc2VyLWNlXCI7XG5pbXBvcnQgU2VydmljZUNvbnRyb2xsZXIgZnJvbSBcIi4uL2NvbnRyb2xsZXIvc2VydmljZUNvbnRyb2xsZXJcIjtcbmltcG9ydCBTdGF0ZUNvbnRyb2xsZXIgZnJvbSBcIi4uL2NvbnRyb2xsZXIvc3RhdGVDb250cm9sbGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2UgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xuXHRzZXJ2aWNlQ29udHJvbGxlciA6IFNlcnZpY2VDb250cm9sbGVyO1xuXHRzdGF0ZUNvbnRyb2xsZXIgOiBTdGF0ZUNvbnRyb2xsZXI7XG5cblx0Y29uc3RydWN0b3IoZ2FtZSA6IFBoYXNlci5HYW1lKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdC8vIEZvciBJZ25vcmluZyBub24tZXhpc3QgcHJvcGVydHkgZXJyb3IuXG5cdFx0dGhpcy5zZXJ2aWNlQ29udHJvbGxlciA9IChnYW1lIGFzIGFueSkuc2VydmljZUNvbnRyb2xsZXI7XG5cdFx0dGhpcy5zdGF0ZUNvbnRyb2xsZXIgPSAoZ2FtZSBhcyBhbnkpLnN0YXRlQ29udHJvbGxlcjtcblx0fVxuXG5cdGdvU3RhdGUoc3RyaW5nKSB7XG5cdFx0dGhpcy5zZXJ2aWNlQ29udHJvbGxlciBcblx0fVxuXHRcbn0iLCJpbXBvcnQgQmFzZSBmcm9tIFwiLi9iYXNlXCI7XG5cbmV4cG9ydCBjbGFzcyBJbnRybyBleHRlbmRzIEJhc2Uge1xuXHRzdGF0aWMgaW50cm9JbnRlcnZhbCA9IDIwMDA7XG5cblx0Z2FtZVRpdGxlIDogc3RyaW5nO1xuXHRnYW1lVmVyc2lvbiA6IHN0cmluZztcblx0bG9nb1RleHQgOiBQaGFzZXIuVGV4dDtcblxuXHRjb25zdHJ1Y3RvcihnYW1lOiBQaGFzZXIuR2FtZSkge1xuXHRcdHN1cGVyKGdhbWUpO1xuXHR9XG5cblx0aW5pdChnYW1lVGl0bGUsIGdhbWVWZXJzaW9uKSB7XG5cdFx0dGhpcy5nYW1lVGl0bGUgPSBnYW1lVGl0bGU7XG5cdFx0dGhpcy5nYW1lVmVyc2lvbiA9IGdhbWVWZXJzaW9uO1xuXHR9XG5cblx0cHJlbG9hZCgpIHtcblx0XHRcblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHR0aGlzLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjM2IzYjNiJztcblxuXHRcdHRoaXMubG9nb1RleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQoXG5cdFx0XHR0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgXG5cdFx0XHR0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgXG5cdFx0XHR0aGlzLmdhbWVUaXRsZSxcblx0XHRcdHtcblx0XHRcdFx0Zm9udDogJzgwcHggQXJpYWw7Jyxcblx0XHRcdFx0ZmlsbDogJyNmZmZmZmYnXG5cdFx0XHR9XG5cdFx0KTtcblx0XHR0aGlzLmxvZ29UZXh0LmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XG5cdFx0dGhpcy5sb2dvVGV4dC5hbHBoYSA9IDAuODtcblxuXHRcdGNvbnN0IHAgPSB0aGlzLmdhbWUud29ybGQuYm91bmRzLmJvdHRvbVJpZ2h0O1xuXHRcdFxuXHRcdGNvbnN0IGZvb3RlciA9IHRoaXMuZ2FtZS5hZGQudGV4dChcblx0XHRcdHAueC01MCxcblx0XHRcdHAueS0zMCxcblx0XHRcdHRoaXMuZ2FtZVZlcnNpb24sXG5cdFx0XHR7XG5cdFx0XHRcdGZvbnQ6ICcxNXB4IEFyaWFsOycsXG5cdFx0XHRcdGZpbGw6ICcjZWVlZWVlJ1xuXHRcdFx0fVxuXHRcdCk7XG5cdFx0Zm9vdGVyLmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XG5cblx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0c2VsZi5zdGF0ZUNvbnRyb2xsZXIuZ29TdGF0ZSgnTG9naW4nKTtcblx0XHR9LCBJbnRyby5pbnRyb0ludGVydmFsKTtcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblxuXHR9XG59IiwiaW1wb3J0IFNlcnZpY2VDb250cm9sbGVyIGZyb20gXCIuLi9jb250cm9sbGVyL3NlcnZpY2VDb250cm9sbGVyXCI7XG5pbXBvcnQgQmFzZSBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgUmVjb3JkLCB7IFN0YWdlUmVjb3JkIH0gZnJvbSBcIi4uL3ZvL3JlY29yZFwiXG5pbXBvcnQgeyBSYW5rVXRpbCB9IGZyb20gXCIuLi92by9yYW5rXCI7XG5cbmV4cG9ydCBjbGFzcyBMZXZlbCBleHRlbmRzIEJhc2Uge1xuXHRyZWFkb25seSBudW1iZXJPZlN0YWdlUGVyUGFnZSA9IDM7XG5cblx0bG93ZXJTdGFnZUJ0biA6IFBoYXNlci5CdXR0b247XG5cdGhpZ2hlclN0YWdlQnRuIDogUGhhc2VyLkJ1dHRvbjtcblxuXHRsb2dvdXRCdG4gOiBQaGFzZXIuQnV0dG9uO1xuXHRcblx0bnVtYmVyT2ZTdGFnZTogbnVtYmVyO1xuXHRudW1iZXJPZlBhZ2U6IG51bWJlcjtcblx0Y3VycmVudFBhZ2U6IG51bWJlcjtcblx0c3RhZ2VNYXA6IGFueTtcblxuXHRyZWNvcmQ6IFJlY29yZDtcblxuXHRzdGFnZUJ0bkdyb3VwOiBQaGFzZXIuR3JvdXA7XG5cblx0Y29uc3RydWN0b3IoZ2FtZSkge1xuXHRcdHN1cGVyKGdhbWUpO1xuXHRcdHRoaXMuY3VycmVudFBhZ2UgPSAxO1xuXHR9XG5cdFxuXHRpbml0KHN0YWdlTWFwKSB7XG5cdFx0dGhpcy5zdGFnZU1hcCA9IHN0YWdlTWFwO1xuXHRcdHRoaXMubnVtYmVyT2ZTdGFnZSA9IE9iamVjdC5rZXlzKHN0YWdlTWFwKS5sZW5ndGg7XG5cdFx0dGhpcy5udW1iZXJPZlBhZ2UgPSBNYXRoLmNlaWwodGhpcy5udW1iZXJPZlN0YWdlL3RoaXMubnVtYmVyT2ZTdGFnZVBlclBhZ2UpO1xuXHR9XG5cblx0cHJlbG9hZCgpIHtcblx0XHR0aGlzLmdhbWUubG9hZC5zcHJpdGVzaGVldCgnc3RhZ2VBcnJvd3MnLCAnLi4vYXNzZXRzL2ltZy9zdGFnZUFycm93cy5wbmcnLCA0OCwgNDgpO1xuXHRcdHRoaXMuZ2FtZS5sb2FkLmltYWdlKCdsb2dvdXRCdG4nLCAnLi4vYXNzZXRzL2ltZy9sb2dvdXRCdG4ucG5nJyk7XG5cblx0XHR0aGlzLnJlY29yZCA9IHRoaXMuc2VydmljZUNvbnRyb2xsZXIuZ2V0UmVjb3JkKCk7XG5cdFx0dGhpcy5zdGFnZUJ0bkdyb3VwID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzNiM2IzYic7XG5cdFx0dGhpcy5nYW1lLnN0YWdlLmFscGhhID0gMC45O1xuXHRcdHRoaXMuZHJhd1N0YWdlQnRuKHRoaXMuY3VycmVudFBhZ2UpO1xuXHRcdHRoaXMuZHJhd1N0YWdlTW92ZUJ0bigpO1xuXHRcdHRoaXMuZHJhd0xvZ291dEJ0bigpO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXG5cdH1cblxuXHRwcml2YXRlIGRyYXdMb2dvdXRCdG4oKSB7XG5cdFx0dGhpcy5sb2dvdXRCdG4gPSB0aGlzLmdhbWUuYWRkLmJ1dHRvbih0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgNTAwLCAnbG9nb3V0QnRuJywgKCkgPT4ge1xuXHRcdFx0aWYgKGNvbmZpcm0oJ0xvZ291dCDtlZjsi5zqsqDsirXri4jquYw/JykpIHtcblx0XHRcdFx0Ly8gUmVtb3ZlIGxhc3RMb2dnZWRJblVzZXJcblx0XHRcdFx0dGhpcy5zZXJ2aWNlQ29udHJvbGxlci5hdXRoU2VydmljZS5sb2dvdXQodGhpcy5zZXJ2aWNlQ29udHJvbGxlci5hdXRoU2VydmljZS5nZXRMYXN0TG9nZ2VkSW5Vc2VyKCkudXNlcklkKTtcblx0XHRcdFx0dGhpcy5zdGF0ZUNvbnRyb2xsZXIuZ29TdGF0ZSgnTG9naW4nKTtcblx0XHRcdH1cblx0XHR9LCB0aGlzKTtcblxuXHRcdHRoaXMubG9nb3V0QnRuLmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XG5cdH1cblxuXHRwcml2YXRlIGNsZWFyU3RhZ2VCdG5GaWVsZCgpIHtcblx0XHR0aGlzLnN0YWdlQnRuR3JvdXAuY2FsbEFsbCgna2lsbCcsICcnKTtcblx0fVxuXG5cdHByaXZhdGUgZHJhd1N0YWdlQnRuKHBhZ2VOdW0pIHtcblx0XHR0aGlzLmNsZWFyU3RhZ2VCdG5GaWVsZCgpO1xuXG5cdFx0Y29uc3Qgd2lkdGggPSAyMDA7XG5cdFx0Y29uc3QgaGVpZ2h0ID0gMjAwO1xuXG5cdFx0bGV0IG9mZnNldFggPSAodGhpcy5nYW1lLndvcmxkLndpZHRoIC0gMTUwKSAvIHRoaXMubnVtYmVyT2ZTdGFnZVBlclBhZ2U7IC8vIDE1MDogcGFkZGluZ1xuXG5cdFx0bGV0IHN0YWdlSW5mb3MgPSB7fTtcblx0XHRpZiAodGhpcy5yZWNvcmQpIHtcblx0XHRcdHN0YWdlSW5mb3MgPSB0aGlzLnJlY29yZC5yZWNvcmRzO1xuXHRcdH1cblx0XHRcblx0XHRjb25zdCBvZmZzZXQgPSAocGFnZU51bS0xKSAqIHRoaXMubnVtYmVyT2ZTdGFnZVBlclBhZ2U7XG5cdFx0Zm9yIChsZXQgaT1vZmZzZXQ7IGk8b2Zmc2V0K3RoaXMubnVtYmVyT2ZTdGFnZVBlclBhZ2U7IGkrKykge1xuXHRcdFx0aWYgKCF0aGlzLnN0YWdlTWFwW2ldKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0bGV0IHN0YWdlSW5mbzogU3RhZ2VSZWNvcmQ7XG5cdFx0XHRsZXQgc3RhZ2VJbmZvU3RyID0gJyc7XG5cdFx0XHRpZiAoc3RhZ2VJbmZvc1tpXSkge1xuXHRcdFx0XHRzdGFnZUluZm8gPSBzdGFnZUluZm9zW2ldO1xuXHRcdFx0XHRzdGFnZUluZm9TdHIgKz0gJ1xcblRpbWU6ICcgKyBzdGFnZUluZm8udGltZSArICcgc2Vjb25kcyc7XG5cdFx0XHRcdHN0YWdlSW5mb1N0ciArPSAnXFxuUmFuazogJyArIFJhbmtVdGlsLnZhbHVlT2Yoc3RhZ2VJbmZvLnJhbmspO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBzdGFnZUJ0blRleHQgPSBgU3RhZ2UtJHtpKzF9YCArIHN0YWdlSW5mb1N0cjtcblxuXHRcdFx0Y29uc3Qgb2Zmc2V0WE9mQnRuID0gb2Zmc2V0WCAqIChpJXRoaXMubnVtYmVyT2ZTdGFnZVBlclBhZ2UpO1xuXG5cdFx0XHRjb25zdCBzdGFnZUJ0biA9IHRoaXMuZ2FtZS5hZGQudGV4dCgxNDUgKyBvZmZzZXRYT2ZCdG4sIDkwLCBzdGFnZUJ0blRleHQsIHtcblx0XHRcdFx0ZmlsbDogJyNmZmZmZmYnLFxuXHRcdFx0XHRmb250OiAnMTVweCBBcmlhbCdcblx0XHRcdH0pO1xuXG5cdFx0XHRzdGFnZUJ0bi5pbnB1dEVuYWJsZWQgPSB0cnVlO1xuXHRcdFx0c3RhZ2VCdG4uaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XG5cdFx0XHRcblx0XHRcdGNvbnN0IHN0YWdlTnVtID0gaSsxO1xuXHRcdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0XHRzdGFnZUJ0bi5ldmVudHMub25JbnB1dERvd24uYWRkKChlKSA9PiB7XG5cdFx0XHRcdGlmIChjb25maXJtKGBTdGFnZS0ke3N0YWdlTnVtfSDsnbTrj5ntlaDquYzsmpQ/YCkpIHtcblx0XHRcdFx0XHRzZWxmLnN0YXRlQ29udHJvbGxlci5nb1N0YXRlKCdQbGF5JywgdHJ1ZSwgdHJ1ZSwgc2VsZi5zdGFnZU1hcFtpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIHRoaXMpO1xuXG5cdFx0XHR0aGlzLnN0YWdlQnRuR3JvdXAuYWRkKHN0YWdlQnRuKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGRyYXdTdGFnZU1vdmVCdG4oKSB7XG5cdFx0Y29uc3QgcCA9IHRoaXMuZ2FtZS53b3JsZC5ib3VuZHM7XG5cblx0XHR0aGlzLmxvd2VyU3RhZ2VCdG4gPSB0aGlzLmdhbWUuYWRkLmJ1dHRvbigxMDAsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZICwgXCJzdGFnZUFycm93c1wiLCB0aGlzLmJ1dHRvbkNsaWNrZWQsIHRoaXMpO1xuXHRcdHRoaXMuaGlnaGVyU3RhZ2VCdG4gPSB0aGlzLmdhbWUuYWRkLmJ1dHRvbigxMDAsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZLCBcInN0YWdlQXJyb3dzXCIsIHRoaXMuYnV0dG9uQ2xpY2tlZCwgdGhpcyk7XG5cblx0XHR0aGlzLmxvd2VyU3RhZ2VCdG4uZnJhbWUgPSAwO1xuXHRcdHRoaXMuaGlnaGVyU3RhZ2VCdG4uZnJhbWUgPSAxO1xuXG5cdFx0Ly8gQWxpZ24gc3RhZ2UgcGFnZSBtb3ZlIGJ0blxuXHRcdHRoaXMubG93ZXJTdGFnZUJ0bi54ID0gMjA7XG5cdFx0dGhpcy5oaWdoZXJTdGFnZUJ0bi54ID0gcC5yaWdodCAtIDIwIC0gdGhpcy5oaWdoZXJTdGFnZUJ0bi53aWR0aDtcblxuXHRcdGNvbnN0IHN0YWdlVGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dCh0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgNTAsICdTdGFnZScsIHtcblx0XHRcdGZpbGw6ICcjZmZmZmZmJyxcblx0XHRcdGZvbnQ6ICcyMHB4IEFyaWFsJ1xuXHRcdH0pO1xuXG5cdFx0c3RhZ2VUZXh0LmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XG5cdH1cblxuXHRwcml2YXRlIGJ1dHRvbkNsaWNrZWQoYnV0dG9uLCBwb2ludGVyKSB7XG5cdFx0bGV0IGN1cnJlbnRQYWdlID0gdGhpcy5jdXJyZW50UGFnZTtcblx0XHRpZiAoYnV0dG9uLmZyYW1lID09IDApIHsgLy8gbG93ZXJTdGFnZUJ0blxuXHRcdFx0aWYgKGN1cnJlbnRQYWdlID09PSAxKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuZHJhd1N0YWdlQnRuKC0tdGhpcy5jdXJyZW50UGFnZSk7XG5cdFx0fSBlbHNlIGlmIChidXR0b24uZnJhbWUgPT0gMSkgeyAvLyBoaWdoZXJTdGFnZUJ0blxuXHRcdFx0aWYgKGN1cnJlbnRQYWdlKzEgPiB0aGlzLm51bWJlck9mUGFnZSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmRyYXdTdGFnZUJ0bigrK3RoaXMuY3VycmVudFBhZ2UpO1xuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlJztcbmltcG9ydCBVc2VyIGZyb20gJy4uL3ZvL3VzZXInO1xuXG5leHBvcnQgY2xhc3MgTG9naW4gZXh0ZW5kcyBCYXNlIHtcblx0bG9naW5UZXh0IDogUGhhc2VyLlRleHQ7XG5cdGdhbWVMb2dvIDogUGhhc2VyLkltYWdlO1xuXG5cdGd1ZXN0VVVJRCA6IHN0cmluZztcblxuXHRjb25zdHJ1Y3RvcihnYW1lKSB7XG5cdFx0c3VwZXIoZ2FtZSk7XG5cdH1cblxuXHRwcmVsb2FkKCkge1xuXHRcdHRoaXMuZ2FtZS5sb2FkLmltYWdlKCdnYW1lTG9nbycsICdhc3NldHMvaW1nL2dhbWVsb2dvLnBuZycpO1xuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyNGRkZGRkYnO1xuXG5cdFx0dGhpcy5nYW1lTG9nbyA9IHRoaXMuZ2FtZS5hZGQuaW1hZ2UodGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIDIxMCwgJ2dhbWVMb2dvJyk7XG5cdFx0dGhpcy5nYW1lTG9nby5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xuXG5cdFx0dGhpcy5sb2dpblRleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQoXG5cdFx0XHR0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgXG5cdFx0XHR0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgXG5cdFx0XHQnTG9naW4nLFxuXHRcdFx0e1xuXHRcdFx0XHRmb250OiAnMzVweCBBcmlhbDsnLFxuXHRcdFx0XHRmaWxsOiAnIzAwMDAwMCdcblx0XHRcdH1cblx0XHQpO1xuXHRcdHRoaXMubG9naW5UZXh0LmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XG5cdFx0dGhpcy5sb2dpblRleHQuYWxwaGEgPSAwLjg7XG5cblx0XHR0aGlzLmxvZ2luVGV4dC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xuXHRcdHRoaXMubG9naW5UZXh0LmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xuXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0dGhpcy5sb2dpblRleHQuZXZlbnRzLm9uSW5wdXREb3duLmFkZCgoZSkgPT4ge1xuXHRcdFx0Y29uc3QgdHdlZW4gPSBzZWxmLmdhbWUuYWRkLnR3ZWVuKHNlbGYubG9naW5UZXh0KS50byh7XG5cdFx0XHRcdGFscGhhOiAwLjJcblx0XHRcdH0sIDcwMCwgUGhhc2VyLkVhc2luZy5RdWFkcmF0aWMuT3V0LCBmYWxzZSwgMCwgMCwgZmFsc2UpO1xuXHRcdFx0XG5cdFx0XHR0d2Vlbi5vbkNvbXBsZXRlLmFkZCgoZSkgPT4ge1xuXHRcdFx0XHRsZXQgdXNlciA9IHNlbGYuc2VydmljZUNvbnRyb2xsZXIuYXV0aFNlcnZpY2UuZ2V0TGFzdExvZ2dlZEluVXNlcigpO1xuXHRcdFx0XHRpZiAodXNlciAmJiB1c2VyLnVzZXJJZCkge1xuXHRcdFx0XHRcdHNlbGYuc2VydmljZUNvbnRyb2xsZXIubG9naW4odXNlci51c2VySWQsICh1c2VyOiBVc2VyLCBpc1N1Y2Nlc3M6IGJvb2xlYW4pID0+IHtcblx0XHRcdFx0XHRcdGlmIChpc1N1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdFx0YWxlcnQoYCR7dXNlci51c2VySWR964uYLCDri6Tsi5wg67Cp66y47ZW07KO87IWo6rWw7JqULiDtmZjsmIHtlanri4jri6QuYCk7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHN0YWdlSW5mbyA9IHNlbGYuc2VydmljZUNvbnRyb2xsZXIuZ2V0U3RhZ2VJbmZvcm1hdGlvbigpO1xuXHRcdFx0XHRcdFx0XHRzZWxmLnN0YXRlQ29udHJvbGxlci5nb1N0YXRlKCdMZXZlbCcsIHRydWUsIHRydWUsIHN0YWdlSW5mbyk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRhbGVydCgn7JiI7KCE7JeQIOuwqeusuO2VmOyLoCDsoIHsnbQg7JeG7Jy87Iuc6rWw7JqUPyDsgqzsmqnsnpAg65Ox66Gd7ZmU66m07Jy866GcIOydtOuPme2VqeuLiOuLpC4nKTtcblx0XHRcdFx0XHRcdFx0c2VsZi5zdGF0ZUNvbnRyb2xsZXIuZ29TdGF0ZSgnUmVnaXN0ZXInKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcdFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFsZXJ0KCfsmIjsoITsl5Ag67Cp66y47ZWY7IugIOyggeydtCDsl4bsnLzsi5zqtbDsmpQ/IOyCrOyaqeyekCDrk7HroZ3tmZTrqbTsnLzroZwg7J2064+Z7ZWp64uI64ukLicpO1xuXHRcdFx0XHRcdHNlbGYuc3RhdGVDb250cm9sbGVyLmdvU3RhdGUoJ1JlZ2lzdGVyJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIHNlbGYpO1xuXG5cdFx0XHR0d2Vlbi5zdGFydCgpO1xuXHRcdH0sIHRoaXMpO1xuXG5cblx0XHR0aGlzLmxvZ2luVGV4dC5ldmVudHMub25JbnB1dE92ZXIuYWRkKChlKSA9PiB7XG5cdFx0XHRzZWxmLmxvZ2luVGV4dC5hbHBoYSA9IDAuNTtcblx0XHR9LCB0aGlzKTtcblxuXHRcdHRoaXMubG9naW5UZXh0LmV2ZW50cy5vbklucHV0T3V0LmFkZCgoZSkgPT4ge1xuXHRcdFx0c2VsZi5sb2dpblRleHQuYWxwaGEgPSAwLjg7XG5cdFx0fSwgdGhpcyk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cblx0fVxufSIsImltcG9ydCBCYXNlIGZyb20gXCIuL2Jhc2VcIjtcbmltcG9ydCB7IFN0YWdlIH0gZnJvbSBcIi4uL3ZvL3N0YWdlXCI7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi92by9wb2ludFwiO1xuaW1wb3J0IHsgUmVjb3JkRGFvIH0gZnJvbSBcIi4uL2Rhby9yZWNvcmREYW9cIjtcbmltcG9ydCBSZWNvcmQsIHsgU3RhZ2VSZWNvcmQgfSBmcm9tIFwiLi4vdm8vcmVjb3JkXCI7XG5pbXBvcnQgeyBSYW5rIH0gZnJvbSBcIi4uL3ZvL3JhbmtcIjtcblxuZXhwb3J0IGNsYXNzIFBsYXkgZXh0ZW5kcyBCYXNlIHtcblx0c3RhdGljIHJlYWRvbmx5IHJheUxlbmd0aCA9IDUwMDtcblx0c3RhdGljIHJlYWRvbmx5IG51bU9mUmF5cyA9IDIwO1xuXHRzdGF0aWMgcmVhZG9ubHkgbGlnaHRBbmdsZSA9IE1hdGguUEkvNDsgLy8gNDUgZGVnLlxuXG5cdHByaXZhdGUgcmVhZG9ubHkgc3BlZWQgPSAyO1xuXG5cdHRpbWVyIDogUGhhc2VyLlRpbWVyO1xuXHRlbGFwc2VkVGltZSA6IG51bWJlcjtcblx0dGltZUhhbmRsZXI6IG51bWJlcjtcblx0dGltZVRleHQgOiBQaGFzZXIuVGV4dDtcblx0XG5cdGZsb29yIDogUGhhc2VyLlNwcml0ZTtcblx0d2FsbCA6IFBoYXNlci5TcHJpdGU7XG5cdHdhbGxzQml0TWFwIDogUGhhc2VyLkJpdG1hcERhdGE7XG5cdG1hc2sgOiBQaGFzZXIuR3JhcGhpY3M7XG5cdHBsYXllciA6IFBoYXNlci5TcHJpdGU7XG5cdHBsYXllclBhdGggOiBzdHJpbmc7XG5cblx0Y3Vyc29yIDogUGhhc2VyLkN1cnNvcktleXM7XG5cdFxuXHRzdGFnZUluZm8gOiBTdGFnZTtcblx0Y3VycmVudEV4aXRQb2ludCA6IFBvaW50O1xuXHRjdXJyZW50RXhpdEdyYXBoaWMgOiBQaGFzZXIuR3JhcGhpY3M7XG5cblx0d2FsbENvbGxpc2lvblNvdW5kOiBQaGFzZXIuU291bmQ7XG5cdHRhZGFTb3VuZDogUGhhc2VyLlNvdW5kO1xuXG5cdGNvbnN0cnVjdG9yKGdhbWUpIHtcblx0XHRzdXBlcihnYW1lKTtcblx0fVxuXG5cdGluaXQoc3RhZ2VJbmZvIDogU3RhZ2UpIHtcblx0XHR0aGlzLnN0YWdlSW5mbyA9IHN0YWdlSW5mbztcblx0XHR0aGlzLnBsYXllclBhdGggPSAnYXNzZXRzL2ltZy9wbGF5ZXItc3ByZWFkc2hlZXQucG5nJztcblx0fVxuXG5cdHByZWxvYWQoKSB7XG5cdFx0dGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ2Zsb29yJywgdGhpcy5zdGFnZUluZm8uZmxvb3JGaWxlUGF0aCk7XG5cdFx0dGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ3dhbGwnLCB0aGlzLnN0YWdlSW5mby53YWxsRmlsZVBhdGgpO1xuXHRcdHRoaXMuZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KCdwbGF5ZXInLCB0aGlzLnBsYXllclBhdGgsIDY0LCA2NCwgMzYpO1xuXHRcdHRoaXMubG9hZC5hdWRpbyhcIndhbGxDb2xsaXNpb25Tb3VuZFwiLCBbXCJhc3NldHMvbXAzL2JlZXAtMDFhLm1wM1wiXSk7XG5cdFx0dGhpcy5sb2FkLmF1ZGlvKFwidGFkYVNvdW5kXCIsIFtcImFzc2V0cy9tcDMvdGFkYS0wMWEubXAzXCJdKTtcblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHR0aGlzLndhbGxDb2xsaXNpb25Tb3VuZCA9IHRoaXMuYWRkLmF1ZGlvKCd3YWxsQ29sbGlzaW9uU291bmQnKTtcblx0XHR0aGlzLnRhZGFTb3VuZCA9IHRoaXMuYWRkLmF1ZGlvKCd0YWRhU291bmQnKTtcblxuXHRcdHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMDAwMCc7IFxuXHRcdC8vIHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnMHhmZmZmZmYnOyBcblxuXHRcdHRoaXMuZ2FtZS53b3JsZC5zZXRCb3VuZHMoMCwgMCwgdGhpcy53b3JsZC53aWR0aCwgdGhpcy53b3JsZC5oZWlnaHQtMTIwKTtcblx0XHRcblx0XHR0aGlzLmNyZWF0ZUZsb29yKCk7XG5cdFx0dGhpcy5tYWtlRmlyc3RFeGl0UG9pbnQoKTtcblx0XHR0aGlzLmNyZWF0ZVdhbGwoKTtcblx0XHR0aGlzLmNyZWF0ZVBsYXllcigpOyBcblxuXHRcdHRoaXMuZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyLCBQaGFzZXIuQ2FtZXJhLkZPTExPV19MT0NLT04sIDAuMSwgMC4xKTtcblxuXHRcdHRoaXMuY3JlYXRlTWFzaygpO1xuXG5cdFx0dGhpcy5mbG9vci5tYXNrID0gdGhpcy5tYXNrO1xuXG5cdFx0dGhpcy50aW1lciA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZShmYWxzZSk7XG5cblx0XHR0aGlzLmN1cnNvciA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XG5cdFx0dGhpcy5jcmVhdGVUaW1lcigpO1xuXHR9XG5cblx0cHJpdmF0ZSBjcmVhdGVUaW1lcigpIHtcblx0XHR0aGlzLnRpbWVUZXh0ID0gdGhpcy5nYW1lLmFkZC50ZXh0KHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCA1MDAsICdUaW1lcjogMCBzZWNvbmQnLCB7XG5cdFx0XHRmaWxsOiAnI2ZmZmZmZicsXG5cdFx0XHRmb250OiAnMTVweCBBcmlhbCdcblx0XHR9KTtcblxuXHRcdHRoaXMuc3RhcnRUaW1lcigpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGFydFRpbWVyKCkge1xuXHRcdHRoaXMuZWxhcHNlZFRpbWUgPSAwO1xuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdHRoaXMudGltZUhhbmRsZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG5cdFx0XHRzZWxmLmVsYXBzZWRUaW1lKys7XG5cdFx0fSwgMTAwMCk7XG5cdH1cblxuXHRwcml2YXRlIHN0b3BUaW1lcigpIHtcblx0XHRjbGVhckludGVydmFsKHRoaXMudGltZUhhbmRsZXIpO1xuXHR9XG5cblx0cHJpdmF0ZSBjb3VudFRpbWUoKSB7XG5cdFx0bGV0IHRpbWVUZXh0ID0gJ1RpbWVyOiAnICsgdGhpcy5lbGFwc2VkVGltZSArICcgc2Vjb25kcydcblx0XHR0aGlzLnRpbWVUZXh0LnNldFRleHQodGltZVRleHQsIHRydWUpO1xuXHR9XG5cblxuXHR1cGRhdGUoKSB7XG5cdFx0dGhpcy5tb3ZlUGxheWVyKCk7XG5cdFx0dGhpcy5tb3ZlRmxhc2goKTtcblx0XHR0aGlzLnJhbmRvbUFscGhhVG8odGhpcy5mbG9vcik7XG5cdFx0dGhpcy5jb3VudFRpbWUoKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHQvLyBGb3IgZGVidWdcblx0XHQvLyB0aGlzLmdhbWUuZGVidWcuaW5wdXRJbmZvKDMyLCAzMik7XG5cdH1cblxuXHRwcml2YXRlIG1ha2VGaXJzdEV4aXRQb2ludCgpIHtcblx0XHRjb25zdCBpZHhPZkV4aXRQb2ludCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSkqMTEgJSB0aGlzLnN0YWdlSW5mby5leGl0UG9pbnRzLmxlbmd0aDtcblx0XHR0aGlzLnN0YWdlSW5mby5leGl0UG9pbnRzW2lkeE9mRXhpdFBvaW50XS5hY3RpdmUgPSB0cnVlO1xuXHRcdHRoaXMuY3VycmVudEV4aXRQb2ludCA9IHRoaXMuc3RhZ2VJbmZvLmV4aXRQb2ludHNbaWR4T2ZFeGl0UG9pbnRdO1xuXHRcdHRoaXMucmVuZGVyRXhpdFBvaW50KHRoaXMuY3VycmVudEV4aXRQb2ludCk7XG5cdH1cblxuXHRwcml2YXRlIHJlbmRlckV4aXRQb2ludChleGl0UG9pbnQgOiBQb2ludCkge1xuXHRcdGNvbnN0IGdyYXBoaWNhbFBvaW50ID0gKHgsIHkpID0+IHtcblx0XHRcdHRoaXMuY3VycmVudEV4aXRHcmFwaGljID0gdGhpcy5nYW1lLmFkZC5ncmFwaGljcygwLCAwKTtcblx0XHRcdHRoaXMuY3VycmVudEV4aXRHcmFwaGljLmJlZ2luRmlsbCgweGZmMDAwMCwgMC44KTtcblx0XHRcdHRoaXMuY3VycmVudEV4aXRHcmFwaGljLmRyYXdDaXJjbGUoeCwgeSwgMTApO1xuXHRcdFx0dGhpcy5jdXJyZW50RXhpdEdyYXBoaWMuZW5kRmlsbCgpO1xuXHRcdH07XG5cblx0XHRncmFwaGljYWxQb2ludChleGl0UG9pbnQueCwgZXhpdFBvaW50LnkpO1xuXHR9XG5cblx0cHJpdmF0ZSByYW5kb21BbHBoYVRvKG9iaiA6YW55KSB7XG5cdFx0b2JqLmFscGhhID0gMC41ICsgTWF0aC5yYW5kb20oKSAqIDAuNTtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlUGxheWVyKCkge1xuXHRcdHRoaXMucGxheWVyID0gdGhpcy5nYW1lLmFkZC5zcHJpdGUoNzUsIDc1LCAncGxheWVyJyk7XG5cdFx0dGhpcy5wbGF5ZXIuYW5jaG9yLnNldCguNSwgLjUpO1x0XG5cblx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgnbm9ydGgnLCBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOF0sIDEwLCB0cnVlKTtcblx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgnd2VzdCcsIFs5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTddLCAxMCwgdHJ1ZSk7XG5cdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5hZGQoJ3NvdXRoJywgWzE4LCAxOSwgMjAsIDIxLCAyMiwgMjMsIDI0LCAyNSwgMjZdLCAxMCwgdHJ1ZSk7XG5cdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5hZGQoJ2Vhc3QnLCBbMjcsIDI4LCAyOSwgMzAsIDMxLCAzMiwgMzMsIDM0LCAzNSBdLCAxMCwgdHJ1ZSk7XG5cdH1cblxuXHRwcml2YXRlIGNyZWF0ZUZsb29yKCkge1xuXHRcdHRoaXMuZmxvb3IgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSgwLCAwLCAnZmxvb3InKTtcblx0XHR0aGlzLmZsb29yLndpZHRoID0gNjQwO1xuXHRcdHRoaXMuZmxvb3IuaGVpZ2h0ID0gNDgwO1xuXHR9XG5cblx0cHJpdmF0ZSBjcmVhdGVNYXNrKCkge1xuXHRcdHRoaXMubWFzayA9IHRoaXMuZ2FtZS5hZGQuZ3JhcGhpY3MoMCwgMCk7XG5cdH1cblxuXHRwcml2YXRlIGNyZWF0ZVdhbGwoKSB7XG5cdFx0dGhpcy53YWxsc0JpdE1hcCA9IHRoaXMuZ2FtZS5tYWtlLmJpdG1hcERhdGEoNjQwLCA0ODApO1xuXHRcdHRoaXMud2FsbHNCaXRNYXAuZHJhdygnd2FsbCcpO1xuXHRcdHRoaXMud2FsbHNCaXRNYXAudXBkYXRlKCk7XG5cdFx0dGhpcy53YWxsID0gdGhpcy5nYW1lLmFkZC5zcHJpdGUoMCwgMCwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdH1cblxuXHRwcml2YXRlIG1vdmVGbGFzaCgpIHtcblx0XHRjb25zdCBwbGF5ZXJXaWR0aCA9IHRoaXMucGxheWVyLndpZHRoO1xuXHRcdGNvbnN0IHBsYXllckhlaWdodCA9IHRoaXMucGxheWVyLmhlaWdodDtcblxuXHRcdGNvbnN0IHBsYXllclggPSB0aGlzLnBsYXllci54O1xuXHRcdGNvbnN0IHBsYXllclkgPSB0aGlzLnBsYXllci55O1xuXHRcdFxuXHRcdGNvbnN0IGR5ID0gdGhpcy5nYW1lLmlucHV0LnkgLSBwbGF5ZXJZO1xuXHRcdGNvbnN0IGR4ID0gdGhpcy5nYW1lLmlucHV0LnggLSBwbGF5ZXJYO1xuXG5cdFx0Y29uc3QgbW91c2VBbmdsZSA9IE1hdGguYXRhbjIoZHksIGR4KTtcblxuXHRcdHRoaXMubWFzay5jbGVhcigpO1xuXHRcdHRoaXMubWFzay5saW5lU3R5bGUoMiwgMHhmZmZmZmYsIDEpO1xuXG5cdFx0dGhpcy5tYXNrLmJlZ2luRmlsbCgweDAwMDAwMCk7XG5cdFx0dGhpcy5tYXNrLm1vdmVUbyhwbGF5ZXJYLCBwbGF5ZXJZKTtcblx0XHRmb3IgKGxldCBpPTA7IGk8UGxheS5udW1PZlJheXM7IGkrKykge1xuXHRcdFx0Y29uc3QgcmF5QW5nbGUgPSBtb3VzZUFuZ2xlIC0gKFBsYXkubGlnaHRBbmdsZS8yKSArIChQbGF5LmxpZ2h0QW5nbGUvUGxheS5udW1PZlJheXMpICogaTtcblx0XHRcdGxldCBsYXN0WCA9IHBsYXllclg7XG5cdFx0XHRsZXQgbGFzdFkgPSBwbGF5ZXJZO1xuXHRcdFx0XG5cdFx0XHRmb3IgKGxldCBqPTE7IGo8PVBsYXkucmF5TGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0Y29uc3QgeCA9IE1hdGgucm91bmQocGxheWVyWCArIChqICogTWF0aC5jb3MocmF5QW5nbGUpKSk7XG5cdFx0XHRcdGNvbnN0IHkgPSBNYXRoLnJvdW5kKHBsYXllclkgKyAoaiAqIE1hdGguc2luKHJheUFuZ2xlKSkpO1xuXG5cdFx0XHRcdGNvbnN0IGNvbG9yID0gdGhpcy5waWNrQ29sb3JPZih4LCB5LCB0aGlzLndhbGxzQml0TWFwKTtcblx0XHRcdFx0aWYgKGNvbG9yID09IDApIHtcblx0XHRcdFx0XHRsYXN0WCA9IHg7XG5cdFx0XHRcdFx0bGFzdFkgPSB5O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMubWFzay5saW5lVG8obGFzdFgsIGxhc3RZKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5tYXNrLmxpbmVUbyhsYXN0WCwgbGFzdFkpO1xuXHRcdH1cblxuXHRcdHRoaXMubWFzay5saW5lVG8ocGxheWVyWCwgcGxheWVyWSk7XG5cdFx0dGhpcy5tYXNrLmVuZEZpbGwoKTtcblx0fVxuXG5cdHByaXZhdGUgbW92ZVBsYXllcigpIHtcblx0XHRsZXQgeFNwZWVkID0gMDtcblx0XHRsZXQgeVNwZWVkID0gMDtcblx0XHRsZXQgaXNNb3ZpbmcgPSBmYWxzZTtcblx0XHRsZXQgY2FuTW92ZSA9IGZhbHNlO1xuXG5cdFx0Y29uc3QgcGxheWVyV2lkdGggPSB0aGlzLnBsYXllci53aWR0aDtcblx0XHRjb25zdCBwbGF5ZXJIZWlnaHQgPSB0aGlzLnBsYXllci5oZWlnaHQ7XG5cblx0XHRjb25zdCBwbGF5ZXJYID0gdGhpcy5wbGF5ZXIueDtcblx0XHRjb25zdCBwbGF5ZXJZID0gdGhpcy5wbGF5ZXIueTtcblxuXHRcdGNvbnN0IGNvbG9yID0ge1xuXHRcdFx0bm9ydGggOiAwLFxuXHRcdFx0c291dGggOiAwLFxuXHRcdFx0d2VzdCA6IDAsXG5cdFx0XHRlYXN0IDogMFxuXHRcdH1cblxuXHRcdGlmICh0aGlzLmN1cnNvci51cC5pc0Rvd24pIHtcblx0XHRcdHlTcGVlZCAtPSB0aGlzLnNwZWVkO1xuXHRcdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdub3J0aCcpO1xuXHRcdFx0Y29uc3Qgbm9ydGhFYXN0ID0gdGhpcy5waWNrQ29sb3JPZihwbGF5ZXJYICsgcGxheWVyV2lkdGgvMiArIHhTcGVlZCwgcGxheWVyWSAtIHBsYXllckhlaWdodC8yICsgeVNwZWVkLCB0aGlzLndhbGxzQml0TWFwKTtcblx0XHRcdGNvbnN0IG5vcnRoV2VzdCA9IHRoaXMucGlja0NvbG9yT2YocGxheWVyWCAtIHBsYXllcldpZHRoLzIgKyB4U3BlZWQsIHBsYXllclkgLSBwbGF5ZXJIZWlnaHQvMiArIHlTcGVlZCwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdFx0XHRjb2xvci5ub3J0aCA9IG5vcnRoRWFzdCArIG5vcnRoV2VzdDtcblx0XHR9XG5cdFx0XG5cdFx0aWYgKHRoaXMuY3Vyc29yLmRvd24uaXNEb3duKSB7XG5cdFx0XHR5U3BlZWQgKz0gdGhpcy5zcGVlZDtcblx0XHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnc291dGgnKTtcblx0XHRcdGNvbnN0IHNvdXRoRWFzdCA9IHRoaXMucGlja0NvbG9yT2YocGxheWVyWCArIHBsYXllcldpZHRoLzIgKyB4U3BlZWQsIHBsYXllclkgKyBwbGF5ZXJIZWlnaHQvMiArIHlTcGVlZCwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdFx0XHRjb25zdCBzb3V0aFdlc3QgPSB0aGlzLnBpY2tDb2xvck9mKHBsYXllclggLSBwbGF5ZXJXaWR0aC8yICsgeFNwZWVkLCBwbGF5ZXJZICsgcGxheWVySGVpZ2h0LzIgKyB5U3BlZWQsIHRoaXMud2FsbHNCaXRNYXApO1xuXHRcdFx0Y29sb3Iuc291dGggPSBzb3V0aEVhc3QgKyBzb3V0aFdlc3Q7XG5cdFx0fVxuXHRcdFxuXHRcdGlmICh0aGlzLmN1cnNvci5sZWZ0LmlzRG93bikge1xuXHRcdFx0eFNwZWVkIC09IHRoaXMuc3BlZWQ7XG5cdFx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3dlc3QnKTtcblx0XHRcdGNvbnN0IHdlc3ROb3J0aCA9IHRoaXMucGlja0NvbG9yT2YocGxheWVyWCAtIHBsYXllcldpZHRoLzIgKyB4U3BlZWQsIHBsYXllclkgLSBwbGF5ZXJIZWlnaHQvMiArIHlTcGVlZCwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdFx0XHRjb25zdCB3ZXN0U291dGggPSB0aGlzLnBpY2tDb2xvck9mKHBsYXllclggLSBwbGF5ZXJXaWR0aC8yICsgeFNwZWVkLCBwbGF5ZXJZICsgcGxheWVySGVpZ2h0LzIgKyB5U3BlZWQsIHRoaXMud2FsbHNCaXRNYXApO1xuXHRcdFx0Y29sb3Iud2VzdCA9IHdlc3ROb3J0aCArIHdlc3RTb3V0aDtcblx0XHR9XG5cdFx0XG5cdFx0aWYgKHRoaXMuY3Vyc29yLnJpZ2h0LmlzRG93bikge1xuXHRcdFx0eFNwZWVkICs9IHRoaXMuc3BlZWQ7XG5cdFx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2Vhc3QnKTtcblx0XHRcdGNvbnN0IGVhc3ROb3J0aCA9IHRoaXMucGlja0NvbG9yT2YocGxheWVyWCArIHBsYXllcldpZHRoLzIgKyB4U3BlZWQsIHBsYXllclkgLSBwbGF5ZXJIZWlnaHQvMiArIHlTcGVlZCwgdGhpcy53YWxsc0JpdE1hcCk7XG5cdFx0XHRjb25zdCBlYXN0U291dGggPSB0aGlzLnBpY2tDb2xvck9mKHBsYXllclggKyBwbGF5ZXJXaWR0aC8yICsgeFNwZWVkLCBwbGF5ZXJZICsgcGxheWVySGVpZ2h0LzIgKyB5U3BlZWQsIHRoaXMud2FsbHNCaXRNYXApO1xuXHRcdFx0Y29sb3IuZWFzdCA9IGVhc3ROb3J0aCArIGVhc3RTb3V0aDtcblx0XHR9XG5cblx0XHRpc01vdmluZyA9IE1hdGguYWJzKHhTcGVlZCkgKyBNYXRoLmFicyh5U3BlZWQpIDwgdGhpcy5zcGVlZCoyICYmIE1hdGguYWJzKHhTcGVlZCkgKyBNYXRoLmFicyh5U3BlZWQpID4gMDtcblx0XHRjYW5Nb3ZlID0gY29sb3Iubm9ydGggKyBjb2xvci5zb3V0aCArIGNvbG9yLmVhc3QgKyBjb2xvci53ZXN0ID09IDA7XG5cdFx0aWYgKGlzTW92aW5nICYmIGNhbk1vdmUpIHtcblx0XHRcdHRoaXMucGxheWVyLnggKz0geFNwZWVkO1xuXHRcdFx0dGhpcy5wbGF5ZXIueSArPSB5U3BlZWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc3RvcFBsYXllckFuaW1jYXRlaW9uKCk7XG5cdFx0fVxuXG5cdFx0aWYgKGlzTW92aW5nICYmICFjYW5Nb3ZlKSB7XG5cdFx0XHR0aGlzLmdhbWUuY2FtZXJhLnNoYWtlKCk7XG5cdFx0XHR0aGlzLndhbGxDb2xsaXNpb25Tb3VuZC5wbGF5KCk7XG5cdFx0fVxuXG5cdFx0XG5cdFx0aWYgKE1hdGguYWJzKHRoaXMuY3VycmVudEV4aXRQb2ludC54LXRoaXMucGxheWVyLngpIDwgMyAmJiBNYXRoLmFicyh0aGlzLnBsYXllci55LXRoaXMuY3VycmVudEV4aXRQb2ludC55KSA8IDMpIHtcblx0XHRcdGFsZXJ0KCdDb25ncmF0IScpO1xuXHRcdFx0dGhpcy50YWRhU291bmQucGxheSgpO1xuXG5cdFx0XHRjb25zdCB1c2VySWQgPSB0aGlzLnNlcnZpY2VDb250cm9sbGVyLmF1dGhTZXJ2aWNlLmdldExhc3RMb2dnZWRJblVzZXIoKS51c2VySWQ7XG5cdFx0XHRjb25zdCBzdGFnZUlkID0gdGhpcy5zdGFnZUluZm8uc3RhZ2VJZDtcblx0XHRcdGNvbnN0IHJhbmsgPSB0aGlzLnNlcnZpY2VDb250cm9sbGVyLnJhbmtTZXJ2aWNlLmNhbGN1bGF0ZVJhbmsoc3RhZ2VJZCwgdGhpcy5lbGFwc2VkVGltZSk7XG5cblx0XHRcdGNvbnN0IHN0YWdlUmVjb3JkID0gbmV3IFN0YWdlUmVjb3JkKHN0YWdlSWQsIHJhbmssIHRoaXMuZWxhcHNlZFRpbWUpO1xuXHRcdFx0Y29uc3Qgc3RhZ2VSZWNvcmRPYmogPSB7fTtcblx0XHRcdHN0YWdlUmVjb3JkT2JqW3N0YWdlSWRdID0gc3RhZ2VSZWNvcmQ7XG5cdFx0XHRjb25zdCByZWNvcmQgPSBuZXcgUmVjb3JkKHVzZXJJZCwgc3RhZ2VSZWNvcmRPYmopO1xuXHRcdFx0dGhpcy5zZXJ2aWNlQ29udHJvbGxlci5yZWNvcmRSYW5rKHJlY29yZCk7XG5cdFx0XHRcblx0XHRcdGNvbnN0IHN0YWdlSW5mbyA9IHRoaXMuc2VydmljZUNvbnRyb2xsZXIuZ2V0U3RhZ2VJbmZvcm1hdGlvbigpO1xuXHRcdFx0dGhpcy5zdGF0ZUNvbnRyb2xsZXIuZ29TdGF0ZSgnTGV2ZWwnLCB0cnVlLCB0cnVlLCBzdGFnZUluZm8pO1xuXG5cdFx0XHR0aGlzLnN0b3BUaW1lcigpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgcGlja0NvbG9yT2YoeDogbnVtYmVyLCB5OiBudW1iZXIsIGJpdE1hcERhdGE6IFBoYXNlci5CaXRtYXBEYXRhKSB7XG5cdFx0Y29uc3QgY29sb3IgPSBiaXRNYXBEYXRhLmdldFBpeGVsMzIoeCwgeSk7XG5cdFx0cmV0dXJuIGNvbG9yO1xuXHR9XG5cblx0cHJpdmF0ZSBzdG9wUGxheWVyQW5pbWNhdGVpb24oKSB7XG5cdFx0dGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5zdG9wKCdub3J0aCcpO1xuXHRcdHRoaXMucGxheWVyLmFuaW1hdGlvbnMuc3RvcCgnc291dGgnKTtcblx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLnN0b3AoJ3dlc3QnKTtcblx0XHR0aGlzLnBsYXllci5hbmltYXRpb25zLnN0b3AoJ2Vhc3QnKTtcblx0fVxufSIsImltcG9ydCBVdGlsIGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnQvaW5wdXRUZXh0JztcbmltcG9ydCBCYXNlIGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi92by91c2VyJztcbmltcG9ydCBTY29yZSBmcm9tICcuLi92by9zY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBSZWdpc3RlciBleHRlbmRzIEJhc2Uge1xuXHRpbnB1dFRleHQgOiBDb21wb25lbnQuSW5wdXRUZXh0O1xuXHRyZWdpc3RlckJ0biA6IFBoYXNlci5UZXh0O1xuXG5cdGNvbnN0cnVjdG9yKGdhbWUpIHtcblx0XHRzdXBlcihnYW1lKTtcblx0fVxuXG5cdHByZWxvYWQoKSB7XG5cdFx0XG5cdH1cblxuXHRwcml2YXRlIHNldFJlZ2lzdGVySW5wdXRUZXh0KCkge1xuXHRcdGxldCB0ZXh0V2lkdGggPSAyMDA7XG5cdFx0bGV0IHRleHRIZWlnaHQgPSA4MDtcblx0XHRsZXQgdGV4dFggPSB0aGlzLmdhbWUud29ybGQuY2VudGVyWCAtIHRleHRXaWR0aC8yO1xuXHRcdGxldCB0ZXh0WSA9IHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZIC0gdGV4dEhlaWdodC8yO1xuXG5cdFx0bGV0IHRleHRNYXhMZW5ndGggPSAxNDtcblxuXHRcdGxldCB0ZXh0U3R5bGUgPSB7XG5cdFx0XHRmaWxsOiAnIzAwMDAwMCcsXG5cdFx0XHRib3VuZHNBbGlnbkg6ICdjZW50ZXInLFxuXHRcdFx0Ym91bmRzQWxpZ25WOiAnbWlkZGxlJyxcblx0XHRcdGZvbnQ6ICcyMHB4IEFyaWFsJ1xuXHRcdH1cblxuXHRcdHRoaXMuaW5wdXRUZXh0ID0gbmV3IENvbXBvbmVudC5JbnB1dFRleHQodGhpcy5nYW1lLCB0ZXh0WCwgdGV4dFksIHRleHRXaWR0aCwgdGV4dEhlaWdodCwgdGV4dE1heExlbmd0aCwgJ2V4KXVzZXIwMDEnLCB0ZXh0U3R5bGUpO1xuXHR9XG5cblx0cHJpdmF0ZSBzZXRSZWdpc3RlckJ1dHRvbigpIHtcblx0XHRsZXQgYnRuV2lkdGggPSAyMDA7XG5cdFx0bGV0IGJ0bkhlaWdodCA9IDgwO1xuXHRcdFxuXHRcdGxldCBidG5YID0gdGhpcy5nYW1lLndvcmxkLmNlbnRlclg7Ly8gLSBidG5XaWR0aC8yO1xuXHRcdGxldCBidG5ZID0gdGhpcy5nYW1lLndvcmxkLmNlbnRlclkgKyAxMjA7Ly8gLSBidG5IZWlnaHQvMiArIDEwMDtcblxuXHRcdGxldCBidG5UZXh0ID0gJ1JlZ2lzdGVyJztcblxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0bGV0IHRleHRTdHlsZSA9IHtcblx0XHRcdGZpbGw6ICcjMDAwMDAwJyxcblx0XHRcdGJvdW5kc0FsaWduSDogJ2NlbnRlcicsXG5cdFx0XHRib3VuZHNBbGlnblY6ICdtaWRkbGUnLFxuXHRcdFx0Zm9udDogJzIwcHggQXJpYWwnXG5cdFx0fVxuXHRcdHRoaXMucmVnaXN0ZXJCdG4gPSB0aGlzLmdhbWUuYWRkLnRleHQoYnRuWCwgYnRuWSwgYnRuVGV4dCwgdGV4dFN0eWxlKTtcblx0XHR0aGlzLnJlZ2lzdGVyQnRuLmFuY2hvci5zZXRUbyguNSwgLjUpO1xuXHRcdFxuXHRcdHRoaXMucmVnaXN0ZXJCdG4uaW5wdXRFbmFibGVkID0gdHJ1ZTtcblx0XHR0aGlzLnJlZ2lzdGVyQnRuLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xuXG5cdFx0dGhpcy5yZWdpc3RlckJ0bi5ldmVudHMub25JbnB1dERvd24uYWRkKChlKSA9PiB7XG5cdFx0XHRjb25zdCB1c2VySWQgPSBzZWxmLmlucHV0VGV4dC50ZXh0O1xuXHRcdFx0aWYgKGNvbmZpcm0oYCR7dXNlcklkfeuLmOycvOuhnCDtlZjsi5zqsqDsirXri4jquYw/YCkpIHtcblx0XHRcdFx0XG5cdFx0XHRcdHNlbGYuc2F2ZVVzZXJJZCh1c2VySWQsICh1c2VyLCBpc0FscmVhZHlFeGlzdCkgPT4ge1xuXHRcdFx0XHRcdGlmIChpc0FscmVhZHlFeGlzdCkge1xuXHRcdFx0XHRcdFx0YWxlcnQoYCR7c2VsZi5pbnB1dFRleHQudGV4dH3ri5gg7JiI7KCE7JeQIOyYpOyLoOyggeydtOyeiOycvOyLnOq1sOyalC4g64uk7IucIO2VnOuyiCDtmZjsmIHtlanri4jri6QuYCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c2VsZi5zZXJ2aWNlQ29udHJvbGxlci5sb2dpbih1c2VyLnVzZXJJZCwgKHVzZXIsIGlzU3VjY2VzcykgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3Qgc3RhZ2VJbmZvID0gc2VsZi5zZXJ2aWNlQ29udHJvbGxlci5nZXRTdGFnZUluZm9ybWF0aW9uKCk7XG5cdFx0XHRcdFx0XHRzZWxmLnN0YXRlQ29udHJvbGxlci5nb1N0YXRlKCdMZXZlbCcsIHRydWUsIHRydWUsIHN0YWdlSW5mbyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0sIHRoaXMpO1xuXG5cdFx0dGhpcy5yZWdpc3RlckJ0bi5ldmVudHMub25JbnB1dE92ZXIuYWRkKChlKSA9PiB7XG5cdFx0XHR0aGlzLnJlZ2lzdGVyQnRuLmFscGhhID0gMC43O1xuXHRcdH0sIHRoaXMpO1xuXG5cdFx0dGhpcy5yZWdpc3RlckJ0bi5ldmVudHMub25JbnB1dE91dC5hZGQoKGUpID0+IHtcblx0XHRcdHRoaXMucmVnaXN0ZXJCdG4uYWxwaGEgPSAxO1xuXHRcdH0sIHRoaXMpO1xuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuc2V0UmVnaXN0ZXJJbnB1dFRleHQoKTtcblx0XHR0aGlzLnNldFJlZ2lzdGVyQnV0dG9uKCk7XG5cdFx0XG5cdH1cblxuXHRzYXZlVXNlcklkKHVzZXJJZCwgY2FsbGJhY2spIHtcblx0XHRjb25zdCB1c2VyID0gbmV3IFVzZXIodXNlcklkLCBuZXcgU2NvcmUoKSk7XG5cdFx0dGhpcy5zZXJ2aWNlQ29udHJvbGxlci5yZWdpc3RlclVzZXIodXNlciwgY2FsbGJhY2spO1xuXHR9XG59IiwiZXhwb3J0IGNsYXNzIFBvaW50IHtcblx0eDogbnVtYmVyO1xuXHR5OiBudW1iZXI7XG5cdGFjdGl2ZTogYm9vbGVhbjtcblxuXHRjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6bnVtYmVyKSB7XG5cdFx0dGhpcy54ID0geDtcblx0XHR0aGlzLnkgPSB5O1xuXHRcdHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cdH1cblxuXHRwdWJsaWMgc3RhdGljIG9uKHg6IG51bWJlciwgeTpudW1iZXIpIHtcblx0XHRyZXR1cm4gbmV3IFBvaW50KHgseSk7XG5cdH1cbn0iLCJleHBvcnQgZW51bSBSYW5rIHtcblx0Tk9ORSA9IDAsXG5cdFMgPSAxLFxuXHRBID0gMixcblx0QiA9IDMsXG5cdEMgPSA0LFxuXHREID0gNSxcblx0RSA9IDYsXG5cdEYgPSA3XG59XG5cblxuZXhwb3J0IGNsYXNzIFJhbmtVdGlsIHtcblx0c3RhdGljIHZhbHVlT2YocmFuazogUmFuayk6IHN0cmluZyB7XG5cdFx0bGV0IHJldCA9ICcnO1xuXG5cdFx0c3dpdGNoKHJhbmspIHtcblx0XHRcdGNhc2UgUmFuay5OT05FOiB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBSYW5rLlM6IHtcblx0XHRcdFx0cmV0ID0gJ1MnO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgUmFuay5BOiB7XG5cdFx0XHRcdHJldCA9ICdBJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFJhbmsuQjoge1xuXHRcdFx0XHRyZXQgPSAnQic7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBSYW5rLkM6IHtcblx0XHRcdFx0cmV0ID0gJ0MnO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgUmFuay5EOiB7XG5cdFx0XHRcdHJldCA9ICdEJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFJhbmsuRToge1xuXHRcdFx0XHRyZXQgPSAnRSc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBSYW5rLkY6IHtcblx0XHRcdFx0cmV0ID0gJ0YnO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0cmV0ID0gJyc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJldDtcblx0fVxufSIsImltcG9ydCB7IFJhbmsgfSBmcm9tIFwiLi9yYW5rXCI7XG5pbXBvcnQgVm8gZnJvbSBcIi4vdm9cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb3JkIGV4dGVuZHMgVm8ge1xuXHR1c2VySWQ6IHN0cmluZztcblx0cmVjb3JkczogYW55O1xuXG5cdGNvbnN0cnVjdG9yKHVzZXJJZCwgcmVjb3Jkcykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy51c2VySWQgPSB1c2VySWQ7XG5cdFx0dGhpcy5yZWNvcmRzID0gcmVjb3Jkcztcblx0fVxuXG5cdHB1dChyZWNvcmQ6IFN0YWdlUmVjb3JkKSB7XG5cdFx0dGhpcy5yZWNvcmRzW3JlY29yZC5zdGFnZUlkXSA9IHtcblx0XHRcdHN0YWdlSWQ6IHJlY29yZC5zdGFnZUlkLFxuXHRcdFx0cmFuazogcmVjb3JkLnJhbmssXG5cdFx0XHR0aW1lOiByZWNvcmQudGltZVxuXHRcdH1cblx0XHQvLyB0aGlzLnJlY29yZHNbcmVjb3JkLnN0YWdlSWRdID0gcmVjb3JkO1xuXHR9XG5cblx0dG9Kc29uKCkge1xuXHRcdGxldCByZWNvcmRzID0ge307XG5cblx0XHRmb3IgKGxldCBwIGluIHRoaXMucmVjb3Jkcykge1xuXHRcdFx0cmVjb3Jkc1twXSA9IHRoaXMucmVjb3Jkc1twXS50b0pzb24oKTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dXNlcklkOiB0aGlzLnVzZXJJZCxcblx0XHRcdHJlY29yZHM6IHJlY29yZHNcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgc3RhdGljIGJ5KGpzb24gOiBhbnkpOiBSZWNvcmQge1xuXHRcdGlmIChqc29uID09IG51bGwpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRjb25zdCB1c2VyOiBSZWNvcmQgPSBuZXcgUmVjb3JkKGpzb24udXNlcklkLCBqc29uLnJlY29yZHMpO1xuXHRcdHJldHVybiB1c2VyO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBTdGFnZVJlY29yZCBleHRlbmRzIFZvIHtcblx0c3RhZ2VJZDogbnVtYmVyO1xuXHRyYW5rOiBSYW5rO1xuXHR0aW1lOiBudW1iZXI7XG5cblx0Y29uc3RydWN0b3Ioc3RhZ2VJZCwgcmFuazogUmFuaywgdGltZSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zdGFnZUlkID0gc3RhZ2VJZDtcblx0XHR0aGlzLnJhbmsgPSByYW5rO1xuXHRcdHRoaXMudGltZSA9IHRpbWU7XG5cdH1cblxuXHR0b0pzb24oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHN0YWdlSWQ6IHRoaXMuc3RhZ2VJZCxcblx0XHRcdHJhbms6IHRoaXMucmFuayxcblx0XHRcdHRpbWU6IHRoaXMudGltZVxuXHRcdH1cblx0fVxufSIsImltcG9ydCB7IFJhbmsgfSBmcm9tIFwiLi9yYW5rXCI7XG5pbXBvcnQgVm8gZnJvbSBcIi4vdm9cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmUgZXh0ZW5kcyBWbyB7XG5cdHRpbWUgOiBudW1iZXI7XG5cdHJhbmsgOiBSYW5rO1xuXHRcblx0Y29uc3RydWN0b3IodGltZT86IG51bWJlciwgcmFuaz86IFJhbmspIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy50aW1lID0gdGltZSB8IDA7XG5cdFx0dGhpcy5yYW5rID0gcmFuayB8IFJhbmsuTk9ORTtcblx0fVxuXG5cdHRvSnNvbigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGltZTogdGhpcy50aW1lLFxuXHRcdFx0cmFuazogdGhpcy5yYW5rLFxuXHRcdH1cblx0fVxuXHRcbn0iLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL3BvaW50XCI7XG5pbXBvcnQgeyBNYXBUeXBlIH0gZnJvbSBcIi4vbWFwVHlwZVwiO1xuaW1wb3J0IHsgUmFuayB9IGZyb20gXCIuL3JhbmtcIjtcblxuZXhwb3J0IGNsYXNzIFN0YWdlIHtcblx0Y29uc3RydWN0b3Ioc3RhZ2VJZDogbnVtYmVyLCBmbG9vckZpbGVQYXRoOiBzdHJpbmcsIHdhbGxGaWxlUGF0aDogc3RyaW5nLCBleGl0UG9pbnRzOiBBcnJheTxQb2ludD4sIHRpbWVMaW1pdD01MDAwKSB7XG5cdFx0dGhpcy5zdGFnZUlkID0gc3RhZ2VJZDtcblx0XHR0aGlzLmZsb29yRmlsZVBhdGggPSBmbG9vckZpbGVQYXRoO1xuXHRcdHRoaXMud2FsbEZpbGVQYXRoID0gd2FsbEZpbGVQYXRoO1xuXHRcdHRoaXMuZXhpdFBvaW50cyA9IGV4aXRQb2ludHM7XG5cblx0XHR0aGlzLnRpbWVMaW1pdCA9IHRpbWVMaW1pdDtcblx0fVxuXHRcblx0c3RhZ2VJZCA6IG51bWJlcjtcblx0Zmxvb3JGaWxlUGF0aCA6IHN0cmluZztcblx0d2FsbEZpbGVQYXRoIDogc3RyaW5nO1xuXG5cdGV4aXRQb2ludHMgOiBBcnJheTxQb2ludD47XG5cdHRpbWVMaW1pdCA6IG51bWJlcjtcblxuXHR0cmVhc3VyZVBvaW50cyA6IEFycmF5PFBvaW50PjtcblxuXHRtYXBUeXBlOiBNYXBUeXBlO1xuXG5cdC8vVE9ETzogPz8/XG5cdHNvdW5kIDogUGhhc2VyLlNvdW5kO1xuXG5cdFxufSIsImltcG9ydCBTY29yZSBmcm9tIFwiLi9zY29yZVwiO1xuaW1wb3J0IFZvIGZyb20gXCIuL3ZvXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyBWbyB7XG5cdHVzZXJJZCA6IHN0cmluZztcblx0c2NvcmUgOiBTY29yZTtcblx0cmVnaXN0ZXJEYXRlIDogRGF0ZTtcblx0bGFzdFZpc2l0RGF0ZSA6IERhdGU7XG5cblx0Y29uc3RydWN0b3IodXNlcklkLCBzY29yZSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy51c2VySWQgPSB1c2VySWQ7XG5cdFx0dGhpcy5zY29yZSA9IHNjb3JlO1xuXHRcdHRoaXMucmVnaXN0ZXJEYXRlID0gbmV3IERhdGUoKTtcblx0XHR0aGlzLmxhc3RWaXNpdERhdGUgPSBuZXcgRGF0ZSgpO1xuXHR9XG5cblx0cHVibGljIHN0YXRpYyBieShqc29uIDogYW55KTogVXNlciB7XG5cdFx0aWYgKGpzb24gPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdGNvbnN0IHVzZXI6IFVzZXIgPSBuZXcgVXNlcihqc29uLnVzZXJJZCwganNvbi5zY29yZSk7XG5cdFx0dXNlci5yZWdpc3RlckRhdGUgPSBqc29uLnJlZ2lzdGVyRGF0ZTtcblx0XHR1c2VyLmxhc3RWaXNpdERhdGUgPSBqc29uLmxhc3RWaXNpdERhdGU7XG5cblx0XHRyZXR1cm4gdXNlcjtcblx0fVxuXG5cdHRvSnNvbigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dXNlcklkOiB0aGlzLnVzZXJJZCxcblx0XHRcdHNjb3JlOiB0aGlzLnNjb3JlLFxuXHRcdFx0cmVnaXN0ZXJEYXRlOiB0aGlzLnJlZ2lzdGVyRGF0ZSxcblx0XHRcdGxhc3RWaXNpdERhdGU6IHRoaXMubGFzdFZpc2l0RGF0ZSxcblx0XHR9O1xuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgVm8ge1xuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy50b0pzb24oKSk7XG5cdH1cblxuXHRhYnN0cmFjdCB0b0pzb24oKSA6IGFueTtcbn0iXSwic291cmNlUm9vdCI6IiJ9