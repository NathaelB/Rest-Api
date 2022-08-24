import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User';
import HelperPolicy from './HelperPolicy';

export default class GroupPermissionPolicy extends BasePolicy {
	public async before (user: User | null) {
		if (user && user.isAdmin) return true
	}

	public async viewList (currentUser: User) {
		const permissions: string[] = await HelperPolicy.getPermissions(currentUser)

		return permissions.includes('create:group-permission')
			|| permissions.includes('edit:group-permission')
			|| permissions.includes('delete:group-permission')
	}

	public async view (currentUser: User) {
		const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
		return permissions.includes('edit:group-permission')
	}

	public async create (currentUser: User) {
		const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
		return permissions.includes('create:group-permission')
	}

	public async update (currentUser: User) {
		const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
		return permissions.includes('edit:group-permission')
	}

	public async delete (currentUser: User) {
		const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
		return permissions.includes('delete:group-permission')
	}

	public async actions (currentUser: User) {
		const permissions: string[] = await HelperPolicy.getPermissions(currentUser)

		return permissions.includes('edit:group-permission')
			|| permissions.includes('delete:group-permission')
	}
}
