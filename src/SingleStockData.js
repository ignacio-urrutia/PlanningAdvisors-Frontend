import React from 'react';
import Table from 'react-bootstrap/Table'
import {Checkbox, TextInput} from './TableComponents'

class AllocationPanel extends React.Component {
  render() {
    return <p>Allocation Panel</p>
  }
}

class PerformancePanel extends React.Component {
  render() {
    return <p>Performance Panel</p>
  }
}


class StockTable extends React.Component {
  constructor(props) {
    super(props);
    this.prevColumns = [];

    this.state = {
      columns: ['date'],
      stock_name: ['BTC_USD'],
      data: {}
    }
  }

  getStockData() {
    const active_columns = this.props.active_columns;
    const stock_name = this.props.active_stock;
    fetch(`http://localhost:3001/get/${stock_name}/${active_columns}`)
    .then(response => {
      return response.json();
    })
    .then(fetched_data => {
      this.setState({
        data: fetched_data
      });
    })
  }

  render(){
   if (this.props.active_columns !== this.prevColumns || this.props.active_stock !== this.prevStock){
     this.getStockData();
     this.prevColumns = this.props.active_columns;
     this.prevStock = this.props.active_stock;
   }

    const isDataEmpty = Object.keys(this.state.data).length === 0;
    if (!isDataEmpty) { 
      // return <BootstrapTable keyField='name' data = {this.state.data}/>
      return <JSONTable data={this.state.data}/>; 
    }
    else{
      return <div> No hay datos disponibles </div>
    }
  }
}

function JSONTable(props) {
  // Usamos las keys como headers
  let headers = Object.keys(props.data[0]);
  let tableHeaders;

  if (props.headers) {
    tableHeaders = headers.map((header) =>
    <th key={header}> {props.headers[header]}</th> );
  }
  else {
    tableHeaders = headers.map((header) =>
    <th key={header}> {header}</th>);
  }
  const tableHead = <thead><tr>{tableHeaders}</tr></thead>;

  // Colocar llaves como input
  var keys = Object.keys(props.data[0]);
  const listRows = [];

  // Iteramos sobre cada objeto que será una fila
  let i = 1;
  for (var obj of props.data){
    try {
      let listData = [];
      let j = 1;
      // Iteramos sobre cada elemento que será una celda
      for (const k of keys){
        let value;
        if (props.columnManage && props.columnManage[k]){
          let f = props.columnManage[k];
          value = f(obj[k]);
        }
        else {
          value = obj[k];
        }
        listData.push(<td key={j}> {value} </td>);
        j ++;
      }
      // console.log(listData);
      var dataTR = <tr key={i}>{listData}</tr>
      // var element = <tbody key={obj.id} > {dataTR} </tbody> 
      listRows.push(dataTR);
      i++;
    } catch (e) {console.error(e)}
    }

  var tableBody = <tbody>{listRows}</tbody>
  // const listRows = data.data.map((item) => 
  //   <li key = {item.id}>{  item.id}</li>)
  return (<Table striped bordered hover responsive="sm">{tableHead}{tableBody}</Table>)  
}

class SingleStockData extends React.Component {
  constructor(props){
    super(props);

    // Lista de columnas
    this.columns = ['open', 'close', 'high', 'low', 'volume', 'adjclose', 'daily_return', 'percentage_return', 'rsi_3d', 'rsi_5d', 'rsi_14d', 'rsi_25d'];
    // Creamos diccionario columns con columnas vacías
    this.state = {
      active_columns: ['date'],
      active_stock: 'BTC_USD'
    };

    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.handleTickrChange = this.handleTickrChange.bind(this);
  }
  
  handleColumnChange(column_dict) {
    const active_columns_aux = ['date']
    for (var col of this.columns) {
      if (column_dict[col]) {
        active_columns_aux.push(col)
      }
    }
    this.setState({
      active_columns: active_columns_aux
    });
  }

  handleTickrChange(stock_name) {
    this.setState({
      active_stock: stock_name
    });
    console.log("Nuevo stock: " + stock_name);
  }

  render() {
    return (
      <div className="panels">
        <div className="panel-info">
          <div>

          <Checkbox
          onColumnChange = {this.handleColumnChange}
          columns = {this.columns}
          />

          <TextInput
          onChange = {this.handleTickrChange}
          />

          </div>
        </div>
        <div className="panel-allocation">
          <AllocationPanel />
        </div>
        <div className="panel-balance">
          <PerformancePanel/>
        </div>
        <div className="panel-positions">
          {<StockTable
          active_columns = {this.state.active_columns} 
          update_columns = {true}
          active_stock = {this.state.active_stock}
          />}
          
     </div>   
     </div>
    )
  }
}
export {SingleStockData};