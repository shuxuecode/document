#  读取word表格数据

import pandas as pd
from docx import Document

document = Document("D:/temp/1.docx")
# 定义要读取的表格
table = document.tables[0]

data = []

keys = None
for i, row in enumerate(table.rows): 
    text = (cell.text for cell in row.cells)

    if i == 0:
        keys = tuple(text)
        continue

    row_data = dict(zip(keys, text))
    data.append(row_data)

pd.DataFrame(data)

