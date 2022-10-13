
AOS.init();

window.addEventListener('scroll', e => {
	if (document.documentElement.scrollTop > 20) {
		const nav = document.getElementById('nav')
		nav.style.backgroundColor = 'rgba(0,0,0,0.5)'
		nav.style.backdropFilter = 'blur(5px)'
	} else {
		nav.style.boxShadow = 'inset 0 -1px 0 0 hsla(0,0%,100%,0.1)'
		nav.style.backgroundColor = 'transparent'
	}
})

const tips = [
	{
		query: '#stackOverflow',
		content: 'Stack Overflow',
	},
	{
		query: '#github',
		content: 'Github',
	},
];

for (const { query, content } of tips) {
	tippy(query, { content })
}


const sr = ScrollReveal({
	origin: 'bottom',
	distance: '60px',
	duration: 1000,
	delay: 400
})

const ops = { interval: 100 }

sr.reveal('.head, .paragraph, .hero-button', ops);
sr.reveal('.icon', ops);
sr.reveal(".about-title, .about-img, .about-text, .about-description.grey", ops);
sr.reveal('.stats-item', ops);

// Projects

const container = document.querySelector('.project-content');
projects.forEach((project) => {
	container.innerHTML +=
		`<div class="card">
			<div class="card-content">
			<h3 class="card-heading">${project.name}</h3>
			<p class="card-description">${project.description}</p>
			<div class="buttons">
			  <button onclick="window.open('${project.url}', '_blank')" class="card-button">Visit&nbsp;<i class="fa-solid fa-arrow-up-right-from-square"></i></button>
			</div>
			</div>
  		</div>`
})


// Blob
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(452, 250);
const scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const sphere_geometry = new THREE.SphereGeometry(1, 128, 128);
const material = new THREE.MeshNormalMaterial();
let sphere = new THREE.Mesh(sphere_geometry, material);
scene.add(sphere);
const update = function () {
	const time = performance.now() * 0.003;
	const k = 3;
	for (let i = 0; i < sphere.geometry.vertices.length; i++) {
		let p = sphere.geometry.vertices[i];
		p.normalize().multiplyScalar(1 + 0.3 * noise.perlin3(p.x * k + time, p.y * k, p.z * k));
	}
	sphere.geometry.computeVertexNormals();
	sphere.geometry.normalsNeedUpdate = true;
	sphere.geometry.verticesNeedUpdate = true;
}
function animate() {
	update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// Nav

const links = document.querySelectorAll(".nav-link");
Array.from(links).forEach(link => {
	if (link.getAttribute('data-scroll')) {
		link.onclick = () => window.scrollTo({ top: document.querySelector(link.getAttribute("data-scroll")).offsetTop, behavior: 'smooth' })
	}
})
window.addEventListener('resize', add)
function add() {
	if (window.innerWidth < 900) {
		document.body.classList.add('mobile')
	} else {
		document.body.classList.remove('mobile')
	}
}
window.onload = add;
let hamburger = document.querySelector('.hamburger')
let mobileNav = document.querySelector('.nav-list')
let bars = document.querySelectorAll('.hamburger span')
let isActive = false
hamburger.addEventListener('click', function () {
	mobileNav.classList.toggle('open')
	if (!isActive) {
		bars[0].style.transform = 'rotate(45deg)'
		bars[1].style.opacity = '0'
		bars[2].style.transform = 'rotate(-45deg)'
		isActive = true
	} else {
		bars[0].style.transform = 'rotate(0deg)'
		bars[1].style.opacity = '1'
		bars[2].style.transform = 'rotate(0deg)'
		isActive = false
	}
})


// Typing animation
var typingElement = document.querySelector(".typing-text");
var typeArray = [ "JavaScript", "NodeJS","React Native","HTML", "CSS","Python"];
var index = 0,
  isAdding = true,
  typeIndex = 0;

function playAnim() {
  setTimeout(
    function () {
      typingElement.innerText = typeArray[typeIndex].slice(0, index);
      /*
        This line handles both typing and removing text
        typeArray[typeIndex] selects the text from array
        slice(0, index) selects the part of that text

        Examples:

        typeIndex = 0     => First Text
        index = 0         => First Letter of the Text
        Result is "H"

        typeIndex = 0
        index = 1
        Result is "HT"    => First 2 Letters of the Text

        typeIndex = 0
        index = 2
        Result is "HTM"   => First 3 Letters of the Text

        typeIndex = 0
        index = 3
        Result is "HTML"  =>  Text typed completely, start to remove by decreasing index
                              While removing, index will be: 2,1,0 . After 0, move on to next text. 

        typeIndex = 1     => Second Text                   
        index = 0
        Result is "C"

        typeIndex = 1
        index = 1
        Result is "CS"

        typeIndex = 1
        index = 2
        Result is "CSS"
      */

      // If typing
      if (isAdding) {
        if (index >= typeArray[typeIndex].length) {
          isAdding = false;
          // If text typed completely, wait 2s before starting to remove it.
          setTimeout(function () {
            playAnim();
          }, 3000);
          return;
        } else {
          // Continue to typing text by increasing index
          index++;
        }
      } else {
        // If removing
        if (index === 0) {
          isAdding = true;
          //If text removed completely, move on to next text by increasing typeIndex
          typeIndex++;
          if (typeIndex >= typeArray.length) {
            // Turn to beginning when reached to last text
            typeIndex = 0;
          }
        } else {
          // Continue to removing text by decreasing index
          index--;
        }
      }
      // Call the function always
      playAnim();
    },

    /* 
      If typing text, call it every 120ms
      If removing text, call it every 60ms
      Type slower, remove faster
    */
    isAdding ? 120 : 120
  );
}

// Start typing text
playAnim();
