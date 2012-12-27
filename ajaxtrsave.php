<?php
$host="localhost";
$databasename="prasitcom_ssru";
$username="prasitcom_admin";
$password="123456";

$mytext = $_GET['xtemp'];
$xcomma = strpos($mytext,',');
if (!$xcomma==0)
{
$videoid = substr($mytext,0,$xcomma);
$studentid= substr($mytext,$xcomma+1);
}

if (!$studentid=="")
{
	$con=mysql_connect($host,$username,$password) or die (mysql_error());
	mysql_select_db($databasename) or die (mysql_error());
	
	$now = date("Y-m-d, H:i:s");
	$sql = "insert into trans values('','" . $studentid . "'";
	$sql = $sql . ",'" . $now . "'";
	$sql = $sql . ",''";
	$sql = $sql . ",'" . $videoid . "')";
	$query=mysql_query($sql);
	
	if (mysql_error()) {
		header ("HTTP/1.1 500 Internal Server Error");
		echo $query . '\n';
		echo mysql_error();
	}
}
?>
