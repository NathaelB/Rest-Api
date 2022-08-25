import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PermissionGroup from 'App/Models/PermissionGroup'
import { StoreValidator, UpdateValidator } from 'App/Validators/GroupPermissionValidator'

export default class PermissionGroupsController {
	public async index ({ bouncer, response }: HttpContextContract) {
		await bouncer.with('GroupPermissionPolicy').authorize('viewList')
		
		const permissionGroup = await PermissionGroup.query().orderBy('label', 'desc')
		return response.send({
			number: permissionGroup.length,
			permissionGroup: permissionGroup
		})
	}

	public async show ({ bouncer, params, response }: HttpContextContract) {
		await bouncer.with('GroupPermissionPolicy').authorize('view')

		const permissionGroup = await PermissionGroup.query().where('label', params.id).first()

		return response.send({ permissionGroup: permissionGroup})
	}

	public async store ({ bouncer, request, response }: HttpContextContract) {
		await bouncer.with('GroupPermissionPolicy').authorize('create')
		const data = await request.validate(StoreValidator)

		const permissionGroup = await PermissionGroup.create(data)
		return response.send({
			message: "Permission Group créé",
			permissionGroup: permissionGroup
		})
	}

	public async update ({ bouncer, params, request, response }: HttpContextContract) {
		await bouncer.with('GroupPermissionPolicy').authorize('update')
		const permissionGroup = await PermissionGroup.query().where('label', params.id).first()
		if (!permissionGroup) return response.send({ message: "Permission Group non existante" })
	
		const data = await request.validate(UpdateValidator)
		if (Object.keys(data).length === 0) {
			return response.send({
				message: `Le Permission Group ${permissionGroup.label} n'a pas été modifié`,
				permissionGroup: permissionGroup
			})  
		}
		await permissionGroup.merge(data).save()

		return response.send({
			message: `Le Permission Group ${permissionGroup.label} viens d'être modifié`,
			permissionGroup: permissionGroup
		})
	}

	public async destroy ({ bouncer, params, response }: HttpContextContract) {
		await bouncer.with('GroupPermissionPolicy').authorize('delete')
		const permissionGroup = await PermissionGroup.query().where('label', params.id).first()

		await permissionGroup?.delete()
		return response.send({
			message: `Le Permission Group ${params.id} viens d'être anéhanti ^^`,
			permissionGroup: permissionGroup
		})
	}
}
