$(() => {
	if (Notification.permission !== "granted") {
		Notification.requestPermission();
	}
})

function notify(msg) {
	const audio = new Audio('../sounds/notif.mp3')
	audio.volume = 0.1
	audio.play()
	if(Notification.permission === "granted") {
		var notification = new Notification('Curry-Banana', {
			icon: '../images/favicon.ico',
			body: msg,
		});

		notification.onclick = function () {
			// ?
		};
	}
}
