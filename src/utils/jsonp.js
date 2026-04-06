export function fetchStandings() {
  return new Promise((resolve, reject) => {
    // 👇 MUST match API response
    window.ongroupstandings = (data) => {
      console.log("JSONP WORKED:", data);

      resolve(data);

      // cleanup
      delete window.ongroupstandings;
      script.remove();
    };

    const script = document.createElement("script");

    script.src =
      "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/284-groupstandings.js?_=" +
      Date.now();

    script.onerror = (err) => {
      console.error("Script load failed", err);
      reject(err);
    };

    document.body.appendChild(script);
  });
}