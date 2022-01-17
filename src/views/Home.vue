<template>
  <div class="container">
    <div class="banner">
      <div class="mt-5">
        <h1 class="fs-1 text-light text-sub-header">Track <span class="header-text">Crypto</span></h1>
        <h1 class="fs-1 text-light header-text-light "> Prices by Market Cap</h1>
        <p class="small-text my-4">coin 42 allows you to monitor diversed cryptocurrency market, exchange rate, coin platform and check market cap to know the coin to trade without limits - using (CoinGeco-api)</p>
        <p class="text-center my-4 text-light">Get Access to Hundreds of crypto and their current price</p>
      </div>
    </div>
    <div class="row">
        <div class="col-md-2 col-12 my-2">
          <select class="form-select " v-model="currency" @click.prevent="load">
            <option value="ngn">Naira</option>
            <option value="usd">Dollar</option>
            <option value="eur">Euro</option>
            <option value="gbp">Pounds</option>
          </select>
        </div>
        <div class="col-md-4 col-12 my-2">
          <input type="text" class="form-control" v-model="search" placeholder="search coin">
        </div>
        <p class="text-center text-light pt-5" v-if="search.indexOf(match) == '' ">No Data(s) Found</p>
    </div>
    
    <div class="card-wrapper my-5">
      <div class="text-warning error text-center my-5" v-if="error">
          <p class="fs-1">404</p>
          <small>Error Retriving Data - Check your internet</small>
      </div>
      <div class="row" v-if="coins.length">
        <div class="col-lg-3 col-md-4 col-12 col-sm-6" v-for="coin in match" :key="coin">
          <div class="card my-2 p-3">
            <div class=" d-flex justify-content-between">
              <div class="me-auto my-2"><img :src="coin.image" width="40" alt=""></div>
              <div class="my-2">
                <span :class="coin.price_change_percentage_24h < 0  ? 'badge rounded-pill bg-danger' : 'badge rounded-pill bg-success' ">{{coin.price_change_percentage_24h.toFixed(2)}} %</span>
              </div>
            </div>
           <div class="">
             <div  v-if="coins.length">
              <p class="name my-1">{{coin.name}}</p>
              <h4 :class="currency == 'eur' ? 'eur' : currency == 'ngn' ? 'ngn' :  currency == 'gbp' ? 'gbp' : 'usd' "><b>
                  {{coin.current_price.toLocaleString()}} </b></h4>
             </div>
             <small :class="currency == 'eur' ? 'eur' : currency == 'ngn' ? 'ngn' :  currency == 'gbp' ? 'gbp' : 'usd' " >{{coin.market_cap.toLocaleString()}} - Mkt Cap</small>
           </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center text-light py-5" v-else>
        <div class="spinner-border" role="status"></div>
        <div class="mx-3 py-1">Fetching Datas</div>
      </div>
     
    </div>
    <div class="" v-if="!error && coins.length">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item" @click="page+=50 , load()">
          <div class="d-flex justify-content-center text-light py-5" v-if="coins.length < page">
            <div class="spinner-border" role="status"></div>
            <div class="mx-3 py-1">Fetching Data</div>
          </div>
            <div class="text-light" v-if="coins.length == 250"><p>Maximum Datas Invoked</p></div>
            <a class="page-link" v-else>Load More...</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  import getCoins from "../composable/getCoins"
  import {ref,computed,watch} from "vue"
export default {
  name: 'Home',  
  setup() {
    let currency = ref('ngn')
    let search =  ref('')
    let page = ref(50)
    
    const {coins,error, load,name} = getCoins(currency,page)
    
    load()
    watch(load, (oldVal, newVal) =>{
      console.log('old',oldVal)
      console.log('new',newVal)
    })
    let match = computed(()=>{
      return coins.value.filter((coin)=> coin.name.toLowerCase().includes(search.value.toLowerCase()))
    })
    return{
      coins,
      error,
      currency,
      load,
      name,
      search,
      match,
      page
    }
  }
 
}
</script>
