import csv
from datetime import datetime, timedelta

input_file = "words.txt"
output_file = "words.csv"

# Start from 20 October 2025
start_date = datetime.strptime("20-10-2025", "%d-%m-%Y")

with open(input_file, "r") as f, open(output_file, "w", newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
    writer.writerow(["word", "date"]) 

    for i, line in enumerate(f):
        word = line.strip()
        if word:
            date = start_date + timedelta(days=i)
            formatted_date = date.strftime("%d-%m-%Y")  
            writer.writerow([word.upper(), formatted_date])

print(f" Created {output_file} with dates")
