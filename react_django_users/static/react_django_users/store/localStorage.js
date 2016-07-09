import localforage from 'localforage';
import throttle from 'lodash/throttle';


const forageConfig = {
  name: 'something',
  storeName: 'something-data',
};

const appStore = localforage.createInstance(forageConfig);

export const loadState = () => (
  appStore.getItem('state')
    .then(state => {
      if (state) {
        return state;
      }
      return undefined;
    })
    .catch(() => {
      // TODO: handle err
      return undefined;  // combine reducers needs a value
    })
);


export const saveState = (state) => {
  appStore.setItem('state', state)
    .catch(() => {
      // TODO: handle err
    });
};


const SAVE_THROTTLE = 1000;
/**
 * Save an array of redux stores as keys in local storage
 * @param {Object} store - Redux store
 * @returns {function} - save state function
 */
export function saveReduxStore(store) {
  /**
   * @param {string[]} states - Array of store keys as strings
   * @constructor
   */
  return (states) => {
    store.subscribe(throttle(() => {
      saveState({
        // list stores to save
        ...states.reduce((storeObj, state) => {
          storeObj[state] = store.getState()[state];
          return storeObj;
        }, {}),
      });
    }, SAVE_THROTTLE));
  };
}
