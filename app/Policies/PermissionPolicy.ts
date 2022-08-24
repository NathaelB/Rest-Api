import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User';
import HelperPolicy from './HelperPolicy';

export default class PermissionPolicy extends BasePolicy {
	public async before (user: User | null) {
		if (user && user.isAdmin) return true
	}

	public async viewList (currentUser: User) {
		const permissions: string[] = await HelperPolicy.getPermissions(currentUser)

		return permissions.includes('create:permission')
			|| permissions.includes('edit:permission')
			|| permissions.includes('delete:permission')
	}

	public async view (currentUser: User) {
		const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
		return permissions.includes('edit:permission')
	}

	public async create (currentUser: User) {
		const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
		return permissions.includes('create:permission')
	}

	public async update (currentUser: User) {
		const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
		return permissions.includes('edit:permission')
	}

	public async delete (currentUser: User) {
		const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
		return permissions.includes('delete:permission')
	}

	public async actions (currentUser: User) {
		const permissions: string[] = await HelperPolicy.getPermissions(currentUser)

		return permissions.includes('edit:permission')
			|| permissions.includes('delete:permission')
	}
}
