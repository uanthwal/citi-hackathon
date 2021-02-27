from flask import Flask, request, jsonify
from flask_cors import CORS

import data_analyzer as data_analyzer
import tweets_live_stream as tweets_e

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
		print("Exception occurred while live streaming: going for historical records " + str(exception))
		return jsonify({"code": "200", "data": data_analyzer.start_data_analysis('historical')})


@app.route('/historical-data', methods=['POST'])
def historical_data():
	return jsonify({"code": "200", "data": data_analyzer.start_data_analysis('historical')})


@app.route('/validate-password', methods=['POST'])
def validate_password():
	req_data = request.json
	password = req_data['password']
	if password == "":
		return jsonify({"code": "200"})
	return jsonify({"code": "403"})


if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port='5000')
