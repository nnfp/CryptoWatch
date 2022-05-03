const portfolio_stats = require("../portfolio_stats/portfolio_stats");


const data = [
    {
        "crypto": "test1",
        "amount": "9000"
    },
    {
        "crypto": "test2",
        "amount": "9000"
    },
    {
        "crypto": "test3",
        "amount": "9000"
    },


]

const sample_portfolio = [

{
"amount": 1,
"crypto": "ETH",
"id": 221,
"user_id": "test_user123"

}, 
{
    "amount": 1,
    "crypto": "AVAX",
    "id": 221,
    "user_id": "test_user123"
    
}, 
{
        "amount": 1,
        "crypto": "BTC",
        "id": 221,
        "user_id": "test_user123"
        
}

]

// const sample_portfolio = [

    
    
//     ]


const sample_price_fetch_data = [

    {"data":{"base":"ETH","currency":"USD","amount":"2883.12"}},
    {"data":{"base":"AVAX","currency":"USD","amount":"61.39"}},
    {"data":{"base":"BTC","currency":"USD","amount":"37000"}}

]


const test_set = new Set(); 
const test_map = new Map();


test('loads tickers into set ', () => {

    expect(
        portfolio_stats.loadNamesSet(data, test_set, test_map).size
        )
        .toBeGreaterThan(0);
  });



test('populating map of crypto  ', () => {

    expect(
        portfolio_stats.loadPortfolioMap(data, test_set, test_map)
        )
        .not.toBeUndefined();
  });
  



test(' fetching portfolio  ', () => {

    expect(
        portfolio_stats.fetchPortfolio(sample_portfolio)
        )
        .not.toBeUndefined();
  });


  test(' total value > 0  ', async () => {

    const data = await portfolio_stats.portfolio_total_value(sample_price_fetch_data, sample_portfolio)
    
    if(sample_portfolio.length > 0){
    expect(
      data
        )
        .toBeGreaterThanOrEqual(0);
    }
    else{
        expect(
            data
              )
              .toBe(0);
    }
  });

  
  test(' total value not undefined  ', async () => {

    const data = await portfolio_stats.portfolio_total_value(sample_price_fetch_data, sample_portfolio)
    expect(
       data
        )
        .not.toBeUndefined();
  });
  
  
