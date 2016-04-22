/*
	parametric: {
		type: "parametric",
		title: "",
		equation: "\\begin{aligned} x \&= a \\cos(t) \\\\[1.5ex] y \&= \\frac{\\sin^2(t)}{2 + \\sin(t)}\\end{aligned}",
        min: -10,
        max: 10,
		draw: function (t) {
			var a = 9,
				yi = a * t;
			return {x: xi, y: yi};
		}
	},
	polar: {
		type: "polar",
		title: "",
		equation: "r = ",
        min: 0,
        max: (2 * Math.PI),
		draw: function (t) {
			var a = 2,
				r = 2 * a Math.sin(t);
			return {x: (r * c), y: (r * s)};
		}
	},
*/
	
	

/*
	newtonsParabola: {
		type: "polar",
		title: "Newton's Parabolas**",
		equation: "ay^2 = x(x^2 - 2bx + c), a > 0",
        min: 0,
        max: (2 * Math.PI),
		draw: function (t) {
			var a = 3,
				b = -4,
				c = 5,
				y = Math.sin(t),
				x = Math.cos(t),
				r = (x * (x * x + 2 * b * x + c))/(a * y * y);
			return {x: (r * x), y: (r * y)};
		}
	},
	cassinianOvals: {
		type: "polar",
		title: "Cassinian Ovals**",
		equation: "(x^2 + y^2)^2 - 2a^2(x^2-y^2) + a^4 - c^4 = 0",
        min: 0,
        max: (2 * Math.PI),
		draw: function (t) {
			var a = 1,
				c = 1.5,
				y = Math.sin(t),
				x = Math.cos(t),
				x2 = Math.pow(x, 2),
				y2 = Math.pow(y, 2),
				r = (Math.pow((x2 + y2), 2) + Math.pow(a, 4) - Math.pow(c, 4))/(a * a * 2 * (x2 - y2));
			return {x: (r * x), y: (r * y)};
		}
	},	
*/

/*
	Devil's Curve:			y^4 - x^4 + a y^2 + b x^2 = 0
	Cartesian Oval:			((1 - m^2)(x^2 + y^2) + 2 m^2 c x + a^2 - m^2 c^2)^2 = 4 a^2 (x^2 + y^2)
	Cassinian Ovals:		(x^2 + y^2) - 2 a^2 (x^2 - y^2) + a^4 - c^4 = 0
	Durer's Shell Curves:	(x^2 + xy + ax - b^2)^2 = (b^2 - x^2)(x - y + a)^2
	Figure Eight Curve:		r^2 = a^2 cos(2theta) sec^4(theta)
	Fermat's Spiral:		r^2 = a^2 theta
	Hyperbola:				x^2/a^2 - y^2/b^2 = 1	//	x = a sec(t), y = b tan(t)
	Hyperbolic Spiral:		r = a/theta
	Involute of a circle:	x = a(cos(t) + t sin(t)), y = a(sin(t) - t cos(t))
	Kampyle of Eudoxus:		r = b^2/(a cos^2(theta))
	Kappa Curve:			r = a cot(theta)
	Lame Curves:			(x/a)^n + (y/b)^n = 1   --> n = 4.  n = 2/3 == Astroid; n = 3 == Witch of Agnesi
	Lemniscate of Bernoulli:	r^2 = a^2 cos(2theta)
	Lissajous Curves:		x = a sin(nt + c), y = b sin(t)
	Lituus:					r^2 = a^2/theta
	Neile's Parabola:		y^3 = ax^2
	Nephroid:				x = a(3cos(t) - cos(3t)), y = a(3sin(t) - sin(3t))
	Pearls of Sluze:		y^n = k(a - x)^p x^m	n = 4, k = 2, p = 3, m = 2
	Pear-shaped Quartic:	b^2 y^2 = x^3(a-x)
	Plateau Curves:			x = a sin(m + n)t/sin(m - n)t, y = 2a sin(mt)sin(nt)/sin(m - n)t	m = 5, n = 3
	Pursuit Curve:			y = cx^2 - log(x)
	Quadratrix of Hippias:	y = x cot(pi x / 2a); r = 2 a theta / (pi sin(theta))
	Rhodonea Curves:		r = a sin(k theta)
	Right Strophoid:		r = a cos(2 theta)/cos(theta)
	Serpentine:				x^2 y + aby - a^2 x = 0, ab > 0
	//Sinusoidal Spirals:	r^p = a^p cos(p theta)
	Spiral of Archimedes:	r = a theta
	Spiric Sections:		(r^2 - a^2 + c^2 + x^2 + y^2)^2 = 4r^2(x^2 + c^2)  ((c == 0)) r = radius
	Straight Line:			y = mx + b
	Talbot's Curve:			x = (a^2 + f^2 sin^2(t))cos(t)/a, y = (a^2 - 2 f^2 + f^2 sin^2(t)) sin(t)/b
	Tractrix:				x = 1/cosh(t), y = t - tanh(t)
	Tricuspoid:				x = a(2cos(t) + cos(2t)), y = a(2sin(t) - sin(2t))
	Trident of Newton:		xy = cx3 + dx2 + ex + f
	Trifolium:				r = a cos(theta) (4 sin^2(theta) - 1)
	Trisectrix of Maclaurin:	r = 2a sin(3 theta)/sin(2 theta)
	Tschirnhaus' Cubic:			3 a y^2 = x(x-a)^2
	Watt's Curve:			r^2 = b^2 - [a sin(theta) ± √(c^2 - a^2 cos^2(theta))]^2
	Witch of Agnesi:		x = at, y = a/(1 + t^2)
	
*/
