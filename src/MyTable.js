import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

const products = [
     {'id': 145, 'name': 'caca', 'price': 1999}, 
     {'id': 245, 'name': 'pipi', 'price': 9019}, 
     {'id': 143, 'name': 'mocos', 'price': 4314}, 
     {'id': 146, 'name': 'vomito', 'price': 533}, 
    ];
const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true
}, {
  dataField: 'price',
  text: 'Product Price',
  sort: true
}];

export default () =>
  <BootstrapTable keyField='id' data={ products } columns={ columns } />