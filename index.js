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
