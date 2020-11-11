//TTFB
const navigationEntries = window.performance.getEntriesByType("navigation")[0];
const ttfb = navigationEntries.responseStart - navigationEntries.requestStart;
// FCP
const paintEntries = window.performance.getEntriesByType("paint");

// DOM lOAD (Check startTime)//domComplete - domLoading; olabilir
const domLoad = navigationEntries.domContentLoadedEventEnd - navigationEntries.startTime;

// WINDOW LOAD EVENTS
const windowLoadEvents = navigationEntries.loadEventEnd - navigationEntries.startTime

const resourceListEntries = window.performance.getEntriesByType("resource");
resourceListEntries.forEach(resource => {
  if (resource.initiatorType == 'img') {
    console.info(`Time taken to load ${resource.name}: `, resource.responseEnd - resource.startTime);
  }
});

console.log("navigationEntries", navigationEntries)
console.log("ttfb",ttfb)
console.log("domLoad",domLoad)
console.log("windowLoadEvents",windowLoadEvents)

const siteName = window.location.href;
// measure  ttfb ,fcp ,dom load, window load events


const data = JSON.stringify({
  site: siteName,
  ttfb: ttfb,
  fcp: "measureFcp()",
  domload: domLoad,
  windowLoadEvents: windowLoadEvents
  })

  fetch("http://localhost:3000", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  }).then(res => {
    console.log("Request complete! response:", res);
  });

// send data to POST perfanalytics-api/collect { site: window.location.href, data }