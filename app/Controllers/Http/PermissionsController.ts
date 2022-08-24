import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'
import PermissionGroup from 'App/Models/PermissionGroup'
import { StoreValidator, UpdateValidator } from 'App/Validators/PermissionValidator'

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
		
		const data = await request.validate(StoreValidator)

		let group: PermissionGroup | null
		if (data.permissionGroupId) {
			group = await PermissionGroup.query().where('label', data.permissionGroupId!).first()
		}

		const permission = await Permission.create({
			label: data.label,
			identifier: data.identifier,
			permissionGroupId: group! ? group.id : undefined
		})
		
		return response.send({
			message: "Permission créé",
			permission: permission
		})
	}

	public async update ({ params, request, bouncer, response }: HttpContextContract) {
		await bouncer.with('PermissionPolicy').authorize('update')
		const permission = await Permission.query().where('identifier', params.id).first()
		if (!permission) return response.send({ message: "Permission non existante" })
	
		const data = await request.validate(UpdateValidator)
		if (Object.keys(data).length === 0) {
			return response.send({
				message: `La Permission ${permission.identifier} n'a pas été modifié`,
				permission: permission
			})  
		}
		let group: PermissionGroup | null
		if (data.permissionGroupId) {
			group = await PermissionGroup.query().where('label', data.permissionGroupId!).first()
		}
		
		await permission.merge({
			...data,
			permissionGroupId: group! ? group.id : undefined
		}).save()

		return response.send({
			message: `La Permission ${permission.identifier} viens d'être modifié`,
			permission: permission
		})
	}

	public async destroy ({ bouncer, params, response }: HttpContextContract) {
		await bouncer.with('PermissionPolicy').authorize('delete')
		const permission = await Permission.query().where('identifier', params.id).first()

		await permission?.delete()
		return response.send({
			message: `La permission ${params.id} viens d'être anéhanti ^^`,
			permission: permission
		})
	}
}
