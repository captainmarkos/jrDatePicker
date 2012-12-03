
var jrDatePicker=function(params){var leap_year=function(yr){return(yr%400===0)||(yr%4===0&&yr%100!==0);};var get_dow_names=function(loc){if(loc===undefined||loc===null){loc='en';}
if(loc==='es'||loc==='fr'){return(['D','L','M','M','J','V','S']);}
if(loc==='de'){return(['S','M','D','M','D','F','S']);}
return(['S','M','T','W','T','F','S']);};var get_month_names=function(loc){if(loc===undefined||loc===null){loc='en';}
if(loc==='es'){return(['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Augosto','Septiembre','Octubre','Noviembre','Diciembre']);}
if(loc==='fr'){return(['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre']);}
if(loc==='de'){return(['Januar','Februar','Marz','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']);}
return(['January','February','March','April','May','June','July','August','September','October','November','December']);};var days_in_month=function(month_num,full_year){if(month_num===0||month_num===2||month_num===4||month_num===6||month_num===7||month_num===9||month_num===11){return(31);}
if(month_num===3||month_num===5||month_num===8||month_num===10){return(30);}
return(leap_year(full_year)?29:28);};var get_max_date=function(param_max_date){var date=new Date();var month=date.getMonth();var year=date.getFullYear();param_max_date='3M';switch(param_max_date){case'3M':if((month+3)>11){month=(month+3)%12;year++;}
else{month+=3;}
break;case'6M':if((month+6)>11){month=(month+6)%12;year++;}
else{month+=6;}
break;case'9M':if((month+9)>11){month=(month+9)%12;year++;}
else{month+=9;}
break;case'2Y':year+=2;break;case'*':year=3125;break;default:year+=1;}
return(new Date(year,month,date.getDate()));};var get_min_date=function(param_min_date){var date=new Date();var month=date.getMonth();var year=date.getFullYear();switch(param_min_date){case'3M':if((month-3)<0){month=(month-3)%12;year--;}
else{month-=3;}
break;case'6M':if((month-6)<0){month=(month-6)%12;year--;}
else{month-=6;}
break;case'9M':if((month-9)<0){month=(month-9)%12;year--;}
else{month-=9;}
break;case'1Y':year-=1;break;case'2Y':year-=2;break;case'*':year=1900;break;default:break;}
return(new Date(year,month,date.getDate()));};var MAX_CALENDARS=2;var dp_id_name=params.dp_id_name||'';var id_name=params.id_name||'';var locale=params.locale||'en';var ondateselected_callback=(params.onDateSelected instanceof Function)?params.onDateSelected:null;var onclose_callback=(params.onClose instanceof Function)?params.onClose:null;var display_count=params.display_count||1;display_count=(display_count>MAX_CALENDARS)?MAX_CALENDARS:display_count;var close_onselect=params.close_onselect;close_onselect=(close_onselect==undefined)?true:close_onselect;var max_date=get_max_date((params.max_date||'1Y'));var min_date=get_min_date((params.min_date||'*'));var currdate=new Date();var today=new Date(currdate.getFullYear(),currdate.getMonth(),currdate.getDate());var month_names=get_month_names(locale);var day_names=get_dow_names(locale);var mn=currdate.getMonth();var yy=currdate.getFullYear();var citem={day:0,month:0,year:1900,first_dow:0,total_days:0,offset:0,multi_cal:'',markup:function(unique_id){var the_html='';if(this.offset>=this.first_dow){var tmp_date=new Date(this.year,this.month,this.day);var td_id=unique_id+this.month+'_'+this.day+'_'+this.year;if(tmp_date.valueOf()>max_date.valueOf()){the_html+='<td id="'+td_id+'" class="jrdp_calendar_day1_noselect'+this.multi_cal+'">'+this.day+'</td>';}
else if(tmp_date.valueOf()<min_date.valueOf()){the_html+='<td id="'+td_id+'" class="jrdp_calendar_day1_noselect'+this.multi_cal+'">'+this.day+'</td>';}
else if(tmp_date.valueOf()==today.valueOf()){the_html+='<td id="'+td_id+'" class="jrdp_calendar_current_day'+this.multi_cal+'">'+this.day+'</td>';}
else{the_html+='<td id="'+td_id+'" class="jrdp_calendar_day1'+this.multi_cal+'">'+this.day+'</td>';}
if(this.day>=this.total_days){this.first_dow=999;}}
else{the_html+='<td class="jrdp_calendar_day2'+this.multi_cal+'">&nbsp;</td>';}
this.offset++;if(this.offset>this.first_dow){this.day++;}
return(the_html);}};var close_datepicker=function(){if(close_onselect){document.getElementById(dp_id_name).innerHTML="";if(id_name!=''){eval('document.getElementById("'+id_name+'").focus();');}
if(onclose_callback!=undefined){onclose_callback();}}};var select_date=function(mm,dd,yy){var the_month,the_day;mm++;if(mm<10){the_month="0"+mm;}else{the_month=mm.toString();}
if(dd<10){the_day="0"+dd;}else{the_day=dd.toString();}
if(id_name!=''){eval('document.getElementById("'+id_name+'").value = the_month + "/" + the_day + "/" + yy');}
if(ondateselected_callback!=undefined){ondateselected_callback();}
close_datepicker();};var month_inc=function(){var scroll_date=new Date(yy,mn,today.getDate());if((scroll_date.getFullYear()==max_date.getFullYear())&&(scroll_date.getMonth()>=max_date.getMonth())){return;}
if(mn<11){mn++;}
else{mn=0;yy++;}
that.show();};var month_dec=function(){var scroll_date=new Date(yy,mn,today.getDate());if((scroll_date.getFullYear()==min_date.getFullYear())&&(scroll_date.getMonth()<=min_date.getMonth())){return;}
if(mn>0){mn--;}
else{mn=11;yy--;}
that.show();};var dump_html=function(calendar_html){var the_html='<tt>';for(var j=0;j<calendar_html.length;j++){var ch=calendar_html.charAt(j);if(ch=='<')ch='&lt;';else if(ch=='>')ch='&gt;<br />';else if(ch==' ')ch='&nbsp;';the_html+=ch;}
the_html+='</tt>';if(document.getElementById('htmldump')!=null)
document.getElementById('htmldump').innerHTML=the_html;};var that={show:function(){if(dp_id_name==undefined)return;var calendar_html='';var unique_id='jrdp_'+dp_id_name+'_';calendar_html='<table id="dude" class="jrdp_encapsulated_table" cellspacing="0" cellpadding="0">';calendar_html+='<tr>';for(i=0;i<display_count;i++){citem.day=1;citem.month=mn;citem.year=yy;if(i>0){if(mn<11){citem.month=mn+1;}
else{citem.month=0;citem.year=yy+1;}}
currdate.setDate(1);currdate.setMonth(citem.month);currdate.setFullYear(citem.year);citem.offset=0;citem.first_dow=currdate.getDay();citem.total_days=days_in_month(currdate.getMonth(),currdate.getFullYear());citem.multi_cal=(display_count>1)?'_multi':'';calendar_html+='<td>';calendar_html+='<table class="jrdp_calendar'+citem.multi_cal+'" cellspacing="0" cellpadding="0">';calendar_html+='    <tr><td colspan="7">';calendar_html+='        <table width="100%" border="0" cellspacing="0" cellpadding="0">';calendar_html+='        <tr class="jrdp_calendar_tbar'+citem.multi_cal+'">';if(close_onselect){calendar_html+='            <td align="right"><span id="'+unique_id+'close" style="cursor: pointer;">';calendar_html+='                                  <span class="jrdp_calendar_close_btn'+citem.multi_cal+'"></span>';calendar_html+='                              </span></td>';}
else{calendar_html+='            <td align="right">&nbsp;</td>';}
calendar_html+='        </tr></table>';calendar_html+='    </td></tr>';calendar_html+='    <tr class="jrdp_calendar_month_tbar'+citem.multi_cal+'">';calendar_html+='    <td>';calendar_html+='        <table width="100%" border="0" cellspacing="0" cellpadding="0">';calendar_html+='            <tr align="center" valign="middle">';calendar_html+='            <td colspan="1" class="jrdp_calendar_month_prev'+citem.multi_cal+'" align="left">';calendar_html+='                <span id="'+unique_id+'prevmonth'+citem.multi_cal+'_'+i+'">&lt;</span></td>';calendar_html+='            <td colspan="5" class="jrdp_calendar_month'+citem.multi_cal+'">'+month_names[citem.month]+' '+citem.year+'</td>';calendar_html+='            <td colspan="1" class="jrdp_calendar_month_next'+citem.multi_cal+'" align="right">';calendar_html+='                <span id="'+unique_id+'nextmonth'+citem.multi_cal+'_'+i+'">&gt</span></td>';calendar_html+='            </tr>';calendar_html+='            <tr>';for(var j=0;j<7;j++){calendar_html+='<td class="jrdp_calendar_days'+citem.multi_cal+'">'+day_names[j]+'</td>';}
calendar_html+='            </tr>';var rows_printed=0;for(var j=0;j<6;j++){if(citem.first_dow==999){break;}
calendar_html+='            <tr>';for(var k=0;k<7;k++){calendar_html+=citem.markup(unique_id);}
calendar_html+='            </tr>';rows_printed++;}
for(var j=0;j<(6-rows_printed);j++){calendar_html+='<tr>';for(var k=0;k<7;k++){calendar_html+='<td class="jrdp_calendar_day2'+citem.multi_cal+'">&nbsp;</td>';}
calendar_html+='</tr>';}
calendar_html+='        </table>';calendar_html+='    </td>';calendar_html+='    </tr>';calendar_html+='</table>';calendar_html+='</td>';}
calendar_html+='</tr></table>';document.getElementById(dp_id_name).innerHTML=calendar_html;for(var j=0;j<i;j++){document.getElementById(unique_id+'prevmonth'+citem.multi_cal+'_'+j).onclick=month_dec;document.getElementById(unique_id+'nextmonth'+citem.multi_cal+'_'+j).onclick=month_inc;}
if(close_onselect){document.getElementById(unique_id+'close'+citem.multi_cal).onclick=close_datepicker;document.getElementById('dude').onblur=close_datepicker;}
var day_tds=document.getElementsByClassName('jrdp_calendar_day1'+citem.multi_cal);for(var i=0;i<day_tds.length;i++){var items=day_tds[i].id.split('_');var mmtmp=items[items.length-3];var ddtmp=items[items.length-2];var yytmp=items[items.length-1];var tmp_id=unique_id+mmtmp+'_'+ddtmp+'_'+yytmp;var s='document.getElementById("'+tmp_id+'").onclick = ';s+='function() { select_date('+mmtmp+','+ddtmp+','+yytmp+'); };';eval(s);}
var curr_day_td=document.getElementsByClassName('jrdp_calendar_current_day'+citem.multi_cal);if(curr_day_td.length>0){var items=curr_day_td[0].id.split('_');var mmtmp=items[items.length-3];var ddtmp=items[items.length-2];var yytmp=items[items.length-1];var tmp_id=unique_id+mmtmp+'_'+ddtmp+'_'+yytmp;var s='document.getElementById("'+tmp_id+'").onclick = ';s+='function() { select_date('+mmtmp+','+ddtmp+','+yytmp+'); };';eval(s);}}};return(that);};