var rewards = [
	'Eat a delicious snack',
	'Watch an episode of your favorite show',
	'Tonight, relax yourself in front of a movie',
	'You got 5 minutes on social media. Go !',
	'For your next break, get 15 more minutes'
]

var pomodoroTime = 25
var shortBreakTime = 5
var longBreakTime = 15
var actualTime = 0
var streakCount = 0
var pomodoroMax = 4

let getReward = function() {
	let index = Math.floor(Math.random() * rewards.length)
	return rewards[index]
}

let removeReward = function() {
	alert('This function is not available for the moment')
}

let openMenu = function() {
	closeAbout()
	let sideMenu = document.getElementById('side_menu')	
	sideMenu.style.left = '0px';
	document.body.style.marginLeft = '360px';
}

let closeMenu = function() {
	let sideMenu = document.getElementById('side_menu')	
	sideMenu.style.left = '-400px';
	document.body.style.marginLeft = '0px';
}

let openAbout = function() {
	closeMenu()
	let about = document.getElementById('about')	
	about.style.right = '0px';
	document.body.style.marginRight = '315px';
}

let closeAbout = function() {
	let about = document.getElementById('about')	
	about.style.right = '-400px';
	document.body.style.marginRight = '0px';
}

let addReward = function(reward) {
	let reward_elem = document.createElement('div')
	reward_elem.className = 'reward'

	let text_elem = document.createElement('div')
	text_elem.className = 'text'
	let p = document.createElement('p')
	p.innerHTML = reward
	text_elem.appendChild(p)
	reward_elem.appendChild(text_elem)
	let option_elem = document.createElement('div')
	option_elem.className = 'option'
	let a = document.createElement('a')
	a.href = '#'
	a.setAttribute('onclick','removeReward()')
	a.innerHTML = 'Remove'
	//option_elem.appendChild(a)
	reward_elem.appendChild(option_elem)
	document.getElementById('rewards').appendChild(reward_elem)
}

let startTimer = function(timerInit) {
	if(timer)
		clearInterval(timer)
	time = 0
	actualTime = timerInit
	timer = setInterval(tick, 1000)
	let banana = document.getElementById('banana-img')
	banana.style.display = 'none';
	let timerBox = document.getElementById('timer-box')
	let timerText = document.getElementById('timer')
	timerText.innerHTML = actualTime + ':00'
	timerBox.style.display = 'block';

	let otherButtonsBox = document.getElementById('other_buttons_box')
	let breakButtonBox = document.getElementById('break_button_box')
	otherButtonsBox.style.display = 'inline'
	breakButtonBox.style.display = 'none'
	let launchButton = document.getElementById('launch_button')
	let pauseButton = document.getElementById('pause_button')
	launchButton.style.display = 'none'
	pauseButton.style.display = 'inline'
}

let restartTimer = function() {
	if(timer)
		clearInterval(timer)
	timer = setInterval(tick, 1000)
	let restartButton = document.getElementById('restart_button')
	let pauseButton = document.getElementById('pause_button')
	restartButton.style.display = 'none'
	pauseButton.style.display = 'inline'
}

let pauseTimer = function() {
	stopTimer()
	let pauseButton = document.getElementById('pause_button')
	let restartButton = document.getElementById('restart_button')
	pauseButton.style.display = 'none'
	restartButton.style.display = 'inline'
}

let stopTimer = function() {
	clearInterval(timer)
}

let tick = function() {
	time += 1
	let timerText = document.getElementById('timer')
	let value = (60 * actualTime) - time
	let seconds = value % 60
	let minutes = (value - seconds) / 60
	let text = minutes + ':' + seconds
	if(seconds < 10)
		text = minutes + ':0' + seconds
	if(minutes <= 0 && seconds <= 0) {
		stopTimer()
		let otherButtonsBox = document.getElementById('other_buttons_box')
		otherButtonsBox.style.display = 'none'
		let breakButtonBox = document.getElementById('break_button_box')
		let breakButton = document.getElementById('break_button')

		if(actualTime == pomodoroTime) {
			streakCount += 1
			text = streakCount + ' pomodori achieved !'
			if(streakCount == 1)
				text = '1 pomodoro achieved !'

			breakButton.innerHTML = shortBreakTime +'\' Break'
			breakButtonBox.style.display = 'inline'
			breakButton.setAttribute('onclick', 'startTimer(shortBreakTime)')

			if(streakCount == pomodoroMax) {
				text = getReward()
				streakCount = 0

				breakButton.innerHTML = longBreakTime +'\' Break'
				breakButtonBox.style.display = 'inline'
				breakButton.setAttribute('onclick', 'startTimer(longBreakTime)')
			}

		} else {
			text = 'Break over !'
			otherButtonsBox.style.display = 'inline'
			breakButtonBox.style.display = 'none'
			let pauseButton = document.getElementById('pause_button')
			let launchButton = document.getElementById('launch_button')
			pauseButton.style.display = 'none'
			launchButton.style.display = 'inline'
		}
	}
	timerText.innerHTML = text
}

let load = function() {
	//openMenu()
	for(let i = 0; i < rewards.length; i++) {
		addReward(rewards[i])
	}
}

document.onload = load()
