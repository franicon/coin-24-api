import { ref } from "vue"


const getCoins = (curren,page) => {
    
    const coins = ref([])
    const error = ref(null)
  
    
    const load = async () => {
        try {
            let data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curren.value}&order=market_cap_desc&per_page=${page.value}&page=1&sparkline=false`)
            if (!data.ok) {
                throw Error('No data Available')
            }
            coins.value = await data.json()
            console.log(coins)
        }

        catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }
    return{coins, error, load,curren}

}


export default getCoins;