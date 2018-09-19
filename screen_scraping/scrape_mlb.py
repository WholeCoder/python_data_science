from bs4 import BeautifulSoup

def print_property(link, clss, name_of_property):
    if "active" in clss: return

    name = link.find_all('td', class_=clss)[0]

    if (len(name) > 0):
        print(name_of_property, ":  ", unicode(name.contents[0]))
        # print("active not in clss class == "+clss)
    # else:
    #     print("active in class class == "+clss)
    # p.agent_info = u' '.join((agent_contact, agent_telno)).encode('utf-8').strip()
    # str(integer).decode("utf-8")
    # agent_info = u' '.join((name_of_property,name.contents[0])).encode('utf-8').strip()
    # print(agent_info)

with open('/home/rpierich/delme/python_data_science/screen_scraping/Sortable Player Stats | MLB.com.html') as infile:
    soup = BeautifulSoup(infile , 'html.parser')

    links = soup.find_all('tr', tabindex=0)
    for link in links:
        name = link.find_all('td', class_="dg-name_display_last_init")

        print_property(link, "dg-rank", "Rank")

        aa = name[0].find_all('a')
        print(aa[0].contents[0])

        print_property(link, "dg-rank", "RK")
        print_property(link, "dg-name_display_last_init", "Player")
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
        print("\n\n")
