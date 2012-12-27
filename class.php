<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">


<head>
<!-- force to use ie compatibility mode -->
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />

<!-- check it ie9 use special script -->
<!--[if IE 9]><script type="text/javascript"> jQuery(document).ready(function($) { _V_.options.techOrder = ["flash", "html5", "links"]; }); </script><![endif]-->

<!-- video.js stylesheet and script -->
<link href="video-js/video-js.css" rel="stylesheet" />
<script src="video-js/video.js"></script>
<script>_V_.options.flash.swf = "video-js/video-js.swf"</script>

<!-- use utf-8 encoding -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<!-- this page stylesheet -->
<link href="css/class.css" rel="stylesheet"  type="text/css" />
<?php
session_start();
?>

</head>

<body>
<?php
if($_SESSION['ses_userid'] <> session_id() or $_SESSION['ses_username']=="")
{
	header("Location: http://www.prasit999.com/index.php");	
}
?>

<?php
if (isset($_GET['vodname']))
{	
	mysql_connect("localhost","prasitcom_admin", "123456") or die('Cannot connect to the database because: '.mysql_error());
	mysql_select_db("prasitcom_ssru");
	$charset="SET character_set_results=utf8";
	mysql_query($charset) or die('invalid query.' . mysql_error());

	$vodname = $_GET['vodname'];
	$classid = $_GET['classid'];
	$now = date("Y-m-d, H:i:s");
	$sql = "insert into trans values('','" . $_SESSION['ses_username'] . "'";
	$sql = $sql . ",'" . $now . "'";
	$sql = $sql . ",''";
	$sql = $sql . ",'" . basename($vodname,".mp4") . "')";
	$query=mysql_query($sql);
//	unset $_GET['vodname'];
}
?>

<?php
function classname($classid) {
	$sql="select * from classes where class_id='$classid'";
	$query=mysql_query($sql);
	$row=mysql_fetch_array($query);
	return $row['class_name'];
}
?>

<div id="Wrap" class="shadow">
	<div id="Banner"></div>
    <div id="studentname" align="right"><?php echo $_SESSION['ses_username']; ?></div>
        <div id="Main" align="center">       
            <video id="myvideo1" class="video-js vjs-default-skin"
                width="649" height="365"
                poster=""
                autoplay
                controls
                preload="none"
                loop
                data-setup="{}">
                <source src="http://www.prasit999.com/media/videos/<?php echo $vodname; ?>" type='video/mp4'>
            </video>
        </div>
    <div id="Content1"> <!-- class buttons -->
		<table border=0 width=100%>        
<?php
mysql_connect("localhost","prasitcom_admin", "123456") or die('Cannot connect to the database because: '.mysql_error());
mysql_select_db("prasitcom_ssru");
$charset="SET character_set_results=utf8";
mysql_query($charset) or die('invalid query.' . mysql_error());

$sql="select * from registration where student_id='" .$_SESSION['ses_username'] . "'";
$query=mysql_query($sql);
while ($row=mysql_fetch_array($query))
{
	$cn = classname($row['class_id']);
	$cid= $row['class_id'];
	echo "<tr>";
	echo "<td><a href='class.php?classid=$cid' >" . $cn . "</a></td>";
	echo "</tr>";
}
?>		
		</table>
    </div>
	<div id="Main_spacer"></div>
        <div id="Content2">
<?php
			$classid=$_GET['classid'];
			$sql="select * from videos where substr(name,1,7)='$classid'";
			$query=mysql_query($sql);
			while ($row=mysql_fetch_array($query))
			{
				$rn= basename($row['name'],".mp4");
				$rn_desc=$row['detail'];
?>				
				<div name = "cnt2" class="cnt2">
                <a href="class.php?vodname=<?php echo $rn . '.mp4'; ?>&classid=<?php echo $classid ?>"><img class="vod" src="media/images/<?php echo $rn . '.jpg'; ?>" /></a>
				<?php echo $rn_desc; ?></div>
<?php                
			}
?>		

        </div>       
	<div id="Footer" align=left"><img src="media/images/ssru_footer.png" /></div>        
</div>  
</body>
</html>
