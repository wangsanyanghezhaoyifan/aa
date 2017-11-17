var provinces = new Array("粤", "京", "沪", "浙", "苏", "鲁", "晋", "冀",
	"豫", "川", "渝", "辽", "吉", "黑", "皖", "鄂",
	"津", "贵", "云", "桂", "琼", "青", "新", "藏",
	"蒙", "宁", "甘", "陕", "闽", "赣", "湘");

var keyNums = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
	"Q", "W", "E", "R", "T", "Y", "U", "P",
	"A", "S", "D", "F", "G", "H", "J", "K", "L",
	"Z", "X", "C", "V", "B", "N", "M", "港", "澳", "<i class='iconfont icon-shanchu'></i>");
var next = 0;

function showProvince() {
	$("#pro").html("");
	var ss = "";
	for(var i = 0; i < provinces.length; i++) {
		ss = ss + addKeyProvince(i)
	}
	$("#pro").html("<div onclick='closePro();' style='width:100%;height:35px;font-size:16px;text-align:right;line-height:35px;color:lightseagreen'><span style='padding-right:10px;'>完成</span></div><ul class='clearfix ul_pro'>" + ss + "<li class='li_close' onclick='closePro();'><span>关闭</span></li><li class='li_clean' onclick='cleanPro();'><span>清空</span></li></ul>");
}

function showKeybord() {
	$("#pro").html("");
	var sss = "";
	for(var i = 0; i < keyNums.length; i++) {
		sss = sss + '<li class="ikey ikey' + i + ' ' + (i > 9 ? "li_zm" : "li_num") + ' ' + (i == 36 ? "li_w" : "") + '" ><span onclick="choosekey(this,' + i + ');">' + keyNums[i] + '</span></li>'
	}
	$("#pro").html("<div onclick='closePro();' style='width:100%;height:35px;font-size:16px;text-align:right;line-height:35px;color:lightseagreen'><span style='padding-right:10px;'>完成</span></div><ul class='clearfix ul_keybord'>" + sss + "</ul>");
}

function addKeyProvince(provinceIds) {
	var addHtml = '<li>';
	addHtml += '<span onclick="chooseProvince(this);">' + provinces[provinceIds] + '</span>';
	addHtml += '</li>';
	return addHtml;
}

function chooseProvince(obj) {
	$(".input_pro span").text($(obj).text());
	$(".input_pro").addClass("hasPro");
	$(".input_pro").removeClass('active').next().addClass('active');
	$(".input_pp").find("span").text("");
	$(".ppHas").removeClass("ppHas");

	next = 0;
	showKeybord();
}

function choosekey(obj, jj) {

	if(jj == 36) {

		if($(".ppHas").length == 0) {
			$(".hasPro").find("span").text("");
			$(".hasPro").removeClass("hasPro");
			showProvince();
			next = 0;
		}
		$(".ppHas:last").find("span").text("");
		$(".ppHas:last").removeClass("ppHas");
		$(".active:last").removeClass("active").prev().addClass('active');
		next = next - 1;
		if(next < 1) {
			next = 0;
		}
		console.log(next);
	} else {
		if(next > 100) {
			return
		}
		console.log(next);

		for(var i = 0; i < $(".input_pp").length; i++) {

			var next1 = next - 1;
			$(".input_pp:eq(" + next + ")").find("span").text($(obj).text());
			$(".input_pp:eq(" + next + ")").removeClass('active').next().addClass('active');
			$(".input_pp:eq(" + next + ")").addClass("ppHas");
			next = next + 1;
			if(next > 100) {
				next = 101;
			}
			getpai();
			return
		}

	}

}

function closePro() {
	layer.closeAll()
}

function cleanPro() {
	$(".ul_input").find("span").text("");
	$(".hasPro").removeClass("hasPro");
	$(".ppHas").removeClass("ppHas");
	next = 0;
}

function trimStr(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

function getpai() {
	var pai = trimStr($(".car_input").text());
	$(".car_input").attr("data-pai", pai);
}
window.onload = function() {
	$("body").on("click", ".input_pro", function() {

		$(this).addClass('active').siblings('li').removeClass('active');
		layer.open({
			type: 1,
			content: '<div id="pro"></div>',
			anim: 'up',
			shade: false,
			style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
		});
		showProvince()
	})
	$("body").on("click", ".input_pp", function() {

		if($(".input_pro").hasClass("hasPro")) { // 如果已选择省份
			layer.open({
				type: 1,
				content: '<div id="pro"></div>',
				anim: 'up',
				shade: false,
				style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
			});
			showKeybord()
		} else {
			$(".input_pro").click()
		}
	})
	//新能源
	$("body").on("click", ".chose", function() {
		var icon = $(this).find('.icon-gouxuan'),
			dis = icon.css('display'),
			ul = $('.ul_input');
		if(dis == "none") {
			icon.show();
			ul.append('<li class="input_pp"><span></span></li>');
			ul.addClass('ul_change');
			ul.find('li').css({
				"width": "12%"
			})

		} else {
			icon.hide();
			ul.find('li:last-child').remove();
			ul.removeClass('ul_change');
			ul.find('li').css({
				"width": "14%"
			});
			//			ul.find("span").text("");
			//			$(".ppHas").removeClass("ppHas");
			//			showProvince()
		}

	})

}

/*输入记录相关*/

var hisTime; //获取输入时间数组
var hisItem; //获取输入内容数组
var firstKey; //获取最早的1个输入时间

function init() {

	hisTime = []; //时间数组置空
	hisItem = []; //内容数组置空

	for(var i = 0; i < localStorage.length; i++) { //数据去重
		if(!isNaN(localStorage.key(i))) { //判断数据是否合法
			hisTime.push(localStorage.key(i));

		}
	}

	if(hisTime.length > 0) {
		hisTime.sort(); //排序
		for(var y = 0; y < hisTime.length; y++) {
			localStorage.getItem(hisTime[y]).trim() && hisItem.push(localStorage.getItem(hisTime[y]));
		}
	}

	$(".delete").html(""); //执行init(),每次清空之前添加的节点
	$(".Storage").show();
	for(var i = 0; i < hisItem.length; i++) {
		console.log(hisItem[i])

		$(".delete").prepend('<div class="word-break">' + hisItem[i] + '</div>');

		if(hisItem[i] != '') {
			$(".Storage").hide();
		}
	}
	var num = $('.word-break').length;

	if(num != "0") {
		$("#his-dele").show();
		var top = $('.word-break:last-child').offset().top,
			top1 = top - 80;
		$('.post').css('margin-top', top1)
	} else {
		$('.post').css('margin-top', '70px')
	}

}

init(); //调用
//清除记录功能
$("body").on("click", "#his-dele", function() {
	var f = 0;
	for(; f < hisTime.length; f++) {
		localStorage.removeItem(hisTime[f]);
	}
	init();

	$("#his-dele").hide();
});
//点击去查询
$("body").on("click", ".post", function() {

	var value = $(".car_input span").text(),
		time = (new Date()).getTime();

	if(!value) {
		alert("你未输入搜索内容");
		return false;
	}
	//输入的内容localStorage有记录

	if($.inArray(value, hisItem) >= 0) {
		for(var j = 0; j < localStorage.length; j++) {
			if(value == localStorage.getItem(localStorage.key(j))) {
				localStorage.removeItem(localStorage.key(j));
			}
		}
		localStorage.setItem(time, value);

	} else {
		localStorage.setItem(time, value);
	}
	init();

	//	window.location="new_file.html";//跳转

});
$(".delete").on("click", ".word-break", function() {
	var div = $(this).text(),
		len = div.length;
	if(len > 7) {
		$('.icon-gouxuan').css('display', 'inline');
		if($('.ul_input').find('li').length <= 7) {
			$('.ul_input').append('<li class="input_pp"><span></span></li>');
			$('.ul_input').addClass('ul_change');
			$('.ul_input').find('li').css({
				"width": "12%"
			});
		}
		for(var i = 0; i < len; i++) {
			$('.ul_input').find('li').eq(i).find('span').text(div[i])
		}
	} else {
		$('.icon-gouxuan').css('display', 'none');
		if($('.ul_input').find('li').length > 7) {
			$('.ul_input').find('li:last-child').remove();
			$('.ul_input').removeClass('ul_change');
			$('.ul_input').find('li').css({
				"width": "14%"
			});
		}
		for(var i = 0; i < len; i++) {
			$('.ul_input').find('li').eq(i).find('span').text(div[i])
		}
	}

});