import csv

input_file = "words.txt"
output_file = "words.csv"

with open(input_file, "r") as f, open(output_file, "w", newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')  # ensure comma
    writer.writerow(["word"])  # header
    for line in f:
        word = line.strip()
        if word:
            writer.writerow([word.upper()])

print(f"✅ Created {output_file} ready for Supabase import")