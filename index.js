const updateRGB = require("./leds");
const axios = require('axios');

const rgb = [0, 255, 0]

// Function to fetch data from the URL
async function fetchData() {
    const response = await axios.get("https://deco-sites-page-builder.deno.dev/?asJson&onlyColors", {
      timeout: 2000,
    })
        .catch((err) => { console.log(err); return({data:{
            props: {
                sections: [
                    {
                        props: {
                            rgb,
                        }
                    }
                ]
            }
        }})});
    rgb = response.data.props.sections[0].props.rgb;
    updateRGB(...rgb);
}

// Function to start the polling
function startPolling(interval) {
  let isRequestPending = false;

  const poll = async () => {
    if (!isRequestPending) {
      isRequestPending = true;
      await fetchData();
      isRequestPending = false;
    }
  };

  // Start the initial poll immediately
  poll();

  // Continue polling at the specified interval
  setInterval(poll, interval);
}

// Example URL and polling interval (e.g., 5000 milliseconds)
const POLL_INTERVAL = 2000;

// Start polling
startPolling(POLL_INTERVAL);
