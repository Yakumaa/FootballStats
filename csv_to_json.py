import csv
import json

csv_file_path = 'fifa_players.csv'
json_file_path = 'fifa_players.json'

with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
    reader = csv.DictReader(csv_file)
    data = list(reader)

with open(json_file_path, mode='w', encoding='utf-8') as json_file:
    json.dump(data, json_file, indent=2)

print("Conversion completed!")
