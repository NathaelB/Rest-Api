import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Permission from './Permission'

export default class PermissionGroup extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public label: string

  @hasMany(() => Permission)
  public permissions: HasMany<typeof Permission>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
