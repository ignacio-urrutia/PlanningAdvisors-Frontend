// run withb 'npm start'

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import {SingleStockData} from './SingleStockData'
import {MultipleStockData} from './MultipleStockData'

let multiple_stock_data = true;
let stock_data;
multiple_stock_data ? stock_data = <MultipleStockData/> : stock_data = <SingleStockData/> ;

ReactDOM.render(
  <React.StrictMode>
    {stock_data}
  </React.StrictMode>,
  document.getElementById('root')
);

/* 
To-do:
- Manejar funciones de subida de datos
- Subir a la red
- Automatizar manejo de BDD
- Ordenar códigos (Modularizar, Ordenar en caarpetas, eliminar código no usado, optimizar)
*/