input_file = "words.txt"
output_file = "words.json"

with open(input_file, "r") as f, open(output_file, "w") as out:
    for line in f:
        word = line.strip()
        if word:
            out.write(f'{{ "word": "{word}" }}\n')

print(f"Created {output_file}")