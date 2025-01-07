var starttime;
var currentstop;
var totalstops;
var diffmins;
var pace;
var rest;
var pacediv = document.getElementById("packages");
var currentstopdiv = document.getElementById("ct");
var totalstopsdiv = document.getElementById("ts");
var hourdiv = document.getElementById("hour");
var mindiv = document.getElementById("min");

var fmindiv = document.getElementById("fmin");
var fhourdiv = document.getElementById("fhour");

document.getElementById("pack").onclick = click;

console.log(document.cookie);

if (getCookieValue("totalstops") === "null" || document.cookie === "") {
	// abfrage wie viele totalstops
	// Abfrage einer Zahl
	let userInput = prompt("Wie viele Stops hast du heute?");

	totalstops = userInput;
	currentstop = 0;
	totalstopsdiv.innerHTML = totalstops;
} else {
	starttime = new Date(getCookieValue("starttime"));
	currentstop = getCookieValue("currentstop");
	totalstops = getCookieValue("totalstops");
	totalstopsdiv.innerHTML = totalstops;
	ajust();
}

function click() {
	currentstop++;

	if (Number(currentstop) === Number(totalstops)) {
		alert("FERTIIGG");
	}

	ajust();
}

function ajust() {
	const now = new Date();

	if (currentstop === 1) {
		starttime = now;
		pacediv.innerHTML = `1<span>p/h</span>`;
	} else {
		diffmins =
			now.getHours() * 60 +
			now.getMinutes() -
			(starttime.getHours() * 60 + starttime.getMinutes());

		pace = currentstop / diffmins;

		// rest in Minuten
		rest = (totalstops - currentstop) / pace;

		pacediv.innerHTML = `${Math.round(pace * 60)}<span>p/h</span>`;

		// left anzeige
		var stunden = Math.trunc(rest / 60);
		hourdiv.innerHTML = stunden;
		var minuten = Math.trunc(rest - stunden * 60);
		mindiv.innerHTML = minuten;

		// wann fertig anzeige
		var minges = now.getHours() * 60 + now.getMinutes() + rest;
		var stunden = Math.trunc(minges / 60);
		fhourdiv.innerHTML = stunden;
		var minuten = Math.trunc(minges - stunden * 60);
		if (minuten === `0`) {
			minuten = `00`;
		}
		if (minuten < 10) {
			minuten = "0" + minuten;
		}
		fmindiv.innerHTML = minuten;
	}

	currentstopdiv.innerHTML = currentstop;

	setCookies(totalstops, currentstop, starttime);

	console.log(document.cookie);
}

function getCookieValue(name) {
	const cookies = document.cookie.split("; ");
	const cookie = cookies.find((row) => row.startsWith(name + "="));
	return cookie ? cookie.split("=")[1] : null;
}

function clearAllCookies() {
	document.cookie.split("; ").forEach((cookie) => {
		const cookieName = cookie.split("=")[0];
		document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
	});
}

function setCookies(ts, cs, st) {
	const now = new Date();
	const midnight = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate() + 1
	); // Mitternacht des nächsten Tages
	const expires = midnight.toUTCString(); // In UTC-Format konvertieren

	// Cookies setzen
	document.cookie = `totalstops=${ts}; expires=${expires}; path=/`;
	document.cookie = `currentstop=${cs}; expires=${expires}; path=/`;
	document.cookie = `starttime=${st}; expires=${expires}; path=/`;
}
var counter = 0;
document.getElementById("reset").onclick = function func() {
	if (counter < 5) {
		counter++;
	} else {
		clearAllCookies();
		location.reload();
	}
};
