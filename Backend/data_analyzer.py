import collections
import itertools
import os
import re
import warnings
import nltk
import nltk.data
import pandas as pd
import seaborn as sns
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

warnings.filterwarnings("ignore")


def remove_url(txt):
	return " ".join(re.sub("([^0-9A-Za-z \t])|(\w+:\/\/\S+)", "", txt).split())


def convert_string_to_list(string):
	list1 = []
	list1[:0] = string
	return list1


def get_current_file_df(unique_id):
	json_pd = pd.DataFrame()
	csv_pd = pd.DataFrame()
	if os.path.isfile(unique_id + ".json"):
		json_pd = pd.read_json(unique_id + ".json")
	if os.path.isfile(unique_id + ".csv"):
		csv_pd = pd.read_csv(unique_id + ".csv", sep="\n")
	word_string = json_pd.append(csv_pd, ignore_index=True)
	return start_data_processing(word_string)
	
	
def start_data_processing(wordstring):
	sns.set(font_scale=1.5)
	sns.set_style("whitegrid")
	all_tweets_no_urls = [remove_url(tweet) for tweet in wordstring['text']]
	all_tweets_no_urls[:500000000]
	lower_case = [word.lower() for word in all_tweets_no_urls]
	set(lower_case)
	words_in_tweet = [tweet.lower().split() for tweet in all_tweets_no_urls]
	words_in_tweet[:500000000]
	all_words_no_urls = list(itertools.chain(*words_in_tweet))
	tweet_string = ' '.join([str(elem) for elem in all_words_no_urls])
	nltk.download('stopwords')
	nltk.download('punkt')
	text_tokens = word_tokenize(tweet_string[:500000000])
	STOPWORDS = ['amp', 'get', 'got', 'hey', 'hmm', 'hoo', 'hop', 'iep', 'let', 'ooo', 'par',
	             'pdt', 'pln', 'pst', 'wha', 'yep', 'yer', 'aest', 'didn', 'nzdt', 'via',
	             'one', 'com', 'new', 'like', 'great', 'make', 'top', 'awesome', 'best',
	             'good', 'wow', 'yes', 'say', 'yay', 'would', 'thanks', 'thank', 'going',
	             'new', 'use', 'should', 'could', 'really', 'see', 'want', 'nice',
	             'while', 'know', 'free', 'today', 'day', 'always', 'last', 'put', 'live',
	             'week', 'went', 'wasn', 'was', 'used', 'ugh', 'try', 'kind', 'http', 'much',
	             'need', 'next', 'app', 'ibm', 'appleevent', 'using', 'rt', 'Rt', 'RT']
	stop_words = set(STOPWORDS + stopwords.words('english'))
	list(stop_words)
	tokens_without_sw = [word for word in text_tokens if not word in stop_words]
	e = convert_string_to_list(tokens_without_sw)
	all_words_nsw = list(itertools.chain(tokens_without_sw))
	counts_nsw_1 = collections.Counter(all_words_nsw)
	response_object = {}
	counts_nsw_1.most_common(1000)
	clean_tweets_nsw_1 = pd.DataFrame(counts_nsw_1.most_common(20),
	                                  columns=['words', 'count'])
	
	response_object['word_frequency'] = clean_tweets_nsw_1.set_index('words').T.to_dict('list')
	asset_n = pd.read_csv("asset_classes.csv")
	
	asset_list = asset_n.Asset.to_list()
	common = [word for word in tokens_without_sw if word in asset_list]
	d = convert_string_to_list(common)
	all_words_nsw = list(itertools.chain(d))
	counts_nsw = collections.Counter(all_words_nsw)
	counts_nsw.most_common(1000)

	clean_tweets_nsw = pd.DataFrame(counts_nsw.most_common(10),
	                                columns=['words', 'count'])
	response_object['asset_word'] = clean_tweets_nsw.set_index('words').T.to_dict('list')
	
	df1 = pd.DataFrame(common, columns=['Asset'])
	df2 = df1.merge(asset_n, on='Asset', how='left')
	all_words_nsw = list(itertools.chain(df2['Asset']))
	counts_nsw = collections.Counter(all_words_nsw)
	counts_nsw.most_common(1000)
	all_words_nsw = list(itertools.chain(df2['Asset Classes']))
	counts_nsw = collections.Counter(all_words_nsw)
	counts_nsw.most_common(1000)
	clean_tweets_nsw = pd.DataFrame(counts_nsw.most_common(10),
	                                columns=['words', 'count'])
	
	response_object['asset_classes'] = clean_tweets_nsw.set_index('words').T.to_dict('list')
	# print(response_object)
	return response_object


def start_data_analysis(unique_id):
	if unique_id == 'historical':
		print("Going for historical analysis")
		files_list = os.listdir()
		main_df = pd.DataFrame()
		for filename in files_list:
			if (filename.endswith(".json") or filename.endswith(".csv")) and ('asset_classes' not in filename):
				if filename.endswith(".json"):
					curr_file_df = pd.read_json(filename)
				if filename.endswith(".csv"):
					curr_file_df = pd.read_csv(filename, sep="\n")
				main_df = main_df.append(curr_file_df)
		return start_data_processing(main_df)
	else:
		print("Going for live fetch analysis")
		result =  get_current_file_df(unique_id)
		if not result['asset_word']:
			return start_data_analysis('historical')
		return result

# get_current_file_df('a0334e1f-f524-49d9-be85-f1d442b70d16')