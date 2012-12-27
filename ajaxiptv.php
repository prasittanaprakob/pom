<?php
$host="localhost";
$databasename="prasitcom_ssru";
$username="prasitcom_admin";
$password="123456";

$classid = $_GET['xtemp'];
$xday = (int) date("d");
$xmonthyear = date("m/Y");
$hr = (int) date("H");
$con=mysql_connect($host,$username,$password) or die (mysql_error());
mysql_select_db($databasename) or die (mysql_error());
$query="select * from timetable where monthyear='$xmonthyear' and day='$xday' and time1='$hr' and classid='$classid'";
$results=mysql_query($query);

if (mysql_error()) {
	header ("HTTP/1.1 500 Internal Server Error");
	echo $query . '\n';
	echo mysql_error();
}
else
{
	if (mysql_num_rows($results) > 0) {
		$row=mysql_fetch_assoc($results);
		echo "OK";
	}
	else {
		$query="select * from timetable where monthyear='$xmonthyear' and day>='$xday' and time1>'$hr' and classid='$classid' order by day";
		$results=mysql_query($query);
		if (mysql_num_rows($results) > 0) {
			$row = mysql_fetch_assoc($results);
			$hr = $row['time1'];
			$day = $row['day'];
			echo "Next broadcast of " . $classid . " will be at " . $hr;
		}
		else {			
			echo "No broadcast of this class at this time";
		}
	}
}
?>
