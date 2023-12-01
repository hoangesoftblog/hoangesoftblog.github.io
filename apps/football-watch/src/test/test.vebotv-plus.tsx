// Beautify & minify from the "https://vebotv.plus/wp-admin/admin-ajax.php?t=1701163646505"
// There's a function to show which tab, which can be useful
let a = `
<div class="tab-container">
    <script>
    function showTab(tabId) {
        // console.log("Switching to tab:", tabId); // Debugging line
    
        // Handle tab panes
        var panes = document.querySelectorAll(".tab-pane");
        for (var i = 0; i < panes.length; i++) {
            panes[i].classList.remove("active");
        }
        document.getElementById(tabId).classList.add("active");
    
        // Handle tabs
        var tabs = document.querySelectorAll(".tab");
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove("active");
        }
        var currentTabId = tabId + "Tab";
        document.getElementById(currentTabId).classList.add("active");
    }
    </script>
    
    <div class="tabs">
        <div class="tab owards" id="liveMatchesTab" onclick='showTab("liveMatches")'>Đang đá <span class="total">2</span>
        </div>
        <div class="tab owards" id="upcomingMatchesTab" onclick='showTab("upcomingMatches")'>Sắp tới <span class="total">10</span>
        </div>
        <div class="tab owards" id="allMatchesTab" onclick='showTab("allMatches")'>Tất cả <span class="total">12</span>
        </div>
    </div>
    <div class="match-filter">
        <div class="form-group leagues">
            <select class="form-control" id="competitionFilter">
                <option value="all">Tất cả các giải đấu</option>
                <option value="AFC Champions League">AFC Champions League</option>
                <option value="Giải hạng 2 Romania">Giải hạng 2 Romania</option>
                <option value="IND DSD">IND DSD</option>
                <option value="Russian Cup">Russian Cup</option>
                <option value="UEFA Youth League">UEFA Youth League</option>
                <option value="World Cup U17">World Cup U17</option>
            </select>
        </div>
    </div>
</div>
<div class="tab-content">
    <div class="tab-pane" id="allMatches">
        <div class="allMatches-container">
            <div class="main-match live-match">
                <a href="https://xem.vebotv.plus/match/argentina-u17-đức-u17/M2dscnc3aDd5cDE2cWR5" title="Live link">
                    <div class="live-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">World Cup U17</span>
                        </div>
                        <div class="match-date">
                            <p>15:30 - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_live">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/7d44a77ef7bf7d809287828b992f3007.png" alt="Argentina U17" loading="lazy">
                            <p>Argentina U17</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="score-box">
                                <div class="home-score">
                                    <p>2</p>
                                </div>
                                <span>-</span>
                                <div class="away-score">
                                    <p>1</p>
                                </div>
                            </div>
                            <div class="elapsed-time">
                                <p class="e_minutes">45'</p>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/5856c2f4a854359864b18f9aed3f8874.png" alt="Đức U17" loading="lazy">
                            <p>Đức U17</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/4Ed0pyD.png)"></div>
                            <p>Seko</p>
                        </div>
                        <div class="match-footer__btn">
                            <a class="btn-watch" rel="nofollow" href="https://xem.vebotv.plus/match/argentina-u17-đức-u17/M2dscnc3aDd5cDE2cWR5" title="Trực tiếp">Trực tiếp</a>
                        </div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/incheon-united-yokohama-f.-marinos/bjU0cWxsaDcycDc0cXZ5" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">AFC Champions League</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/36559689046e7d1d4f597c1a0bf9c5d6.png" alt="Incheon United" loading="lazy">
                            <p>Incheon United</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>17:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/78ddaaa79d9502f5e2df0fbb6261f937.png" alt="Yokohama F. Marinos" loading="lazy">
                            <p>Yokohama F. Marinos</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/nQe40gX.png)"></div>
                            <p>Ngongao</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/pathum-united-clb-ulsan-hyundai-/ZGoycnlvaDFrMWRrcTF6" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">AFC Champions League</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/daa8e2b6b564b0369008784b2b4c8197.png" alt="Pathum United" loading="lazy">
                            <p>Pathum United</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>17:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/197fe7600c10cdd1f22e2ab0194b6739.png" alt="CLB Ulsan Hyundai " loading="lazy">
                            <p>CLB Ulsan Hyundai</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/qtVZEmW.png)"></div>
                            <p>Elephant</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/kawasaki-frontale-clb-johor-darul-takzim/Mnk4bTR6aDYzNjRqcWww" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">AFC Champions League</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/937795c0851c1e794e96a5cb660fcd59.png" alt="Kawasaki Frontale" loading="lazy">
                            <p>Kawasaki Frontale</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>17:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/70564ba021548f8fb8d511ab62f8c526.png" alt="CLB Johor Darul Takzim" loading="lazy">
                            <p>CLB Johor Darul Takzim</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/98iMYJJ.png)"></div>
                            <p>Lavi</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/shandong-taishan-kaya-fc/eTBvcjVqaG5sem44cXd6" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">AFC Champions League</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/85c080cf02a7161687ddd5b5800dc303.png" alt="Shandong Taishan" loading="lazy">
                            <p>Shandong Taishan</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>19:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/19ea9ea1eafe06b67600653432bfb22f.png" alt="Kaya FC" loading="lazy">
                            <p>Kaya FC</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/PyVgU3d.png)"></div>
                            <p>Saitama</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/pháp-u17-mali-u17/eTM5bXAxaHp5MDUybW9q" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">World Cup U17</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/8eb4b4c01bf3375828c5494c2f6e7685.png" alt="Pháp U17" loading="lazy">
                            <p>Pháp U17</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>19:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/0a94eea42ecd117d87eb79c61bdd656e.png" alt="Mali U17" loading="lazy">
                            <p>Mali U17</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/zyA5G92.png)"></div>
                            <p>ZLATAN</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/feyenoord-u19-atletico-de-madrid-u19/ancycjA5aDJuOWo4cno4" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">UEFA Youth League</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/47dcbe8d4e20966269001b2ecd6d419f.png" alt="Feyenoord U19" loading="lazy">
                            <p>Feyenoord U19</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>20:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/aae43dcaba19e2408ad02d5e9d027c1a.png" alt="Atletico de Madrid U19" loading="lazy">
                            <p>Atletico de Madrid U19</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/4Ed0pyD.png)"></div>
                            <p>Seko</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/clb-concordia-unirea-slobozia/Mnk4bTR6aDYwMHkwcWww" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">Giải hạng 2 Romania</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/ed3be0e2c3ba0a819ac72de239f60bb4.png" alt="CLB Concordia" loading="lazy">
                            <p>CLB Concordia</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>22:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/34c01a893864ab4584209db05b29e317.png" alt="Unirea Slobozia" loading="lazy">
                            <p>Unirea Slobozia</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/BTmU9zo.png)"></div>
                            <p>Dihi</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/clb-baltika-lokomotiv/enA1cnpnaDVwcGowcTgy" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">Russian Cup</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/cf9a5d9f00a03c49b5370261ba1281c1.png" alt="CLB Baltika" loading="lazy">
                            <p>CLB Baltika</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>22:15</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/f2908462e6b95194d66d92eb8f48aef6.png" alt="Lokomotiv" loading="lazy">
                            <p>Lokomotiv</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/98iMYJJ.png)"></div>
                            <p>Lavi</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/clb-al-fayha-ahal/bjU0cWxsaDcyNzh6cXZ5" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">AFC Champions League</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/ae4d3fd774a548522f624f827d1ef7f3.png" alt="CLB Al Fayha" loading="lazy">
                            <p>CLB Al Fayha</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>23:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/f76cf9527c2a854c738c744f38abbc59.png" alt="Ahal" loading="lazy">
                            <p>Ahal</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/zyA5G92.png)"></div>
                            <p>ZLATAN</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/al-ain-clb-pakhtakor/MjN4bXZraDgzOGtwcWc4" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">AFC Champions League</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/f0383cb25545401b71cfbc0c67f12b8a.png" alt="Al Ain" loading="lazy">
                            <p>Al Ain</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>23:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/1cce63f2bab329f5f017123ada9f8565.png" alt="CLB Pakhtakor" loading="lazy">
                            <p>CLB Pakhtakor</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/nQe40gX.png)"></div>
                            <p>Ngongao</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match live-match">
                <a href="https://xem.vebotv.plus/match/sudeva-delhi-vatika-fc/enA1cnpnaDVwNmtlcTgy" title="Live link">
                    <div class="live-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">IND DSD</span>
                        </div>
                        <div class="match-date">
                            <p>16:00 - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_live">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/6f6943f276b411124f48fca0866e6d3c.png" alt="Sudeva Delhi" loading="lazy">
                            <p>Sudeva Delhi</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="score-box">
                                <div class="home-score">
                                    <p>0</p>
                                </div>
                                <span>-</span>
                                <div class="away-score">
                                    <p>3</p>
                                </div>
                            </div>
                            <div class="elapsed-time">
                                <p class="e_minutes">28'</p>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/6a24f9eeb62ad2123f3d570f1752eae4.png" alt="Vatika FC" loading="lazy">
                            <p>Vatika FC</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer"></div>
                        <div class="match-footer__btn">
                            <a class="btn-watch" rel="nofollow" href="https://xem.vebotv.plus/match/sudeva-delhi-vatika-fc/enA1cnpnaDVwNmtlcTgy" title="Trực tiếp">Trực tiếp</a>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div class="tab-pane" id="liveMatches">
        <div class="liveMatches-container">
            <div class="main-match live-match">
                <a href="https://xem.vebotv.plus/match/argentina-u17-đức-u17/M2dscnc3aDd5cDE2cWR5" title="Live link">
                    <div class="live-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">World Cup U17</span>
                        </div>
                        <div class="match-date">
                            <p>15:30 - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_live">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/7d44a77ef7bf7d809287828b992f3007.png" alt="Argentina U17" loading="lazy">
                            <p>Argentina U17</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="score-box">
                                <div class="home-score">
                                    <p>2</p>
                                </div>
                                <span>-</span>
                                <div class="away-score">
                                    <p>1</p>
                                </div>
                            </div>
                            <div class="elapsed-time">
                                <p class="e_minutes">45'</p>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/5856c2f4a854359864b18f9aed3f8874.png" alt="Đức U17" loading="lazy">
                            <p>Đức U17</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/4Ed0pyD.png)"></div>
                            <p>Seko</p>
                        </div>
                        <div class="match-footer__btn">
                            <a class="btn-watch" rel="nofollow" href="https://xem.vebotv.plus/match/argentina-u17-đức-u17/M2dscnc3aDd5cDE2cWR5" title="Trực tiếp">Trực tiếp</a>
                        </div>
                    </div>
                </a>
            </div>
            <div class="main-match live-match">
                <a href="https://xem.vebotv.plus/match/sudeva-delhi-vatika-fc/enA1cnpnaDVwNmtlcTgy" title="Live link">
                    <div class="live-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">IND DSD</span>
                        </div>
                        <div class="match-date">
                            <p>16:00 - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_live">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/6f6943f276b411124f48fca0866e6d3c.png" alt="Sudeva Delhi" loading="lazy">
                            <p>Sudeva Delhi</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="score-box">
                                <div class="home-score">
                                    <p>0</p>
                                </div>
                                <span>-</span>
                                <div class="away-score">
                                    <p>3</p>
                                </div>
                            </div>
                            <div class="elapsed-time">
                                <p class="e_minutes">28'</p>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/6a24f9eeb62ad2123f3d570f1752eae4.png" alt="Vatika FC" loading="lazy">
                            <p>Vatika FC</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer"></div>
                        <div class="match-footer__btn">
                            <a class="btn-watch" rel="nofollow" href="https://xem.vebotv.plus/match/sudeva-delhi-vatika-fc/enA1cnpnaDVwNmtlcTgy" title="Trực tiếp">Trực tiếp</a>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div class="tab-pane" id="upcomingMatches">
        <div class="upcomingMatches-container">
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/incheon-united-yokohama-f.-marinos/bjU0cWxsaDcycDc0cXZ5" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">AFC Champions League</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/36559689046e7d1d4f597c1a0bf9c5d6.png" alt="Incheon United" loading="lazy">
                            <p>Incheon United</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>17:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/78ddaaa79d9502f5e2df0fbb6261f937.png" alt="Yokohama F. Marinos" loading="lazy">
                            <p>Yokohama F. Marinos</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/nQe40gX.png)"></div>
                            <p>Ngongao</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/pathum-united-clb-ulsan-hyundai-/ZGoycnlvaDFrMWRrcTF6" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">AFC Champions League</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/daa8e2b6b564b0369008784b2b4c8197.png" alt="Pathum United" loading="lazy">
                            <p>Pathum United</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>17:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/197fe7600c10cdd1f22e2ab0194b6739.png" alt="CLB Ulsan Hyundai " loading="lazy">
                            <p>CLB Ulsan Hyundai</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/qtVZEmW.png)"></div>
                            <p>Elephant</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/kawasaki-frontale-clb-johor-darul-takzim/Mnk4bTR6aDYzNjRqcWww" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">AFC Champions League</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/937795c0851c1e794e96a5cb660fcd59.png" alt="Kawasaki Frontale" loading="lazy">
                            <p>Kawasaki Frontale</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>17:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/70564ba021548f8fb8d511ab62f8c526.png" alt="CLB Johor Darul Takzim" loading="lazy">
                            <p>CLB Johor Darul Takzim</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/98iMYJJ.png)"></div>
                            <p>Lavi</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/shandong-taishan-kaya-fc/eTBvcjVqaG5sem44cXd6" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">AFC Champions League</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/85c080cf02a7161687ddd5b5800dc303.png" alt="Shandong Taishan" loading="lazy">
                            <p>Shandong Taishan</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>19:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/19ea9ea1eafe06b67600653432bfb22f.png" alt="Kaya FC" loading="lazy">
                            <p>Kaya FC</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/PyVgU3d.png)"></div>
                            <p>Saitama</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/pháp-u17-mali-u17/eTM5bXAxaHp5MDUybW9q" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">World Cup U17</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/8eb4b4c01bf3375828c5494c2f6e7685.png" alt="Pháp U17" loading="lazy">
                            <p>Pháp U17</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>19:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/0a94eea42ecd117d87eb79c61bdd656e.png" alt="Mali U17" loading="lazy">
                            <p>Mali U17</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/zyA5G92.png)"></div>
                            <p>ZLATAN</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/feyenoord-u19-atletico-de-madrid-u19/ancycjA5aDJuOWo4cno4" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">UEFA Youth League</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/47dcbe8d4e20966269001b2ecd6d419f.png" alt="Feyenoord U19" loading="lazy">
                            <p>Feyenoord U19</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>20:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/aae43dcaba19e2408ad02d5e9d027c1a.png" alt="Atletico de Madrid U19" loading="lazy">
                            <p>Atletico de Madrid U19</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/4Ed0pyD.png)"></div>
                            <p>Seko</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/clb-concordia-unirea-slobozia/Mnk4bTR6aDYwMHkwcWww" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">Giải hạng 2 Romania</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/ed3be0e2c3ba0a819ac72de239f60bb4.png" alt="CLB Concordia" loading="lazy">
                            <p>CLB Concordia</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>22:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/34c01a893864ab4584209db05b29e317.png" alt="Unirea Slobozia" loading="lazy">
                            <p>Unirea Slobozia</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/BTmU9zo.png)"></div>
                            <p>Dihi</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/clb-baltika-lokomotiv/enA1cnpnaDVwcGowcTgy" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">Russian Cup</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/cf9a5d9f00a03c49b5370261ba1281c1.png" alt="CLB Baltika" loading="lazy">
                            <p>CLB Baltika</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>22:15</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/f2908462e6b95194d66d92eb8f48aef6.png" alt="Lokomotiv" loading="lazy">
                            <p>Lokomotiv</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/98iMYJJ.png)"></div>
                            <p>Lavi</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/clb-al-fayha-ahal/bjU0cWxsaDcyNzh6cXZ5" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">AFC Champions League</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/ae4d3fd774a548522f624f827d1ef7f3.png" alt="CLB Al Fayha" loading="lazy">
                            <p>CLB Al Fayha</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>23:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/f76cf9527c2a854c738c744f38abbc59.png" alt="Ahal" loading="lazy">
                            <p>Ahal</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/zyA5G92.png)"></div>
                            <p>ZLATAN</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
            <div class="main-match upcoming-match">
                <a href="https://xem.vebotv.plus/match/al-ain-clb-pakhtakor/MjN4bXZraDgzOGtwcWc4" title="Upcoming link">
                    <div class="upcoming-overlay"></div>
                    <div class="tournament-header">
                        <div class="match-league">
                            <span class="text-ellipsis">AFC Champions League</span>
                        </div>
                        <div class="match-date">
                            <p>NS - 2023-11-28</p>
                        </div>
                    </div>
                    <div class="match-content_upcoming">
                        <div class="match-home_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/f0383cb25545401b71cfbc0c67f12b8a.png" alt="Al Ain" loading="lazy">
                            <p>Al Ain</p>
                        </div>
                        <div class="match-mid_score text-center">
                            <div class="time-box">
                                <div class="match_time">
                                    <p>23:00</p>
                                </div>
                                <div class="match-vs">
                                    <p>VS</p>
                                </div>
                            </div>
                        </div>
                        <div class="match-away_team text-center">
                            <img class="team-70-mb-2 perfmatters-lazy" src="https://img.thesports.com/football/team/1cce63f2bab329f5f017123ada9f8565.png" alt="CLB Pakhtakor" loading="lazy">
                            <p>CLB Pakhtakor</p>
                        </div>
                    </div>
                    <div class="match-footer">
                        <div class="match-footer__streamer">
                            <div class="streamer-image" style="background-image:url(https://i.imgur.com/nQe40gX.png)"></div>
                            <p>Ngongao</p>
                        </div>
                        <div class="match-footer__btn"></div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>`