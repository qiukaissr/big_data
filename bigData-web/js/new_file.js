function getData(){
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
			// console.log(list)
			
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
			 //console.log(nowList)
			 //console.log(allList)
			 //获取境外输入 总新增确诊和当前日期的数据
			 var datas = [];//新增境外输入
			 var addDatas = [];//总新增确诊
			 var trendDate = [];//日期
			 var jwsrNum = [];//累计境外输入
			 var jwsrTop = allData.jwsrTop;//境外输入省份 top10 总数据
			 var jwsrTopProvince = [];
			 var jwsrTopNum = [];
			 for(var i in jwsrTop){
				 jwsrTopProvince.push(jwsrTop[i].name);
				 jwsrTopNum.push(jwsrTop[i].jwsrNum);
			 }
			 // console.log(jwsrTopProvince)
			 // console.log(jwsrTopNum)
			 // console.log(jwsrTop)
			 for(var i in historylist){//i代表索引值
			 	datas.push(historylist[i]["cn_addjwsrNum"])
			 	addDatas.push(historylist[i]["cn_conadd"])
			 	trendDate.push(historylist[i]["ymd"])
				jwsrNum.push(historylist[i]["cn_jwsrNum"])
			 	if(i == 490){break}
			 }
			datas = datas.reverse(); 
			addDatas = addDatas.reverse(); 
			trendDate = trendDate.reverse(); 
			jwsrNum = jwsrNum.reverse(); 
			//console.log(jwsrNum)
			 //console.log(datas)
			 //console.log(addDatas)
			 //console.log(trendDate)
			 
			//初始化echarts实例
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
			
			
			//初始化echarts实例
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
				}]
			};
			myChart1.setOption(option1);
			
			$(".trendBottom .trendLeft").click(function(){
				$(this).addClass("trendActive");
				$(this).siblings().removeClass("trendActive");
				var index=$(this).index();
				if(index == 0){
					option1.series[0].data = datas;
					myChart1.setOption(option1);
				}
				if(index == 1){
					option1.series[0].data = jwsrNum;
					option1.series[0].name = "累计境外输入";
					myChart1.setOption(option1);
				}
				if(index == 2){
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
							type: 'bar'
						}]
					};
					myChart1.setOption(optionX);
				}
			});
			
				
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
				},{
					name:"总新增确诊",
					type:"line",
					data:addDatas,
					smooth:true,
					color:"#EB4F50"
				}]
			};
			myChart2.setOption(option2);
		},
	})
}

