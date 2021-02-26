from flask import Flask, request, jsonify
from flask_cors import CORS
import tweets_live_stream as tweets_e
import data_analyzer as data_analyzer

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
	return "Welcome to Citi Canada Hackathon APIs"


@app.route('/live-stream', methods=['POST'])
def live_stream():
	req_data = request.json
	unique_id = req_data['unique_id']
	try:
		# news_e.get_data_from_news_api(unique_id)
		tweets_e.get_data_from_twitter(unique_id)
		return jsonify({"code": "200", "data": data_analyzer.start_data_analysis(unique_id)})
	except Exception as exception:
		print("Exception occurred while live streaming: " + str(exception))
		return jsonify({"code": "500", "message": "Something went wrong. Please try again."})


@app.route('/historical-data', methods=['POST'])
def historical_data():
	return jsonify({"code": "200", "data": data_analyzer.start_data_analysis('historical')})


if __name__ == '__main__':
	app.run(debug=True, host='127.0.0.1', port='5000')
