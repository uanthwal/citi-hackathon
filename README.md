## Predicting Market Triggers

### Description
Macro Events impact the Business function of CITI  because of its geopolitical volatility and unpredictability. When Macro events trigger the market and have a long-term impact it is considered as a “ Macro Trend “ which has a ripple effect on Financial Markets. Oftentimes, the Potential Impact is realized too late.!

### Application Available on
http://ec2-23-22-153-152.compute-1.amazonaws.com/

### Objective

To develop the model which predicts the factors affecting the market movement events ahead of the News Channels across the world.
Grouping of Events in a Trend which will affect the market.

### Solution Approach

1. We have created a web application that collects real-time data from various sources like Twitter, news API, etc., and provides insights on which asset classes will impact the market in the near future.

2. Our approach is to identify the micro trend happening in social networking platforms and then analyzing with our asset classes ( metadata) to figure out the macro trend. 

3. Our market prediction is based on 9 asset classes which will have a potential impact on the financial market across the globe.

### Application Architecture
![image](https://user-images.githubusercontent.com/20668283/109375727-fa98bb00-788c-11eb-8068-a4d3d9348d3b.png)

### Tools & Technologies Used
<img width="309" alt="Screen Shot 2021-02-26 at 11 50 05 PM" src="https://user-images.githubusercontent.com/20668283/109375787-5bc08e80-788d-11eb-8a7d-8187f52eec0c.png">

### Landing Page
![image](https://user-images.githubusercontent.com/20668283/109375737-0f754e80-788d-11eb-8a1d-1d1c16ca5db4.png)

#### Live Stream Option:
1. This feature is password protected as there are limitations of free twitter and news api developer account.
2. Once a valid password is provided, the app polls for livestream of feeds from twitter and news api.
3. The current configuration makes 1 request every 4 seconds which pulls around 250 news feeds from the internet.
4. After 6 requests the live stream is forcefully stopped (as twitter and news api may block the account for extracting a large chunk of data within a short span of time).

#### Previous Trends:
1. Everytime we do a live stream we generate processed and cleaned files.
2. These cleaned files are used to create the trends whenever user clicks on previous trends option.

### Visualization Dashboard
![image](https://user-images.githubusercontent.com/20668283/109375742-19974d00-788d-11eb-9a19-ca083732bca2.png)

### Local Setup
#### FrontEnd:
1. Clone the code on your local system using `git clone https://github.com/uanthwal/citi-hackathon.git`
2. Navigate to FrontEnd folder
3. Install all the dependencies using `npm install`
4. Start the angular app using `ng serve`

#### Backend
1. As the code is already clone in previous steps, navigate to Backend folder
2. Install all the dependencies using `pip3 install -r requirements.txt`
3. Run the python local server using command `python3 data_extractor.py`
4. App server will be available on `http://localhost:5000/`
5. NOTE: The twitter and news APIs keys have been removed from the code. In order to make the backend server running the keys are required. 

### Future Scope

1. The Asset Classes metadata can further be extended so that all the High-Frequency Identifiers can easily fit into any particular Asset class or all the Asset Classes.

2. The sentiments behind the tweets or posts on any social platform can be further analyzed to identify its impact on asset classes more accurately.

3. The data can be extracted from various social platforms like LinkedIn etc., and integrated to identify microtrends from bigger and diverse population.

### References
1. https://twitter.com/
2. https://github.com/
3. analyze word frequency counts using twitter data and tweepy in python | earth data science - earth lab
4. https://newsapi.org/
5. https://fetchrss.com/api
6. https://developer.nytimes.com/


Got any questions for us? Please drop a mail to one of us, and we would be more than happy to revert. You can find us at mohinderbassi@gmail.com , upendraparsad99@gmail.com , pramila.mani@gmail.com
