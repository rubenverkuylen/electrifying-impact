'use strict';

const projectContent = document.querySelectorAll('.project-content');
const project = document.querySelectorAll('.project');
const elecBtn = document.getElementById('header-elec');
const calineBtn = document.getElementById('header-caline');
const contHead = document.getElementById('header-container');
const backdrop = document.getElementById('backdrop');
const corner = document.getElementById('hot-corner');

// HIDE SHOW on LOAD >
// function hideOnLoadBetter() {
//   projectContent.forEach(item => item.classList.toggle('hidden'));
// }
// hideOnLoadBetter();

// 2. hide/show on click
function clickHeader(elem) {
  const other = document.querySelectorAll('.project-content');
  const sibling = elem.nextElementSibling;
  // hide all
  if (sibling.classList.contains('visible')) {
    sibling.classList.remove('visible');
    sibling.classList.add('hidden');
  } else {
    other.forEach(el => {
      el.classList.add('hidden');
      el.classList.remove('visible');
    });
    sibling.classList.add('visible');
    sibling.classList.remove('hidden');
  }
}

// PAGE FLIP
// 0. URL reader
const urlName = location.href.split('/').slice(-1);
const root = document.querySelector(':root');

document.addEventListener('DOMContentLoaded', function () {
  if (urlName[0] == 'caline-with-c.html') {
    root.style.setProperty('--bg-color', 'var(--bg-color-caline)');
    root.style.setProperty('--text-color', 'var(--text-color-caline)');
    root.style.setProperty('--second-color', 'var(--second-color-caline)');
    root.style.setProperty('--text-shadow', 'var(--text-shadow-caline)');
    return (elecActive = false);
  } else {
    root.style.setProperty('--bg-color', 'var(--bg-color-impact)');
    root.style.setProperty('--text-color', 'var(--text-color-impact)');
    root.style.setProperty('--second-color', 'var(--second-color-impact)');
    root.style.setProperty('--text-shadow', 'var(--text-shadow-impact)');
    return (elecActive = true);
  }
});

let elecActive = true;

// 1. Flip animation
function flip() {
  const width = window.innerWidth;
  let rotateState = width < 840 ? 'rotatey' : 'rotatex';
  const k = 180;
  contHead.style.transform = `perspective(600px) ${rotateState}(${k}deg)`;
  // contHead.style.transform = `perspective(600px) rotatex(${k}deg)`;
  contHead.style.transitionDuration = '800ms';
  backdrop.style.animation = 'backdrop 800ms';
  backdrop.style.animationTimingFunction = 'cubic-bezier(0,.87,1,-0.11)';
  backdrop.style.boxShadow = '0 0 10px rgba(255,255,255,.8)';
}

// 2. Click event
elecBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (elecActive) {
  } else {
    window.setTimeout(function () {
      window.location.href = 'index.html';
    }, 800);
    flip();
    return (elecActive = true);
  }
});

calineBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (!elecActive) {
  } else {
    flip();
    window.setTimeout(function () {
      window.location.href = 'caline-with-c.html';
    }, 800);
    return (elecActive = false);
  }
});

// LAZY LOAD
// 1. loop over all artwork classes and apply lazy-load class on the img child

// 2. if project-content contains "visible"

// 3. child img.addEventListener(load, removeFunction)

// 4. remove function
// 4.1 replace with high quality image
// 4.2 remove lazy-load class

// HOT CORNERS
// 1. mouse position
function mousemove(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  const screenX = screen.width;
  const screenY = screen.height;
  const relX = 1 - mouseX / screenX;
  const relY = mouseY / screenY;
  const sumPos = Math.pow(relX, 2) * Math.pow(relY, 2);
  // recalculate that it starts from 50%
  corner.style.background = `radial-gradient(ellipse at bottom left, rgb(255, 0, 0, ${sumPos}) 5%, rgb(255, 0, 0, 0) 40%)`;
}

window.addEventListener('mousemove', mousemove);

// 2. if mouse position is beyond treshold (x and y)
