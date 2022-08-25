import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('label').notNullable().unique()
      table.string('slug').notNullable().unique()
      table.string('description').notNullable()
      table.boolean('is_pin').notNullable().defaultTo(false)
      table.boolean('is_visible').notNullable().defaultTo(false)
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
