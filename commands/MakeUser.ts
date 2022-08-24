import { BaseCommand } from '@adonisjs/core/build/standalone'
import Role from 'App/Models/Role'

export default class MakeUser extends BaseCommand {

  public static commandName = 'make:user'
  public static description = ''

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const { default: User } = await import('App/Models/User')


    const username = await this.prompt.ask('Enter user username')
    const email = await this.prompt.ask('Choose email')
    const password = await this.prompt.secure('Choose account password')
    const passwordConfirmation = await this.prompt.secure('Confirm account password')

    if (password !== passwordConfirmation) {
      this.logger.fatal('Passwords are not identical')
      return
    }
    
    let member = await Role.query().where('slug', 'member').first()
    if (!member) {
      member = await Role.create({label: 'Member', power: 1})
    }
    const user = await User.create({ isAdmin: true, email, password, username })
    await user.related('roles').attach([member.id])

    this.logger.success('User was create')
  }
}
