import openpyxl

wb = openpyxl.load_workbook("excel/demo.xlsx")

sheet1 = wb[wb.sheetnames[0]]

print("", sheet1['A2'].value)

i = 0

for row in sheet1.rows:
    i += 1
    print("row", i)

    for cel in row:
        value = cel.value
        print("", value)





wb.close()
