<?php
//ini_set('display_errors','1');
//echo strrev("hello world!");

$host="localhost";
$databasename="prasitcom_ssru";
$username="prasitcom_admin";
$password="123456";

$studentid = $_GET['studentid'];
$con=mysql_connect($host,$username,$password) or die (mysql_error());
mysql_select_db($databasename) or die (mysql_error());
$query="select * from registration where student_id='$studentid'";
$results=mysql_query($query);
//echo "test point #1";

if (mysql_error()) {
//	header ("HTTP/1.1 500 Internal Server Error");
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
				