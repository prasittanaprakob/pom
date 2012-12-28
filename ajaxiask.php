<?php
$mytext = $_GET['xtemp'];
$comma = strpos($mytext,",");

if ($comma > 0) {
	$subject = substr($mytext,0,$comma);
	$temp = substr($mytext,$comma+1);
	$mytext = $temp;
	
	$comma = strpos($mytext,",");
	$detail = substr($mytext,0,$comma);
	$temp = substr($mytext,$comma+1);
	$mytext = $temp;
	
	$comma = strpos($mytext,",");	
	$name = substr($mytext,0,$comma);
	$customeremail = substr($mytext,$comma+1);
	$header = "from: $name <$customeremail>";
	$to = "prasittanaprakob@yahoo.com";

	$send = mail($to,$subject,$detail,$header);
	if ($send) {
		echo "We've received your mail";
	}
	else
	{
		echo "Error!";
	}		
}
?>
