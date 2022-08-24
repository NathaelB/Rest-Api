import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.unique({
        table: 'users', column: 'email'
      }), 
      rules.email()
    ]),
    username: schema.string({ trim: true }, [rules.unique({
      table: 'users', column: 'username'
    })]),
    password: schema.string({ trim: true })
  })

  public messages: CustomMessages = {}
}
