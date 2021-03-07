export default{
	// cart:uni.getStorageSync("cart")?JSON.parse(uni.getStorageSync("cart")):[],
	// userInfo:uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")):null,
	// orders:uni.getStorageSync("orders")?JSON.parse(uni.getStorageSync("orders")):[]
	userInfo:sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):[]
}