import csv
import subprocess

# Path to your CSV file
filename = "tests/backers.csv"

with open(filename, newline='') as csvfile:
    reader = list(csv.DictReader(csvfile))
    
    # Ensure there are at least two rows to compare
    if len(reader) >= 2:
        last_row = reader[-1]
        prev_row = reader[-2]
        
        last_backers = int(last_row["backers"])
        prev_backers = int(prev_row["backers"])
        
        # Compare and print result
        if last_backers > prev_backers:
            new_backers = last_backers - prev_backers

            subprocess.run(["espeak", f"You have {new_backers} new backers, for a total of {last_backers} backers"])
        else:
            print("No new backers since last update.")
    else:
        print("Not enough data to compare.")
