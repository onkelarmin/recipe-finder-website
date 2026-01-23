import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import GSDevTools from "gsap/GSDevTools";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(GSDevTools);

export { gsap, ScrollTrigger, GSDevTools };
