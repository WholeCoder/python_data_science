from bs4 import BeautifulSoup
from backports import csv
import sqlite3
import io
import os

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

if os.path.exists('mlb_stats.sqlite'):
    os.remove('mlb_stats.sqlite')
conn = sqlite3.connect('mlb_stats.sqlite')
c = conn.cursor()

listToWritopeneValuesToCSV = []

with open('input_mlb_stats.com.html') as infile:
    soup = BeautifulSoup(infile , 'html.parser')

    with io.open("stats.csv", 'w', newline='', encoding='utf-8') as f:
        spamwriter = csv.writer(f, delimiter=unicode(","),
                        quotechar=unicode("'"), quoting=csv.QUOTE_MINIMAL)
        spamwriter.writerow(['RK','Player','Team','Pos','G','AB','R','H','2B','3B','HR','RBI','BB','SO','SB','CS','AVG','OBP','SLG','OPS','IBB','HBP','SAC','SF','TB','XBH','GDP','GO','AO','GO_AO','NP','PA'])

        c.execute('CREATE TABLE batters (dg_rank TEXT, dg_name_display_last_init TEXT, dg_team_abbrev TEXT, dg_pos TEXT, dg_g  TEXT, dg_ab  TEXT, dg_r  TEXT, dg_h  TEXT, dg_d  TEXT, dg_t  TEXT, dg_hr  TEXT, dg_rbi  TEXT, dg_bb  TEXT, dg_so  TEXT, dg_sb  TEXT, dg_cs  TEXT, dg_avg  TEXT, dg_obp  TEXT, dg_slg  TEXT, dg_ops  TEXT, dg_ibb  TEXT, dg_hbp  TEXT, dg_sac  TEXT, dg_sf  TEXT, dg_tb  TEXT, dg_xbh  TEXT, dg_gidp  TEXT, dg_go  TEXT, dg_ao  TEXT, dg_go_ao  TEXT, dg_np  TEXT, dg_tpa  TEXT)')

        links = soup.find_all('tr', tabindex=0)
        for link in links:
            listToWriteValuesToCSV = []

            name = link.find_all('td', class_="dg-name_display_last_init")

            aa = name[0].find_all('a')
            print(aa[0].contents[0])

            print_property(link, "dg-rank", "RK")

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

            print("\n\n")

            spamwriter.writerow(listToWriteValuesToCSV)

            c.execute("INSERT INTO batters (dg_rank, dg_name_display_last_init, dg_team_abbrev, dg_pos, dg_g , dg_ab , dg_r , dg_h , dg_d , dg_t , dg_hr , dg_rbi , dg_bb , dg_so , dg_sb , dg_cs , dg_avg , dg_obp , dg_slg , dg_ops , dg_ibb , dg_hbp , dg_sac , dg_sf , dg_tb , dg_xbh , dg_gidp , dg_go , dg_ao , dg_go_ao , dg_np , dg_tpa )"
            +" VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            listToWriteValuesToCSV)
            conn.commit()
conn.close()
