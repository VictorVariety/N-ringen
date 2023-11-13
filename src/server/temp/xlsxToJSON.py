import os
import pandas as pd
import json

script_dir = os.path.dirname(os.path.abspath(__file__))
excel_file = os.path.join(script_dir, 'Matvaretabellen2022.xlsx')

df = pd.read_excel(excel_file, header=2)

key_mapping = {
    "Matvare": "Matvare",
    "Spiselig del": "SpiseligDel",
    "Kilokalorier": "Kcal",
    "Protein": "Protein",
    "Fett": "Fett",
    "Karbohydrat": "Karbohydrat",
    "Sukker, tilsatt": "TilsattSukker",
    "Kostfiber": "Kostfiber",
    "Salt": "Salt",
    "Omega-3": "Omega3",
    "Omega-6": "Omega6",
    "Vitamin A": "VitaminA",
    "Retinol": "Retinol",
    "Beta-karoten": "BetaKaroten",
    "Vitamin D": "VitaminD",
    "Vitamin E": "VitaminE",
    "Tiamin": "Tiamin",
    "Riboflavin": "Riboflavin",
    "Niacin": "Niacin",
    "Vitamin B6": "VitaminB6",
    "Folat": "Folat",
    "Vitamin B12": "VitaminB12",
    "Vitamin C": "VitaminC",
    "Kalsium": "Kalsium",
    "Jern": "Jern",
    "Natrium": "Natrium",
    "Kalium": "Kalium",
    "Magnesium": "Magnesium",
    "Sink": "Sink",
    "Selen": "Selen",
    "Kopper": "Kopper",
    "Fosfor": "Fosfor",
    "Jod": "Jod"
}

selected_columns = ['Matvare', 'Spiselig del', 'Kilokalorier', 'Protein', 'Fett', 'Karbohydrat', 'Sukker, tilsatt', 'Kostfiber', 'Salt', 'Omega-3', "Omega-6", 'Vitamin A', 'Retinol', 'Beta-karoten', 'Vitamin D',
                    'Vitamin E', 'Tiamin', 'Riboflavin', 'Niacin', 'Vitamin B6', 'Folat', 'Vitamin B12', 'Vitamin C', 'Kalsium', 'Jern', 'Natrium', 'Kalium', 'Magnesium', 'Sink', 'Selen', 'Kopper', 'Fosfor', 'Jod']

json_data = []

for _, row in df.iterrows():
    if not row[selected_columns].isnull().any():
        food_item = {key_mapping[col]: row[col] for col in selected_columns}
        json_data.append(food_item)

json_data.sort(key=lambda x: x["Matvare"])

formatted_data = []
for obj in json_data:
    modified_obj = {key.replace(
        '"', ''): value for key, value in obj.items()}
    formatted_data.append(modified_obj)


with open('Matvarer.json', 'w', encoding='utf-8') as json_file:
    json.dump(formatted_data, json_file, ensure_ascii=False, indent=4)

print("JSON data saved as Matvarer.json at: ", os.getcwd())
