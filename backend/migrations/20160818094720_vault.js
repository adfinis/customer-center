
export async function up(knex) {
  await knex.schema.createTable('vault', table => {
    table.bigIncrements('id').primary().unsigned()
    table.string('path').notNullable().unique()
    table.json('meta')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('vault')
}
