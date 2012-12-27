<?php
$host="localhost";
$databasename="prasitcom_ssru";
$username="prasitcom_admin";
$password="123456";

$mytext = $_GET['xtemp'];
$xcomma = strpos($mytext,',');
if (!$xcomma==0)
{
$username1 = substr($mytext,0,$xcomma);
$password1= substr($mytext,$xcomma+1);
}

$con=mysql_connect($host,$username,$password) or die (mysql_error());
mysql_select_db($databasename) or die (mysql_error());
$query="select * from user where username='$username1' and password='$password1'";
		mysql_query("SET character_set_results=utf8");
		mysql_query("SET character_set_client=utf8");
		mysql_query("SET character_set_connection=utf8");
$results=mysql_query($query);

if (mysql_error()) {
	header ("HTTP/1.1 500 Internal Server Error");
	echo $query . '\n';
	echo mysql_error();
}
else
{
	$r=mysql_fetch_array($results);
	if ($r['password']=="123456")
	{	
		$rows=array();
		$rows[] = $r;
		echo json_encode($rows);
	}
}
?>
