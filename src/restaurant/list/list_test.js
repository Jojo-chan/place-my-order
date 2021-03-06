import QUnit from 'steal-qunit';
import cityStore from 'place-my-order/models/fixtures/city';
import stateStore from 'place-my-order/models/fixtures/state';
import restaurantStore from 'place-my-order/models/fixtures/restaurant';
import { ViewModel } from './list';

QUnit.module('place-my-order/restaurant/list', {
  beforeEach() {
    localStorage.clear();
  }
});

QUnit.asyncTest('loads all states', function() {
  var vm = new ViewModel();
  var expectedStates = stateStore.findAll({});

  vm.states.then(states => {
    QUnit.deepEqual(states.get(), expectedStates.data, 'Got all states');
    QUnit.start();
  });
});

QUnit.asyncTest('setting a state loads its cities', function() {
  var vm = new ViewModel();
  var expectedCities = cityStore.findAll({data: {state: "CA"}}).data;

  QUnit.equal(vm.cities, null, '');
  vm.state = 'CA';
  vm.cities.then(cities => {
    QUnit.deepEqual(cities.get(), expectedCities);
    QUnit.start();
  });
});

QUnit.asyncTest('changing a state resets city', function() {
  var vm = new ViewModel();
  var expectedCities = cityStore.findAll({data: {state: "CA"}}).data;

  QUnit.equal(vm.cities, null, '');
  vm.state = 'CA';
  vm.cities.then(cities => {
    QUnit.deepEqual(cities.get(), expectedCities);
    vm.state = 'NT';
    QUnit.equal(vm.city, null);
    QUnit.start();
  });
});

QUnit.asyncTest('setting state and city loads a list of its restaurants', function() {
  var vm = new ViewModel();
  var expectedRestaurants = restaurantStore.findAll({
    data: {"address.city": "Alberny"}
  }).data;

  vm.state = 'NT';
  vm.city = 'Alberny';

  vm.restaurants.then(restaurants => {
    QUnit.deepEqual(restaurants.get(), expectedRestaurants);
    QUnit.start();
  });
});
