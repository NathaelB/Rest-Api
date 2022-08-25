import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User';
import HelperPolicy from './HelperPolicy';

export default class CategoriePolicy extends BasePolicy {
		public async before (user: User | null) {
			if (user && user.isAdmin) return true
		}

		public async viewList (currentUser: User ) {
			const permission: string[] = await HelperPolicy.getPermissions(currentUser)

			return permission.includes('create:categorie')
			|| permission.includes('edit:categorie')
			|| permission.includes('delete:categorie')
		}

		public async view (currentUser: User) {
			const permission: string[] = await HelperPolicy.getPermissions(currentUser)

			return permission.includes('edit:categorie')
		}

		public async create (currentUser: User) {
			const permission: string[] = await HelperPolicy.getPermissions(currentUser)
			
			return permission.includes('create:categorie')
		}

		public async update (currentUser: User) {
			const permission: string[] = await HelperPolicy.getPermissions(currentUser)
			
			return permission.includes('edit:categorie')
		}

		public async delete (currentUser: User) {
			const permission: string[] = await HelperPolicy.getPermissions(currentUser)
			
			return permission.includes('delete:categorie')
		}

		public async actions (currentUser: User) {
			const permission: string[] = await HelperPolicy.getPermissions(currentUser)
			
			return permission.includes('edit:categorie')
			|| permission.includes('delete:categorie')
		}
}