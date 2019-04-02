'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('users', {
    id: {
      type: 'uuid', 
      notNull: true,
      primaryKey: true,
      defaultValue: new String('uuid_generate_v4()')
    },
    name: {
      type: 'string',
      notNull: true,
    },
    created_at: {
      notNull: true,
      type: 'timestamp',
      defaultValue: new String('now()')
    }
  })
};

exports.down = function(db) {
  return db.dropTable('users');
};

exports._meta = {
  "version": 1
};
