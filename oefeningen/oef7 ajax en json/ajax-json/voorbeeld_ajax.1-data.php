<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />

		<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
		Remove this if you use the .htaccess -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

		<title>Les 4 : voorbeeld 1 : data</title>
		<meta name="description" content="" />
		<meta name="author" content="Steven" />

		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

	</head>

	<body>

		<h1>jQuery - Ajax ftw</h1>

		<div id="databron">
			<img src="http://sat24.com/image.ashx?country=eu&type=zoom&format=1280x1024001001&rnd=610703" alt="satelliet europa" >
			<p>
				Satellietbeeld van Europa
			</p>
		</div>

	</body>
</html>
