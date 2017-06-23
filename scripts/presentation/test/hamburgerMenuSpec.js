define([
	'augmentedPresentation'
], function(
	Presentation
) {
	describe('Given Augmented Presentation Hamburger Menu View', function() {

		describe('Given a Hamburger Menu View', function() {
			it('Augmented.Presentation.DecoratorView is defined', function() {
				expect(Augmented.Presentation.HamburgerMenu).toBeDefined();
			});

			describe('Given a HamburgerMenu instance', function() {
                var el = document.getElementById("monkey"),
                    body = document.getElementsByTagName("body")[0],
                    MyMenu = Augmented.Presentation.HamburgerMenu.extend({
                        el: "#monkey",
                        name: "monkey"
						menuItems: [{ "id": "monkey", "click": "monkeyClick", "icon": "info", "title": "Monkey", "spacer": false }]
                    }),
                    d;

                if (!el) {
                    el = document.createElement("div");
                    el.id = "monkey";
                    body.appendChild(el);
                }

				beforeEach(function() {
					d = new MyMenu();
				});

				afterEach(function() {
                    d.remove();
					d = null;
				});

                it('HamburgerMenu is a Colleague', function() {
                    expect(d instanceof Augmented.Presentation.Colleague).toBeTruthy();
                });

				it('can create an instance that is a DecoratorView', function() {
					expect(d instanceof Augmented.Presentation.HamburgerMenu).toBeTruthy();
				});

				it('the HamburgerMenu has a bound element', function() {
					expect(d.el).toBeDefined();
					expect(d.el.tagName).toEqual(el.tagName);
				});

                it('can return the binding attribute name', function() {
                    var name = d.bindingAttribute();
					expect(name).toEqual("data-monkey");
				});

                it('can return a bound element', function() {
                    d.injectTemplate("<span data-monkey=\"me\"></span>", el);
                    var s = el.querySelector("span");
                    var e = d.boundElement("me");
					expect(s).toBeDefined();
                    expect(e).toBeDefined();
				});
			});
		});
	});
});
