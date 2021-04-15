
export default{
	userInfo(state,userInfo){
		state.userInfo=userInfo;
		localStorage.setItem('userInfo',JSON.stringify(state.userInfo))
	},

	logout(state){
		state.userInfo = null;
		localStorage.setItem('userInfo',null);
	},
}