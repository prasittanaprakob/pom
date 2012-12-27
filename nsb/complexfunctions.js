// copyright 2012 NS BASIC Corporation. All rights reserved.
  
function Checkbox(id, width, options, html) {
  var i,s,arrOptions;
  arrOptions=split(options, ",");
  s="<ul class='pageitem' id='" + id + "' " + enquote(html) + ">\n"
  for (i=0; i<arrOptions.length; i++){
    s=s+"  <li class='checkbox'>\n"
    + "    <span class='name'>"+arrOptions[i]+"</span>\n"
    + "    <input type='checkbox'>\n";
    }
  s=s+"</ul>";
  //alert(s);
  document.write(s);
  eval(id).style.height="auto";
  if(width<=10) eval(id).style.width=document.width-18+"px";
  eval(id).getValue=function(n){
    if (n<1 || n>=eval(id).childNodes.length) {
      alert(nsbx.messages["Error:_Index_out_of_range:_"] + id + "[" + n + "]")};
    return eval(id).childNodes[n].children[1].checked;
    }
  eval(id).setValue=function(n,val){
    if (n<1 || n>=eval(id).childNodes.length) {
      alert(nsbx.messages["Error:_Index_out_of_range:_"] + id + "[" + n + "]")};
    if (typeof(val)!="boolean"){
      alert(nsbx.messages["Error:_Must_be_true_or_false:_"] + id + "[" + n + "] " + val)};
    eval(id).childNodes[n].children[1].checked=val;
    }  
}

function ButtonBar(id, TopBar, ButtonNames, DefaultButton, html) {
  var i,s,arrNames;
  arrNames=split(ButtonNames,",");
  s="<div id='"+id+"'>\n";
  if (TopBar==true){
    s+="<div id='topbar'" + enquote(html) + ">";
    if (arrNames.length==2) s+="<div id='duoselectionbuttons'>"
	                   else s+="<div id='triselectionbuttons'>";
  } else {
    if (arrNames.length==2) s+="<div id='duobutton'>"
	                   else s+="<div id='tributton'>";  
    s+="<div class='links'" + enquote(html) + ">";
  }
  s+="\n  ";
  for (i=0; i<arrNames.length; i++){
    s+="<a href='javascript:"+id+".onbuttonclick(\""+arrNames[i]+"\")'";
	if (i+1==DefaultButton) s+=" id='pressed'";
	s+=">"+arrNames[i]+"</a>";
  }
  s+="\n</div></div></div>\n";
  //alert(s); 
  document.write(s);
  eval(id).style.width="100%";
}

function TitleBar(id, title, leftButtonStyle, rightButtonStyle, leftButtonNames, rightButtonNames, html) {
  var imageButtons,s,arrNames,i;
  imageButtons=['home','back','forward','info','minus','plus','setup'];
  s="<div id='" + id + "'></div>\n";
  s+="<div id='topbar' "+ enquote(html) + ">\n";
  if (leftButtonStyle != ""){
    s+="  <div id='" + leftButtonStyle + "'>\n";
    arrNames=split(leftButtonNames,",");
    for (i=0; i<arrNames.length; i++) {
      if (imageButtons.indexOf(arrNames[i])>=0) {
        s+="    <a id='" + (id+"_"+i) + "' >\n";
        s+="    <div id=img1 style='background-image:url(\"./nsb/images/titlebarIcons.png\");" +
		    " background-position:" + imageButtons.indexOf(arrNames[i])*-20 + "px; height:22px; width:20px; background-repeat:no-repeat;'" + 
           " onclick='" + id + ".onclick(" +'"'+ arrNames[i] +'"'+ ")'></div></a>\n"}
      else {
        s+="    <a id='" + (id+"_"+i) + "' >\n";
        s+="    <div id='" + arrNames[i] + "' onclick='" + id + ".onclick(" +'"'+ arrNames[i] +'"'+ ")'>" + arrNames[i] + "</div></a>\n"}
	  if (leftButtonStyle != "leftnav") break;
    }
    s+="    </div>\n";
  }
  if (title != "") s+="  <div id='title'>" + title + "</div>\n";
   
  if (rightButtonStyle != ""){
    s+="  <div id='" + rightButtonStyle + "'>\n";
    arrNames=split(rightButtonNames,",");
    for (i=0; i<arrNames.length; i++) {
      if (imageButtons.indexOf(arrNames[i])>=0) {
        s+="    <a id='" + (id+"_"+i) + "' >\n";
        s+="    <div id=img1 style='background-image:url(\"./nsb/images/titlebarIcons.png\");" +
		    " background-position:" + imageButtons.indexOf(arrNames[i])*-20 + "px; height:22px; width:20px; background-repeat:no-repeat;'" + 
           " onclick='" + id + ".onclick(" +'"'+ arrNames[i] +'"'+ ")'></div></a>\n"}
      else {
        s+="    <a id='" + (id+"_"+i) + "' >\n";
		s+="    <div id='" + arrNames[i] + "' onclick='" + id + ".onclick(" +'"'+ arrNames[i] +'"'+ ")'>" + arrNames[i] + "</div></a>\n"}
 	  if (rightButtonStyle != "rightnav") break;
    }
    s+="    </div>\n";
  }
 
  s+="</div>\n";
  //alert(s); 
  document.write(s);  
}

function iMenu(id, title, itemList, imageList, html){
  var i,s,arrItems,arrImages;
  s="<div id='" + id + "_scroller' >\n"
  s+="<div id='" + id + "'>\n";
  if (title!="") s+="<span class='graytitle'>" + title + "</span>\n";
  s+="<ul id='" + id + "_list' class='pageitem' " + enquote(html) + ">\n";
  arrItems=split(itemList,",");
  arrImages=split(imageList,",");
  for (i=0; i<arrItems.length; i++) {
    s+="  <li class='menu' onclick='" + id + ".onclick(" + i + ")'>\n";
    s+="    <a id='" + (id+"_"+i) + "'>\n";
    if ((i<arrImages.length) & (arrImages[i]!="")) s+="      <img src='" + arrImages[i] + "'>\n";
    s+="      <span class='name'>" + arrItems[i] + "</span>\n";
    s+="      <span class='arrow'></span>\n";
    s+="  </a>\n";
    }
  s+="</ul></div></div>\n";
  //alert(s);
  document.write(s);  
  //eval(id)_scroller.style.height="auto";
  eval(id).style.width="100%";
  eval(id).getItemCount=function(){
    var elem = eval(id + "_list");
    return elem.getElementsByTagName("li").length;
    }
  eval(id).getItem=function(i){
    var ii=(eval(id).children[0].tagName!="SPAN")?0:1;
    return eval(id).children[ii].children[i].innerText};
  eval(id).deleteItem=function(which){
    var elem = eval(id + "_list");
    if (isNull(which)) {
      which = eval(id).getItemCount() - 1;
      elem.removeChild(elem.getElementsByTagName("li")[which]);
      }
    else if (which.toUpperCase() == "ALL") {
      i = eval(id).getItemCount()-1
      for (i; i>=0; i--) {
        elem.removeChild(elem.getElementsByTagName("li")[i]);
        }
      }
 	eval(id).refresh()
    }
  eval(id).addItem=function(itemName,imgSrc,itemNo){
    var newLi,newSpan,newHref,newImgSrc, newASpan;
    if (isNull(itemNo)) {
      i = eval(id).getItemCount();
      }
    else {
      i = itemNo;
      }
    newLi = document.createElement("li");
    newLi.setAttribute("class", "menu")
    newLi.setAttribute("onclick", (id + ".onclick(" + i + ")"))
    newHref = document.createElement("a");
    newHref.setAttribute("id", (id+"_"+i));
    if (!isNull(imgSrc)) {
      newImgSrc = document.createElement("img");
      newImgSrc.setAttribute("src", imgSrc);
      newHref.appendChild(newImgSrc);
     }    
    newSpan = document.createElement("span");
    newSpan.setAttribute("class", "name")
    newSpan.appendChild(document.createTextNode(itemName));
    newHref.appendChild(newSpan);
    
    newASpan = document.createElement("span");
    newASpan.setAttribute("class", "arrow")  
    newHref.appendChild(newASpan)    
    newLi.appendChild(newHref)   
    if (isNull(itemNo)) {
      eval(id + "_list").appendChild(newLi); 
      }
    else {
      eval(id + "_list").insertBefore(newLi,eval(id +"_list").getElementsByTagName("li")[itemNo]); 
      }
 	eval(id).refresh()
    }
  eval(id).replaceItem=function(itmNo,newItemName,newImgSrc){
    if ((isNaN(itmNo)) || (itmNo < 0 || itmNo > eval(id).getItemCount() -1)) {
      return -1;
      }
    elem = eval(id + "_list")
    elem.removeChild(elem.getElementsByTagName("li")[itmNo]);
    eval(id).addItem(newItemName,newImgSrc,itmNo);
    return itmNo;
  }
  eval(id).refresh=function(){
	setTimeout('try{'+id+'_ref.refresh()} catch(err){}', 100);
	}
}

function iMenuNumberTitleTime(id, numberList, titleList, timeList, html){
  var i,s,arrNumbers,arrTitles,arrTimes;
  arrNumbers=split(numberList,",");
  arrTitles=split(titleList,",");
  arrTimes=split(timeList,",");
  s ="<div id='" + id + "_scroller' >\n"
  s+="<div id='" + id + "' class='ipodlist'>\n";
  s+="<div style='height:10px'></div>\n"
  s+="<div id='content'>\n";
  s+="<ul id='" + id + "_list'" + enquote(html) + ">\n";
  for (i=0; i<arrNumbers.length; i++) {
    s+="  <li onclick='" + id + ".onclick(" + i + ")'>\n";
    s+="    <a id='" + (id+"_"+i) + "'>\n";
    s+="      <span class='number'>" + arrNumbers[i] + "</span>\n";
    s+="      <span class='auto'></span>\n";
    s+="      <span class='name'>" + arrTitles[i] + "</span>\n";
    if ((i<arrTimes.length) & (arrTimes[i]!="")) s+="      <span class='time'>" + arrTimes[i] + "</span>\n";
    s+="  </a>\n";
    }
  s+="</ul></div></div></div>\n";
  //alert(s);
  document.write(s);
  eval(id).style.width="100%";
  eval(id).getItemCount=function(){
    var elem = eval(id + "_list");
    return elem.getElementsByTagName("li").length;
    }
  eval(id).getItem=function(i){
    return eval(id).children[1].children[0].children[i].innerText};
  eval(id).deleteItem=function(which){
    var elem = eval(id + "_list");
    if (isNull(which)) {
      which = eval(id).getItemCount() - 1;
      elem.removeChild(elem.getElementsByTagName("li")[which]);
      }
    else if (which.toUpperCase() == "ALL") {
      i = eval(id).getItemCount()-1
      for (i; i>=0; i--) {
        elem.removeChild(elem.getElementsByTagName("li")[i]);
        }
      }
	eval(id).refresh()
    }
  eval(id).addItem=function(number,title,time,itemNo){
    var newLi,newSpan,newHref;
    if (isNull(itemNo)) {
      i = eval(id).getItemCount();
      }
    else {
      i = itemNo;
      }
    newLi = document.createElement("li");
    newLi.setAttribute("onclick", (id + ".onclick(" + i + ")"))
    newHref = document.createElement("a");
    newHref.setAttribute("id", (id+"_"+i));
    newSpan = document.createElement("span");
    newSpan.setAttribute("class", "number")
    newSpan.appendChild(document.createTextNode(number));
    newHref.appendChild(newSpan)
    newSpan = document.createElement("span");
    newSpan.setAttribute("class", "auto")
    newHref.appendChild(newSpan)
    newSpan = document.createElement("span");
    newSpan.setAttribute("class", "name")
    newSpan.appendChild(document.createTextNode(title));
    newHref.appendChild(newSpan)
 	  if (time!="") {
      newSpan = document.createElement("span");
      newSpan.setAttribute("class", "time")
      newSpan.appendChild(document.createTextNode(time));
      newHref.appendChild(newSpan)};
    newLi.appendChild(newHref)
    if (isNull(itemNo)) {
      eval(id + "_list").appendChild(newLi); 
      }
    else {
      eval(id + "_list").insertBefore(newLi,eval(id + "_list").getElementsByTagName("li")[itemNo]); 
      }
	eval(id).refresh()
    } 
  eval(id).replaceItem=function(itmNo,number,title,time){
    if ((isNaN(itmNo)) || (itmNo < 0 || itmNo > eval(id).getItemCount() -1)) {
      return -1;
      }
    elem = eval(id + "_list")
    elem.removeChild(elem.getElementsByTagName("li")[itmNo]);
    eval(id).addItem(number,title,time,itmNo);
    return itmNo;
  }
  eval(id).refresh=function(){
    eval(id).style.height=44*eval(id).getItemCount()+"px";
	setTimeout('try{'+id+'_ref.refresh()} catch(err){}', 100);
	}
}

function iMenuNumberTitleDescArrow(id, numberList, titleList, descList, html){
  var i,s,arrNumbers,arrTitles,arrDescs;
  arrNumbers=split(numberList,",");
  arrTitles=split(titleList,",");
  arrDescs=split(descList,",");
  s ="<div id='" + id + "_scroller' >\n"
  s+="<div id='" + id + "' class='musiclist'>\n";
  s+="<div style='height:10px'></div>\n"
  s+="<div id='content'>\n";
  s+="<ul id='" + id + "_list'" + enquote(html) + ">\n";
  for (i=0; i<arrNumbers.length; i++) {
    s+="  <li onclick='" + id + ".onclick(" + i + ")'>\n";
    s+="    <a id='" + (id+"_"+i) + "'>\n";
    s+="      <span class='number'>" + arrNumbers[i] + "</span>\n";
    s+="      <span class='name'>" + arrTitles[i] + "</span>\n";
    if ((i<arrDescs.length) & (arrDescs[i]!="")) s+="      <span class='time'>" + arrDescs[i] + "</span>\n";
    s+="      <span class='arrow'></span>\n";
   s+="  </a>\n";
    }
  s+="</ul></div></div></div>\n";
  //alert(s);
  document.write(s);
  eval(id).style.width="100%";
  eval(id).getItemCount=function(){
    var elem = eval(id + "_list");
    return elem.getElementsByTagName("li").length;
    }
  eval(id).getItem=function(i){
    return eval(id).children[1].children[0].children[i].innerText};
  eval(id).deleteItem=function(which){
    var elem = eval(id + "_list");
    if (isNull(which)) {
      which = eval(id).getItemCount() - 1;
      elem.removeChild(elem.getElementsByTagName("li")[which]);
      }
    else if (which.toUpperCase() == "ALL") {
      i = eval(id).getItemCount()-1
      for (i; i>=0; i--) {
        elem.removeChild(elem.getElementsByTagName("li")[i]);
        }
      }
 	eval(id).refresh()
    }
  eval(id).addItem=function(number,title,desc,itemNo){
    var newLi,newSpan,newHref;
    if (isNull(itemNo)) {
      i = eval(id).getItemCount();
      }
    else {
      i = itemNo;
      }
    newLi = document.createElement("li");
    newLi.setAttribute("onclick", (id + ".onclick(" + i + ")"))
    newHref = document.createElement("a");
    newHref.setAttribute("id", (id+"_"+i));
    newSpan = document.createElement("span");
    newSpan.setAttribute("class", "number")
    newSpan.appendChild(document.createTextNode(number));
    newHref.appendChild(newSpan)
    newSpan = document.createElement("span");
    newSpan.setAttribute("class", "name")
    newSpan.appendChild(document.createTextNode(title));
    newHref.appendChild(newSpan) 
    newSpan = document.createElement("span");
    newSpan.setAttribute("class", "time")
    newSpan.appendChild(document.createTextNode(desc));
    newHref.appendChild(newSpan)
	newSpan = document.createElement("span");
    newSpan.setAttribute("class", "arrow")
    newHref.appendChild(newSpan);
    newLi.appendChild(newHref)
    if (isNull(itemNo)) {
      eval(id + "_list").appendChild(newLi); 
      }
    else {
      eval(id + "_list").insertBefore(newLi,eval(id + "_list").getElementsByTagName("li")[itemNo]); 
      }
 	eval(id).refresh()
    } 
  eval(id).replaceItem=function(itmNo,number,title,time){
    if ((isNaN(itmNo)) || (itmNo < 0 || itmNo > eval(id).getItemCount() -1)) {
      return -1;
      }
    elem = eval(id + "_list")
    elem.removeChild(elem.getElementsByTagName("li")[itmNo]);
    eval(id).addItem(number,title,time,itmNo);
    return itmNo;
  }
  eval(id).refresh=function(){
    eval(id).style.height=44*eval(id).getItemCount()+"px";
	setTimeout('try{'+id+'_ref.refresh()} catch(err){}', 100);
	}

}

function iMenuTextBlock(id, title, textList, html){
  var i,s,arrTexts,elem;
  
  s="<style>\n"
  s+="  .menuTextBlock .name {max-width:86%;}\n";
  s+="  .menuTextBlock {position:relative; list-style-type:none; display:block; height:85px; overflow:hidden; border-top:1px solid #878787; width:auto;}\n";
  s+="  .menuTextBlock:hover{background:-webkit-gradient(linear,0% 0%,0% 100%,from(#cfcfcf),to(#ffffff));}\n";
  s+="  .menuTextBlock a:hover .name {color:#fff;}\n";
  s+="  .menuTextBlock a:hover .comment { color:#CCF;}\n";
  s+="  .menuTextBlock a {display:block; height:43px; width:auto; text-decoration:none;}\n";
  s+="  .menuTextBlock a img {width:auto; height:32px; margin:5px 0 0 5px; float:left;}\n";
  s+="  .menuTextBlock .name {margin:11px 0 0 7px; width:auto; color:#000; font-weight:normal; font-size:11px; text-overflow:ellipsis; overflow:hidden; white-space:wrap; float:left;}\n";
  s+="  .menuTextBlock .comment {margin:11px 30px 0 0; width:auto; font-size:17px; text-overflow:ellipsis; overflow:hidden; max-width:75%; white-space:nowrap; float:right;color:#324f85; }\n";
  s+="  .menuTextBlock .arrow {position:absolute; width:8px!important; height:13px!important; right:10px; top:15px; margin:0!important; background:url('nsb/images/arrow.png') 0 0 no-repeat;}\n";
  s+="  </style>\n";  
  
  s+="<div id='" + id + "_scroller' >\n";
  s+="<div id='" + id + "'>\n";
  if (title!="") s+="<span class='graytitle'>" + title + "</span>\n";
  s+="<ul id='" + id + "_list' class='pageitem' " + enquote(html) + ">\n";
  arrTexts=split(textList,"|");
  for (i=0; i<arrTexts.length; i++) {
    s+="  <li class='menuTextBlock' onclick='" + id + ".onclick(" + i + ")'>\n";
    s+="    <a id='" + (id+"_"+i) + "'>\n";
    s+="     <span class='name'>" + arrTexts[i] + "</span>\n";
    s+="     <span class='arrow'></span>\n";
    s+="  </a>\n";
    }
  s+="</ul></div></div>\n";
  //alert(s);
  document.write(s);
  eval(id).style.width="100%";
  eval(id).getItemCount=function(){
    elem = eval(id + "_list");
    return elem.getElementsByTagName("li").length;
    }
  eval(id).getItem=function(i){
    var ii=(eval(id).children[0].tagName!="SPAN")?0:1;
    return eval(id).children[ii].children[i].innerText};
  eval(id).deleteItem=function(which){
    elem = eval(id + "_list");
    if (isNull(which)) {
      which = eval(id).getItemCount() - 1;
      elem.removeChild(elem.getElementsByTagName("li")[which]);
      }
    else if (which.toUpperCase() == "ALL") {
      i = eval(id).getItemCount()-1
      for (i; i>=0; i--) {
        elem.removeChild(elem.getElementsByTagName("li")[i]);
        }
      }
 	eval(id).refresh()
    }
  eval(id).addItem=function(text, itemNo){
    var newLi,newSpan,newHref;
    if (isNull(itemNo)) {
      i = eval(id).getItemCount();
      }
    else {
      i = itemNo;
      }
    newLi = document.createElement("li");
    newLi.setAttribute("class", "menuTextBlock")
    newLi.setAttribute("onclick", (id + ".onclick(" + i + ")"))
    newHref = document.createElement("a");
    newHref.setAttribute("id", (id+"_"+i));
    newSpan = document.createElement("span");
    newSpan.setAttribute("class", "name")
    newSpan.appendChild(document.createTextNode(text));
    newHref.appendChild(newSpan)
    newSpan = document.createElement("span");
    newSpan.setAttribute("class", "arrow")
    newHref.appendChild(newSpan)
    newLi.appendChild(newHref)
    if (isNull(itemNo)) {
      eval(id + "_list").appendChild(newLi); 
      }
    else {
      eval(id + "_list").insertBefore(newLi,eval(id + "_list").getElementsByTagName("li")[itemNo]); 
      }
	eval(id).refresh()
    } 
  eval(id).replaceItem=function(itmNo,text){
    if ((isNaN(itmNo)) || (itmNo < 0 || itmNo > eval(id).getItemCount() -1)) {
      return -1;
      }
    elem = eval(id + "_list")
    elem.removeChild(elem.getElementsByTagName("li")[itmNo]);
    eval(id).addItem(text,itmNo);
    return itmNo;
   }
  eval(id).refresh=function(){
    eval(id).style.height=85*eval(id).getItemCount()+"px";
	setTimeout('try{'+id+'_ref.refresh()} catch(err){}', 100);
	}
}

function Grid(id, rows, cols, rowHeights, colWidths, titles, alignments, html, cellstyle){
    var styleName, arrHeights, arrWidths, arrTitles, arrAlignments, r, s, c;
    styleName=id + "Style"
	s="<style>"
	s+="  ." + styleName + "{border-top:1px solid #9bb3cd;border-left:1px solid #9bb3cd;margin-bottom:4em;}\n";
	s+="  ." + styleName + " th{padding:.2em .2em .2em .2em;background:#93A5BB;font-weight:normal;color:#fff;border-bottom:1px solid #9bb3cd;border-right:1px solid #9bb3cd;}\n";
	s+="  ." + styleName + " th p{font-weight:bold;margin-bottom:.33em;}\n";
	s+="  ." + styleName + " td{font-size:10px,padding:.2em;vertical-align:middle;border-bottom:1px solid #9bb3cd;border-right:1px solid #9bb3cd;" + cellstyle + "}\n";
	s+="  ." + styleName + " td p{margin-bottom:0;}." + styleName + " td p+p{margin-top:.417em;}\n";
	s+="  ." + styleName + " td p+p+p{margin-top:.417em;}\n";
	s+="</style>\n\n";

	s+="<div id='" + id + "_scroller' >\n"
	s+="<table id='"+id+"' class='" + styleName + "' cellspacing=0 cellpadding=0 border=1  "+ enquote(html) + ">\n"
	arrHeights=split(rowHeights,",");
	arrWidths=split(colWidths,",");
	arrTitles=split(titles,",");
	arrAlignments=split(alignments,",");
	for (r=0; r<rows; r++){
	  s+="  <tr";
	  s+=">\n";
	  for (c=0; c<cols; c++){
	    if (r==0 & titles!="") td="th" 
		else td="td";
		s+="    <"+td+" id="+id+"_"+r+"_"+c;
	    if (r<arrHeights.length & arrHeights[r]!="") s+=" height=" + arrHeights[r];
		if (c<arrWidths.length & arrWidths[c]!="") s+=" width=" + arrWidths[c];
		if (c<arrAlignments.length & arrAlignments[r]!="") s+=" align=" + arrAlignments[c];
		if (cellstyle!="") s+=" style='" + cellstyle + "'";
	    s+=">";
  	    if (r==0 & c<arrTitles.length & arrTitles[c]!="") s+=arrTitles[c];
		  else s+="&nbsp;"
	    s+="</"+td+">\n";
	  }
	  s+="  </tr>\n";
	}
	s+="</table>\n</div>\n";
	//alert(s);
	document.write(s);
	
	eval(id).getRowCount=function(){
      return eval(id).rows.length;
    }
    eval(id).getColCount=function(cellType){
      switch (cellType){
        case "td":
          return eval(id).getElementsByTagName("tr")[0].getElementsByTagName("td").length;
        case "th":
          return eval(id).getElementsByTagName("tr")[0].getElementsByTagName("th").length;
        default:
          var a,b
          a=eval(id).getElementsByTagName("tr")[0].getElementsByTagName("td").length;
          b=eval(id).getElementsByTagName("tr")[0].getElementsByTagName("th").length;
          if (b==0){
            return a;
            }
          else{
            return b;
            }
      }
    }

	eval(id).setGridWidth=function(){
    // if width of any cell in top row is given as %
    // or as "" (blank) then returns -1 else returns
    // sum of all cell widths
      var i,tmpStr,ttlCellWidth = 0;
      for (i=0; i<eval(id).getColCount(); i++){
        tmpStr = eval(id).rows[0].cells[i].width;
        if ((tmpStr.substr(-1) == "%") || (tmpStr == "")) {
          return -1;
          }
        else {
          ttlCellWidth = ttlCellWidth + parseInt(tmpStr);
          }
      }
      if (ttlCellWidth == -1) {
          eval(id).style.width="100%";
          }
        else {
          eval(id).style.width=ttlCellWidth+"px";
          }
    }
	eval(id).setGridWidth();

	
    eval(id).getValue=function(x,y,val){
      return eval(id).rows[x].cells[y].innerHTML;
      }
    eval(id).setValue=function(x,y,val){
      eval(id).rows[x].cells[y].innerHTML=val;
      }
	eval(id).cell=function(x,y){
	  return eval(id).rows[x].cells[y]
	  }
    eval(id).addRows=function(no){
      var newCell,newRow,i = 1,ii,cnt,previousRow,tblBodyObj;
      if (no < 0){
	cnt = 0;
        }
      else if (no == null || no == ""){
        cnt = 1;
        }
      else{
        cnt = no;
        }
      tblBodyObj = eval(id).tBodies[0];
      previousRow = tblBodyObj.rows[eval(id).getRowCount() -1];
      while (i <= cnt){
        newRow = eval(id).insertRow(tblBodyObj.rows.length);
        newRowNo = tblBodyObj.rows.length - 1;
        for (ii=0; ii<eval(id).getColCount(); ii++){
          newCell = newRow.insertCell(-1);
          newCell.id = id + "_" + newRowNo + "_" + ii;
          newCell.height = previousRow.cells[ii].height;
          newCell.width = previousRow.cells[ii].width;
          newCell.innerHTML = "&nbsp"
          }
        i++;
        }
      return cnt
    }
    eval(id).deleteRows=function(no){
      var cnt,noRows,i;
      if (no < 0){
	cnt = 0;
        }
      else if (no == null || no == ""){
        cnt = 1;
        }
      else{
        cnt = no;
        }
      noRows = eval(id).getRowCount();
      if (cnt > (noRows-1)){
        cnt = (noRows-1);
        }
      for (i=noRows-1; i>=noRows-cnt; i--){
        eval(id).deleteRow(i);
        }
      return cnt;
    }
    eval(id).addCols=function(no){
      var cnt,i=1,ii,newTH,tblBodyObj,newCell,noCols;
      if (no < 0){
	      cnt = 0;
        }
      else if (no == null || no == ""){
        cnt = 1;
        }
      else{
        cnt = no;
        }
      tblBodyObj = eval(id).tBodies[0];
      noCols = eval(id).getColCount("th");
      if (noCols !== 0){
        while (i <= cnt){
          newTH = document.createElement("th");
          eval(id).rows[0].appendChild(newTH);
          newTH.id = id + "_" + 0 + "_" + noCols;
          newTH.innerHTML = "&nbsp"
          newTH.width = "10px";
          newTH.height = eval(id).rows[0].cells[noCols].height;
          for (ii=1; ii<tblBodyObj.rows.length; ii++){
            newCell = tblBodyObj.rows[ii].insertCell(-1);
            newCell.id = id + "_" + ii + "_" + noCols;
            newCell.innerHTML = "&nbsp"
            newCell.width = "10px";
            newCell.height = eval(id).rows[ii].cells[noCols].height;
            }
          i++;
          }
        }
      else{
        while (i <= cnt){
          noCols = eval(id).getColCount("td");
          for (ii=0; ii<tblBodyObj.rows.length; ii++){
            newCell = tblBodyObj.rows[ii].insertCell(-1);
            newCell.id = id + "_" + ii + "_" + noCols;
            newCell.innerHTML = "&nbsp"
            newCell.height = eval(id).rows[ii].cells[noCols].height;
          }
          i++;
          }
        }
      eval(id).setGridWidth();
      return cnt;
    }
    eval(id).deleteCols=function(no){
      var cnt,noCols,i=1,ii,allRows;
      if (no < 0){
	      cnt = 0;
        }
      else if (no == null || no == ""){
        cnt = 1;
        }
      else{
        cnt = no;
        }
      noCols = eval(id).getColCount();
      if (cnt > (noCols-1)){
        cnt = (noCols-1);
        }
      while (i <= cnt){
        allRows = eval(id).rows;
        for (ii=0; ii<allRows.length; ii++){
          if (allRows[ii].cells.length > 1){
            allRows[ii].deleteCell(-1);
            }
          }
        i++;
        }
      eval(id).setGridWidth();
      return cnt;
    }
    eval(id).setColumnWidth=function(col,wdth){
      var noCols,i;
      noCols = eval(id).getColCount();
      if (col < 0 || col > (noCols - 1)){
        return -1;
        }
      for (i=0; i<eval(id).getRowCount(); i++){
        eval(id).rows[i].cells[col].width=wdth;
        }
      eval(id).setGridWidth();
      return col;
    }
    eval(id).setRowHeight=function(row,ht){
      noRows = eval(id).getRowCount();
      if (row < 0 || row > (noRows - 1)){
        return -1;
        }
      var noRows, i;
      if (row > (noRows - 1)){
        return -1;
        }
      for (i=0; i<eval(id).getColCount(); i++){
        eval(id).rows[row].cells[i].style.height=ht;
        }
      return row;
    }
	eval(id).refresh=function(){
	  setTimeout(id+"_ref.refresh()", 100);
      eval(id+"_scroller.style.width="+id+".offsetWidth+'px'")
	}
 }	
 
function MultiInput(id, rows, fieldtype, placeholders, prompts, inputTypes, values, html) {
  var i,s,arrPlaceholders,arrPrompts,arrInputTypes,arrValues;
  arrPlaceholders=split(placeholders, ",");
  arrPrompts=split(prompts, ",");
  arrInputTypes=split(inputTypes, ",");
  arrValues=split(values, ",");
  s="<div id='" + id + "_scroller' >\n";
  s+="<ul class='pageitem' id='" + id + "' " + enquote(html) + ">\n";
  for (i=0; i<rows; i++){
    s=s+"  <li class='"+ fieldtype + "'>\n"
    if (fieldtype=="smallfield" & i<arrPrompts.length & arrPrompts[i]!="") s+= "    <span class='name'>"+arrPrompts[i]+"</span>\n";
	if (i>arrInputTypes.length)
		s+= "    <input type='text'";
		else s+= "    <input type='" + arrInputTypes[i] + "'";
	if (i<arrPlaceholders.length & arrPlaceholders[i]!="") s+= " placeholder='" + arrPlaceholders[i] + "'";
	if (i<arrValues.length & arrValues[i]!="") s+= " value='" + arrValues[i] + "'";
	s+=" " + enquote(html) + ">\n";
    }
  s=s+"</ul>\n</div>";
  document.write(s);
  //alert(s);
  eval(id).style.left=0;
  eval(id).style.width=document.width-18+"px";
  eval(id).getValue=function(n){
    if (n<1 || n>=eval(id).childNodes.length) {
      alert(nsbx.messages["Error:_Index_out_of_range:_"] + id + "[" + n + "]")};
	if (eval(id).childNodes[n].className=="bigfield") p=0;
	  else p=1;
    return eval(id).childNodes[n].children[p].value;
    }
  eval(id).setValue=function(n,val){
    if (n<1 || n>=eval(id).childNodes.length) {
      alert(nsbx.messages["Error:_Index_out_of_range:_"] + id + "[" + n + "]")};
 	if (eval(id).childNodes[n].className=="bigfield") p=0;
	  else p=1;
    eval(id).childNodes[n].children[p].value=val;
    }  
  eval(id).refresh=function(){
	setTimeout(id+"_ref.refresh()", 100);
   }
}

function ComboBox(id, items, values, name, html) {
  var i,s,arrItems,arrValues;
  arrItems=split(items, ",");
  if(items==''){arrItems=[]};
  arrValues=split(values, ",");
  if(values==''){arrValues=[]};
  s="<div id='" + id + "' class='select' style='" + html + "'>"
  s+="<select style='" + html + "' name='" + name + "'>\n"
  for (i=0; i<arrItems.length; i++) {    
    if ((i<arrValues.length) & (arrValues[i]!="")) 
	  v=arrValues[i]
	else
	  v=i+1;
    s=s+"  <option value='" + (v) + "'>" + arrItems[i] + "</option>\n"
    }
  s=s+"</select>\n";
  s=s+"<span class='arrow'></span>\n";
  s=s+"</div>";
  document.write(s);
  //alert(s);
  eval(id).getItemCount=function(){
    return eval(id).children[0].options.length}
  eval(id).selectedIndex=function(){
    return eval(id).childNodes[0].selectedIndex}
  eval(id).selectedItem=function(){
    return eval(id).childNodes[0].options[eval(id).selectedIndex()].text}
  eval(id).selectedValue=function(){
    return eval(id).childNodes[0].value}
  eval(id).setValue=function(n){
    eval(id).setIndex(n)}
  eval(id).setIndex=function(n){
    eval(id).childNodes[0].value=n}
  eval(id).clear=function(){
    eval(id).children[0].options.length=0}
  eval(id).addItem=function(optionName,optionValue){
    eval(id).children[0].options[eval(id).getItemCount()]=new Option(optionName, optionValue)}
  eval(id).removeItem=function(items){
	if (items === undefined){return}
	if (Object.prototype.toString.apply(items) !== '[object Array]') {
       items = Array.prototype.slice.call(arguments)}
	if (items.length > 0) {items = Sort(items,"d")}
	for (i in items) {
       eval(id).children[0].options[items[i]-1]=null}
  }
  eval(id).List=function(n){
    return eval(id).childNodes[0].options[n].text}
  eval(id).__defineGetter__('text', function(){return eval(id).selectedItem()});
  eval(id).__defineGetter__('ListCount', function(){return eval(id).getItemCount()});
  eval(id).__defineGetter__('ListIndex', function(){return eval(id).selectedIndex()});
  eval(id).__defineSetter__('ListIndex', function(n){
    eval(id).setIndex(n);
    if (typeof(eval(id).onclick)=='function') {eval(id).onclick()};
    if (typeof(eval(id).onchange)=='function') {eval(id).onchange()};
    });
}

function RadioButton(id, width, items, value, name, html) {
  var i,s,arrItems,arrValues;
  arrItems=split(items, ",");
  s="<ul id='" + id + "' class='pageitem'>\n";
  for (i=0; i<arrItems.length; i++) {    
    s=s+"<li class='radiobutton'>\n";
    s=s+"  <span class='name'>" + arrItems[i] + "</span>\n";
    s=s+"  <input type='radio' name='_" + id + "'";
    if (i+1==value) s=s+" checked='checked'";
    s=s+"/>\n";
    }
  s=s+"</ul>\n";
  document.write(s);
  //alert(s);
  eval(id).style.height="auto";
  if(width<=10) eval(id).style.width=document.width-18+"px";
  eval(id).getValue=function(n){
    if (n<1 || n>=eval(id).childNodes.length) {
      alert(nsbx.messages["Error:_Index_out_of_range:_"] + id + "[" + n + "]")};
    return eval(id).childNodes[n].children[1].checked;
    }
  eval(id).setValue=function(n,val){
    if (n<1 || n>=eval(id).childNodes.length) {
      alert(nsbx.messages["Error:_Index_out_of_range:_"] + id + "[" + n + "]")};
    if (typeof(val)!="boolean"){
      alert(nsbx.messages["Error:_Must_be_true_or_false:_"] + id + "[" + n + "] " + val)};
    eval(id).childNodes[n].children[1].checked=val;
    }
  eval(id).value=function(){
    for (var i=1;i<=eval(id).childNodes.length; i++) {
	   if (eval(id).childNodes[i].children[1].checked==true) return i}
	 }
}

function Overlay(caption, text){
  if(typeof Ext=="undefined"){return alert(nsbx.messages["Overlay()_requires_Sencha_initialization."])};
  var Factor,x,y,sText,myOverlay
  Factor = window.innerHeight / 460;

  if ((Factor < 1.0) || ((320 * Factor) > window.innerWidth)) {Factor = 1.0};

  x = 320 * Factor;
  y = 460 * Factor;
  
  sText = "<font size=" + 3 * Factor + "px>" + text + "</font>";

  myOverlay = new Ext.Panel(
    {floating: true, 
     modal: true, 
     centered: true,
     width: x,
     height: y, 
     styleHtmlContent: true, 
     scroll: "vertical",
     "html": sText,
     dockedItems: [{dock: "top", xtype: "toolbar", title: caption},
                   {dock: "bottom", xtype: "toolbar", ui: "light",
                    items: [{ ui: "confirm", text: "Close", handler: function(){myOverlay.hide()} }] }]} );
  myOverlay.show();
  return myOverlay;
}

/**************************************************************************************/
// jQuery Mobile functions
// copyright 2012 NS BASIC Corporation. All rights reserved.

function Checkbox_jqm(id, width, options, html, properties, Theme, klass) {
  var i,s;
  var arrOptions=split(options, ",");
  s="<div data-role='controlgroup' id='" + id + "' " + enquote(html) + properties + " class='" + klass + "'>\n";
  for (i=0; i<arrOptions.length; i++){
    s=s+"  <input type='checkbox' data-theme=" + Theme + " name='" + id + "_" + (i+1) + "' id='" + id + "_" + (i+1) + "'>\n";
    s=s+"  <label for='" + id + "_" + (i+1) + "'>" + arrOptions[i] + "</label>";
	}
  s=s+"</div>";
  //alert(s);
  document.write(s);
  eval(id).style.height="auto";
  NSB_addDisableProperty(eval(id));
  if(width<=10) eval(id).style.width=document.width-18+"px";
  eval(id).getValue=function(n){
    try
      {return eval(id + "_" + n).checked}
	 catch(err)
      {alert(err.message)}
  }
  eval(id).setValue=function(n,val){
	if (typeof(val)!="boolean"){
      alert("Error: Must be true or false: " + id + "[" + n + "] " + val)};
    try
	   {eval(id + "_" + n).checked = val;
	   $('#'+id+'_'+n).checkboxradio('refresh'); }
	 catch(err)
      {alert(err.message)};
    }  
}

function RadioButton_jqm(id, width, items, value, html, properties, Theme, klass) {
  var i,s;
  var arrOptions=split(items, ",");
  s="<div data-role='controlgroup' id='" + id + "' " + enquote(html) + properties + " class='" + klass + "'>\n";
  for (i=0; i<arrOptions.length; i++){
    s=s+"  <input type='radio' data-theme=" + Theme + " name='" + id + "' id='" + id + "_" + (i+1) + "'";
    if (i==value-1) s=s+" checked=checked";
    s=s+">\n";
    s=s+"  <label for='" + id + "_" + (i+1) + "'>" + arrOptions[i] + "</label>";
	}
  s=s+"</div>";
  //alert(s);
  document.write(s);
  NSB_addDisableProperty(eval(id));
  eval(id).style.height="auto";
  if(width<=10) eval(id).style.width=document.width-18+"px";
   eval(id).getValue=function(n){
    try
      {return eval(id + "_" + n).checked}
	 catch(err)
      {alert(err.message)}
  }
  eval(id).setValue=function(n,val){
	if (typeof(val)!="boolean"){
      alert("Error: Must be true or false: " + id + "[" + n + "] " + val)};
    try
	   {eval(id + "_" + n).checked = val;
	   $('#'+id+'_'+n).checkboxradio('refresh'); }
	 catch(err)
      {alert(err.message)};
    }
  eval(id).value=function(){
    for (i=1;i<=eval(id).children.length; i++) {
      if (eval(id + "_" + i).checked==true) return i-1}
	 }
}

function HeaderBar_jqm(id, title, leftButtonName, leftButtonIcon, rightButtonName, rightButtonIcon, html) {
  var name;
  var s="<div id='" + id + "'></div>\n";
  s+="<div data-role='header'" + html + ">\n";
  if (leftButtonName != "" || leftButtonIcon != "false"){
    s+="  <div data-role='button' class='ui-btn-left' data-icon='" + leftButtonIcon + "'";
	if (leftButtonName == "") {
	   name=leftButtonIcon;
	s+=" data-iconpos='notext'"}
	else name=leftButtonName;
	s+="' onclick=" + id + ".onclick('" + name + "')";
	s+=">" + leftButtonName + "</div>\n";
  }
  if (title != "") s+="  <h1>" + title + "</h1>\n";
   
  if (rightButtonName != "" || rightButtonIcon != "false"){
    s+="  <div data-role='button' class='ui-btn-right' data-icon='" + rightButtonIcon + "'";
	if (rightButtonName == "") {
	   name=rightButtonIcon;
	s+=" data-iconpos='notext'"}
	else name=rightButtonName;
	s+="' onclick=" + id + ".onclick('" + name + "')";
	s+=">" + rightButtonName + "</div>\n";
  }
 
  s+="</div>\n";
  //alert(s); 
  document.write(s);
  NSB_addDisableProperty(eval(id));
}

function List_jqm(id, showNumbers, imageStyle, theme, dividerTheme, itemList, imageList, dividerList, html, properties, width){
  var i,s;
  s="<div id='" + id + "_scroller'>\n"
  s+="<" + showNumbers + " id='" + id + "' data-role='listview' class=' ui-listview' ";
  s+="data-inset=true data-theme='"+theme+"' data-dividertheme='"+dividerTheme+"' imagestyle='"+imageStyle+"'" + enquote(html) + ">\n";
  var arrItems=split(itemList,",");
  var arrImages=split(imageList,",");
  var arrDividers=split(dividerList,",");
  for (i=0; i<arrItems.length; i++) {
    s+="  <li ";
	if ((i<arrDividers.length) & (arrDividers[i]=="Y")) 
	  {s+="data-role='list-divider' role='heading'>\n"}
	else {
      s+=" onclick='" + id + ".onclick(" + i + ")'>\n";
      s+="    <a id='" + (id+"_"+i) + "' href='#'>\n"};
    if ((i<arrImages.length) & (arrImages[i]!="")) 
	  {s+="      <img src='" + arrImages[i] + "' class='"+imageStyle+"'>\n"};
    s+="      " + arrItems[i] + "\n";
    if (!((i<arrDividers.length) & (arrDividers[i]=="Y")))
      {s+="  </a>\n"};
    }
  s+="</" + showNumbers + "></div>\n";
  //alert(s);
  document.write(s);  
  NSB_addDisableProperty(eval(id));
  //eval(id)_scroller.style.height="auto";
  eval(id).style.width=width+"px";
  eval(id).getItemCount=function(){
    var elem = eval(id);
    return elem.getElementsByTagName("li").length;
  }
  eval(id).getItem=function(i){
    return eval(id).children[i].innerText};
  eval(id).deleteItem=function(which){
    var elem = eval(id);
    if (isNull(which)) {
      which = eval(id).getItemCount() - 1;
      elem.removeChild(elem.getElementsByTagName("li")[which]);
      }
    else if (which.toUpperCase() == "ALL") {
      var i = eval(id).getItemCount()-1
      for (i; i>=0; i--) {
        elem.removeChild(elem.getElementsByTagName("li")[i]);
      }
    }
  }
  eval(id).addItem=function(itemName,imgSrc,itemNo,divider){
    var s,i,newLi,newSpan,newHref,newImgSrc;
    if (isNull(itemNo)) {
      i = eval(id).getItemCount();
      }
    else {
      i = itemNo;
      }
    newLi = document.createElement("li");
    if(divider!=true){
      newLi.setAttribute("onclick", (id + ".onclick(" + i + ")"));
      s="<a id='" + (id+"_"+i) + "' href='#'>" + itemName;	
      if (imgSrc) s+=" <img src='" + imgSrc + "' class='" + eval(id).getAttribute("imagestyle") + "'>";
      newLi.innerHTML+=s + "</a>\n";}
    else {
      newLi.setAttribute("data-role","list-divider");
      newLi.innerHTML = itemName}
    if (isNull(itemNo)) {
      eval(id).appendChild(newLi); 
		}
    else {
      eval(id).insertBefore(newLi,eval(id).getElementsByTagName("li")[itemNo]); 
      }
	$(eval(id)).listview("refresh");
    } 
  eval(id).replaceItem=function(itmNo,newItemName,newImgSrc){
    if ((isNaN(itmNo)) || (itmNo < 0 || itmNo > eval(id).getItemCount() -1)) {
      return -1;
    }
    elem = eval(id)
    elem.removeChild(elem.getElementsByTagName("li")[itmNo]);
    eval(id).addItem(newItemName,newImgSrc,itmNo);
    return itmNo;
  }
  eval(id).refresh=function(){
	setTimeout('try{'+id+'_ref.refresh()} catch(err){}', 100);
	}
}

function NavBar_jqm(id, items, fontSize, fontFamily, fontStyle, fontWeight, Theme, icons, iconPos, active, klass){
  var i,s;
  var arrItems=split(items,",");
  var arrIcons=split(icons,",");
  s="<div id="+id + " data-role=navbar data-iconPos="+iconPos+ " class='" + klass + "'>\n";
  s+="<ul>\n";
  for (i=0; i<arrItems.length; i++) {
    arrItems[i]=Trim(arrItems[i]);
    s+="  <li onclick='" + id + ".onclick(\""+ arrItems[i] + "\")'>\n";
    s+="    <a id='" + (id+"_"+i) + "' href='#' data-role='button' data-theme="+Theme+"";
    if ((i<arrIcons.length) & (arrIcons[i]!="")) s+=" data-icon=" + Trim(arrIcons[i]);
    if (i+1==active) s+=" class='ui-btn-active'";
    s+=">\n";
    s+="    " + arrItems[i] + "\n";
    s+="    </a>\n";
    }
  s+="</ul></div>\n";
  //alert(s);
  document.write(s);  
  NSB_addDisableProperty(eval(id));
  eval(id).style.width="100%";
  eval(id).style.left="0px";
  eval(id).style.height="auto";
}

function FooterBar_jqm(id, items, fontSize, fontFamily, fontStyle, fontWeight, Theme, icons, iconPos, active, klass){
  var i,s;
  var arrItems=split(items,",");
  var arrIcons=split(icons,",");
  s="<div id="+id + " data-role='footer' class='" + klass + "'>\n";
  s+="<div data-role=navbar data-iconPos="+iconPos+ ">\n";
  s+="<ul>\n";
  for (i=0; i<arrItems.length; i++) {
    arrItems[i]=Trim(arrItems[i]);
    s+="  <li onclick='" + id + ".onclick(\""+ arrItems[i] + "\")'>\n";
    s+="    <a id='" + (id+"_"+i) + "' href='#' data-role='button' data-theme="+Theme+"";
    if ((i<arrIcons.length) & (arrIcons[i]!="")) s+=" data-icon=" + Trim(arrIcons[i]);
    if (i+1==active) s+=" class='ui-btn-active'";
    s+=">\n";
    s+="    " + arrItems[i] + "\n";
    s+="    </a>\n";
    }
  s+="</ul></div></div>\n";
  //alert(s);
  document.write(s);  
  NSB_addDisableProperty(eval(id));
  eval(id).style.width="100%";
  eval(id).style.left="0px";
  eval(id).style.height="auto";
  s=id + ".style.top=(window.innerHeight-" + id + ".offsetHeight) + 'px'";
  setTimeout(s,10);
  eval(id).refresh=function(){
	setTimeout(id + ".style.top=(window.innerHeight-" + id + ".offsetHeight) + 'px'", 10)
	}
}

function Select_jqm(id, items, values, placeholder, selectedIndex, name, html, icon, iconPos, inline, nativeMenu, overlayTheme, Theme, groupBegin, groupEnd, multiSelect) {
  var i,s,arrItems,arrValues;
  arrItems=split(items, ",");
  if(items==''){arrItems=[]};
  arrValues=split(values, ",");
  if(values==''){arrValues=[]};
  s=groupBegin + "<div id='" + id + "'>";
  s+="<select id="+id+"_inner";
  s+=" data-icon="+icon;
  s+=" data-iconpos="+iconPos;
  s+=" data-inline="+inline;
  s+=" data-native-menu="+nativeMenu;
  if (multiSelect=="true") {s+=" multiple=multiple"};
  s+=" data-overlay-theme="+overlayTheme;
  s+=" data-theme="+Theme;
  s+=" " + html + " name='" + id + "'>\n"
  for (i=0; i<arrItems.length; i++) {    
    if ((i<arrValues.length) & (arrValues[i]!="")) 
      v=arrValues[i]
	else
      v=i+1;
    s+="  <option value='" + (v) + "'";
	if(i+1==placeholder) s+=" data-placeholder=true";
	if(i+1==selectedIndex) s+=" selected=selected";
    s+= ">" + arrItems[i] + "</option>\n"
    }
  s+="</select>\n</div>" + groupEnd;
  document.write(s);
  NSB_addDisableProperty(eval(id));
  if (html.indexOf('ui-disabled')>0) {setTimeout("$(eval('" +id+"_inner')).selectmenu('disable')",10)};
  //alert(s);
  eval(id).getItemCount=function(){
    return eval(id+"_inner").length}
  eval(id).selectedIndex=function(){
     var s=[];
     for(var i=0;i<eval(id).getItemCount();i++) {
       if (eval(id+"_inner")[i].selected==true) {s.push(i)}};
     if (eval(id+"_inner").multiple==false) {
      return s[0]}
     else {
      return s};
   }
  eval(id).selectedValue=function(){
     var s=eval(id).selectedIndex();
     if (s==null) return s;
     if (typeof(s)=="number") {s=[s]};
     for(var i=0;i<s.length;i++) {s[i]=eval(id+"_inner")[s[i]].value};
     if (eval(id+"_inner").multiple==false) {
       return s[0]}
     else {
       return s};
   }
  eval(id).selectedItem=function(){
     var s=eval(id).selectedIndex();
     if (s==null) return s;
     if (typeof(s)=="number") {s=[s]};
     for(var i=0;i<s.length;i++) {s[i]=eval(id+"_inner")[s[i]].text};
     if (eval(id+"_inner").multiple==false) {
       return s[0]}
     else {
       return s};
   }
  eval(id).setIndex=function(n){
    var mySelect=eval(id+"_inner");
    mySelect.selectedIndex=n;
    $(mySelect).selectmenu("refresh")}
  eval(id).clear=function(){
    eval(id+"_inner").options.length=0;
    $(eval(id+"_inner")).selectmenu("refresh")}
  eval(id).addItem=function(optionName,optionValue){
    var mySelect=eval(id+"_inner");
    if (!optionValue) optionValue=mySelect.length;
	 mySelect.options[mySelect.length]=new Option(optionName, optionValue);
    $(mySelect).selectmenu("refresh")  
  }
  eval(id).getValue=function(n){
	return eval(id+"_inner").options[n].selected}
  eval(id).getItem=function(n){
    return eval(id+"_inner")[n].text};
  eval(id).List=function(n){
    return eval(id).getItem(n)}
  eval(id).__defineGetter__('text', function(){return eval(id).selectedItem()});
  eval(id).__defineGetter__('ListCount', function(){return eval(id).getItemCount()});
  eval(id).__defineGetter__('ListIndex', function(){return eval(id).selectedIndex()});
  eval(id).__defineSetter__('ListIndex', function(n){
    eval(id).setIndex(n);
    if (typeof(eval(id).onclick)=='function') {eval(id).onclick()};
    if (typeof(eval(id).onchange)=='function') {eval(id).onchange()};
    });
}
