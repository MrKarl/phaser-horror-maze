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

/***/ "./src/authService.ts":
/*!****************************!*\
  !*** ./src/authService.ts ***!
  \****************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");

var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.getInstance = function () {
        return AuthService.instance;
    };
    AuthService.prototype.login = function (callback) {
        var uuid = _util__WEBPACK_IMPORTED_MODULE_0__["Util"].getLocalStorageValue('uuid');
        if (uuid) {
            callback(true);
        }
        else {
            callback(false);
        }
    };
    AuthService.prototype.logout = function () {
    };
    AuthService.instance = new AuthService();
    return AuthService;
}());



/***/ }),

/***/ "./src/component/inputText.ts":
/*!************************************!*\
  !*** ./src/component/inputText.ts ***!
  \************************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Component;
(function (Component) {
    var InputText = /** @class */ (function (_super) {
        __extends(InputText, _super);
        function InputText(game, x, y, width, height, maxLength, text, style) {
            var _this = _super.call(this, game, x, y, text, style) || this;
            _this.isFocus = false;
            _this.placeholder = 'Input Text';
            if (text.length == 0) {
                text = _this.placeholder;
            }
            _this.x = x;
            _this.y = y;
            _this.width = width;
            _this.height = height;
            _this.text = text;
            _this.maxLength = maxLength ? maxLength : 20;
            var group = _this.game.add.group();
            var graphics = _this.game.make.graphics();
            graphics.lineStyle(2, 0x000000, 1);
            // graphics.beginFill(0xFF700B, 1);
            graphics.drawRect(x, y, width, height);
            // graphics.endFill();
            group.add(graphics);
            _this.phaserText = _this.game.add.text(x, y, text, style);
            _this.phaserText.setTextBounds(0, 0, width, height);
            _this.phaserText.alpha = 0.6;
            _this.phaserText.inputEnabled = true;
            _this.phaserText.events.onInputDown.add(function (sprite, pointer) {
                _this.isFocus = true;
                _this.phaserText.alpha = 1;
            }, _this);
            _this.game.input.onDown.add(function (sprite, pointer) {
                var textX = _this.phaserText.world.x;
                var textWidth = _this.phaserText.width;
                var textY = _this.phaserText.world.y;
                var textHeight = _this.phaserText.height;
                if (pointer.clientX > textX && pointer.clientX <= textX + textWidth) {
                    if (pointer.clientY > textY && pointer.clientY <= textY + textHeight) {
                        _this.isFocus = true;
                        _this.phaserText.alpha = 1;
                        return;
                    }
                }
                _this.phaserText.alpha = 0.6;
                _this.isFocus = false;
            }, _this);
            _this.game.input.keyboard.addCallbacks(_this, function (e) {
                if (!_this.isFocus) {
                    return;
                }
                if (e.keyCode == Phaser.Keyboard.BACKSPACE) {
                    _this.phaserText.text = _this.phaserText.text.slice(0, -1);
                    return;
                }
                if (_this.phaserText.text.length + 1 > _this.maxLength) {
                    return;
                }
                _this.phaserText.text += e.key;
            });
            return _this;
        }
        InputText.prototype.render = function () {
        };
        return InputText;
    }(Phaser.Text));
    Component.InputText = InputText;
})(Component || (Component = {}));


/***/ }),

/***/ "./src/controller.ts":
/*!***************************!*\
  !*** ./src/controller.ts ***!
  \***************************/
/*! exports provided: Controller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");
/* harmony import */ var _stageService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stageService */ "./src/stageService.ts");
/* harmony import */ var _authService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./authService */ "./src/authService.ts");



var Controller = /** @class */ (function () {
    function Controller() {
        this.userId = _util__WEBPACK_IMPORTED_MODULE_0__["Util"].getLocalStorageValue('uuid');
        this.stageService = _stageService__WEBPACK_IMPORTED_MODULE_1__["StageService"].getInstance();
        this.authService = _authService__WEBPACK_IMPORTED_MODULE_2__["AuthService"].getInstance();
    }
    Controller.initialize = function () {
        Controller.instance = new Controller();
    };
    Controller.getInstance = function () {
        return Controller.instance;
    };
    Controller.prototype.login = function (callback) {
        this.authService.login(callback);
    };
    return Controller;
}());



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

window.onload = function () {
    var width = 640;
    var height = 480;
    var parentId = 'game';
    // Should be initialize game object and run
    var maze = new _maze__WEBPACK_IMPORTED_MODULE_0__["Game"].Maze(width, height, parentId);
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
/* harmony import */ var _state_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state/manager */ "./src/state/manager.ts");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller */ "./src/controller.ts");
/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts" />
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Game;
(function (Game) {
    var Maze = /** @class */ (function (_super) {
        __extends(Maze, _super);
        function Maze(width, height, parentId) {
            var _this = _super.call(this, width, height, Phaser.AUTO, parentId, null, false, true, null) || this;
            _this.stateManager = new _state_manager__WEBPACK_IMPORTED_MODULE_0__["State"].Manager(_this);
            _this.stateManager.init();
            _this.stateManager.startState();
            _this.loadPlugins();
            _controller__WEBPACK_IMPORTED_MODULE_1__["Controller"].initialize();
            _this.controller = _controller__WEBPACK_IMPORTED_MODULE_1__["Controller"].getInstance();
            return _this;
        }
        Maze.prototype.loadPlugins = function () {
            var __this = this;
            Phaser.Device.whenReady(function () {
                __this.plugins.add(PhaserInput.Plugin);
            });
        };
        return Maze;
    }(Phaser.Game));
    Game.Maze = Maze;
})(Game || (Game = {}));


/***/ }),

/***/ "./src/stageService.ts":
/*!*****************************!*\
  !*** ./src/stageService.ts ***!
  \*****************************/
/*! exports provided: StageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StageService", function() { return StageService; });
var Stage = /** @class */ (function () {
    function Stage(stageId, floorFilePath, wallFilePath) {
        this.stageId = stageId;
        this.floorFilePath = floorFilePath;
        this.wallFilePath = wallFilePath;
    }
    return Stage;
}());
var StageService = /** @class */ (function () {
    function StageService() {
        this.stageMap = {};
        this.generateStageMap();
    }
    StageService.getInstance = function () {
        return StageService.instance;
    };
    StageService.prototype.getStageInformation = function (userId) {
    };
    StageService.prototype.generateStageMap = function () {
        for (var i = 0; i < 3; i++) {
            var zeroFormat = '000' + i;
            var mapSeq = zeroFormat.slice(-3);
            var floorPath = 'assets/img/floor-' + mapSeq + '.png';
            var wallPath = 'assets/img/walls-' + mapSeq + '.png';
            var stage = new Stage(i, floorPath, wallPath);
            this.stageMap[i] = stage;
        }
    };
    StageService.instance = new StageService();
    return StageService;
}());

var Score = /** @class */ (function () {
    function Score(time, rank) {
        this.time = time | 0;
        this.rank = rank | Rank.NONE;
    }
    return Score;
}());
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
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Intro = /** @class */ (function (_super) {
    __extends(Intro, _super);
    function Intro() {
        return _super.call(this) || this;
    }
    Intro.prototype.preload = function () {
    };
    Intro.prototype.create = function () {
        this.stage.backgroundColor = '#4488AA';
        this.logoText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Horror Maze', {
            font: '20px Arial;',
            fill: '#000000'
        });
        this.logoText.anchor.setTo(0.5, 0.5);
        this.logoText.alpha = 0.8;
        var __this = this;
        setTimeout(function () {
            console.log(Intro.introInterval + " ellapsed");
            __this.login();
        }, Intro.introInterval);
    };
    Intro.prototype.update = function () {
    };
    Intro.prototype.login = function () {
        this.game.state.start('Login');
    };
    Intro.introInterval = 1000;
    return Intro;
}(Phaser.State));



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
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controller */ "./src/controller.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        return _super.call(this) || this;
    }
    Login.prototype.preload = function () {
    };
    Login.prototype.create = function () {
        this.stage.backgroundColor = '#FFFFFF';
        this.loginText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Login', {
            font: '20px Arial;',
            fill: '#000000'
        });
        this.loginText.anchor.setTo(0.5, 0.5);
        this.loginText.alpha = 0.8;
        this.loginText.inputEnabled = true;
        this.loginText.input.useHandCursor = true;
        this.loginText.events.onInputDown.add(function (event) {
            var _this = this;
            // const uuid = Util.getLocalStorageValue('uuid');
            _controller__WEBPACK_IMPORTED_MODULE_0__["Controller"].getInstance().login(function (result) {
                if (result) {
                    _this.game.state.start('Stage');
                }
                else {
                    _this.game.state.start('Register');
                }
            });
        }, this);
    };
    Login.prototype.update = function () {
    };
    return Login;
}(Phaser.State));



/***/ }),

/***/ "./src/state/manager.ts":
/*!******************************!*\
  !*** ./src/state/manager.ts ***!
  \******************************/
/*! exports provided: State */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "State", function() { return State; });
/* harmony import */ var _intro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./intro */ "./src/state/intro.ts");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login */ "./src/state/login.ts");
/* harmony import */ var _stage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stage */ "./src/state/stage.ts");
/* harmony import */ var _play__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./play */ "./src/state/play.ts");
/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./register */ "./src/state/register.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var State;
(function (State) {
    var Manager = /** @class */ (function (_super) {
        __extends(Manager, _super);
        function Manager(game) {
            var _this = _super.call(this, game, null) || this;
            _this.game.state = _this;
            _this.onPreloadCallback = function (e) {
                console.dir(e);
            };
            _this.game.state.onPreloadCallback = function (e) {
                console.dir(e);
                // TODO: ?????????????/ What is this?
            };
            return _this;
        }
        Manager.prototype.init = function () {
            this.add('Intro', _intro__WEBPACK_IMPORTED_MODULE_0__["Intro"], true);
            this.add('Login', _login__WEBPACK_IMPORTED_MODULE_1__["Login"], false);
            this.add('Register', _register__WEBPACK_IMPORTED_MODULE_4__["Register"], false);
            this.add('Stage', _stage__WEBPACK_IMPORTED_MODULE_2__["Stage"], false);
            this.add('Play', _play__WEBPACK_IMPORTED_MODULE_3__["Play"], false);
        };
        Manager.prototype.startState = function (state) {
            var startingState = 'Intro';
            if (state == 'undefined') {
                startingState = state;
            }
            this.start(startingState);
        };
        Manager.prototype.login = function () {
            this.start('Login');
        };
        return Manager;
    }(Phaser.StateManager));
    State.Manager = Manager;
})(State || (State = {}));


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
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Play = /** @class */ (function (_super) {
    __extends(Play, _super);
    function Play() {
        return _super.call(this) || this;
    }
    Play.prototype.preload = function () {
        this.game.load.image('wall', 'assets/img/wall-001.png');
        this.game.load.image('floor', 'assets/img/floor-001.png');
    };
    Play.prototype.create = function () {
        this.game.stage.backgroundColor = '#991235';
        var wall = this.game.add.image(0, 0, 'floor');
    };
    Play.prototype.update = function () {
    };
    return Play;
}(Phaser.State));



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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/// <reference path="../../node_modules/@orange-games/phaser-input/build/phaser-input.d.ts" />
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Register = /** @class */ (function (_super) {
    __extends(Register, _super);
    function Register() {
        return _super.call(this) || this;
    }
    Register.prototype.preload = function () {
    };
    Register.prototype.setRegisterInputText = function () {
        var textWidth = 200;
        var textHeight = 80;
        var textX = this.game.world.centerX - textWidth / 2;
        var textY = this.game.world.centerY - textHeight / 2;
        var textMaxLength = 20;
        var textStyle = {
            fill: '#000000',
            boundsAlignH: 'center',
            boundsAlignV: 'middle',
            font: '20px Arial'
        };
        this.inputText = new _component_inputText__WEBPACK_IMPORTED_MODULE_0__["Component"].InputText(this.game, textX, textY, textWidth, textHeight, textMaxLength, 'testing is good', textStyle);
    };
    Register.prototype.setRegisterButton = function () {
        var _this = this;
        var btnWidth = 200;
        var btnHeight = 80;
        var btnX = this.game.world.centerX - btnWidth / 2;
        var btnY = this.game.world.centerY - btnHeight / 2 + 100;
        var btnText = 'Register';
        this.registerBtn = this.game.add.button(btnX, btnY, btnText, function (e) {
            if (confirm(_this.inputText.text + "\uB2D8\uC73C\uB85C \uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?")) {
                _this.saveUserId();
                _this.game.state.start('Stage');
            }
        }, this);
    };
    Register.prototype.create = function () {
        this.setRegisterInputText();
        this.setRegisterButton();
    };
    Register.prototype.update = function () {
        this.inputText.render();
    };
    Register.prototype.saveUserId = function () {
        var userId = this.inputText.text;
        _util__WEBPACK_IMPORTED_MODULE_1__["Util"].setLocalStorageValue('uuid', userId);
    };
    return Register;
}(Phaser.State));



/***/ }),

/***/ "./src/state/stage.ts":
/*!****************************!*\
  !*** ./src/state/stage.ts ***!
  \****************************/
/*! exports provided: Stage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stage", function() { return Stage; });
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controller */ "./src/controller.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Stage = /** @class */ (function (_super) {
    __extends(Stage, _super);
    function Stage() {
        var _this = _super.call(this) || this;
        _this.numberOfStage = 3;
        return _this;
    }
    Stage.prototype.preload = function () {
        this.game.load.spritesheet('stageArrows', '../assets/img/stageArrows.png', 48, 48);
    };
    Stage.prototype.create = function () {
        this.game.stage.backgroundColor = '#4B4B4B';
        var userId = _controller__WEBPACK_IMPORTED_MODULE_0__["Controller"].getInstance().userId;
        this.drawStageBtn();
        this.drawStageMoveBtn();
    };
    Stage.prototype.update = function () {
    };
    Stage.prototype.drawStageBtn = function () {
        var width = 200;
        var height = 200;
        var offsetX = (this.game.world.width - 200) / 3;
        for (var i = 0; i < this.numberOfStage; i++) {
            this.game.add.button();
        }
    };
    Stage.prototype.drawStageMoveBtn = function () {
        this.lowerStageBtn = this.game.add.button(50, 420, "stageArrows", this.buttonClicked);
        this.higherStageBtn = this.game.add.button(270, 420, "stageArrows", this.buttonClicked);
        this.lowerStageBtn.frame = 0;
        this.higherStageBtn.frame = 1;
        var stageText = this.game.add.text(this.game.world.centerX, 50, 'Stage', {
            fill: '#ffffff',
            font: '20px Arial'
        });
        stageText.anchor.setTo(0.5, 0.5);
    };
    Stage.prototype.buttonClicked = function (button, pointer) {
        if (button.frame == 0) { // lowerStageBtn
        }
        else if (button.frame == 1) { // higherStageBtn
        }
    };
    return Stage;
}(Phaser.State));



/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! exports provided: Util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return Util; });
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.getCookie = function (key) {
        var name = key + '=';
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    };
    Util.setCookie = function (key, value, expiredTimeInHour) {
        var d = new Date();
        d.setTime(d.getTime() + (expiredTimeInHour * 60 * 60 * 1000));
        var expires = 'expires=' + d.toUTCString();
        document.cookie = key + '=' + value + ';' + expires + ';path=/';
    };
    Util.getLocalStorageValue = function (key) {
        return localStorage.getItem(key) || '';
    };
    Util.setLocalStorageValue = function (key, value) {
        var jsonStr;
        if (typeof value == 'string') {
            jsonStr = value;
        }
        else {
            jsonStr = JSON.stringify(value);
        }
        localStorage.setItem(key, jsonStr);
    };
    Util.generateUUID = function () {
        var s4 = function () { return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1); };
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
    return Util;
}());



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2F1dGhTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnQvaW5wdXRUZXh0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF6ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhZ2VTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zdGF0ZS9pbnRyby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUvbG9naW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL3BsYXkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL3JlZ2lzdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zdGF0ZS9zdGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ25FOEI7QUFFOUI7SUFHQztJQUVBLENB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LEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLFNBQVMsQ0FBQztJQUNqRSxDQUFDO0lBRU0seUJBQW9CLEdBQTNCLFVBQTRCLEdBQVc7UUFDdEMsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRU0seUJBQW9CLEdBQTNCLFVBQTRCLEdBQVcsRUFBRSxLQUFVO1FBQ2xELElBQUksT0FBTyxDQUFDO1FBQ1osSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQUU7WUFDN0IsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUNoQjthQUFNO1lBQ04sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7UUFFRCxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0saUJBQVksR0FBbkI7UUFDQyxJQUFJLEVBQUUsR0FBRyxjQUFNLFFBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQTdELENBQTZELENBQUM7UUFFN0UsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7SUFDdEYsQ0FBQztJQUNGLFdBQUM7QUFBRCxDQUFDIiwiZmlsZSI6Im1hemUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4vdXRpbFwiO1xuXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBpbnN0YW5jZSA9IG5ldyBBdXRoU2VydmljZSgpO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdH1cblx0XG5cdHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG5cdFx0cmV0dXJuIEF1dGhTZXJ2aWNlLmluc3RhbmNlO1xuXHR9XG5cblx0bG9naW4oY2FsbGJhY2spIHtcblx0XHRjb25zdCB1dWlkID0gVXRpbC5nZXRMb2NhbFN0b3JhZ2VWYWx1ZSgndXVpZCcpO1xuXHRcdFx0XG5cdFx0aWYgKHV1aWQpIHtcblx0XHRcdGNhbGxiYWNrKHRydWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjYWxsYmFjayhmYWxzZSk7XG5cdFx0fVxuXG5cdH1cblxuXHRsb2dvdXQoKSB7XG5cblx0fVxuXG5cdFxuXG5cbn0iLCJleHBvcnQgbmFtZXNwYWNlIENvbXBvbmVudCB7XG5cdGV4cG9ydCBjbGFzcyBJbnB1dFRleHQgZXh0ZW5kcyBQaGFzZXIuVGV4dCB7XG5cdFx0aXNGb2N1cyA9IGZhbHNlO1xuXG5cdFx0eCA6IG51bWJlcjtcblx0XHR5IDogbnVtYmVyO1xuXHRcdHdpZHRoIDogbnVtYmVyO1xuXHRcdGhlaWdodCA6IG51bWJlcjtcblxuXHRcdG1heExlbmd0aCA6IG51bWJlcjtcblxuXHRcdHBsYWNlaG9sZGVyIDogc3RyaW5nO1xuXG5cdFx0XG5cdFx0Ym9yZGVyUmVjdGFuZ2xlciA6IFBoYXNlci5SZWN0YW5nbGU7XG5cblx0XHR0ZXh0IDogc3RyaW5nO1xuXG5cdFx0cGhhc2VyVGV4dCA6IFBoYXNlci5UZXh0O1xuXG5cdFx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgd2lkdGgsIGhlaWdodCwgbWF4TGVuZ3RoLCB0ZXh0LCBzdHlsZSkge1xuXHRcdFx0c3VwZXIoZ2FtZSwgeCwgeSwgIHRleHQsIHN0eWxlKTtcblx0XHRcdHRoaXMucGxhY2Vob2xkZXIgPSAnSW5wdXQgVGV4dCc7XG5cdFx0XHRpZiAodGV4dC5sZW5ndGggPT0gMCkge1xuXHRcdFx0XHR0ZXh0ID0gdGhpcy5wbGFjZWhvbGRlcjtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy54ID0geDtcblx0XHRcdHRoaXMueSA9IHk7XG5cdFx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdFx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHRcdHRoaXMudGV4dCA9IHRleHQ7XG5cdFx0XHR0aGlzLm1heExlbmd0aCA9IG1heExlbmd0aCA/IG1heExlbmd0aCA6IDIwO1xuXG5cdFx0XHRsZXQgZ3JvdXAgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG5cdFx0XHRsZXQgZ3JhcGhpY3MgPSB0aGlzLmdhbWUubWFrZS5ncmFwaGljcygpO1xuXHRcdFx0Z3JhcGhpY3MubGluZVN0eWxlKDIsIDB4MDAwMDAwLCAxKTtcblx0XHRcdC8vIGdyYXBoaWNzLmJlZ2luRmlsbCgweEZGNzAwQiwgMSk7XG5cdFx0XHRncmFwaGljcy5kcmF3UmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcblx0XHRcdC8vIGdyYXBoaWNzLmVuZEZpbGwoKTtcblx0XHRcdGdyb3VwLmFkZChncmFwaGljcyk7XG5cblx0XHRcdHRoaXMucGhhc2VyVGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dCh4LCB5LCB0ZXh0LCBzdHlsZSk7XG5cdFx0XHR0aGlzLnBoYXNlclRleHQuc2V0VGV4dEJvdW5kcygwLCAwLCB3aWR0aCwgaGVpZ2h0KVxuXHRcdFx0dGhpcy5waGFzZXJUZXh0LmFscGhhID0gMC42O1xuXG5cdFx0XHR0aGlzLnBoYXNlclRleHQuaW5wdXRFbmFibGVkID0gdHJ1ZTtcblxuXHRcdFx0dGhpcy5waGFzZXJUZXh0LmV2ZW50cy5vbklucHV0RG93bi5hZGQoKHNwcml0ZSwgcG9pbnRlcikgPT4ge1xuXHRcdFx0XHR0aGlzLmlzRm9jdXMgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLnBoYXNlclRleHQuYWxwaGEgPSAxO1xuXHRcdFx0fSwgdGhpcyk7XG5cdFx0XHRcblx0XHRcdHRoaXMuZ2FtZS5pbnB1dC5vbkRvd24uYWRkKChzcHJpdGUsIHBvaW50ZXIpID0+IHtcblx0XHRcdFx0bGV0IHRleHRYID0gdGhpcy5waGFzZXJUZXh0LndvcmxkLng7XG5cdFx0XHRcdGxldCB0ZXh0V2lkdGggPSB0aGlzLnBoYXNlclRleHQud2lkdGg7XG5cblx0XHRcdFx0bGV0IHRleHRZID0gdGhpcy5waGFzZXJUZXh0LndvcmxkLnk7XG5cdFx0XHRcdGxldCB0ZXh0SGVpZ2h0ID0gdGhpcy5waGFzZXJUZXh0LmhlaWdodDtcblxuXHRcdFx0XHRpZiAocG9pbnRlci5jbGllbnRYID4gdGV4dFggJiYgcG9pbnRlci5jbGllbnRYIDw9IHRleHRYICsgdGV4dFdpZHRoKSB7XG5cdFx0XHRcdFx0aWYgKHBvaW50ZXIuY2xpZW50WSA+IHRleHRZICYmIHBvaW50ZXIuY2xpZW50WSA8PSB0ZXh0WSArIHRleHRIZWlnaHQpIHtcblx0XHRcdFx0XHRcdHRoaXMuaXNGb2N1cyA9IHRydWU7XG5cdFx0XHRcdFx0XHR0aGlzLnBoYXNlclRleHQuYWxwaGEgPSAxO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMucGhhc2VyVGV4dC5hbHBoYSA9IDAuNjtcblx0XHRcdFx0dGhpcy5pc0ZvY3VzID0gZmFsc2U7XG5cdFx0XHR9LCB0aGlzKTtcblxuXHRcdFx0dGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZENhbGxiYWNrcyh0aGlzLCAoZSkgPT4ge1xuXHRcdFx0XHRpZiAoIXRoaXMuaXNGb2N1cykge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0aWYgKGUua2V5Q29kZSA9PSBQaGFzZXIuS2V5Ym9hcmQuQkFDS1NQQUNFKSB7XG5cdFx0XHRcdFx0dGhpcy5waGFzZXJUZXh0LnRleHQgPSB0aGlzLnBoYXNlclRleHQudGV4dC5zbGljZSgwLCAtMSk7XG5cblx0XHRcdFx0XHRcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH0gXG5cblx0XHRcdFx0aWYgKHRoaXMucGhhc2VyVGV4dC50ZXh0Lmxlbmd0aCArIDEgPiB0aGlzLm1heExlbmd0aCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5waGFzZXJUZXh0LnRleHQgKz0gZS5rZXk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZW5kZXIoKSB7XG5cdFx0XHRcblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4vdXRpbFwiO1xuaW1wb3J0IHsgU3RhZ2VTZXJ2aWNlIH0gZnJvbSBcIi4vc3RhZ2VTZXJ2aWNlXCI7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCIuL2F1dGhTZXJ2aWNlXCI7XG5cblxuZXhwb3J0IGNsYXNzIENvbnRyb2xsZXIge1xuXHR1c2VySWQgOiBzdHJpbmc7XG5cblx0XG5cdHN0YWdlU2VydmljZSA6IFN0YWdlU2VydmljZTtcblx0YXV0aFNlcnZpY2UgOiBBdXRoU2VydmljZTtcblxuXHRwcml2YXRlIHN0YXRpYyBpbnN0YW5jZSA6IENvbnRyb2xsZXI7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy51c2VySWQgPSBVdGlsLmdldExvY2FsU3RvcmFnZVZhbHVlKCd1dWlkJyk7XG5cdFx0dGhpcy5zdGFnZVNlcnZpY2UgPSBTdGFnZVNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcblx0XHR0aGlzLmF1dGhTZXJ2aWNlID0gQXV0aFNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZSgpIHtcblx0XHRDb250cm9sbGVyLmluc3RhbmNlID0gbmV3IENvbnRyb2xsZXIoKTtcblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG5cdFx0cmV0dXJuIENvbnRyb2xsZXIuaW5zdGFuY2U7XG5cdH1cblxuXHRwdWJsaWMgbG9naW4oY2FsbGJhY2spIHtcblx0XHR0aGlzLmF1dGhTZXJ2aWNlLmxvZ2luKGNhbGxiYWNrKTtcblx0fVxufVxuIiwiLy8gaW1wb3J0ICogYXMgZyBmcm9tICcuL21hemUnXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi9tYXplJztcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgICBjb25zdCB3aWR0aCA9IDY0MDtcbiAgICBjb25zdCBoZWlnaHQgPSA0ODA7XG4gICAgY29uc3QgcGFyZW50SWQgPSAnZ2FtZSc7XG5cbiAgICAvLyBTaG91bGQgYmUgaW5pdGlhbGl6ZSBnYW1lIG9iamVjdCBhbmQgcnVuXG4gICAgY29uc3QgbWF6ZSA9IG5ldyBHYW1lLk1hemUod2lkdGgsIGhlaWdodCwgcGFyZW50SWQpO1xufTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL3BoYXNlci1jZS90eXBlc2NyaXB0L3BoYXNlci5kLnRzXCIgLz5cblxuaW1wb3J0IHsgU3RhdGUgfSBmcm9tIFwiLi9zdGF0ZS9tYW5hZ2VyXCI7XG5pbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSBcIi4vY29udHJvbGxlclwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIEdhbWUge1xuXHRleHBvcnQgY2xhc3MgTWF6ZSBleHRlbmRzIFBoYXNlci5HYW1lIHtcblx0XHRzdGF0ZU1hbmFnZXIgOiBTdGF0ZS5NYW5hZ2VyO1xuXHRcdGNvbnRyb2xsZXIgOiBDb250cm9sbGVyO1xuXG5cdFx0Y29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgcGFyZW50SWQpIHtcblx0XHRcdHN1cGVyKHdpZHRoLCBoZWlnaHQsIFBoYXNlci5BVVRPLCBwYXJlbnRJZCwgbnVsbCwgZmFsc2UsIHRydWUsIG51bGwpO1xuXG5cdFx0XHR0aGlzLnN0YXRlTWFuYWdlciA9IG5ldyBTdGF0ZS5NYW5hZ2VyKHRoaXMpO1xuXHRcdFx0dGhpcy5zdGF0ZU1hbmFnZXIuaW5pdCgpO1xuXHRcdFx0dGhpcy5zdGF0ZU1hbmFnZXIuc3RhcnRTdGF0ZSgpO1xuXG5cdFx0XHR0aGlzLmxvYWRQbHVnaW5zKCk7XG5cblx0XHRcdENvbnRyb2xsZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdFx0dGhpcy5jb250cm9sbGVyID0gQ29udHJvbGxlci5nZXRJbnN0YW5jZSgpO1xuXG5cdFx0fVxuXG5cdFx0bG9hZFBsdWdpbnMoKSB7XG5cdFx0XHRjb25zdCBfX3RoaXMgPSB0aGlzO1xuXHRcdFx0UGhhc2VyLkRldmljZS53aGVuUmVhZHkoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRfX3RoaXMucGx1Z2lucy5hZGQoUGhhc2VySW5wdXQuUGx1Z2luKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufSIsImNsYXNzIFN0YWdlIHtcblx0c3RhZ2VJZCA6IG51bWJlcjtcblx0Zmxvb3JGaWxlUGF0aCA6IHN0cmluZztcblx0d2FsbEZpbGVQYXRoIDogc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKHN0YWdlSWQ6IG51bWJlciwgZmxvb3JGaWxlUGF0aDogc3RyaW5nLCB3YWxsRmlsZVBhdGg6IHN0cmluZykge1xuXHRcdHRoaXMuc3RhZ2VJZCA9IHN0YWdlSWQ7XG5cdFx0dGhpcy5mbG9vckZpbGVQYXRoID0gZmxvb3JGaWxlUGF0aDtcblx0XHR0aGlzLndhbGxGaWxlUGF0aCA9IHdhbGxGaWxlUGF0aDtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgU3RhZ2VTZXJ2aWNlIHtcblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgaW5zdGFuY2UgPSBuZXcgU3RhZ2VTZXJ2aWNlKCk7XG5cblx0dXNlcklkIDogc3RyaW5nO1xuXG5cdHN0YWdlTWFwIDogYW55O1xuXHRcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5zdGFnZU1hcCA9IHt9O1xuXHRcdHRoaXMuZ2VuZXJhdGVTdGFnZU1hcCgpO1xuXHR9XG5cblx0cHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcblx0XHRyZXR1cm4gU3RhZ2VTZXJ2aWNlLmluc3RhbmNlO1xuXHR9XG5cblx0cHVibGljIGdldFN0YWdlSW5mb3JtYXRpb24odXNlcklkIDogc3RyaW5nKSB7XG5cblx0fVxuXG5cdHByaXZhdGUgZ2VuZXJhdGVTdGFnZU1hcCgpIHtcblx0XHRmb3IgKGxldCBpPTA7IGk8MzsgaSsrKSB7XG5cdFx0XHRsZXQgemVyb0Zvcm1hdCA9ICcwMDAnICsgaTtcblx0XHRcdGxldCBtYXBTZXEgPSB6ZXJvRm9ybWF0LnNsaWNlKC0zKTtcblxuXHRcdFx0Y29uc3QgZmxvb3JQYXRoID0gJ2Fzc2V0cy9pbWcvZmxvb3ItJyArIG1hcFNlcSArICcucG5nJztcblx0XHRcdGNvbnN0IHdhbGxQYXRoID0gJ2Fzc2V0cy9pbWcvd2FsbHMtJyArIG1hcFNlcSArICcucG5nJztcblxuXHRcdFx0Y29uc3Qgc3RhZ2UgPSBuZXcgU3RhZ2UoaSwgZmxvb3JQYXRoLCB3YWxsUGF0aCk7XG5cdFx0XHR0aGlzLnN0YWdlTWFwW2ldID0gc3RhZ2U7XG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIFNjb3JlIHtcblx0dGltZSA6IG51bWJlcjtcblx0cmFuayA6IFJhbms7XG5cdFxuXHRjb25zdHJ1Y3Rvcih0aW1lOiBudW1iZXIsIHJhbms6IFJhbmspIHtcblx0XHR0aGlzLnRpbWUgPSB0aW1lIHwgMDtcblx0XHR0aGlzLnJhbmsgPSByYW5rIHwgUmFuay5OT05FO1xuXHR9XG59XG5cbmVudW0gUmFuayB7XG5cdE5PTkUgPSAwLFxuXHRTID0gMSxcblx0QSA9IDIsXG5cdEIgPSAzLFxuXHRDID0gNCxcblx0RCA9IDUsXG5cdEUgPSA2LFxuXHRGID0gN1xufVxuXG5cbiIsImV4cG9ydCBjbGFzcyBJbnRybyBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XG5cdHN0YXRpYyBpbnRyb0ludGVydmFsID0gMTAwMDtcblxuXHRsb2dvVGV4dCA6IFBoYXNlci5UZXh0O1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRwcmVsb2FkKCkge1xuXHRcdFxuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyM0NDg4QUEnO1xuXG5cdFx0dGhpcy5sb2dvVGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dChcblx0XHRcdHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCBcblx0XHRcdHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZLCBcblx0XHRcdCdIb3Jyb3IgTWF6ZScsXG5cdFx0XHR7XG5cdFx0XHRcdGZvbnQ6ICcyMHB4IEFyaWFsOycsXG5cdFx0XHRcdGZpbGw6ICcjMDAwMDAwJ1xuXHRcdFx0fVxuXHRcdCk7XG5cdFx0dGhpcy5sb2dvVGV4dC5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xuXHRcdHRoaXMubG9nb1RleHQuYWxwaGEgPSAwLjg7XG5cdFx0XG5cdFx0Y29uc3QgX190aGlzID0gdGhpcztcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29uc29sZS5sb2coYCR7SW50cm8uaW50cm9JbnRlcnZhbH0gZWxsYXBzZWRgKTtcblx0XHRcdF9fdGhpcy5sb2dpbigpO1xuXHRcdH0sIEludHJvLmludHJvSW50ZXJ2YWwpXG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cblx0fVxuXG5cdGxvZ2luKCkge1xuXHRcdHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnTG9naW4nKTtcblx0fVxufSIsImltcG9ydCB7IFV0aWwgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tICcuLi9jb250cm9sbGVyJztcblxuZXhwb3J0IGNsYXNzIExvZ2luIGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcblx0bG9naW5UZXh0IDogUGhhc2VyLlRleHQ7XG5cblx0Z3Vlc3RVVUlEIDogc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRwcmVsb2FkKCkge1xuXHRcdFxuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyNGRkZGRkYnO1xuXG5cdFx0dGhpcy5sb2dpblRleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQoXG5cdFx0XHR0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgXG5cdFx0XHR0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgXG5cdFx0XHQnTG9naW4nLFxuXHRcdFx0e1xuXHRcdFx0XHRmb250OiAnMjBweCBBcmlhbDsnLFxuXHRcdFx0XHRmaWxsOiAnIzAwMDAwMCdcblx0XHRcdH1cblx0XHQpO1xuXHRcdHRoaXMubG9naW5UZXh0LmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XG5cdFx0dGhpcy5sb2dpblRleHQuYWxwaGEgPSAwLjg7XG5cblx0XHR0aGlzLmxvZ2luVGV4dC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xuXHRcdHRoaXMubG9naW5UZXh0LmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xuXHRcdHRoaXMubG9naW5UZXh0LmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdC8vIGNvbnN0IHV1aWQgPSBVdGlsLmdldExvY2FsU3RvcmFnZVZhbHVlKCd1dWlkJyk7XG5cdFx0XHRDb250cm9sbGVyLmdldEluc3RhbmNlKCkubG9naW4oKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRpZiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0dGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdTdGFnZScpO1x0XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdSZWdpc3RlcicpO1x0XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sIHRoaXMpO1xuXHRcdFxuXHR9XG5cblx0dXBkYXRlKCkge1xuXG5cdH1cbn0iLCJpbXBvcnQgeyBJbnRybyB9IGZyb20gJy4vaW50cm8nO1xuaW1wb3J0IHsgTG9naW4gfSBmcm9tICcuL2xvZ2luJztcbmltcG9ydCB7IFN0YWdlIH0gZnJvbSAnLi9zdGFnZSc7XG5pbXBvcnQgeyBQbGF5IH0gZnJvbSAnLi9wbGF5JztcbmltcG9ydCB7IFJlZ2lzdGVyIH0gZnJvbSAnLi9yZWdpc3Rlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3RhdGUge1xuXHRleHBvcnQgY2xhc3MgTWFuYWdlciBleHRlbmRzIFBoYXNlci5TdGF0ZU1hbmFnZXIge1xuXHRcdFxuXHRcdGNvbnN0cnVjdG9yKGdhbWUpIHtcblx0XHRcdHN1cGVyKGdhbWUsIG51bGwpO1xuXHRcdFx0dGhpcy5nYW1lLnN0YXRlID0gdGhpcztcblx0XHRcdHRoaXMub25QcmVsb2FkQ2FsbGJhY2sgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGNvbnNvbGUuZGlyKGUpO1xuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5nYW1lLnN0YXRlLm9uUHJlbG9hZENhbGxiYWNrID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRjb25zb2xlLmRpcihlKTtcblx0XHRcdFx0Ly8gVE9ETzogPz8/Pz8/Pz8/Pz8/Py8gV2hhdCBpcyB0aGlzP1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpbml0KCkge1xuXHRcdFx0dGhpcy5hZGQoJ0ludHJvJywgSW50cm8sIHRydWUpO1xuXHRcdFx0dGhpcy5hZGQoJ0xvZ2luJywgTG9naW4sIGZhbHNlKTtcblx0XHRcdHRoaXMuYWRkKCdSZWdpc3RlcicsIFJlZ2lzdGVyLCBmYWxzZSk7XG5cdFx0XHR0aGlzLmFkZCgnU3RhZ2UnLCBTdGFnZSwgZmFsc2UpO1xuXHRcdFx0dGhpcy5hZGQoJ1BsYXknLCBQbGF5LCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0c3RhcnRTdGF0ZShzdGF0ZT8gOiBzdHJpbmcpIHtcblx0XHRcdGxldCBzdGFydGluZ1N0YXRlID0gJ0ludHJvJztcblx0XHRcdGlmIChzdGF0ZSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRzdGFydGluZ1N0YXRlID0gc3RhdGU7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnN0YXJ0KHN0YXJ0aW5nU3RhdGUpO1xuXHRcdH1cblxuXHRcdHB1YmxpYyBsb2dpbigpIHtcblx0XHRcdHRoaXMuc3RhcnQoJ0xvZ2luJyk7XG5cdFx0fVxuXHR9XG59IiwiZXhwb3J0IGNsYXNzIFBsYXkgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0cHJlbG9hZCgpIHtcblx0XHR0aGlzLmdhbWUubG9hZC5pbWFnZSgnd2FsbCcsICdhc3NldHMvaW1nL3dhbGwtMDAxLnBuZycpO1xuXHRcdHRoaXMuZ2FtZS5sb2FkLmltYWdlKCdmbG9vcicsICdhc3NldHMvaW1nL2Zsb29yLTAwMS5wbmcnKTtcblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHR0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyM5OTEyMzUnO1xuXG5cdFx0Y29uc3Qgd2FsbCA9IHRoaXMuZ2FtZS5hZGQuaW1hZ2UoMCwgMCwgJ2Zsb29yJyk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cblx0fVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvQG9yYW5nZS1nYW1lcy9waGFzZXItaW5wdXQvYnVpbGQvcGhhc2VyLWlucHV0LmQudHNcIiAvPlxuXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnQvaW5wdXRUZXh0JzsgXG5pbXBvcnQgeyBVdGlsIH0gZnJvbSAnLi4vdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBSZWdpc3RlciBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XG5cdGlucHV0VGV4dCA6IENvbXBvbmVudC5JbnB1dFRleHQ7XG5cdHJlZ2lzdGVyQnRuIDogUGhhc2VyLkJ1dHRvbjtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0cHJlbG9hZCgpIHtcblx0XHRcblx0fVxuXG5cdHByaXZhdGUgc2V0UmVnaXN0ZXJJbnB1dFRleHQoKSB7XG5cdFx0bGV0IHRleHRXaWR0aCA9IDIwMDtcblx0XHRsZXQgdGV4dEhlaWdodCA9IDgwO1xuXHRcdGxldCB0ZXh0WCA9IHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYIC0gdGV4dFdpZHRoLzI7XG5cdFx0bGV0IHRleHRZID0gdGhpcy5nYW1lLndvcmxkLmNlbnRlclkgLSB0ZXh0SGVpZ2h0LzI7XG5cblx0XHRsZXQgdGV4dE1heExlbmd0aCA9IDIwO1xuXG5cdFx0bGV0IHRleHRTdHlsZSA9IHtcblx0XHRcdGZpbGw6ICcjMDAwMDAwJyxcblx0XHRcdGJvdW5kc0FsaWduSDogJ2NlbnRlcicsXG5cdFx0XHRib3VuZHNBbGlnblY6ICdtaWRkbGUnLFxuXHRcdFx0Zm9udDogJzIwcHggQXJpYWwnXG5cdFx0fVxuXG5cdFx0dGhpcy5pbnB1dFRleHQgPSBuZXcgQ29tcG9uZW50LklucHV0VGV4dCh0aGlzLmdhbWUsIHRleHRYLCB0ZXh0WSwgdGV4dFdpZHRoLCB0ZXh0SGVpZ2h0LCB0ZXh0TWF4TGVuZ3RoLCAndGVzdGluZyBpcyBnb29kJywgdGV4dFN0eWxlKTtcblx0fVxuXG5cdHByaXZhdGUgc2V0UmVnaXN0ZXJCdXR0b24oKSB7XG5cdFx0bGV0IGJ0bldpZHRoID0gMjAwO1xuXHRcdGxldCBidG5IZWlnaHQgPSA4MDtcblx0XHRcblx0XHRsZXQgYnRuWCA9IHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYIC0gYnRuV2lkdGgvMjtcblx0XHRsZXQgYnRuWSA9IHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZIC0gYnRuSGVpZ2h0LzIgKyAxMDA7XG5cblx0XHRsZXQgYnRuVGV4dCA9ICdSZWdpc3Rlcic7XG5cdFx0dGhpcy5yZWdpc3RlckJ0biA9IHRoaXMuZ2FtZS5hZGQuYnV0dG9uKGJ0blgsIGJ0blksIGJ0blRleHQsIChlKSA9PiB7XG5cdFx0XHRpZiAoY29uZmlybShgJHt0aGlzLmlucHV0VGV4dC50ZXh0feuLmOycvOuhnCDtlZjsi5zqsqDsirXri4jquYw/YCkpIHtcblx0XHRcdFx0dGhpcy5zYXZlVXNlcklkKCk7XG5cdFx0XHRcdHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnU3RhZ2UnKTtcblx0XHRcdH1cblx0XHR9LCB0aGlzKTtcblx0fVxuXG5cdGNyZWF0ZSgpIHtcblxuXHRcdHRoaXMuc2V0UmVnaXN0ZXJJbnB1dFRleHQoKTtcblx0XHR0aGlzLnNldFJlZ2lzdGVyQnV0dG9uKCk7XG5cdFx0XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cdFx0dGhpcy5pbnB1dFRleHQucmVuZGVyKCk7XG5cdH1cblxuXHRzYXZlVXNlcklkKCkge1xuXHRcdGxldCB1c2VySWQgPSB0aGlzLmlucHV0VGV4dC50ZXh0O1xuXHRcdFV0aWwuc2V0TG9jYWxTdG9yYWdlVmFsdWUoJ3V1aWQnLCB1c2VySWQpO1xuXHR9XG59IiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gXCIuLi9jb250cm9sbGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBTdGFnZSBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XG5cdHJlYWRvbmx5IG51bWJlck9mU3RhZ2UgPSAzO1xuXG5cdGxvd2VyU3RhZ2VCdG4gOiBQaGFzZXIuQnV0dG9uO1xuXHRoaWdoZXJTdGFnZUJ0biA6IFBoYXNlci5CdXR0b247XG5cblxuXHRzdGFnZUdyb3VwIDogUGhhc2VyLkdyb3VwO1xuXHRjdXJyZW50U3RhZ2U6IG51bWJlcjtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0cHJlbG9hZCgpIHtcblx0XHR0aGlzLmdhbWUubG9hZC5zcHJpdGVzaGVldCgnc3RhZ2VBcnJvd3MnLCAnLi4vYXNzZXRzL2ltZy9zdGFnZUFycm93cy5wbmcnLCA0OCwgNDgpO1xuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzRCNEI0Qic7XG5cdFx0Y29uc3QgdXNlcklkID0gQ29udHJvbGxlci5nZXRJbnN0YW5jZSgpLnVzZXJJZDtcblxuXHRcdHRoaXMuZHJhd1N0YWdlQnRuKCk7XG5cdFx0dGhpcy5kcmF3U3RhZ2VNb3ZlQnRuKCk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cblx0fVxuXG5cdHByaXZhdGUgZHJhd1N0YWdlQnRuKCkge1xuXHRcdGNvbnN0IHdpZHRoID0gMjAwO1xuXHRcdGNvbnN0IGhlaWdodCA9IDIwMDtcblxuXHRcdGxldCBvZmZzZXRYID0gKHRoaXMuZ2FtZS53b3JsZC53aWR0aCAtIDIwMCkgLyAzXG5cblx0XHRmb3IgKGxldCBpPTA7IGk8dGhpcy5udW1iZXJPZlN0YWdlOyBpKyspIHtcblx0XHRcdHRoaXMuZ2FtZS5hZGQuYnV0dG9uKClcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGRyYXdTdGFnZU1vdmVCdG4oKSB7XG5cdFx0dGhpcy5sb3dlclN0YWdlQnRuID0gdGhpcy5nYW1lLmFkZC5idXR0b24oNTAsIDQyMCwgXCJzdGFnZUFycm93c1wiLCB0aGlzLmJ1dHRvbkNsaWNrZWQpO1xuXHRcdHRoaXMuaGlnaGVyU3RhZ2VCdG4gPSB0aGlzLmdhbWUuYWRkLmJ1dHRvbigyNzAsIDQyMCwgXCJzdGFnZUFycm93c1wiLCB0aGlzLmJ1dHRvbkNsaWNrZWQpO1xuXG5cdFx0dGhpcy5sb3dlclN0YWdlQnRuLmZyYW1lID0gMDtcblx0XHR0aGlzLmhpZ2hlclN0YWdlQnRuLmZyYW1lID0gMTtcblxuXHRcdGNvbnN0IHN0YWdlVGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dCh0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgNTAsICdTdGFnZScsIHtcblx0XHRcdGZpbGw6ICcjZmZmZmZmJyxcblx0XHRcdGZvbnQ6ICcyMHB4IEFyaWFsJ1xuXHRcdH0pO1xuXG5cdFx0c3RhZ2VUZXh0LmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XG5cdH1cblxuXHRwcml2YXRlIGJ1dHRvbkNsaWNrZWQoYnV0dG9uLCBwb2ludGVyKSB7XG5cdFx0aWYgKGJ1dHRvbi5mcmFtZSA9PSAwKSB7IC8vIGxvd2VyU3RhZ2VCdG5cblxuXHRcdH0gZWxzZSBpZiAoYnV0dG9uLmZyYW1lID09IDEpIHsgLy8gaGlnaGVyU3RhZ2VCdG5cblxuXHRcdH1cblx0fVxufVxuIiwiZXhwb3J0IGNsYXNzIFV0aWwge1xuXHRzdGF0aWMgZ2V0Q29va2llKGtleTogc3RyaW5nKSA6IHN0cmluZyB7XG5cdFx0Y29uc3QgbmFtZSA9IGtleSArICc9Jztcblx0XHR2YXIgZGVjb2RlZENvb2tpZSA9IGRlY29kZVVSSUNvbXBvbmVudChkb2N1bWVudC5jb29raWUpO1xuXHRcdHZhciBjYSA9IGRlY29kZWRDb29raWUuc3BsaXQoJzsnKTtcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgY2EubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBjID0gY2FbaV07XG5cdFx0XHR3aGlsZSAoYy5jaGFyQXQoMCkgPT0gJyAnKSB7XG5cdFx0XHRcdGMgPSBjLnN1YnN0cmluZygxKTtcblx0XHRcdH1cblx0XHRcdGlmIChjLmluZGV4T2YobmFtZSkgPT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gYy5zdWJzdHJpbmcobmFtZS5sZW5ndGgsIGMubGVuZ3RoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0c3RhdGljIHNldENvb2tpZShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZXhwaXJlZFRpbWVJbkhvdXI6IG51bWJlcikge1xuXHRcdGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuXHRcdGQuc2V0VGltZShkLmdldFRpbWUoKSArIChleHBpcmVkVGltZUluSG91cio2MCo2MCoxMDAwKSk7XG5cdFx0XG5cdFx0Y29uc3QgZXhwaXJlcyA9ICdleHBpcmVzPScgKyBkLnRvVVRDU3RyaW5nKCk7XG5cdFx0ZG9jdW1lbnQuY29va2llID0ga2V5ICsgJz0nICsgdmFsdWUgKyAnOycgKyBleHBpcmVzICsgJztwYXRoPS8nO1xuXHR9XG5cblx0c3RhdGljIGdldExvY2FsU3RvcmFnZVZhbHVlKGtleTogc3RyaW5nKSA6IHN0cmluZyB7XG5cdFx0cmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkgfHwgJyc7XG5cdH1cblxuXHRzdGF0aWMgc2V0TG9jYWxTdG9yYWdlVmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcblx0XHRsZXQganNvblN0cjtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG5cdFx0XHRqc29uU3RyID0gdmFsdWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGpzb25TdHIgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG5cdFx0fVxuXHRcdFxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwganNvblN0cik7XG5cdH1cblxuXHRzdGF0aWMgZ2VuZXJhdGVVVUlEKCkgOiBzdHJpbmcge1xuXHRcdGxldCBzNCA9ICgpID0+ICgoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCB8IDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSk7XG5cdFx0XG5cdFx0cmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xuXHR9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9