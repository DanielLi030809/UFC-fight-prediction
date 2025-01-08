from bs4 import BeautifulSoup
import requests
import csv
import lxml

url = "http://www.ufcstats.com/statistics/events/completed?page=all"
page = requests.get(url)
soup = BeautifulSoup(page.text, "lxml")

fights = soup.find_all("tr", attrs={"class": "b-statistics__table-row"})[2:]

links = []
for fight in fights:
    link = fight.td.i.a["href"]
    links.append(link)


column = ["fighter1", "fighter2"]
file = open("fight-matchups.csv", "w", newline="", encoding="utf-8")
writer = csv.writer(file)
writer.writerow(column)

for url in links:
    page = requests.get(url)
    soup = BeautifulSoup(page.text, "lxml")



    fight_rows = soup.find_all("tr", class_ = "b-fight-details__table-row b-fight-details__table-row__hover js-fight-details-click")
    for fight_row in fight_rows:
        fighters_item = fight_row.find("td", class_ = "b-fight-details__table-col l-page_align_left")
        fighters = fighters_item.find_all("p", class_ = "b-fight-details__table-text")
        fighter1 = fighters[0].a.text.strip()
        fighter2 = fighters[1].a.text.strip()
        row = [fighter1, fighter2]
        writer.writerow(row)

file.close()
