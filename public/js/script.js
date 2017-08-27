var rewards = [
	'Eat a delicious snack',
	'Watch an episode of your favorite show',
	'Tonight, relax yourself in front of a movie',
	'You got 5 minutes on social media. Go !',
	'For your next break, get 15 more minutes'
]

var pomodoroTime = 25

let getReward = function() {
	let index = Math.floor(Math.random() * rewards.length)
	let timerBox = document.getElementById('timer-box')
	timerBox.style.display = 'none';
	let rewardBox = document.getElementById('reward-box')
	let rewardText = document.getElementById('reward-text')
	rewardText.innerHTML = rewards[index]
	rewardBox.style.display = 'block'
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

let startTimer = function() {
	if(timer)
		clearInterval(timer)
	time = 0
	timer = setInterval(tick, 1000)
	let banana = document.getElementById('banana-img')
	banana.style.display = 'none';
	let rewardBox = document.getElementById('reward-box')
	rewardBox.style.display = 'none';
	let timerBox = document.getElementById('timer-box')
	let timerText = document.getElementById('timer')
	timerText.innerHTML = pomodoroTime + ':00'
	timerBox.style.display = 'block';
}

let stopTimer = function() {
	clearInterval(timer)
}

let tick = function() {
	time += 1
	let timerText = document.getElementById('timer')
	let value = (60 * pomodoroTime) - time
	let seconds = value % 60
	let minutes = (value - seconds) / 60
	let text = minutes + ':' + seconds
	if(seconds < 10)
		text = minutes + ':0' + seconds
	if(minutes <= 0 && seconds <= 0) {
		text = 'Over !'
		stopTimer()
		getReward()
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
