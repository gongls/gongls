var config={
	db:{
		name:'',
		host:'',
		port:'',
		root:'',
		pass:'',
		db:''
	},
	wx:{
		key:'',
		s:''
	},
	//包含这些关键字的，不存进数据库的访问记录里。
	is_insert_views:true,//是否记录访问路径
	unviews:['wx','api','public'],
	//敏感关键词过滤
	bedword:['blowjob','fuck','makelove','pussy'],
	//黑名单 ip 地址
	blackip:['']
}
module.exports = config;