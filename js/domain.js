function domain_add()
{
	var domain = $("#domain").val();
	var subdir = $("#subdir").val();
	$.ajax({
		type:'POST',
		url: '?c=domain&a=add',
		data:'domain=' + domain + '&subdir=' + subdir,
		async:false,
		success:function(msg){
			if (msg != "成功"){
				//document.getElementById("button").disabled=true;
				return alert(msg);
			}
		},
		complete:function(msg){
			show_sync();
			window.location = window.location;
		}
	});	
}
var dialog = null;
function piao_domain_import()
{
	var html = '<div>覆盖:<input id="replace" name="replace" type=checkbox value=1 checked></div>';
		html += '<div class="piao_div">一行一个，域名和目录(或IP)用空格分割</div>';
		html += '<div class="piao_div"><textarea id="domain_import_value" rows=10 cols=60 placeholder="www.cdn.com /wwwroot(或192.168.2.1)"></textarea>';
		html += '<div><input type=button class="btn btn-primary" value="导入" onclick="domain_import()"></div>';
		var d = art.dialog({id:'domain_import'});
		d.title('批量添加域名绑定');
		d.content(html);
		dialog = d;
}
function domain_import()
{
	var values = $("#domain_import_value").val();
	var replace = $("#replace").attr('checked');
	if (!values) {
		return false;
	}
	dialog.close();
	var addmsg ='';
	var last = null;
	var rows = values.split("\n");
	for( var i in rows) {
		var row = rows[i].split(' ');
		var domain = row[0];
		if (!domain) {
			break;
		}
		var ip = row[1];
		if (!ip) {
			if (last) {
				ip = last;
			}else {
				addmsg += domain + '没有值,增加失败<br>';
				continue;
			}
		}
		$.ajax({
			url:'?c=domain&a=add',
			type:'get',
			data:{
				domain:domain,subdir:ip,replace:replace?1:!1
			},
			async:false,
			success:function(a) {
				addmsg += "<b";
				if (a =='成功') {
					last = ip;
					addmsg += ' class="green">';
				}else {
					addmsg +=' class="red">';
				}
				addmsg += domain + a + '</b><br>';
			}
		});
		
	}
	if (addmsg) {
		var pd = art.dialog({id:'domain_import_msg',title:'批量导入',esc:false});
		pd.content(addmsg);
		$(".aui_close").bind("click",function(){
			window.location = window.location;
		});
	}
}
function domain_sync()
{
}
function domain_del(val,id)
{
	if (confirm("确定要删除?") !=true) {
		return;
	}
	$.ajax({
		type:'POST',
		url: '?c=domain&a=del',
		data:'domain=' + val,
		async:false,
		success:function(msg){
			if(msg != "成功"){
				return alert(msg);
			}
			 //$("#" + id +"t" ).fadeOut(1000);//cdn未实现
			
		},
		complete:function(msg){
			show_sync();
			window.location.reload();
		}
	});
	
}