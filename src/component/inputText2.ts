export namespace Component {
	export class InputText {
		
		canvas : HTMLElement;

		context : CanvasRenderingContext2D;


		x : number;
		y : number;

		width : number;
		height : number;

		fontSize : number;
		fontFamily : number;
		fontColor : string;
		
		placeHolder : string;
		placeHolderColor : string;

		isReadonly : boolean;
		
		text : string;
		maxLength : number;


		onKeyDown : Function;
		onKeyUp : Function;
		onFocus : Function;


		isMouseDown : boolean


		hasFocus : boolean;


		hiddenInputText : HTMLInputElement;

		cursorPotition : number;
		selection : Array<number>;
		
		constructor(canvas : string, context : CanvasRenderingContext2D, x, y, width, height) {
			this.canvas = document.getElementById(canvas);
			this.context = context;

			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;

			console.dir(this);

			this.makeHiddenInput();
			this.attachListeners();
			this.render();
		}

		private makeHiddenInput() {
			const self = this;

			this.hiddenInputText = document.createElement('input');
			this.hiddenInputText.type = 'text';

			this.hiddenInputText.style.position = 'absolute';
			this.hiddenInputText.style.opacity = '0';
			this.hiddenInputText.style.pointerEvents = 'none';
			this.hiddenInputText.style.zIndex = '0';
			this.hiddenInputText.style.transform = 'scale(0)';

			if (this.maxLength) {
				this.hiddenInputText.maxLength = this.maxLength;
			}

			document.body.appendChild(this.hiddenInputText);
			this.hiddenInputText.value = this.text;

			console.log(this.hiddenInputText);
			this.hiddenInputText.addEventListener('keydown', (e) => {
				if (self.hasFocus) {
					window.focus();
					self.hiddenInputText.focus();

					self.keyDown(e, self);
				}
			});
			
			this.hiddenInputText.addEventListener('keyup', function(e) {
				// update the canvas input state information from the hidden input
				self.text = self.hiddenInputText.value;
				self.cursorPotition = self.hiddenInputText.selectionStart;
				// update selection to hidden input's selection in case user did keyboard-based selection
				self.selection = [self.hiddenInputText.selectionStart, self.hiddenInputText.selectionEnd];
				self.render();
		  
				if (self.hasFocus) {
				  self.keyUp(e, self);
				}
			});
		}

		public render() {
			if (!this.context) {
				return;
			}

			

			this.context.clearRect(this.x, this.y, this.width, this.height);
			this.context.fillStyle = '#000FF0';

			this.context.fill();
		}

		private attachListeners() {
			const self = this;
			console.log(this.canvas);
			this.canvas.addEventListener('mousemove', (e) => {
				// e = e || window.event;
        		self.mouseMove(e, self);
			}, false);

			this.canvas.addEventListener('mousedown', (e) => {
				// e = e || window.event;
        		self.mouseDown(e, self);
			}, false);

			this.canvas.addEventListener('mouseup', (e) => {
				// e = e || window.event;
        		self.mouseUp(e, self);
			}, false);



			const autoBlur = function(e) {
				e = e || window.event;

				if (self.hasFocus && !self.isMouseDown) {
					// self.blur();
				}
			};
			window.addEventListener('mouseup', autoBlur, true);
			window.addEventListener('touchend', autoBlur, true);
		}


		private mouseMove(e, context) {

		}

		private mouseDown(e, context) {

		}

		private mouseUp(e, context) {

		}

		private keyUp(e, context) {

		}

		private keyDown(e, context) {

		}
	}
}