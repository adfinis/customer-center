export async function up(knex) {
  await knex.schema.createTable('customer', (table) => {
    table.bigIncrements('id').primary().unsigned();
    table.string('sn');
  });

  await knex.schema.createTable('user', (table) => {
    table.bigIncrements('id').primary().unsigned();
    table.string('username').notNullable().unique();
    table.string('shortname');
    table.string('firstName');
    table.string('lastName');
    table.string('email').notNullable().unique();
    table.string('language');
    table.string('sysupport');
    table.json('emails', true);
    table.json('groups', true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable('user');
  await knex.schema.dropTable('customer');
}
