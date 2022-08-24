import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User';
import HelperPolicy from './HelperPolicy';

export default class UserPolicy extends BasePolicy {
	public async before (user: User | null) {
		if (user && user.isAdmin) return true
	}

	public async viewList (currentUser: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
    return permissions.includes('create:user')
      || permissions.includes('edit:user')
      || permissions.includes('delete:user')
  }

  public async view (currentUser: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
    return permissions.includes('edit:user')
  }

  public async create (currentUser: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
    return permissions.includes('create:user')
  }

  public async update (currentUser: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
    return permissions.includes('edit:user')
  }

  public async delete (currentUser: User, user: User) {
    if (user.isAdmin) {
      return false
    }


    const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
    return permissions.includes('delete:user')
  }

  public async actions (currentUser: User, user?: User) {
    if (user?.isAdmin) {
      return false
    }

    await currentUser.load('permissions')
    const permissions: string[] = await HelperPolicy.getPermissions(currentUser)

    return permissions.includes('edit:user')
      || permissions.includes('delete:user')
  }
}
