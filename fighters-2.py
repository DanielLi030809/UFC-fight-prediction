from bs4 import BeautifulSoup
import requests
import csv
import lxml
from concurrent.futures import ThreadPoolExecutor

# Converts the units of height feature from ft to inches
def convert_to_inches(string):
    if string == "N/A":
        return string
    string_list = string.split("'")
    ft = int(string_list[0].strip())
    inches = int(string_list[1].replace("\"", "").strip())
    return str(ft * 12 + inches)

# Cleans the string by replacing empty values with N/A
def clean(string):
    string = string.strip().replace(" lbs.", "").replace("\"", "")
    if string == "" or string == "--":
        return "N/A"
    else:
        return string

# Gets all the fighter URLs from one page
def get_name_urls(page):
    urls = []
    for row in page:
        first_name = row.find("td", class_="b-statistics__table-col")
        urls.append(first_name.a.get("href"))
    return urls

# Alphabet used to search all the pages ranked by fighter initials
alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

# Gets all the page URLs for each letter
def get_page_urls():
    base_url = "http://www.ufcstats.com/statistics/fighters?char="
    urls = [base_url + letter + "&page=all" for letter in alphabet]
    return urls

# Fetches fighter URLs from a single page
def fetch_fighter_urls(url):
    try:
        page_to_scrape = requests.get(url)
        soup = BeautifulSoup(page_to_scrape.text, "lxml")
        page = soup.findAll("tr", attrs={"class": "b-statistics__table-row"})[2:]
        return get_name_urls(page)
    except Exception as e:
        print(f"Error fetching fighter URLs from {url}: {e}")
        return []

def fetch_fighter_data(fighter_url):
    try:
        fighter_page = requests.get(fighter_url)
        soup = BeautifulSoup(fighter_page.text, "lxml")
        
        # Try to get the fighter's full name
        full_name_tag = soup.find("span", class_='b-content__title-highlight')
        full_name = full_name_tag.text.strip() if full_name_tag else "N/A"

        # Fetch other attributes
        attributes = soup.findAll("li", class_="b-list__box-list-item b-list__box-list-item_type_block")
        fighter_attributes = [full_name]

        for i, attribute in enumerate(attributes):
            if i == 9:
                continue  # Skip unnecessary data
            i_text = attribute.i.text.strip() if attribute.i else ""
            attribute_text = attribute.text.strip() if attribute else ""
            result_text = attribute_text.replace(i_text, "").strip()
            fighter_attributes.append(clean(result_text))

        # Try to get the record
        record_tag = soup.find("span", class_='b-content__title-record')
        record = record_tag.text.strip() if record_tag else "N/A"

        fighter_attributes.append(record)
        return fighter_attributes
    except Exception as e:
        print(f"Error fetching fighter data from {fighter_url}: {e}")
        return None


# Main process
def main():
    alphabet = list("abcdefghijklmnopqrstuvwxyz")
    list_of_urls = get_page_urls()

    # Step 1: Fetch all fighter URLs concurrently
    with ThreadPoolExecutor(max_workers=10) as executor:
        results = executor.map(fetch_fighter_urls, list_of_urls)
    
    # Flatten the list of lists into a single list of URLs
    all_fighter_urls = [url for sublist in results for url in sublist]

    # Step 2: Fetch fighter data concurrently
    columns = ["Full Name", "Height(inches)", "Weight(lbs)", "Reach(inches)",
               "Stance", "DOB", "SLpM.", "Str.Acc.", "SApM", "Str.Def", "TD Avg.",
               "TD Acc.", "TD Def.", "Sub. Avg.", "W", "L", "D"]
    
    with open("fighter-stats.csv", "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(columns)

        with ThreadPoolExecutor(max_workers=10) as executor:
            fighter_results = executor.map(fetch_fighter_data, all_fighter_urls)

            # Write each fighter's data to the CSV
            for fighter_attributes in fighter_results:
                if fighter_attributes:  # Check if data is not None
                    writer.writerow(fighter_attributes)

if __name__ == "__main__":
    main()
