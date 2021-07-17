function getData(){//未插入后端数据库数据时，调用新浪的api接口，使用本js文件
	//获取疫情数据
	$.ajax({
		url:"https://news.sina.com.cn/project/fymap/ncp2020_full_data.json",
		dataType:"jsonp",
		jsonpCallback:"jsoncallback",
		success:function(res){
			//获取接口的数据
			console.log(res)
			var allData = res.data;
			var historylist = allData.historylist;
			
			//获取每个省份的数据
			var list = allData.list;
			//分别存储当前确诊和累计确诊人数
			var nowList = [];
			var allList = [];
			
			//将数据插入表格
			var table = document.getElementById("table-1");
			for(var i = 0;i<list.length;i++){
				var row = table.insertRow(table.rows.length);
				var c1 = row.insertCell(0);//地区名
				c1.innerHTML = list[i]["name"];
				var c2 = row.insertCell(1);//新增
				c2.innerHTML = list[i]["adddaily"]["conadd"];
				var c3 = row.insertCell(2);//现有
				c3.innerHTML = list[i]["econNum"];
				var c4 = row.insertCell(3);//累计
				c4.innerHTML = list[i]["value"];
				var c5 = row.insertCell(4);//治愈
				c5.innerHTML = list[i]["cureNum"];
				var c6 = row.insertCell(5);//死亡
				c6.innerHTML = list[i]["deathNum"];
			}
			
			list.forEach(function(element){
				nowList.push({
					name:element.name,
					value:element.econNum
				}),
				allList.push({
					name:element.name,
					value:element.value
				})
			})

			 //console.log(allList)
			 //获取境外输入 总新增确诊和当前日期的数据
			var datas = [];//新增境外输入
			var addDatas = [];//总新增确诊
			var trendDate = [];//日期
			var jwsrNum = [];//累计境外输入
			var jwsrTop = allData.jwsrTop;//境外输入省份 top10 总数据
			var jwsrTopProvince = [];
			var jwsrTopNum = [];
			var allConNum = [];//累计确诊人数
			var susNum = [];//现有疑似人数
			var nowEconNum = [];//现有确诊人数
			var cureNum = [];//治愈人数
			var deathNum = [];//死亡人数
			var cureRate = [];//治愈比例
			var deathRate = [];//死亡比例
			
			for(var i in jwsrTop){
				 jwsrTopProvince.push(jwsrTop[i].name);
				 jwsrTopNum.push(jwsrTop[i].jwsrNum);
			}
			 // console.log(jwsrTopProvince)
			 // console.log(jwsrTopNum)
			 // console.log(jwsrTop)
			 //从json中获取数据
			for(var i in historylist){//i代表索引值
			 	datas.push(historylist[i]["cn_addjwsrNum"])
			 	addDatas.push(historylist[i]["cn_conadd"])
			 	trendDate.push(historylist[i]["ymd"])
				jwsrNum.push(historylist[i]["cn_jwsrNum"])
				allConNum.push(historylist[i]["cn_cureNum"])
				susNum.push(historylist[i]["cn_susNum"])
				nowEconNum.push(historylist[i]["cn_econNum"])
				cureNum.push(historylist[i]["cn_cureNum"])
				deathNum.push(historylist[i]["cn_deathNum"])
				cureRate.push(historylist[i]["cn_cureRate"])
				deathRate.push(historylist[i]["cn_deathRate"])
			 	if(i == 490){break}
			}
			 //将部分数据进行倒置
			datas = datas.reverse(); 
			addDatas = addDatas.reverse(); 
			trendDate = trendDate.reverse(); 
			jwsrNum = jwsrNum.reverse(); 
			allConNum = allConNum.reverse();
			susNum = susNum.reverse();
			nowEconNum = nowEconNum.reverse();
			cureNum = cureNum.reverse();
			deathNum = deathNum.reverse();
			cureRate = cureRate.reverse();
			deathRate = deathRate.reverse();
			
			console.log(cureRate)
			//初始化echarts实例 渲染地图数据
			var myChart3 = echarts.init(document.getElementById('mapEcharts'));
			
			// 指定图表的配置项和数据
			var option3 = {
				geo:{
					map:"china",//由china.js自动获取地图
					zoom:1.2,//地图缩放比例
					itemStyle:{
						areaColor:"#fff",
						borderColor:"#666",
						borderWidth:"0.3"
					},
					label:{
						show:true,
						fontSize:10
					},
					emphasis:{
						itemStyle:{
							areaColor:"#b4ffff"
						}
					}
				},
				tooltip: {
					trigger: 'item'
				},
				visualMap: {
					type: 'piecewise',
					pieces: [
					    { min: 10000, max: 1000000, label: '确诊大于等于10000人', color: '#372a28' },
					    { min: 5000, max: 9999, label: '确诊5000-9999人', color: '#4e160f' },
					    { min: 1000, max: 4999, label: '确诊1000-4999人', color: '#974236' },
					    { min: 100, max: 999, label: '确诊100-999人', color: '#ee7263' },
					    { min: 1, max: 99, label: '确诊1-99人', color: '#f5bba7' },
					],
					color: ['#E0022B', '#E09107', '#A3E00B'],
					itemWidth:10,
					itemHeight:10,
					itemGap:2,
					inverse:false
				},
				series:[{
					type:"map",
					geoIndex:0,
					data:nowList
				}]
			}
			myChart3.setOption(option3);
			
			$(".chinaTap").click(function(){
					$(".chinaTap").each(function(i,obj){
						$(obj).removeClass("isActive");
					});
					var className = $(this).attr("class");
					var arr = className.split(" ");
						
					$(this).attr("class","chinaTap isActive");
					option3.series[0].data = allList;
					myChart3.setOption(option3);
				})
			
			
			//设置更新时间
			$(".time span").html(allData.cachetime);
			//设置八大块 在data的historyList里面的第一个数组中获取
			(function(){
				var infoConfig = {
					"cn_econNum":{
						"title":"现有确诊",
						"color":"#ff5e49"
					},
					"cn_asymptomNum":{
						"title":"无症状",
						"color":"#fe653b"
					},
					"cn_susNum":{
						"title":"现有疑似",
						"color":"#fe8d00"
					},
					"cn_heconNum":{
						"title":"现有重症",
						"color":"#525498"
					},
					"cn_conNum":{
						"title":"累计确诊",
						"color":"#ff0910"
					},
					"cn_jwsrNum":{
						"title":"境外输入",
						"color":"#476DA0"
					},				
					"cn_cureNum":{
						"title":"累计治愈",
						"color":"#00b1b7"
					},
					"cn_deathNum":{
						"title":"累计死亡",
						"color":"#4c5054"
					}
				}
				
				
				//通过拼接字符串获取八大快
				var htmlStr = "";
				for(var i in infoConfig){
					htmlStr += `<li>

							<h5>${infoConfig[i].title}</h5>
							<p style="color:${infoConfig[i].color}">${historylist[0][i]}</p>
							<span>
								<em>昨日</em>
								<i style="color:${infoConfig[i].color}">${historylist[1][i]-historylist[0][i]}</i>
							</span>
						</li>`		
				}
				//console.log(historylist[0]["cn_addjwsrNum"])
				$(".info").html(htmlStr);
			})();
			
			 
			//初始化echarts实例 境外输入新增趋势
			var myChart1 = echarts.init(document.getElementById('tendency'));
			// 指定图表的配置项和数据
			var option1 = {
				title:{
					text:"单位:例",
					textStyle:{
						color:"#ccc",
						fontSize:12
					}	
				},
				//右侧图标设置
				legend:{
					itemWidth:12,
					itemHeight:12,
					right:20,
					top:20,
					orient:"horizontal",
					textStyle:{
						padding:[3,0,0,0]
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
				yAxis:{
					type:'value',
				},
				series:[{
					name:"新增境外输入",
					type:"line",
					data:datas,
					smooth:true,
					color:"#7D64BC"
				}]
			};
			myChart1.setOption(option1);
			
			$(".trendBottom .trendLeft").click(function(){
				$(this).addClass("trendActive");
				$(this).siblings().removeClass("trendActive");
				var index=$(this).index();
				if(index == 0){//境外输入新增趋势
					$("#modifyTitle").html("境外输入新增趋势");
					option1.series[0].data = datas;
					option1.series[0].color = "#7D64BC";
					option1.series[0].name = "新增境外输入";
					myChart1.setOption(option1);
				}
				if(index == 1){//境外输入累计趋势
					$("#modifyTitle").html("境外输入累计趋势");
					option1.series[0].data = jwsrNum;
					option1.series[0].color = "#19caad";
					option1.series[0].name = "累计境外输入";
					myChart1.setOption(option1);
				}
				if(index == 2){//境外输入累计确诊省Top10
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
							name:"",
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
				title:{
					text:"单位:例",
					textStyle:{
						color:"#ccc",
						fontSize:12
					}	
				},
				//右侧图标设置
				legend:{
					itemWidth:12,
					itemHeight:12,
					right:20,
					top:20,
					orient:"horizontal",
					textStyle:{
						padding:[3,0,0,0]
					}
				},
				//x轴属性
				xAxis: {
					type: 'category',
					data: trendDate,
					axisLabel:{
						interval:25,
						rotate:45,
						color:"#ccc",
						fontSize:10
					}
				},
				//提示框
				tooltip: {
				    trigger: 'axis'
				},
				//y轴属性
				yAxis:{
					type:'value',
				},
				series:[{
					name:"新增境外输入",
					type:"line",
					data:datas,
					smooth:true,
					color:"#51c4d3"
				},{
					name:"总新增确诊",
					type:"line",
					data:addDatas,
					smooth:true,
					color:"#efafad"
				}]
			};
			myChart2.setOption(option2);
			
			
			//全国 现有确诊/疑似/累计确诊 趋势
			var myChart4 = echarts.init(document.getElementById('susTendency'));
			// 指定图表的配置项和数据
			var option4 = {
				title:{
					text:"单位:例",
					textStyle:{
						color:"#ccc",
						fontSize:12
					}	
				},
				//右侧图标设置
				legend:{
					itemWidth:12,
					itemHeight:12,
					right:20,
					top:20,
					orient:"horizontal",
					textStyle:{
						padding:[3,0,0,0]
					}
				},
				//x轴属性
				xAxis: {
					type: 'category',
					data: trendDate,
					axisLabel:{
						interval:25,
						rotate:45,
						color:"#ccc",
						fontSize:10
					}
				},
				//提示框
				tooltip: {
				    trigger: 'axis'
				},
				//y轴属性
				yAxis:{
					type:'value',
				},
				series:[{
					name:"累计确诊人数",
					type:"line",
					data:allConNum,
					smooth:true,
					color:"#19caad"
				},{
					name:"现有疑似人数",
					type:"line",
					data:susNum,
					smooth:true,
					color:"#ef3473"
				},{
					name:"现有确诊人数",
					type:"line",
					data:nowEconNum,
					smooth:true,
					color:"#fcd337"
				}]
			};
			myChart4.setOption(option4);
			
			//全国 累计治愈/死亡 趋势
			var myChart5 = echarts.init(document.getElementById('ldTendency'));
			// 指定图表的配置项和数据
			var option5 = {
				title:{
					text:"单位:例",
					textStyle:{
						color:"#ccc",
						fontSize:12
					}	
				},
				//右侧图标设置
				legend:{
					itemWidth:12,
					itemHeight:12,
					right:20,
					top:20,
					orient:"horizontal",
					textStyle:{
						padding:[3,0,0,0]
					}
				},
				//x轴属性
				xAxis: {
					type: 'category',
					data: trendDate,
					axisLabel:{
						interval:25,
						rotate:45,
						color:"#ccc",
						fontSize:10
					}
				},
				//提示框
				tooltip: {
				    trigger: 'axis'
				},
				//y轴属性
				yAxis:{
					type:'value',
				},
				series:[{
					name:"治愈",
					type:"line",
					data:cureNum,
					smooth:true,
					color:"#57c3c2"
				},{
					name:"死亡",
					type:"line",
					data:deathNum,
					smooth:true,
					color:"#fecc11"
				}]
			};
			myChart5.setOption(option5);
			
			
			//初始化echarts实例 全国 治愈率/死亡率 趋势
			var myChart6 = echarts.init(document.getElementById('rateTendency'));
			// 指定图表的配置项和数据
			var option6 = {
				//右侧图标设置
				legend:{
					itemWidth:12,
					itemHeight:12,
					right:20,
					top:20,
					orient:"horizontal",
					textStyle:{
						padding:[3,0,0,0]
					}
				},
				//x轴属性
				xAxis: {
					type: 'category',
					data: trendDate,
					axisLabel:{
						interval:25,
						rotate:45,
						color:"#ccc",
						fontSize:10
					}
				},
				//提示框
				tooltip: {
				    trigger: 'axis',
				},
				//y轴属性
				yAxis: {  
                        type: 'value',  
                        axisLabel: {  //y轴百分比
                            show: true,  
                            interval: 'auto',  
                            formatter: '{value} %'  
                            },  
                        show: true  
                    }  ,
				series:[{
					name:"治愈率",
					type:"line",
					data:cureRate,
					smooth:true,
					color:"#10aec2"
				},{
					name:"死亡率",
					type:"line",
					data:deathRate,
					smooth:true,
					color:"#ed2f6a"
				}]
			};
			myChart6.setOption(option6);
		},
	})
}

