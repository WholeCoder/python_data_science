from bs4 import BeautifulSoup
from backports import csv
import io

# This script will parse out the page located at: http://mlb.mlb.com/stats/sortable.jsp#elem=%5Bobject+Object%5D&tab_level=child&click_text=Sortable+Player+hitting&game_type='R'&season=2018&season_type=ANY&league_code='MLB'&sectionType=sp&statType=hitting&page=1&ts=1537337330743&playerType=QUALIFIER&sportCode='mlb'&split=&team_id=&active_sw=&position=&page_type=SortablePlayer&sortOrder='desc'&sortColumn=avg&results=&perPage=50&timeframe=&last_x_days=&extended=0

def print_property(link, clss, name_of_property):
    if "active" in clss: return

    name = link.find_all('td', class_=clss)[0]

    if (len(name) > 0):
        if "," in name.contents[0]:
            splt = name.contents[0].split(",")
            name.contents[0] = splt[1] + " " + splt[0]

            println("s == ",s[0],"   s1 == ", s[1])
        print(name_of_property, ":  ", unicode(name.contents[0]))
        listToWriteValuesToCSV.append(unicode(name.contents[0]))
        # listToWriteValuesToCSV.append(unicode(","))
        # print("active not in clss class == "+clss)
    # else:
    #     print("active in class class == "+clss)
    # p.agent_info = u' '.join((agent_contact, agent_telno)).encode('utf-8').strip()
    # str(integer).decode("utf-8")
    # agent_info = u' '.join((name_of_property,name.contents[0])).encode('utf-8').strip()
    # print(agent_info)
listToWritopeneValuesToCSV = []

with open('input_mlb_stats.com.html') as infile:
    soup = BeautifulSoup(infile , 'html.parser')

    with io.open("stats.csv", 'w', newline='', encoding='utf-8') as f:
        # writer = csv.writer(f)
        spamwriter = csv.writer(f, delimiter=unicode(","),
                        quotechar=unicode("'"), quoting=csv.QUOTE_MINIMAL)
        spamwriter.writerow(['RK','Player','Team','Pos','G','AB','R','H','2B','3B','HR','RBI','BB','SO','SB','CS','AVG','OBP','SLG','OPS','IBB','HBP','SAC','SF','TB','XBH','GDP','GO','AO','GO_AO','NP','PA'])

        links = soup.find_all('tr', tabindex=0)
        for link in links:
            listToWriteValuesToCSV = []

            name = link.find_all('td', class_="dg-name_display_last_init")

            aa = name[0].find_all('a')
            print(aa[0].contents[0])
            # print_property(link, "dg-name_display_last_init", "Player")
            # with open('eggs.csv', 'wb') as csvfile:
            #     spamwriter = csv.writer(csvfile, delimiter=' ',
            #                     quotechar='|', quoting=csv.QUOTE_MINIMAL)
            #     spamwriter.writerow(['RK','Player','Team','Pos','G','AB','R','H','2B','3B','HR','RBI','BB','SO','SB','CS','AVG','OBP','SLG','OPS','IBB','HBP','SAC','SF','TB','XBH','GDP','GO','AO','GO_AO','NP','PA'])

            print_property(link, "dg-rank", "RK")
            # print_property(link, "dg-name_display_last_init", "Player")
            playerString = aa[0].contents[0].split(",")[1] + " " + aa[0].contents[0].split(",")[0]
            print("Player", ":  ", unicode(playerString))
            listToWriteValuesToCSV.append(playerString.strip())
            print_property(link, "dg-team_abbrev", "Team")
            print_property(link, "dg-pos", "Pos")
            print_property(link, "dg-g", "G")
            print_property(link, "dg-ab", "AB")
            print_property(link, "dg-r", "R")
            print_property(link, "dg-h", "H")
            print_property(link, "dg-d", "2B")
            print_property(link, "dg-t", "3B")
            print_property(link, "dg-hr", "HR")
            print_property(link, "dg-rbi", "RBI")
            print_property(link, "dg-bb", "BB")
            print_property(link, "dg-so", "SO")
            print_property(link, "dg-sb", "SB")
            print_property(link, "dg-cs", "CS")
            print_property(link, "dg-avg", "AVG")
            print_property(link, "dg-obp", "OBP")
            print_property(link, "dg-slg", "SLG")
            print_property(link, "dg-ops", "OPS")
            print_property(link, "dg-ibb", "IBB")
            print_property(link, "dg-hbp", "HBP")
            print_property(link, "dg-sac", "SAC")
            print_property(link, "dg-sf", "SF")
            print_property(link, "dg-tb", "TB")
            print_property(link, "dg-xbh", "XBH")
            print_property(link, "dg-gidp", "GDP")
            print_property(link, "dg-go", "GO")
            print_property(link, "dg-ao", "AO")
            print_property(link, "dg-go_ao", "GO_AO")
            print_property(link, "dg-np", "NP")
            print_property(link, "dg-tpa", "PA")

            # name = link.find_all('td', class_="dg-rank")[0]
            #
            # print(name.contents[0])
            for ele in listToWriteValuesToCSV:
                print(ele)
            # print("\n\n"+listToWriteValuesToCSV)
            spamwriter.writerow(listToWriteValuesToCSV)
