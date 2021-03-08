
export default{
	userInfo(state,userInfo){
		state.userInfo=userInfo;
		sessionStorage.setItem('userInfo',JSON.stringify(state.userInfo))
	},

	logout(state){
		sessionStorage.setItem('userInfo',null);
	},
	// addCart(state,goods){
	// 	let hasExist=state.cart.some((item)=>{
	// 		if(item.id==goods.id){item.num++;return true;}
	// 	});
	// 	if(!hasExist){
	// 		state.cart.push({
	// 			id:goods.id,
	// 			name:goods.name,
	// 			price:goods.price,
	// 			num:1,
	// 			pic:goods.pic,
	// 			selected:true
	// 		});
	// 	}
	// 	// localStorage.setItem('cart',JSON.stringify(state.cart))
	// 	uni.setStorageSync('cart',JSON.stringify(state.cart))
	// },
	// 	inc(state, goods) {
	// 		let hasExist = state.cart.some((item) => {
	// 			if (item.id == goods.id) {
	// 				item.num++;
	// 				return true;
	// 			}
	// 		});
	// 		// localStorage.setItem('cart',JSON.stringify(state.cart))
	// 		uni.setStorageSync('cart', JSON.stringify(state.cart));
	// 	},
	// 	dec(state, goods) {
	// 		let saveFlag = state.cart.some((item) => {
	// 			if (item.id == goods.id) {
	// 				if(item.num<=0) return false;
	// 				item.num--;
	// 				if(item.num==0)
	// 					item.selected=false;
	// 				return true;
	// 			}
	// 		});
	// 		if(saveFlag)
	// 			// localStorage.setItem('cart',JSON.stringify(state.cart))
	// 			uni.setStorageSync('cart',JSON.stringify(state.cart))
	// 	},
		
	// 	checkAll(state,checked){
	// 		state.cart.forEach((item)=>{
	// 			item.selected=checked
	// 		})
	// 		// localStorage.setItem('cart',JSON.stringify(state.cart))
	// 		uni.setStorageSync('cart',JSON.stringify(state.cart))
	// 	},
		
	// 	checkOne(state,goods){
	// 		let saveFlag = state.cart.some((item) => {
	// 			if (item.id == goods.id) {
	// 				item.selected=!goods.selected;
	// 				return true;
	// 			}
	// 		});
	// 		// localStorage.setItem('cart',JSON.stringify(state.cart))
	// 		uni.setStorageSync('cart',JSON.stringify(state.cart))
	// 	},
	// 	emptyCart(state){
	// 		state.cart=[];
	// 		// localStorage.setItem('cart',JSON.stringify(state.cart))
	// 		uni.setStorageSync('cart',JSON.stringify(state.cart));
	// 	},

	// 	logout(state){
	// 		state.userInfo=null;
	// 		uni.setStorageSync('userInfo',JSON.stringify(state.userInfo));
	// 	},
	// 	addOrders(state,openIds){
	// 		let idmark=0;
	// 		let total=0;
	// 		let cart2=state.cart;
	// 		if(state.orders==null){
	// 			idmark=0
	// 		}else{
	// 			idmark=state.orders.length;
	// 		}
	// 		let namemark='';
	// 		for(let i=0;i<state.cart.length;i++){
	// 			console.log(state.cart[i].name+state.cart[i].selected)
	// 			if(state.cart[i].selected)
	// 			{
	// 				//别选中时添加订单信息删除保存中的商品
	// 				namemark+=' '+state.cart[i].name+'*'+state.cart[i].num;
	// 				total+=state.cart[i].price*state.cart[i].num
	// 				cart2.splice(i,1)//这个值改变state的值也会随着改变
	// 				console.log("小标"+state.cart)
	// 				i--
	// 			}
	// 		}
	// 			state.orders.push({
	// 				id:idmark,
	// 				name:namemark,
	// 				price:total,
	// 				openId:openIds
	// 			});
	// 			console.log(cart2)
	// 			// uni.setStorageSync('cart',JSON.stringify(cart2)) 
	// 			uni.setStorageSync('orders',JSON.stringify(state.orders))
	// 	},
	// 	emptyOrders(state,openId){
	// 		if(state.orders.length==0){
	// 			return;
	// 		}
	// 		for(let i=0;i<state.orders.length;i++){
	// 			if(state.orders[i].openId=openId)
	// 			{
	// 				//别选中时添加订单信息删除保存中的商品
	// 				state.orders[i].splice(i,1)//这个值改变state的值也会随着改变
	// 				i--
	// 			}
	// 		}
	// 		return;
	// 	},
	// 	delOrders(state,orders){
	// 		if(state.orders.length==0){
	// 			return;
	// 		}
	// 		for(let i=0;i<state.orders.length;i++){
	// 			if(state.orders[i].openId==state.userInfo.openId && orders.id==state.orders[i].id)
	// 			{
	// 				state.orders.splice(i,1)
	// 				// state.orders[i].splice(i,1)//这个值改变state的值也会随着改变
	// 				return;
	// 			}
	// 		}
	// 		return;
	// 	}
}