function banip_add()
{
	var ip = $("#ip").val();
	var life_time = $("#life_time").val();
	if (ip == ""){
		return alert("IP不能为空");
	}
	$.ajax({
		type:'post',
		url:'?c=banip&a=addBanip',
		data:'ip=' + ip + '&life_time= ' + life_time,
		success:function(msg) {
			if (msg != "成功"){
				alert(msg);
			}
			window.location.reload();
		},
		complete: function(msg){
			show_sync();
		}
	});
}
function banip_del(id)
{
	if (confirm("确定要删除?") == false) {
		return;
	}
	$.ajax({
		type:'post',
		url:'?c=banip&a=delBanip',
		data:'id=' + id,
		success:function(msg){
			if (msg != "成功") {
				alert(msg);
			}
			window.location.reload();
		},
		complete: function(msg){
			show_sync();
		}
	});
}
function banip_checkon(val)
{
	var data = 'status=' + val;
	functoin_checkon('?c=banip&a=switchIp',data);
}
