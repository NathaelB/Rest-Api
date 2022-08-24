import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'

export default class PermissionsController {
	public async index ({ bouncer, response }: HttpContextContract) {
		await bouncer.with('PermissionPolicy').authorize('viewList')
		const permissions = await Permission.query().orderBy('label', 'desc')

		return response.send({
			number: permissions.length,
			permissions: permissions
		})
	}

	public async show ({ params, bouncer, response }: HttpContextContract) {
		await bouncer.with('PermissionPolicy').authorize('view')
		const permission = await Permission.query().where('identifier', params.id)

		return response.send({ permission: permission })
	}

	public async store ({ request, bouncer, response }: HttpContextContract) {
		await bouncer.with('PermissionPolicy').authorize('create')
		// TODO
	}
}
