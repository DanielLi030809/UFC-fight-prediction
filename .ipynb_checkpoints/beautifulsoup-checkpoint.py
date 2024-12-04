from bs4 import BeautifulSoup
import requests

html_text = requests.get().text
soup = BeautifulSoup(html_text, 'lxml')
jobs = soup.find_all('element_type', class_ = 'class_name')
for job in jobs:
    published_date = job.find('span', class_ = 'sim-posted').span.text
    if 'few' in published_date:
        company_name = job.find('h3', class_ = 'joblist-comp-name').text.replace(' ', '')
        skills = job.find('span', class_ = 'srp-skills').text.replace(' ', '')
        if unfamiliar_skill 
        more_info = job.header.h2.a['href']
