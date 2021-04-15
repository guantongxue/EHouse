export default{
	userInfos(state){
		let userInfos=state.userInfo
		
		if((userInfos==undefined)||(userInfos==null))return null;
		let details={
			username:userInfos.username,
			token:userInfos.token,
			refreshToken:userInfos.refreshToken
		};
		return details;
	},
	
}