"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItemDetail = exports.getListProducts = void 0;
var ulr_base = "https://api.mercadolibre.com/";
var ENPOINTS = {
  SEARCH: "sites/MLA/search?q=",
  DETAILITEM: "items/",
  DETAILITEMDESCRIPTION: "/description"
};

var getListProducts = function getListProducts(query) {
  var response, json, categories, items, data;
  return regeneratorRuntime.async(function getListProducts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(ulr_base).concat(ENPOINTS.SEARCH).concat(query)));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          json = _context.sent;
          categories = json.filters.filter(function (filter) {
            return filter.id === "category";
          }).reduce(function (categoryname, category) {
            return category.values;
          }, {}).reduce(function (categoryname, category) {
            return category.path_from_root;
          }, {}).reduce(function (previusCategory, nextCategoty) {
            previusCategory.push(nextCategoty.name);
            return previusCategory;
          }, []);
          items = json.results.slice(0, 4).map(function (product) {
            var newData = {
              "id": product.id,
              "title": product.title,
              "price": {
                "currency": "$",
                "amount": product.price,
                "decimals": 2
              },
              "picture": product.thumbnail,
              "condition": product.condition,
              "free_shipping": product.shipping.free_shipping
            };
            return newData;
          }).reduce(function (previusCategory, nextCategoty) {
            previusCategory.push(nextCategoty);
            return previusCategory;
          }, []);
          data = {
            "author": {
              "name": "Cristian",
              "lastname": "Preciado"
            },
            "categories": categories,
            "items": items
          };
          return _context.abrupt("return", data);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getListProducts = getListProducts;

var getItemDetail = function getItemDetail(id) {
  var response, json, responseDescription, jsonDescription, items, data;
  return regeneratorRuntime.async(function getItemDetail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(ulr_base).concat(ENPOINTS.DETAILITEM).concat(id)));

        case 2:
          response = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          json = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(fetch("".concat(ulr_base).concat(ENPOINTS.DETAILITEM).concat(id).concat(ENPOINTS.DETAILITEMDESCRIPTION)));

        case 8:
          responseDescription = _context2.sent;
          _context2.next = 11;
          return regeneratorRuntime.awrap(responseDescription.json());

        case 11:
          jsonDescription = _context2.sent;
          items = {
            "id": json.id,
            "title": json.title,
            "price": {
              "currency": "$",
              "amount": json.price,
              "decimals": 2
            },
            "picture": json.thumbnail,
            "condition": json.condition,
            "free_shipping": json.shipping.free_shipping,
            "sold_quantity": json.sold_quantity,
            "description": jsonDescription.plain_text
          };
          data = {
            "author": {
              "name": "Cristian",
              "lastname": "Preciado"
            },
            "item": items
          };
          return _context2.abrupt("return", data);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getItemDetail = getItemDetail;