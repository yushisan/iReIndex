import axios from 'axios'


//服务器代理
const HOST = 'https://bird.ioliu.cn/v1/?url=';



export function myFetch(url) {
	return new Promise((resolve,reject)=>{
		axios.get(HOST + url).then(response=>{
			resolve(response.data);
		})
	});
}

export function fetchBigData() {
	return myFetch('http://index.iresearch.com.cn/Maintenance/BigData');
}


export function fetchTabClasses(classId) {
	return myFetch(`http://index.iresearch.com.cn/Content/Json/Classes${classId}.json`);
}

export function fetchTopDatalist({type,name='',classId=0,classLevel=0,timeId=54,orderBy=0,dataNum=20}={}) {
	return myFetch(`http://index.iresearch.com.cn/${type}/GetTopDataList/?classId=${classId}&classLevel=${classLevel}&timeId=${timeId}&orderBy=${orderBy}&dataNum=${dataNum}&name=${name}`);
}

export function fetchDatalist({type,name='',classId=0,classLevel=0,timeId=54,orderBy=0,pageIndex=1,pageSize=20}={}) {
	return myFetch(`http://index.iresearch.com.cn/${type}/GetDataList/?classId=${classId}&classLevel=${classLevel}&timeId=${timeId}&orderBy=${orderBy}&pageIndex=${pageIndex}&pageSize=${pageSize}&name=${name}`);
}

export function fetchMonthSpans(type='app') {
	return myFetch(`http://index.iresearch.com.cn/Content/Json/${type}MonthSpans.json`);
}

export function fetchVideoDatalist({classId=1,deviceTypeId=1,timeId=54,pageSize=10}={}) {
	return myFetch(`http://index.iresearch.com.cn/Video/GetDataList?classId=${classId}&deviceTypeId=${deviceTypeId}&timeId=${timeId}&pageSize=${pageSize}`);
}

export function fetchDataWeek() {
	return myFetch(`http://index.iresearch.com.cn/device/GetDataWeek`);
}

export function fetchBrandData({topNum=20,week=201707}={}) {
	return myFetch(`http://index.iresearch.com.cn/Device/GetTopBrandData?topNum=${topNum}&week=${week}
	`);
}

export function fetchDeviceData({topNum=20,week=201707,osType=1}={}) {
	return myFetch(`http://index.iresearch.com.cn/Device/GetTopDeviceData?topNum=${topNum}&week=${week}&osType=${osType}
	`);
}

export function fetchOneData({aid,tid}={}) {
	return myFetch(`http://index.iresearch.com.cn/App/onedata/?aid=${aid}&tid=${tid}`);
}

export function fetchAttrlist({aid,tid,typeid}={}) {
	return myFetch(`http://index.iresearch.com.cn/app/attrlist/?aid=${aid}&tid=${tid}&typeid=${typeid}`);
}

export function fetchLrr({id}={}) {
	return myFetch(`http://index.iresearch.com.cn/app/Lrr/?id=${id}&timeType=1`);
}



