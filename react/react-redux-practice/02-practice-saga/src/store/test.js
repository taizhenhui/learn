import store from './index';
import { increase, decrease, asyncIncrease, asyncDecrease, autoIncrease, stopAutoIncrease } from './actions/counter'
import { fatchStudents } from './actions/student/searchResult'
window.autoIncrease = () => {
    store.dispatch(autoIncrease());
};
window.stopAutoIncrease = () => {
    store.dispatch(stopAutoIncrease());
};
window.increase = () => {
    store.dispatch(increase());
};
window.decrease = () => {
    store.dispatch(decrease());
};
window.asyncIncrease = () => {
    store.dispatch(asyncIncrease());
};
window.asyncDecrease = () => {
    store.dispatch(asyncDecrease());
};
window.fatchStudents = () => {
    store.dispatch(fatchStudents());
};