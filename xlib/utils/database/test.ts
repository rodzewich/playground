/// <reference path="select/ISelect.ts" />
/// <reference path="select/Select.ts" />
/// <reference path="condition/Type.ts" />
/// <reference path="condition/Item.ts" />
/// <reference path="condition/Action.ts" />

module test {

  import action = utils.database.condition.Action;
  import type = utils.database.condition.Type;
  import item = utils.database.condition.Item;

  var select: utils.database.select.ISelect =
    new utils.database.select.Select();

  select.
    field('table1.col1').
    field('table2.col2', 'alias2').
    field('table2.col3', 'alias3').
    from('table1').
    from('table2', 't2').
    from('table3', 't3').
    join('LEFT', 'table4', [
      [
        type.AND,
        action.BETWEEN,
        [item.COLUMN,  't2.col4'],
        [item.LITERAL, 'INTEGER', 123]
      ],
      [
        type.XOR,
        action.EQUAL,
        [item.COLUMN, 't2.col4'],
        [item.LITERAL, 'INTEGER', 123]
      ],
      [
        type.OR,
        action.EQUAL,
        [item.COLUMN, 't2.col4'],
        [item.LITERAL, 'INTEGER', 123]
      ]
    ]).
    join('LEFT', ['table5', 't5'], []).
    where(
      type.AND,
      action.EQUAL,
      [item.COLUMN, 't2.col4'],
      [item.LITERAL, 'INTEGER', 123]
    ).
    where(type.OR,  action.EQUAL, [item.COLUMN, 't2.col4'], [item.LITERAL, 'INTEGER', 123]).
    where(type.XOR, action.EQUAL, [item.COLUMN, 't2.col4'], [item.LITERAL, 'INTEGER', 123]).
    group('t2.col1').
    group('t3.col1').
    group('t4.col1').
    having(type.AND, action.EQUAL, [item.COLUMN, 't2.col4'], [item.LITERAL, 'INTEGER', 123]).
    having(type.OR, action.EQUAL, [item.COLUMN, 't2.col4'], [item.LITERAL, 'INTEGER', 123]).
    having(type.XOR, action.EQUAL, [item.COLUMN, 't2.col4'], [item.LITERAL, 'INTEGER', 123]).
    order('t1.col1', 'ASC').
    order('t2.col3', 'DESC').
    limit(10, 60).
    query((errors: Error[], result) => {

    });

  var remove;

  remove.from('table1')
    .from('table2', 't2')
    .from('table3', 't3')
    .join('INNER', 'table4', [
      [type.AND, action.EQUAL, [item.COLUMN, 't2.col4'], [item.LITERAL, 'INTEGER', 123]],
      [type.XOR, action.EQUAL, [item.COLUMN, 't2.col4'], [item.LITERAL, 'INTEGER', 123]],
      [type.OR, action.EQUAL, [item.COLUMN, 't2.col4'], [item.LITERAL, 'INTEGER', 123]]
    ])
    .where(type.AND, action.EQUAL, [item.COLUMN, 't2.col4'], [item.LITERAL, 'INTEGER', 123])
    .where(type.OR, action.EQUAL, [item.COLUMN, 't2.col4'], [item.LITERAL, 'INTEGER', 123])
    .where(type.XOR, action.EQUAL, [item.COLUMN, 't2.col4'], [item.LITERAL, 'INTEGER', 123])
    .order('t1.col1', 'ASC')
    .order('t2.col3', 'DESC')
    .limit(10, 60)
    .query((errors: Error[], count) => {

    });

  var update;

  var insert;

}