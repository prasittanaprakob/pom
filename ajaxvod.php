<?php
$host="localhost";
$databasename="prasitcom_ssru";
$username="prasitcom_admin";
$password="123456";

$mytext = $_GET['xtemp'];
$xcomma = strpos($mytext,',');
$classid = substr($mytext,0,$xcomma);		//select clase
$calledfrom = substr($mytext,$xcomma+1);	//called from which button on main screen
if ($calledfrom <> 'itutor')
{
$query="select * from videos where substr(name,1,7)='$classid' and substr(name,-1) <>'T'";
}
else
{
$query="select * from videos where substr(name,1,7)='$classid' and substr(name,-1)='T'";
}

$con=mysql_connect($host,$username,$password) or die (mysql_error());
mysql_select_db($databasename) or die (mysql_error());
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
	if (!mysql_num_rows($results)==0) {
		$rows=array();
		while ($r=mysql_fetch_assoc($results)) {
			$rows[] = $r;
		}
		echo json_encode($rows);
	}
	else
	{
		echo "x";
	}
}
?>
