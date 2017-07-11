export async function up(knex) {
  await knex.schema.dropTable('vault')
}

export function down(knex) {}
