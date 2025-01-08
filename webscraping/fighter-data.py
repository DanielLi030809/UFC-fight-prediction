from bs4 import BeautifulSoup
import requests
import csv
import lxml
import time

start_time = time.time()

# converts the units of height feature from ft to inches
def convert_to_inches(string):
    if (string == "N/A"):
         return string
    string_list = string.split("'")
    ft = int(string_list[0].strip())
    inches = int(string_list[1].replace("\"", "").strip())
    return str(ft * 12 + inches)

# Clean the string by replaxing empty values with N/A
# Also removes lbs and the double quote and replace with nothing
def clean(string):
     string = string.strip().replace(" lbs.", "").replace("\"", "")
     if string == "" or string == "--":
          return "N/A"
     else:
          return string

# Gets all the fighter urls from one page
def get_fighter_urls(page):
     urls = []
     for row in page:
          first_name = row.find("td", class_="b-statistics__table-col")
          urls.append(first_name.a.get("href"))
     return urls

# Get the total number of pages per letter
def get_number_of_pages(soup):
     page = soup.findAll("li", class_ = "b-statistics__paginate-item")
     return int(page[-2].text)

# Alphabet used to search all the pages ranked by fighter initials
alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

base_url = "http://www.ufcstats.com/statistics/fighters?char="

# Gets all the urls of all the pages
def get_all_page_urls():
     urls = []
     for letter in alphabet:
          url = base_url + letter
          # page_letter = requests.get(url)
          # soup = BeautifulSoup(page_letter.text, "lxml")
          # number_of_pages = get_number_of_pages(soup)
          urls.append(url + "&page=all")
          # for i in range(number_of_pages):
          #      if i == 0:
          #           urls.append(url)
          #      else:
          #           new_url = url + "&page=" + str(i)
          #           urls.append(new_url)
     return urls

# Retrieves a list of links for the entire ufc roster
list_of_urls = get_all_page_urls()
all_fighter_urls = []
for url in list_of_urls:
     page_to_scrape = requests.get(url)
     soup = BeautifulSoup(page_to_scrape.text, "lxml")
     page = soup.findAll("tr", attrs={"class": "b-statistics__table-row"})[2:]
     all_fighter_urls += get_fighter_urls(page)


columns = ["Full Name", "Height(inches)", "Weight(lbs)", "Reach(inches)",
            "Stance", "DOB", "SLpM.", "Str.Acc.", "SApM", "Str.Def", "TD Avg.",
            "TD Acc.", "TD Def.", "Sub. Avg.", "W", "L", "D"]
file = open("fighter-stats.csv", "w", newline="", encoding="utf-8")
writer = csv.writer(file)
writer.writerow(columns)

for fighter_url in all_fighter_urls:
     fighter_page = requests.get(fighter_url)
     soup = BeautifulSoup(fighter_page.text, "lxml")
     # Try to get the fighter's full name
     full_name_tag = soup.find("span", class_='b-content__title-highlight')
     full_name = full_name_tag.text.strip() if full_name_tag else "N/A"
     attributes = soup.findAll("li", class_="b-list__box-list-item b-list__box-list-item_type_block")

     fighter_attributes = [full_name]
     for i, attribute in enumerate(attributes):
          if i == 9:
               continue# Get all text
          i_text = attribute.i.text.strip()  # Get text inside <i>
          attribute = attribute.text.strip()

          result_text = attribute.replace(i_text, "").strip()
          fighter_attributes.append(clean(result_text))

     record = soup.find("span", class_='b-content__title-record').text.strip()
     fighter_attributes.append(record)
     writer.writerow(fighter_attributes)

file.close()

end_time = time.time()

print(f"Total time taken: {end_time - start_time} seconds")




