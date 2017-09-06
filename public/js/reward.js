$(() => {
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

	var rewards_cookie = Cookies.get('rewards')
	if(typeof rewards_cookie === "undefined") {
		Cookies.set('rewards', JSON.stringify(default_rewards))
		rewards_cookie = JSON.stringify(default_rewards)
	}
	var rewards = JSON.parse(rewards_cookie)

	fillRewards(rewards)

	$('.remove_reward').click(function(event) {

		for(var i = 0; i < rewards.length; i++) {
			var reward = rewards[i];

			if(reward.id == event.target.id.split('_')[1]) {
				rewards.splice(i, 1);
			}
		}
		Cookies.set('rewards', JSON.stringify(rewards))
		$("#rewards").empty()
		fillRewards(rewards)

	})
})

function fillRewards(rewards) {
	rewards.forEach((reward) => {
		$("#rewards").append(`
			<li>
				${reward.msg} <a href="javascript:void(0)" class="remove_reward" id="reward_${reward.id}">x</a>
			</li>
		`)
	})
}

