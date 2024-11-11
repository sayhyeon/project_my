from bs4 import BeautifulSoup
import requests
import sys


# 인자로 전달된 값 받기
input_value = sys.argv[1]
# print("test")
# print(type(input_value))

html = requests.get(f"https://dhlottery.co.kr/gameResult.do?method=byWin&drwNo={input_value}")
#pprint(html.text)

soup = BeautifulSoup(html.text, 'html.parser')
# print(soup)

data1 = soup.find('div', {'class': 'win_result'})
data1

lotto = open("로또 번호.txt", "a")
for i in range(0,7) :
    data2 = data1.findAll('span')[i].text
    print(data2)
    lotto.write(data2 + ",")
lotto.close()