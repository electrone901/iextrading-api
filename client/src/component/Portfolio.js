import React, { Component } from 'react';
import axios from 'axios';

class Portfolio extends Component{
    
    constructor(){
        super();
        this.state = {

            value: '',
            // selectedStockColumn:{
            //   symbol:'',
            //   lastSalePrice:'',
            //   volume:''
            // },

            total_Price: 0,
            stock_quatity_buy: 0,
            portfolioList: [
              {'name': 'all_stocks', 'symbols': ['SPY', 'DIA', 'QQQ', 'IWM','XLF', 'XLK', 'XLC', 'XLV', 'XLP', 'XLY', 'XLE', 'XLB', 'XLI', 'XLU', 'XLRE',
              'GS', 'MS', 'JPM', 'WFC', 'C', 'BAC', 'BCS', 'DB', 'CS', 'RBS','AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TWTR', 'NFLX', 'SNAP', 'SPOT', 'DBX', 'SQ', 'BABA', 'INTC', 'AMD', 'NVDA', 'ORCL',
              'BND', 'BIV', 'JNK', 'VOO', 'VTI', 'VGK', 'VPL', 'VWO', 'VDE', 'XOP', 'VFH', 'VHT', 'VIG', 'VYM', 'VAW', 'REM', 'XHB', 'GLD', 'SHV', 'FLOT', 'MJ',
              'EFC', 'EARN', 'NLY', 'AGNC', 'CIM', 'TWO', 'NRZ','F', 'GM', 'FCAU', 'TM', 'HMC', 'TSLA', 'XOM', 'WMT', 'JNJ', 'GE', 'T', 'KO', 'DIS', 'MCD', 'PG'
                ]
              },
              {'name': 'Market_ETFs', 'symbols': ['SPY', 'DIA', 'QQQ', 'IWM']},
              {'name': 'Sector_ETFs', 'symbols': ['XLF', 'XLK', 'XLC', 'XLV', 'XLP', 'XLY', 'XLE', 'XLB', 'XLI', 'XLU', 'XLRE']},
              {'name': 'Banks', 'symbols': ['GS', 'MS', 'JPM', 'WFC', 'C', 'BAC', 'BCS', 'DB', 'CS', 'RBS']},
              {'name': 'Tech', 'symbols': ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TWTR', 'NFLX', 'SNAP', 'SPOT', 'DBX', 'SQ', 'BABA', 'INTC', 'AMD', 'NVDA', 'ORCL']},
              {'name': 'Bond_ETFs', 'symbols': ['BND', 'BIV', 'JNK']},
              {'name': 'Other_ETFs', 'symbols': ['VOO', 'VTI', 'VGK', 'VPL', 'VWO', 'VDE', 'XOP', 'VFH', 'VHT', 'VIG', 'VYM', 'VAW', 'REM', 'XHB', 'GLD', 'SHV', 'FLOT', 'MJ']},
              {'name': 'Mortgage_REITs', 'symbols': ['EFC', 'EARN', 'NLY', 'AGNC', 'CIM', 'TWO', 'NRZ']},
              {'name': 'Autos', 'symbols': ['F', 'GM', 'FCAU', 'TM', 'HMC', 'TSLA']},
              {'name': 'BigCos', 'symbols': ['XOM', 'WMT', 'JNJ', 'GE', 'T', 'KO', 'DIS', 'MCD', 'PG']}
            ],

            this_data: [],

            data: [

                {
                  askPrice: 0,
                  askSize: 0,
                  bidPrice: 0,
                  bidSize: 0, 
                  lastSalePrice: 227.75,
                  lastSaleSize: 100,
                  lastSaleTime: 1538078399583,
                  lastUpdated: 1538080172883,
                  marketPercent: 0.00945,
                  sector: "diversifiedfinancials",
                  securityType: "commonstock",
                  symbol: "GOOGL",
                  volume: 23045
                },
                {
                  askPrice: 0,
                  askSize: 0,
                  bidPrice: 0,
                  bidSize: 0, 
                  lastSalePrice: 227.75,
                  lastSaleSize: 100,
                  lastSaleTime: 1538078399583,
                  lastUpdated: 1538080172883,
                  marketPercent: 0.00945,
                  sector: "diversifiedfinancials",
                  securityType: "commonstock",
                  symbol: "APPL",
                  volume: 23045
                },
                {
                  askPrice: 0,
                  askSize: 0,
                  bidPrice: 0,
                  bidSize: 0, 
                  lastSalePrice: 227.75,
                  lastSaleSize: 100,
                  lastSaleTime: 1538078399583,
                  lastUpdated: 1538080172883,
                  marketPercent: 0.00945,
                  sector: "diversifiedfinancials",
                  securityType: "commonstock",
                  symbol: "NFLX",
                  volume: 23045
                }
            ],
            choosen_type:'all_stocks',
            portfolio: [
              {
                  askPrice: 0,
                  askSize: 0,
                  bidPrice: 0,
                  bidSize: 0, 
                  lastSalePrice: 227.75,
                  lastSaleSize: 100,
                  lastSaleTime: 1538078399583,
                  lastUpdated: 1538080172883,
                  marketPercent: 0.00945,
                  sector: "diversifiedfinancials",
                  securityType: "commonstock",
                  symbol: "NFLX",
                  volume: 23045
                }
            ],
            stocks: [],
            symbol: '',
            price: '',
            name: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    
     

    componentDidMount (){
      let portfolioList = this.state.portfolioList;
      let choosen_type = this.state.choosen_type;
      let choosen_type_str = '';

      // GETS STOCK TYPE
      portfolioList.forEach((obj) => {
        choosen_type_str += obj.symbols;
      })
      console.log("ALL",choosen_type_str)

      // FETCH STOCK TYPE DATA
      axios.get(`https://api.iextrading.com/1.0/tops?symbols=`+choosen_type_str)
      .then(response => {
        console.log(response.data)
        this.setState({this_data: response.data})
      })
      .catch(error => {
        console.log(error);
      })
    }


    onSubmit(e){
        e.preventDefault();

        const portfolio = [
          {'name': 'all_stocks', 'symbols': ['SPY', 'DIA', 'QQQ', 'IWM','XLF', 'XLK', 'XLC', 'XLV', 'XLP', 'XLY', 'XLE', 'XLB', 'XLI', 'XLU', 'XLRE',
              'GS', 'MS', 'JPM', 'WFC', 'C', 'BAC', 'BCS', 'DB', 'CS', 'RBS','AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TWTR', 'NFLX', 'SNAP', 'SPOT', 'DBX', 'SQ', 'BABA', 'INTC', 'AMD', 'NVDA', 'ORCL',
              'BND', 'BIV', 'JNK', 'VOO', 'VTI', 'VGK', 'VPL', 'VWO', 'VDE', 'XOP', 'VFH', 'VHT', 'VIG', 'VYM', 'VAW', 'REM', 'XHB', 'GLD', 'SHV', 'FLOT', 'MJ',
              'EFC', 'EARN', 'NLY', 'AGNC', 'CIM', 'TWO', 'NRZ','F', 'GM', 'FCAU', 'TM', 'HMC', 'TSLA', 'XOM', 'WMT', 'JNJ', 'GE', 'T', 'KO', 'DIS', 'MCD', 'PG'
            ]
          },
          {'name': 'Market_ETFs', 'symbols': ['SPY', 'DIA', 'QQQ', 'IWM']},
          {'name': 'Sector_ETFs', 'symbols': ['XLF', 'XLK', 'XLC', 'XLV', 'XLP', 'XLY', 'XLE', 'XLB', 'XLI', 'XLU', 'XLRE']},
          {'name': 'Banks', 'symbols': ['GS', 'MS', 'JPM', 'WFC', 'C', 'BAC', 'BCS', 'DB', 'CS', 'RBS']},
          {'name': 'Tech', 'symbols': ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TWTR', 'NFLX', 'SNAP', 'SPOT', 'DBX', 'SQ', 'BABA', 'INTC', 'AMD', 'NVDA', 'ORCL']},
          {'name': 'Bond_ETFs', 'symbols': ['BND', 'BIV', 'JNK']},
          {'name': 'Other_ETFs', 'symbols': ['VOO', 'VTI', 'VGK', 'VPL', 'VWO', 'VDE', 'XOP', 'VFH', 'VHT', 'VIG', 'VYM', 'VAW', 'REM', 'XHB', 'GLD', 'SHV', 'FLOT', 'MJ']},
          {'name': 'Mortgage_REITs', 'symbols': ['EFC', 'EARN', 'NLY', 'AGNC', 'CIM', 'TWO', 'NRZ']},
          {'name': 'Autos', 'symbols': ['F', 'GM', 'FCAU', 'TM', 'HMC', 'TSLA']},
          {'name': 'BigCos', 'symbols': ['XOM', 'WMT', 'JNJ', 'GE', 'T', 'KO', 'DIS', 'MCD', 'PG']}
        ];

        // let choosen_type = this.state.choosen_type;
        // let choosen_type_str = '';
        let choosen_type_str = "SPY,DIA,QQQ,IWM"

     

        axios.get(`https://api.iextrading.com/1.0/tops?symbols=`+choosen_type_str)
          .then(response => {
            this.setState({this_data: response.data})
          })
          .catch(error => {
            console.log(error);
          })

    }


    
    
     
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

change = (e) =>{
      console.log(e.target.value)
         this.setState({value: e.target.value});
         console.log('did value change to java?', this.state.value)
     }

     makeAppiCall() {
      console.log('click')
      let portfolioList = this.state.portfolioList;
      let choosen_type = this.state.choosen_type;
      let choosen_type_str = '';

      // GETS STOCK TYPE
      portfolioList.forEach((obj) => {
        if(obj.name === choosen_type) {
          choosen_type_str += obj.symbols;
        }
      })
      console.log("what string", choosen_type_str)

      axios.get(`https://api.iextrading.com/1.0/tops?symbols=`+choosen_type_str)
      .then(response => {
        console.log('response', response)

        this.setState({this_data: response.data})
      })
      .catch(error => {
        console.log(error);
      })

     }

    handleChange = (e) =>{
      this.setState({choosen_type: e.target.value})
      console.log('e', e.target.value)
      
      console.log('it was choosen_type change to ?', this.state.choosen_type)

      // let portfolioList = this.state.portfolioList;
      // let choosen_type = this.state.choosen_type;
      // let choosen_type_str = '';

      // // GETS STOCK TYPE
      // portfolioList.forEach((obj) => {
      //   if(obj.name === choosen_type) {
      //     choosen_type_str += obj.symbols;
      //   }
      // })
      // console.log("what string", choosen_type_str)

      // axios.get(`https://api.iextrading.com/1.0/tops?symbols=`+choosen_type_str)
      // .then(response => {
      //   console.log('response', response)

      //   this.setState({this_data: response.data})
      // })
      // .catch(error => {
      //   console.log(error);
      // })

    }
    
    handleColumn(symbol,lastSalePrice, volume) {
       console.log(symbol,lastSalePrice, volume);

        // let jasper = Object.assign({}, this.state.jasper);    //creating copy of object
        // jasper.name = 'someothername';                        //updating value
        // this.setState({jasper});
        
        // let selectedStockColumn = Object.assign({}, this.state.selectedStockColumn);
        // selectedStockColumn.symbol = symbol

       // this.setState({...this.state.selectedStockColumn, symbol:symbol, lastSalePrice:lastSalePrice, volume:volume})

       // this.setState({selectedStockColumn:value})
    }

    stockQuantity(e) {
      console.log("",e.target.value)
    }
    
     
    render(){
        console.log('portfolio state main this_data',this.state)
        return(
            <div className="container">

              <div className="row">
                <h1>Companies's Stocks</h1>
              </div>


              <div>
               <select id="lang" onChange={this.change} value={this.state.value}>
                  <option value="select">Select</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
               </select>
               <p></p>
               <p>{this.state.value}</p>
           </div>





              <div className="row">

                <div className="col">

                  <div className="row">
                    <div className="col-10" id="dropMenu">
                      <div className="drop">
                        <select choosen_type={this.state.choosen_type} onChange={this.handleChange.bind(this)} className="col-12 mb2 field bg-gray" id="lists">
                          <option value="all_stocks">All Stocks</option>
                          <option value="Market_ETFs">Market ETFs</option>
                          <option value="Sector_ETFs">Sector ETFs</option>
                          <option value="Banks">Banks</option>
                          <option value="Tech">Tech</option>
                          <option value="Bond_ETFs">Bond ETFs</option>
                          <option value="Other_ETFs">Other ETFs</option>
                          <option value="Mortgage_REITs">Mortgage REITs</option>
                          <option value="Autos">Autos</option>
                          <option value="BigCos">BigCos</option>
                        </select>
                      </div>
                    </div> 

                    <div className="col-2" id="goButton">
                      <button onClick={this.makeAppiCall.bind(this)} type="button" className="btn btn-sm btn-block btn-primary">Go</button>
                    </div>
                </div>


                  <div className="col-12">
                    <table className="table table-striped table-dark">
                      <tbody className="center bg-dark-gray">
                          {
                            this.state.this_data.map((obj, index) => {
                              return (
                                <tr key={index} className="tr volumeRow" value={obj.symbol} onClick={()=> this.handleColumn(obj.symbol, obj.lastSalePrice, obj.volume)}>
                                  <td  className="py2 align-middle left-align th td thin" id="doubleVolume">{obj.symbol}</td>
                                  <td>$ {obj.lastSalePrice}</td>
                                  <td>available shares {obj.volume}</td>
                                  <td></td>
                                  <td></td>
                                </tr>
                              )
                            })
                          }
                      </tbody>
                    </table>
                  </div>

                </div> 


                <div className="col">
                  <div className="jumbotron">

                    <h1 className="cardTitle">Your cart</h1>
                    <div className="card mb-4 box-shadow">
                      <div className="card-header">
                        <h4 className="my-0 font-weight-normal">Available Credit $ 5000.00</h4>
                      </div>
                      <div className="card-body">
                        <h1 className="card-title pricing-card-title">APPL</h1>
                        <h2><small className="makeit">$15/ share</small></h2>

                        
                        Quantity
                        <div className="drop">
                          <select stock_quatity_buy={this.state.stock_quatity_buy} onChange={this.stockQuantity.bind(this)} className="col-6 mb2 field bg-gray">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                            <option value="70">70</option>
                            <option value="80">80</option>
                            <option value="90">90</option>
                            <option value="100">100</option>
                          </select>
                        </div>
                        <h2><small className="makeit">Total: {this.state.total_Price}</small></h2>

                        <ul className="list-unstyled mt-3 mb-4">
                          <li>Available shares </li>
                          <li>435454</li>
                        </ul>
                        <button type="button" className="btn btn-lg btn-block btn-primary">Buy now</button>
                      </div>
                    </div>





                    <h1 className="display-4">Selection: {this.state.selectedStockColumn}</h1>
                    <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-4"/>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                  </div>
                </div>


              </div> 



                <table className="mb4">
                  <tbody className="center bg-dark-gray">
                      {
                        this.state.portfolioList.map((obj,index) => {
                          return (
                            <tr key={index} className="tr volumeRow" value={obj.symbol} onClick={()=> this.handleColumn(obj.symbol)}>
                              <td  className="py2 align-middle left-align th td thin" id="doubleVolume">{obj.symbol}</td>
                              <td>$ {obj.lastSalePrice}</td>
                              <td>available shares {obj.volume}</td>
                              <td></td>
                              <td></td>
                            </tr>
                          )
                        })
                      }
                  </tbody>
                </table>




                <h1>Companies</h1>
                <table className="mb4">
                  <tbody className="center bg-dark-gray">
                      {
                        this.state.data.map((obj) => {
                          return (
                            <tr key={obj.symbol} className="tr volumeRow" value={obj.symbol} onClick={()=> this.handleColumn(obj.symbol)}>
                              <td  className="py2 align-middle left-align th td thin" id="doubleVolume">{obj.symbol}</td>
                              <td>$ {obj.lastSalePrice}</td>
                              <td>available shares {obj.volume}</td>
                              <td></td>
                              <td></td>
                            </tr>
                          )
                        })
                      }
                  </tbody>
                </table>




                <form onSubmit={this.onSubmit}>
                    <input
                      type="text"
                      placeholder="Stock Name"
                      name="name"
                      onChange={this.onChange}
                    />
                    <input type="submit" />
                </form>
                <p>{this.state.symbol.symbol}</p>
                <p>{this.state.symbol.companyName}</p>
                <p>${this.state.price}</p>



                {
                  this.state.data.map((obj) => {
                    return (
                      <h3 key={obj.symbol}>{obj.symbol}</h3>
                    )
                  })
                }




            </div>
        );
    }
}

export default Portfolio;