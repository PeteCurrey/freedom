import fitz  # PyMuPDF
import sys
import os

pdf_path = "SPREADA3_RV-USA-brochure-REV00_2024-04.pdf"
output_dir = "public/images/victron"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

try:
    doc = fitz.open(pdf_path)
except Exception as e:
    print(f"Failed to open PDF: {e}")
    sys.exit(1)

# Mapping of required output filenames to page indices (0-based)
# Based on the user's prompt: Page 2 -> index 1, Page 3 -> index 2, etc.
# Some pages might have multiple references. I will just extract the requested pages as full images.
pages_to_extract = {
    1: "brand-hero",         # Page 2
    2: "lifestyle-cooking",  # Page 3
    4: "lifestyle-bikes",    # Page 5
    5: "system-guide-hero",  # Page 6
    8: "monitoring-hero",    # Page 9
    10: "system-1",          # Page 11
    11: "system-2",          # Page 12
    12: "system-3",          # Page 13
    13: "system-4",          # Page 14
    14: "system-5",          # Page 15
    19: "why-victron",       # Page 20
}

# Add fallbacks for the alternative page numbers mentioned (e.g. 21, 23, 25, 27, 29) just in case
# "Pages 11/21", "Pages 12/23"
pages_to_extract.update({
    20: "system-1-alt",
    22: "system-2-alt",
    24: "system-3-alt",
    26: "system-4-alt",
    28: "system-5-alt",
})

for page_idx, name in pages_to_extract.items():
    if page_idx < len(doc):
        page = doc[page_idx]
        # Use high resolution
        zoom = 2.0
        mat = fitz.Matrix(zoom, zoom)
        pix = page.get_pixmap(matrix=mat, alpha=False)
        output_path = os.path.join(output_dir, f"{name}.jpg")
        pix.save(output_path)
        print(f"Saved {output_path}")
    else:
        print(f"Page {page_idx} out of bounds")

print("Done.")
