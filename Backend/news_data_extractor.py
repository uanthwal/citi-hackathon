import json
import random
import re
from datetime import datetime

import requests

import asset_classes as ac

news_api_key = '361702519b5045f1b37cade707a2aa2e'
news_api_end_point = 'https://newsapi.org/v2/everything'
assets_list = ac.get_all_asset_classes();
filename = ""


def write_response_data_to_file(data):
	existing_data = []
	for d in data:
		content_str = ''
		if d['content'] is None:
			content_str = d['description']
		else:
			content_str = d['content']
		
		data_obj = {
			'text': re.sub('\W+', ' ', content_str)
		}
		existing_data.append(data_obj)
	
	with open(filename, 'w+') as file:
		file.write(json.dumps(existing_data))


def get_data_from_news_api(unique_id):
	filename = unique_id + ".json"
	for key in assets_list:
		curr_list = assets_list[key]
		k = 12
		if len(curr_list) < k:
			k = len(curr_list)
		random_items = random.choices(population=curr_list, k=k)
		for q_keyword in random_items:
			response = requests.get(
				news_api_end_point,
				params={'q': q_keyword, 'from': datetime.today().strftime('%Y-%m-%d'), 'apiKey': news_api_key,
				        'page': 1},
			)
			response_json = (json.loads(response.text))
			if not ('code' in response_json and response_json['code'] == 'rateLimited'):
				open(filename, "w").close()  # clearing file content
			data_list = []
			if 'articles' in response_json:
				data_list.append(response_json['articles'])
				write_response_data_to_file(data_list)
			else:
				print('Error in News API Response: ' + json.dumps(response_json))