export default{
	userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):[]
}