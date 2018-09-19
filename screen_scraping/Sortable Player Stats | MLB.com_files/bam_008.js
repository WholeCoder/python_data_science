(function($, window) {

    // bam namespaces
    var bam = window.bam,
        datagrid = bam.datagrid,
        datetime = bam.datetime,
        util = bam.util,
        stats = bam.stats = {},

        // Shortcuts to utility methods
        extend = $.inherit,
        proxy = $.proxy,
        eventProxy = $.eventProxy,
        getDeepValue = $.deep,
        ensureArray = $.ensureArray,
        getQueryResults = util.getQueryResults,
        getQueryResult = util.getQueryResult,
        countQueryResults = util.countQueryResults,
        wrapQueryResults = util.wrapQueryResults,

        // DataGrid classes
        DataGrid = datagrid.DataGrid,
        ExpandableDataGrid = datagrid.ExpandableDataGrid,

        // DataGrid config values
        NUMBER = datagrid.DataType.Number,
        TEXT = datagrid.DataType.Text,
        ASC = datagrid.SortOrder.Asc,
        DESC = datagrid.SortOrder.Desc,

        // Event values
        UPDATE = 'update',

        // DOM tags
        INPUT_TAG = '<input/>',
        BUTTON_TAG = '<button/>',
        LI_TAG = '<li/>',
        A_TAG = '<a/>',

        // Pagination properties
        START_PAGE = 'recSP',
        PER_PAGE = 'recPP',
        TOTAL_PAGES = 'totalP',

        // Sport and league codes
        SPORT_CODE_MLB = "'mlb'",
        LEAGUE_CODE_AL = "'AL'",
        LEAGUE_CODE_NL = "'NL'",

        // Game types
        GAME_TYPE_REGULAR_SEASON = "'R'",
        GAME_TYPE_ALL_STAR_GAME = "'A'",
        GAME_TYPE_FIRST_ROUND = "'F'",
        GAME_TYPE_DIVISION_SERIES = "'D'",
        GAME_TYPE_LEAGUE_SERIES = "'L'",
        GAME_TYPE_WORLD_SEASON = "'W'",


        // Positions
        PITCHER = "'1'",
        CATCHER = "'2'",
        FIRST_BASEMAN = "'3'",
        SECOND_BASEMAN = "'4'",
        THIRD_BASEMAN = "'5'",
        SHORTSTOP = "'6'",
        LEFT_FIELDER = "'7'",
        CENTER_FIELDER = "'8'",
        RIGHT_FIELDER = "'9'",
        DESIGNATED_HITTER = "'D'",
        ALL_OUTFIELD = "'O'",

        // Column data fields
        //2B                          = '2b',
        // 3B                          = '3b',
        A = 'a',
        AB = 'ab',
        ACTIVE_SW = 'active_sw',
        AVG = 'avg',
        AO = 'ao',
        B = 'b',
        BB = 'bb',
        BB9 = 'bb_9',
        BABIP = 'babip',
        BK = 'bk',
        BQR = 'bq',
        BQRS = 'bqs',
        BQRSTRAND = 'bq_strand',
        CERA = 'cera',
        CG = 'cg',
        CS = 'cs',
        C_WP = 'c_wp',
        D = 'd',
        DER = 'der',
        DP = 'dp',
        E = 'e',
        ER = 'er',
        ERA = 'era',
        FPCT = 'fpct',
        FILE_CODE = 'file_code',
        G = 'g',
        GF = 'gf',
        GIDP = 'gidp',
        GDP = 'gdp',
        GO = 'go',
        GOAO = 'go_ao',
        GS = 'gs',
        H = 'h',
        H9 = 'h_9',
        HB = 'hb',
        HBP = 'hbp',
        HLD = 'hld',
        HR = 'hr',
        HR9 = 'hr_9',
        IBB = 'ibb',
        INN = 'inn',
        IP = 'ip',
        IR = 'ir',
        IRS = 'irs',
        IRSTRAND = 'ir_strand',
        K9 = 'k_9',
        KBB = 'k_bb',
        L = 'l',
        LEAGUE = 'league',
        LOB = 'lob',
        MHG = 'mhg',
        NAME_DISPLAY_ROSTER = 'name_display_last_init',
        NP = 'np',
        OBP = 'obp',
        OPS = 'ops',
        PA = 'tpa',
        PB = 'pb',
        PGS = 'pgs',
        PK = 'pk',
        PLAYER_ID = 'player_id',
        PIP = 'p_ip',
        PO = 'po',
        POS = 'pos',
        POSITION = 'position',
        PPA = 'p_pa',
        QS = 'qs',
        R = 'r',
        ROE = 'roe',
        RANK = 'rank',
        RBI = 'rbi',
        RF = 'rf',
        RF9 = 'rf_9',
        RS = 'rs',
        RS9 = 'rs_9',
        RW = 'rw',
        S = 's',
        SAC = 'sac',
        SEASON = 'season',
        SB = 'sb',
        SBPCT = 'sbpct',
        SF = 'sf',
        SHO = 'sho',
        SLG = 'slg',
        SO = 'so',
        SV = 'sv',
        SVO = 'svo',
        T = 't',
        TB = 'tb',
        TBF = 'tbf',
        TC = 'tc',
        TEAM_FULL = 'team_full',
        TEAM_ABBREV = 'team_abbrev',
        W = 'w',
        WHIP = 'whip',
        WP = 'wp',
        WPCT = 'wpct',
        XBH = 'xbh',

        rate_stats = [AVG, SLG, OBP, OPS, GOAO, SBPCT, ERA, WPCT, PIP, KBB, BB9,
            K9, H9, HR9, WHIP, FPCT, RF, RF9, CERA],

        rate_stats_qualifier_message = [AVG, SLG, OBP, OPS, GOAO, ERA, WPCT, PIP, KBB, BB9,
            K9, H9, HR9, WHIP],

        // Column definitions - static label columns
        nameDisplayRosterColumn = {
            dataField: NAME_DISPLAY_ROSTER,
            type: TEXT,
            title: 'Player',
            decorator: playerNameDecorator,
            sortable: false
        },
        teamFullColumn = {
            dataField: TEAM_FULL,
            type: TEXT,
            title: 'Team',
            decorator: teamDecorator,
            sortable: false
        },
        activeSwColumn = {
            dataField: ACTIVE_SW,
            type: TEXT,
            title: '',
            sortable: false,
            visible: false
        },
        fileCodeColumn = {
            dataField: FILE_CODE,
            type: TEXT,
            title: '',
            sortable: false,
            visible: false
        },
        leagueColumn = {
            dataField: LEAGUE,
            type: TEXT,
            title: 'League',
            //decorator: replaceNullValueDecorator,
            sortable: false
        },
        playerIdColumn = {
            dataField: PLAYER_ID,
            type: TEXT,
            title: '',
            visible: false
        },
        seasonColumn = {
            dataField: SEASON,
            type: TEXT,
            title: 'Year',
            visible: true,
            sortable: false
        },
        teamAbbrevColumn = {
            dataField: TEAM_ABBREV,
            type: TEXT,
            title: 'Team',
            //decorator: replaceNullValueDecorator,
            sortable: false
        },
        posColumn = {
            dataField: POS,
            type: TEXT,
            title: 'Pos',
            //decorator: replaceNullValueDecorator,
            sortable: false
        },
        positionColumn = {
            dataField: POSITION,
            type: TEXT,
            title: 'Pos',
            //decorator: replaceNullValueDecorator,
            sortable: false
        },
        aColumn = {
            dataField: A,
            type: NUMBER,
            title: renderColumnTitleAbbr(A, 'Total Assists'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        abColumn = {
            dataField: AB,
            type: NUMBER,
            title: renderColumnTitleAbbr(AB, "The number of official at bats by a batter (official at bat defined as the number of plate appearances minus sacrifices, walks and Hit by Pitches."),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        aoBattingColumn = {
            dataField: AO,
            type: NUMBER,
            title: renderColumnTitleAbbr(AO, 'Fly Outs is the total of all fly balls hit by the batter into outs, not including line drives.'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        aoPitchingColumn = {
            dataField: AO,
            type: NUMBER,
            title: renderColumnTitleAbbr(AO, 'The number of times a batter has made an out in the air'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        avgBattingColumn = {
            dataField: AVG,
            type: NUMBER,
            title: renderColumnTitleAbbr(AVG, "The average number of hits by a batter defined by hits divided by at bats (H/AB)."),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        avgPitchingColumn = {
            dataField: AVG,
            type: NUMBER,
            title: renderColumnTitleAbbr(AVG, "The total number of hits allowed by the pitcher divided by the total number of opponent at-bats (H/AB)."),
            //decorator: replaceNullValueDecorator,
            sortState: ASC
        },
        bColumn = {
            dataField: B,
            type: NUMBER,
            title: renderColumnTitleAbbr(B, 'Balls thrown outside the strike zone'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        babipColumn = {
            dataField: BABIP,
            type: NUMBER,
            title: renderColumnTitleAbbr(BABIP, 'Batting Average on Balls In Play'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        bbBattingColumn = {
            dataField: BB,
            type: NUMBER,
            title: renderColumnTitleAbbr(BB, 'The number of walks by a batter (four balls during an at bat)'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        bbPitchingColumn = {
            dataField: BB,
            type: NUMBER,
            title: renderColumnTitleAbbr(BB, 'A pitcher is charged with a base on balls (walk) when he throws four pitches outside of the strike zone during one plate appearance.'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        bb9Column = {
            dataField: BB9,
            type: NUMBER,
            title: renderColumnTitleAbbr(BB9, 'The average number of walks issued per 9 innings by a pitcher (BB/9)'),
            //decorator: replaceNullValueDecorator,
            sortState: ASC
        },
        bkColumn = {
            dataField: BK,
            type: NUMBER,
            title: renderColumnTitleAbbr(BK, 'The number of balks by a pitcher'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        bqrColumn = {
            dataField: BQR,
            type: NUMBER,
            title: renderColumnTitleAbbr(BQR, 'Bequeathed Runners'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        bqrsColumn = {
            dataField: BQRS,
            type: NUMBER,
            title: renderColumnTitleAbbr(BQRS, 'Bequeathed Runners Scored'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        bqrstrandColumn = {
            dataField: BQRSTRAND,
            type: NUMBER,
            title: renderColumnTitleAbbr(BQRSTRAND, 'Bequeathed Runners Stranded'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        cgColumn = {
            dataField: CG,
            type: NUMBER,
            title: renderColumnTitleAbbr(CG, 'The number of games completed by a starting pitcher'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        csBattingColumn = {
            dataField: CS,
            type: NUMBER,
            title: renderColumnTitleAbbr(CS, 'The number of times a player has been put out attempting to steal a base'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        csPitchingColumn = {
            dataField: CS,
            type: NUMBER,
            title: renderColumnTitleAbbr(CS, 'The number of runners caught stealing against a pitcher'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        csFieldingColumn = {
            dataField: CS,
            type: NUMBER,
            title: renderColumnTitleAbbr(CS, 'The number of runners caught stealing by a catcher'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },

        cwpColumn = {
            dataField: C_WP,
            type: NUMBER,
            title: renderColumnTitleAbbr('C_WP', 'Total number of wild pitches while catching'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        dColumn = {
            dataField: D,
            type: NUMBER,
            title: renderColumnTitleAbbr("2B", "The number of times a batter hits the ball and reaches second base without aid of an error or fielder's choice"),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        derColumn = {
            dataField: DER,
            type: NUMBER,
            title: renderColumnTitleAbbr(DER, 'Defensive Efficiency Ratio is the rating of team defensive outs recorded in defensive opportunities. To determine Defensive Efficiency Ratio for a team, divide the total number of hits in play allowed (subtracting home runs and times reached on error) by the total number of defensive opportunities (all balls hit into play, not including home runs), and subtract from one: 1-(((H+ROE)-HR)/(PA-(SO+HBP+HR)))'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        dpColumn = {
            dataField: DP,
            type: NUMBER,
            title: renderColumnTitleAbbr(DP, 'Total double plays'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        eColumn = {
            dataField: E,
            type: NUMBER,
            title: renderColumnTitleAbbr(E, "Total Errors committed"),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        eraColumn = {
            dataField: ERA,
            type: NUMBER,
            title: renderColumnTitleAbbr(ERA, 'The average number of earned runs allowed by a pitcher; total number of earned runs allowed multiplied by 9 divided by the number of innings pitched. ((ERx9)/IP)'),
            //decorator: replaceNullValueDecorator,
            sortState: ASC
        },
        erColumn = {
            dataField: ER,
            type: NUMBER,
            title: renderColumnTitleAbbr(ER, "The total number of earned runs allowed by the pitcher."),
            ////decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        fpctColumn = {
            dataField: FPCT,
            type: NUMBER,
            title: renderColumnTitleAbbr(FPCT, 'Average of errors per total chances, Put outs plus Assists divided Putouts plus assists plus errors (PO+A)/(PO+A+E)'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        gsPitchingColumn = {
            dataField: GS,
            type: NUMBER,
            title: renderColumnTitleAbbr(GS, 'Games started as the pitcher'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        gsFieldingColumn = {
            dataField: GS,
            type: NUMBER,
            title: renderColumnTitleAbbr(GS, 'Games started in the field'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        gBattingColumn = {
            dataField: G,
            type: NUMBER,
            title: renderColumnTitleAbbr(G, 'The number of games in which a player has appeared.'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        gPitchingColumn = {
            dataField: G,
            type: NUMBER,
            title: renderColumnTitleAbbr(G, 'The total number of games in which the pitcher appeared, whether as the starter or as a reliever.'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        gFieldingColumn = {
            dataField: G,
            type: NUMBER,
            title: renderColumnTitleAbbr(G, 'Games played in the field'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        gfColumn = {
            dataField: GF,
            type: NUMBER,
            title: renderColumnTitleAbbr(GF, 'A pitcher is credited with a game finished if he is the last relief pitcher for his team in a game and was not the starting pitcher.'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        gidpBattingColumn = {
            dataField: GIDP,
            type: NUMBER,
            title: renderColumnTitleAbbr(GDP, 'The number of times a batter has grounded into a double play'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        gidpPitchingColumn = {
            dataField: GIDP,
            type: NUMBER,
            title: renderColumnTitleAbbr(GIDP, 'The number of times a pitcher induces a batter to ground into a double play'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        goBattingColumn = {
            dataField: GO,
            type: NUMBER,
            title: renderColumnTitleAbbr(GO, 'The number of times a batter has made an out on a ground ball'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        goPitchingColumn = {
            dataField: GO,
            type: NUMBER,
            title: renderColumnTitleAbbr(GO, 'The total of all ground balls hit into outs against the pitcher by opposing batters, not including bunts.'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        goaoBattingColumn = {
            dataField: GOAO,
            type: NUMBER,
            title: renderColumnTitleAbbr(GOAO, 'Ratio of outs made by a batter on the ground versus the air'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        goaoPitchingColumn = {
            dataField: GOAO,
            type: NUMBER,
            title: renderColumnTitleAbbr(GOAO, 'Ratio of outs made on the ground v. the air by a pitcher'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        hBattingColumn = {
            dataField: H,
            type: NUMBER,
            title: renderColumnTitleAbbr(H, "The number of times a batter hits the ball and reaches bases safely without aid of an error or fielder's choice"),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        hPitchingColumn = {
            dataField: H,
            type: NUMBER,
            title: renderColumnTitleAbbr(H, 'The number of hits allowed by a pitcher'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        h9Column = {
            dataField: H9,
            type: NUMBER,
            title: renderColumnTitleAbbr(H9, 'The average number of hits allowed per 9 innings by a pitcher (H/9)'),
            //decorator: replaceNullValueDecorator,
            sortState: ASC
        },
        hbColumn = {
            dataField: HB,
            type: NUMBER,
            title: renderColumnTitleAbbr(HB, 'Hit Batsmen. The number of batters hit by a pitch.'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        hbpColumn = {
            dataField: HBP,
            type: NUMBER,
            title: renderColumnTitleAbbr(HBP, 'The number of times a batter has been hit by pitch'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        hldColumn = {
            dataField: HLD,
            type: NUMBER,
            title: renderColumnTitleAbbr(HLD, 'The number of times a pitcher enters a game in a save situation, pitches .1 IP,does not surrender the lead and does not finish the game'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        hrBattingColumn = {
            dataField: HR,
            type: NUMBER,
            title: renderColumnTitleAbbr(HR, "The number of times a batter hits the ball and reaches home plate scoring a run either by hitting the ball out of play in fair territory or without aid of an error or fielder's choice"),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        hrPitchingColumn = {
            dataField: HR,
            type: NUMBER,
            title: renderColumnTitleAbbr(HR, 'The number of home runs allowed by a pitcher'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        hr9Column = {
            dataField: HR9,
            type: NUMBER,
            title: renderColumnTitleAbbr(HR9, 'Home Runs per 9 Innings Pitched'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        ibbBattingColumn = {
            dataField: IBB,
            type: NUMBER,
            title: renderColumnTitleAbbr(IBB, "The number of times a batter was walked intentionally"),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        ibbPitchingColumn = {
            dataField: IBB,
            type: NUMBER,
            title: renderColumnTitleAbbr(IBB, "The number of intentional walks issued by a pitcher"),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        innColumn = {
            dataField: INN,
            type: NUMBER,
            title: renderColumnTitleAbbr(INN, 'The total number of innings played by a fielder. The fielder is credited for one-third inning for each out recorded while he is on the field defensively.'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        ipColumn = {
            dataField: IP,
            type: NUMBER,
            title: renderColumnTitleAbbr(IP, 'The total number of innings pitched by the pitcher. The pitcher is credited for one-third inning for each out he records.'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        irColumn = {
            dataField: IR,
            type: NUMBER,
            title: renderColumnTitleAbbr(IR, 'Inherited Runners'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        irsColumn = {
            dataField: IRS,
            type: NUMBER,
            title: renderColumnTitleAbbr(IRS, 'Inherited Runners Scored'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        irstrandColumn = {
            dataField: IRSTRAND,
            type: NUMBER,
            title: renderColumnTitleAbbr(IRSTRAND, 'Inherited Runners Stranded'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        k9Column = {
            dataField: K9,
            type: NUMBER,
            title: renderColumnTitleAbbr(K9, 'The average number of strikeouts per 9 innings by a pitcher (K/9)'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        kbbColumn = {
            dataField: KBB,
            type: NUMBER,
            title: renderColumnTitleAbbr(KBB, 'Number of strikeouts versus walks for a pitcher, strikeouts divided by walks (K/BB)'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        lColumn = {
            dataField: L,
            type: NUMBER,
            title: renderColumnTitleAbbr(L, 'The number of losses charged to a pitcher'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        lobColumn = {
            dataField: LOB,
            type: NUMBER,
            title: renderColumnTitleAbbr(LOB, 'The total number of baserunners who were on base by any means, and did not score and/or were not put out, during all at-bats in which the pitcher recorded an out.'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        mhgColumn = {
            dataField: MHG,
            type: NUMBER,
            title: renderColumnTitleAbbr(MHG, 'Multi-Hit Games'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        npBattingColumn = {
            dataField: NP,
            type: NUMBER,
            title: renderColumnTitleAbbr(NP, "The total number of pitches thrown during all of the batter's plate appearances."),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        npPitchingColumn = {
            dataField: NP,
            type: NUMBER,
            title: renderColumnTitleAbbr(NP, 'The total number of pitches thrown by the pitcher.'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        obpColumn = {
            dataField: OBP,
            type: NUMBER,
            title: renderColumnTitleAbbr(OBP, 'The number of times each batter reaches base by hit, walk or hit by pitch, divided by plate appearances including at-bats, walks, hit by pitch and sacrifice flies (H+BB+HBP)/(AB+BB+HBP+SF)'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        opsColumn = {
            dataField: OPS,
            type: NUMBER,
            title: renderColumnTitleAbbr(OPS, 'On-base percentage plus slugging (OBP + SLG)'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        obpPitchingColumn = {
            dataField: OBP,
            type: NUMBER,
            title: renderColumnTitleAbbr(OBP, 'On base percentage against a pitcher (H+BB+HBP)/(AB+BB+HBP+SF)'),
            //decorator: replaceNullValueDecorator,
            sortState: ASC
        },
        opsPitchingColumn = {
            dataField: OPS,
            type: NUMBER,
            title: renderColumnTitleAbbr(OPS, 'On-base Percentage plus Slugging Percentage against a pitcher (OBP+SLG)'),
            //decorator: replaceNullValueDecorator,
            sortState: ASC
        },
        paColumn = {
            dataField: PA,
            type: NUMBER,
            title: renderColumnTitleAbbr('PA', 'The number of times a batter has appeared at the plate (AB+BB+HBP+SF)'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        pbColumn = {
            dataField: PB,
            type: NUMBER,
            title: renderColumnTitleAbbr(PB, 'Total number of passed balls by a catcher'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        pgsColumn = {
            dataField: PGS,
            type: NUMBER,
            title: renderColumnTitleAbbr(PGS, 'Pitches per Game Start'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        pipColumn = {
            dataField: PIP,
            type: NUMBER,
            title: renderColumnTitleAbbr(PIP, 'Number of pitches thrown per a pitcher divided by the number of innings pitched (P/IP)'),
            //decorator: replaceNullValueDecorator,
            sortState: ASC
        },
        poColumn = {
            dataField: PO,
            type: NUMBER,
            title: renderColumnTitleAbbr(PO, 'A putout is credited to a fielder when catches a fly ball or a line drive, whether fair or foul, catches a thrown ball which puts out a batter or runner, or tags a runner when the runner is off the base to which he legally is entitled.'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        ppaColumn = {
            dataField: PPA,
            type: NUMBER,
            title: renderColumnTitleAbbr(PPA, 'Pitchers per Plate Appearance'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        pkColumn = {
            dataField: PK,
            type: NUMBER,
            title: renderColumnTitleAbbr(PK, 'The number of pickoffs by a pitcher'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        qsColumn = {
            dataField: QS,
            type: NUMBER,
            title: renderColumnTitleAbbr(QS, 'Quality Starts'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        rankColumn = {
            dataField: RANK,
            type: NUMBER,
            title: renderColumnTitleAbbr('Rk', 'Rank'),
            //decorator: replaceNullValueDecorator,
            sortable: false
        },
        rwColumn = {
            dataField: RW,
            type: NUMBER,
            title: renderColumnTitleAbbr(RW, 'Relief Wins'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        rBattingColumn = {
            dataField: R,
            type: NUMBER,
            title: renderColumnTitleAbbr(R, 'The number of times a baserunner safely reaches home plate'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        rPitchingColumn = {
            dataField: R,
            type: NUMBER,
            title: renderColumnTitleAbbr(R, 'The number of runs allowed by a pitcher'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        rfColumn = {
            dataField: RF,
            type: NUMBER,
            title: renderColumnTitleAbbr(RF, 'Range Factor.  Total number of outs participated in, divide putouts and assists by number of innings or games played at a position ((PO+A)/INN)'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        rbiColumn = {
            dataField: RBI,
            type: NUMBER,
            title: renderColumnTitleAbbr(RBI, 'The number of runs that score safely due to a batter hitting a ball or drawing a base on balls'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        roeColumn = {
            dataField: ROE,
            type: NUMBER,
            title: renderColumnTitleAbbr(ROE, 'Reached on Error'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        rsColumn = {
            dataField: RS,
            type: NUMBER,
            title: renderColumnTitleAbbr(RS, 'Run Support'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        rs9Column = {
            dataField: RS9,
            type: NUMBER,
            title: renderColumnTitleAbbr(RS9, 'Run Support per 9 Innings'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        sColumn = {
            dataField: S,
            type: NUMBER,
            title: renderColumnTitleAbbr(S, 'Strikes'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        sacColumn = {
            dataField: SAC,
            type: NUMBER,
            title: renderColumnTitleAbbr(SAC, 'The number of sacrifice bunts by a batter'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        sbBattingColumn = {
            dataField: SB,
            type: NUMBER,
            title: renderColumnTitleAbbr(SB, "The number of times a player has stolen a base"),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        sbPitchingColumn = {
            dataField: SB,
            type: NUMBER,
            title: renderColumnTitleAbbr(SB, "The number of stolen bases allowed by a pitcher"),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        sbFieldingColumn = {
            dataField: SB,
            type: NUMBER,
            title: renderColumnTitleAbbr(SB, "The number of stolen bases allowed by a catcher."),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        sbpctColumn = {
            dataField: SBPCT,
            type: NUMBER,
            title: renderColumnTitleAbbr(SBPCT, 'Stolen Base Percentage. Average stolen bases against, Stolen bases divided by Stolen bases plus Caught stealing (SB/(SB+CS))'),
            //decorator: replaceNullValueDecorator,
            sortState: ASC
        },
        sfColumn = {
            dataField: SF,
            type: NUMBER,
            title: renderColumnTitleAbbr(SF, "The number of times a runner tags up and scores after a batter's fly out"),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        shoColumn = {
            dataField: SHO,
            type: NUMBER,
            title: renderColumnTitleAbbr(SHO, 'The number of games completed in which the opposing team fails to score any runs'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        slgBattingColumn = {
            dataField: SLG,
            type: NUMBER,
            title: renderColumnTitleAbbr(SLG, 'Slugging Percentage.  The measure of the power of a hitter, total bases divided by at bats (TB/AB)'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        slgPitchingColumn = {
            dataField: SLG,
            type: NUMBER,
            title: renderColumnTitleAbbr(SLG, "Slugging Percentage against a pitcher (TB/AB)"),
            //decorator: replaceNullValueDecorator,
            sortState: ASC
        },
        soBattingColumn = {
            dataField: SO,
            type: NUMBER,
            title: renderColumnTitleAbbr(SO, 'The number of strikeouts by a batter (three strikes during an at bat)'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        soPitchingColumn = {
            dataField: SO,
            type: NUMBER,
            title: renderColumnTitleAbbr(SO, 'The number of strikeouts by a pitcher'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        svoColumn = {
            dataField: SVO,
            type: NUMBER,
            title: renderColumnTitleAbbr(SVO, 'The number of save situation appearances by a pitcher to close a game'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        svColumn = {
            dataField: SV,
            type: NUMBER,
            title: renderColumnTitleAbbr(SV, 'The number of saves credited to a pitcher'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        tColumn = {
            dataField: T,
            type: NUMBER,
            title: renderColumnTitleAbbr("3B", "The number of times a batter hits the ball and reaches third base without aid of an error or fielder's choice"),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        tbBattingColumn = {
            dataField: TB,
            type: NUMBER,
            title: renderColumnTitleAbbr(TB, 'The total number of bases i.e. one base for single, two bases for double'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        tbPitchingColumn = {
            dataField: TB,
            type: NUMBER,
            title: renderColumnTitleAbbr(TB, 'The total number of bases allowed by a pitcher, i.e. one base for single, two bases for double'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        tbfColumn = {
            dataField: TBF,
            type: NUMBER,
            title: renderColumnTitleAbbr(TBF, 'The total number of batters faced by a pitcher'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        tcColumn = {
            dataField: TC,
            type: NUMBER,
            title: renderColumnTitleAbbr(TC, 'Total Chances.  The total number of putouts and assists credited to the fielder and errors charged to the fielder.'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        whipColumn = {
            dataField: WHIP,
            type: NUMBER,
            title: renderColumnTitleAbbr(WHIP, 'The average number of walks and hits by a pitcher, Hits plus walks allowed divided by innings pitched ((H+W)/IP)'),
            //decorator: replaceNullValueDecorator,
            sortState: ASC
        },
        wColumn = {
            dataField: W,
            type: NUMBER,
            title: renderColumnTitleAbbr(W, 'The number of wins credited to a pitcher'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        wpColumn = {
            dataField: WP,
            type: NUMBER,
            title: renderColumnTitleAbbr(WP, 'The number of wild pitches thrown by a pitcher'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        wpctColumn = {
            dataField: WPCT,
            type: NUMBER,
            title: renderColumnTitleAbbr(WPCT, 'The percentage of games won by the pitcher out of all decisions (W/(W+L))'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },
        xbhColumn = {
            dataField: XBH,
            type: NUMBER,
            title: renderColumnTitleAbbr(XBH, 'The total number of doubles, triples and home runs for a batter'),
            //decorator: replaceNullValueDecorator,
            sortState: DESC
        },

        // Column set definitions
        playerDisplayColumns = [
            rankColumn,
            nameDisplayRosterColumn,
            teamAbbrevColumn,
            activeSwColumn,
            playerIdColumn
        ],
        teamDisplayColumns = [
            rankColumn,
            teamFullColumn,
            fileCodeColumn,
            leagueColumn
        ],

        singleSeasonDisplayColumns = [
            rankColumn,
            nameDisplayRosterColumn,
            seasonColumn,
            teamAbbrevColumn,
            activeSwColumn,
            playerIdColumn
        ],

        allTimeDisplayColumns = [
            rankColumn,
            nameDisplayRosterColumn,
            activeSwColumn,
            playerIdColumn
        ],

        hittingTeamDisplayColumns = teamDisplayColumns,
        pitchingTeamDisplayColumns = teamDisplayColumns,
        fieldingTeamDisplayColumns = teamDisplayColumns,

        hittingDisplayColumns = playerDisplayColumns.concat(posColumn),
        pitchingDisplayColumns = playerDisplayColumns,
        fieldingDisplayColumns = playerDisplayColumns.concat(positionColumn),

        hittingSingleSeasonDisplayColumns = singleSeasonDisplayColumns.concat(posColumn),
        pitchingSingleSeasonDisplayColumns = singleSeasonDisplayColumns,
        fieldingSingleSeasonDisplayColumns = singleSeasonDisplayColumns.concat(posColumn),

        hittingAllTimeDisplayColumns = allTimeDisplayColumns.concat(posColumn),
        pitchingAllTimeDisplayColumns = allTimeDisplayColumns,
        fieldingAllTimeDisplayColumns = allTimeDisplayColumns.concat(posColumn),


        basicHittingStatColumns = [
            gBattingColumn,
            abColumn,
            rBattingColumn,
            hBattingColumn,
            dColumn,
            tColumn,
            hrBattingColumn,
            rbiColumn,
            bbBattingColumn,
            soBattingColumn,
            sbBattingColumn,
            csBattingColumn,
            //ibbColumn,
            avgBattingColumn,
            obpColumn,
            slgBattingColumn,
            opsColumn
            // hbpColumn,
            //  sacColumn,
            //  sfColumn
        ],
        pageTwoHittingStatColumns = [
            ibbBattingColumn,
            hbpColumn,
            sacColumn,
            sfColumn,
            // babipColumn,
            // mhgColumn,
            tbBattingColumn,
            xbhColumn,
            gidpBattingColumn,
            goBattingColumn,
            aoBattingColumn,
            goaoBattingColumn,
            npBattingColumn,
            //ppaColumn,
            paColumn
            // roeColumn,
            // lobColumn
        ],

        basicPitchingStatColumns = [
            wColumn,
            lColumn,
            eraColumn,
            gPitchingColumn,
            gsPitchingColumn,
            //cgColumn,
            // shoColumn,
            svColumn,
            svoColumn,
            ipColumn,
            hPitchingColumn,
            rPitchingColumn,
            erColumn,
            hrPitchingColumn,
            // hbColumn,
            bbPitchingColumn,
            // ibbColumn,
            soPitchingColumn,
            avgPitchingColumn,
            whipColumn
        ],
        pageTwoPitchingStatsColumns = [
            cgColumn,
            shoColumn,
            hbColumn,
            ibbPitchingColumn,
            //qsColumn, 
            gfColumn,
            hldColumn,
            //rwColumn,
            //2bColumn, 
            //3bColumn, 
            gidpPitchingColumn,
            goPitchingColumn,
            aoPitchingColumn,
            wpColumn,
            bkColumn,
            sbPitchingColumn,
            csPitchingColumn,
            pkColumn,
            tbfColumn,
            //rsColumn,
            //irColumn, 
            //irsColumn,
            //bqrColumn,
            //bqrsColumn,
            npPitchingColumn
            //bColumn,
            //sColumn
        ],
        pageThreePitchingStatsColumns = [
            wpctColumn,
            goaoPitchingColumn,
            //babipColumn,
            obpPitchingColumn,
            slgPitchingColumn,
            opsPitchingColumn,
            k9Column,
            bb9Column,
            //hr9Column, 
            h9Column,
            kbbColumn,
            //rs9Column, 
            //irstrandColumn, 
            //bqrstrandColumn, 
            //pgsColumn, 
            pipColumn
            //ppaColumn
        ],
        pageThreePitchingTeamColumns = [
            wpctColumn,
            goaoPitchingColumn,
            //babipColumn,
            obpPitchingColumn,
            slgPitchingColumn,
            opsPitchingColumn
            //k9Column, 
            //bb9Column,
            //hr9Column, 
            //h9Column, 
            //kbbColumn, 
            //rs9Column, 
            //irstrandColumn, 
            //bqrstrandColumn, 
            //pgsColumn, 
            //pipColumn
            //ppaColumn
        ],
        basicFieldingStatColumns = [
            gFieldingColumn,
            gsFieldingColumn,
            innColumn,
            tcColumn,
            poColumn,
            aColumn,
            eColumn,
            dpColumn,
            sbFieldingColumn,
            csFieldingColumn,
            sbpctColumn,
            pbColumn,
            cwpColumn,
            fpctColumn
        ],
        sortablePlayerFieldingColumns = [rfColumn],
        sortableTeamFieldingColumns = [derColumn],

        HITTING_COLUMN_CLASSES_1 = make_class_string(basicHittingStatColumns),
        HITTING_COLUMN_CLASSES_2 = make_class_string(pageTwoHittingStatColumns),

        //HITTING_COLUMN_PAGE1 = $(HITTING_COLUMN_CLASSES_1),
        //HITTING_COLUMN_PAGE2 = $(HITTING_COLUMN_CLASSES_2),
        HITTING_COLUMN_PAGE1 = HITTING_COLUMN_CLASSES_1,
        HITTING_COLUMN_PAGE2 = HITTING_COLUMN_CLASSES_2,

        PITCHING_COLUMN_CLASSES_1 = make_class_string(basicPitchingStatColumns),
        PITCHING_COLUMN_CLASSES_2 = make_class_string(pageTwoPitchingStatsColumns),
        PITCHING_COLUMN_CLASSES_3 = make_class_string(pageThreePitchingStatsColumns),

        PITCHING_COLUMN_PAGE1 = PITCHING_COLUMN_CLASSES_1,
        PITCHING_COLUMN_PAGE2 = PITCHING_COLUMN_CLASSES_2,
        PITCHING_COLUMN_PAGE3 = PITCHING_COLUMN_CLASSES_3,

        //PITCHING_COLUMN_PAGE1 = $(PITCHING_COLUMN_CLASSES_1),
        //PITCHING_COLUMN_PAGE2 = $(PITCHING_COLUMN_CLASSES_2),
        //PITCHING_COLUMN_PAGE3 = $(PITCHING_COLUMN_CLASSES_3),

        baseDatagridConfig = {
            tableClass: 'stats_table data_grid',
            showHeader: true,
            dataType: 'json',
            sortable: true,
            rowDecorator: stripeEveryFiveRowsDecorator,
            onColumnClick: function(c) {
                $("#datagrid table").hide();
                bam.stats.util.showSpinner("datagrid");
                //$("#datagrid").addClass("loadingMask");
                // this.sortState = (this.active) ? (this.sortState === DESC) ? ASC : DESC : this.sortState;
                this.sortState = (this.parent._data.columns[c].active) ? (this.sortState === DESC) ? ASC : DESC : this.sortState;
                this.parent._data.columns[c].active = true;
                //  var i, n, column;
                // for (i = 0, n = this.parent._data.columns.length; i < n; ++i) {
                //    column = this.parent._data.columns[i];
                //   column.active = (column === this);
                //  }
                this.parent.trigger('sort', [this.dataField, this.sortState]);
                return false;
            },
            autoClassify: true
        };


    var pubUrl = window.lookupURLGlobal.indexOf('-qa') !== -1 ? '' : 'http://mlb.mlb.com';

    bam.stats.util = {

        quote: function(str) {
            return "'" + str + "'";
        },

        range: function(a, b) {
            var i, n, arr = [];
            for (i = Math.min(a, b), n = Math.max(a, b); i <= n; ++i) {
                arr.push(i);
            }
            return a > b ? arr.reverse() : arr;
        },

        show_hide_columns: function(classes, display) {
            //$("#cssToggle").append(classes + " {display: " + display+";}");
        },

        showSpinner: function(div) {
            $("#" + div).addClass("loadingMask");
            $("#pagination").hide();
            //$("#widgets .onscreen select").attr("disabled","disabled");
        },

        hideSpinner: function(div) {
            $("#" + div).removeClass("loadingMask");
            $("#pagination").show();
            //$("#widgets .onscreen select").attr("disabled","");
        }
    };

    function make_class_string(col_arr) {
        var classes = [];
        var class_str = "";
        var temp_str, i;
        for (i = 0; i < col_arr.length; i++) {
            temp_str = ".dg-" + col_arr[i].dataField;
            classes.push(temp_str);
        }
        class_str = classes.join(", ");
        return class_str;
    }

    function valid_column(needle, haystack) {
        //where haystack is an array of objects that are the datagrid columns for this stat type

        var hay_len, in_haystack, i;
        if ($.isArray(haystack)) {
            hay_len = haystack.length;
            in_haystack = false;
            for (i = 0; i < hay_len; i++) {
                if (haystack[i].dataField.toLowerCase() === needle.toLowerCase()) {
                    in_haystack = true;
                }
            }
            return in_haystack;
        }
    }

    function augment(receivingClass, givingClass) {
        var i, len, methodName;
        if (arguments[2]) {
            for (i = 2, len = arguments.length; i < len; i++) {
                receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
            }
        } else {
            for (methodName in givingClass.prototype) {
                if (!receivingClass.prototype[methodName]) {
                    receivingClass.prototype[methodName] = givingClass.prototype[methodName];
                }
            }
        }
    }

    function stripeEveryFiveRowsDecorator(tr) {
        if (this.index % 5 === 4) {
            $('td', tr).addClass('stripey');
        }
    }

    function replaceNullValueDecorator(cell) {
        if (cell.value === null || cell.value === "") {
            return '-';
        }
    }

    function tieValueDecorator(cell) {
        var curr_idx = this.index;
        var rank = 1;
        var curr_val, prev_val, prev_row, prev_cell, j;
        if (curr_idx > 0) {
            for (j = 0; j < this.parent._data.columns.length; j++) {
                if (this.parent._data.columns[j].active) {
                    curr_val = this.cell(j).value;
                    prev_row = parseInt(curr_idx, 10) - 1;
                    prev_val = this.parent._data.rows[prev_row].cell(j).value;
                    if (prev_val === curr_val) {
                        rank = this.parent._data.rows[prev_row].cell(0).value;
                    } else {
                        rank = curr_idx + 1;
                    }
                }
            }
        }
        this.parent._data.rows[curr_idx].cell(0).value = rank;
        return rank;
    }

    function playerNameDecorator(cell) {
        var prop, is_active;
        var asterisk = "";
        var curr_url = document.location.pathname;
        var link_url = "/team/player.jsp?player_id=";
        if (curr_url.indexOf("_app") !== -1) {
            link_url = "/team/player_app.jsp?player_id=";
        } else {
            if (~window.location.pathname.indexOf('sortable_es.jsp')) {
                link_url = link_url.replace('?player_id=', '?lang=es&player_id=')
            }
        }

        if (cell.value === null) {
            return '-';
        }

        prop = this.cell(PLAYER_ID).value;

        if (!(this.cell(ACTIVE_SW).value === null)) {

            is_active = this.cell(ACTIVE_SW).value;

            if ((is_active === 'Y') && ((getBbqVal("season_type") === "ALL") || (getBbqVal("season_type") === "SINGLE"))) {
                asterisk = "*";
            }
        }

        return (typeof prop !== 'undefined') ?
            asterisk + '&nbsp;<a href="' + link_url + +prop + '">' + cell.value + '</a>' : asterisk + "&nbsp;" + cell.value;
    }

    function teamDecorator(cell) {
        var prop = null;
        var split = getBbqVal("split");
        var league_code = getBbqVal("league_code");
        var season = getBbqVal("season");
        var game_type = getBbqVal("game_type");
        var statType = getBbqVal("statType");
        var link_url = "/stats/sortable.jsp?c_id=";
        var curr_url = document.location.pathname;
        if (curr_url.indexOf("_app") !== -1) {
            link_url = "/stats/sortable_app.jsp?c_id=";
        }

        var hash = "#game_type=" + game_type + "&season=" + season + "&league_code=" + league_code + "&split=" + split + "&playerType=ALL&sectionType=sp&statType=" + statType;
        if (cell.value === null) {
            return '-';
        }

        prop = this.cell(FILE_CODE).value;
        
        return (typeof(prop) !== 'undefined') ?
            '<a href="' + link_url + prop + hash + '">' + cell.value + '</a>' : cell.value;
    }

    function renderColumnTitleAbbr(abbr, title) {
        return '<abbr title="' + title + '">' + abbr.toUpperCase() + '</abbr>';
    }

    function renderLabel(id, text) {
        return "<label for='" + id + "'>" + text + "</label>";
        //return $('<label/>').attr('for', id).text(text);
    }

    $.fn.checkedVal = function(value) {

        var values = [];

        this.find('input:checked').each(function() {
            values.push(this.value);
        });

        return values;
    };

    function BaseWidget(cfg) {
        this.uid = BaseWidget.uid++;
        this.cfg = $.extend({}, BaseWidget.defaultCfg, cfg || {});
    }

    BaseWidget.uid = 0;
    BaseWidget.defaultCfg = {};

    BaseWidget.prototype = $.bindable({
        renderFieldset: function(widgetType) {
            var rand = Math.floor(Math.random() * 1000);
            var id = this.uid + "_" + rand;
            return $('<fieldset/>').attr("id", id).addClass("widget-" + widgetType);
        },
        render: function() {},
        destroy: function() {}
    }, UPDATE);

    function CompositeWidget( /* widget, ... */ ) {

        this.updateProxy = proxy(this.updateProxy, this);

        this.widgets = [];
        this.addWidget.apply(this, arguments);

        this.refreshValue();
    }

    extend(CompositeWidget, BaseWidget, {

        addWidget: function( /* widget, ... */ ) {
            var i, n, widgets = arguments;
            for (i = 0, n = widgets.length; i < n; ++i) {
                this.widgets.push(widgets[i].update(this.updateProxy));
            }
        },

        refreshValue: function() {
            var i, n;
            this.value = [];
            for (i = 0, n = this.widgets.length; i < n; ++i) {
                this.value.push(this.widgets[i].value);
            }
        },

        updateProxy: function() {
            this.refreshValue();
            return this.trigger(UPDATE, this.value);
        },

        render: function() {
            var elem = this.renderFieldset(),
                i, n;
            for (i = 0, n = this.widgets.length; i < n; ++i) {
                this.widgets[i].render().appendTo(elem);
            }
            return elem;
        }

    });

    function PaginationWidget(pages, page, cfg) {
        var curr_sectionType = getBbqVal("sectionType");
        var curr_statType = getBbqVal("statType");
        cfg = $.extend(true, {}, PaginationWidget.defaultCfg, cfg || {});
        PaginationWidget.superclass.constructor.call(this, cfg);

        this.setPages(pages);
        this.setPage(page);
    }

    PaginationWidget.defaultCfg = {
        prefix: 'paginationWidget-',
        css: {
            first: 'first',
            previous: 'previous',
            page: 'page',
            last: 'last',
            next: 'next'
        }
    };

    extend(PaginationWidget, BaseWidget, {

        setPages: function(pages) {
            this.pages = ~~+pages;
            this.trigger('setPages', [this.pages]);
        },

        setPage: function(page) {
            this.page = bam.number.limitValueToRange(~~+page, 1, this.pages);
            this.trigger('setPage', [this.page, this.pages]);
        },

        render: function(target) {

            var cfg = this.cfg,
                css = cfg.css,
                name = cfg.prefix + this.uid,
                elem = this.renderFieldset("pagination"),
                first = $(BUTTON_TAG)
                .addClass(cfg.prefix + css.first)
                .html('&laquo;')
                .click(proxy(handleFirst, this)),
                prev = $(BUTTON_TAG)
                .addClass(cfg.prefix + css.previous)
                .html('&lt;')
                .click(proxy(handlePrevious, this)),
                input = $(INPUT_TAG)
                .addClass(cfg.prefix + css.page)
                .val(this.page)
                .attr('name', name)
                .focus(function() {
                    this.select();
                })
                .change(proxy(handleInput, this)),
                last = $(BUTTON_TAG)
                .addClass(cfg.prefix + css.last)
                .html(this.pages)
                .click(proxy(handleLast, this)),
                next = $(BUTTON_TAG)
                .addClass(cfg.prefix + css.next)
                .html('&gt;')
                .click(proxy(handleNext, this));

            function handleFirst() {
                this.page = 1;
                this.trigger(UPDATE, [this.page]);
            }

            function handlePrevious() {
                this.page = Math.max(this.page - 1, 1);
                this.trigger(UPDATE, [this.page]);
            }

            function handleInput() {
                this.page = +input.val();
                this.trigger(UPDATE, [this.page]);
            }

            function handleNext() {
                this.page = Math.min(this.page + 1, this.pages);
                this.trigger(UPDATE, [this.page]);
            }

            function handleLast() {
                this.page = this.pages;
                this.trigger(UPDATE, [this.page]);
            }

            this.bind('setPages', function(evt, pages) {
                last.html(pages);
            });

            this.bind('setPage', function(evt, page, pages) {
                input.val(page);
                if (parseInt(page, 10) === 1) {
                    first.hide();
                    prev.hide();
                } else {
                    first.show();
                    prev.show();
                }
                if (parseInt(page, 10) === parseInt(pages, 10)) {
                    next.hide();
                } else {
                    next.show();
                }

            });

            elem.append(first, prev, input, ' of ', last, next);

            return elem;
        }

    });

    function BaseApp(cfg) {

        this.setConfigEventProxy = proxy(function(evt, value) {
            evt.preventDefault();
            var data = evt.data;
            var obj = {};
            obj[data] = value;
            this.executeTracking.call(this, obj);
            this.setConfig(obj);
            return false;
        }, this);


        this.setSortEventProxy = eventProxy(this.setSort, this);

    }

    BaseApp.prototype = $.bindable({
        executeTracking: function(obj) {
            var sectionType = getBbqVal("sectionType");
            var control, pageName, section, key, value;
            var isTeam = false;
            switch (sectionType) {
                case "st":
                    section = "Sortable Team Stats";
                    isTeam = true;
                    break;
                case "sp":
                    section = "Sortable Player Stats";
                    break;
                case "bvp":
                    section = "Batter Vs. Pitcher Stats";
                    break;
                case "mt":
                    section = "Milestone Tracker Stats";
                    break;
            }

            var statType = this.cfg.statType; // pitching, batting, fielding
            var prefix = '';
            var isSplit = 'split' in obj;

            if (isSplit) {
                prefix = 'split';
                if (isTeam) {
                    prefix += 't';
                } else {
                    prefix += 'p';
                }
                switch (statType) {
                    case 'pitching':
                        prefix += 'p';
                        break;
                    case 'batting':
                    default:
                        prefix += 'b';
                }
                prefix += '_';
            } else {
                switch (statType) {
                    case 'pitching':
                        prefix = 'pitch_';
                        break;
                    case 'fielding':
                        prefix = 'field_';
                        break;
                    case 'batting':
                    default:
                        prefix = 'batt_';
                }
                if (isTeam) {
                    prefix = 't' + prefix;
                }
            }

            var prepend = !!obj.prependAffix;
            delete obj.prependAffix;

            for (key in obj) {
                value = obj[key];
                value = value.toString();
                if (prepend) {
                    value = prefix + value;
                }

                if ((key === "league_code") && !value) {
                    value = "MLB";
                }
                if ((typeof(value) !== "undefined") && (value) && (!$.isArray(value))) {
                    value = value.replace(/["']{1}/gi, "");
                }
                control = "Stats:" + value;
                pageName = "Major League Baseball: Stats: " + section;
                bam.tracking.simStatsPgView({
                    "pageName": pageName,
                    "channel": "Stats",
                    "control": control,
                    "source": section
                });
            }
        },

        setConfig: function(object) {
            var i, value, key;
            object.page = 1;
            for (key in object) {
                this.cfg[key] = object[key];
            }
            updateBbqHash(object, this);
        },

        setSort: function(column, order, extended) {
            var url_hash = {};
            url_hash.sortColumn = column;
            url_hash.sortOrder = "'" + order + "'";
            url_hash.extended = extended;
            url_hash.page = 1;
            updateBbqHash(url_hash);
            this.cfg.sortOrder = "'" + order + "'";
            this.cfg.sortColumn = column;
            this.cfg.extended = extended;
        }

    });

    var radioWidget = {
        handleUpdate: function(e) {
            var v = e.target.value;
            this.trigger(UPDATE, [v]);
        }
    };
    var linkWidget = {
        handleUpdate: function(evt) {
            evt.preventDefault();
            var elem = $(evt.target),
                href = evt.target.href,
                actionId = href.substr(href.indexOf('#') + 1);

            if (!elem.hasClass("clicked")) {
                $("#time_select .horizList a.clicked").removeClass("clicked");
                elem.addClass("clicked");
                this.value = actionId;
                this.trigger(UPDATE, [this.value]);
            }


        }
    };

    var tabWidget = {
        handleUpdate: function(evt, silent) {
            var parent_id, parent_id_key, parent_val, parent_id_arr, parent_id_full, sortColumn, sortOrder, update, position, section, group, extended, game_type, season;
            var hashUpdate = {};
            var elem = $(evt.target),
                href = evt.target.href,
                panelId = href.substr(href.indexOf('#') + 1);
            if (!elem.hasClass("tab_top")) {
                evt.preventDefault();
            }
            var d_cfg = {
                sp: {
                    sectionType: 'sp',
                    playerType: 'QUALIFIER',
                    statType: 'hitting',
                    page_type: 'SortablePlayer',
                    season: current_season,
                    season_type: 'ANY',
                    sportCode: "'mlb'",
                    league_code: "'MLB'",
                    split: '',
                    team_id: window.team_id,
                    active_sw: "",
                    game_type: getBbqVal("game_type"),
                    position: "",
                    sortOrder: "'desc'",
                    sortColumn: 'avg',
                    results: '',
                    page: 1,
                    perPage: 50,
                    timeframe: '',
                    extended: 0,
                    last_x_days: ''

                },
                st: {
                    sectionType: 'st',
                    statType: 'hitting',
                    season: current_season,
                    sportCode: "'mlb'",
                    league_code: "'MLB'",
                    split: '',
                    team_id: window.team_id,
                    game_type: getBbqVal("game_type"),
                    sortOrder: "'desc'",
                    sortColumn: 'avg',
                    results: '',
                    page: 1,
                    perPage: 50,
                    timeframe: '',
                    extended: 0
                },
                init: {
                    hitting: {
                        sortOrder: "'desc'",
                        sortColumn: "avg"
                    },
                    pitching: {
                        sortOrder: "'asc'",
                        sortColumn: "era"
                    },
                    fielding: {
                        sortOrder: "'desc'",
                        sortColumn: "fpct"
                    }
                }
            };

            if (!elem.hasClass("active")) {

                if (elem.hasClass("tab_parent")) {
                    $(".tabs li").removeClass("right_border");
                    parent_id = elem.attr("href");
                    parent_val = parent_id.substring(1);
                    update = {
                        tab_level: "parent",
                        click_text: elem.text(),
                        parent_id: parent_id
                    };

                    this.statTabTypeSelector.value = update;
                    this.statTabTypeSelector.trigger(UPDATE, [this.statTabTypeSelector.value, silent]);

                    $("#reset_link a").unbind();
                    $("#reset_link a").fragment(d_cfg[parent_val], 2);
                    $("#reset_link a").bind("click", function() {
                        window.sortablePlayerList = null;

                        updateBbqHash(d_cfg[parent_val]);
                        sortablePlayerList = new bam.stats.app.SortablePlayerList(d_cfg[parent_val]);
                        sortablePlayerList.load();
                    });

                    $.bbq.pushState({
                        "sectionType": parent_val
                    });

                } else if (elem.hasClass("tab_top")) {

                    return true;
                } else {
                    $(".tabs li").removeClass("right_border");
                    parent_id = elem.attr('href');
                    parent_id_full = parent_id.substring(1);
                    parent_id_arr = parent_id_full.split("_");
                    parent_id_key = parent_id_arr[0];
                    parent_id_val = parent_id_arr[1];

                    sortColumn = "";
                    sortOrder = "";
                    extended = "";
                    game_type = getBbqVal("game_type");
                    if (!game_type || game_type === "") {
                        game_type = "'" + current_game_type + "'";
                    }
                    season = getBbqVal("season");
                    if (!season || season === "") {
                        season = current_season;
                    }
                    league_code = getBbqVal("league_code");
                    if (!league_code || league_code === "") {
                        league_code = "'MLB'";
                    }

                    sortColumn = d_cfg.init[parent_id_val].sortColumn;
                    sortOrder = d_cfg.init[parent_id_val].sortOrder;
                    extended = 0;


                    if (parent_id_key === "sp") {
                        section = "Sortable Player ";
                    } else if (parent_id_key === "st") {
                        section = "Sortable Team ";
                    }
                    section = section + parent_id_val;

                    if ((parent_id_val === "pitching") && (parent_id_key === "sp")) {
                        position = "'1'";
                    } else {
                        position = "";
                    }

                    update = {
                        elem: elem,
                        tab_level: "child",
                        click_text: section,
                        game_type: game_type,
                        season: getBbqVal("season") ? getBbqVal("season") : current_season,
                        season_type: getBbqVal("season_type") ? getBbqVal("season_type") : 'ANY',
                        league_code: league_code,
                        sectionType: parent_id_key,
                        statType: parent_id_val
                    };

                    $.bbq.pushState(update);
                    this.statTabTypeSelector.value = update;
                    this.statTabTypeSelector.trigger(UPDATE, [this.statTabTypeSelector.value, silent]);
                }
            }
        }
    };

    var selectWidget = {
        renderOption: function(value, text, selected) {
            var option = '<option value="' + value + '"';
            if (selected) {
                option += " selected";
            }
            option += ">" + text + "</option>";
            return option;
        },
        handleUpdate: function(e) {
            var v = e.target.value;
            this.trigger(UPDATE, [v]);
            return false;
        },

        rerender: function(options, selected) {
            selected = selected.toString();
            var new_option_arr = [];
            var i, value, child, optGroup, node, opt_obj, key, val;
            if ($.isArray(options)) {
                for (i = 0, n = options.length; i < n; ++i) {
                    opt_obj = options[i];
                    for (key in opt_obj) {
                        value = opt_obj[key];
                        value = value.toString();
                        new_option_arr.push(this.renderOption(key, value, value === selected));
                    }
                }

            } else {
                for (value in options) {
                    if (typeof(options[value]) === "string") {
                        new_option_arr.push(this.renderOption(value, options[value], value === selected));
                    } else {
                        optGroup = "<optgroup label='" + value + "'>";
                        for (child in options[value]) {
                            optGroup += this.renderOption(options[value][child], child, child === selected);
                        }
                        optGroup += "</optgroup>";
                        new_option_arr.push(optGroup);
                    }
                }
            }
            return new_option_arr;
        },
        loadOptions: function(url, data, cachekey, op, sectionType, statType) {
            var widget_name = op.name;
            var json_key = op.jsonKey;
            var widget_value = op.value;
            var widget_enabled = op.enabled;
            var curr_elem;
            var load_data = {};
            if (data) {
                load_data = data;
            } else if (op.loadOptions_data) {
                load_data = op.loadOptions_data;
            }
            if (typeof(op.dataCache[cachekey]) === "undefined") {
                op.dataCache[cachekey] = {};
            }

            if ($.isEmptyObject(op.dataCache[cachekey])) {
                op.dataCache[cachekey] = $.ajax({
                    url: url,
                    dataType: 'json',
                    async: true,
                    data: load_data
                });
            }
            op.dataCache[cachekey].success(function(json) {
                op.setOptions(json);
            });
        }
    };

    function SortablePlayerList(cfg) {
        
        var widget = bam.stats.widget;
        var q, curr_widget_arr, curr_widget_arr_len;
        SortablePlayerList.superclass.constructor.call(this, cfg);

        this.defaultCfg = {
            sp: {
                sectionType: 'sp',
                playerType: 'QUALIFIER',
                statType: 'hitting',
                page_type: 'SortablePlayer',
                season: current_season,
                season_type: 'ANY',
                sportCode: "'mlb'",
                league_code: "'MLB'",
                split: '',
                team_id: window.team_id,
                active_sw: "",
                game_type: current_game_type,
                position: "",
                sortOrder: "'desc'",
                sortColumn: 'avg',
                results: '',
                page: 1,
                perPage: 50,
                timeframe: '',
                extended: 0
            },
            st: {
                sectionType: 'st',
                statType: 'hitting',
                season: current_season,
                sportCode: "'mlb'",
                league_code: 'MLB',
                split: '',
                game_type: current_game_type,
                team_id: window.team_id,
                sortOrder: "'desc'",
                sortColumn: 'avg',
                results: '',
                page: 1,
                perPage: 50,
                timeframe: '',
                extended: 0
            }
        };

        this.cfg = $.extend({

                sectionType: 'sp',
                playerType: 'QUALIFIER',
                statType: 'hitting',

                season: 2008,
                season_type: 'ANY',
                sportCode: SPORT_CODE_MLB,
                league_code: "'MLB'",
                split: '',
                team_id: window.team_id,
                active_sw: "",
                game_type: window.QUOTED_DEFAULT_GAME_TYPE,
                position: [],
                page_type: 'SortablePlayer',

                sortOrder: "'desc'",
                sortColumn: '',
                results: '',
                page: 1,
                perPage: 50,
                timeframe: 'h0',
                last_x_days: ''

            },
            cfg || {});
        this.datagrid = $.bindable(new DataGrid(baseDatagridConfig));
        this.datagrid.bind('sort', 'page', eventProxy(this.setSort, this));

        this.dataConfigs = {
            sp: {
                hitting: {
                    SINGLE: {
                        ALL: 'stats_sortable_player',
                        QUALIFIER: 'stats_sortable_player',
                        default_column: "avg",
                        default_direction: "'desc'",
                        columns: [].concat(hittingSingleSeasonDisplayColumns, basicHittingStatColumns, pageTwoHittingStatColumns),
                        next_stats_arr: [HITTING_COLUMN_PAGE1, HITTING_COLUMN_PAGE2]
                    },
                    ANY: {
                        ALL: 'stats_sortable_player',
                        QUALIFIER: 'stats_sortable_player',
                        default_column: "avg",
                        default_direction: "'desc'",
                        columns: [].concat(hittingDisplayColumns, basicHittingStatColumns, pageTwoHittingStatColumns),
                        next_stats_arr: [HITTING_COLUMN_PAGE1, HITTING_COLUMN_PAGE2]
                    },
                    ALL: {
                        ALL: 'stats_sortable_player',
                        QUALIFIER: 'stats_sortable_player',
                        default_column: "avg",
                        default_direction: "'desc'",
                        columns: [].concat(hittingAllTimeDisplayColumns, basicHittingStatColumns, pageTwoHittingStatColumns),
                        next_stats_arr: [HITTING_COLUMN_PAGE1, HITTING_COLUMN_PAGE2]
                    }
                },
                pitching: {
                    SINGLE: {
                        ALL: 'stats_sortable_player',
                        QUALIFIER: 'stats_sortable_player',
                        default_column: "era",
                        default_direction: "'asc'",
                        columns: [].concat(pitchingSingleSeasonDisplayColumns, basicPitchingStatColumns, pageTwoPitchingStatsColumns, pageThreePitchingStatsColumns),
                        next_stats_arr: [PITCHING_COLUMN_PAGE1, PITCHING_COLUMN_PAGE2, PITCHING_COLUMN_PAGE3]
                    },
                    ANY: {
                        ALL: 'stats_sortable_player',
                        QUALIFIER: 'stats_sortable_player',
                        default_column: "era",
                        default_direction: "'asc'",
                        columns: [].concat(pitchingDisplayColumns, basicPitchingStatColumns, pageTwoPitchingStatsColumns, pageThreePitchingStatsColumns),
                        next_stats_arr: [PITCHING_COLUMN_PAGE1, PITCHING_COLUMN_PAGE2, PITCHING_COLUMN_PAGE3]
                    },
                    ALL: {
                        ALL: 'stats_sortable_player',
                        QUALIFIER: 'stats_sortable_player',
                        default_column: "era",
                        default_direction: "'asc'",
                        columns: [].concat(pitchingAllTimeDisplayColumns, basicPitchingStatColumns, pageTwoPitchingStatsColumns, pageThreePitchingStatsColumns),
                        next_stats_arr: [PITCHING_COLUMN_PAGE1, PITCHING_COLUMN_PAGE2, PITCHING_COLUMN_PAGE3]
                    }
                },
                fielding: {
                    SINGLE: {
                        ALL: 'stats_sortable_player',
                        QUALIFIER: 'stats_sortable_player',
                        default_column: "fpct",
                        default_direction: "'desc'",
                        columns: [].concat(fieldingSingleSeasonDisplayColumns, basicFieldingStatColumns, sortablePlayerFieldingColumns),
                        next_stats_arr: []
                    },
                    ANY: {
                        ALL: 'stats_sortable_player',
                        QUALIFIER: 'stats_sortable_player',
                        default_column: "fpct",
                        default_direction: "'desc'",
                        columns: [].concat(fieldingDisplayColumns, basicFieldingStatColumns, sortablePlayerFieldingColumns),
                        next_stats_arr: []
                    },
                    ALL: {
                        ALL: 'stats_sortable_player',
                        QUALIFIER: 'stats_sortable_player',
                        default_column: "fpct",
                        default_direction: "'desc'",
                        columns: [].concat(fieldingAllTimeDisplayColumns, basicFieldingStatColumns, sortablePlayerFieldingColumns),
                        next_stats_arr: []
                    }
                }
            },
            st: {
                hitting: {
                    URL: 'team_hitting_season_leader_master',
                    SPLIT_URL: 'team_hitting_season_leader_sit',
                    default_column: "avg",
                    columns: [].concat(hittingTeamDisplayColumns, basicHittingStatColumns, pageTwoHittingStatColumns),
                    next_stats_arr: [HITTING_COLUMN_PAGE1, HITTING_COLUMN_PAGE2]
                },
                pitching: {
                    URL: 'team_pitching_season_leader_master',
                    SPLIT_URL: 'team_pitching_season_leader_sit',
                    default_column: "era",
                    columns: [].concat(pitchingTeamDisplayColumns, basicPitchingStatColumns, pageTwoPitchingStatsColumns, pageThreePitchingTeamColumns),
                    next_stats_arr: [PITCHING_COLUMN_PAGE1, PITCHING_COLUMN_PAGE2, PITCHING_COLUMN_PAGE3]
                },
                fielding: {
                    URL: 'team_fielding_season_leader_master',
                    SPLIT_URL: 'team_fielding_season_leader_sit',
                    default_column: "fpct",
                    columns: [].concat(fieldingTeamDisplayColumns, basicFieldingStatColumns, sortableTeamFieldingColumns),
                    next_stats_arr: []
                }
            }
        };

        this.datagrid_postprocessing = function(data) {
            var cfg = sortablePlayerList.cfg;
            var sort_col = cfg.sortColumn;
            var sort_direction = cfg.sortOrder;
            var cols, default_col, default_direction, config_parent, datagrid_table, i, rank_html, exception_cell, exception_title;
            var rows = $.ensureArray(data.queryResults.row);
            var row_len = rows.length;
            var curr_url = document.location.pathname;
            datagrid_table = $("#datagrid table");

            if (cfg.sectionType === "sp") {
                config_parent = this.dataConfigs[cfg.sectionType][cfg.statType][cfg.season_type];
            } else if (cfg.sectionType === "st") {
                config_parent = this.dataConfigs[cfg.sectionType][cfg.statType];
            }
            cols = config_parent.columns;
            default_col = config_parent.default_column;
            default_direction = config_parent.default_direction;

            if ((sort_col === '') || !(valid_column(sort_col, cols))) {
                sort_col = default_col;
                sort_direction = default_direction;
            }

            for (i = 0; i < row_len; i++) {
                if (rows[i].qualifies === "E") {
                    exception_cell = datagrid_table.find("tr[index='" + i + "'] td.dg-rank");
                    rank_html = exception_cell.text();
                    rank_html = "&dagger; " + rank_html;
                    exception_cell.empty();
                    exception_title = $("<abbr></abbr>").html(rank_html).attr("title", "Recognized as league leader under Rule 9.22(a) Comment, formerly Rule 10.22.");
                    exception_title.appendTo(exception_cell);

                    $(".tooltip").hide();
                    exception_cell.find("abbr[title]").tooltip();
                }
            }

            datagrid_table.find("th.dg-" + sort_col).addClass("active");
            datagrid_table.find("td.dg-" + sort_col).addClass("active");
            if (sort_direction === "'asc'") {
                datagrid_table.find("th.active span.sortIcons").html("&#x25b2;").show();
            } else {
                datagrid_table.find("th.active span.sortIcons").html("&#x25bc;").show();
            }
            if (curr_url.indexOf("_app") === -1) {
                $(".tooltip").hide();
                $("th abbr[title]").tooltip();
            }
        };

        $("#widgets").addClass("offscreen").removeClass("onscreen");
        var section = this.cfg.sectionType;
        var stat = this.cfg.statType;
        var prefix = section + "_" + stat;
        var $parent = $("#widgets .panels");

        this.playerTypeSelector = {
            name: "playerType",
            type: "playerTypeSelector",
            base: "radio",
            enabled: true,
            update: radioWidget.handleUpdate,
            value: this.cfg.playerType
        };
        this.seasonTypeSelector = {
            name: "season_type",
            type: "seasonTypeSelector",
            enabled: true,
            base: "radio",
            update: radioWidget.handleUpdate,
            value: this.cfg.season_type
        };
        this.leagueCodeSelector = {
            name: "league_code",
            type: "leagueCodeSelector",
            enabled: true,
            base: "radio",
            update: radioWidget.handleUpdate,
            value: this.cfg.league_code
        };
        this.seasonSelector = {
            name: "season",
            type: "seasonSelector",
            enabled: true,
            base: "select",
            update: selectWidget.handleUpdate,
            value: this.cfg.season,
            setOptions: function() {
                var options = [];
                var opt_obj = {};
                var season = this.value;
                var new_options_arr = [];
                var years = bam.stats.util.range((new Date).getFullYear(), 1876);
                var year_len = years.length;
                for (i = 0; i < year_len; i++) {
                    opt_obj = {};
                    yr = years[i].toString();
                    opt_obj[yr] = yr;
                    options.push(opt_obj);
                }
                new_option_arr = selectWidget.rerender(options, season);
                this.dom.html(new_option_arr.join(''));
                this.dom.find("option[value='" + this.value + "']").attr("selected", "selected");
                if (this.enabled) {
                    this.dom.removeAttr("disabled");
                } else {
                    this.dom.attr("disabled", "disabled");
                }

            }
        };
        this.positionSelector = {
            name: "position",
            type: "positionSelector",
            enabled: true,
            base: "select",
            update: selectWidget.handleUpdate,
            value: this.cfg.position
        };
        this.gameTypeSelector = {
            name: "game_type",
            type: "gameTypeSelector",
            jsonKey: "org_game_type_date_info",
            enabled: true,
            base: "select",
            value: this.cfg.game_type,
            update: selectWidget.handleUpdate,
            setOptions: function(data) {
                var self = this;
                var game_type = this.value;
                if (!game_type) {
                    game_type = window.QUOTED_DEFAULT_GAME_TYPE;
                }
                var game_type_abbrev = "";
                var game_type_desc = "";
                var props_obj = {};
                var hash = {};
                var props_arr = [];
                var cfg, i, $sel;
                var new_option_arr = [];
                var glen;
                var game_type_rows = bam.util.getQueryResults(data, this.jsonKey);
                glen = game_type_rows.length;
                for (i = 0; i < glen; i++) {
                    props_obj = {};
                    game_type_abbrev = bam.stats.util.quote(game_type_rows[i].game_type);
                    if (game_type_abbrev === "'D'") {
                        game_type_desc = "Division Series";
                    } else if (game_type_abbrev === "'L'") {
                        game_type_desc = "League Championship Series";
                    } else if (game_type_abbrev === "'F'") {
                        game_type_desc = "Wild Card";
                    } else {
                        game_type_desc = game_type_rows[i].name_full;
                    }
                    props_obj[game_type_abbrev] = game_type_desc;
                    if (!hash[game_type_abbrev]) {
                        hash[game_type_abbrev] = true;
                        props_arr.push(props_obj);
                    }
                }
                for (i = 0; i < props_arr.length; i++) {
                    if (props_arr[i].hasOwnProperty("'F'")) {
                        props_obj = {};
                        props_obj["'P'"] = "Postseason Combined";
                        props_arr.push(props_obj);
                    }
                }
                new_option_arr = selectWidget.rerender(props_arr, game_type);
                new_option_arr.sort(function(a, b) {
                    var sort_obj = {
                        "'R'": 0,
                        "'A'": 1,
                        "'F'": 2,
                        "'D'": 3,
                        "'L'": 4,
                        "'W'": 5,
                        "'P'": 6,
                        "'S'": 7
                    };
                    var regex_a = a.match(/value\=.*(\'+[A-Za-z]\'+)/)[1];
                    var regex_b = b.match(/value\=.*(\'+[A-Za-z]\'+)/)[1];
                    //var a_val = a.attr("value");
                    //var b_val = b.attr("value");
                    return sort_obj[regex_a] - sort_obj[regex_b];
                });

                this.dom.html(new_option_arr.join(''));
                this.dom.find("option[value='" + this.value + "']").attr("selected", "selected");
                if (this.enabled) {
                    this.dom.removeAttr("disabled");
                } else {
                    this.dom.attr("disabled", "disabled");
                }
            }
        };
        this.hittingSplitsSelector = {
            name: "hitting_splits",
            type: "hittingSplitsSelector",
            jsonKey: "properties_season_splits",
            enabled: true,
            value: this.cfg.split,
            base: "select",
            update: selectWidget.handleUpdate,
            setOptions: function(json) {
                var self = this;
                var opts = {};
                var new_option_arr = [];
                var split = this.value;
                var opts = {
                    "": "Select Split"
                };
                var props = getQueryResults(json, this.jsonKey);
                var $sel;
                var i, a, v, g, key, val, optgroup = "";
                var cfg = {};
                for (i = 0; i < props.length; i++) {
                    g = props[i].nav_menu;
                    opts[g] = {};
                }
                for (v in opts) {
                    for (i = 0; i < props.length; i++) {
                        if (props[i].nav_menu === v) {
                            key = props[i].situation;
                            val = props[i].sit_code;
                            opts[v][key] = val;
                        }
                    }
                }

                new_option_arr = selectWidget.rerender(opts, split);

                this.dom.html(new_option_arr.join(''));

                this.dom.find("option[value='" + this.value + "']").attr("selected", "selected");
                if (this.enabled) {
                    this.dom.removeAttr("disabled");
                } else {
                    this.dom.attr("disabled", "disabled");
                }
            }
        };
        this.pitchingSplitsSelector = {
            name: "pitching_splits",
            type: "pitchingSplitsSelector",
            jsonKey: "properties_season_splits",
            enabled: true,
            value: this.cfg.split,
            base: "select",
            update: selectWidget.handleUpdate,
            setOptions: function(json) {
                var self = this;
                var opts = {};
                var new_option_arr = [];
                var split = this.value;
                var opts = {
                    "": "Select Split"
                };
                var props = getQueryResults(json, this.jsonKey);
                var $sel;
                var i, a, v, g, key, val, optgroup = "";
                var cfg = {};
                for (i = 0; i < props.length; i++) {
                    g = props[i].nav_menu;
                    opts[g] = {};
                }
                for (v in opts) {
                    for (i = 0; i < props.length; i++) {
                        if (props[i].nav_menu === v) {
                            key = props[i].situation;
                            val = props[i].sit_code;
                            opts[v][key] = val;
                        }
                    }
                }

                new_option_arr = selectWidget.rerender(opts, split);
                this.dom.html(new_option_arr.join(''));

                this.dom.find("option[value='" + this.value + "']").attr("selected", "selected");
                if (this.enabled) {
                    this.dom.removeAttr("disabled");
                } else {
                    this.dom.attr("disabled", "disabled");
                }
            }
        };
        this.activePlayerSelector = {
            name: "active_sw",
            type: "activePlayerSelector",
            enabled: true,
            base: "radio",
            update: radioWidget.handleUpdate,
            value: this.cfg.active_sw
        };
        this.teamSelector = {
            name: "team_id",
            type: "teamSelector",
            jsonKey: "team_all_season",
            enabled: true,
            base: "select",
            value: this.cfg.team_id,
            update: selectWidget.handleUpdate,
            setOptions: function(json) {
                var self = this;
                var opts = {};
                var team = this.value;
                var $sel;
                var props_arr = [{
                    "": "All Teams"
                }];
                var props_obj = {};
                var new_option_arr = [];
                var props = getQueryResults(json, this.jsonKey);
                var team_id, team_name, i, a = "";
                var cfg = {};
                var props_len, option_len;
                props_len = props.length;
                for (i = 0; i < props_len; i++) {
                    props_obj = {};
                    team_id = props[i].team_id;
                    team_name = props[i].name_display_full;
                    props_obj[team_id] = team_name;
                    props_arr.push(props_obj);
                }
                new_option_arr = selectWidget.rerender(props_arr, team_id);

                this.dom.html(new_option_arr.join(''));

                this.dom.find("option[value='" + this.value + "']").attr("selected", "selected");
                if (this.enabled) {
                    this.dom.removeAttr("disabled");
                } else {
                    this.dom.attr("disabled", "disabled");
                }
            }
        };
        this.timeframeLinkSelector = {
            base: "link",
            enabled: true,
            value: this.cfg.timeframe
        };
        this.prev = {
            base: "button",
            enabled: true,
            value: this.cfg.extended
        };
        this.next = {
            base: "button",
            enabled: true,
            value: this.cfg.extended
        };
        this.statTabTypeSelector = {
            update: tabWidget.handleUpdate,
            value: this.cfg.sectionType + "_" + this.cfg.statType + "_child"
        };

        this.statTabTypeSelector.dom = $(".tabs a").unbind().bind('click', {
            silent: null
        }, $.proxy(tabWidget.handleUpdate, this));
        this.timeframeLinkSelector.dom = $("#time_select ul.horizList").unbind().bind('click', $.proxy(linkWidget.handleUpdate, this.timeframeLinkSelector));

        $.bindable(this.statTabTypeSelector);
        $.bindable(this.playerTypeSelector);
        $.bindable(this.seasonTypeSelector);
        $.bindable(this.leagueCodeSelector);
        $.bindable(this.seasonSelector);
        $.bindable(this.positionSelector);
        $.bindable(this.gameTypeSelector);
        $.bindable(this.hittingSplitsSelector);
        $.bindable(this.pitchingSplitsSelector);
        $.bindable(this.activePlayerSelector);
        $.bindable(this.teamSelector);
        $.bindable(this.timeframeLinkSelector);

        this.visible_widget_arr = {
            sp: {
                hitting: [this.seasonSelector, this.seasonTypeSelector, this.leagueCodeSelector, this.teamSelector, this.gameTypeSelector, this.activePlayerSelector, this.playerTypeSelector, this.positionSelector, this.hittingSplitsSelector],
                pitching: [this.seasonSelector, this.seasonTypeSelector, this.leagueCodeSelector, this.teamSelector, this.gameTypeSelector, this.activePlayerSelector, this.playerTypeSelector, this.positionSelector, this.pitchingSplitsSelector],
                fielding: [this.seasonSelector, this.seasonTypeSelector, this.leagueCodeSelector, this.teamSelector, this.gameTypeSelector, this.activePlayerSelector, this.playerTypeSelector, this.positionSelector, this.hittingSplitsSelector]
            },
            st: {
                hitting: [this.leagueCodeSelector, this.seasonSelector, this.gameTypeSelector, this.hittingSplitsSelector],
                pitching: [this.leagueCodeSelector, this.seasonSelector, this.gameTypeSelector, this.pitchingSplitsSelector],
                fielding: [this.leagueCodeSelector, this.seasonSelector, this.gameTypeSelector, this.hittingSplitsSelector]
            }
        };

        var bind_arr = this.visible_widget_arr[this.cfg.sectionType][this.cfg.statType];
        var bind_arr_len = bind_arr.length;
        for (i = 0; i < bind_arr_len; i++) {
            this.bindDom(bind_arr[i]);
        }

        this.statTabTypeSelector.bind('update', eventProxy(this.setTabEventProxy, this));
        this.seasonSelector.bind('update', eventProxy(this.setSeasonEventProxy, this));

        this.pitchingSplitsSelector.bind('update', eventProxy(this.setSplitsEventProxy, this));
        this.hittingSplitsSelector.bind('update', eventProxy(this.setSplitsEventProxy, this));
        this.gameTypeSelector.bind('update', eventProxy(this.setGameTypeEventProxy, this));
        this.positionSelector.bind('update', eventProxy(this.setPositionEventProxy, this));
        this.teamSelector.bind('update', eventProxy(this.setTeamEventProxy, this));
        this.activePlayerSelector.bind('update', eventProxy(this.setActiveEventProxy, this));
        this.playerTypeSelector.bind('update', eventProxy(this.setPlayerTypeEventProxy, this));
        this.leagueCodeSelector.bind('update', eventProxy(this.setLeagueEventProxy, this));
        this.seasonTypeSelector.bind('update', eventProxy(this.setSeasonTypeEventProxy, this));
        this.timeframeLinkSelector.bind('update', eventProxy(this.setTimeFrameLinkSelectorEventProxy, this));

        this.seasonSelector.setOptions();

        curr_widget_arr = this.visible_widget_arr[this.cfg.sectionType][this.cfg.statType];
        curr_widget_arr_len = curr_widget_arr.length;
        var w, w_dom;
        for (q = 0; q < curr_widget_arr_len; q++) {
            w = curr_widget_arr[q];
            if (w.base === "radio") {
                w_dom = w.dom;
                w_dom.filter("[value='" + w.value + "']").attr("checked", "checked");
                if (w.enabled) {
                    w_dom.removeAttr("disabled");
                } else {
                    w_dom.attr("disabled", "disabled");
                }
            } else if (w.name === "position") {
                w_dom.find("option[value='" + w.value + "']").attr("selected", "selected");
            } else if ((w.name === "season_type") && (w.value === "ANY")) {
                w_dom.attr("checked", false);
            }
        }
        $("fieldset.widget-radio").buttonset();

        $("#widgets").removeClass("offscreen").addClass("onscreen");

        this.pagination = new PaginationWidget();

        this.pagination.bind('update', eventProxy(this.setPage, this));
        $("#pagination").html(this.pagination.render());
        if ((this.cfg.sectionType === "st") || ($("#datagrid").has("#error").length > 0)) {
            $("#pagination").hide();
        } else {
            $("#pagination").show();
        }

        this.loadDynamicSelectMenus();

        var curr_tab_sectionType = this.cfg.sectionType;
        var curr_tab_statType = this.cfg.statType;
        var tab_click = curr_tab_sectionType + "_" + curr_tab_statType + "_child";

        $("ul.tabs a[id='" + tab_click + "']").trigger('click', [true]);

    }

    extend(SortablePlayerList, BaseApp, {
        bindDom: function(widget) {
            var section = this.cfg.sectionType;
            var stat = this.cfg.statType;
            var prefix = section + "_" + stat;
            var wtype = widget.type;
            var $parent = $("#widgets .panels");
            var update_function;
            if (widget.base === "radio") {
                update_function = radioWidget.handleUpdate;
                this[wtype].dom = $parent.find("input[name='" + prefix + "_" + widget.name + "']").unbind().bind('change', $.proxy(update_function, this[wtype]));
            } else if (widget.base === "select") {
                update_function = selectWidget.handleUpdate;
                this[wtype].dom = $parent.find("#" + prefix + "_" + widget.name).unbind().bind('change', $.proxy(update_function, this[wtype]));
            }
        },
        setPage: function(page) {
            var $dg = $("#datagrid");
            $dg.find("table").hide();
            bam.stats.util.showSpinner("datagrid");
            var url_hash = $.deparam.fragment();
            url_hash.page = page;
            updateBbqHash(url_hash);
            SortablePlayerList.superclass.executeTracking.call(this, {
                "page": page
            });
            this.cfg.page = page;

            this.trigger('setPage', [this.cfg.page]);
        },

        loadDynamicSelectMenus: function(widget) {

            var widget_type;
            var sectionType = this.cfg.sectionType;
            var statType = this.cfg.statType;

            if (typeof(widget) !== "undefined") {
                widget_type = widget.type;
                if (!widget.hasOwnProperty("delta")) {
                    widget.delta = true;
                }
            }
            var gts = {
                loadOptions_url: lookupURLGlobal + "/json/named.org_game_type_date_info.bam",
                loadOptions_data: {
                    sport_code: "'mlb'",
                    current_sw: "'Y'",
                    game_type: ["'S'", "'R'", "'A'", "'F'", "'D'", "'L'", "'W'"],
                    season: this.cfg.season || current_season
                }
            };
            var ts = {
                loadOptions_url: lookupURLGlobal + "/json/named.team_all_season.bam",
                loadOptions_data: {
                    all_star_sw: "'N'",
                    sport_code: "'mlb'",
                    sort_order: "'name_asc'",
                    season: this.cfg.season || current_season
                }
            };
            var hss = {
                loadOptions_url: lookupURLGlobal + "/json/named.properties_season_splits.bam",
                loadOptions_data: {
                    season: this.cfg.season || current_season,
                    stat_type: 1,
                    v: 3
                }
            };
            var pss = {
                loadOptions_url: lookupURLGlobal + "/json/named.properties_season_splits.bam",
                loadOptions_data: {
                    season: this.cfg.season,
                    stat_type: 2,
                    v: 3
                }
            };

            var dynamicMenuConfigs = {
                sp: {
                    hitting: {
                        ANY: {
                            gameTypeSelector: gts,
                            teamSelector: ts,
                            hittingSplitsSelector: hss
                        },
                        SINGLE: {
                            teamSelector: ts
                        },
                        ALL: {
                            teamSelector: ts
                        }
                    },
                    pitching: {
                        ANY: {
                            gameTypeSelector: gts,
                            teamSelector: ts,
                            pitchingSplitsSelector: pss
                        },
                        SINGLE: {
                            teamSelector: ts
                        },
                        ALL: {
                            teamSelector: ts
                        }
                    },
                    fielding: {
                        ANY: {
                            gameTypeSelector: gts,
                            teamSelector: ts
                        },
                        SINGLE: {
                            teamSelector: ts
                        },
                        ALL: {
                            teamSelector: ts
                        }
                    }
                },
                st: {
                    hitting: {
                        gameTypeSelector: gts,
                        hittingSplitsSelector: hss
                    },
                    pitching: {
                        gameTypeSelector: gts,
                        pitchingSplitsSelector: pss
                    },
                    fielding: {
                        gameTypeSelector: gts
                    }
                }
            };
            var d, op, u, data, cache, widget_name, widget_value, widget_enabled, dom_widget, json_key, cachekey;
            var curr_menu;
            var update_widgets = {};
            if (sectionType === "sp") {
                curr_menu = dynamicMenuConfigs[sectionType][statType][this.cfg.season_type];
            } else if (this.cfg.sectionType === "st") {
                curr_menu = dynamicMenuConfigs[sectionType][statType];
            }
            if ((typeof(curr_menu[widget_type]) === "undefined") && widget) {
                if ((widget.hasOwnProperty("delta") && (widget.delta === true))) {
                    dom_widget = widget.dom;
                    dom_widget.find("option[value='" + widget.value + "']").attr("selected", "selected");

                    if ((widget.enabled === true) && (dom_widget.find("option").length > 1)) {

                        dom_widget.removeAttr("disabled");
                    } else {

                        dom_widget.attr("disabled", "disabled");
                    }
                    return;
                } else {
                    return;
                }
            } else {
                if (!widget) {
                    update_widgets = curr_menu;
                } else {
                    update_widgets[widget_type] = curr_menu[widget_type];
                    this[widget_type] = widget;
                }
                cachekey = "";
                for (d in update_widgets) {
                    switch (d) {
                        case "gameTypeSelector":
                            cachekey = this.cfg.season + "-" + this.cfg.league_code + "-" + statType + "-" + sectionType;
                            break;

                        case "teamSelector":
                            cachekey = this.cfg.season + "-" + this.cfg.league_code + "-" + this.cfg.active_sw + "-" + statType + "-" + sectionType;
                            break;

                        case "hittingSplitsSelector":
                            cachekey = this.cfg.season;
                            break;

                        case "pitchingSplitsSelector":
                            cachekey = this.cfg.season;
                            break;
                    }
                    if (!this[d].dataCache) {
                        this[d].dataCache = {};
                    }
                    if (typeof(this[d].dataCache[cachekey]) === "undefined") {
                        this[d].dataCache[cachekey] = {};
                    }
                    u = curr_menu[d].loadOptions_url;
                    data = curr_menu[d].loadOptions_data;
                    if (this.cfg.league_code && (this.cfg.league_code !== "'MLB'")) {
                        if (d === "gameTypeSelector") {
                            data.league_code = this.cfg.league_code;
                        }
                        if (d === "teamSelector") {
                            data.league = this.cfg.league_code;
                        }
                    }
                    if (this.cfg.active_sw) {
                        if (d === "teamSelector") {
                            data.active_sw = this.cfg.active_sw;
                        }
                    }

                    op = this[d];

                    selectWidget.loadOptions(u, data, cachekey, op, sectionType, statType);
                }
            }
        },

        setStatAndPlayerTypes: function(sectionType, statType, playerType, season_type) {
            var section_stat;
            if (sectionType.match(/^#/)) {
                season_type = this.cfg.season_type;
                playerType = this.cfg.playerType;
                section_stat = sectionType.substr(1);
                section_type_arr = section_stat.split("_");
                sectionType = section_type_arr[0];
                statType = section_type_arr[1];
            }
            this.cfg.sectionType = sectionType;
            this.cfg.statType = statType;
            this.cfg.playerType = playerType;
            this.cfg.season_type = season_type;
            var cols, i, n;
            if (this.cfg.sectionType === "sp") {
                cols = SortablePlayerList.dataConfigs[sectionType][statType][season_type].columns;
            } else {
                cols = SortablePlayerList.dataConfigs[sectionType][statType].columns;
            }
            if ((this.cfg.sortColumn === '') || !(valid_column(this.cfg.sortColumn, cols))) {
                if (this.cfg.sectionType === "sp") {
                    this.cfg.sortColumn = SortablePlayerList.dataConfigs[sectionType][statType][season_type].default_column;
                } else if (this.cfg.sectionType === "st") {
                    this.cfg.sortColumn = SortablePlayerList.dataConfigs[sectionType][statType].default_column;
                }
            }

            this.datagrid._data.columns.length = 0;

            for (i = 0, n = cols.length; i < n; ++i) {
                this.datagrid.addColumn(cols[i]);
            }
            if (this.cfg.sectionType === "sp") {
                this.trigger('setStatAndPlayerTypes', [this.cfg.sectionType, this.cfg.statType, this.cfg.playerType, this.cfg.season_type]);
            } else if (this.cfg.sectionType === "st") {
                this.trigger('setStatAndPlayerTypes', [this.cfg.sectionType, this.cfg.statType]);
            }
        },

        setConfig: function(obj) {
            var $dg = $("#datagrid");
            $dg.find("table").hide();
            $dg.find("#error").remove();
            bam.stats.util.showSpinner("datagrid");
            SortablePlayerList.superclass.setConfig.call(this, obj);
            this.trigger('setConfig', [obj]);
        },

        setSort: function(column, order) {
            SortablePlayerList.superclass.executeTracking.call(this, {
                column: column,
                prependAffix: true
            });

            this.checkQualifierMessage(column);

            SortablePlayerList.superclass.setSort.call(this, column, order, this.cfg.extended);
            this.trigger('setSort', [this.cfg.sortColumn, this.cfg.sortOrder, this.cfg.extended]);
        },

        checkQualifierMessage: function (column) {
            var id = 'mlb-sortable-stats-qualifier-message';
            var existing = document.getElementById(id);
            if (existing) {
                existing.parentNode.removeChild(existing);
            }

            if (~rate_stats_qualifier_message.indexOf(column)) {
                var qualifierMessage = document.createElement('div');
                qualifierMessage.setAttribute('id', id);
                if (~window.location.pathname.indexOf('sortable_es')) {
                    qualifierMessage.innerHTML = 'Un bateador debe promediar 3.1 visitas al plato por juego' +
                        ' del equipo (1.86 visitas al plato durante los entrenamientos de primavera) para' +
                        ' ser considerado entre los líderes de la liga en promedio, porcentaje de embasarse' +
                        ' o slugging y un pitcher debe promediar 1.0 inning lanzado por juego del equipo ' +
                        '(0.6 entradas lanzadas durante los entrenamientos de primavera) para calificar ' +
                        'entre los líderes en la categoría de efectividad.';
                } else {
                    qualifierMessage.innerHTML = 'A batter must have 3.1 plate appearances per team game ' +
                        'played (1.86 PA during spring training) to qualify for league leadership in AVG, ' +
                        'OBP or SLG; a pitcher must have 1.0 innings pitched per team game (0.6 IP during ' +
                        'spring training) to qualify for league leadership in ERA.';
                }
                $(qualifierMessage).css({
                    width: 650,
                    padding: '0 20px 20px',
                    float: 'left'
                });
                document.getElementById('content').appendChild(qualifierMessage);
            }
        },

        setDefaultColumns: function(next_stats_arr) {
            if ($("#toggleMe").length > 0) {
                $("#toggleMe").remove();
            }
            var css = document.createElement('style');
            css.setAttribute('type', 'text/css');
            css.setAttribute('id', 'toggleMe');
            var style_string = "";
            var sectionType = sortablePlayerList.cfg.sectionType;
            var statType = sortablePlayerList.cfg.statType;
            var season_type = sortablePlayerList.cfg.season_type;
            if (!next_stats_arr) {
                if (sectionType === "sp") {
                    next_stats_arr = sortablePlayerList.dataConfigs[sectionType][statType][season_type].next_stats_arr;
                } else if (sectionType === "st") {
                    next_stats_arr = sortablePlayerList.dataConfigs[sectionType][statType].next_stats_arr;
                }
            }
            var visible_panel = parseInt(sortablePlayerList.cfg.extended, 10);
            var visible_arr = [];
            var hidden_arr = [];
            var visible_classes, hidden_classes;
            var stats_prev = $("#stats_prev");
            var stats_next = $("#stats_next");
            var i, v, h;
            var next_stats_arr_len = next_stats_arr.length;

            if (!next_stats_arr.length) {
                stats_next.hide();
                stats_prev.hide();
                $("#prev_next_label").hide();
            } else {
                stats_next.show();
                stats_prev.show();
                $("#prev_next_label").show();
                if (visible_panel <= 0) {
                    stats_prev.removeClass("stats_prev_default").addClass("stats_prev_disabled");
                } else {
                    stats_prev.removeClass("stats_prev_disabled").addClass("stats_prev_default");
                }
                if (visible_panel >= (next_stats_arr_len - 1)) {
                    stats_next.removeClass("stats_next_default").addClass("stats_next_disabled");
                } else {
                    stats_next.removeClass("stats_next_disabled").addClass("stats_next_default");
                }

                if (next_stats_arr_len > 0) {
                    for (i = 0; i < next_stats_arr_len; i++) {
                        if (i === visible_panel) {
                            visible_classes = next_stats_arr[i];

                            style_string += visible_classes + " {display:table-cell;}\n";
                        } else {
                            hidden_classes = next_stats_arr[i];

                            style_string += hidden_classes + " {display:none;}";
                        }
                    }
                }
            }
            if (css.styleSheet) {
                css.styleSheet.cssText = style_string;
            } else {
                css.appendChild(document.createTextNode(style_string));
            }
            $('body').append(css);

            this.checkQualifierMessage(this.cfg.sortColumn);
        },

        setWidgetDependencies: function(url_hash, silent, tabclick) {

            if (typeof(silent) === "undefined") {
                silent = false;
            }
            var config_hash = {
                season_type: {},
                season: {},
                active_sw: {},
                playerType: {},
                league_code: {},
                team_id: {},
                position: {},
                split: {},
                sectionType: {},
                timeframe: {},
                game_type: {},
                statType: {},
                sortColumn: {},
                sortOrder: {}
            };
            var c, v, i, widget, delta;

            for (c in url_hash) {
                config_hash[c] = {};
                config_hash[c].value = url_hash[c];
                config_hash[c].enabled = true;
            }

            var team_data = {};
            var game_type_selector_data = {};
            var splits_selector_data = {};

            var curr_elem, wname;
            var full_visible_widgets = this.visible_widget_arr[config_hash.sectionType.value][config_hash.statType.value];
            var widget_len = full_visible_widgets.length;
            if (tabclick) {
                for (i = 0; i < widget_len; i++) {
                    this.bindDom(full_visible_widgets[i]);
                }
                this.seasonSelector.setOptions();
            }

            var cols, default_col, default_direction, config_parent;
            if (config_hash.sectionType.value === "sp") {
                config_parent = this.dataConfigs[config_hash.sectionType.value][config_hash.statType.value][config_hash.season_type.value];
            } else if (config_hash.sectionType.value === "st") {
                config_parent = this.dataConfigs[config_hash.sectionType.value][config_hash.statType.value];
            }
            cols = config_parent.columns;
            default_col = config_parent.default_column;
            default_direction = config_parent.default_direction;

            if ((config_hash.sortColumn.value === '') || !(valid_column(config_hash.sortColumn.value, cols))) {
                config_hash.sortColumn.value = default_col;
                config_hash.sortOrder.value = default_direction;
            }

            if ((config_hash.season_type.value !== "ANY") && (config_hash.sectionType.value === "sp")) {
                config_hash.split.value = "";
                config_hash.split.enabled = false;

                config_hash.season.value = "";

                config_hash.game_type.value = window.QUOTED_DEFAULT_GAME_TYPE;
                config_hash.game_type.enabled = false;

                config_hash.active_sw.enabled = true;

                if ($.inArray(config_hash.sortColumn.value, rate_stats) > -1) {
                    config_hash.playerType.value = "QUALIFIER";
                } else {
                    config_hash.playerType.value = "ALL";
                }

                config_hash.playerType.enabled = false;

                config_hash.last_x_days.value = "";
                config_hash.timeframe.value = "";
                config_hash.timeframe.enabled = false;
            } else {
                if (config_hash.sectionType.value === "sp") {
                    config_hash.active_sw.enabled = false;
                    config_hash.active_sw.value = "";
                    this.seasonTypeSelector.dom.attr("checked", false).button("refresh");
                }
                config_hash.split.enabled = true;
                config_hash.game_type.enabled = true;
                config_hash.season.enabled = true;
                config_hash.timeframe.enabled = true;
                if (!config_hash.game_type.value) {
                    config_hash.game_type.value = window.QUOTED_DEFAULT_GAME_TYPE;
                }

                if (parseInt(config_hash.season.value, 10) <= 1902) {
                    config_hash.game_type.value = "'R'";
                    config_hash.game_type.enabled = false;
                }

                if (config_hash.game_type.value === "'A'") {
                    if (config_hash.sectionType.value === "sp") {
                        config_hash.team_id.value = "";
                        config_hash.team_id.enabled = false;

                        config_hash.playerType.value = "ALL";
                        config_hash.playerType.enabled = false;
                    }

                    config_hash.last_x_days.value = "";
                    config_hash.timeframe.value = "";
                    config_hash.timeframe.enabled = false;

                    config_hash.split.value = "";
                    config_hash.split.enabled = false;
                } else {

                    if (config_hash.sectionType.value === "st") {
                        config_hash.timeframe.value = "";
                        config_hash.timeframe.enabled = false;
                    } else {
                        if (config_hash.game_type.value === "'R'") {
                            if (parseInt(config_hash.season.value, 10) < 1999) {
                                config_hash.timeframe.value = "";
                                config_hash.timeframe.enabled = false;
                            } else if (parseInt(config_hash.season.value, 10) === parseInt(current_season, 10)) {
                                config_hash.timeframe.enabled = true;
                            } else {
                                config_hash.timeframe.valid = ["h0", "preas", "posas"];
                                config_hash.timeframe.enabled = true;
                                if ($.inArray(config_hash.timeframe.value, config_hash.timeframe.valid) === -1) {
                                    config_hash.timeframe.value = "";
                                    config_hash.last_x_days.value = "";
                                }
                            }
                        } else {
                            config_hash.timeframe.value = "";
                            config_hash.last_x_days.value = "";
                            config_hash.timeframe.enabled = false;
                        }
                        config_hash.team_id.enabled = true;
                        config_hash.playerType.enabled = true;
                    }
                }


                if (config_hash.split.value && (config_hash.sectionType.value === "sp")) {
                    config_hash.playerType.value = "ALL";
                    config_hash.playerType.enabled = false;
                    if ($.inArray(config_hash.split.value, ['preas', 'posas']) < 0) {
                        config_hash.timeframe.value = "";
                        config_hash.last_x_days.value = "";
                    }
                }

            }
            if (config_hash.statType.value === "fielding") {
                config_hash.season_type.value = "ANY";
                config_hash.season_type.enabled = false;
                config_hash.split.value = "";
                config_hash.split.enabled = false;
                config_hash.timeframe.value = "";
                config_hash.timeframe.enabled = false;
                config_hash.last_x_days.value = "";

                if (!config_hash.season.value) {
                    config_hash.season.value = current_season;
                }
                if (!config_hash.game_type.value) {
                    config_hash.game_type.value = window.QUOTED_DEFAULT_GAME_TYPE;
                }
            } else {
                config_hash.season_type.enabled = true;
            }
            if (config_hash.statType.value === "pitching") {
                config_hash.position.value = "'1'";
                config_hash.position.enabled = false;
            }

            if (config_hash.timeframe.value) {
                if (config_hash.timeframe.value.match(/^#/)) {
                    config_hash.timeframe.value = config_hash.timeframe.value.substring(1);
                }
                if (config_hash.timeframe.value !== "h0") {
                    config_hash.split.value = "";
                    config_hash.split.enabled = false;
                } else {
                    config_hash.split.value = "";
                    config_hash.split.enabled = true;
                }
            }
            if (config_hash.timeframe.enabled !== true) {
                $("#time_select").hide();
            } else {
                if (config_hash.timeframe.value) {
                    if ($.inArray(config_hash.timeframe.value, ['d1', 'd7', 'd30']) > -1) {
                        config_hash.last_x_days.value = config_hash.timeframe.value.substring(1);
                    } else if (config_hash.timeframe.value === "h0") {
                        config_hash.timeframe.value = "";
                        config_hash.split.value = "";
                        config_hash.last_x_days.value = "";
                    } else if ($.inArray(config_hash.timeframe.value, ['preas', 'posas']) > -1) {
                        config_hash.split.value = config_hash.timeframe.value;
                        config_hash.last_x_days.value = "";
                        config_hash.playerType.value = "ALL";
                        config_hash.playerType.enabled = false;
                    }
                } else {
                    $("#h0").addClass("clicked");
                    config_hash.split.enabled = true;
                }

                $("#time_select").show();
                if (typeof(config_hash.timeframe.valid) !== "undefined") {
                    $("ul.horizList li a").hide();
                    for (i = 0; i < config_hash.timeframe.valid.length; i++) {
                        $("ul.horizList li a#" + config_hash.timeframe.valid[i]).show();
                    }
                } else {
                    $("ul.horizList li a").show();
                }
            }

            for (i = 0; i < widget_len; i++) {
                widget = full_visible_widgets[i];
                wname = widget.name;
                if (/splits$/.test(wname)) {
                    wname = "split";
                }
                if ((widget.value !== config_hash[wname].value) || (widget.enabled !== config_hash[wname].enabled) || tabclick) {
                    delta = true;
                } else {
                    delta = false;
                }
                widget.delta = delta;
                if (widget.base === "radio" && (delta === true)) {
                    widget.value = config_hash[wname].value;
                    widget.enabled = config_hash[wname].enabled;
                    curr_elem = widget.dom;
                    curr_elem.filter("[value='" + config_hash[wname].value + "']").attr("checked", "checked");
                    if (config_hash[wname].enabled === true) {
                        curr_elem.button("enable");
                    } else {
                        curr_elem.button("disable");
                    }
                    curr_elem.button("refresh");
                } else if (widget.base === "select") {
                    widget.value = config_hash[wname].value;
                    widget.enabled = config_hash[wname].enabled;
                    if (widget.enabled) {
                        widget.dom.removeAttr("disabled");
                        sortablePlayerList.loadDynamicSelectMenus(widget);
                    } else {
                        widget.dom.attr("disabled", "disabled");
                    }
                }
            }

            if ((config_hash.sectionType.value === "st") || ($("#datagrid").has("#error").length > 0)) {
                $("#pagination").hide();
            } else {
                $("#pagination").show();
            }
            for (c in config_hash) {
                url_hash[c] = config_hash[c].value;
            }
            sortablePlayerList.cfg = $.extend({}, sortablePlayerList.cfg, url_hash);
            if (silent === false) {
                $.bbq.pushState(url_hash);
            }
        },

        setTabEventProxy: function(value, silent) {
            var $tab_links = $("#top_nav .tabs li");
            var $tab_links_child = $tab_links.find("a[id^='" + value.sectionType + "'].tab_child");
            var $tab_links_parent = $tab_links.find("a[id^='" + value.sectionType + "'].tab_parent");


            if (value.tab_level === "parent") {
                $tab_links.find("a.tab_child").hide();
                $tab_links.find("a[href^='" + value.parent_id + "'].tab_child").show();

                if (!silent) {
                    this.executeTracking.call(this, {
                        "tab": value.click_text
                    });
                }
                this.setConfig({
                    sectionType: value.parent_id.substring(1)
                });
            } else {
                var $active_tabs = $("#top_nav .tabs a.active");
                var $clicked = value.elem;
                var panel_name = value.sectionType + "_" + value.statType;

                $active_tabs.removeClass("active");
                $tab_links.removeClass("right_border");
                $("#" + panel_name).removeClass("offscreen").addClass("onscreen");
                $("#" + panel_name).children().removeClass("offscreen").addClass("onscreen");
                $("#" + panel_name).siblings().removeClass("onscreen").addClass("offscreen");
                $("#" + panel_name).siblings().children().removeClass("onscreen").addClass("offscreen");
                $clicked.addClass("active").show();
                $tab_links_child.show();
                $tab_links_child.last().parent().addClass("right_border");
                $tab_links.find("a.tab_parent").parent().addClass("right_border");
                $tab_links.find("a.tab_top").not(":last").parent().addClass("right_border");
                $tab_links_parent.parent().removeClass("right_border");
                delete value.elem;
                if (!silent) {
                    this.executeTracking.call(this, {
                        "tab": value.click_text
                    });
                }
                this.setConfig(value);
            }

            if (!silent) {
                this.setWidgetDependencies(this.cfg, null, true);
            }
        },

        setActiveEventProxy: function(value) {
            this.activePlayerSelector.value = value;
            this.executeTracking.call(this, {
                "active_sw": value
            });
            this.setConfig({
                "active_sw": value
            });
        },

        setSplitsEventProxy: function(value) {
            var update_obj = {};
            if (value && (this.cfg.sectionType === "sp")) {
                this.playerTypeSelector.value = "ALL";
                this.playerTypeSelector.enabled = false;
                this.playerTypeSelector.dom.filter("[value='" + this.playerTypeSelector.value + "']").attr("checked", "checked");
                this.playerTypeSelector.dom.attr("disabled", "disabled").button("refresh");
                update_obj.playerType = "ALL";
                if ($.inArray(value, ['preas', 'posas']) < 0) {
                    update_obj.timeframe = "";
                    update_obj.last_x_days = "";
                    $("ul.horizList a").removeClass("clicked");
                    $("#h0").addClass("clicked");
                }
            }
            update_obj.split = value;

            if (this.cfg.statType === "pitching") {
                this.pitchingSplitsSelector.value = value;
            } else {
                this.hittingSplitsSelector.value = value;
            }
            this.executeTracking.call(this, {
                "split": value,
                prependAffix: true
            });
            this.setConfig(update_obj);

        },

        setTimeFrameLinkSelectorEventProxy: function(value) {
            var special_case_values = ["h0", "preas", "posas"];
            var update_obj = {};
            update_obj.timeframe = value;
            if (value) {
                if (value.match(/^#/)) {
                    value = value.substring(1);
                }
                if (value !== "h0") {
                    if (this.cfg.statType === "pitching") {
                        this.pitchingSplitsSelector.value = "";
                        this.pitchingSplitsSelector.dom.find("option[value='" + this.pitchingSplitsSelector.value + "']").attr("selected", "selected");
                        this.pitchingSplitsSelector.dom.attr("disabled", "disabled");
                        this.pitchingSplitsSelector.enabled = false;
                        update_obj.split = "";
                    } else {
                        this.hittingSplitsSelector.value = "";
                        this.hittingSplitsSelector.dom.find("option[value='" + this.hittingSplitsSelector.value + "']").attr("selected", "selected");
                        this.hittingSplitsSelector.dom.attr("disabled", "disabled");
                        this.hittingSplitsSelector.enabled = false;
                        update_obj.split = "";
                    }
                }
            }
            if (this.timeframeLinkSelector.enabled !== true) {
                $("#time_select").hide();
            } else {
                if (value) {
                    if ($.inArray(value, ['d1', 'd7', 'd30']) > -1) {
                        this.cfg.last_x_days = value.substring(1);
                        update_obj.last_x_days = this.cfg.last_x_days;
                    } else if (value === "h0") {
                        this.timeframeLinkSelector.value = "";
                        update_obj.timeframe = "";
                        if (this.cfg.statType === "pitching") {
                            this.pitchingSplitsSelector.value = "";
                            this.pitchingSplitsSelector.dom.find("option[value='" + this.pitchingSplitsSelector.value + "']").attr("selected", "selected");
                            this.pitchingSplitsSelector.dom.removeAttr("disabled");
                            this.pitchingSplitsSelector.enabled = true;
                            update_obj.split = "";
                        } else {
                            this.hittingSplitsSelector.value = "";
                            this.hittingSplitsSelector.dom.find("option[value='" + this.hittingSplitsSelector.value + "']").attr("selected", "selected");
                            this.hittingSplitsSelector.dom.removeAttr("disabled");
                            this.hittingSplitsSelector.enabled = true;
                            update_obj.split = "";
                        }
                        update_obj.last_x_days = "";
                    } else if ($.inArray(value, ['preas', 'posas']) > -1) {
                        if (this.cfg.statType === "pitching") {
                            this.pitchingSplitsSelector.value = value;
                            this.pitchingSplitsSelector.dom.find("option[value='" + this.pitchingSplitsSelector.value + "']").attr("selected", "selected");
                            this.pitchingSplitsSelector.dom.removeAttr("disabled");
                            this.pitchingSplitsSelector.enabled = true;
                            update_obj.split = value;
                        } else {
                            this.hittingSplitsSelector.value = value;
                            this.hittingSplitsSelector.dom.find("option[value='" + this.hittingSplitsSelector.value + "']").attr("selected", "selected");
                            this.hittingSplitsSelector.dom.removeAttr("disabled");
                            this.hittingSplitsSelector.enabled = true;
                            update_obj.split = value;
                        }
                        this.cfg.last_x_days.value = "";
                        update_obj.last_x_days = "";
                        this.playerTypeSelector.value = "ALL";
                        this.playerTypeSelector.enabled = false;
                        this.playerTypeSelector.dom.filter("[value='" + this.playerTypeSelector.value + "']").attr("checked", "checked");
                        this.playerTypeSelector.dom.attr("disabled", "disabled").button("refresh");
                        update_obj.playerType = "ALL";
                    }
                }

                $("#time_select").show();
                if ((parseInt(this.cfg.season, 10) >= 1999) && (parseInt(this.cfg.season, 10) !== parseInt(window.current_season, 10))) {
                    $("ul.horizList li a").hide();
                    for (i = 0; i < special_case_values.length; i++) {
                        $("ul.horizList li a#" + special_case_values[i]).show();
                    }
                } else {
                    $("ul.horizList li a").show();
                }
            }
            this.timeframeLinkSelector.value = value;
            this.executeTracking.call(this, {
                "timeframe": value
            });


            this.setConfig(update_obj);
        },

        setGameTypeEventProxy: function(value) {
            var update_obj = {};
            update_obj.game_type = value;
            var valid_timeframes;
            if (value === "'A'") {
                if (this.cfg.sectionType === "sp") {
                    this.teamSelector.value = "";
                    this.teamSelector.dom.find("option[value='" + this.teamSelector.value + "']").attr("selected", "selected");
                    this.teamSelector.dom.attr("disabled", "disabled");
                    this.teamSelector.enabled = false;
                    update_obj.team_id = "";

                    this.playerTypeSelector.value = "ALL";
                    this.playerTypeSelector.enabled = false;
                    this.playerTypeSelector.dom.filter("[value='" + this.playerTypeSelector.value + "']").attr("checked", "checked");
                    this.playerTypeSelector.dom.attr("disabled", "disabled").button("refresh");
                    update_obj.playerType = "ALL";
                }

                this.cfg.last_x_days.value = "";

                this.timeframeLinkSelector.value = "";
                this.timeframeLinkSelector.enabled = false;
                update_obj.timeframe = "";

                $("#time_select").hide();

                if (this.cfg.statType === "pitching") {
                    this.pitchingSplitsSelector.value = "";
                    this.pitchingSplitsSelector.dom.find("option[value='" + this.pitchingSplitsSelector.value + "']").attr("selected", "selected");
                    this.pitchingSplitsSelector.dom.attr("disabled", "disabled");
                    this.pitchingSplitsSelector.enabled = false;
                    update_obj.split = "";
                } else {
                    this.hittingSplitsSelector.value = "";
                    this.hittingSplitsSelector.dom.find("option[value='" + this.hittingSplitsSelector.value + "']").attr("selected", "selected");
                    this.hittingSplitsSelector.dom.attr("disabled", "disabled");
                    this.hittingSplitsSelector.enabled = false;
                    update_obj.split = "";
                }
            } else {
                if (this.cfg.sectionType.value === "st") {
                    this.timeframeLinkSelector.value = "";
                    this.cfg.last_x_days.value = "";
                    update_obj.timeframe = "";
                    $("#time_select").hide();
                } else {
                    if (value === "'R'") {
                        if (parseInt(this.cfg.season, 10) < 1999) {
                            this.timeframeLinkSelector.value = "";
                            this.timeframeLinkSelector.enabled = false;
                            update_obj.timeframe = "";
                            $("#time_select").hide();
                        } else if (parseInt(this.cfg.season.value, 10) === parseInt(window.current_season, 10)) {
                            this.timeframeLinkSelector.enabled = true;
                        } else {
                            valid_timeframes = ["h0", "preas", "posas"]; //invalid values: ["d1","d7","d30"]
                            this.timeframeLinkSelector.enabled = true;
                            if ($.inArray(this.timeframeLinkSelector.value, valid_timeframes) === -1) {
                                this.timeframeLinkSelector.value = "";
                                this.cfg.last_x_days.value = "";
                                update_obj.timeframe = "";
                                $("#time_select").hide();
                            }
                        }
                    } else {
                        this.timeframeLinkSelector.value = "";
                        this.cfg.last_x_days.value = "";
                        update_obj.timeframe = "";
                        $("#time_select").hide();
                    }
                    if (this.cfg.sectionType.value === "sp") {
                        this.teamSelector.enabled = true;
                        this.teamSelector.dom.find("option[value='" + this.teamSelector.value + "']").attr("selected", "selected");
                        this.teamSelector.dom.removeAttr("disabled");
                        this.playerTypeSelector.enabled = true;
                        this.playerTypeSelector.dom.filter("[value='" + this.playerTypeSelector.value + "']").attr("checked", "checked");
                        this.playerTypeSelector.dom.removeAttr("disabled").button("refresh");
                    }
                }
            }
            this.gameTypeSelector.value = value;
            this.executeTracking.call(this, {
                "game_type": value
            });
            this.setConfig(update_obj);
        },

        setLeagueEventProxy: function(value) {

            this.leagueCodeSelector.value = value;
            this.executeTracking.call(this, {
                "league_code": value
            });
            this.setConfig({
                "league_code": value
            });
            if (this.cfg.sectionType === "sp") {
                this.loadDynamicSelectMenus(this.teamSelector);
            }
        },

        setPlayerTypeEventProxy: function(value) {
            this.playerTypeSelector.value = value;
            this.executeTracking.call(this, {
                "playerType": value
            });
            this.setConfig({
                "playerType": value
            });
        },

        setPositionEventProxy: function(value) {
            this.positionSelector.value = value;
            this.executeTracking.call(this, {
                "position": value
            });
            this.setConfig({
                "position": value
            });
        },
        setSeasonTypeEventProxy: function(value) {
            var cfg_obj = {};
            var statType = this.cfg.statType;
            var cols, default_col, default_direction, config_parent;
            if (this.cfg.sectionType === "sp") {
                config_parent = this.dataConfigs[this.cfg.sectionType][this.cfg.statType][this.cfg.season_type];
            } else if (this.cfg.sectionType === "st") {
                config_parent = this.dataConfigs[this.cfg.sectionType][this.cfg.statType];
            }

            cols = config_parent.columns;
            default_col = config_parent.default_column;
            default_direction = config_parent.default_direction;

            if ((this.cfg.sortColumn === '') || !(valid_column(this.cfg.sortColumn, cols))) {
                this.cfg.sortColumn = default_col;
                this.cfg.sortOrder = default_direction;
            }
            if (statType === "pitching") {
                this.pitchingSplitsSelector.value = "";
                this.pitchingSplitsSelector.dom.find("option[value='" + this.pitchingSplitsSelector.value + "']").attr("selected", "selected");
                this.pitchingSplitsSelector.dom.attr("disabled", "disabled");
                this.pitchingSplitsSelector.enabled = false;
                cfg_obj.split = "";
            } else {
                this.hittingSplitsSelector.value = "";
                this.hittingSplitsSelector.dom.find("option[value='" + this.hittingSplitsSelector.value + "']").attr("selected", "selected");
                this.hittingSplitsSelector.dom.attr("disabled", "disabled");
                this.hittingSplitsSelector.enabled = false;
                cfg_obj.split = "";
            }

            this.seasonSelector.value = "";
            this.seasonSelector.dom.find("option[value='" + this.seasonSelector.value + "']").attr("selected", "selected");
            cfg_obj.season = "";

            this.gameTypeSelector.value = window.QUOTED_DEFAULT_GAME_TYPE;
            this.gameTypeSelector.enabled = false;
            this.gameTypeSelector.dom.find("option[value='" + this.gameTypeSelector.value + "']").attr("selected", "selected");
            this.gameTypeSelector.dom.attr("disabled", "disabled");
            cfg_obj.game_type = window.QUOTED_DEFAULT_GAME_TYPE;

            this.activePlayerSelector.enabled = true;
            this.activePlayerSelector.dom.removeAttr("disabled").button("refresh");

            if ($.inArray(this.cfg.sortColumn.value, rate_stats) > -1) {
                this.playerTypeSelector.value = "QUALIFIER";
            } else {
                this.playerTypeSelector.value = "ALL";
            }
            this.playerTypeSelector.enabled = false;
            cfg_obj.playerType = this.playerTypeSelector.value;
            this.playerTypeSelector.dom.filter("[value='" + this.playerTypeSelector.value + "']").attr("checked", "checked");
            this.playerTypeSelector.dom.attr("disabled", "disabled").button("refresh");


            this.cfg.last_x_days.value = "";
            this.timeframeLinkSelector.value = "";
            this.timeframeLinkSelector.enabled = false;
            cfg_obj.timeframe = "";

            $("#time_select").hide();

            cfg_obj.season_type = value;
            this.seasonTypeSelector.value = value;
            this.executeTracking.call(this, {
                "season_type": value
            });
            this.setConfig(cfg_obj);
        },

        setSeasonEventProxy: function(value) {
            var selected_season = value;
            var deparam_obj;
            if (this.cfg.sectionType === "sp") {
                this.seasonTypeSelector.dom.attr('checked', false).button("refresh");
            }
            this.seasonSelector.value = value;
            this.executeTracking.call(this, {
                "season": selected_season
            });
            this.setConfig({
                "season": selected_season,
                "season_type": "ANY"
            });

            this.setWidgetDependencies(this.cfg);
        },

        setTeamEventProxy: function(value) {
            var key = "team_id";
            var selected_team = value;
            var playerType = this.playerTypeSelector.dom;
            $(playerType + "[value='ALL']").attr("checked", "checked").button("refresh");
            this.teamSelector.value = value;

            this.executeTracking.call(this, {
                "team_id": selected_team
            });
            this.setConfig({
                "team_id": selected_team,
                "playerType": "ALL"
            });
        },

        load: function() {
            var cfg = sortablePlayerList.cfg;
            var string_cfg = $.param(cfg);
            if (!this.datagridCache) {
                this.datagridCache = {};
            }
            var sectionType = cfg.sectionType;
            var has_split = cfg.split;
            var q, u, cols, i, n, config_parent;
            if (sectionType === "st") {
                config_parent = sortablePlayerList.dataConfigs[cfg.sectionType][cfg.statType];
                if (has_split) {
                    q = config_parent.SPLIT_URL;
                } else {
                    q = config_parent.URL;
                }
                u = lookupURLGlobal + "/json/named." + q + ".bam";
            } else if (sectionType === "sp") {
                config_parent = sortablePlayerList.dataConfigs[cfg.sectionType][cfg.statType][cfg.season_type];
                q = config_parent[cfg.playerType];
                u = pubUrl + '/pubajax/wf/flow/stats.splayer';
            }
            cols = config_parent.columns;
            if ((cfg.sortColumn === '') || !(valid_column(cfg.sortColumn, cols))) {
                cfg.sortColumn = config_parent.default_column;
                cfg.sortOrder = config_parent.default_direction;
            }

            var query = q,
                url = u,
                data = {
                    season: cfg.season,
                    sort_order: cfg.sortOrder
                };

            if (typeof(this.datagridCache[string_cfg]) === "undefined") {
                this.datagridCache[string_cfg] = {};
                data.sort_column = bam.stats.util.quote(cfg.sortColumn);

                if (cfg.statType && (cfg.sectionType === "sp")) {
                    data.stat_type = cfg.statType;
                }

                if (cfg.page_type && (cfg.sectionType === "sp")) {
                    data.page_type = cfg.page_type;
                }

                if (cfg.team_id && (cfg.sectionType === "sp")) {
                    data.team_id = cfg.team_id;
                }
                if (cfg.game_type) {
                    if (cfg.game_type === "'P'") {
                        data.game_type = ["'F'", "'D'", "'L'", "'W'"];
                    } else {
                        data.game_type = cfg.game_type;
                    }
                } else {
                    data.game_type = window.QUOTED_DEFAULT_GAME_TYPE;
                }
                if (cfg.last_x_days && (cfg.sectionType === "sp")) {
                    data.last_x_days = cfg.last_x_days;
                }

                if (cfg.playerType && (cfg.sectionType === "sp")) {
                    data.player_pool = cfg.playerType;
                }
                if (cfg.season_type && (cfg.sectionType === "sp")) {
                    data.season_type = cfg.season_type;
                }
                if (cfg.active_sw && (cfg.active_sw.length > 0) && (cfg.sectionType === "sp")) {
                    if (typeof(cfg.active_sw) === "string") {
                        data.active_sw = cfg.active_sw;
                    } else {
                        delete data.active_sw;
                    }
                }
                if ((cfg.league_code !== "'MLB'") && cfg.league_code) {
                    data.league_code = cfg.league_code;
                    if (cfg.sectionType === "sp") {
                        data.sport_code = cfg.sportCode;
                    }
                } else {
                    data.sport_code = cfg.sportCode;
                }

                if ((cfg.season_type !== "'ANY'") && (cfg.sectionType === "sp")) {
                    data.results = '1000';
                }
                if (cfg.position && (cfg.position.length >= 1) && (cfg.sectionType === "sp")) {
                    data.position = cfg.position;
                }
                if (cfg.split) {
                    data.sit_code = bam.stats.util.quote(cfg.split);
                }

                data[START_PAGE] = cfg.page;
                data[PER_PAGE] = cfg.perPage;

                this.datagridCache[string_cfg] = $.ajax({
                    url: url,
                    dataType: 'json',
                    data: data,
                    error: function() {
                        var error_div = $("<div></div>").attr("id", "error").css({
                            "text-align": "center",
                            "font-weight": "bold",
                            "padding": "10px",
                            "margin": "20px",
                            "border": "2px solid red"
                        }).html("This report is taking a long time to process. We're working on it in the background; please <a href='javascript:window.location.reload(true);'>refresh</a> to try the query again.");
                        bam.stats.util.hideSpinner("datagrid");
                        $("#datagrid").empty().append(error_div);
                        $("#pagination").hide();
                    }
                });

            }

            function handleLoadSuccess(data, status) {
                var i, n, total_pages;
                this.datagrid._data.columns.length = 0;

                for (i = 0, n = cols.length; i < n; ++i) {
                    this.datagrid.addColumn(cols[i]);
                }

                data = getDeepValue(data, query);
                var dg = this.datagrid;
                var sorted_on = this.cfg.sortColumn;
                var data_arr, d_arr_len, i, j;
                if (data.queryResults.totalSize > 0) {
                    data_arr = data.queryResults.row;
                    d_arr_len = data_arr.length;
                    i, j;
                    if (d_arr_len > 0) {
                        for (i = 0; i < d_arr_len; i++) {
                            for (j in data_arr[i]) {
                                if (!data_arr[i][j]) {
                                    data_arr[i][j] = "-";
                                }
                            }
                        }
                    }
                }

                dg.clearData();
                dg.loadData({
                    data: data,
                    callback: function() {
                        bam.stats.util.hideSpinner("datagrid");
                        $("#datagrid table").show();
                        dg.render('datagrid');
                        window.sortablePlayerList.setDefaultColumns();
                    }
                });
                this.datagrid_postprocessing(data);
                total_pages = getDeepValue(data, 'queryResults.' + TOTAL_PAGES);


                if ((this.cfg.sectionType === "sp") && (parseInt(total_pages, 10) > 0) && !($("#datagrid").has("#error").length)) {
                    this.pagination.setPages(total_pages);
                    this.pagination.setPage(getDeepValue(data, 'queryResults.' + START_PAGE));
                } else {
                    $("#pagination").hide();
                }
            }
            this.datagridCache[string_cfg].success(proxy(handleLoadSuccess, this));
        }
    });

    bam.namespace('stats.app').SortablePlayerList = SortablePlayerList;
    

})(jQuery, this);