let protocol = location.protocol + "//" + location.host;

export var URL_CONFIG = {
  BASE_URL: getConfigs()["BASE_URL"],
  LIVE_STREAM_FEED: ":5000/live-stream",
  GET_PREV_TRENDS: ":5000/historical-data",
};

export function getConfigs() {
  return {
    BASE_URL: "http://localhost",
    ADMIN_ICON: "../assets/admin.png",
  };
}
