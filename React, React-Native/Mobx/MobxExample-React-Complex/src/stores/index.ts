import CounterStore from 'stores/counter';
import MarketStore from 'stores/market';

class RootStore {
  public counter = new CounterStore(this);
  public market = new MarketStore(this);
}

export default RootStore;
