'use strict';

(function(exports){
	
	var StopWatch = function(){
		this.wrapper = null;
		this.startButton = null;
		this.pauseButton = null;
		this.resetButton = null;
		this.running = false;
		this.startTime = -1;
		this.pauseTime = 0;
		this.watchTaskID = null;
	}
	
	StopWatch.prototype = {
		
		onStartButtonClicked(){
			console.log(window.performance.now());
			if(this.running == false){
				this.running = true;
				if(this.startTime == -1){
					this.startTime = new Date().getTime();
				}else{
					this.startTime = this.startTime + (new Date().getTime() - this.pauseTime);
				}
				this.watchTaskID = setInterval(this.watchTask.bind(this),100);		
			}
		},
		
		watchTask(){
			var timeInms = new Date().getTime() - this.startTime; 
			var time = new Date(timeInms);
			var displayString = time.toJSON().slice(14,22);
			this.wrapper.textContent = displayString;
		},
		
		onPauseButtonClicked(){
			if(this.running == true){
				this.pauseTime = new Date().getTime();
				clearInterval(this.watchTaskID);
				var timeInms = this.pauseTime - this.startTime; 
				var time = new Date(timeInms);
				var displayString = time.toJSON().slice(14,22);
				this.wrapper.textContent = displayString;
				this.running = false;
			}
		},

		onResetButtonClicked(){
			clearInterval(this.watchTaskID);
			this.running = false;
			this.startTime = -1;
			this.pauseTime = 0;
			this.wrapper.textContent = '00:00.00';
		},
		
		start(){
			this.wrapper = document.getElementById('stop_watch');
			this.startButton = document.getElementById('start_button');
			this.pauseButton = document.getElementById('pause_button');
			this.resetButton = document.getElementById('reset_button');
			
			this.wrapper.textContent = "00:00.00";
			this.startButton.addEventListener("click",this.onStartButtonClicked.bind(this));
			this.pauseButton.addEventListener("click",this.onPauseButtonClicked.bind(this));
			this.resetButton.addEventListener("click",this.onResetButtonClicked.bind(this));
			
		}
		
		
	}

	exports.StopWatch = StopWatch;
})(window);