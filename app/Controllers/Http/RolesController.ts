import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import { StoreValidator, UpdateValidator } from 'App/Validators/RoleValidator'


export default class RolesController {
	public async index ({ bouncer, response }: HttpContextContract) {
		await bouncer.with('RolePolicy').authorize('viewList')
		const roles = await Role.query().orderBy('label', 'desc')

		return response.send({
			number: roles.length,
			roles: roles
		})
	}

	public async show ({ bouncer, params, response}: HttpContextContract) {
		await bouncer.with('RolePolicy').authorize('view')
		const role = await Role.query().where('slug', params.id).first()

		return response.send({ role: role })
	}

	public async store ({ request, bouncer, response }: HttpContextContract) {
		await bouncer.with('RolePolicy').authorize('create')

		const data = await request.validate(StoreValidator)

		const role = await Role.create(data)
		return response.send({ role: role })
	}

	public async update ({ request, params, bouncer, response }: HttpContextContract) {
		await bouncer.with('PermissionPolicy').authorize('update')
		const role = await Role.query().where('slug', params.id).first()
		if (!role) return response.send({ message: "Role non existant" })

		const data = await request.validate(UpdateValidator)
		if (Object.keys(data).length === 0) {
			return response.send({
				message: `Le Role ${role.label} n'a pas été modifié`,
				role: role
			}) 
		}
		await role.merge(data).save()

		return response.send({
			message: `Le Role ${role.label} viens d'être modifié`,
			role: role
		})
	}

	public async destroy ({ response, params, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('delete')

    const role = await Role.query()
      .where('slug', params.id)
      .firstOrFail()

    await role.delete()
    return response.send({
			message: `Le Role ${params.id} viens d'être anéhanti ^^`,
			role: role
		})
  }
}
