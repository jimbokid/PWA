/* eslint-disable no-console */
import 'babel-polyfill';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Fail tests on any warning
console.error = message => {
  throw new Error(message);
};
window.alert = (msg) => { console.log(msg); };
window.matchMedia = () => ({});
window.scrollTo = () => { };
