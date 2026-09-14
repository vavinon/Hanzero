"""
Script to download and organize rich HSK 3.0 vocabulary (Levels 1 to 9)
into separate, well-structured JSON files in data/hsk/
"""

import urllib.request
import csv
import json
import os
import re

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "hsk")
os.makedirs(DATA_DIR, exist_ok=True)

COMPLETE_URL = "https://raw.githubusercontent.com/drkameleon/complete-hsk-vocabulary/main/complete.json"
HSK_CHARS_URL = "https://raw.githubusercontent.com/ivankra/hsk30/master/hsk30-chars.csv"
HSK_GRAMMAR_URL = "https://raw.githubusercontent.com/ivankra/hsk30/master/hsk30-grammar.csv"

def fetch_json(url):
    print(f"Downloading JSON: {url} ...")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))

def fetch_csv(url):
    print(f"Downloading CSV: {url} ...")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        content = resp.read().decode("utf-8")
    return list(csv.reader(content.splitlines()))

def process_vocabulary():
    data = fetch_json(COMPLETE_URL)
    print(f"Loaded {len(data)} total entries from complete dictionary.")

    levels = {
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
        "7-9": []
    }

    tag_to_level = {
        "new-1": "1",
        "new-2": "2",
        "new-3": "3",
        "new-4": "4",
        "new-5": "5",
        "new-6": "6",
        "new-7": "7-9"
    }

    for item in data:
        # Determine HSK 3.0 level
        lvl_key = None
        for tag in item.get("level", []):
            if tag in tag_to_level:
                lvl_key = tag_to_level[tag]
                break

        if not lvl_key:
            continue

        # Extract old HSK level if present
        old_lvl = None
        for tag in item.get("level", []):
            if tag.startswith("old-"):
                try:
                    old_lvl = int(tag.replace("old-", ""))
                except ValueError:
                    pass

        # Primary form
        forms = item.get("forms", [])
        primary_form = forms[0] if forms else {}
        transcriptions = primary_form.get("transcriptions", {})

        entry = {
            "hanzi": item.get("simplified", ""),
            "traditional": primary_form.get("traditional", ""),
            "pinyin": transcriptions.get("pinyin", ""),
            "pinyin_tone": transcriptions.get("numeric", ""),
            "bopomofo": transcriptions.get("bopomofo", ""),
            "radical": item.get("radical", ""),
            "level": int(lvl_key) if lvl_key != "7-9" else "7-9",
            "level_old": old_lvl,
            "frequency": item.get("frequency", None),
            "pos": item.get("pos", []),
            "definitions": primary_form.get("meanings", []),
            "classifiers": primary_form.get("classifiers", []),
            "meaning_th": ""  # Reserved for Thai translation
        }

        levels[lvl_key].append(entry)

    summary = {
        "standard": "HSK 3.0 (with HSK 2.0 cross-reference)",
        "total_words": sum(len(v) for v in levels.values()),
        "levels": {}
    }

    for lvl, items in levels.items():
        # Sort items by frequency or pinyin for clean indexing
        items.sort(key=lambda x: (x.get("frequency") or 999999))
        for idx, itm in enumerate(items, 1):
            prefix = f"hsk{lvl}" if lvl != "7-9" else "hsk7_9"
            itm["id"] = f"{prefix}_{idx:04d}"

        file_name = f"hsk{lvl}.json" if lvl != "7-9" else "hsk7-9.json"
        target_path = os.path.join(DATA_DIR, file_name)
        with open(target_path, "w", encoding="utf-8") as f:
            json.dump(items, f, ensure_ascii=False, indent=2)
        summary["levels"][lvl] = {
            "file": file_name,
            "count": len(items)
        }
        print(f"Saved {file_name}: {len(items)} words with definitions & transcriptions")

    with open(os.path.join(DATA_DIR, "summary.json"), "w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    print("All vocabulary levels saved successfully!")

def process_characters():
    rows = fetch_csv(HSK_CHARS_URL)
    header = rows[0]
    data = rows[1:]
    chars_by_level = {}
    for row in data:
        if not row or len(row) < 5:
            continue
        lvl = row[4].strip()
        chars_by_level.setdefault(lvl, []).append({
            "id": row[0].strip(),
            "char": row[1].strip(),
            "traditional": row[2].strip(),
            "pinyin": row[3].strip(),
            "level": lvl
        })

    target_path = os.path.join(DATA_DIR, "characters.json")
    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(chars_by_level, f, ensure_ascii=False, indent=2)
    print(f"Saved characters.json: {sum(len(v) for v in chars_by_level.values())} characters")

def process_grammar():
    rows = fetch_csv(HSK_GRAMMAR_URL)
    header = rows[0]
    data = rows[1:]
    grammar_items = []
    for row in data:
        if not row or len(row) < 5:
            continue
        grammar_items.append({
            "id": row[0].strip(),
            "level": row[1].strip(),
            "category": row[2].strip(),
            "subcategory": row[3].strip(),
            "point": row[4].strip()
        })

    target_path = os.path.join(DATA_DIR, "grammar.json")
    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(grammar_items, f, ensure_ascii=False, indent=2)
    print(f"Saved grammar.json: {len(grammar_items)} grammar points")

if __name__ == "__main__":
    process_vocabulary()
    process_characters()
    process_grammar()
