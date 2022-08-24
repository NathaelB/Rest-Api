import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'crypto'
import PermissionGroup from './PermissionGroup'
import User from './User'
import Role from './Role'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  public id: string
  
  @column()
  public label: string

  @column()
  public identifier: string

  @column()
  public permissionGroupId: string

  @belongsTo(() => PermissionGroup)
  public group: BelongsTo<typeof PermissionGroup>

  @manyToMany(() => User)
  public users: ManyToMany<typeof User>

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async CreateUUID (model: Permission) {
    model.id = randomUUID()
  }
}
