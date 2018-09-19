from bs4 import BeautifulSoup

def print_property(link, clss, name_of_property):
    name = link.find_all('td', class_=clss)[0]

    print(name_of_property, ":  ", unicode(name.contents[0]))
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

        # print_property(link, "dg-rank",2)
        # print_property(link, "dg-name_display_last_init",&nbsp;<a href="http://mlb.mlb.com/team/player.jsp?player_id=502110">Martinez, J</a>)
        print_property(link, "dg-team_abbrev","BOS")
        print_property(link, "dg-active_sw","active-sw")
        print_property(link, "dg-player_id",502110)
        print_property(link, "dg-pos","LF")
        print_property(link, "dg-g",140)
        print_property(link, "dg-ab",537)
        print_property(link, "dg-r",106)
        print_property(link, "dg-h",176)
        print_property(link, "dg-d",36)
        print_property(link, "dg-t",1)
        print_property(link, "dg-hr",41)
        print_property(link, "dg-rbi",122)
        print_property(link, "dg-bb",63)
        print_property(link, "dg-so",140)
        print_property(link, "dg-sb",5)
        print_property(link, "dg-cs",1)
        print_property(link, "dg-avg active",.328)
        print_property(link, "dg-obp",.398)
        print_property(link, "dg-slg",.628)
        print_property(link, "dg-ops",1.026)
        print_property(link, "dg-ibb",10)
        print_property(link, "dg-hbp",4)
        print_property(link, "dg-sac",0)
        print_property(link, "dg-sf",6)
        print_property(link, "dg-tb",337)
        print_property(link, "dg-xbh",78)
        print_property(link, "dg-gidp",18)
        print_property(link, "dg-go",142)
        print_property(link, "dg-ao",103)
        print_property(link, "dg-go_ao",1.38)
        print_property(link, "dg-np",2381)
        print_property(link, "dg-tpa",610)

        # name = link.find_all('td', class_="dg-rank")[0]
        #
        # print(name.contents[0])
        print("\n\n")
