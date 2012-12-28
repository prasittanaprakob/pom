<?php
$host="localhost";
$databasename="prasitcom_ssru";
$username="prasitcom_admin";
$password="123456";

$mytext = $_GET['xtemp'];
$xdate = date("Y-m-d");
$xtime = date("H:i:s");

$comma = strpos($mytext,",");
$xchatfrom = substr($mytext,0,$comma);

$mytext = substr($mytext,$comma+1);
$comma = strpos($mytext,",");
$xchatto = substr($mytext,0,$comma);
$xdetail = substr($mytext,$comma+1);

$con=mysql_connect($host,$username,$password) or die (mysql_error());
mysql_select_db($databasename) or die (mysql_error());
		mysql_query("SET character_set_results=utf8");
		mysql_query("SET character_set_client=utf8");
		mysql_query("SET character_set_connection=utf8");


if (strlen($xdetail)>0) {
//save char on to table
	$sql = "insert into chat values('','" . $xdate . "'";
	$sql = $sql . ",'" . $xtime . "'";
	$sql = $sql . ",'" . $xchatfrom . "'";
	$sql = $sql . ",'" . $xchatto . "'";
	$sql = $sql . ",'" . $xdetail . "')";
	$results = mysql_query($sql);
	$xdetail = "";
}

//retrieve all chat data --> $xcharfrom / $chatto
$query="select * from chat where (chatfrom='$xchatfrom' and chatto='$xchatto') or (chatfrom='$xchatto' and chatto='$xchatfrom') order by chatdate,chattime";
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
