import store from './index';
import { increase, decrease } from './action/counter'

window.increase = () => {
    store.dispatch(increase());
};
window.decrease = () => {
    store.dispatch(decrease());
};