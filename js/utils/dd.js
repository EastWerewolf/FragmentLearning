// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2025-06-07
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/watch*
// @match        *://*.youtube.com/watch*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==
(function () {
  'use strict';
  const changeUI = () => {
    const outerContainer = document.querySelector('ytd-app');
    const pageContent = document.getElementById('page-manager')
    const container = document.getElementById('columns')
    const recommend = document.getElementById('secondary')
    const comment = document.getElementById('below')
    const commentContents = document.getElementById('contents')
    const playerContainer = document.getElementById('primary')
    const player = document.getElementById('primary-inner')
    outerContainer.style.height = '100vh'
    outerContainer.style.overflowY = 'hidden'
    playerContainer.style.display = 'flex'
    playerContainer.style.alignItems = 'center'
    playerContainer.style.justifyContent = 'center'
    player.style.width = '100%'
    pageContent.style.height = 'calc(100vh - 58px)'
    container.style.height = '100%'
    recommend.style.display = 'none'
    container.appendChild(comment)
    comment.style.width = '580px'
    comment.style.height = '100%'
    comment.style.display = 'flex'
    comment.style.flexDirection = 'column'
    comment.style.overflowX = 'hidden'
    comment.style.overflowY = 'auto'
    return outerContainer && pageContent && container && recommend && commentContents && playerContainer && player
  }
  const autoComplete = () => {
    const timer = setInterval(() => {
      const done = changeUI()
      if (done) {
        clearInterval(timer)
      }
    }, 100)
  }
  autoComplete()
  window.addEventListener('popstate', (e) => {
    const state = e.state ? JSON.stringify(e.state) : 'null';
    addEventLog(`URL: ${window.location.href}\nState: ${state}`, 'popstate');
  });
  // Your code here...
})();