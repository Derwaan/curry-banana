/* global rewards Cookies */

// Default rewards in there is no cookie
const default_rewards = [
	{
		msg: 'Eat a delicious snack',
		id: 0,
	},
	{
		msg: 'Watch an episode of your favorite show',
		id: 1,
	},
	{
		msg: 'Tonight, relax in front of a move',
		id: 2,
	},
	{
		msg: 'You got 5 minutes on social media. Go !',
		id: 3,
	},
	{
		msg: 'For your next break, get 15 more minutes',
		id: 4,
	},
]


/*
 * Fill the rewards list with rewards
 * If there is no reward, add default message
 */
function fillRewards() {
	if(rewards.length === 0) {
		$("#rewards").append(`
			<li>
				There is no reward yet... Add one !				
			</li>
		`)
	}
	rewards.forEach((reward) => {
		$("#rewards").append(`
			<li>
				${reward.msg} <a href="javascript:void(0)" class="remove_reward" id="reward_${reward.id}">x</a>
			</li>
		`)
	})
}

/*
 * Find next free id
 */
function nextId() {
	return new Date().getTime()
}

/*
 * Save the cookie and reload rewards
 */
function saveCookie() {
	Cookies.set('rewards', JSON.stringify(rewards))
	$("#rewards").empty()
	fillRewards()
}

/*
 * Add a new reward to the rewards array
 */
function addReward(msg) {
	var reward = {
		msg: msg,
		id: nextId()
	}
	rewards.push(reward)
	saveCookie()
}

function getReward() {
	return rewards[Math.floor(Math.random()*rewards.length)];
}

$(() => {

	var rewards_cookie = Cookies.get('rewards')
	if(typeof rewards_cookie === "undefined") {
		Cookies.set('rewards', JSON.stringify(default_rewards))
		rewards_cookie = JSON.stringify(default_rewards)
	}
	rewards = JSON.parse(rewards_cookie)

	fillRewards()

	$('#rewards').on('click','.remove_reward', (event) => {
		for(var i = 0; i < rewards.length; i++) {
			var reward = rewards[i];

			if(reward.id == event.target.id.split('_')[1]) {
				rewards.splice(i, 1);
			}
		}

		saveCookie()

	})

	$('#add_reward').on('keypress', (event) => {
		if(event.which === 13) {
			var msg = $("#add_reward").val()
			if(msg === "")
				return
			$("#add_reward").val("")
			addReward(msg)
		}
	})
})
