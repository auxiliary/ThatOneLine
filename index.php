<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Canvext</title>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="css/tipso.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Alegreya+Sans" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
    <script src="js/tipso.js"></script>
    <script src="http://d3js.org/d3.v3.min.js"></script>
    <script src="js/tools.js"></script>
    <script src="js/canvext.js"></script>
    <script src="js/markode.js"></script>
    <script>
        $(document).ready(function(){
            var markode = $(".canvext").markode({});
        });
    </script>
</head>
<body>
    <div class="wrapper">
        <div class="title">
            That<span class="emph">One</span>Line
        </div>
        <div class="canvext"> </div>
        <button id="btn-share">Share</button>
        <button id="btn-clear">Clear</button>

        <div class="footer">Copyright (C) 2017 Moh. Raji</div>
    </div>
</body>
</html>
