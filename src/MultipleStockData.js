import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {numericSortFunc} from './auxFunctions';
import {Checkbox} from './TableComponents'

class MultipleStockTable extends React.Component {
    constructor(props) {
      super(props);
      this.prevColumns = [];
      this.prevStockList = [];
  
      this.state = {
        data: {}
      }
    }
  
  componentDidMount(){
    this.getStocksData();
  }
  
  componentDidUpdate(){
    if (this.props.stocks_list !== this.prevStockList){
      this.getStocksData();
      this.prevColumns = this.props.active_columns;
      this.prevStockList = this.props.stocks_list;
    }
  }
  
   async getStocksData() {
      let active_columns = this.props.active_columns;
      active_columns = Object.keys(this.props.columnInfo).slice(1)
      const stocks_list = this.props.stocks_list;
      var stocksData = [];
  
    if (active_columns.length === 0) {
      for (let stock_name of stocks_list){
        var new_row = {};
        new_row['name'] = stock_name;
  
        stocksData.push(new_row)
  
        this.setState({data: stocksData});
      }
      return;
    }
  
      for await (let stock_name of stocks_list){
        fetch(`http://localhost:3001/get/${stock_name}/${active_columns}`)
        .then(response => {
          return response.json();
        })
        .then(fetched_data => {
          var new_row = {
            'name': fetched_data['stock_name']
          }
          Object.assign(new_row, fetched_data['data'][0]);
  
          stocksData.push(new_row)
  
          this.setState({
            data: stocksData
          })
        })
      }
  
    }
  
    render(){
      let active_columns = ['name'].concat(this.props.active_columns);
      active_columns = active_columns = Object.keys(this.props.columnInfo)
  
      const columns = active_columns.map( (col) => {
        let columnData = {
          dataField: col,
          text: this.props.columnInfo[col]['text'],
          sort: true,
          type: this.props.columnInfo[col]['type']
        }
        if (this.props.columnInfo[col]['formatter']){
          columnData['formatter'] = this.props.columnInfo[col]['formatter']
        }
        if (this.props.columnInfo[col]['sortFunc']){
          columnData['sortFunc'] = this.props.columnInfo[col]['sortFunc'];
        }
        if (this.props.columnInfo[col]['style']){
          columnData['style'] = this.props.columnInfo[col]['style'];
        }
        if (this.props.columnInfo[col]['hidden']){
          columnData['hidden'] = this.props.columnInfo[col]['hidden'];
        }
        return(columnData);
      })
  
       const isDataEmpty = Object.keys(this.state.data).length === 0;
       if (!isDataEmpty) { 
         return (
           <BootstrapTable striped hover condensed keyField='name' data={this.state.data} columns={columns}/>
         );  
       }
       else{
         return <div>No hay datos disponibles</div>
       }
     }
  
  }
  
  class MultipleStockData extends React.Component{
    constructor(props){
      super(props);
      this.columns = ['date','open', 'close', 'high', 'low', 'volume', 'adjclose', 'daily_return', 'percentage_return', 'rsi_3d', 'rsi_5d', 'rsi_14d', 'rsi_25d'];

      this.columnInfo = {
        'name': {
          'text': 'Accion',
          'formatter': (name) => {return name.toUpperCase();},
          'type': 'string',
          'style': {
            'fontWeight': 'bold'}
        },
        'date': {
          'text': 'Fecha',
          'formatter': (dateString) => {
            let date = new Date(dateString);
            return date.toLocaleDateString();
          },
          'type': 'string',
          'hidden': true
        },
        'open': {
          'text': 'Abrir',
          'formatter': (n) => {return this.roundDecimals(n,2)},
          'type': 'number',
          'sortFunc': numericSortFunc,
          'hidden': true
        },
        'close': {
          'text': 'Cierre',
          'formatter': (n) => {return this.roundDecimals(n,2)},
          'type': 'number',
          'sortFunc': numericSortFunc,
          'hidden': true
        },
        'high': {
          'text': 'Max',
          'formatter': (n) => {return this.roundDecimals(n,2)},
          'type': 'number',
          'sortFunc': numericSortFunc,
          'hidden': true
        },
        'low': {
          'text': 'Min',
          'formatter': (n) => {return this.roundDecimals(n,2)},
          'type': 'number',
          'sortFunc': numericSortFunc,
          'hidden': true
        },
        'volume': {
          'text': 'Volumen',
          'formatter': (n) => {return this.roundDecimals(n,2)},
          'type': 'number',
          'sortFunc': numericSortFunc,
          'hidden': true
        },
        'adjclose': {
          'text': 'Cierre ajus.',
          'formatter': (n) => {return this.roundDecimals(n,2)},
          'type': 'number',
          'sortFunc': numericSortFunc,
          'hidden': true
        },
        'daily_return': {
          'text': 'Rentabilidad por dia',
          'formatter': (n) => {return this.roundDecimals(n,2)},
          'type': 'number',
          'sortFunc': numericSortFunc,
          'hidden': true
        },
        'percentage_return': {
          'text': 'Rentabilidad %',
          'formatter': (n) => {return this.roundDecimals(n,2)},
          'type': 'number',
          'sortFunc': numericSortFunc,
          'hidden': true
        },
        'rsi_3d': {
          'text': 'RSI 3 días',
          'formatter': (n) => {return this.roundDecimals(n,2)},
          'type': 'number',
          'sortFunc': numericSortFunc,
          'style': this.styleRanges(30,70),
          'hidden': true
        },
        'rsi_5d': {
          'text': 'RSI 5 días',
          'formatter': (n) => {return this.roundDecimals(n,2)},
          'type': 'number',
          'sortFunc': numericSortFunc,
          'style': this.styleRanges(30,70),
          'hidden': true
        },
        'rsi_14d': {
          'text': 'RSI 14 días',
          'formatter': (n) => {return this.roundDecimals(n,2)},
          'type': 'number',
          'sortFunc': numericSortFunc,
          'style': this.styleRanges(30,70),
          'hidden': true
        },
        'rsi_25d': {
          'text': 'RSI 25 días',
          'formatter': (n) => {return this.roundDecimals(n,2)},
          'type': 'number',
          'sortFunc': numericSortFunc,
          'style': this.styleRanges(30,70),
          'hidden': true
        }
      };
      
      // Creamos headers para checklist
      this.headers = {};
      for (let stock of Object.keys(this.columnInfo)){
          this.headers[stock] = this.columnInfo[stock]['text'];
      }

      this.state = {
        stocks_list: [],
        active_columns: [],
        columnInfo: this.columnInfo
      }
      this.handleColumnChange = this.handleColumnChange.bind(this);
    }
  
    styleRanges(a,b){
      return (
        function callback(cell, row, rowIndex, colIndex) {
          if (+cell > b){
            return ({color: 'red'});
          } else if (+cell < a){
            return ({color: 'green'});
          }
        }
  
      )}
  
    roundDecimals(n, decimals) {
      return(Math.round( n * (10**decimals)) / (10**decimals) )
    }
  
    getStocksList() {
      fetch(`http://localhost:3001/stocksList`)
      .then(response => {
        return response.json();
      })
      .then(fetched_data => {
        this.setState({
          stocks_list: fetched_data
        });
      })
    }
  
    componentDidMount() {
      this.getStocksList();
    }
   
    handleColumnChange(column_dict) {
      let auxColumnInfo = this.state.columnInfo;
  
      for (var col of this.columns) {
        auxColumnInfo[col]['hidden'] = !column_dict[col]
      }
      this.setState({
        columnInfo: auxColumnInfo
      });
    }
  
    render () {
      return (
        <div className='panels'>
  
        <div className='panel-info'>   
          <Checkbox
            onColumnChange = {this.handleColumnChange}
            columns = {this.columns}
            optionLabels = {this.headers}
            />
        </div>
  
          <div className="panel-positions">
              {<MultipleStockTable
              stocks_list = {this.state.stocks_list}
              columnInfo = {this.state.columnInfo}
              />}
          </div>
  
        </div>
      )
    }
  }

export {MultipleStockData};