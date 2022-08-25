import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    label: schema.string({}, [rules.unique({ table: 'categories', column: 'label' })]),
    description: schema.string(), 
    isPin: schema.boolean.optional(),
    isVisible: schema.boolean.optional() 
  })

  public messages: CustomMessages = {}
}

export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    label: schema.string.optional({}, [rules.unique({ table: 'categories', column: 'label' })]),
    description: schema.string.optional(), 
    isPin: schema.boolean.optional(),
    isVisible: schema.boolean.optional() 
  })

  public messages: CustomMessages = {}
}
