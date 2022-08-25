import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Permission from 'App/Models/Permission';
import Role from 'App/Models/Role';
import User from 'App/Models/User';

export default class HelperPolicy extends BasePolicy {
	public async before (user: User | null) {
		if (user && user.isAdmin) return true
	}

	public async section (currentUser: User, method: string, policies: any[]) {
		for (const policy of policies.filter(policy => policy)) {
			const { default: Policy } = await import(`App/Policies/${policy}`)
			const bouncer = new Policy()

			const isAllow = await bouncer[method](currentUser)
			if (isAllow) return true
		}
	}

	public static async getPermissions (user: User) {
		await user.load('permissions')
		await user.load('roles')

		const permissions: string[] = user.permissions.map((permission) => permission.identifier)

		user.roles.forEach((role: Role) => {
			role.permissions.forEach((permisson: Permission) => {
				if (!permissions.includes(permisson.identifier)) {
					permissions.push(permisson.identifier)
				}
			})
		})

		return permissions
	}

	public static async getMaxRole (user: User) {
		await user.load('roles')

		const max: number = Math.max(...user.roles.map((role) => role.power))

		return user.roles.find((role) => role.power === max)!
	}
}
