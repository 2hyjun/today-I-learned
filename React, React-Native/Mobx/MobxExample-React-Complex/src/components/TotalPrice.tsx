import * as React from 'react';
import { inject, observer } from 'mobx-react';


const TotalPrice: React.FunctionComponent<any> = ({ total }) => (
  <div>
    <hr/>
    <p><b>총합: </b>{total}원</p>
  </div>
)
export default inject(({ market }) => ({ total: market.total }))(observer(TotalPrice));