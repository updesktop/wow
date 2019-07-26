var RKEY1="";
var RKEY2="";
var RROW="";
function JBE_DISPFLD(p0,p1,p2,p3){  
  var projects = p1;      
  var rval='';  
  for(var i=0; i<projects.length; i++) {     
    //Object.keys(ahash)[0];
    if(p2==projects[i][p0]){
      rval=projects[i][p3];      
      break;
    }    
  }  
  return rval;
}

function winpop(mode,t='10',l='10',rKey1,rKey2,title,aryJBE,code,name) {    
  if(!mode)	{
    $('#winpop').hide();
    $('#div_btns').css('pointer-events','auto'); 
    $('#div_add_proj').css('pointer-events','auto'); 
    //$('#wrapper').css('pointer-events','auto'); 
    return;
  }  

  RKEY1=rKey1;
  RKEY2=rKey2;
  RROW=0;
  var v_rKey1=document.getElementById(rKey1).value;
  
  var ary = aryJBE;    
  var f_white=0;
  var bclor='white';
  
  var dtl_H='15px;';
  var details='';    

  $('#wp_title').text(title); 
  $('#div_add_proj').css('pointer-events','none'); 
  $('#div_btns').css('pointer-events','none'); 
  $('#winpop').css('top',t+'px');
  $('#winpop').css('left',l+'px');
  $('#winpop').attr('data-sele',0);
  var details='';
  
  for(var i=0; i<ary.length; i++) {          
    var v_code=ary[i][code];
    if(f_white==0) {				
      bclor="white";
      f_white=1;
    }	else {
      bclor="lightgray";
      f_white=0;
    }		
    details = details +    
    '<div id="win_line'+i+'" data="'+bclor+'" data-sel=1 data-row='+i+' onmouseover="subHover(this.id,1,&quot;'+i+'&quot;,&quot;red&quot;)" onmouseout="subHover(this.id,0,&quot;'+i+'&quot;,&quot;none&quot;)"'+ 
    '     onclick="HLrow('+ary.length+',&quot;win_line&quot;,'+i+'); winpop_sele('+i+')" ondblclick="winpop_go()" style="float:left;margin-bottom:0%;border:0px solid gray;cursor:pointer;width:99.5%;height:'+(parseInt(dtl_H)+4)+'px;padding:0%;background:'+bclor+';">'+          
    '  <div id="win_code'+i+'" class="centro" style="width:20%;height:'+dtl_H+';text-align:center;border:1px solid gray;">'+ary[i][code]+'</div>'+            
    '  <div id="win_name'+i+'" class="centro" style="width:76%;height:'+dtl_H+';text-align:left;border:1px solid gray;">'+ary[i][name]+'</div>'+				      
    '</div>';    
  }  
  document.getElementById("winpop-body").innerHTML=details;  
  var v_RROW=(HLrowselect(ary.length,'win_line','win_code',v_rKey1));
  
  winpop_sele(v_RROW);      
  $('#winpop').show();
}

function winpop_sele(s){
  $('#winpop').attr('data-sele',s); 
  $('#wp_btn').prop('disabled',false);   
  RROW=s;
  //alert('RROW = '+s);
}
function winpop_go(){  
  var x = $('#winpop').attr('data-sele');   
  var sel_code=document.getElementById("win_code"+RROW).innerText;
  var sel_name=document.getElementById("win_name"+RROW).innerText;

  document.getElementById(RKEY1).value=sel_code;
  document.getElementById(RKEY2).value=sel_name;  
  //alert(sel_code);
  winpop(false);
}
//**************************************************************************************************** */

function showProcImg(mode,sz='200px',t='10',l='10') {    
  if(mode==1)	{
    $('#wrapper').css('pointer-events','none'); 
    
    $('#divProcImg').css('width',sz);
    $('#divProcImg').css('height',sz);
    $('#divProcImg').css('top',t+'px');
    $('#divProcImg').css('left',l+'px');
    $('#divProcImg').show();
  } else {
    $('#divProcImg').hide();
    $('#wrapper').css('pointer-events','auto'); 
  }
}

function subHover(div,n,i,c){   
  //alert(div);
  var datasel = $('#'+div).attr('data-sel');  
  if(datasel==1) { return; }   
  //$('#btn_up').val(datasel);
   
  obg=$('#'+div).attr('data');
  
  if(n==1){
    $('#'+div).css('background-color','#85d0e6');    
  } else {    
    $('#'+div).css('background-color',obg);
  }
}

function HLrow(rowcntr,div,sel){    //highlights the record row -by JBE
  var bg='<?php echo $clor_bar;?>';  
  bg='cyan';  
  //alert('rowcount : '+rowcntr);
  for(i=0;i<rowcntr;i++) {    
    if($('#'+div+i).attr('data-sel')==1) {
      var obg=$('#'+div+i).attr('data');
      $('#'+div+i).css('background-color',obg);    
      $('#'+div+i).attr('data-sel',0);
    }
  }
  $('#'+div+sel).css('background-color',bg);
  $('#'+div+sel).attr('data-sel',1);    
}
function HLrowselect(rowcntr,div,div2,rKey){    //select/highlights the record row -by JBE
  var rval=0;  
  bg='cyan';    
  for(i=0;i<rowcntr;i++) {    
    if($('#'+div2+i).text()==rKey) {  
      $('#'+div+i).css('background-color',bg);    
      $('#'+div+i).attr('data-sel',1);
      rval=i;
      break;
    }
  }
  if(rval==0){
    $('#'+div+0).css('background-color',bg);    
    $('#'+div+0).attr('data-sel',1);
  }
  return rval;
}

function retREC_SELECTED(jbe,div){    //get current record row -by JBE  
  var rval=0;
  var rowcntr=jbe.length;
  for(i=0;i<rowcntr;i++) {    
    if($('#'+div+i).attr('data-sel')==1) {
      //rval=$('#'+div2+i).text();
      rval=i;
      break;
    }
  }  
  return rval;
}

function openImgViewer(t,l) {          
  if($('#txProg_id').val().trim().length==0){
    alert('Error: Empty Proj-ID.');
    $('#txProg_id').focus();
    return;
  }
  var cur_img="site_img/"+$('#txImg').val();

  $('#div_add_proj').css('pointer-events','none'); 
  $('#div_btns').css('pointer-events','none'); 
  $('#divImgViewer').css('top',t+'px');$('#divImgViewer').css('left',l+'px');
  $('#preview').attr('src',cur_img);
  loadImg(cur_img);
  $('#divImgViewer').show();  
  
}
function closeImgViewer(){
  $('#divImgViewer').hide();  
  $('#div_add_proj').css('pointer-events','auto'); 
  $('#div_btns').css('pointer-events','auto'); 
}

function loadImg(ci){
  var image = new Image();
  image.src = ci;
  image.onload = function() {
    //alert('width - ' + preview.naturalWidth+'\n'+'height - ' + preview.naturalHeight);
    if(image.naturalHeight >= image.naturalWidth) {
      $('#preview').css('height','100%');
      $('#preview').css('width','auto');
      //alert('portrait');
    } else {
      $('#preview').css('height','auto');
      $('#preview').css('width','100%');
      //alert('landscape');
    }
  }
}
function show_upload_div(m){
  if(m==1){
    $('#ImgViewer_edit').hide();
    $('#ImgViewer_upload').show();
    $('#img_holder').val('');
  }else{
    $('#ImgViewer_edit').show();
    $('#ImgViewer_upload').hide();
  }
}
function save_holder(){     
  if($('#img_holder').val().trim().length==0){
    alert('image hold empty');
    return;
  }

  var the_img=$('#img_holder').val();
  
  $('#prev_img').attr('src',$('#preview').attr('src'));
  $('#prev_img').attr('data',the_img);
  $('#txImg').val(the_img);
  closeImgViewer();
}

function isNumberKey(evt,div){    
  var charCode = (evt.which) ? evt.which : event.keyCode
  var inputValue = $("#"+div).val();
  if (charCode == 46){        
      var count = (inputValue.match(/'.'/g) || []).length;
      if(count<1){
        if (inputValue.indexOf('.') < 1){
          if (inputValue.charAt(0) == '.') return false;
            return true;
        }
        return false;
      }else{
        return false;
      }
  }
  
  if (charCode == 45) {      
    var xcount = (inputValue.match(/'-'/g) || []).length;      
    if(xcount<1){        
      if (inputValue.indexOf('-') < 1){                      
        if (inputValue.charAt(0) == '-') return false;
        //if (getCursorPosition(inputValue) != 0) return false;
        return true;
      }
    }else{
      //alert(888);
      return false;
    }
    
    //if (currentValue.charAt(0) == '-') return false;
    //if (getCursorPosition(this) != 0) return false;
  } 

  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)){
      return false;
  }
  return true;
}  

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
function formatNumber2(xnum) {
  num=Number(xnum);
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function jeffNumber(mode,div) {  
  var vv = document.getElementById(div).value;
  var v = vv.replace(/,/g, '');
  //var res = str.replace(/,/g, ".");
  
  if(mode==1) {
    v=parseInt(v);
    var rval = formatNumber(v);
  } else if(mode==2) {
    v=parseFloat(v);
    rval=formatNumber2(v);
  }
  
  document.getElementById(div).value=rval;
  return;
}

function chk_aryPROJsele(v){
  var rval=false;
  for(k=0;k<aryPROJsele.length;k++){
    if(v==aryPROJsele[k]){
      rval=true;
      break;
    }
  }
  return rval;
}

function sortByMultipleKey(keys) {
  return function(a, b) {
      if (keys.length == 0) return 0; // force to equal if keys run out
      key = keys[0]; // take out the first key
      if(key.substr(0,1)=="*"){        
        key=key.substr(1);
        if (a[key] < b[key]) return 1; // will be 1 if DESC
        else if (a[key] > b[key]) return -1; // will be -1 if DESC
      }
      //if (a[key] < b[key]) return -1; // will be 1 if DESC
      //else if (a[key] > b[key]) return 1; // will be -1 if DESC
      //alert(key);
      if (a[key] < b[key]) return -1; // will be 1 if DESC
      else if (a[key] > b[key]) return 1; // will be -1 if DESC
      else return sortByMultipleKey(keys.slice(1))(a, b);
  }
}

function sort_msg_byDate_Descending(a,b) {
  if (a.sortdate < b.sortdate)
    return -1;
  if (a.sortdate > b.sortdate)
    return 1;
  return 0;
}

function enadfy(arr){
  alert('333666');
  /*
  var countries = { "ABW": "Aruba", "AFG": "Afghanistan", "AGO": "Angola" };
  for(code in countries){
      alert("code: " + code + "\n" + "country: " + countries[code]);
  }
  */

  for(i=0;i<arr.length;i++){          
    for(x in arr[0]){      
      coldata=arr[i][x];  
     
      var pos = coldata.search('\"');      
      if(pos !== -1){        
        coldata=coldata.replace(/\"/g, "'");
        //alert(coldata);
      }

      var pos2 = coldata.search('\~');      
      if(pos2 !== -1){    
        //alert(coldata);    
        coldata=coldata.replace(/\~/g, '"');        
      }

      arr[i][x]=coldata;      
    }    
  }    
  return arr;
}

function wrongChr(jClass){
  var x = document.getElementsByClassName(jClass);
  var xx=""
  var retval=false;
  var i;
  for (i = 0; i < x.length; i++) {
    //x[i].style.backgroundColor = "red";
    var xstr=x[i].value;
    var pos1 = xstr.search('\&');
    var pos2 = xstr.search('\#');
    var pos3 = xstr.search('\~');
    
    if(pos1 !== -1){
      xx='"&" or Ampersand';      
      retval=true;
      break;
    }
    if(pos2 !== -1){
      xx='"#" or Hashtag';      
      retval=true;
      break;
    }
    if(pos3 !== -1){
      xx='"~" or Tilde';      
      retval=true;
      break;
    }
    
    var strHasBackslashes = (/\\/).test(xstr);   
    if (strHasBackslashes) { 
      xx='"\\" or Backslash';      
      retval=true;
      break;
    }
    
  }
  if(retval){
    MSG_SHOW(vbOk,"ERROR","Invalid Entry. "+xx+" is found.",function(){},function(){});    
  }
  return retval;
}

function used_in_other_files(s,f,j,r){ //serch,field,RRY,retcode
  var retval=null;
  for(var i=0; i<j.length; i++) {      
    if(s==j[i][f]) {
      retval=j[i][r];        
      break;
    }      
  }
  //alert(retval);
  return retval;
}

function jdate_diff(startDate,endDate){ 
  var rval=0;  
  var timeDiff  = (new Date(endDate)) - (new Date(startDate));
  rval = timeDiff / (1000 * 60 * 60 * 24);  
  return rval;
}

function task1(){ //put FCODE, MCODE to projhist
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {						
        //document.getElementById("mnu4").innerHTML=xmlhttp.responseText;			
        var reply = this.responseText;
        alert(reply);
      }
  };  
  
  xmlhttp.open("POST", "z_task1.php",true);  
  xmlhttp.send();  
}