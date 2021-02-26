import datetime
import os
import sys
import re

from twython import TwythonStreamer

news_api_key = '052e372641d5495ba87e5d9113730693'
consumer_key = "9LG9jArKJpLshvfPGU0YUXRrM"
consumer_secret = "MAZWNQqroy8hzuHUcscWWjqpM0DvybOwx8LTtKWWXqQ0t1CNp5"
access_key = "2194205245-c05h9IBf3Wo7gLI38g5fiBS5yBIJBAisMEQLIBz"
access_secret = "RQPLFK8CNqlMv4iRnimWiE7lMGLrLICAEyUu1qOrmD1Cp"


class StreamListener(TwythonStreamer):
	filename = ""
	tweet_counter = 0
	
	def on_success(self, status):
		try:
			print(status)
			StreamListener.tweet_counter += 1
			if StreamListener.tweet_counter >= 50:
				self.disconnect()
				return True
			if not ("text" in status or "extended_tweet" in status):
				StreamListener.tweet_counter -= 1
				return
			
			if "extended_tweet" in status:
				text = status['extended_tweet']['full_text']
			else:
				text = status['text']
			
			text = re.sub('[^A-Za-z ]+', '', text)
			with open(self.filename, "a", encoding='utf-8') as f:
				f.write("%s\n" % (text))
		except Exception as exception:
			print(exception)
			return True
			
	
	def set_unique_id(self, unique_id):
		self.filename = unique_id
	
	def on_error(self, status_code):
		print("Error in stream " + str(datetime.datetime.now()))
		print("Encountered streaming error (", status_code, ")")
		sys.exit()


def get_data_from_twitter(unique_id):
	# complete authorization and initialize API endpoint
	filename = unique_id + ".csv"
	if os.path.isfile(filename):
		operation_type = "a"
	else:
		operation_type = "w"
	with open(filename, operation_type, encoding='utf-8') as f:
		f.write("text\n")
	
	stream = StreamListener(consumer_key, consumer_secret,
	                        access_key, access_secret)
	stream.set_unique_id(filename)
	stream.statuses.sample()
