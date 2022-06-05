var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function () {
		this.classList.toggle("active");
		var panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	});
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn1 = document.getElementById("myBtn1");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn1.onclick = function () {
	modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};


// Get the button that opens the modal
var btn2 = document.getElementById("myBtn2");

// When the user clicks the button, open the modal
btn2.onclick = function () {
	modal.style.display = "block";
};
// Get the button that opens the modal
var btn3 = document.getElementById("myBtn3");

// When the user clicks the button, open the modal
btn3.onclick = function () {
	modal.style.display = "block";
};

// Get the button that opens the modal
var btn4= document.getElementById("myBtn4");

// When the user clicks the button, open the modal
btn4.onclick = function () {
	modal.style.display = "block";
};



var currentDateTime = new Date();
var year = currentDateTime.getFullYear();
var month = currentDateTime.getMonth() + 1;
var date = currentDateTime.getDate() + 1;

if (date < 10) {
	date = "0" + date;
}
if (month < 10) {
	month = "0" + month;
}

var dateTomorrow = year + "-" + month + "-" + date;
var checkinElem = document.querySelector("#checkin-date");
var checkoutElem = document.querySelector("#checkout-date");

checkinElem.setAttribute("min", dateTomorrow);

checkinElem.onchange = function () {
	checkoutElem.setAttribute("min", this.value);
};
