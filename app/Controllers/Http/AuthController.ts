import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { LoginValidator } from 'App/Validators/UserValidator'

export default class AuthController {
	public async login ({ auth, request, response }: HttpContextContract) {
		const credentials = await request.validate(LoginValidator)

		try {
			const token = await auth.use('api')
				.attempt(credentials.email, credentials.password, {expiresIn: '1days'})
			return response.send({
				user: auth.user,
				auth: token
			})
		} catch {
			return response.badRequest('Invalid Credentials')
		}
	}

	public async logout ({ auth, response }: HttpContextContract) {
		await auth.use('api').revoke()
		return response.send({
			revoked: true
		})
	}

	public async me ({ auth, response}: HttpContextContract) {
		const user = auth.user

    await user?.load('roles')
    await user?.load('permissions', (query) => {
      query.select('id', 'identifier', 'permission_group_id')
    })

    return response.send({ user: user })
	}
}
