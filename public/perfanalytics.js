const paintEntries = window.performance.getEntriesByType("paint")[0];
window.onload = function() {
const navigationEntries = performance.getEntriesByType("navigation")[0];
//TTFB
const ttfb = navigationEntries.responseStart - navigationEntries.requestStart;

// DOM lOAD (Check startTime)//domComplete - domLoading; olabilir
const domLoad = navigationEntries.domComplete - navigationEntries.domContentLoadedEventStart;

// WINDOW LOAD EVENTS
const windowLoadEvents = navigationEntries.loadEventStart - navigationEntries.loadEventEnd

const siteName = window.location.href;

const data = JSON.stringify({
  site: siteName,
  ttfb: ttfb,
  fcp: paintEntries && paintEntries.startTime,
  domload: domLoad,
  windowLoadEvents: windowLoadEvents
  })
  console.log("data",data)
  // https://bba-performance-analytics.herokuapp.com
  fetch("https://bba-performance-analytics.herokuapp.com", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  }).then(res => {
    console.log("Request complete! response:", res);
  });

}

// send data to POST perfanalytics-api/collect { site: window.location.href, data }