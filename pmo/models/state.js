import Map from 'can/map/';
import List from 'can/list/';
import superMap from 'can-connect/can/super-map/';

const State = Map.extend({});

State.List = List.extend({
  Map: State
});

const connection = superMap({
  url: '/api/states',
  idProp: 'short',
  Map: State,
  List: State.List,
  name: 'states'
});

export default connection.Map;