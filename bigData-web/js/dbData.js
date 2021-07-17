function getdbData() {//用于插入后端数据时运行的js文件
	
	//各省疫情分布数据
	//全国TOP10省份数据
	var jwsrNum = []; //累计境外输入
	var jwsrTops = [];//用于接收jwsrTOP表中的数据
	var jwsrTopProvince = [];
	var jwsrTopNum = [];

	var worldMaps = [];
	$.getJSON("http://localhost:8080/searchAreaTree", function(json) {
		worldMaps = json;
		//console.log(worldMaps);
		worldlist = [];
		
		worldMaps.forEach(function(element) {
			worldlist.push({
					name: element.name,
					value: element.totalConfirm
				})
		});
		//初始化echarts实例 渲染地图数据
		var myChart7 = echarts.init(document.getElementById('worldMap-1'));
		
		// 指定图表的配置项和数据
		var option7 = {
			geo: {
				map: "world", //由world.js自动获取地图
				zoom: 1.2, //地图缩放比例
				itemStyle: {
					areaColor: "#fff",
					borderColor: "#666",
					borderWidth: "0.3"
				},
				emphasis: {
					itemStyle: {
						areaColor: "#b4ffff"
					}
				}
			},
			tooltip: {
				trigger: 'item',
				formatter: '{b}<br/>{c} (例)'
			},
			visualMap: {
				type: 'piecewise',
				pieces: [
					{
						min: 10000001,
						max: 100000000,
						label: '确诊大于1000万人',
						color: '#8a0808'
					},
					{
						min: 5000000,
						max: 10000000,
						label: '确诊500万-1000万人',
						color: '#b80909'
					},
					{
						min: 1000000,
						max: 5000000,
						label: '确诊100万-500万人',
						color: '#e83132'
					},
					{
						min: 100000,
						max: 1000000,
						label: '确诊10万-100万人',
						color: '#ff6a57'
					},
					{
						min: 10000,
						max: 100000,
						label: '确诊1万-10万人',
						color: '#ff9985'
					},
					{
						min: 5000,
						max: 9999,
						label: '确诊100-999人',
						color: '#ffc4b3'
					},
					{
						min: 1,
						max: 4999,
						label: '确诊1-4999人',
						color: '#ffe5db'
					},
					{
						min:0,
						max:0,
						label: '确诊为0',
						color: '#ffffff'
					}
				],
				color: ['#E0022B', '#E09107', '#A3E00B'],
				itemWidth: 10,
				itemHeight: 10,
				itemGap: 2,
				inverse: false
			},
			series: [{
				type: "map",
				geoIndex: 0,
				data: worldlist
			}]
		}
		myChart7.setOption(option7);
	});
	//全国地图
	var maps = [];
	$.getJSON("http://localhost:8080//searchProvince", function(json) {
		maps = json;
		// console.log(maps)
		var nowList = [];
		var allList = [];

		maps.forEach(function(element) {
			nowList.push({
					name: element.name,
					value: element.todayConfirm
				}),
				allList.push({
					name: element.name,
					value: element.totalConfirm
				})
		});
		// console.log(nowList)
		// console.log(allList)

		//将数据插入表格
		var table = document.getElementById("table-1");
		for (var i = 0; i < maps.length; i++) {
			var row = table.insertRow(table.rows.length);
			var c1 = row.insertCell(0); //地区名
			c1.innerHTML = maps[i]["name"];
			var c2 = row.insertCell(1); //新增
			c2.innerHTML = maps[i]["todayConfirm"];
			var c3 = row.insertCell(2); //现有
			var num = maps[i]["totalConfirm"] - maps[i]["totalHeal"] - maps[i]["totalDead"];
			c3.innerHTML = num;
			var c4 = row.insertCell(3); //累计
			c4.innerHTML = maps[i]["totalConfirm"];
			var c5 = row.insertCell(4); //治愈
			c5.innerHTML = maps[i]["totalHeal"];
			var c6 = row.insertCell(5); //死亡
			c6.innerHTML = maps[i]["totalDead"];
		}


		//初始化echarts实例 渲染地图数据
		var myChart3 = echarts.init(document.getElementById('mapEcharts'));

		// 指定图表的配置项和数据
		var option3 = {
			geo: {
				map: "china", //由china.js自动获取地图
				zoom: 1.2, //地图缩放比例
				itemStyle: {
					areaColor: "#fff",
					borderColor: "#666",
					borderWidth: "0.3"
				},
				label: {
					show: true,
					fontSize: 10
				},
				emphasis: {
					itemStyle: {
						areaColor: "#b4ffff"
					}
				}
			},
			tooltip: {
				trigger: 'item'	
			},
			visualMap: {
				type: 'piecewise',
				pieces: [{
						min: 10000,
						max: 1000000,
						label: '确诊大于等于10000人',
						color: '#372a28'
					},
					{
						min: 5000,
						max: 9999,
						label: '确诊5000-9999人',
						color: '#4e160f'
					},
					{
						min: 1000,
						max: 4999,
						label: '确诊1000-4999人',
						color: '#974236'
					},
					{
						min: 100,
						max: 999,
						label: '确诊100-999人',
						color: '#ee7263'
					},
					{
						min: 1,
						max: 99,
						label: '确诊1-99人',
						color: '#f5bba7'
					},
				],
				color: ['#E0022B', '#E09107', '#A3E00B'],
				itemWidth: 10,
				itemHeight: 10,
				itemGap: 2,
				inverse: false
			},
			series: [{
				type: "map",
				geoIndex: 0,
				data: nowList
			}]
		}
		myChart3.setOption(option3);
		$(".chinaTap").click(function() {
			$(".chinaTap").each(function(i, obj) {
				$(obj).removeClass("isActive");
			});
			var className = $(this).attr("class");
			var arr = className.split(" ");

			$(this).attr("class", "chinaTap isActive");
			option3.series[0].data = allList;
			myChart3.setOption(option3);
		});
	});

	//全国总体概况数据
	var datas = [];
	$.getJSON("http://localhost:8080//seachChinaTotal", function(json) {
		datas = json;
		// console.log(datas);
		// console.log(datas[1]["todayConfirm"]);
		//设置八大块 在data的historyList里面的第一个数组中获取
		var infoConfig = {
			"totalInput": {
				"title": "境外输入",
				"color": "#476DA0"
			},
			"totalSuspect": {
				"title": "累计疑似",
				"color": "#fe8d00"
			},
			"extDataNoSymptom": {
				"title": "无症状",
				"color": "#fe653b"
			},
			"totalConfirm": {
				"title": "累计确诊",
				"color": "#ff0910"
			},
			"totalHeal": {
				"title": "累计治愈",
				"color": "#00b1b7"
			},
			"totalSevere": {
				"title": "累计重症",
				"color": "#525498"
			},
			"totalDead": {
				"title": "累计死亡",
				"color": "#4c5054"
			},
		}
		// console.log(infoConfig);
		// console.log(datas);
		// console.log(datas[1]["totalDead"]);
		//console.log(infoConfig.todayConfirm);
		//通过拼接字符串获取八大快
		var htmlStr = "";
		htmlStr += `<li>
				<h5>现有确诊</h5>
				<p style= "color:#ff5e49">${datas[0]["totalConfirm"]-datas[0]["totalDead"]-datas[0]["totalHeal"]-100000}</p>
				<span>
					<em>昨日</em>
					<i style= "color:#ff5e49">${datas[0]["todayConfirm"]-datas[0]["todayDead"]-datas[0]["todayHeal"]}</i>
				</span>
			</li>`
		htmlStr += `<li>
				<h5>境外输入</h5>
				<p style= "color:#476DA0">${datas[0]["totalInput"]}</p>
				<span>
					<em>昨日</em>
					<i style= "color:#476DA0">${datas[0]["todayInput"]}</i>
				</span>
			</li>`
		htmlStr += `<li>
				<h5>累计疑似</h5>
				<p style= "color:#fe8d00">${datas[0]["totalSuspect"]-datas[0]["totalDead"]-datas[0]["totalHeal"]-100000}</p>
				<span>
					<em>昨日</em>
					<i style= "color:#fe8d00">${datas[0]["todaySuspect"]}</i>
				</span>
			</li>`
		htmlStr += `<li>
				<h5>无症状</h5>
				<p style= "color:#ff5e49">${datas[0]["extDataNoSymptom"]}</p>
				<span>
					<em>昨日</em>
					<i style= "color:#ff5e49">${datas[0]["extDataIncrNoSymptom"]}</i>
				</span>
			</li>`
		htmlStr += `<li>
				<h5>累计确诊</h5>
				<p style= "color:#ff0910">${datas[0]["totalConfirm"]}</p>
				<span>
					<em>昨日</em>
					<i style= "color:#ff0910">${datas[0]["todayConfirm"]}</i>
				</span>
			</li>`
		htmlStr += `<li>
				<h5>累计治愈</h5>
				<p style= "color:#00b1b7">${datas[0]["totalHeal"]}</p>
				<span>
					<em>昨日</em>
					<i style= "color:#00b1b7">${datas[0]["todayHeal"]}</i>
				</span>
			</li>`
		htmlStr += `<li>
				<h5>累计重症</h5>
				<p style= "color:#525498">${datas[0]["totalSevere"]}</p>
				<span>
					<em>昨日</em>
					<i style= "color:#525498">${datas[0]["todaySevere"]}</i>
				</span>
			</li>`
		htmlStr += `<li>
				<h5>累计死亡</h5>
				<p style= "color:#ff5e49">${datas[0]["totalDead"]}</p>
				<span>
					<em>昨日</em>
					<i style= "color:#ff5e49">${datas[0]["todayDead"]}</i>
				</span>
			</li>`

		$(".info").html(htmlStr);
	});


	$.getJSON("http://localhost:8080//searchJwsrTop", function(json) {
		jwsrTops = json; //境外输入省份 top10 总数据


		for (var i in jwsrTops) { //i代表索引值
			jwsrTopProvince.push(jwsrTops[i].name);
			jwsrTopNum.push(jwsrTops[i].jwsrNum);
		}
		// console.log(jwsrTops);

	});
	//按日期排列的疫情列表数据
	var lists = [];
	$.getJSON("http://localhost:8080//searchChinaDayList", function(json) {
		lists = json;
		// console.log(lists);

		//获取境外输入 总新增确诊和当前日期的数据
		var datas = []; //新增境外输入
		var addDatas = []; //总新增确诊
		var trendDate = []; //日期
		var jwsrNum = []; //累计境外输入
		// var jwsrTop = allData.jwsrTop;//境外输入省份 top10 总数据
		// var jwsrTopProvince = [];
		// var jwsrTopNum = [];
		var allConNum = []; //累计确诊人数
		var susNum = []; //现有疑似人数
		var nowEconNum = []; //现有确诊人数
		var cureNum = []; //治愈人数
		var deathNum = []; //死亡人数

		var cureRate = []; //治愈率
		var deathRate = []; //死亡率
		//console.log(trendDate);
		// for(var i in jwsrTop){
		// 	 jwsrTopProvince.push(jwsrTop[i].name);
		// 	 jwsrTopNum.push(jwsrTop[i].jwsrNum);
		// }
		// console.log(jwsrTopProvince)
		// console.log(jwsrTopNum)
		// console.log(jwsrTop)
		//从json中获取数据
		// console.log(lists[i]["totalConfirm"]-lists[i]["totalHeal"]-lists[i]["totalDead"])
		for (var i in lists) { //i代表索引值
			datas.push(lists[i]["todayInput"])
			addDatas.push(lists[i]["todayConfirm"])
			trendDate.push(lists[i]["date"])
			jwsrNum.push(lists[i]["totalInput"])
			allConNum.push(lists[i]["totalConfirm"])
			susNum.push(lists[i]["totalSuspect"])
			var num = lists[i]["totalConfirm"] - lists[i]["totalHeal"] - lists[i]["totalDead"];
			// console.log(num);
			nowEconNum.push(num)
			cureNum.push(lists[i]["totalHeal"])
			deathNum.push(lists[i]["totalDead"])
			var rate1 = lists[i]["totalHeal"] / lists[i]["totalConfirm"] * 100;
			// console.log(rate1);
			cureRate.push(rate1);
			var rate2 = lists[i]["totalDead"] / lists[i]["totalConfirm"] * 100;
			// console.log(rate2);
			deathRate.push(rate2);
			if (i == 490) {
				break
			}
		}
		//切割日期保留年月日
		for(var j in trendDate){
			var dates = [];
			dates = trendDate[j].toString().split('T',9);
			var date =dates[0];
			//console.log(date);
			trendDate[j] = date;
		}

		//console.log(trendDate);
		//console.l es);
		// var years = dates.getYear()
		// console.log(years);

		//  //将部分数据进行倒置
		// datas = datas.reverse(); 
		// addDatas = addDatas.reverse(); 
		// trendDate = trendDate.reverse(); 
		// jwsrNum = jwsrNum.reverse(); 
		// allConNum = allConNum.reverse();
		// susNum = susNum.reverse();
		// nowEconNum = nowEconNum.reverse();
		// cureNum = cureNum.reverse();
		// deathNum = deathNum.reverse();
		// //console.log(nowEconNum)

		//初始化echarts实例 境外输入新增趋势
		var myChart1 = echarts.init(document.getElementById('tendency'));
		// 指定图表的配置项和数据
		var option1 = {
			title: {
				text: "单位:例",
				textStyle: {
					color: "#ccc",
					fontSize: 12
				}
			},
			//右侧图标设置
			legend: {
				itemWidth: 12,
				itemHeight: 12,
				right: 20,
				top: 20,
				orient: "horizontal",
				textStyle: {
					padding: [3, 0, 0, 0]
				}
			},
			//x轴属性
			xAxis: {
				type: 'category',
				data: trendDate
			},
			//提示框
			tooltip: {
				trigger: 'axis'
			},
			//y轴属性
			yAxis: {
				type: 'value',
			},
			series: [{
				name: "新增境外输入",
				type: "line",
				data: datas,
				smooth: true,
				color:"#7D64BC"
			}]
		};
		myChart1.setOption(option1);

		$(".trendBottom .trendLeft").click(function() {
			$(this).addClass("trendActive");
			$(this).siblings().removeClass("trendActive");
			var index = $(this).index();
			if (index == 0) { //境外输入新增趋势
				$("#modifyTitle").html("境外输入新增趋势");
				option1.series[0].data = datas;
				option1.series[0].color = "#7D64BC";
				option1.series[0].name = "新增境外输入";
				myChart1.setOption(option1);
			}
			if (index == 1) { //境外输入累计趋势
				$("#modifyTitle").html("境外输入累计趋势");
				option1.series[0].data = jwsrNum;
				option1.series[0].color = "#19caad";
				option1.series[0].name = "累计境外输入";
				myChart1.setOption(option1);
			}
			if (index == 2) { //境外输入累计确诊省Top10
				$("#modifyTitle").html("境外输入累计确诊省");
				var optionX = {
					xAxis: {
						type: 'category',
						data: jwsrTopProvince
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: jwsrTopNum,
						type: 'bar',
						name: "",
						color:"#29b7cb"
					}]
				};
				myChart1.setOption(optionX);
			}
		});

		//全国 现有确诊/疑似/累计确诊 趋势
		var myChart2 = echarts.init(document.getElementById('chinaTendency'));
		// 指定图表的配置项和数据
		var option2 = {
			title: {
				text: "单位:例",
				textStyle: {
					color: "#ccc",
					fontSize: 12
				}
			},
			//右侧图标设置
			legend: {
				itemWidth: 12,
				itemHeight: 12,
				right: 20,
				top: 20,
				orient: "horizontal",
				textStyle: {
					padding: [3, 0, 0, 0]
				}
			},
			//x轴属性
			xAxis: {
				type: 'category',
				data: trendDate,
				axisLabel: {
					interval: 25,
					rotate: 45,
					color: "#ccc",
					fontSize: 10
				}
			},
			//提示框
			tooltip: {
				trigger: 'axis'
			},
			//y轴属性
			yAxis: {
				type: 'value',
			},
			series: [{
				name: "新增境外输入",
				type: "line",
				data: datas,
				smooth: true,
				color:"#51c4d3"
			}, {
				name: "总新增确诊",
				type: "line",
				data: addDatas,
				smooth: true,
				color:"#efafad"
			}]
		};
		myChart2.setOption(option2);


		//全国 现有确诊/疑似/累计确诊 趋势
		var myChart4 = echarts.init(document.getElementById('susTendency'));
		// 指定图表的配置项和数据
		var option4 = {
			title: {
				text: "单位:例",
				textStyle: {
					color: "#ccc",
					fontSize: 12
				}
			},
			//右侧图标设置
			legend: {
				itemWidth: 12,
				itemHeight: 12,
				right: 20,
				top: 20,
				orient: "horizontal",
				textStyle: {
					padding: [3, 0, 0, 0]
				}
			},
			//x轴属性
			xAxis: {
				type: 'category',
				data: trendDate,
				axisLabel: {
					interval: 25,
					rotate: 45,
					color: "#ccc",
					fontSize: 10
				}
			},
			//提示框
			tooltip: {
				trigger: 'axis'
			},
			//y轴属性
			yAxis: {
				type: 'value',
			},
			series: [{
				name: "累计确诊人数",
				type: "line",
				data: allConNum,
				smooth: true,
				color: "#19caad"
			}, {
				name: "现有疑似人数",
				type: "line",
				data: susNum,
				smooth: true,
				color: "#ef3473"
			}, {
				name: "现有确诊人数",
				type: "line",
				data: nowEconNum,
				smooth: true,
				color: "#fcd337"
			}]
		};
		myChart4.setOption(option4);

		//全国 累计治愈/死亡 趋势
		var myChart5 = echarts.init(document.getElementById('ldTendency'));
		// 指定图表的配置项和数据
		var option5 = {
			title: {
				text: "单位:例",
				textStyle: {
					color: "#ccc",
					fontSize: 12
				}
			},
			//右侧图标设置
			legend: {
				itemWidth: 12,
				itemHeight: 12,
				right: 20,
				top: 20,
				orient: "horizontal",
				textStyle: {
					padding: [3, 0, 0, 0]
				}
			},
			//x轴属性
			xAxis: {
				type: 'category',
				data: trendDate,
				axisLabel: {
					interval: 25,
					rotate: 45,
					color: "#ccc",
					fontSize: 10
				}
			},
			//提示框
			tooltip: {
				trigger: 'axis'
			},
			//y轴属性
			yAxis: {
				type: 'value',
			},
			series: [{
				name: "治愈",
				type: "line",
				data: cureNum,
				smooth: true,
				color: "#91CC75"
			}, {
				name: "死亡",
				type: "line",
				data: deathNum,
				smooth: true,
				color: "#EB4F50"
			}]
		};
		myChart5.setOption(option5);

		//初始化echarts实例 全国 治愈率/死亡率 趋势
		var myChart6 = echarts.init(document.getElementById('rateTendency'));
		// 指定图表的配置项和数据
		var option6 = {
			//右侧图标设置
			legend: {
				itemWidth: 12,
				itemHeight: 12,
				right: 20,
				top: 20,
				orient: "horizontal",
				textStyle: {
					padding: [3, 0, 0, 0]
				}
			},
			//x轴属性
			xAxis: {
				type: 'category',
				data: trendDate,
				axisLabel: {
					interval: 25,
					rotate: 45,
					color: "#ccc",
					fontSize: 10
				}
			},
			//提示框
			tooltip: {
				trigger: 'axis',
			},
			//y轴属性
			yAxis: {
				type: 'value',
				axisLabel: { //y轴百分比
					show: true,
					interval: 'auto',
					formatter: '{value} %'
				},
				show: true
			},
			series: [{
				name: "治愈率",
				type: "line",
				data: cureRate,
				smooth: true,
				color: "#10aec2"
			}, {
				name: "死亡率",
				type: "line",
				data: deathRate,
				smooth: true,
				color: "#ed2f6a"
			}]
		};
		myChart6.setOption(option6);

	});
}
