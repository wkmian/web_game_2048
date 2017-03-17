var num_ ;

$(function(){
	init_map();

	$("body").keydown(function(e){
		//37 38 39 40  左上右下
		var code = e.keyCode;
		/*
		 * 过滤上下左右
		 
		if(code==37||code==38||code==39||code==40){
			alert(code);
			game_down();
			show_map();
		}*/
		/**/
		if(code==40){
			game_down();
			show_map();
		}
		if(code==38){
			zuoxuan();
			zuoxuan();
			game_down();
			zuoxuan();
			zuoxuan();
			show_map();
		}
		if(code==39){
			zuoxuan();
			game_down();
			zuoxuan();
			zuoxuan();
			zuoxuan();
			show_map();
		}if(code==37){
			zuoxuan();
			zuoxuan();
			zuoxuan();
			game_down();
			zuoxuan();
			show_map();
		}
		
		
		
		
		
	});
});


function init_map(){
	empty_num_div();
	//初始化游戏数据
	init_2048();
	before_game();
	
}

function empty_num_div(){
	/*清空数据*/
	$(".cell").each(function(){
		$(this).html("");
	});
}

/*初始化 游戏数组*/
function init_2048(){
	//num_ = new Array();
	/**/
	num_ = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
	];
	
	/*test data
	num_ = [
	[1,2,3,4],
	[5,6,7,8],
	[9,10,11,12],
	[13,14,15,16]
	]; */
}


/*游戏开始前 初始化游戏地图*/
function before_game(){
	//初始游戏牌数量
	/*  循环为什么不全是3次*/
	/*范二的错误 可能随机到有值的*/
	var num_count = 3;
	for( var i = 0;i<num_count;i++){
		fill_2048();
	}
	//将游戏地图展示在界面上
	show_map();
}

//将游戏地图展示在界面上
function show_map(){
	empty_num_div();

	for(var i = 0; i < num_.length;i++){
		for(var j = 0; j < num_[i].length;j++){
			//记录数据的临时变量
			var tmp = num_[i][j];
			if(tmp.length!=0&&tmp>0){
				$("#"+i+"_"+j).html(tmp);
			}
		}
	}
}
/*清空div*/
function empty_div(i,j){
	num_[j][i] = 0;
	/*清空div*/
	$("#"+j+"_"+i).html("");
}


/*随机[0-num)整数*/
function getRandom(num){
	return Math.floor(Math.random()*num);
}

/*声明随机数字牌数组*/
var num_2048 = [2,2,2,2,2,4,4,4,8,8]

/*返回一个数字牌*/
function getRandom_2048(){
	return num_2048[getRandom(num_2048.length)];
}


/*填充空白格子*/
function fill_2048(){
	var null_2048 = getNull_2048();
	
	if(null_2048.length==0){
		//alert("格子已经满了");
		//init_map();
		return;
	}
	var tmp = null_2048[getRandom(null_2048.length)].split("_");
	num_[tmp[0]][tmp[1]] = getRandom_2048();
	
	show_map();
	
}

/*得到空数组*/
function getNull_2048(){
	var null_2048 =new Array();
	for(var i = 0; i < num_.length;i++){
		for(var j = 0; j < num_[i].length;j++){
			var tmp = num_[i][j];
			if(tmp==0){
				null_2048.unshift(i+"_"+j);
			}
		}
	}
	return null_2048;
}
/*是否移动或者累加*/
var isOper = false;

/*是否累加*/
var isAdd = false;

/*向下事件*/
function game_down(){
	/*只循环正方形*/
	/*外层是列*/
	//boolean isOper = false;
	
	for(var i = 0; i < num_.length;i++){
		isAdd = false;
		for(var j = num_.length-2;j >=0 ;j--){
			//获取当前的值 判断下一步是什么动作
			/*
			var current  = num_[j][i];
			var next = num_[j+1][i];
			if(next==0){
				
			}
			*/
			next_2048(i,j);
		}
	}
	if(isOper){
		fill_2048();
		isOper = false;
		isAdd = false;
	}
}


/*判断当前块的下一步 向下移动
 * @param i 列
 * @param j 行
 */
function next_2048(i,j){
	
	if(j>=num_.length-1){
		//最后一块
		return;
	}
	var current = num_[j][i];
	if(current==0){
		//当前是空不处理
		return;
	}
	var next = num_[(j+1)][i];
	if(next==0){
		//移动
		//move_2048(i,j);
		num_[(j+1)][i] = num_[j][i];
		
		empty_div(i,j);
		/*
		num_[j][i] = 0;
		清空div
		$("#"+j+"_"+i).html("");
		*/
		isOper = true;
		next_2048(i,(j+1));
	}else if(!isAdd){
	
		if(next==current){
			//push_2048(i,j);
			num_[(j+1)][i] = next*2;
			empty_div(i,j);
			/*
			num_[j][i] = 0;
			清空div
			$("#"+j+"_"+i).html("");
			*/
			isAdd = true;
			isOper = true;
		}
	}
	//show_map();
	//fill_2048();
	//return true;
	
}

/*向下移动数字
function move_2048(i,j){
	num_[j+1][i] = num_[j][i];
	num_[j][i] = 0;
	//移动之后再次判断
	next_2048(i,j+1);
}

function add_2048(i,j){
	//num_
}
*/

function zuoxuan(){
	var z_num_ = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
	];
	for(var i = 0; i < num_.length ; i++){
		for(var j = 0; j < num_.length;j++){
			z_num_[i][j] = num_[num_.length-j-1][i];
		}
	}
	
	num_ = z_num_;
	//show_map();
}


//bug  同一列只能加一次 而不是全局只能加一次或者同类递归累加


