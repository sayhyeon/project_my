from bs4 import BeautifulSoup
import requests

html = requests.get('https://dhlottery.co.kr/gameResult.do?method=byWin&drwNo=900')
#pprint(html.text)

soup = BeautifulSoup(html.text, 'html.parser')
# print(soup)

data1 = soup.find('div', {'class': 'win_result'})
data1

i = 0
for i in range(0,7) :
    data2 = data1.findAll('span')[i].text
    print(data2)
    lotto = open("로또 번호.txt", "a")
    lotto.write(data2 + ",")
    lotto.close()
    
    i = i + 1