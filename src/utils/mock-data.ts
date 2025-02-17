import {IIngredientItem, TOrderItem} from "./types";

export const DATA_BURGERS: IIngredientItem[] = [
  {
    "_id":"60666c42cc7b410027a1a9b1",
    "name":"Краторная булка N-200i",
    "type":"bun",
    "proteins":80,
    "fat":24,
    "carbohydrates":53,
    "calories":420,
    "price":1255,
    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
    "count":0,
    "oguid":"111"
  },
  {
    "_id":"60666c42cc7b410027a1a9b5",
    "name":"Говяжий метеорит (отбивная)",
    "type":"main",
    "proteins":800,
    "fat":800,
    "carbohydrates":300,
    "calories":2674,
    "price":3000,
    "image":"https://code.s3.yandex.net/react/code/meat-04.png",
    "count":0,
    "oguid":"222"
  },
  {
    "_id":"60666c42cc7b410027a1a9b6",
    "name":"Биокотлета из марсианской Магнолии",
    "type":"main",
    "proteins":420,
    "fat":142,
    "carbohydrates":242,
    "calories":4242,
    "price":424,
    "image":"https://code.s3.yandex.net/react/code/meat-01.png",
    "count":0,
    "oguid":"333"
  },
  {
    "_id":"60666c42cc7b410027a1a9b7",
    "name":"Соус Spicy-X",
    "type":"sauce",
    "proteins":30,
    "fat":20,
    "carbohydrates":40,
    "calories":30,
    "price":90,
    "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
    "count":0,
    "oguid":"444"
  },
  {
    "_id":"60666c42cc7b410027a1a9b4",
    "name":"Мясо бессмертных моллюсков Protostomia",
    "type":"main",
    "proteins":433,
    "fat":244,
    "carbohydrates":33,
    "calories":420,
    "price":1337,
    "image":"https://code.s3.yandex.net/react/code/meat-02.png",
    "count":0,
    "oguid":"555"
  },
  {
    "_id":"60666c42cc7b410027a1a9b9",
    "name":"Соус традиционный галактический",
    "type":"sauce",
    "proteins":42,
    "fat":24,
    "carbohydrates":42,
    "calories":99,
    "price":15,
    "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
    "count":0,
    "oguid":"666"
  },
]

export const DATA_BURGERS_WITH_COUNT: IIngredientItem[] = [
  {
    "_id":"60666c42cc7b410027a1a9b1",
    "name":"Краторная булка N-200i",
    "type":"bun",
    "proteins":80,
    "fat":24,
    "carbohydrates":53,
    "calories":420,
    "price":1255,
    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
    "count":0,
    "oguid":"111"
  },
  {
    "_id":"60666c42cc7b410027a1a9b5",
    "name":"Говяжий метеорит (отбивная)",
    "type":"main",
    "proteins":800,
    "fat":800,
    "carbohydrates":300,
    "calories":2674,
    "price":3000,
    "image":"https://code.s3.yandex.net/react/code/meat-04.png",
    "count":1,
    "oguid":"222"
  },
  {
    "_id":"60666c42cc7b410027a1a9b6",
    "name":"Биокотлета из марсианской Магнолии",
    "type":"main",
    "proteins":420,
    "fat":142,
    "carbohydrates":242,
    "calories":4242,
    "price":424,
    "image":"https://code.s3.yandex.net/react/code/meat-01.png",
    "count":1,
    "oguid":"333"
  },
  {
    "_id":"60666c42cc7b410027a1a9b7",
    "name":"Соус Spicy-X",
    "type":"sauce",
    "proteins":30,
    "fat":20,
    "carbohydrates":40,
    "calories":30,
    "price":90,
    "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
    "count":2,
    "oguid":"444"
  },
  {
    "_id":"60666c42cc7b410027a1a9b4",
    "name":"Мясо бессмертных моллюсков Protostomia",
    "type":"main",
    "proteins":433,
    "fat":244,
    "carbohydrates":33,
    "calories":420,
    "price":1337,
    "image":"https://code.s3.yandex.net/react/code/meat-02.png",
    "count":0,
    "oguid":"555"
  },
  {
    "_id":"60666c42cc7b410027a1a9b9",
    "name":"Соус традиционный галактический",
    "type":"sauce",
    "proteins":42,
    "fat":24,
    "carbohydrates":42,
    "calories":99,
    "price":15,
    "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
    "count":1,
    "oguid":"666"
  },
]

export const DATA_INGREDIENTS: string[] = ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d']
export const DATA_ORDERS: TOrderItem[] = [{
  ingredients: DATA_INGREDIENTS,
  _id:'67ac750a133acd001be50618',
  name:'Флюоресцентный люминесцентный бургер',
  status: 'done',
  number: 68200,
  createdAt:'2025-02-12T10:16:42.055Z',
  updatedAt: '2025-02-12T10:16:42.696Z'
},
]

