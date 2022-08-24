import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Guest {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    if (!auth.isGuest) {
      throw new AuthenticationException(
        'Vous n\'avez pas accès à ce contenu en étant connecté.',
        'E_UNAUTHORIZED_ACCESS',
        '')
    }
    await next()
  }
}
