export default{
	userInfos(state){
		let userInfos=state.userInfo
		if((userInfos==undefined)||(userInfos==null))return 0;
		let details={
			userid:userInfos.userid,
			birthday:userInfos.birthday,
			deptname:userInfos.deptname,
			entrytime:userInfos.entrytime,
			graduationtime:userInfos.graduationtime,
			offadd:userInfos.offadd,
			persontype:userInfos.persontype,
			position:userInfos.position
		};
		return details;
	},
	// cartTotal:state=>{
	// 		let cart=state.cart;
	// 		if((cart==undefined)||(cart==null)) return 0;
	// 		let total=0;
	// 		cart.forEach((item)=>{
	// 			if(item.selected)
	// 				total+=item.price*item.num
	// 		})
	// 		return total;
	// 	},
	// currentOrder:state=>{
	// 	let current=[];
	// 	if(state.userInfo==null)
	// 	{
	// 		return current;
	// 	}
	// 	state.orders.forEach((item,index)=>{
	// 		if(item.openId==state.userInfo.openId){
	// 			current.push(item)
	// 		}
	// 	})
	// 	return current;
	// }
}