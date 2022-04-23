function numericSortFunc(a, b, order) {
    if (order === 'desc') {
      return +b - +a;
    } else {
      return +a - +b;
    }
  }

export {numericSortFunc};