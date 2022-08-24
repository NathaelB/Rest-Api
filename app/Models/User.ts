import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, beforeCreate, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'crypto'
import Permission from './Permission'
import Role from './Role'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public isAdmin: true

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (User: User) {
    if (User.$dirty.password) {
      User.password = await Hash.make(User.password)
    }
  }

  @beforeCreate()
  public static async CreateUUID (model: User) {
    model.id = randomUUID()
  }
}
