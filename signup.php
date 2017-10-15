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
        <link rel="stylesheet" href="./css/signup.css">

        <script type="text/javascript" src="./js/main.js"></script>
        <script type="text/javascript" src="./js/ajax.js"></script>
        <script type="text/javascript" src="./js/signup.js"></script>
        <script type="text/javascript" src="./js/login.js"></script>
        <!-- Javacript inclusio for share button (give some validation error!)
        <script type="text/javascript" src="./js/twitter.js"></script>
        <script type="text/javascript" src="./js/facebook.js"></script>
        -->
        
        <title> Metal UP : Sign up for FREE </title>
	</head>
	<body>
		<div class="wrapper signup">
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
                    <li class="cloud">
                        <a class="item score" href="score.php">Score</a>
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
                <div class="form">
                    <form id="formData" method="post" action="javascript:formValidation()">
                        <p class="errorAlert"></p>
                        <p>
                            <label for="name">Name
                                <span class="required">*</span>
                            </label>
                            <input type="text" class="sign-input" name="name" id="name" maxlength="10" placeholder="Soldiername">
                        </p>
                        <p>
                            <label for="email">Email 
                                <span class="required">*</span>
                            </label>
                            <input type="email" class="sign-input" name="email" id="email" placeholder="user@example.com">
                        </p>
                        <p>
                            <label for="password">Password
                                <span class="required">*</span>
                            </label>
                            <input type="password" class="sign-input" name="password" id="password" placeholder="mypasw">
                        </p>
                        <p>
                            <label for="passwordConf">Password confirm
                                <span class="required">*</span>
                            </label>
                            <input type="password" class="sign-input" id="passwordConf" placeholder="mypasw">
                        </p>
                        <p>
                            <label for="bio">Bio</label>
                            <textarea name="bio" id="bio" cols="45" rows="10" placeholder="Eg. Trust no one!" maxlength="5000"></textarea>
                        </p>
                        <div class="submitcontainer">
                            <button id="submit" class="regButton" onclick="submit">
                                Sign Up
                            </button>
                        </div>											
                    </form>
                </div>
                <div class="afterSignBox">
                    <div class="afterSignText">
                        <p class="responseText"></p>
                    </div>
                    <div class="marcoUp">
                        <img src="img/after_sign.gif" alt="Sign up successfull">
                    </div>
                    <div class="home">
                        <a class="home" href="index.php">Return to Home page</a>
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