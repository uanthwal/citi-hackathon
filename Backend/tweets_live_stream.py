import datetime
import os
import sys
import re

from twython import TwythonStreamer

# Keys and token
news_api_key = ''
consumer_key = ''
consumer_secret = ''
access_key = ''
access_secret = ''


class StreamListener(TwythonStreamer):
	filename = ""
	tweet_counter = 0
	
	def on_success(self, status):
		try:
			print(status)
			StreamListener.tweet_counter += 1
			if StreamListener.tweet_counter >= 200:
				self.disconnect()
				return True
			if (not ("text" in status or "extended_tweet" in status)) or ("lang" in status and status['lang'] != "en"):
				StreamListener.tweet_counter -= 1
				return
			
			if "extended_tweet" in status:
				text = status['extended_tweet']['full_text']
			else:
				text = status['text']
			
			if text.startswith("RT"):
				splitted_tweet = text.split(":")
				if len(splitted_tweet) > 0:
					text = text.split(":")[1]
					
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
