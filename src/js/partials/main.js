$(window).on('load', function () {
	var circles = document.querySelectorAll('.steps__circle');
	var phoneInput = document.querySelectorAll('.feedback__field--phone');
	var burger = $('.header__burger-wrapper');
	var header = $('.header');
	var closeMenu = $('.header__close');
	var accordionItems = $('.question__toggle');
	var mobileLinks = $('.header__mobile .header__nav li a');

	/* Header */
	burger.click(function () {
		if (!header.hasClass('open')) {
			header.addClass('open');
			$('body').addClass('body-scroll-lock');
		}
	});

	closeMenu.click(function () {
		header.removeClass('open');
		$('body').removeClass('body-scroll-lock');
	});

	/* WOW */
	new WOW().init();

	/* Anchor */
	document.querySelectorAll('.anchor').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();

			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});

	mobileLinks.click(function () {
		header.removeClass('open');
		$('body').removeClass('body-scroll-lock');
	});

	/* Show marquee on second block */
	var secondBlock = $('.choice');

	if (secondBlock && secondBlock.length > 0) {
		$(window).scroll(function () {
			let scroll = $(this).scrollTop();
			let winH = $(this).innerHeight();
			let elH = secondBlock.outerHeight();
			let elOffset = secondBlock.offset().top;
			let centerScroll = (winH - elH) / 2 + scroll;

			if (centerScroll >= elOffset) {
				$('.marquee').addClass('active');
			} else {
				$('.marquee').removeClass('active');
			}
		});
	}

	/* Accordion */
	accordionItems.click(function () {
		if ($(this).next().is(':hidden')) {
			accordionItems.next().slideUp(300);
			$(this).next().slideDown(300);
			accordionItems.removeClass('open');
			$(this).addClass('open');
		}
	});

	/* Marquee */
	if (window.matchMedia('(min-width: 1080px)').matches) {
		$('.js-marquee-1').marquee({
			duration: 30000,
			delayBeforeStart: 0,
			duplicated: true,
			gap: 80,
			startVisible: true,
			direction: 'up'
		});
	} else {
		$('.js-marquee-1').marquee({
			duration: 30000,
			delayBeforeStart: 0,
			duplicated: true,
			gap: 80,
			startVisible: true,
			direction: 'left'
		});
	}

	/* Marquee fixed */
	$('.js-marquee-2').marquee({
		duration: 28000,
		delayBeforeStart: 0,
		duplicated: true,
		gap: 110,
		startVisible: true,
		direction: 'left'
	});

	/* Fill Cirlces */
	var isUsed = false;

	function circlesFill() {
		if ($('.steps') && $('.steps').length > 0) {
			if (isUsed) {
				return;
			}

			let scroll = $(this).scrollTop();
			let winH = $(this).innerHeight();
			let elH = $('.steps').outerHeight();
			let elOffset = $('.steps').offset().top;
			let centerScroll = (winH - elH) / 2 + scroll;

			if (centerScroll >= elOffset - $('.steps').outerHeight()/2) {
				circles.forEach((elem, index) => {
					const circle = new ProgressBar.Circle(elem, {
						color: '#01488a',
						trailColor: '#218cef',
						strokeWidth: 3,
						trailWidth: 1,
						duration: 1000
					});

					switch (index) {
						case 0:
							circle.animate(0.25);
							break;
						case 1:
							setTimeout(function () {
								circle.animate(0.5);
							}, 500);
							break;
						case 2:
							setTimeout(function () {
								circle.animate(0.75);
							}, 1000);
							break;
						case 3:
							setTimeout(function () {
								circle.animate(1.0);
							}, 1500);
							break;
					}

					isUsed = true;
				});
			}
		}
	}

	circlesFill();

	$(window).scroll(function () {
		circlesFill();
	});

	/* Phone mask */
	if (phoneInput && phoneInput.length > 0) {
		$('input[name="phone"]').inputmask({
			mask: '+7 (999) 999-99-999'
		});
	}
});