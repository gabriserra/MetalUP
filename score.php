<?php
	session_start();
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="description" content="Official MetalUP page, here you can Signup, Play and consult Rank!">
        <meta name="author" content="Gabriele Serra">
        
        <link rel="shortcut icon" type="image/x-icon" href="./img/favicon.ico"/>

        
		<link rel="stylesheet" href="./css/style.css">
        <link rel="stylesheet" href="./css/score.css">

        <script type="text/javascript" src="./js/main.js"></script>
        <script type="text/javascript" src="./js/ajax.js"></script>
        <script type="text/javascript" src="./js/score.js"></script>
        <script type="text/javascript" src="./js/login.js"></script>
        <!-- Javacript inclusio for share button (give some validation error!)
        <script type="text/javascript" src="./js/twitter.js"></script>
        <script type="text/javascript" src="./js/facebook.js"></script>
        -->
        
        <title> Metal UP : Rise in RANK! </title>
	</head>
	<body>
		<div class="wrapper score">
            <header>
                <div class="soldiername">
                    <?php
                        if (isset($_SESSION['name'])) {
                            echo "<p>Hi " . $_SESSION['name'] . "!</p>";
                            echo "<a onclick='hideSignButton(true)' href='./php/logout.php'> Logout NOW</a>";
                        } else {
                            echo "<p>Hi Soldier!</p>";
                            echo "<a href='signup.php'> Sign up NOW</a>";
                        }
                    ?>   
                </div>
                <div class="logo">
                    <a href="index.php" class="mainLogo"></a>
                </div>
            </header>
            <nav class="menu">
                <ul>
                    <li class="cloud">
                        <a class="item home" href="index.php">Home</a>
                    </li>
                    <li class="cloud">
                        <a class="item play" href="javascript:play(true)">Play</a>
                    </li>
                    <?php
                        if (!isset($_SESSION['name'])) {
                            echo "<li class='cloud'>";
                            echo "<a class='item sign' href='javascript:signShow(true)'>Sign in</a>";
                            echo "</li>";
                        }
                    ?>
                </ul>
            </nav>
            <main>
                <?php 
                    include("./html/wrappers.html"); 
                ?>
                <div class="scoreWrapper">
                    <div class="scoreBox">
                        <form name ="scoreControl" method ="post" action ="javascript:refreshScore()">

                            <input type="submit" class="submit" name="submit" value="Check Rank!">
                            <p class="errorAlert"></p>

                            <label class="label ranktype" for="ranktype">Complete Rank or my Rank:</label>
                            <input id="ranktype" onchange="checkBoxChangeState()" type="radio" name="ranktype" class="rank-input" value="totalrank" checked>
                            <input type="radio" onchange="checkBoxChangeState()" name="ranktype" class="rank-input" value="myrank">
                            <label class="label distinct" for="distinct">Show only highest:</label>
                            <input id="distinct" type="checkbox" name="distinct" class="rank-input" value="ok">
                            <label class="label page" for="pageNum">Page:</label>
                            <input id="pageNum" class="pageNum" type="text" name="npage" value="1">

                            <button class="prev pageIcon" name="prevPage" onclick="stepScore('prev')"></button>
                            <button class="next pageIcon" name="nextPage" onclick="stepScore('next')"></button>

                        </form>
                        <table id="scoreTable">
                            <tr>
                                <th>Soldier name</th>
                                <th>Points scored</th>
                                <th>Rank position</th>
                                <th>On date</th>
                            </tr>
                        </table>
                    </div>
                </div>
            </main>
		</div>
        <footer>
            <?php 
                include("./html/footer.html"); 
            ?> 
        </footer>
	</body>
</html>