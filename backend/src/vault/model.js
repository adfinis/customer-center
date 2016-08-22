import Bookshelf from 'bookshelf'
import knex      from 'knex'
import config    from '../../config.json'

const bookshelf = new Bookshelf(knex(config.database))

/**
 * Vault model
 *
 * @class Vault
 * @public
 */
export default bookshelf.Model.extend({
  tableName: 'vault'
})
