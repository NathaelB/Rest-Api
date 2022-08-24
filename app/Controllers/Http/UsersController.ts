import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { StoreValidator } from 'App/Validators/UserValidator'

export default class UsersController {
    public async index ({ response }: HttpContextContract) {
        const users = await User.query().orderBy('username', 'desc')
        return response.send({
            number: users.length,
            users: users
        })
    }

    public async show ({ params, response }: HttpContextContract) {
        const user = await User.query().where('username', params.id).first()
        return response.send({ user: user })
    }

    public async store ({ request, response }: HttpContextContract) {
        const data = await request.validate(StoreValidator)
        const user = await User.create(data)

        return response.send({
            message: "Utilisateur créé",
            user: user
        })
    }
}
