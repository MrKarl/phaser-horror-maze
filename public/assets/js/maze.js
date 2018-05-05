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

var Controller = /** @class */ (function () {
    function Controller() {
        this.userId = _util__WEBPACK_IMPORTED_MODULE_0__["Util"].getLocalStorageValue('uuid');
    }
    Controller.initialize = function () {
        Controller.instance = new Controller();
    };
    Controller.getInstance = function () {
        return Controller.instance;
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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util.ts");
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
            var uuid = _util__WEBPACK_IMPORTED_MODULE_0__["Util"].getLocalStorageValue('uuid');
            if (uuid) {
                this.game.state.start('Stage');
            }
            else {
                this.game.state.start('Register');
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC9pbnB1dFRleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tYXplLnRzIiwid2VicGFjazovLy8uL3NyYy9zdGF0ZS9pbnRyby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUvbG9naW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL3BsYXkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL3JlZ2lzdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zdGF0ZS9zdGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25FTSxJQUFXLFNBQVMsQ0FnR3pCO0FBaEdELFdBQWlCLFNBQVM7SUFDekI7UUFBK0IsNkJBQVc7UUFtQnpDLG1CQUFZLElBQUksRUFBRSxDQUFD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Q3RDLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVNLHlCQUFvQixHQUEzQixVQUE0QixHQUFXLEVBQUUsS0FBVTtRQUNsRCxJQUFJLE9BQU8sQ0FBQztRQUNaLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxFQUFFO1lBQzdCLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDaEI7YUFBTTtZQUNOLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO1FBRUQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVNLGlCQUFZLEdBQW5CO1FBQ0MsSUFBSSxFQUFFLEdBQUcsY0FBTSxRQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUE3RCxDQUE2RCxDQUFDO1FBRTdFLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO0lBQ3RGLENBQUM7SUFDRixXQUFDO0FBQUQsQ0FBQyIsImZpbGUiOiJtYXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0IG5hbWVzcGFjZSBDb21wb25lbnQge1xuXHRleHBvcnQgY2xhc3MgSW5wdXRUZXh0IGV4dGVuZHMgUGhhc2VyLlRleHQge1xuXHRcdGlzRm9jdXMgPSBmYWxzZTtcblxuXHRcdHggOiBudW1iZXI7XG5cdFx0eSA6IG51bWJlcjtcblx0XHR3aWR0aCA6IG51bWJlcjtcblx0XHRoZWlnaHQgOiBudW1iZXI7XG5cblx0XHRtYXhMZW5ndGggOiBudW1iZXI7XG5cblx0XHRwbGFjZWhvbGRlciA6IHN0cmluZztcblxuXHRcdFxuXHRcdGJvcmRlclJlY3RhbmdsZXIgOiBQaGFzZXIuUmVjdGFuZ2xlO1xuXG5cdFx0dGV4dCA6IHN0cmluZztcblxuXHRcdHBoYXNlclRleHQgOiBQaGFzZXIuVGV4dDtcblxuXHRcdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHdpZHRoLCBoZWlnaHQsIG1heExlbmd0aCwgdGV4dCwgc3R5bGUpIHtcblx0XHRcdHN1cGVyKGdhbWUsIHgsIHksICB0ZXh0LCBzdHlsZSk7XG5cdFx0XHR0aGlzLnBsYWNlaG9sZGVyID0gJ0lucHV0IFRleHQnO1xuXHRcdFx0aWYgKHRleHQubGVuZ3RoID09IDApIHtcblx0XHRcdFx0dGV4dCA9IHRoaXMucGxhY2Vob2xkZXI7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMueCA9IHg7XG5cdFx0XHR0aGlzLnkgPSB5O1xuXHRcdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHRcdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0XHR0aGlzLnRleHQgPSB0ZXh0O1xuXHRcdFx0dGhpcy5tYXhMZW5ndGggPSBtYXhMZW5ndGggPyBtYXhMZW5ndGggOiAyMDtcblxuXHRcdFx0bGV0IGdyb3VwID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuXHRcdFx0bGV0IGdyYXBoaWNzID0gdGhpcy5nYW1lLm1ha2UuZ3JhcGhpY3MoKTtcblx0XHRcdGdyYXBoaWNzLmxpbmVTdHlsZSgyLCAweDAwMDAwMCwgMSk7XG5cdFx0XHQvLyBncmFwaGljcy5iZWdpbkZpbGwoMHhGRjcwMEIsIDEpO1xuXHRcdFx0Z3JhcGhpY3MuZHJhd1JlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG5cdFx0XHQvLyBncmFwaGljcy5lbmRGaWxsKCk7XG5cdFx0XHRncm91cC5hZGQoZ3JhcGhpY3MpO1xuXG5cdFx0XHR0aGlzLnBoYXNlclRleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQoeCwgeSwgdGV4dCwgc3R5bGUpO1xuXHRcdFx0dGhpcy5waGFzZXJUZXh0LnNldFRleHRCb3VuZHMoMCwgMCwgd2lkdGgsIGhlaWdodClcblx0XHRcdHRoaXMucGhhc2VyVGV4dC5hbHBoYSA9IDAuNjtcblxuXHRcdFx0dGhpcy5waGFzZXJUZXh0LmlucHV0RW5hYmxlZCA9IHRydWU7XG5cblx0XHRcdHRoaXMucGhhc2VyVGV4dC5ldmVudHMub25JbnB1dERvd24uYWRkKChzcHJpdGUsIHBvaW50ZXIpID0+IHtcblx0XHRcdFx0dGhpcy5pc0ZvY3VzID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5waGFzZXJUZXh0LmFscGhhID0gMTtcblx0XHRcdH0sIHRoaXMpO1xuXHRcdFx0XG5cdFx0XHR0aGlzLmdhbWUuaW5wdXQub25Eb3duLmFkZCgoc3ByaXRlLCBwb2ludGVyKSA9PiB7XG5cdFx0XHRcdGxldCB0ZXh0WCA9IHRoaXMucGhhc2VyVGV4dC53b3JsZC54O1xuXHRcdFx0XHRsZXQgdGV4dFdpZHRoID0gdGhpcy5waGFzZXJUZXh0LndpZHRoO1xuXG5cdFx0XHRcdGxldCB0ZXh0WSA9IHRoaXMucGhhc2VyVGV4dC53b3JsZC55O1xuXHRcdFx0XHRsZXQgdGV4dEhlaWdodCA9IHRoaXMucGhhc2VyVGV4dC5oZWlnaHQ7XG5cblx0XHRcdFx0aWYgKHBvaW50ZXIuY2xpZW50WCA+IHRleHRYICYmIHBvaW50ZXIuY2xpZW50WCA8PSB0ZXh0WCArIHRleHRXaWR0aCkge1xuXHRcdFx0XHRcdGlmIChwb2ludGVyLmNsaWVudFkgPiB0ZXh0WSAmJiBwb2ludGVyLmNsaWVudFkgPD0gdGV4dFkgKyB0ZXh0SGVpZ2h0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmlzRm9jdXMgPSB0cnVlO1xuXHRcdFx0XHRcdFx0dGhpcy5waGFzZXJUZXh0LmFscGhhID0gMTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnBoYXNlclRleHQuYWxwaGEgPSAwLjY7XG5cdFx0XHRcdHRoaXMuaXNGb2N1cyA9IGZhbHNlO1xuXHRcdFx0fSwgdGhpcyk7XG5cblx0XHRcdHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRDYWxsYmFja3ModGhpcywgKGUpID0+IHtcblx0XHRcdFx0aWYgKCF0aGlzLmlzRm9jdXMpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGlmIChlLmtleUNvZGUgPT0gUGhhc2VyLktleWJvYXJkLkJBQ0tTUEFDRSkge1xuXHRcdFx0XHRcdHRoaXMucGhhc2VyVGV4dC50ZXh0ID0gdGhpcy5waGFzZXJUZXh0LnRleHQuc2xpY2UoMCwgLTEpO1xuXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9IFxuXG5cdFx0XHRcdGlmICh0aGlzLnBoYXNlclRleHQudGV4dC5sZW5ndGggKyAxID4gdGhpcy5tYXhMZW5ndGgpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucGhhc2VyVGV4dC50ZXh0ICs9IGUua2V5O1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmVuZGVyKCkge1xuXHRcdFx0XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuL3V0aWxcIjtcblxuXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlciB7XG5cdHVzZXJJZCA6IHN0cmluZztcblxuXHRwcml2YXRlIHN0YXRpYyBpbnN0YW5jZSA6IENvbnRyb2xsZXI7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy51c2VySWQgPSBVdGlsLmdldExvY2FsU3RvcmFnZVZhbHVlKCd1dWlkJyk7XG5cdH1cblxuXHRzdGF0aWMgaW5pdGlhbGl6ZSgpIHtcblx0XHRDb250cm9sbGVyLmluc3RhbmNlID0gbmV3IENvbnRyb2xsZXIoKTtcblx0fVxuXG5cdHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcblx0XHRyZXR1cm4gQ29udHJvbGxlci5pbnN0YW5jZTtcblx0fVxufVxuIiwiLy8gaW1wb3J0ICogYXMgZyBmcm9tICcuL21hemUnXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi9tYXplJztcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgICBjb25zdCB3aWR0aCA9IDY0MDtcbiAgICBjb25zdCBoZWlnaHQgPSA0ODA7XG4gICAgY29uc3QgcGFyZW50SWQgPSAnZ2FtZSc7XG5cbiAgICAvLyBTaG91bGQgYmUgaW5pdGlhbGl6ZSBnYW1lIG9iamVjdCBhbmQgcnVuXG4gICAgY29uc3QgbWF6ZSA9IG5ldyBHYW1lLk1hemUod2lkdGgsIGhlaWdodCwgcGFyZW50SWQpO1xufTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL3BoYXNlci1jZS90eXBlc2NyaXB0L3BoYXNlci5kLnRzXCIgLz5cblxuaW1wb3J0IHsgU3RhdGUgfSBmcm9tIFwiLi9zdGF0ZS9tYW5hZ2VyXCI7XG5pbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSBcIi4vY29udHJvbGxlclwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIEdhbWUge1xuXHRleHBvcnQgY2xhc3MgTWF6ZSBleHRlbmRzIFBoYXNlci5HYW1lIHtcblx0XHRzdGF0ZU1hbmFnZXIgOiBTdGF0ZS5NYW5hZ2VyO1xuXHRcdGNvbnRyb2xsZXIgOiBDb250cm9sbGVyO1xuXG5cdFx0Y29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgcGFyZW50SWQpIHtcblx0XHRcdHN1cGVyKHdpZHRoLCBoZWlnaHQsIFBoYXNlci5BVVRPLCBwYXJlbnRJZCwgbnVsbCwgZmFsc2UsIHRydWUsIG51bGwpO1xuXG5cdFx0XHR0aGlzLnN0YXRlTWFuYWdlciA9IG5ldyBTdGF0ZS5NYW5hZ2VyKHRoaXMpO1xuXHRcdFx0dGhpcy5zdGF0ZU1hbmFnZXIuaW5pdCgpO1xuXHRcdFx0dGhpcy5zdGF0ZU1hbmFnZXIuc3RhcnRTdGF0ZSgpO1xuXG5cdFx0XHR0aGlzLmxvYWRQbHVnaW5zKCk7XG5cblx0XHRcdENvbnRyb2xsZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdFx0dGhpcy5jb250cm9sbGVyID0gQ29udHJvbGxlci5nZXRJbnN0YW5jZSgpO1xuXG5cdFx0fVxuXG5cdFx0bG9hZFBsdWdpbnMoKSB7XG5cdFx0XHRjb25zdCBfX3RoaXMgPSB0aGlzO1xuXHRcdFx0UGhhc2VyLkRldmljZS53aGVuUmVhZHkoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRfX3RoaXMucGx1Z2lucy5hZGQoUGhhc2VySW5wdXQuUGx1Z2luKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufSIsImV4cG9ydCBjbGFzcyBJbnRybyBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XG5cdHN0YXRpYyBpbnRyb0ludGVydmFsID0gMTAwMDtcblxuXHRsb2dvVGV4dCA6IFBoYXNlci5UZXh0O1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRwcmVsb2FkKCkge1xuXHRcdFxuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyM0NDg4QUEnO1xuXG5cdFx0dGhpcy5sb2dvVGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dChcblx0XHRcdHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCBcblx0XHRcdHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZLCBcblx0XHRcdCdIb3Jyb3IgTWF6ZScsXG5cdFx0XHR7XG5cdFx0XHRcdGZvbnQ6ICcyMHB4IEFyaWFsOycsXG5cdFx0XHRcdGZpbGw6ICcjMDAwMDAwJ1xuXHRcdFx0fVxuXHRcdCk7XG5cdFx0dGhpcy5sb2dvVGV4dC5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xuXHRcdHRoaXMubG9nb1RleHQuYWxwaGEgPSAwLjg7XG5cdFx0XG5cdFx0Y29uc3QgX190aGlzID0gdGhpcztcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29uc29sZS5sb2coYCR7SW50cm8uaW50cm9JbnRlcnZhbH0gZWxsYXBzZWRgKTtcblx0XHRcdF9fdGhpcy5sb2dpbigpO1xuXHRcdH0sIEludHJvLmludHJvSW50ZXJ2YWwpXG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cblx0fVxuXG5cdGxvZ2luKCkge1xuXHRcdHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnTG9naW4nKTtcblx0fVxufSIsImltcG9ydCB7IFV0aWwgfSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IGNsYXNzIExvZ2luIGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcblx0bG9naW5UZXh0IDogUGhhc2VyLlRleHQ7XG5cblx0Z3Vlc3RVVUlEIDogc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRwcmVsb2FkKCkge1xuXHRcdFxuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyNGRkZGRkYnO1xuXG5cdFx0dGhpcy5sb2dpblRleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQoXG5cdFx0XHR0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgXG5cdFx0XHR0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgXG5cdFx0XHQnTG9naW4nLFxuXHRcdFx0e1xuXHRcdFx0XHRmb250OiAnMjBweCBBcmlhbDsnLFxuXHRcdFx0XHRmaWxsOiAnIzAwMDAwMCdcblx0XHRcdH1cblx0XHQpO1xuXHRcdHRoaXMubG9naW5UZXh0LmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XG5cdFx0dGhpcy5sb2dpblRleHQuYWxwaGEgPSAwLjg7XG5cblx0XHR0aGlzLmxvZ2luVGV4dC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xuXHRcdHRoaXMubG9naW5UZXh0LmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xuXHRcdHRoaXMubG9naW5UZXh0LmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdGNvbnN0IHV1aWQgPSBVdGlsLmdldExvY2FsU3RvcmFnZVZhbHVlKCd1dWlkJyk7XG5cdFx0XHRcblx0XHRcdGlmICh1dWlkKSB7XG5cdFx0XHRcdHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnU3RhZ2UnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnUmVnaXN0ZXInKTtcblx0XHRcdH1cblx0XHR9LCB0aGlzKTtcblx0XHRcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblxuXHR9XG59IiwiaW1wb3J0IHsgSW50cm8gfSBmcm9tICcuL2ludHJvJztcbmltcG9ydCB7IExvZ2luIH0gZnJvbSAnLi9sb2dpbic7XG5pbXBvcnQgeyBTdGFnZSB9IGZyb20gJy4vc3RhZ2UnO1xuaW1wb3J0IHsgUGxheSB9IGZyb20gJy4vcGxheSc7XG5pbXBvcnQgeyBSZWdpc3RlciB9IGZyb20gJy4vcmVnaXN0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFN0YXRlIHtcblx0ZXhwb3J0IGNsYXNzIE1hbmFnZXIgZXh0ZW5kcyBQaGFzZXIuU3RhdGVNYW5hZ2VyIHtcblx0XHRcblx0XHRjb25zdHJ1Y3RvcihnYW1lKSB7XG5cdFx0XHRzdXBlcihnYW1lLCBudWxsKTtcblx0XHRcdHRoaXMuZ2FtZS5zdGF0ZSA9IHRoaXM7XG5cdFx0XHR0aGlzLm9uUHJlbG9hZENhbGxiYWNrID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRjb25zb2xlLmRpcihlKTtcblx0XHRcdH07XG5cblx0XHRcdHRoaXMuZ2FtZS5zdGF0ZS5vblByZWxvYWRDYWxsYmFjayA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0Y29uc29sZS5kaXIoZSk7XG5cdFx0XHRcdC8vIFRPRE86ID8/Pz8/Pz8/Pz8/Pz8vIFdoYXQgaXMgdGhpcz9cblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdHRoaXMuYWRkKCdJbnRybycsIEludHJvLCB0cnVlKTtcblx0XHRcdHRoaXMuYWRkKCdMb2dpbicsIExvZ2luLCBmYWxzZSk7XG5cdFx0XHR0aGlzLmFkZCgnUmVnaXN0ZXInLCBSZWdpc3RlciwgZmFsc2UpO1xuXHRcdFx0dGhpcy5hZGQoJ1N0YWdlJywgU3RhZ2UsIGZhbHNlKTtcblx0XHRcdHRoaXMuYWRkKCdQbGF5JywgUGxheSwgZmFsc2UpO1xuXHRcdH1cblxuXHRcdHN0YXJ0U3RhdGUoc3RhdGU/IDogc3RyaW5nKSB7XG5cdFx0XHRsZXQgc3RhcnRpbmdTdGF0ZSA9ICdJbnRybyc7XG5cdFx0XHRpZiAoc3RhdGUgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0c3RhcnRpbmdTdGF0ZSA9IHN0YXRlO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5zdGFydChzdGFydGluZ1N0YXRlKTtcblx0XHR9XG5cblx0XHRwdWJsaWMgbG9naW4oKSB7XG5cdFx0XHR0aGlzLnN0YXJ0KCdMb2dpbicpO1xuXHRcdH1cblx0fVxufSIsImV4cG9ydCBjbGFzcyBQbGF5IGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdHByZWxvYWQoKSB7XG5cdFx0dGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ3dhbGwnLCAnYXNzZXRzL2ltZy93YWxsLTAwMS5wbmcnKTtcblx0XHR0aGlzLmdhbWUubG9hZC5pbWFnZSgnZmxvb3InLCAnYXNzZXRzL2ltZy9mbG9vci0wMDEucG5nJyk7XG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0dGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjOTkxMjM1JztcblxuXHRcdGNvbnN0IHdhbGwgPSB0aGlzLmdhbWUuYWRkLmltYWdlKDAsIDAsICdmbG9vcicpO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXG5cdH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcmFuZ2UtZ2FtZXMvcGhhc2VyLWlucHV0L2J1aWxkL3BoYXNlci1pbnB1dC5kLnRzXCIgLz5cblxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50L2lucHV0VGV4dCc7IFxuaW1wb3J0IHsgVXRpbCB9IGZyb20gJy4uL3V0aWwnO1xuXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXIgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xuXHRpbnB1dFRleHQgOiBDb21wb25lbnQuSW5wdXRUZXh0O1xuXHRyZWdpc3RlckJ0biA6IFBoYXNlci5CdXR0b247XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdHByZWxvYWQoKSB7XG5cdFx0XG5cdH1cblxuXHRwcml2YXRlIHNldFJlZ2lzdGVySW5wdXRUZXh0KCkge1xuXHRcdGxldCB0ZXh0V2lkdGggPSAyMDA7XG5cdFx0bGV0IHRleHRIZWlnaHQgPSA4MDtcblx0XHRsZXQgdGV4dFggPSB0aGlzLmdhbWUud29ybGQuY2VudGVyWCAtIHRleHRXaWR0aC8yO1xuXHRcdGxldCB0ZXh0WSA9IHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZIC0gdGV4dEhlaWdodC8yO1xuXG5cdFx0bGV0IHRleHRNYXhMZW5ndGggPSAyMDtcblxuXHRcdGxldCB0ZXh0U3R5bGUgPSB7XG5cdFx0XHRmaWxsOiAnIzAwMDAwMCcsXG5cdFx0XHRib3VuZHNBbGlnbkg6ICdjZW50ZXInLFxuXHRcdFx0Ym91bmRzQWxpZ25WOiAnbWlkZGxlJyxcblx0XHRcdGZvbnQ6ICcyMHB4IEFyaWFsJ1xuXHRcdH1cblxuXHRcdHRoaXMuaW5wdXRUZXh0ID0gbmV3IENvbXBvbmVudC5JbnB1dFRleHQodGhpcy5nYW1lLCB0ZXh0WCwgdGV4dFksIHRleHRXaWR0aCwgdGV4dEhlaWdodCwgdGV4dE1heExlbmd0aCwgJ3Rlc3RpbmcgaXMgZ29vZCcsIHRleHRTdHlsZSk7XG5cdH1cblxuXHRwcml2YXRlIHNldFJlZ2lzdGVyQnV0dG9uKCkge1xuXHRcdGxldCBidG5XaWR0aCA9IDIwMDtcblx0XHRsZXQgYnRuSGVpZ2h0ID0gODA7XG5cdFx0XG5cdFx0bGV0IGJ0blggPSB0aGlzLmdhbWUud29ybGQuY2VudGVyWCAtIGJ0bldpZHRoLzI7XG5cdFx0bGV0IGJ0blkgPSB0aGlzLmdhbWUud29ybGQuY2VudGVyWSAtIGJ0bkhlaWdodC8yICsgMTAwO1xuXG5cdFx0bGV0IGJ0blRleHQgPSAnUmVnaXN0ZXInO1xuXHRcdHRoaXMucmVnaXN0ZXJCdG4gPSB0aGlzLmdhbWUuYWRkLmJ1dHRvbihidG5YLCBidG5ZLCBidG5UZXh0LCAoZSkgPT4ge1xuXHRcdFx0aWYgKGNvbmZpcm0oYCR7dGhpcy5pbnB1dFRleHQudGV4dH3ri5jsnLzroZwg7ZWY7Iuc6rKg7Iq164uI6rmMP2ApKSB7XG5cdFx0XHRcdHRoaXMuc2F2ZVVzZXJJZCgpO1xuXHRcdFx0XHR0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ1N0YWdlJyk7XG5cdFx0XHR9XG5cdFx0fSwgdGhpcyk7XG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cblx0XHR0aGlzLnNldFJlZ2lzdGVySW5wdXRUZXh0KCk7XG5cdFx0dGhpcy5zZXRSZWdpc3RlckJ1dHRvbigpO1xuXHRcdFxuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdHRoaXMuaW5wdXRUZXh0LnJlbmRlcigpO1xuXHR9XG5cblx0c2F2ZVVzZXJJZCgpIHtcblx0XHRsZXQgdXNlcklkID0gdGhpcy5pbnB1dFRleHQudGV4dDtcblx0XHRVdGlsLnNldExvY2FsU3RvcmFnZVZhbHVlKCd1dWlkJywgdXNlcklkKTtcblx0fVxufSIsImltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tIFwiLi4vY29udHJvbGxlclwiO1xuXG5leHBvcnQgY2xhc3MgU3RhZ2UgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xuXHRyZWFkb25seSBudW1iZXJPZlN0YWdlID0gMztcblxuXHRsb3dlclN0YWdlQnRuIDogUGhhc2VyLkJ1dHRvbjtcblx0aGlnaGVyU3RhZ2VCdG4gOiBQaGFzZXIuQnV0dG9uO1xuXG5cblx0c3RhZ2VHcm91cCA6IFBoYXNlci5Hcm91cDtcblx0Y3VycmVudFN0YWdlOiBudW1iZXI7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdHByZWxvYWQoKSB7XG5cdFx0dGhpcy5nYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ3N0YWdlQXJyb3dzJywgJy4uL2Fzc2V0cy9pbWcvc3RhZ2VBcnJvd3MucG5nJywgNDgsIDQ4KTtcblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHR0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyM0QjRCNEInO1xuXHRcdGNvbnN0IHVzZXJJZCA9IENvbnRyb2xsZXIuZ2V0SW5zdGFuY2UoKS51c2VySWQ7XG5cblx0XHR0aGlzLmRyYXdTdGFnZUJ0bigpO1xuXHRcdHRoaXMuZHJhd1N0YWdlTW92ZUJ0bigpO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXG5cdH1cblxuXHRwcml2YXRlIGRyYXdTdGFnZUJ0bigpIHtcblx0XHRjb25zdCB3aWR0aCA9IDIwMDtcblx0XHRjb25zdCBoZWlnaHQgPSAyMDA7XG5cblx0XHRsZXQgb2Zmc2V0WCA9ICh0aGlzLmdhbWUud29ybGQud2lkdGggLSAyMDApIC8gM1xuXG5cdFx0Zm9yIChsZXQgaT0wOyBpPHRoaXMubnVtYmVyT2ZTdGFnZTsgaSsrKSB7XG5cdFx0XHR0aGlzLmdhbWUuYWRkLmJ1dHRvbigpXG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBkcmF3U3RhZ2VNb3ZlQnRuKCkge1xuXHRcdHRoaXMubG93ZXJTdGFnZUJ0biA9IHRoaXMuZ2FtZS5hZGQuYnV0dG9uKDUwLCA0MjAsIFwic3RhZ2VBcnJvd3NcIiwgdGhpcy5idXR0b25DbGlja2VkKTtcblx0XHR0aGlzLmhpZ2hlclN0YWdlQnRuID0gdGhpcy5nYW1lLmFkZC5idXR0b24oMjcwLCA0MjAsIFwic3RhZ2VBcnJvd3NcIiwgdGhpcy5idXR0b25DbGlja2VkKTtcblxuXHRcdHRoaXMubG93ZXJTdGFnZUJ0bi5mcmFtZSA9IDA7XG5cdFx0dGhpcy5oaWdoZXJTdGFnZUJ0bi5mcmFtZSA9IDE7XG5cblx0XHRjb25zdCBzdGFnZVRleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQodGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIDUwLCAnU3RhZ2UnLCB7XG5cdFx0XHRmaWxsOiAnI2ZmZmZmZicsXG5cdFx0XHRmb250OiAnMjBweCBBcmlhbCdcblx0XHR9KTtcblxuXHRcdHN0YWdlVGV4dC5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xuXHR9XG5cblx0cHJpdmF0ZSBidXR0b25DbGlja2VkKGJ1dHRvbiwgcG9pbnRlcikge1xuXHRcdGlmIChidXR0b24uZnJhbWUgPT0gMCkgeyAvLyBsb3dlclN0YWdlQnRuXG5cblx0XHR9IGVsc2UgaWYgKGJ1dHRvbi5mcmFtZSA9PSAxKSB7IC8vIGhpZ2hlclN0YWdlQnRuXG5cblx0XHR9XG5cdH1cbn1cbiIsImV4cG9ydCBjbGFzcyBVdGlsIHtcblx0c3RhdGljIGdldENvb2tpZShrZXk6IHN0cmluZykgOiBzdHJpbmcge1xuXHRcdGNvbnN0IG5hbWUgPSBrZXkgKyAnPSc7XG5cdFx0dmFyIGRlY29kZWRDb29raWUgPSBkZWNvZGVVUklDb21wb25lbnQoZG9jdW1lbnQuY29va2llKTtcblx0XHR2YXIgY2EgPSBkZWNvZGVkQ29va2llLnNwbGl0KCc7Jyk7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgYyA9IGNhW2ldO1xuXHRcdFx0d2hpbGUgKGMuY2hhckF0KDApID09ICcgJykge1xuXHRcdFx0XHRjID0gYy5zdWJzdHJpbmcoMSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoYy5pbmRleE9mKG5hbWUpID09IDApIHtcblx0XHRcdFx0cmV0dXJuIGMuc3Vic3RyaW5nKG5hbWUubGVuZ3RoLCBjLmxlbmd0aCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiAnJztcblx0fVxuXG5cdHN0YXRpYyBzZXRDb29raWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGV4cGlyZWRUaW1lSW5Ib3VyOiBudW1iZXIpIHtcblx0XHRjb25zdCBkID0gbmV3IERhdGUoKTtcblx0XHRkLnNldFRpbWUoZC5nZXRUaW1lKCkgKyAoZXhwaXJlZFRpbWVJbkhvdXIqNjAqNjAqMTAwMCkpO1xuXHRcdFxuXHRcdGNvbnN0IGV4cGlyZXMgPSAnZXhwaXJlcz0nICsgZC50b1VUQ1N0cmluZygpO1xuXHRcdGRvY3VtZW50LmNvb2tpZSA9IGtleSArICc9JyArIHZhbHVlICsgJzsnICsgZXhwaXJlcyArICc7cGF0aD0vJztcblx0fVxuXG5cdHN0YXRpYyBnZXRMb2NhbFN0b3JhZ2VWYWx1ZShrZXk6IHN0cmluZykgOiBzdHJpbmcge1xuXHRcdHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpIHx8ICcnO1xuXHR9XG5cblx0c3RhdGljIHNldExvY2FsU3RvcmFnZVZhbHVlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG5cdFx0bGV0IGpzb25TdHI7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuXHRcdFx0anNvblN0ciA9IHZhbHVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRqc29uU3RyID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuXHRcdH1cblx0XHRcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIGpzb25TdHIpO1xuXHR9XG5cblx0c3RhdGljIGdlbmVyYXRlVVVJRCgpIDogc3RyaW5nIHtcblx0XHRsZXQgczQgPSAoKSA9PiAoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDAgfCAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpO1xuXHRcdFxuXHRcdHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcblx0fVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==