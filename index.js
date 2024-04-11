const updateRGB = require("./leds");
const axios = require("axios");

setInterval(async () => {
    const response = await axios("https://deco-sites-page-builder.deno.dev/?asJson&onlyColors")
        .catch((err) => { console.log(err); return({data:{
            props: {
                sections: [
                    {
                        props: {
                            rgb: [0,0,0]
                        }
                    }
                ]
            }
        }})});
        console.log(response.data.props.sections[0].props.rgb);
    updateRGB(...response.data.props.sections[0].props.rgb);
}, 1000);

const axios = require('axios');

// Function to fetch data from the URL
async function fetchData(url) {
  try {
    const response = await axios.get(url);
    console.log('Data fetched successfully:', response.data);
    // Process the response.data as needed
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to start the polling
function startPolling(url, interval) {
  let isRequestPending = false;

  const poll = async () => {
    if (!isRequestPending) {
      isRequestPending = true;
      await fetchData(url);
      isRequestPending = false;
    }
  };

  // Start the initial poll immediately
  poll();

  // Continue polling at the specified interval
  setInterval(poll, interval);
}

// Example URL and polling interval (e.g., 5000 milliseconds)
const URL = 'http://your-json-api.example.com';
const POLL_INTERVAL = 5000; // 5 seconds

// Start polling
startPolling(URL, POLL_INTERVAL);
