export default{
	userInfo({commit},userInfo){
		commit('userInfo',userInfo)
	},
	logout({commit}){
		commit('logout')
	},
	// addCart({commit},goods){
	// 	commit('addCart',goods)
	// },
	// inc({commit},goods){
	// 	commit('inc',goods)
	// },
	// dec({commit},goods){
	// 	commit('dec',goods)
	// },
	// checkAll({commit},checked){
	// 	commit('checkAll',checked)
	// },
	// checkOne({commit},checked){
	// 	commit('checkOne',checked)
	// },
	// emptyCart({commit}){
	// 	commit('emptyCart')
	// },

	// logout({commit}){
	// 	commit('logout')
	// },
	// addOrders({commit},openId){
	// 	commit('addOrders',openId)
	// },
	// delOrders({commit},orders){
	// 	commit('delOrders',orders)
	// },
	// emptyOrders({commit},openId){
	// 	commit('emptyOrders')
	// },
}
