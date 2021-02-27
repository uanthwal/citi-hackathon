let protocol = location.protocol + "//" + location.host;

export var URL_CONFIG = {
  BASE_URL: getConfigs()["BASE_URL"],
  LIVE_STREAM_FEED: ":5000/live-stream",
  GET_PREV_TRENDS: ":5000/historical-data",
  VALIDATE_PASS_FOR_LIVE_STREAM: ":5000/validate-password"
};

export function getConfigs() {
  if (protocol == "http://localhost:4200") {
        return {
            BASE_URL: "http://localhost"
        };
    } else {
        return {
            BASE_URL: "http://ec2-23-22-153-152.compute-1.amazonaws.com"
        };
    }
}
