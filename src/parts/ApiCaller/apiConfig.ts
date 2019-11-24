
const apiConfig = {
    "base": {
        "dev": "http://localhost:9090",
        "prod": "https://site-api.dabbling.in"
    },
    "MOCK": false    // for now, can change this to turn on/off mock.  Just reset any changes to this file (git checkout apiConfig.ts).
}

export default apiConfig;
