<?php
$host="localhost";
$databasename="prasitcom_ssru";
$username="prasitcom_admin";
$password="123456";

$category = $_GET['xtemp'];
$con=mysql_connect($host,$username,$password) or die (mysql_error());
mysql_select_db($databasename) or die (mysql_error());
$query="select * from news where category='$category' order by newsdate";
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
	$rows=array();
	while ($r=mysql_fetch_assoc($results)) {
		$rows[] = $r;
	}
	echo json_encode($rows);
}
?>
