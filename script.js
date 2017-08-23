var rewards = [
	'Eat a delicious snack',
	'Watch an episode of your favorite show',
	'Tonight, relax yourself in front of a movie',
	'You got 5 minutes on social media. Go !',
	'For your next break, get 15 more minutes'
]

let getReward = function() {
	let index = Math.floor(Math.random() * rewards.length)
	alert(rewards[index])
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

let load = function() {
	//openMenu()
	for(let i = 0; i < rewards.length; i++) {
		addReward(rewards[i])
	}
}

document.onload = load()
