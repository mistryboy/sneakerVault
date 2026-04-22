from rembg import remove
from PIL import Image
import io

input_path = r"d:\the paralaxx\sneaker-vault\public\Gemini_Generated_Image_eao2f5eao2f5eao2.png"
output_path = r"d:\the paralaxx\sneaker-vault\public\hero-sneaker.png"

with open(input_path, "rb") as f:
    input_data = f.read()

output_data = remove(input_data)

img = Image.open(io.BytesIO(output_data))
img.save(output_path, "PNG")
print(f"Background removed! Saved to {output_path}")
