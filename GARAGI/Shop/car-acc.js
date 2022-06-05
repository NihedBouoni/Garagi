$(document).ready(function () {
	"use strict";

	var menuActive = false;
	var header = $(".header");
	setHeader();
	initCustomDropdown();
	initPageMenu();

	function setHeader() {
		if (window.innerWidth > 991 && menuActive) {
			closeMenu();
		}
	}

	function initCustomDropdown() {
		if ($(".custom_dropdown_placeholder").length && $(".custom_list").length) {
			var placeholder = $(".custom_dropdown_placeholder");
			var list = $(".custom_list");
		}

		placeholder.on("click", function (ev) {
			if (list.hasClass("active")) {
				list.removeClass("active");
			} else {
				list.addClass("active");
			}

			$(document).one("click", function closeForm(e) {
				if ($(e.target).hasClass("clc")) {
					$(document).one("click", closeForm);
				} else {
					list.removeClass("active");
				}
			});
		});

		$(".custom_list a").on("click", function (ev) {
			ev.preventDefault();
			var index = $(this).parent().index();

			placeholder.text($(this).text()).css("opacity", "1");

			if (list.hasClass("active")) {
				list.removeClass("active");
			} else {
				list.addClass("active");
			}
		});

		$("select").on("change", function (e) {
			placeholder.text(this.value);

			$(this).animate({ width: placeholder.width() + "px" });
		});
	}

	/*

4. Init Page Menu

*/

	function initPageMenu() {
		if ($(".page_menu").length && $(".page_menu_content").length) {
			var menu = $(".page_menu");
			var menuContent = $(".page_menu_content");
			var menuTrigger = $(".menu_trigger");

			//Open / close page menu
			menuTrigger.on("click", function () {
				if (!menuActive) {
					openMenu();
				} else {
					closeMenu();
				}
			});

			//Handle page menu
			if ($(".page_menu_item").length) {
				var items = $(".page_menu_item");
				items.each(function () {
					var item = $(this);
					if (item.hasClass("has-children")) {
						item.on("click", function (evt) {
							evt.preventDefault();
							evt.stopPropagation();
							var subItem = item.find("> ul");
							if (subItem.hasClass("active")) {
								subItem.toggleClass("active");
								TweenMax.to(subItem, 0.3, { height: 0 });
							} else {
								subItem.toggleClass("active");
								TweenMax.set(subItem, { height: "auto" });
								TweenMax.from(subItem, 0.3, { height: 0 });
							}
						});
					}
				});
			}
		}
	}

	function openMenu() {
		var menu = $(".page_menu");
		var menuContent = $(".page_menu_content");
		TweenMax.set(menuContent, { height: "auto" });
		TweenMax.from(menuContent, 0.3, { height: 0 });
		menuActive = true;
	}

	function closeMenu() {
		var menu = $(".page_menu");
		var menuContent = $(".page_menu_content");
		TweenMax.to(menuContent, 0.3, { height: 0 });
		menuActive = false;
	}
});


(function() {
 
	var parent = document.querySelector(".price-slider");
	if(!parent) return;
   
	var
	  rangeS = parent.querySelectorAll("input[type=range]"),
	  numberS = parent.querySelectorAll("input[type=number]");
   
	rangeS.forEach(function(el) {
	  el.oninput = function() {
		var slide1 = parseFloat(rangeS[0].value),
			  slide2 = parseFloat(rangeS[1].value);
   
		if (slide1 > slide2) {
		  [slide1, slide2] = [slide2, slide1];
		}
   
		numberS[0].value = slide1;
		numberS[1].value = slide2;
	  }
	});
   
	numberS.forEach(function(el) {
	  el.oninput = function() {
		  var number1 = parseFloat(numberS[0].value),
		  number2 = parseFloat(numberS[1].value);
		  
		if (number1 > number2) {
		  var tmp = number1;
		  numberS[0].value = number2;
		  numberS[1].value = tmp;
		}
   
		rangeS[0].value = number1;
		rangeS[1].value = number2;
   
	  }
	});
   
})();
$('.like-btn').on('click', function() {
	$(this).toggleClass('is-active');
});
 
/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00; 
var fadeTime = 300;


/* Assign actions */
$('.product-quantity input').change( function() {
  updateQuantity(this);
});

$('.product-removal button').click( function() {
  removeItem(this);
});


/* Recalculate cart */
function recalculateCart()
{
  var subtotal = 0;
  
  /* Sum up row totals */
  $('.product').each(function () {
    subtotal += parseFloat($(this).children('.product-line-price').text());
  });
  
  /* Calculate totals */
  var tax = subtotal * taxRate;
  var shipping = (subtotal > 0 ? shippingRate : 0);
  var total = subtotal + tax + shipping;
  
  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function() {
    $('#cart-subtotal').html(subtotal.toFixed(2));
    $('#cart-tax').html(tax.toFixed(2));
    $('#cart-shipping').html(shipping.toFixed(2));
    $('#cart-total').html(total.toFixed(2));
    if(total == 0){
      $('.checkout').fadeOut(fadeTime);
    }else{
      $('.checkout').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
  });
}


/* Update quantity */
function updateQuantity(quantityInput)
{
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.product-price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;
  
  /* Update line price display and recalc cart totals */
  productRow.children('.product-line-price').each(function () {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });  
}


/* Remove item from cart */
function removeItem(removeButton)
{
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
  });
}
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);